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
</script>

<template>
	<div class="mobile-subsidebar">
		<div class="inner" style="width: auto">
			<div class="sidebar-title">
				<h3>Dashboards</h3>
			</div>

			<ul class="submenu" data-simplebar>
				<!-- Liverpool -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="liverpool"
					v-if="hasPermissions('LIVERPOOL')"
				>
					<template #header>
						Liverpool
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>
					<RouterLink :to="`/liverpool/certificates/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.InsuredConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Costco -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="costco"
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
          style="width: auto"
        >
          <template #header>
            Grupo Herradura
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink :to="`/herradura/list/`" class="is-submenu">
            <i class="lnir lnir-certificate icon" aria-hidden="true"></i>
            <span class="icon-text">{{ t("sidebar.subItems.loadManagement") }}</span>
          </RouterLink>
        </VCollapseLinks> -->

				<!-- Suburbian -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="suburbia"
					v-if="hasPermissions('SUBURBIA')"
				>
					<template #header>
						Suburbia
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/suburbia/list/`" class="is-submenu">
						<i class="lnir lnir-certificate icon" aria-hidden="true"></i>
						<span class="icon-text">{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Aon Explorer -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="aon"
					v-if="hasPermissions('AON EXPLORER')"
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

				<!-- Hogar -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="hogar"
					v-if="hasPermissions('HOGAR')"
				>
					<template #header>
						Hogar Flex
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/hogar/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Acceso Salud -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="salud"
					v-if="hasPermissions('ACCESO SALUD')"
				>
					<template #header>
						Acceso Salud
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/salud/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Empleados AIG -->
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

				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="hogar"
					v-if="hasPermissions('DATASTUDIO HOGAR')"
				>
					<template #header>
						Datastudio Hogar
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/hogar/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>
			</ul>
		</div>
	</div>
</template>
