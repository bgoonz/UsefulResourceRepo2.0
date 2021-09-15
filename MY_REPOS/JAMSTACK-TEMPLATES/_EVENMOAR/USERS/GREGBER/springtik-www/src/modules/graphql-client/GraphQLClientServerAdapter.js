import {
  parse,
  Source,
  validate,
} from 'graphql';
import {
  execute,
} from 'graphql/execution';

export default class GraphQLClientServerAdapter {
  constructor({schema}) {
    this.schema = schema;
  }

  async fetch({query}) {
    const source = new Source(query, 'GraphQL query');
    const documentAST = parse(source);
    const validationErrors = validate(this.schema, documentAST);

    if (validationErrors.length > 0) {
      throw new Error('Validation failed');
    }

    return await execute(
      this.schema,
      documentAST,
    );
  }
}
