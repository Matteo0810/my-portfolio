<template>
  <header>
    <nav aria-label="Navigation" aria-description="global navigation and language switching">
      <ul>
        <li>
          <router-link to="/#">
            {{ $t("header.navigation.home") }}
          </router-link>
        </li>
        <li>
          <router-link to="/#about">
            {{ $t("header.navigation.about") }}
          </router-link>
        </li>
        <li>
          <router-link to="/#education">
            {{ $t("header.navigation.education") }}
          </router-link>
        </li>
        <li>
          <router-link to="/#experiences">
            {{ $t("header.navigation.experiences") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'projects'}">
            {{ $t("header.navigation.projects") }}
          </router-link>
        </li>
        <li>
          <router-link to="/#contact">
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
import {onBeforeUnmount, onMounted, ref} from "vue";
import {triggerWhenElementFound} from "@/utils/globalUtils";

const { locale, availableLocales } = useI18n();

const localesDropdownToggled = ref(false);

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

onMounted(() => {
  document.addEventListener("click", isClickingOutsideLocalesDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", isClickingOutsideLocalesDropdown);
})
</script>

<style lang="scss" scoped>
@import "@/scss/components/layout/base-header.scss";
</style>