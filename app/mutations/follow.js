import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
mutation follow($inputFollow: NewFollow) {
  followUser(inputFollow: $inputFollow) {
    message
  }
}
`;
