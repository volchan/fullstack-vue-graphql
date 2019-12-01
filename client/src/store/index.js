import Vue from "vue";
import Vuex from "vuex";
import { gql } from "apollo-boost";

import { defaultClient as apolloClient } from "../plugins/apollo";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getPosts: () => {
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
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  },
  modules: {}
});
