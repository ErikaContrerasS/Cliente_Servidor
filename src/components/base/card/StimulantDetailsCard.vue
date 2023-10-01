<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  data: { type: Object, required: true },
})

const { t } = useI18n()

const stimulant = computed(() => props.data)
</script>

<template>
  <VCard v-if="stimulant" radius="smooth" class="mt-5">
    <h3 class="title is-5 has-text-centered">{{ t('utils.tabs.stimulant.title') }}</h3>
    <div class="columns is-multiline" style="border-top: 1px solid #c4c4c4">
      <div class="column is-6">
        <p>
          {{ t('utils.tabs.beneficiaries.tableColumns.name') }}
        </p>
      </div>
      <div class="column is-6 has-text-right">
        <span>{{ stimulant.name || 'N/A' }}</span>
      </div>
      <div class="column is-3">
        <p>
          {{ t('utils.headerCards.detailsCards.locationInformation.city') }}
        </p>
      </div>

      <div class="column is-3 has-text-right">
        <span>{{ stimulant.city || 'N/A' }}</span>
      </div>
      <div class="column is-3">
        <p>
          {{ t('utils.headerCards.detailsCards.locationInformation.barrio') }}
        </p>
      </div>
      <div class="column is-3 has-text-right">
        <span>{{ stimulant.neighborhood || 'N/A' }}</span>
      </div>
      <div class="column is-3">
        <p>
          {{ t('utils.headerCards.detailsCards.locationInformation.address') }}
        </p>
      </div>
      <div class="column is-3 has-text-right">
        <span>{{ stimulant.address || 'N/A' }}</span>
      </div>
      <div class="column is-3">
        <p>
          {{ t('utils.headerCards.detailsCards.contactInformation.mobilePhone') }}
        </p>
      </div>
      <div class="column is- has-text-right">
        <span>{{ stimulant.phone || 'N/A' }}</span>
      </div>

      <div class="column is-3">
        <p>
          {{ t('utils.headerCards.detailsCards.contactInformation.postalCode') }}
        </p>
      </div>
      <div class="column is- has-text-right">
        <span>{{ stimulant.code || 'N/A' }}</span>
      </div>
    </div>
  </VCard>

  <div v-else>
    <VPlaceholderSection :title="t('utils.tabs.messages.noData')" subtitle="" />
  </div>
</template>
