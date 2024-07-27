import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
  findPosts {
    _id
    content
    tags
    imgUrl
    authorId
    author {
      name
      username
      email
    }
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;

export const GET_POST_ID = gql`
query FindPostById($postId: String!) {
  findPostById(postId: $postId) {
    _id
    content
    tags
    imgUrl
    authorId
    author {
      name
      username
      email
    }
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;
