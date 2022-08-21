import { gql } from "@apollo/client";

/**
 * IF SUBCOMMENTS ARE EMPTY SHOW BUTTON TO FETCH MORE SUBCOMMENTS {@link GET_MORE_SUBCOMMENTS}
 */

export const GET_COMMENTS = gql`
  query comments {
    postComments(id: $id) {
      count
      comments {
        id
        postedBy
        message
        subcomments {
          id
          postedBy
          message
          subcomments {
            id
            postedBy
            message
            subcomments {
              id
              postedBy
              message
            }
          }
        }
      }
    }
  }
`;

/**
 * REQUESTING MORE SUBCOMMENTS BY COMMENT ID
 * IF SUBCOMMENTS ARE EMPTY SHOW BUTTON TO FETCH MORE SUBCOMMENTS {@link GET_MORE_SUBCOMMENTS}
 */

export const GET_MORE_SUBCOMMENTS = gql`
query subcomments {
    subcomments(commentid: $id) {
    count
        subcomments {
          id
          postedBy
          message
          subcomments {
            id
            postedBy
            message
            subcomments {
              id
              postedBy
              message
            }
          }
        }
      }
    }
    }
}
`;
