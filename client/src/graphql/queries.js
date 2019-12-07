import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
      createdBy {
        _id
        username
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      avatar
      joinDate
      favorites {
        _id
        title
        imageUrl
        description
        createdDate
        likes
      }
    }
  }
`;
