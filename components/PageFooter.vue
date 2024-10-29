<script lang="ts" setup></script>

<template>
  <footer>
    <a aria-label="Instagram" href="#"><v-icon>mdi-instagram</v-icon></a>
    <a aria-label="Facebook" href="#"><v-icon>mdi-facebook</v-icon></a>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;

  a {
    margin: 0 2px;
    color: #454545;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #00b565;
    }
  }
}
</style>
