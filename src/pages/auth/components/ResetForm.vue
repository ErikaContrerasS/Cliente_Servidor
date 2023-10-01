<script setup>
import { useNotyf } from "/@src/composable/useNotyf";
import { useVuelidate } from "@vuelidate/core";
import { email, required, sameAs, minLength } from "@vuelidate/validators";
import { ref, reactive, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();
import { useStorage } from "@vueuse/core";

const notif = useNotyf();
const isLoading = ref(false);
const defaultLocale = useStorage("locale", navigator?.language || "es-MX");

const form = reactive({
	email: "",
	password: "",
	confirmPassword: "",
});

const v$ = useVuelidate(
	{
		email: { required, email },
		password: {
			required,
			minLength: minLength(8),
			containsUppercase: function (value) {
				return /[A-Z]/.test(value);
			},
			containsLowercase: function (value) {
				return /[a-z]/.test(value);
			},
			containsNumber: function (value) {
				return /[0-9]/.test(value);
			},
			containsSpecial: function (value) {
				return /[#?!@$%^&*-]/.test(value);
			},
		},
		confirmPassword: { required, sameAs: sameAs(computed(() => form.password)) },
	},
	form
);

async function handleReset() {
	if (!(await v$.value.$validate())) {
		return;
	}

	isLoading.value = true;

	/** Format data to send to the API */
	const body = {
		email: form.email,
		password: form.password,
		confirmPassword: form.confirmPassword,
	};

	try {
		await tryResetPassword(body);
		notif.success("Contraseña cambiada exitosamente!");
	} catch (error) {
		notif.error("E-mail no encontrado o inválido");
	} finally {
		isLoading.value = false;
		window.location.reload();
	}
}

watch(locale, () => {
	defaultLocale.value = locale.value;
});
</script>

<template>
	<form @submit.prevent="handleReset">
		<p>
			{{ t("config.text") }}
		</p>
		<div class="login-form mt-5">
			<VField>
				<VControl icon="feather:mail">
					<input
						v-model="v$.email.$model"
						class="input"
						:class="{ 'is-danger': v$.email.$error }"
						type="email"
						placeholder="E-mail"
						autocomplete="email"
					/>
					<p class="help is-danger" :class="{ 'is-hidden': !v$.email.$error }">
						This email is invalid
					</p>
				</VControl>
				<VControl icon="feather:lock" class="mt-2">
					<input
						v-model="v$.password.$model"
						:class="{ 'is-danger': v$.password.$error }"
						class="input"
						type="password"
						:placeholder="t('config.newPassword')"
					/>
					<p class="help is-danger" :class="{ 'is-hidden': !v$.password.$error }">
						This password is invalid
					</p>
				</VControl>
				<VControl icon="feather:lock" class="mt-2">
					<input
						v-model="v$.confirmPassword.$model"
						:class="{ 'is-danger': v$.confirmPassword.$error }"
						class="input"
						type="password"
						:placeholder="t('config.confirmPassword')"
					/>
					<p class="help is-danger" :class="{ 'is-hidden': !v$.confirmPassword.$error }">
						This password is invalid
					</p>
				</VControl>
			</VField>

			<!-- Submit -->
			<VControl class="login mt-5">
				<VButton
					:loading="isLoading"
					:disabled="v$.$invalid || isLoading"
					type="submit"
					icon="fas fa-unlock"
					color="primary"
					fullwidth
					raised
				>
					{{ t("config.ChangePassword") }}
				</VButton>
			</VControl>
		</div>
	</form>
</template>
