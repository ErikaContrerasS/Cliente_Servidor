<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { useDarkmode } from "/@src/stores/darkmode";
import { usePanels } from "/@src/stores/panels";

const darkmode = useDarkmode();
const { locale } = useI18n();
const panels = usePanels();

const localFlagSrc = computed(() => {
	locale.value = "es-MX";

	switch (locale.value) {
		// case 'fr':
		//   return '/images/icons/flags/france.svg'
		// case 'es':
		//   return '/images/icons/flags/spain.svg'
		case "es-MX":
			return "/images/icons/flags/mexico.svg";
		case "de":
			return "/images/icons/flags/icons8-portugal-96.png";
		// case 'zh-CN':
		// //   return '/images/icons/flags/china.svg'
		case 'es-MX"':
		default:
		case 'es-MX"':
			return "/images/icons/flags/mexico.svg";
	}
});
</script>

<template>
	<div class="toolbar ml-auto">
		<!-- <div class="toolbar-link">
			<label
				tabindex="0"
				class="dark-mode ml-auto"
				@keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
			>
				<input type="checkbox" :checked="!darkmode.isDark" @change="darkmode.onChange" />
				<span></span>
			</label>
		</div> -->
		<!-- <div>
			<a
				tabindex="0"
				class="toolbar-link right-panel-trigger"
				@keydown.space.prevent="panels.setActive('languages')"
				@click="panels.setActive('languages')"
			>
				<img :src="localFlagSrc" alt="" />
			</a>
		</div> -->
		<slot></slot>
	</div>
</template>
