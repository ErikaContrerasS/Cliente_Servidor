<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUserSession } from '/@src/stores/userSession'
import { ref } from 'vue'
const { locale, t } = useI18n()

const openSubsidebarLinks = ref('')

const emit = defineEmits(['close'])
const userSession = useUserSession()
const rolUser = JSON.parse(window.localStorage.user).role

const hasPermissions = (permissionsCode: string) => {
  return userSession.hasPermissions(permissionsCode)
}
</script>

<template>
  <div class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Dashboards</h3>
      </div>

      <ul class="submenu" data-simplebar>
        <!-- Sise -->
        <VCollapseLinks
          v-model:open="openSubsidebarLinks"
          collapse-id="sise"
          v-if="hasPermissions('NEMA')"
        >
          <template #header>
            Nema
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink :to="`/nema/list/`" class="is-submenu">
            <i class="lnir lnir-certificate" aria-hidden="true"></i>
            <span>{{ t('sidebar.subItems.policyConsult') }}</span>
          </RouterLink>
        </VCollapseLinks>

        <!-- Korsa -->
        <VCollapseLinks
          v-model:open="openSubsidebarLinks"
          collapse-id="sise"
          v-if="hasPermissions('CLUBE MERCOSUL')"
        >
          <template #header>
            Clube Mercosul
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>
          <RouterLink :to="`/korsa/list`" class="is-submenu">
            <i class="lnir lnir-certificate" aria-hidden="true"></i>
            <span>{{ t('sidebar.subItems.policyConsult') }}</span>
          </RouterLink>
        </VCollapseLinks>

        <!-- Minimed -->
        <VCollapseLinks
          v-model:open="openSubsidebarLinks"
          collapse-id="sise"
          v-if="hasPermissions('MINIMED')"
        >
          <template #header>
            Minimed
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink :to="`/minimed/quotes/`" class="is-submenu">
            <i class="lnir lnir-certificate" aria-hidden="true"></i>
            <span>{{ t('sidebar.subItems.policyConsult') }}</span>
          </RouterLink>
        </VCollapseLinks>

        <!-- Iex -->
        <VCollapseLinks
          v-model:open="openSubsidebarLinks"
          collapse-id="sise"
          v-if="hasPermissions('IEX')"
        >
          <template #header>
            Iex
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink :to="`/iex/list/`" class="is-submenu">
            <i class="lnir lnir-certificate" aria-hidden="true"></i>
            <span>{{ t('sidebar.subItems.policyConsult') }}</span>
          </RouterLink>
        </VCollapseLinks>

        <!-- Nema -->
        <VCollapseLinks
          v-model:open="openSubsidebarLinks"
          collapse-id="sise"
          v-if="hasPermissions('NEMA')"
        >
          <template #header>
            Nema
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink :to="`/nema/list/`" class="is-submenu">
            <i class="lnir lnir-certificate" aria-hidden="true"></i>
            <span>{{ t('sidebar.subItems.policyConsult') }}</span>
          </RouterLink>
        </VCollapseLinks>

        <!-- Uello -->
        <VCollapseLinks
          v-model:open="openSubsidebarLinks"
          collapse-id="sise"
          v-if="hasPermissions('UELLO')"
        >
          <template #header>
            Uello
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink :to="`/uello/list/`" class="is-submenu">
            <i class="lnir lnir-certificate" aria-hidden="true"></i>
            <span>{{ t('sidebar.subItems.policyConsult') }}</span>
          </RouterLink>
        </VCollapseLinks>
      </ul>
    </div>
  </div>
</template>
