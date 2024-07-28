import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
mutation CommentPost($inputComment: NewComment) {
  commentPost(inputComment: $inputComment) {
    message
  }
}

`;

export const LIKE_POST = gql`
mutation LikePost($inputLike: NewLike) {
  likePost(inputLike: $inputLike) {
    message
  }
}
`;

export const ADD_POST = gql`
mutation AddPost($inputPost: NewPost) {
  addPost(inputPost: $inputPost) {
    message
  }
}
`;
