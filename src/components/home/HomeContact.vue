<template>
  <article class="part" id="contact">
    <h1 class="title">{{ $t("home.contact.title") }}</h1>
    <nav>
      <a class="phone-number">{{ $t("home.contact.phone") }}: </a>
      <a class="email">{{ $t("home.contact.email") }}: </a>
    </nav>
  </article>
</template>

<style lang="scss" scoped>
@import "@/scss/components/home/home-base.scss";
@import "@/scss/components/home/home-contact.scss";
</style>