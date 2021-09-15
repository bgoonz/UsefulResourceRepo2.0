const graphql = require('graphql')
const r = require('rethinkdb')

let connection = null

r.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
  if (err) throw err
  connection = conn
})

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
 } = graphql

const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: _=> ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return r.table('company').get(parentValue.companyId).run(connection, (err, result) => {
          if(err) throw err
          return result
        })
      }
    }
  })
})

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: _=> ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    employees: { type: GraphQLString },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parentValue, args) {
        return r.table('employees').getAll(parentValue.id, { index: 'companyId' }).run(connection, (err, result) => {
          if (err) throw err
        }).then(cursor => {
          return cursor.toArray((err, result) => {
            if (err) throw err
          })
        })
      }
    }
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        return r.table('employees').get(args.id).run(connection, (err, result) => {
          if(err) throw err
        })
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        return r.table('company').get(args.id).run(connection, (err, result) => {
          if(err) throw err
        })
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployees: {
      type: EmployeeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return r.table('employees').insert(args).run(connection, (err, result) => {
          if(err) throw err
        })
      }
    },
    updateEmployees: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return r.table('employees').get(args.id).update(args, { returnChanges: true }).run(connection, (err, result) => {
          if(err) throw err
        }).then(result => (typeof result.changes[0] !== 'undefined') ? result.changes[0].new_val : null)
      }
    },
    deleteEmployees: {
      type: EmployeeType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) }},
      resolve(parentValue, args) {
        return r.table('employees').get(args.id).delete().run(connection, (err, result) => {
          if(err) throw err
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
})
