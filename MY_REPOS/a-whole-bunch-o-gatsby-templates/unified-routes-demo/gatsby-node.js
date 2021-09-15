const allHouses = [
  {
    id: '1',
    name: 'Gryffindor',
    mascot: 'Lion',
    headOfHouse: 'Minerva McGonagall',
  },
  {
    id: '2',
    name: 'Ravenclaw',
    mascot: 'Eagle',
    headOfHouse: 'Filius Flitwick',
  },
  {
    id: '3',
    name: 'Slytherin',
    mascot: 'Serpent',
    headOfHouse: 'Severus Snape',
  },
  {
    id: '4',
    name: 'Hufflepuff',
    mascot: 'Badger',
    headOfHouse: 'Pomona Sprout',
  },
]

const allCharacters = [
  {
    name: 'Minerva McGonagall',
    role: 'Professor, Transfiguration',
    ministryOfMagic: true,
    orderOfThePhoenix: true,
    species: 'human',
    id: '96',
    house: 'Gryffindor',
  },
  {
    name: 'Filius Flitwick',
    role: 'Professor, Charms',
    ministryOfMagic: false,
    orderOfThePhoenix: false,
    species: 'part-goblin',
    id: '55',
    house: 'Ravenclaw',
  },
  {
    name: 'Severus Snape',
    role: 'Professor, Potions',
    ministryOfMagic: false,
    orderOfThePhoenix: true,
    species: 'human',
    id: '135',
    house: 'Slytherin',
  },
  {
    name: 'Pomona Sprout',
    role: 'Professor, Herbology',
    ministryOfMagic: false,
    orderOfThePhoenix: false,
    species: 'human',
    id: '137',
    house: 'Hufflepuff',
  },
]

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type House implements Node {
      headOfHouse: Character @link(by: "name")
    }
    
    interface Fruits @nodeInterface {
      id: ID!
      name: String
      litLevel: String
      healthy: Boolean
      shape: String
      slug: String
    }
    
    type FruitsYaml implements Node & Fruits {
      name: String
      litLevel: String
      healthy: Boolean
      shape: String
      slug: String
    }
  `)
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  allHouses.map((house) => {
    const node = {
      ...house,
      slug: house.name.toLowerCase(),
      id: createNodeId(`house-${house.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'House',
        content: JSON.stringify(house),
        contentDigest: createContentDigest(house),
      },
    }

    createNode(node)
  })

  allCharacters.map((char) => {
    const node = {
      ...char,
      id: createNodeId(`char-${char.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Character',
        content: JSON.stringify(char),
        contentDigest: createContentDigest(char),
      },
    }

    createNode(node)
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Character') {
    const role = node.role
    const subject = role
      .trim()
      .replace(/\s*,\s*/g, ',')
      .split(',')[1]

    createNodeField({
      node,
      name: 'subject',
      value: subject,
    })
  }
}
