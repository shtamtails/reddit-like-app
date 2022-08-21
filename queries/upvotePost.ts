import { gql } from "@apollo/client";

export const UPVOTE_POST = gql`
  mutation upvote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
    }
  }
`;
