import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Login($inputLogin: LoginUser) {
  login(inputLogin: $inputLogin) {
    token
    username
  }
}
`;
