import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import { defaultClient as apolloClient } from "../plugins/apollo";
import { GET_POSTS, GET_CURRENT_USER } from "../graphql/queries";
import { SIGNIN_USER } from "../graphql/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, posts) => {
      state.posts = posts;
    },
    setLoading: (state, loading) => {
      state.loading = loading;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    clearUser: state => (state.user = null)
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit("setLoading", false);
          commit("setUser", data.getCurrentUser);
        })
        .catch(err => {
          commit("setLoading", false);
          console.log(err);
        });
    },
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
          router.go();
        })
        .catch(err => {
          console.log(err);
        });
    },
    signoutUser: async ({ commit }) => {
      commit("clearUser");
      localStorage.setItem("token", "");
      await apolloClient.resetStore();
      router.push("/");
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user
  },
  modules: {}
});
