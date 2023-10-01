<route lang="yaml">
meta:
  requiresAuth: true
</route>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
</script>

<template>
<VButtons>
    <VButton raised @click="$router.go(-1)">
        <span class="icon">
            <i aria-hidden="true" class="fas fa-arrow-left"></i>
        </span>
        <span>{{ t('utils.buttons.goBack') }}</span>
    </VButton>
</VButtons>
</template>