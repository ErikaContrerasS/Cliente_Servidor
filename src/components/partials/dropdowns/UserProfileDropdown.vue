<script setup lang="ts">
// UserProfileDropdown Component
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useUserSession } from "/@src/stores/userSession";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();

const router = useRouter();
const route = useRoute();

const userSession = useUserSession();

const user = ref(JSON.parse(localStorage.getItem("user")!));
// const countryUser = JSON.parse(window.localStorage.user).country
// const rolUser = JSON.parse(window.localStorage.user).role
const handleLogout = async () => {
	try {
		localStorage.setItem("user", "");
		// localStorage.setItem('token', '')
		// await userSession.logoutUser()

		router.push({
			name: "auth-login-1",
		});
	} catch (error) {
		console.log(error);
	}
};

const config = async () => {
	router.push({
		name: "users-config",
	});
};
</script>

<template>
	<VDropdown right spaced class="user-dropdown profile-dropdown">
		<template #button="{ toggle }">
			<a
				tabindex="0"
				class="is-trigger dropdown-trigger"
				aria-haspopup="true"
				@keydown.space.prevent="toggle"
				@click="toggle"
			>
				<VAvatar picture="/images/avatars/svg/vuero-1.svg" />
			</a>
		</template>

		<template #content>
			<div class="dropdown-head">
				<VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />
				<span style="padding: 5%">
					{{ user.name }} {{ user.lastName }} <br />
					{{ user.role }}</span
				>
			</div>

			<hr class="dropdown-divider" />

			<div class="dropdown-item is-button">
				<VButton
					class="logout-button mx-2"
					icon="feather:log-out"
					color="primary"
					role="menuitem"
					raised
					fullwidth
					@click="handleLogout"
				>
					{{ t("sidebar.profileDropdown.logout") }}
				</VButton>
				<VIconButton class="mx-2" icon="mdi:cog" color="primary" @click="config" outlined />
			</div>
		</template>
	</VDropdown>
</template>
