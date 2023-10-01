<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  data: { type: Array, required: true },
  title: { type: String, required: true },
  type: { type: String, default: '', required: false },
  modalTitle: { type: String, required: true },
})
const emit = defineEmits(['hide', 'add'])

const { t } = useI18n()
const isDetailOpen = ref(false)
const selectedPerson = ref({})

const people = computed(() => props.data)
const title = computed(() => props.title)
const type = computed(() => props.type)
const modalTitle = computed(() => props.modalTitle)

const setModalInfo = (person) => {
  selectedPerson.value = person
  isDetailOpen.value = true
}
</script>

<template>
  <VCard v-if="people.length != 0" radius="smooth" class="mt-5">
    <!--Detail Modal -->
    <InsuredDetailsModal
      :isOpen="isDetailOpen"
      :data="selectedPerson"
      :title="modalTitle"
      @hide="isDetailOpen = false"
    />

    <h3 class="title is-5 has-text-centered">{{ title }}</h3>
    <div class="table-container">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th scope="col" class="is-media"></th>
            <th scope="col">{{ t('utils.tabs.beneficiaries.tableColumns.name') }}</th>
            <th scope="col">{{ t('utils.tabs.Depentents.IdentificationNumber') }}</th>
            <th scope="col" class="has-text-centered">
              {{ t('utils.tabs.Depentents.Dateofbirth') }}
            </th>
            <th v-if="type != 'holder'" scope="col" class="has-text-centered">
              {{ t('utils.tabs.beneficiaries.tableColumns.benefitamount') }}
            </th>
            <th scope="col">{{ t('utils.tabs.Depentents.Gender') }}</th>
            <th scope="col" class="has-text-centered">
              {{ t('utils.tabs.beneficiaries.tableColumns.action') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="insured in people" :key="insured.id_number">
            <td class="is-media">
              <VAvatar :initials="insured.first_name.charAt(0)" color="info" />
            </td>
            <td>{{ `${insured.first_name} ${insured.last_name_1}` || 'N/A' }}</td>
            <td>{{ insured.id_number || 'N/A' }}</td>
            <td class="has-text-centered">
              {{ insured.dob || 'N/A' }}
            </td>
            <td v-if="type != 'holder'" class="has-text-centered">
              {{ insured.benefit_ammount || '0%' }}
            </td>
            <td>{{ insured.sex || 'N/A' }}</td>
            <td class="has-text-centered">
              <VIconButton
                color="primary"
                class="ml-2"
                v-tooltip.top.right="t('utils.tooltips.seeDetails')"
                outlined
                icon="feather:eye"
                @click="setModalInfo(insured)"
              />
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
