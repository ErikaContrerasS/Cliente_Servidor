<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import LoginForm from "/@src/pages/auth/components/LoginForm.vue";
import ResetForm from "/@src/pages/auth/components/ResetForm.vue";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import { useStorage } from "@vueuse/core";
const hasResetPassword = ref(false);
const { locale, t } = useI18n();
useHead({
	title: "AIG - Universal",
});
const defaultLocale = useStorage("locale", navigator?.language || "es-MX");
/**
 * Each time we change the locale, we persit it in the storage
 */
watch(locale, () => {
	defaultLocale.value = locale.value;
});
</script>

<template>
	<div class="auth-wrapper-inner is-single">
		<!--Fake navigation-->
		<div class="auth-nav">
			<div class="left"></div>
			<div class="center">
				<RouterLink :to="{ name: 'index' }" class="header-item">
					<img src="/images/logo.png" style="min-width: 160px" class="mt-6 ml-5" alt="" />
				</RouterLink>
			</div>
			<div class="toolbar ml-auto right">
				<Toolbar class="desktop-toolbar"> </Toolbar>
			</div>
		</div>
		<LanguagesPanel />
		<!--Single Centered Form-->
		<div class="single-form-wrap">
			<div class="inner-wrap">
				<!--Form Title-->
				<div class="auth-head">
					<h2>{{ t("login.login-welcome") }}</h2>

					<p v-if="!hasResetPassword">{{ t("login.login-initSesion") }}</p>
					<p v-else>{{ t("config.ChangePassword") }}</p>
				</div>

				<!--Form-->
				<div v-if="!hasResetPassword" class="form-card">
					<LoginForm />
				</div>

				<div v-else class="form-card">
					<ResetForm />
				</div>

				<div class="forgot-link has-text-centered">
					<a v-if="!hasResetPassword" @click="hasResetPassword = true">{{
						t("login.login-forgot")
					}}</a>

					<a v-else @click="hasResetPassword = false">{{ t("login.login-initSesion") }}</a>
				</div>
			</div>
		</div>
	</div>
</template>
