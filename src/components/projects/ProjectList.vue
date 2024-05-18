<template>
  <project-list-item-details
      @close-details="() => projectShown = null"
      :project="projectShown"
  />

  <section class="projects-section">
    <aside v-show="filterShown" aria-label="filters" class="filters">
      <button @click="filterShown = false" class="close-filters icon icon-close">
        {{ $t("projects.list.closeFilters") }}
      </button>
      <template v-for="{name, data} in FILTERS" :key="name">
        <h4>
          {{ $t(`projects.list.filters.${name}.title`) }}
        </h4>
        <div class="field" v-for="value in data" :key="value">
          <input
              @change="() => toggleFilter(name, value)"
              :checked="activeFilters[name]?.includes(value)"
              :id="`${name}-${value}`"
              type="checkbox"
          />
          <label class="icon" :for="`${name}-${value}`">
            {{value}} <span class="count">{{allProjects.filter(project => project[name].some(v => value === v)).length}}</span>
          </label>
        </div>
      </template>
    </aside>
    <section class="projects">
      <header>
        <button @click="filterShown = true" class="filter icon icon-filter">{{ $t("projects.list.filterButton") }}</button>
        <h2>{{ $t("projects.list.title") }}</h2>
        <button
            class="sort icon icon-sort"
            :class="{'asc': sortDir === 1, 'desc': sortDir === -1}"
            @click="() => sortDir = sortDir === 1 ? -1 : 1"
        >
          {{ $t("projects.list.sortByDate") }}
        </button>
      </header>

      <aside aria-label="active-filters" v-show="activeFiltersLength" class="active-filters">
        <h5>Filtres actifs ({{ activeFiltersLength }})</h5>
        <ul>
          <template v-for="[name, values] in Object.entries(activeFilters)" :key="name">
            <li @click="() => removeFilter(name, value)" v-for="value in values" :key="value">
              &times; <span>{{ value }}</span>
            </li>
          </template>
        </ul>
      </aside>
      <section>
        <project-list-item
            :project="project"
            v-for="project in allProjects"
            :key="project.title"
            @toggle-filter="toggleFilter"
            @toggle-details="project = projectShown = project"
        />
      </section>
    </section>
  </section>
</template>

<script setup>
import projects from "@/data/projects.json";
import {computed, onMounted, onUnmounted, ref} from "vue";

import ProjectListItem from "@/components/projects/ProjectListItem.vue";
import ProjectListItemDetails from "@/components/projects/ProjectListItemDetails.vue";

// retrieve all skills and categories of all projects
const skills = ref([...new Set(projects.reduce((acc, {skills}) => [...acc, ...skills], []))]);
const categories = ref([...new Set(projects.reduce((acc, {categories}) => [...acc, ...categories], []))]);

// active filters section
const activeFilters = ref({});
const activeFiltersLength = computed(() => Object.keys(activeFilters.value).length);

// only for responsive purpose
const filterShown = ref(true);

const projectShown = ref(null);

// sort direction
const sortDir = ref(1);

// computed projects (computed because we can have filters)
const allProjects = computed(() => {
  const filters = Object.entries(activeFilters.value);
  let projectList = !filters.length ? projects : projects.filter(project =>
    filters.some(([key, values]) => project[key].some(v => values.includes(v)))
  );

  // transform all date into a js date object
  projectList = projectList.map(project => {
    project.startedAt = new Date(project.startedAt);
    if(project.endedAt)
      project.endedAt = new Date(project.endedAt);
    return project;
  });

  // sort by end date
  projectList = projectList.sort((a, b) => {
      return sortDir.value === -1 ?
          a.endedAt - b.endedAt :
          b.endedAt - a.endedAt;
  });

  return projectList;
});

// where add all new filters with the variable attached
const FILTERS = [
  { name: "categories", data: categories.value },
  { name: "skills", data: skills.value }
]

/**
 * @description add or remove a filter
 * @param {String} name the filter name
 * @param {Object} data the filter data
 */
function toggleFilter(name, data) {
  if(!name || !data)
    throw new Error("Missing filter name or filter data.");
  // if the filter name doesn't exist
  if(!activeFilters.value[name]) {
    // then add it
    activeFilters.value[name] = [data];
  // otherwise just add to the existing filter
  } else {
    // add the data only if it's not already exists
    if(!activeFilters.value[name].includes(data))
      activeFilters.value[name].push(data);
    else
      activeFilters.value[name].splice(activeFilters.value[name].indexOf(data), 1);

    if(!activeFilters.value[name].length)
      delete activeFilters.value[name];
  }
}

/**
 * @description remove a filter
 * @param {String} name a filter name
 * @param {Object} data a filter data
 */
function removeFilter(name, data) {
  if(!name || !data)
    throw new Error("Missing filter name or filter data.");
  if(!activeFilters.value[name])
    throw new Error(`Filter with name ${name} not found.`);
  const dataIndex = activeFilters.value[name].indexOf(data);
  // remove the filter data
  if(dataIndex !== -1)
    activeFilters.value[name].splice(dataIndex, 1);
  // if the filter is empty then remove it
  if(!activeFilters.value[name].length)
    delete activeFilters.value[name];
}

function toggleResponsiveFilterBar() {
  filterShown.value = !window.matchMedia("(max-width: 862px").matches;
}

onMounted(() => {
  toggleResponsiveFilterBar();
  window.addEventListener("resize", toggleResponsiveFilterBar);
})
onUnmounted(() => {
  window.removeEventListener("resize", toggleResponsiveFilterBar);
})

</script>

<style lang="scss" scoped>
@import "@/scss/components/projects/project-list.scss";
</style>