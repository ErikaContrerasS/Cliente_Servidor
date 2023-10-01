<template>
  <VTabs
    selected="beneficiary"
    :tabs="[
      { label: 'Beneficiário', value: 'beneficiary', icon: 'fas fa-users' },
      { label: 'Segurado Adicional', value: 'insured', icon: 'fas fa-users' },
      { label: 'Cobertura', value: 'coverage', icon: 'fas fa-hospital' },
    ]"
  >
    <template #tab="{ activeValue }">
      <p v-if="activeValue === 'beneficiary'">
        <VPlaceholderSection title="Não há beneficiários disponíveis" />
      </p>
      <p v-else-if="activeValue === 'insured'">
        <VPlaceholderSection title="Não há segurados adicionais disponíveis" />
      </p>
      <p v-else-if="activeValue === 'coverage'">
        <VPlaceholderSection title="Não há cobertura disponível" />
      </p>
    </template>
  </VTabs>
</template>
