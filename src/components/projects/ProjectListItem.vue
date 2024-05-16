<template>
  <project-list-item-details
      @close-details="() => showDetails = false"
      :project="project"
      v-show="showDetails"
  />

  <article>
    <h3>{{project.title}}</h3>
    <h4>
      {{toLocaleDate(project.startedAt)}} -
      <span v-if="project.endedAt">{{toLocaleDate(project.endedAt)}}</span>
      <span v-else>{{ $t("projects.project.pendingDate") }}</span>
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

    <button @click="showDetails = true" class="see-more icon icon-arrow-right">
      {{ $t("projects.project.seeMore") }}
    </button>
  </article>
</template>

<script setup>
import {ref, toRefs} from "vue";
import ProjectListItemDetails from "@/components/projects/ProjectListItemDetails.vue";
import {toLocaleDate} from "../../utils/dateUtils";

const props = defineProps({
  project: {
    type: Object,
    validator: value => {
      return value.title &&
          value.categories?.length &&
          value.description?.length &&
          value.skills?.length &&
          value.startedAt;
    }
  }
});
const {project} = toRefs(props);

const emit = defineEmits(["toggleFilter"]);

const showDetails = ref(false);
</script>

<style lang="scss" scoped>
@import "@/scss/components/projects/project-list-item.scss";
</style>