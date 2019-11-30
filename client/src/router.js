import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";

import Profile from "./components/Auth/Profile.vue";
import Signin from "./components/Auth/Signin.vue";
import Signup from "./components/Auth/Signup.vue";

import Posts from "./components/Posts/Posts.vue";
import AddPost from "./components/Posts/AddPost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/Signin",
    name: "Signin",
    component: Signin
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts
  },
  {
    path: "/posts/add",
    name: "AddPost",
    component: AddPost
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
