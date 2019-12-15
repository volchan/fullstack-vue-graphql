<template>
  <v-container mt-12>

    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h1 class="text-center">Get started here!</h1>
      </v-flex>
    </v-layout>

    <v-layout
      row
      wrap
      v-if="error"
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <v-card
          color="secondary"
          class="pa-4"
          dark
        >
          <v-container>
            <v-form
              @submit.prevent="handleSignupUser"
              v-model="isFormValid"
              lazy-validation
              ref="form"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="usernameRules"
                    prepend-inner-icon="mdi-account"
                    name="username"
                    label="Username"
                    type="text"
                    v-model="username"
                    outlined
                    id="username"
                  />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="emailRules"
                    prepend-inner-icon="mdi-account"
                    name="email"
                    label="Email"
                    type="text"
                    v-model="email"
                    outlined
                    id="email"
                  />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    outlined
                    :rules="passwordRules"
                    prepend-inner-icon="mdi-lock-open"
                    name="password"
                    label="Password"
                    :type="hidePassword ? 'password' : 'text'"
                    v-model="password"
                    id="password"
                    :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    outlined
                    :rules="passwordRules"
                    prepend-inner-icon="mdi-gavel"
                    name="passwordConfirmation"
                    label="Confirm password"
                    :type="hidePassword ? 'password' : 'text'"
                    v-model="passwordConfirmation"
                    id="passwordConfirmation"
                    :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex
                  xs12
                  class="text-center"
                >
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                    color="accent"
                    type="submit"
                  >
                    Sign up
                  </v-btn>
                  <h3>
                    Already have an account? <router-link to="/signin">Sign In</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      hidePassword: true,
      isFormValid: true,
      usernameRules: [
        username => !!username || "Username is required",
        username =>
          (username.length >= 3 && username.length <= 10) ||
          "Username must be between 3 and 10 characters."
      ],
      emailRules: [
        email => !!email || "Email is required",
        email => /\S+@\S+\.\S+/.test(email) || "Must provide a valid email."
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password =>
          password.length > 8 || "Password must be at least 8 characters.",
        confirmation =>
          confirmation === this.password || "Passwords don't match."
      ]
    };
  },
  computed: {
    ...mapGetters(["loading", "user", "error"])
  },
  methods: {
    handleSignupUser() {
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("signupUser", {
        username: this.username,
        email: this.email,
        password: this.password
      });
    }
  },
  watch: {
    user(user) {
      if (user) this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
