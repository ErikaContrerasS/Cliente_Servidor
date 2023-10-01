<script setup lang="ts">
/**
 * This is a Vue Component that will be
 * automatically mapped to a entry on vue-router.
 *
 * You will be able to access this page at http://localhost:3000/starters/navbar-blank-page-1
 * Page uri will match related path to src/pages folder
 *
 * Read more about routing:
 * @see /vite.config.ts
 * @see /src/router.ts
 */

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Documentos')

useHead({
  title: 'Documentos',
})
</script>

<template>
  <SidebarLayout>
    <!-- Content Wrapper -->

    <VPlaceholderPage
      title="Sistema de Documentos"
      subtitle="Carga documentos y gestionalos"
      larger
    >
      <template #image>
        <img
          class="light-image"
          src="/@src/assets/illustrations/placeholders/error-2.svg"
          alt=""
        />
      </template>
    </VPlaceholderPage>
  </SidebarLayout>
</template>
