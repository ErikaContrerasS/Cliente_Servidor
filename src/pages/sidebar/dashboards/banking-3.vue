<script setup lang="ts">
import { useHead } from "@vueuse/head";

import { useViewWrapper } from "/@src/stores/viewWrapper";

const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle("Dashboards");

useHead({
	title: "Dashboards - Creciendo Seguro",
});
</script>

<template>
	<div class="page-content-inner">
		<BankingDashboardV3 />
	</div>
</template>
