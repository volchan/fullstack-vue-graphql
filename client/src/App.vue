<template>
  <v-app style="background: #E3E3EE">
    <!-- Horizontal Navbar -->
    <v-app-bar
      fixed
      color="primary"
      dark
      app
    >
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

      <v-toolbar-title class="hidden-xs-only">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer;"
        >
          VueShare
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-text-field
        prepend-icon="mdi-magnify"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer class="hidden-xs-only" />

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
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

    <v-navigation-drawer
      app
      temporary
      fixed
      v-model="sideNav"
      light
    >
      <v-toolbar
        color="accent"
        dark
        flat
      >
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>

      <v-divider />

      <v-list dense>
        <v-list-item
          ripple
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    horizontalNavItems() {
      return [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/login" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
    },
    sideNavItems() {
      return [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/login" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>
