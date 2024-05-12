<template>
  <div class="hero-header">
    <div role="contentinfo" class="content">
      <h1>Mattéo Gaillard</h1>
      <h2>{{ $t("home.heroHeader.subtitle") }}</h2>

      <nav aria-label="Links">
        <a href="https://www.linkedin.com/in/matt%C3%A9o-gaillard/" target="_blank" rel="noreferrer">
          <button class="icon icon-linked-in">Linkedin</button>
        </a>
        <a href="#" download="" target="_blank" rel="noreferrer">
          <button class="icon icon-download">{{ $t("home.heroHeader.myCV") }}</button>
        </a>
        <a href="https://github.com/Matteo0810" target="_blank" rel="noreferrer">
          <button class="icon icon-github">Github</button>
        </a>
      </nav>
    </div>

    <div role="graphics-object" class="mouse-wheel-down">
      <div class="slide-down" />
    </div>
    <div role="graphics-object" class="flower"  v-for="(_, i) in Array(4).fill(null)" :key="i"/>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/components/home/home-hero-header.scss";
</style>