<template>
  <header>
    <button :class="{'navbar-toggled': responsiveMenuToggled}" @click="responsiveMenuToggled = !responsiveMenuToggled" class="responsive-button icon icon-menu">
      {{ $t(`header.${responsiveMenuToggled ? "closeResponsiveMenuButton" : "responsiveMenuButton"}`) }}
    </button>
    <nav v-show="responsiveMenuToggled" aria-label="Navigation" aria-description="global navigation and language switching">
      <ul>
        <li>
          <router-link to="/">
            {{ $t("header.navigation.home") }}
          </router-link>
        </li>
        <li>
          <router-link to="/" @click="() => scrollTo('about')">
            {{ $t("header.navigation.about") }}
          </router-link>
        </li>
        <li>
          <router-link to="/" @click="() => scrollTo('schooling')">
            {{ $t("header.navigation.education") }}
          </router-link>
        </li>
        <li>
          <router-link to="/" @click="() => scrollTo('experiences')">
            {{ $t("header.navigation.experiences") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'projects'}">
            {{ $t("header.navigation.projects") }}
          </router-link>
        </li>
        <li>
          <router-link to="/" @click="() => scrollTo('contact')">
            {{ $t("header.navigation.contact") }}
          </router-link>
        </li>
      </ul>

      <div class="locales">
        <button @click="toggleLocalesDropdown" :class="{'active': localesDropdownToggled}" class="icon">
          {{ locale }}
        </button>
        <ul v-show="localesDropdownToggled" class="dropdown" role="listbox">
          <li
              :class="{'selected': lang === locale}"
              v-for="lang in availableLocales"
              :key="lang"
              role="option"
              @click="() => switchLang(lang)"
          >
            <span class="icon" />
            {{ $t(`header.locales.${lang}`) }}
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {triggerWhenElementFound} from "@/utils/globalUtils";

const { locale, availableLocales } = useI18n();

const localesDropdownToggled = ref(false);

const responsiveMenuToggled = ref(true);

function toggleLocalesDropdown() {
  localesDropdownToggled.value = !localesDropdownToggled.value;
}

function switchLang(newLang) {
  locale.value = newLang;
  localesDropdownToggled.value = false;
}

function isClickingOutsideLocalesDropdown({ target }) {
  triggerWhenElementFound(target, "locales", isFound => {
    // if the targeted class wasn't found then close the dropdown
    if(!isFound)
      localesDropdownToggled.value = false;
  })
}

function scrollTo(elementId) {
  if(!elementId)
    throw new Error("No element id provided.")
  const position = document.getElementById(elementId)?.offsetTop;
  if(!position)
    throw new Error("Position not found.");
  window.scrollTo({ top: position, behavior: "smooth" });
}

function toggleResponsiveMenu() {
  responsiveMenuToggled.value = !window.matchMedia("(max-width: 740px").matches;
}

onMounted(() => {
  toggleResponsiveMenu();
  window.addEventListener("resize", toggleResponsiveMenu);
  document.addEventListener("click", isClickingOutsideLocalesDropdown);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", toggleResponsiveMenu);
  document.removeEventListener("click", isClickingOutsideLocalesDropdown);
})
</script>

<style lang="scss" scoped>
@import "@/scss/components/layout/base-header.scss";
</style>