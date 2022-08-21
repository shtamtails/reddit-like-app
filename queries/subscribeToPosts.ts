import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_POSTS = gql`
  subscription {
    newLink {
      id
      description
      url
      postedBy {
        id
        name
      }
    }
  }
`;
