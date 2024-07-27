import { gql } from "@apollo/client";

export const GET_FOLLOWING = gql`
  query Following {
 findAllFollowing {
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
}
`;

export const GET_FOLLOWERS = gql`
  query Followers {
 findAllFollowers {
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
}
`;

// export const GET_
