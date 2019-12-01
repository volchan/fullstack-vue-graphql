import Vue from "vue";
import Vuex from "vuex";
import { gql } from "apollo-boost";

import { defaultClient as apolloClient } from "../plugins/apollo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, posts) => {
      state.posts = posts;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: gql`
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
          `
        })
        .then(({ data }) => {
          commit("setPosts", data.getPosts);
          commit("setLoading", false);
        })
        .catch(err => {
          console.log(err);
          commit("setLoading", false);
        });
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  },
  modules: {}
});
