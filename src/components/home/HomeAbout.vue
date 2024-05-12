<template>
  <article id="about">
    <h1 class="title">{{ $t("home.about.title") }}</h1>
    <p v-html="$t('home.about.description')"></p>

    <nav aria-label="Links">
      <a href="https://www.linkedin.com/in/matt%C3%A9o-gaillard/" target="_blank" rel="noreferrer">
        <button class="icon icon-linked-in">Linkedin</button>
      </a>
      <a href="https://github.com/Matteo0810" target="_blank" rel="noreferrer">
        <button class="icon icon-github">Github</button>
      </a>
    </nav>
  </article>
</template>

<style lang="scss" scoped>
@import "@/scss/components/home/home-about.scss";
</style>