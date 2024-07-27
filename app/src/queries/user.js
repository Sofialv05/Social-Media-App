import { gql } from "@apollo/client";

export const GET_USERLOGIN_PROFILE = gql`
query UserProfile {
  findUserProfile {
    _id
    name
    username
    email
  }
  findAllFollowers {
    _id
    followingId
    followerId
    follower {
      name
      username
      email
    }
    createdAt
    updatedAt
  }
  findAllFollowing {
    _id
    followingId
    following {
      name
      username
      email
    }
    followerId
    createdAt
    updatedAt
  }
  findPostByAuthorId {
    _id
    imgUrl
    createdAt
    updatedAt
  }
}`;

export const GET_USER_PROFILE = gql`
query Profile($userId: String!, $followerUserId: String!, $followingUserId: String!, $PostUserId: String!) {

  findUserById(userId: $userId) {
    _id
    name
    username
    email
  }
  findAllFollowersById(userId: $followerUserId) {
    _id
    followingId
    followerId
    follower {
      _id
      name
      username
    }
    createdAt
    updatedAt
  }
  findAllFollowingById(userId: $followingUserId) {
    _id
    followingId
    following {
      _id
      name
      username
    }
    followerId
    createdAt
    updatedAt
  }
  findPostUser(userId: $PostUserId) {
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
