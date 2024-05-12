<script setup>
import { RouterView } from "vue-router";

import BaseHeader from "@/components/layout/BaseHeader.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";
</script>

<template>
  <base-header />
  <main>
    <router-view />
  </main>
  <base-footer />
</template>