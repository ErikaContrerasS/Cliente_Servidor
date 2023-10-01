<script setup lang="ts">
import { useUserSession } from "/@src/stores/userSession";
import { useNotyf } from "/@src/composable/useNotyf";
import { tryLogin } from "/@src/services/usercore";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import { useStorage } from "@vueuse/core";
import axios from "axios";
const userSession = useUserSession();
const notif = useNotyf();
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const redirect = route.query.redirect as string;
const email = ref("");
const password = ref("");
/**para utilizar la variable de i18n */
const { locale, t } = useI18n();
const defaultLocale = useStorage("locale", navigator?.language || "es-MX");
/**
 * Each time we change the locale, we persit it in the storage
 */
watch(locale, () => {
	defaultLocale.value = locale.value;
});
/** */
const handleLogin = async () => {
	if (!isLoading.value) {
		isLoading.value = true;
		const result = await tryLogin(email.value, password.value);
		isLoading.value = false;

		if (result.status && result.data.user.status == "active") {
			switch (result.data.user.country) {
				case 1:
					locale.value = "de";
					break;
				case 2:
					locale.value = "es-MX";
					break;
			}
			result.data.user.isVisibleSelectRegional = "true";
			userSession.setToken(result.data.token);
			userSession.setUser(result.data.user);
			localStorage.setItem("user", JSON.stringify(result.data.user));
			localStorage.setItem("token", JSON.stringify(result.data.token));

			notif.dismissAll();
			notif.success(t("dashboard.title", { add: "@" }));
			if (redirect) {
				router.push(redirect);
			} else {
				router.push({
					name: "app",
				});
			}
		} else if (result.status && result.data.user.status == "inactive") {
			notif.error({
				message: "Su usuario ha sido deshabilitado, comuniquese con un administrador!",
				duration: 7000,
			});
		} else {
			notif.error(t("auth.user.emails"));
		}
	}
};
</script>

<template>
	<form @submit.prevent="handleLogin">
		<!--Form-->

		<div class="login-form">
			<VField>
				<VControl icon="feather:user">
					<input
						v-model="email"
						class="input is-primary-focus"
						type="text"
						:placeholder="t('login.login-email')"
						autocomplete="email"
					/>
				</VControl>
			</VField>
			<VField>
				<VControl icon="feather:lock">
					<input
						v-model="password"
						class="input is-primary-focus"
						type="password"
						:placeholder="t('login.login-password')"
						autocomplete="current-password"
					/>
				</VControl>
			</VField>

			<!-- Switch -->
			<VControl class="setting-item">
				<label for="remember-me" class="form-switch is-primary">
					<input id="remember-me" type="checkbox" class="is-switch" />
					<i aria-hidden="true"></i>
				</label>
				<div class="setting-meta">
					<label for="remember-me">
						<span>{{ t("login.login-remember") }}</span>
					</label>
				</div>
			</VControl>

			<!-- Submit -->
			<VControl class="login">
				<VButton :loading="isLoading" type="submit" color="primary" bold fullwidth raised>
					{{ t("login.login-go") }}
				</VButton>
			</VControl>
		</div>
	</form>
</template>
