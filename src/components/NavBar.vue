<template>
  <b-navbar toggleable="sm" type="light">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="about">About</b-nav-item>
        <b-nav-item to="contact">Contact</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped lang="scss">
nav {
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.85);
}
</style>
