<template>
  <div class="center">
    <h1>{{$t("error.404.title") }}</h1>
    <h2>{{ $t("error.404.message") }}</h2>
    <router-link :to="{name:'home'}">{{ $t("error.404.backToHome") }}</router-link>
  </div>
</template>

<style lang="scss" scoped>
  .center {
    text-align: center;
    height: calc(100vh - 11em);

    &>a {
      margin-top: .2em;
      display: block;
      width: fit-content;
      font-size: 1.2em;
    }
  }
</style>