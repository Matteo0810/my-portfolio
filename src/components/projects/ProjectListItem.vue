<template>
  <project-list-item-details
      @close-details="() => isShown = false"
      :project="project"
      :isShown="isShown"
  />

  <article>
    <h3>{{project.title}}</h3>
    <h4>
      {{toLocaleDate(project.startedAt)}} - {{toLocaleDate(project.endedAt)}}
    </h4>

    <ul class="categories">
      <li @click="() => emit('toggleFilter', 'categories', category)" class="icon icon-tag" :key="category" v-for="category in project.categories">
        {{category}}
      </li>
    </ul>

    <h5>{{ $t("projects.project.skillsTitle") }}</h5>
    <ul class="skills">
      <li @click="() => emit('toggleFilter', 'skills', skill)" v-for="skill in project.skills" :key="skill">
        {{ skill }}
      </li>
    </ul>

    <template v-if="project.links.length">
      <h5>{{ $t("projects.project.linksTitle") }}</h5>
      <ul class="links">
        <li v-for="link in project.links.filter(({type}) => type === 'REDIRECTION')" :key="link.label" class="icon icon-redirect">
          <a class="icon icon-redirect" :href="link.href" target="_blank" rel="noreferrer">
            {{link.label}}
          </a>
        </li>
      </ul>
    </template>

    <button @click="isShown = true" class="see-more icon icon-arrow-right">
      {{ $t("projects.project.seeMore") }}
    </button>
  </article>
</template>

<script setup>
import {ref, toRefs} from "vue";
import ProjectListItemDetails from "@/components/projects/ProjectListItemDetails.vue";
import {toLocaleDate} from "@/utils/dateUtils";

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: value => {
      return value.title &&
          value.shortDescription &&
          value.categories?.length &&
          value.steps?.length &&
          value.skills?.length &&
          value.startedAt && value.endedAt;
    }
  }
});
const {project} = toRefs(props);

const emit = defineEmits(["toggleFilter"]);

const isShown = ref(false);
</script>

<style lang="scss" scoped>
@import "@/scss/components/projects/project-list-item.scss";
</style>