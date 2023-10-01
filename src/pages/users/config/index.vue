<script setup>
import { useHead } from "@vueuse/head";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useNotyf } from "/@src/composable/useNotyf";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { useVuelidate } from "@vuelidate/core";
import { email, required, sameAs, minLength } from "@vuelidate/validators";
import { ref, reactive, computed, onMounted, watch } from "vue";
const { locale, t } = useI18n();
const router = useRouter();
const notif = useNotyf();
const isLoading = ref(false);

const defaultLocale = useStorage("locale", navigator?.language || "es-MX");
const viewWrapper = useViewWrapper();
const thisEmail = JSON.parse(useStorage("user").value).email;

const form = reactive({
	email: thisEmail,
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
/**
 * Each time we change the locale, we persit it in the storage
 */
watch(locale, () => {
	defaultLocale.value = locale.value;
	viewWrapper.setPageTitle(`AIG MX - ${t("config.title")}`);
});

onMounted(async () => {
	useHead({
		title: `AIG MX - ${t("config.title")}`,
	});
});
</script>

<template>
	<SidebarLayout>
		<VButton class="mb-5" raised icon="fas fa-arrow-left" @click="router.go(-1)">{{
			t("utils.buttons.goBack")
		}}</VButton>
		<VCard>
			<div class="columns is-multiline">
				<div class="column is-6">
					<form @submit.prevent="handleReset">
						<h3>{{ t("config.ChangePassword") }}</h3>
						<p>
							{{ t("config.text") }}
						</p>
						<div class="login-form mt-5">
							<div class="columns is-multiline">
								<div class="column is-12">
									<VField>
										<VControl icon="feather:mail">
											<input
												v-model="v$.email.$model"
												class="input"
												:class="{ 'is-danger': v$.email.$error }"
												type="email"
												placeholder="E-mail"
												autocomplete="email"
												disabled
											/>
											<p class="help is-danger" :class="{ 'is-hidden': !v$.email.$error }">
												This email is invalid
											</p>
										</VControl>
									</VField>
								</div>
								<div class="column is-12">
									<VField>
										<VControl icon="feather:lock">
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
									</VField>
								</div>
								<div class="column is-12">
									<VField>
										<VControl icon="feather:lock">
											<input
												v-model="v$.confirmPassword.$model"
												:class="{ 'is-danger': v$.confirmPassword.$error }"
												class="input"
												type="password"
												:placeholder="t('config.confirmPassword')"
											/>
											<p
												class="help is-danger"
												:class="{ 'is-hidden': !v$.confirmPassword.$error }"
											>
												This password is invalid
											</p>
										</VControl>
									</VField>
								</div>
							</div>

							<!-- Submit -->
							<div class="mx-auto" style="width: 50%">
								<VField>
									<VControl class="login is-vcentered">
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
								</VField>
							</div>
						</div>
					</form>
				</div>
				<div class="column is-6 mt-3 mb-3">
					<div class="column mt-5 card has-background-light">
						<div class="content mt-3 mb-5">
							<h2 class="title is-5 is-narrow is-bold">
								{{ t("config.parameters.title") }}
							</h2>
							<ul>
								<li>{{ t("config.parameters.containsUppercase") }}</li>
								<li>{{ t("config.parameters.containsLowercase") }}</li>
								<li>{{ t("config.parameters.containsSpecial") }}</li>
								<li>{{ t("config.parameters.containsNumber") }}</li>
								<li>{{ t("config.parameters.characterMin") }}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</VCard>
	</SidebarLayout>
</template>
