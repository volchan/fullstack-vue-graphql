import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as apolloClient } from "../plugins/apollo";
import { GET_POSTS } from "../graphql/queries";
import { SIGNIN_USER } from "../graphql/mutations";

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
          query: GET_POSTS
        })
        .then(({ data }) => {
          commit("setPosts", data.getPosts);
          commit("setLoading", false);
        })
        .catch(err => {
          console.log(err);
          commit("setLoading", false);
        });
    },
    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.signinUser.token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  },
  modules: {}
});
