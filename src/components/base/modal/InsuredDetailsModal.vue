<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  data: { type: Object, required: true },
  title: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
})
const emit = defineEmits(['hide', 'add'])

const { t } = useI18n()

const insured = computed(() => props.data)
const title = computed(() => props.title)
const isModalOpen = computed(() => props.isOpen)
</script>

<template>
  <VModal :open="isModalOpen" :title="title" actions="center" @close="emit('hide')">
    <template #content>
      <div class="columns is-multiline">
        <div class="column is-6">
          <p>{{ t('utils.tabs.beneficiaries.tableColumns.name') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ `${insured.first_name} ${insured.last_name_1}` }}
        </div>
        <div class="column is-6">
          <p>
            {{ t('utils.tabs.beneficiaries.tableColumns.idDocument') }}
          </p>
        </div>
        <div class="column is-6 has-text-right">
          {{ insured.id_number }}
        </div>
        <div class="column is-6">
          <p>{{ t('utils.tabs.beneficiaries.tableColumns.gender') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ insured.sex }}
        </div>
        <div class="column is-6">
          <p>{{ t('utils.tabs.beneficiaries.tableColumns.dob') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ insured.dob }}
        </div>
        <div class="column is-6">
          <p>{{ t('utils.tabs.beneficiaries.tableColumns.age') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ insured.age }} {{ t('utils.tabs.beneficiaries.tableColumns.years') }}
        </div>
      </div>
    </template>
  </VModal>
</template>
