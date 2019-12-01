<template>
  <v-container>
    <!-- <v-flex xs12>
      <v-carousel
        :cycle="true"
        interval="3000"
      >
        <v-carousel-item
          v-for="post in getPosts"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1
            id="carousel__title"
            class="text-center"
          >{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex> -->
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";
export default {
  name: "Home",
  methods: {
    handleGetCarouselPosts() {
      this.$store.dispatch("getPosts");
    }
  },
  created() {
    this.handleGetCarouselPosts();
  }
};
</script>

<style lang="scss" scoped>
#carousel__title {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
