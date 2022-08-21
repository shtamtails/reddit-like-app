import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;
