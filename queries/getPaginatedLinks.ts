import { gql } from "@apollo/client";
import { client } from "../apollo";

export interface IGetLinks {
  take: number;
  skip: number;
}

export const GET_PAGINATED_LINKS = async ({ take, skip }: IGetLinks) => {
  const { data, loading, error } = await client.query({
    query: gql`
      query getPaginated($take: Int, $skip: Int) {
        feed(take: $take, skip: $skip) {
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
    `,
    variables: {
      take: take,
      skip: skip,
    },
  });
  return { data, loading, error };
};

export const USE_GET_PAGINATED_LINKS = gql`
  query getPaginated($take: Int, $skip: Int) {
    feed(take: $take, skip: $skip) {
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
