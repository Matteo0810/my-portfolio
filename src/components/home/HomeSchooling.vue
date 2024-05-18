<template>
  <article class="part" id="schooling">
    <h1 class="title">{{ $t("home.schooling.title") }}</h1>

    <section>
      <article :class="{'actual': index === 0}" v-for="(education, index) in schooling" :key="education.title">
        <span class="year year-to">{{ education.years.to ?? $t("global.date.today") }}</span>
        <span class="year year-from">{{ education.years.from }}</span>

        <img :src="`/images/schools/${education.thumbnailURL}`" :alt="`${education.establishment}'s logo`" />
        <div class="description" role="contentinfo">
          <h3>{{ education.title }}</h3>
          <h4>{{ education.establishment }} - {{ education.localization.cityName }} ({{ education.localization.regionCode }}), {{ education.localization.countryName }}</h4>
          <ul>
            <li v-for="line in education.description" :key="line">
              {{line}}
            </li>
          </ul>

          <nav>
            <ul>
              <li v-for="link in education.links" :key="link.label">
                <a v-if="link.type === 'REDIRECTION'" :href="link.href" rel="noreferrer" target="_blank" class="icon icon-redirect">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </article>
    </section>
  </article>
</template>

<script setup>
import schooling from "@/data/schooling.json";
</script>

<style lang="scss" scoped>
@import "@/scss/components/home/home-base.scss";
@import "@/scss/components/home/home-schooling.scss";
</style>