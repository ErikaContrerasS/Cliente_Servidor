<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

const openSubsidebarLinks = ref('')

const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">{{ t('sidebar.titles.users') }}</h3>
      <div
        class="panel-close"
        tabindex="0"
        @keydown.space.prevent="emit('close')"
        @click="emit('close')"
      >
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li>
          <RouterLink :to="`/users/management/`">
            <i class="fas fa-user mr-3" aria-hidden="true"></i>
            <span>{{ t('sidebar.subItems.userManagement') }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/layout/sidebar-panel';
</style>
