import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation addPost($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
    }
  }
`;
