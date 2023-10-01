<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import { usePolicy } from '/@src/composable/usePolicy'
// const { coverage } = usePolicy()

const props = defineProps({
  data: { type: Array, required: true },
})

const { t } = useI18n()

const coverage = computed(() => props.data)
</script>

<template>
  <VCard v-if="coverage.length != 0" radius="smooth" class="mt-5">
    <h3 class="title is-5 has-text-centered">{{ t('utils.tabs.coverage.title') }}</h3>
    <div class="table-container">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th scope="col">{{ t('utils.tabs.coverage.tableColumns.description') }}</th>
            <th scope="col">
              {{ t('utils.tabs.coverage.tableColumns.capitalInsured') }}
            </th>
            <th scope="col" class="has-text-centered">
              {{ t('utils.tabs.coverage.tableColumns.netPolicyPremium') }}
            </th>
            <th scope="col" class="has-text-centered">
              {{ t('utils.tabs.coverage.tableColumns.taxFinancialOperations') }}
            </th>
            <th scope="col" class="has-text-centered">
              {{ t('utils.tabs.coverage.tableColumns.totalPolicyPremium') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="element in coverage" :key="element.description">
            <td>{{ element.description || 'N/A' }}</td>
            <td>{{ element.capital_insured || 'N/A' }}</td>
            <td class="has-text-centered">
              {{ element.net_policy_premium || '0' }}
            </td>
            <td class="has-text-centered">
              {{ element.tax_financial_operations || '0' }}
            </td>
            <td class="has-text-centered">{{ element.total_policy_premium || '0' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </VCard>

  <div v-else>
    <VPlaceholderSection :title="t('utils.tabs.messages.noData')" subtitle="" />
  </div>
</template>
