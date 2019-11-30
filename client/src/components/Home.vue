<template>
  <v-container>
    <h1>Home</h1>
    <apolloQuery :query="getPostsQuery">
      <template slot-scope="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">
          <v-progress-circular
            indeterminate
            color="primary"
            size="20"
            width="2"
          /> Loading...
        </div>
        <div v-else-if="error">Error! {{error.message}}</div>
        <ul
          v-else
          v-for="post in data.getPosts"
          :key="post._id"
        >
          <li>
            {{post.title}}, {{post.imageUrl}}, {{post.description}}, likes: {{post.likes}}, created by: {{post.createdBy.username}}
          </li>
        </ul>
      </template>
    </apolloQuery>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  name: "Home",
  data() {
    return {
      getPostsQuery: gql`
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
    };
  }
};
</script>
