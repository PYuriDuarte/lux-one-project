<template>
  <div>
    <h2>Repositórios Favoritos</h2>
    <ul>
      <li v-for="(repo, index) in favorites" :key="index">
        <a :href="repo.html_url">{{repo.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Fav",
  data() {
    return {
      favorites: [],
    }
  },
}
</script>
