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
</script>

<template>
	<div class="sidebar-panel is-generic">
		<div class="subpanel-header">
			<h3 class="no-mb">{{ t("sidebar.titles.tracing") }}</h3>
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
				<!-- GrupoHerradura -->
				<VCollapseLinks
					v-model:open="openSubsidebarLinks"
					collapse-id="grupoherradura"
					v-if="hasPermissions('GRUPO HERRADURA')"
				>
					<template #header>
						Grupo Herradura
						<i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
					</template>

					<RouterLink :to="`/herradura/tracing/`" class="is-submenu">
						<i class="lnir lnir-empty-file" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.tracingFileLoad") }}</span>
					</RouterLink>
					<RouterLink :to="`/herradura/summary/`" class="is-submenu">
						<i class="lnir lnir-clipboard" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.summary") }}</span>
					</RouterLink>
				</VCollapseLinks>
			</ul>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../scss/layout/sidebar-panel";
</style>
