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
        <h1 class="text-center">Welcome Back!</h1>
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
              @submit.prevent="handleSigninUser"
              v-model="isFormValid"
              lazy-validation
              ref="form"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="loginRules"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    hint="Username or Email"
                    v-model="login"
                    id="login"
                  />
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    :rules="passwordRules"
                    prepend-icon="mdi-lock-open"
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
                    Sign in
                  </v-btn>
                  <h3>
                    Already have an account? <router-link to="/signup">Sign up</router-link>
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
  name: "Signin",
  data() {
    return {
      login: "",
      password: "",
      hidePassword: true,
      isFormValid: true,
      loginRules: [login => !!login || "Login is required"],
      passwordRules: [password => !!password || "Password is required"]
    };
  },
  computed: {
    ...mapGetters(["loading", "user", "error"])
  },
  methods: {
    handleSigninUser() {
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("signinUser", {
        login: this.login,
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
