import { gql } from "apollo-boost"; // or you can use `import gql from 'graphql-tag';` instead

export const GET_CURRENT_USER_INFO = gql`
  {
    userInfo {
      email
      email_verified
      picture
      given_name
      family_name
      name
      locale
      updated_at
    }
  }
`;
