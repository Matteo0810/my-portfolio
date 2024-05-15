<template>
  <div role="dialog" ref="projectDetailsRef" class="details">
    <button @click="toggleCloseDetails" class="icon icon-close close">
      {{ $t("projects.project.details.close") }}
    </button>

    <div class="center">
      {{project}}

    </div>
  </div>
</template>

<script setup>
import {ref, toRefs} from "vue";

const props = defineProps({
  project: {
    type: Object
  }
});
const {project} = toRefs(props);

const emit = defineEmits(["closeDetails"]);

const projectDetailsRef = ref(null);

function toggleCloseDetails() {
  const element = projectDetailsRef.value;
  if(!element)
    throw new Error("project details ref not found.");
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