<template>
  <article class="part">
    <h1 class="title">{{ $t("home.experiences.title") }}</h1>

    <section>
      <article v-for="experience in experiences" :key="experience.title">

        <h3>{{ experience.title }}</h3>
        <h4>{{ experience.company }} {{ experience.company ? "•" : "" }} {{ experience.contract }} - {{ experience.localization.cityName }} ({{ experience.localization.regionCode }}), {{ experience.localization.countryName }}</h4>
        <h5>{{ experience.startedAt }} - {{ experience.endedAt ?? $t("global.date.today") }}</h5>
        <ul>
          <li v-for="line in experience.description" :key="line">
            {{line}}
          </li>
        </ul>
      </article>
    </section>
  </article>
</template>

<script setup>
import experiences from "@/data/experiences.json";
</script>

<style lang="scss" scoped>
@import "@/scss/components/home/home-base.scss";
@import "@/scss/components/home/home-experiences.scss";
</style>