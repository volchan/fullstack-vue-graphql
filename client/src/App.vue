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
        outlined
        dense
        prepend-inner-icon="mdi-magnify"
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
        <v-btn
          small
          depressed
          color="primary"
          to="/profile"
          v-if="user"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >mdi-account-box</v-icon>
          Profile
        </v-btn>
        <v-btn
          small
          depressed
          color="primary"
          v-if="user"
          @click="handleSignoutUser"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >mdi-exit-to-app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      temporary
      fixed
      v-model="sideNav"
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

      <v-list
        dense
        nav
      >
        <v-list-item
          ripple
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
          exact
          link
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          ripple
          link
          v-if="user"
          @click="handleSignoutUser"
        >
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Content -->
    <main>
      <v-container class="mt-12">
        <transition name="fade">
          <router-view />
        </transition>

        <v-snackbar
          v-model="authSnackbar"
          color="success"
          bottom
          left
          :timeout="5000"
        >
          <v-icon
            dark
            class="mr-3"
          >mdi-check-circle</v-icon>
          <h3>Signed in successfully</h3>
          <v-btn
            dark
            text
            @click.native="authSnackbar = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-snackbar>

        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          color="warning"
          bottom
          left
          :timeout="5000"
        >
          <v-icon
            dark
            class="mr-3"
          >mdi-cancel</v-icon>
          <h3>{{authError.message}}</h3>
          <v-btn
            dark
            text
            to="/signin"
          >
            Sign In
          </v-btn>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    };
  },
  computed: {
    ...mapGetters(["authError", "user"]),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [{ icon: "mdi-message-text", title: "Posts", link: "/posts" }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "mdi-message-text", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-pencil", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [
          { icon: "mdi-message-text", title: "Posts", link: "/posts" },
          {
            icon: "mdi-message-plus",
            title: "Create Post",
            link: "/posts/new"
          },
          { icon: "mdi-account-box", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  watch: {
    user(newUser, oldUser) {
      if (oldUser === null) this.authSnackbar = true;
    },
    authError(value) {
      if (value !== null) this.authErrorSnackbar = true;
    }
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
