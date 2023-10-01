<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  data: { type: Array, required: true },
})

const { t } = useI18n()

const assists = computed(() => props.data)
</script>

<template>
  <VCard v-if="assists.length != 0" radius="smooth" class="mt-5">
    <h3 class="title is-5 has-text-centered">{{ t('utils.tabs.assists.title') }}</h3>
    <div class="table-container">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th scope="col">{{ t('utils.tabs.assists.tableColumns.actions') }}</th>
            <th scope="col">{{ t('utils.tabs.assists.tableColumns.description') }}</th>
            <th scope="col">{{ t('utils.tabs.assists.tableColumns.limits') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="assit in assists" :key="assit.actions">
            <td>{{ assit.actions || 'N/A' }}</td>
            <td>{{ assit.description || 'N/A' }}</td>
            <td>
              {{ assit.limits || 'N/A' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </VCard>

  <div v-else>
    <VPlaceholderSection :title="t('utils.tabs.messages.noData')" subtitle="" />
  </div>
</template>
