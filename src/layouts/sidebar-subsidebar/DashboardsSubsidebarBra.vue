<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useUserSession } from "/@src/stores/userSession";

const openSubsidebarLinks = ref("");

const emit = defineEmits(["close"]);
const { locale, t } = useI18n();

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
				<!-- Korsa -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="korsa"
					v-if="hasPermissions('CLUBE MERCOSUL')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Clube Mercosul
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>
					<RouterLink :to="`/korsa/list`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Hospital Card -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="hospitalcard"
					v-if="hasPermissions('HOSPITAL CARD')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Hospital Card
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/hospitalCard/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Iex -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="iex"
					v-if="hasPermissions('IEX')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Iex
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/iex/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Minimed -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="minimed"
					v-if="hasPermissions('MINIMED')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Minimed
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/minimed/new/form`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>Nova Cotação</span>
					</RouterLink>

					<RouterLink :to="`/minimed/new/certificates/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>Relatório</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Nema -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="nema"
					v-if="hasPermissions('NEMA')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Nema
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/nema/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Sollo / QualityLife -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="sollo"
					v-if="hasPermissions('SOLLO/QUALITYLIFE')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Sollo / QualityLife
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/solloQualityLife/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- SuperNova -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="supernova"
					v-if="hasPermissions('SUPERNOVA')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						SuperNova
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/superNova/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- Uello -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="uello"
					v-if="hasPermissions('UELLO')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Uello
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/uello/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- AUTOGESTION -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="Autogestão"
					v-if="hasPermissions('AUTO')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Autogestão
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/auto-management`" class="is-submenu">
						<i class="lnir lnir-add-files" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.novo") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- PAX -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="pax"
					v-if="hasPermissions('PAX')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Pax
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

          <RouterLink :to="`/pax/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
        </VCollapseLinks>
          
				<!-- QUALIVIDA -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="qualivida"
					v-if="hasPermissions('QUALIVIDA')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						Qualivida
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/qualivida/list/`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>

				<!-- JAMES -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="JAMES"
					v-if="hasPermissions('QUALIVIDA')"
					@click="isVisibleSelectRegion()"
				>
					<template #header>
						James
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/james`" class="is-submenu">
						<i class="lnir lnir-certificate" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.policyConsult") }}</span>
					</RouterLink>
				</VCollapseLinks>
			</ul>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../scss/layout/sidebar-panel";
</style>
