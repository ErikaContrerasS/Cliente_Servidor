<script setup lang="ts">
import { useUserSession } from "/@src/stores/userSession";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();

const openSubsidebarLinks = ref("");

const emit = defineEmits(["close"]);
const userSession = useUserSession();
const rolUser = JSON.parse(window.localStorage.user).role;

const hasPermissions = (permissionsCode: string) => {
	return userSession.hasPermissions(permissionsCode);
};

const isVisibleSelectRegion = () => {
	const NewUser = JSON.parse(localStorage.getItem("user") || "");
	NewUser.isVisibleSelectRegional = "false";
	useUserSession().setUser(NewUser);
};
</script>

<template>
	<div class="sidebar-panel is-generic">
		<div class="subpanel-header">
			<h3 class="no-mb">{{ t("sidebar.titles.policies") }}</h3>
			<div
				class="panel-close"
				tabindex="0"
				@keydown.space.prevent="emit('close')"
				@click="emit('close')"
			>
				<i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
			</div>
		</div>
		<div class="inner" data-simplebar>
			<ul>
				<!-- Liverpool -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					@click="isVisibleSelectRegion()"
					collapse-id="liverpool"
					v-if="hasPermissions('LIVERPOOL')"
				>
					<template #header>
						Liverpool TMK
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>
					<RouterLink :to="`/liverpool/certificates/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.InsuredConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Liverpool -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="liverpool-ta"
					v-if="hasPermissions('LIVERPOOL-TA')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Liverpool TA
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>
					<RouterLink :to="`/liverpool-ta/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.InsuredConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Costco -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="costco"
					@click="isVisibleSelectRegion()"
					v-if="hasPermissions('COSTCO')"
				>
					<template #header>
						Costco
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>
					<RouterLink :to="`/cotsco/quote/825`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Sise -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="sise"
					v-if="hasPermissions('AP MERCADOS MASIVOS TRADICIONALES')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						AP Mercados Masivos Tradicionales
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/sise/policies/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.historyConsult") }}</span>
					</RouterLink>
					<RouterLink :to="`/sise/products/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.productsConsult") }}</span>
					</RouterLink>
					<RouterLink
						:to="`/sise/sales/`"
						class="is-submenu"
						v-if="rolUser != 'visor' && rolUser != 'broker'"
					>
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.saleGeneration") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- AutoMarsh -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="automarsh"
					v-if="hasPermissions('AUTOMARSH')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						AutoMarsh
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/automarsh/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>

					<RouterLink :to="`/automarsh/payments/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.paymentsConsult") }}</span>
					</RouterLink>

					<RouterLink :to="`/automarsh/reports/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.reports") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- GrupoChopo -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="grupochopo"
					v-if="hasPermissions('GRUPO CHOPO')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Grupo Chopo
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/grupochopo/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- GrupoHerradura -->
				<!-- <VCollapseLinks
          v-model:open="openSubsidebarLinks"
          collapse-id="grupoherradura"
          v-if="hasPermissions('GRUPO HERRADURA')"
        >
          <template #header>
            Grupo Herradura
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink :to="`/herradura/list/`" class="is-submenu">
            <i class="lnir lnir-certificate" aria-hidden="true"></i>
            <span>{{ t("sidebar.subItems.loadManagement") }}</span>
          </RouterLink>
        </VCollapseLinks> -->

				<!-- Suburbia -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="suburbia"
					v-if="hasPermissions('SUBURBIA')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Suburbia
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/suburbia/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Aon Explorer -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="aon"
					v-if="hasPermissions('AON EXPLORER')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Aon Explorer
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/aonExplorer/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>

					<RouterLink :to="`/aonExplorer/payments/`" class="is-submenu">
						<i class="lnir lnir-dollar-card" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.paymentConsult") }}</span>
					</RouterLink>

					<RouterLink :to="`/aonExplorer/reports/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.reports") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- HOGAR -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="hogar"
					v-if="hasPermissions('HOGAR')"
				>
					<template #header>
						Hogar Flex
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/hogar/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- ACCESO SALUD -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="salud"
					v-if="hasPermissions('ACCESO SALUD')"
				>
					<template #header>
						Acceso Salud
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/salud/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- EMPLEADOS AIG -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="empleados"
					v-if="hasPermissions('EMPLEADOS AIG')"
				>
					<template #header>
						Empleados AIG
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/empleados/reports`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.reports") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- FEDERACION MEX -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="federacion"
					v-if="hasPermissions('FEDERACION MEX')"
				>
					<template #header>
						Federacion Mexicana
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/federacion/reports`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.reports") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="empleados"
					v-if="hasPermissions('DATASTUDIO HOGAR')"
				>
					<template #header>
						Datastudio Hogar
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/datastudiohogar/reports`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.reports") }}</span>
					</RouterLink>
				</VCollapseLinks>
			</ul>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../scss/layout/sidebar-panel";
</style>
