<template>
  <div role="dialog" ref="projectDetailsRef" class="details" v-show="isShown">
    <button @click="closeDetails" class="icon icon-close close">
      {{ $t("projects.project.details.close") }}
    </button>

    <main>
      <h2>{{ project.title }}</h2>
      <h3>{{ toLocaleDate(project.startedAt) }} - {{ toLocaleDate(project.endedAt) }}</h3>
      <ul class="categories">
        <li v-for="category in project.categories">
          {{category}}
        </li>
      </ul>

      <h4>{{ $t("projects.project.details.description") }}</h4>
      <p>{{ project.shortDescription }}</p>

      <h4>{{ $t("projects.project.details.technologies") }}</h4>
      <ul class="skills">
        <li v-for="skill in project.skills" :key="skill">
          {{ skill }}
        </li>
      </ul>

      <h4>{{ $t("projects.project.details.steps") }}</h4>
      <ul class="steps">
        <li v-for="step in project.steps" :key="step">{{step}}</li>
      </ul>

      <h4>{{ $t("projects.project.details.links") }}</h4>
      <ul class="links">
        <li v-for="link in project.links" :key="link.href">
          <a v-if="link.type === 'REDIRECTION'" rel="noreferrer" target="_blank" :href="link.href" class="icon icon-redirect">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import {onMounted, ref, toRefs} from "vue";
import {toLocaleDate} from "@/utils/dateUtils";

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  isShown: {
    type: Boolean,
    default: false,
    required: true
  }
});
const {project, isShown} = toRefs(props);

const emit = defineEmits(["closeDetails"]);

const projectDetailsRef = ref(null);

function closeDetails() {
  const element = projectDetailsRef.value;
  if(!element)
    throw new Error("element not found.");
  element?.classList?.add("close");
  setTimeout(() => {
    element?.classList?.remove("close");
    emit('closeDetails');
  }, .8e3);
}
</script>

<style lang="scss" scoped>
@import "@/scss/components/projects/project-list-item-details.scss";
</style>