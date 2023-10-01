<script setup lang="ts">
import { computed } from "vue";
import { useHead } from "@vueuse/head";
import { useUserSession } from "/@src/stores/userSession";
import { useViewWrapper } from "/@src/stores/viewWrapper";

const userSession = useUserSession();
const viewWrapper = useViewWrapper();
viewWrapper.setPageTitle("Dashboard");

// const NewUser = JSON.parse(localStorage.getItem("user") || "");
// NewUser.isVisibleSelectRegional = "true";
// useUserSession().setUser(NewUser);

// const user = computed(() => userSession.user);

useHead({
	title: "Creciendo Seguro",
});

// const hasClearence = (clearenceCode: string) => {
// 	return userSession.hasClearence(clearenceCode);
// };
</script>

<template>
	<div class="page-content-inner">
		<CompanyDashboard />
		<!-- <EcommerceDashboardV1 /> -->
	</div>
</template>
