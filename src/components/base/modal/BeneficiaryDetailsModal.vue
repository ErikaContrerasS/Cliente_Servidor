<script setup lang="ts">
import { computed } from 'vue';
import moment from "moment";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['hide']);

const isModalOpen = computed(() => props.isOpen);

const beneficiaryInfo = computed(() => props.data || {})

const fullName = computed(() => {
  return beneficiaryInfo.value.beneficiary_given_name + " " + beneficiaryInfo.value.beneficiary_family_name;
})

const formatDate = (date: Date | string) => {
  return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY');
}

const calculateYearOld = (date: Date | string) => {
  return moment().diff(moment(date, "DD/MM/YYYY"), 'years')
}
</script>

<template>
  <VModal
    :open="isModalOpen"
    :title="t('utils.modals.dependent.title')"
    actions="center"
    @close="emit('hide')"
  >
    <template #content>
      <div class="columns is-multiline">
        <div class="column is-6">
          <p>{{ t('utils.headerCards.detailsCards.currentQuote.fullname') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ fullName }}
        </div>
        <div class="column is-6">
          <p>{{ t('utils.modals.dependent.idNumber') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ beneficiaryInfo.id_number || 'N/A'}}
        </div>
        <div class="column is-6">
          <p>{{ t('utils.modals.dependent.genre') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ beneficiaryInfo.sex_code == "M" ? t('utils.general.male') : t('utils.general.female') }}
        </div>
        <div class="column is-6">
          <p>{{ t('utils.modals.dependent.dob') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ formatDate(beneficiaryInfo.beneficiary_dob) }}
        </div>
        <div class="column is-6">
          <p>{{ t('utils.modals.dependent.age') }}</p>
        </div>
        <div class="column is-6 has-text-right">
          {{ calculateYearOld(formatDate(beneficiaryInfo.beneficiary_dob)) }} {{ t('utils.general.anios') }}
        </div>
      </div>
    </template>
  </VModal>
</template>
