<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="no-hover">
          <img
            alt="Giphy logo"
            class="logo"
            src="@/assets/logo.png"
            width="125"
            height="125"
          />
        </RouterLink>
        <RouterLink to="/giphy">Giphy</RouterLink>
        <RouterLink to="/giphy">Emoji</RouterLink>
        <RouterLink to="/upload" custom v-slot="{ navigate }">
          <button class="upload" @click="navigate" role="link">Upload</button>
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.upload {
  padding: 8.5px 16px;
  border-radius: 2px;
  background: linear-gradient(
    263.31deg,
    rgb(153, 51, 255) -97.49%,
    rgb(97, 87, 255) 94.14%
  );
  cursor: pointer;

  color: rgb(255, 255, 255);
  font-size: 15px;
  font-weight: 600;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} */

nav {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

/*nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

.logo {
  margin: 0 2rem 0 0;
  object-fit: contain;
}

.logo {
  background-color: inherit;
}

/* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
