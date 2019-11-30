<template>
  <v-container>
    <h1>Home</h1>
    <ul
      v-for="post in getPosts"
      :key="post._id"
    >
      <li>
        {{post.title}} {{post.imageUrl}} {{post.description}}, likes: {{post.likes}}, created by: {{post.createdBy.username}}
      </li>
    </ul>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  name: "Home",
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            description
            imageUrl
            createdDate
            likes
            createdBy {
              _id
              username
              email
              joinDate
            }
          }
        }
      `
    }
  }
};
</script>
