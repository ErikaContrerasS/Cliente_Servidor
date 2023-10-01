<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useUserSession } from "/@src/stores/userSession";
import { ref } from "vue";
const { locale, t } = useI18n();

const openSubsidebarLinks = ref("");

const emit = defineEmits(["close"]);
const userSession = useUserSession();
const rolUser = JSON.parse(window.localStorage.user).role;

const hasPermissions = (permissionsCode: string) => {
	return userSession.hasPermissions(permissionsCode);
};
const country = JSON.parse(window.localStorage.user).country;
let rout = `/reports/bra/`;
switch (country) {
	case 1:
		rout = `/reports/bra/`;
		break;
	case 2:
		rout = `/reports/mex/`;
		break;
}
</script>

<template>
	<div class="mobile-subsidebar">
		<div class="inner">
			<div class="sidebar-title">
				<h3>Dashboards</h3>
			</div>

			<ul class="submenu" data-simplebar>
				<RouterLink :to="rout">
					<i class="fas fa-clipboard mr-3" aria-hidden="true"></i>
					<span>{{ t("sidebar.subItems.reportsConsult") }}</span>
				</RouterLink>
			</ul>

			<ul class="submenu" data-simplebar>
				<RouterLink :to="rout">
					<i class="fas fa-clipboard mr-3" aria-hidden="true"></i>
					<span>{{ t("sidebar.subItems.reportsConsultTurn") }}</span>
				</RouterLink>
			</ul>
			<ul class="submenu" data-simplebar>
				<RouterLink :to="rout">
					<i class="fas fa-clipboard mr-3" aria-hidden="true"></i>
					<span>{{ t("sidebar.subItems.reportsConsultClosedTurnedTurn") }}</span>
				</RouterLink>
			</ul>
		</div>
	</div>
</template>
