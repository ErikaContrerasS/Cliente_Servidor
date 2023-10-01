<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useUserSession } from "/@src/stores/userSession";
import { useRouter } from "vue-router";
const { locale, t } = useI18n();
const openSubsidebarLinks = ref("");

const emit = defineEmits(["close"]);
const router = useRouter();

let rout = `/reports`;
let rout1 = `/reports/closing`;
let rout2 = `/reports/closedTurns`;
</script>

<template>
	<div class="sidebar-panel is-generic">
		<div class="subpanel-header">
			<h3 class="no-mb">{{ t("sidebar.titles.reports") }}</h3>
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
				<li>
					<RouterLink :to="rout" @click="isVisibleSelectRegion()">
						<i class="fas fa-clipboard mr-3" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.reportsConsult") }}</span>
					</RouterLink>
				</li>
			</ul>
			<ul>
				<li>
					<RouterLink :to="rout2" @click="isVisibleSelectRegion()">
						<i class="fas fa-clipboard mr-3" aria-hidden="true"></i>
						<span>{{ t("sidebar.subItems.reportsConsultClosedTurn") }}</span>
					</RouterLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../scss/layout/sidebar-panel";
</style>
