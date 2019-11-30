<template>
  <v-container>
    <h1>Home</h1>
    <div v-if="$apollo.loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="20"
        width="2"
      /> Loading...
    </div>
    <ul
      v-else
      v-for="post in posts"
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
  data() {
    return {
      posts: []
    };
  },
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
      `,
      result({ data, loading, networkStatus }) {
        if (!loading) {
          this.posts = data.getPosts;
        }
      },
      error(err) {
        console.error("[ERROR!]", err);
        console.dir(err);
      }
    }
  }
};
</script>
