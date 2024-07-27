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
      _id
      name
      username
      email
      password
    }
    createdAt
    updatedAt
  }
  findAllFollowing {
    _id
    followingId
    following {
      _id
      name
      username
      email
      password
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
