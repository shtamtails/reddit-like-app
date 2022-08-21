import { gql } from "@apollo/client";
export const GET_ALL_LINKS = gql`
  query {
    feed {
      count
      links {
        id
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
            name
          }
        }
      }
    }
  }
`;
