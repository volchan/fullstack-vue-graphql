<template>
  <v-alert
    border="left"
    colored-border
    dense
    type="error"
    elevation="2"
    :value="true"
    transition="scale-transition"
    dismissible
  >
    {{message}}
  </v-alert>
</template>

<script>
export default {
  name: "FormAlert",
  props: ["message"]
};
</script>

<style lang="scss" scoped>
</style>