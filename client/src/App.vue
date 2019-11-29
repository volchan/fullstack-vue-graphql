<template>
  <v-app>
    <!-- Horizontal Navbar -->
    <v-app-bar
      fixed
      color="primary"
      dark
      app
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-icon></v-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >
          VueShare
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        prepend-icon="mdi-magnify"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer class="hidden-xs-only"></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          small
          depressed
          color="primary"
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- App Content -->
    <main>
      <v-container class="mt-12">
        <router-view />
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    horizontalNavItems() {
      return [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/login" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
    }
  }
};
</script>
