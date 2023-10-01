<script setup>
import { useI18n } from "vue-i18n";
import moment from "moment";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { ref, computed, watch } from "vue";
import { onMounted } from "@vue/runtime-core";
import { useHead } from "@vueuse/head";
import { plans } from "/@src/data/apps/saas-billing";
import Summary from "./components/Summary.vue";

const { locale, t } = useI18n();

const viewWrapper = useViewWrapper();

useHead({
	title: "AIG BRA - AUTOGESTÃO",
});

function setLanguage() {
	viewWrapper.setPageTitle(`${t("sidebar.subItems.autogestaoTitle")}`);
}

watch(
	locale,
	() => {
		setLanguage();
	},
	{ immediate: true }
);

let currentStep = ref(0);
let isModalOpen = ref(false);

let planConf = ref({
	planName: "",
	coverages: [],
	premiums: [],
});

function showModal(name) {
	isModalOpen.value = true;
	planConf.value.planName = name;
}

const sponsor = ref({});

const form = ref({
	sponsor: {
		name: "",
		code: "",
		legal_sponsor_name: "",
		sponsor_name: "",
		sponsor_policy: "",
		sponsor_stipulating_code: "",
		sponsor_understatement_code: "",
		sponsor_address: "",
		sponsor_id: "",
		sponsor_bank: "",
		sponsor_email: "",
		sponsor_compensation: "",
		sponsor_master_policy: "",
	},

	product: {
		name: "",
		code: "",
		coverType: "",
		untilAt: "",
		policyCorrelative: "",
		minAgeSale: "",
		maxAgeSale: "",
		maxAgePermanence: "",
		reqDependent: "",
		reqBeneficiary: "",
		allowedBeneficiaries: "",
	},

	campaign: {
		name: "",
		code: "",
		year: "",
		effectiveStart: "",
		endOfTerm: "",
		certificateDurationM: "",
		certificateDurationD: "",
	},

	plans: {
		name: "",
		paymentMethod: "",
	},

	conf: {
		accType: "",
		xml: "",
		cvs: "",
		sude_id: "",
		capemisa: "",
	},
});
const plansArr = ref([]);
const participantsArr = ref([]);
const downloadLink = ref(import.meta.env.VITE_AUTO_MANAGEMENT_DOWNLOAD_COVERAGE_LINK);

function addPlan() {
	let pName = form.value.plans.name;
	let pMethod = form.value.plans.paymentMethod;

	const obj = {
		name: pName,
		method: pMethod,
	};

	plansArr.value.push(obj);
}

function addParticipant() {
	participantsArr.value.push(sponsor.value);
	sponsor.value = {};
}

function deletePlans(item) {
	let indexITM = plansArr.value.indexOf(item);
	plansArr.value.splice(indexITM, 1);
}

function deleteParticipant(item) {
	let indexITM = participantsArr.value.indexOf(item);
	participantsArr.value.splice(indexITM, 1);
}

function nextStep() {
	return (currentStep.value = currentStep.value + 1);
}

function beforeStep() {
	return (currentStep.value = currentStep.value - 1);
}
</script>

<template>
	<SidebarLayout>
		<CompleteModal
			:is-open="isModalOpen"
			:data="planConf"
			:enable-edit="true"
			@hide="isModalOpen = false"
		/>

		<div class="columns is-centered is-mobile is-multiline">
			<!-- Stepper config -->
			<div class="stepper-form column is-12 mt-5 mr-5">
				<div class="mobile-steps is-active">
					<ul class="steps has-content-centered is-thin is-horizontal is-medium">
						<li :class="[currentStep === 0 && 'is-active']" class="steps-segment">
							<span class="steps-marker"></span>
							<a href="#" class="steps-content">
								<p class="step-number is-size-7 has-text-primary has-text-weight-semibold">
									Paso 1
								</p>
								<p class="step-number is-size-6">{{ t("autogestao.step1") }}</p>
							</a>
						</li>

						<li :class="[currentStep === 1 && 'is-active']" class="steps-segment">
							<span class="steps-marker"></span>
							<a href="#" class="steps-content">
								<p class="step-number is-size-7 has-text-primary has-text-weight-semibold">
									Paso 2
								</p>
								<p class="step-number is-size-6">{{ t("autogestao.step2") }}</p>
							</a>
						</li>

						<li :class="[currentStep === 2 && 'is-active']" class="steps-segment">
							<span class="steps-marker"></span>
							<a href="#" class="steps-content">
								<p class="step-number is-size-7 has-text-primary has-text-weight-semibold">
									Paso 3
								</p>
								<p class="step-number is-size-6">{{ t("autogestao.step3") }}</p>
							</a>
						</li>

						<li :class="[currentStep === 3 && 'is-active']" class="steps-segment">
							<span class="steps-marker"></span>
							<a href="#" class="steps-content">
								<p class="step-number is-size-7 has-text-primary has-text-weight-semibold">
									Paso 4
								</p>
								<p class="step-number is-size-6">{{ t("autogestao.step4") }}</p>
							</a>
						</li>
						<li :class="[currentStep === 4 && 'is-active']" class="steps-segment">
							<span class="steps-marker"></span>
							<a href="#" class="steps-content">
								<p class="step-number is-size-7 has-text-primary has-text-weight-semibold">
									Paso 5
								</p>
								<p class="step-number is-size-6">{{ t("autogestao.step5") }}</p>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Forms -->
			<VCard class="column is-7">
				<!-- participante -->
				<div v-if="currentStep === 0" class="columns is-multiline is-mobile is-vcentered">
					<div class="column is-12 has-text-left has-text-weight-bold p-5">
						<i class="lnir lnir-user-alt-1 is-size-5" aria-hidden="true"></i
						><span class="pl-3 is-size-5">Participantes</span>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Nome </label>
							<VControl>
								<input
									v-model="form.sponsor.name"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Código </label>
							<VControl>
								<input
									disabled
									v-model="form.sponsor.code"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Nome Empresarial </label>
							<VControl>
								<input
									v-model="form.sponsor.legal_sponsor_name"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Nome Fantasia </label>
							<VControl>
								<input
									v-model="form.sponsor.sponsor_name"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Certificado </label>
							<VControl>
								<input
									v-model="form.sponsor.sponsor_policy"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>

					<h1 class="column is-12 title is-5 pl-3 mb-0 mt-5">Dados do Partipante da Apólice</h1>
					<VField class="column is-6 mb-0">
						<label>Tipo Participante</label>
						<VControl class="select">
							<select v-model="sponsor.type" required>
								<option disabled hidden selected>** Seleccione Tipo **</option>
								<option value="Aseguradora">Aseguradora</option>
								<option value="Agente de Seguros">Agente de Seguros</option>
								<option value="Estipulante">Estipulante</option>
								<option value="Corredor">Corredor</option>
								<option value="Subestipulante_1">Subestipulante 1</option>
								<option value="Subestipulante_2">Subestipulante 2</option>
								<option value="Subestipulante_3">Subestipulante 3</option>
							</select>
						</VControl>
					</VField>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Número Subgrupo </label>
							<VControl>
								<input
									v-model="sponsor.subgroup_number"
									type="number"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Endereço </label>
							<VControl>
								<input
									v-model="sponsor.address"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-3">
						<VField>
							<label class="mb-2"> Número </label>
							<VControl>
								<input
									v-model="sponsor.door_number"
									type="number"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-3">
						<VField>
							<label class="mb-2"> Complemento </label>
							<VControl>
								<input
									v-model="sponsor.address_complement"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Bairro </label>
							<VControl>
								<input
									v-model="sponsor.neighbour"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Cidade </label>
							<VControl>
								<input v-model="sponsor.city" type="text" class="input" placeholder="" required />
							</VControl>
						</VField>
					</div>
					<div class="column is-3">
						<VField>
							<label class="mb-2"> CEP </label>
							<VControl>
								<input
									v-model="sponsor.zip_code"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-3">
						<VField>
							<label class="mb-2"> UF </label>
							<VControl>
								<input v-model="sponsor.state" type="text" class="input" placeholder="" required />
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Email </label>
							<VControl>
								<input v-model="sponsor.email" type="email" class="input" placeholder="" required />
							</VControl>
						</VField>
					</div>
					<div class="column is-3">
						<VField>
							<label class="mb-2"> DDD </label>
							<VControl>
								<input
									v-model="sponsor.ddd_comercial"
									type="number"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-3">
						<VField>
							<label class="mb-2"> Código SUSEP </label>
							<VControl>
								<input
									v-model="sponsor.susep_code"
									type="number"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Telefone </label>
							<VControl>
								<input
									v-model="sponsor.phone"
									type="number"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<VField>
							<label class="mb-2"> Código Representante </label>
							<VControl>
								<input
									v-model="sponsor.retailer_code"
									type="number"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>
					<div class="column is-4">
						<VField>
							<label class="mb-2"> Remuneração </label>
							<VControl>
								<input
									v-model="sponsor.remuneration"
									type="number"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
					</div>

					<VButton class="mt-5" outlined color="primary" @click="addParticipant">+ Agregar</VButton>
					<div class="column is-12">
						<table class="table is-fullwidth is-strippet" style="overflow-x: auto">
							<thead>
								<tr>
									<td class="has-text-centered is-uppercase">Tipo</td>
									<td class="has-text-centered is-uppercase">SUSEP</td>
									<td class="has-text-centered is-uppercase">Remuneração</td>
									<td class="has-text-centered is-uppercase">Acções</td>
								</tr>
							</thead>
							<tbody class="has-text-centered">
								<tr v-for="participant in participantsArr" :key="participant">
									<td>{{ participant.type }}</td>
									<td>{{ participant.susep_code }}</td>
									<td>{{ participant.remuneration }}</td>
									<td>
										<VButtons class="is-centered">
											<VIconButton
												color="danger"
												v-tooltip="'Eliminar'"
												raised
												outlined
												icon="feather:trash"
												@click="deleteParticipant(participant)"
											/>
										</VButtons>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<!-- product -->
				<div
					v-if="currentStep === 1"
					class="columns is-multiline is-mobile is-vcentered is-centered"
				>
					<div class="column is-12 has-text-left has-text-weight-bold p-5">
						<i class="lnir lnir-tag is-size-5" aria-hidden="true"></i>
						<span class="pl-3 is-size-5">Producto</span>
					</div>
					<VField class="column is-6">
						<label class="mb-2"> Nome do Produto </label>
						<VControl>
							<input
								v-model="form.product.name"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2"> Código </label>
						<VControl>
							<input
								disabled
								v-model="form.product.code"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2">Produto AIG</label>
						<VControl class="select">
							<select v-model="form.product.coverType" required>
								<option disabled hidden selected value="">
									** Seleccione Tipo de Cobertura **
								</option>
								<!-- <option value="PAS">Pasaporte</option>
                <option value="CED">Cédula</option>
                <option value="OTR">Otro</option> -->
							</select>
						</VControl>
					</VField>
					<VField class="column is-3">
						<label class="mb-2"> Venda - Idade Minima </label>
						<VControl>
							<input
								v-model="form.product.minAgeSale"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-3">
						<label class="mb-2"> Venda - Idade Máxima </label>
						<VControl>
							<input
								v-model="form.product.maxAgeSale"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2"> Permanencia de Idade Máxima </label>
						<VControl>
							<input
								v-model="form.product.maxAgePermanence"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2"> Com ou Sem Dependentes </label>
						<VControl>
							<input
								v-model="form.product.reqDependent"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2"> Com ou Sem Beneficíarios </label>
						<VControl class="select">
							<select v-model="form.product.reqBeneficiary" required>
								<option disabled hidden selected value="">** Seleccione **</option>
								<!-- <option value="PAS">Pasaporte</option>
                <option value="CED">Cédula</option>
                <option value="OTR">Otro</option> -->
							</select>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2">Beneficiarios Permitidos</label>
						<VControl>
							<input
								disabled
								v-model="form.product.allowedBeneficiaries"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
				</div>

				<!-- campaing -->
				<div
					v-if="currentStep === 2"
					class="columns is-multiline is-mobile is-vcentered is-centered"
				>
					<div class="column is-12 has-text-left has-text-weight-bold p-5">
						<i class="iconify is-size-5" data-icon="feather:bell" aria-hidden="true"></i>

						<span class="pl-3 is-size-5">Campaña</span>
					</div>
					<VField class="column is-6">
						<label class="mb-2"> Nome da Campanha </label>
						<VControl>
							<input
								v-model="form.campaign.name"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2"> Código </label>
						<VControl>
							<input
								disabled
								v-model="form.campaign.code"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>

					<h1 class="column is-12 title is-5 pl-3 mb-0 mt-5">Dados do Apólice</h1>
					<VField class="column is-6 mt-3">
						<label class="mb-2">Ano</label>
						<v-date-picker v-model="form.campaign.year" color="green" trim-weeks :masks="masks">
							<template #default="{ inputValue, inputEvents }">
								<VField>
									<VControl icon="feather:calendar">
										<input
											class="input has-text-grey-light"
											:value="inputValue"
											placeholder="dd/mm/yyyy"
											required
											v-on="inputEvents"
										/>
									</VControl>
								</VField>
							</template>
						</v-date-picker>
					</VField>
					<VField class="column is-3 mt-3">
						<label class="mb-2">Inicio da Vigencia</label>
						<v-date-picker
							v-model="form.campaign.effectiveStart"
							color="green"
							trim-weeks
							:masks="masks"
						>
							<template #default="{ inputValue, inputEvents }">
								<VField>
									<VControl icon="feather:calendar">
										<input
											class="input has-text-grey-light"
											:value="inputValue"
											placeholder="dd/mm/yyyy"
											required
											v-on="inputEvents"
										/>
									</VControl>
								</VField>
							</template>
						</v-date-picker>
					</VField>
					<VField class="column is-3 mt-3">
						<label class="mb-2">Fim da Vigencia</label>
						<v-date-picker
							v-model="form.campaign.endOfTerm"
							color="green"
							trim-weeks
							:masks="masks"
						>
							<template #default="{ inputValue, inputEvents }">
								<VField>
									<VControl icon="feather:calendar">
										<input
											class="input has-text-grey-light"
											:value="inputValue"
											placeholder="dd/mm/yyyy"
											required
											v-on="inputEvents"
										/>
									</VControl>
								</VField>
							</template>
						</v-date-picker>
					</VField>
					<VField class="column is-6">
						<label class="mb-2"> Duração do Certificado (Mês) </label>
						<VControl>
							<input
								v-model="form.campaign.certificateDurationM"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column is-6">
						<label class="mb-2"> Duração do Certificado (Dia) </label>
						<VControl>
							<input
								v-model="form.campaign.certificateDurationD"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
				</div>

				<!-- Plans -->
				<div v-if="currentStep === 3" class="columns is-multiline is-mobile">
					<div class="columns column is-12 is-flex is-justify-content-space-between is-vcentered">
						<div class="has-text-left has-text-weight-bold p-5">
							<i class="iconify is-size-5" data-icon="feather:send" aria-hidden="true"></i>
							<span class="pl-3 is-size-5">Plan</span>
						</div>
						<a :href="downloadLink" class="button is-primary">Guia de Download</a>
					</div>
					<VField class="column is-3">
						<label class="mb-2"> Código do Plano </label>
						<VControl>
							<input v-model="form.plans.name" type="text" class="input" placeholder="" required />
						</VControl>
					</VField>
					<VField class="column is-5">
						<label class="mb-2"> Nome do Plano </label>
						<VControl>
							<input v-model="form.plans.name" type="text" class="input" placeholder="" required />
						</VControl>
					</VField>
					<VField class="column is-4">
						<label class="mb-2"> Modalidade de Pagamento </label>
						<VControl>
							<input
								v-model="form.plans.paymentMethod"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VButton class="mt-3" outlined color="primary" @click="addPlan()">+ Agregar</VButton>
					<div class="column is-12">
						<table class="table is-fullwidth is-strippet" style="overflow-x: auto">
							<thead>
								<tr>
									<td class="has-text-centered is-uppercase">Nome do Plano</td>
									<td class="has-text-centered is-uppercase">Modalidade</td>
									<td class="has-text-centered is-uppercase">Acções</td>
								</tr>
							</thead>
							<tbody class="has-text-centered">
								<tr v-for="plan in plansArr" :key="plan">
									<td>{{ plan.name }}</td>
									<td>{{ plan.method }}</td>
									<td>
										<VButtons class="is-centered">
											<VIconButton
												color="primary"
												v-tooltip="'Completar'"
												raised
												outlined
												icon="feather:edit"
												@click="showModal(plan.name)"
											/>
											<VIconButton
												color="danger"
												raised
												outlined
												icon="feather:trash"
												@click="deletePlans(plan)"
											/>
										</VButtons>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<!-- accounts & settings -->
				<div
					v-if="currentStep === 4"
					class="columns is-multiline is-mobile is-vcentered is-centered"
				>
					<div class="column is-12 has-text-left has-text-weight-bold p-5">
						<i class="iconify is-size-5" data-icon="feather:settings" aria-hidden="true"></i>

						<span class="pl-3 is-size-5">Cuentas y Configuraciones</span>
					</div>

					<VField class="column is-12">
						<label class="mb-2">Tipo de Contas</label>
						<VControl class="select">
							<select v-model="form.product.accType" required>
								<option disabled hidden selected value="">** Seleccione Tipo de Cuenta **</option>
								<!-- <option value="PAS">Pasaporte</option>
                <option value="CED">Cédula</option>
                <option value="OTR">Otro</option> -->
							</select>
						</VControl>
					</VField>

					<div class="column is-6">
						<label>Gerar XML ?</label>
					</div>
					<div class="column is-6">
						<VField grouped>
							<VControl subcontrol>
								<VSwitchBlock />
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<label>Gerar Sude_id ?</label>
					</div>
					<div class="column is-6">
						<VField grouped>
							<VControl subcontrol>
								<VSwitchBlock />
							</VControl>
						</VField>
					</div>
					<div class="column is-6">
						<label>integração com Capemisa ?</label>
					</div>
					<div class="column is-6">
						<VField grouped>
							<VControl subcontrol>
								<VSwitchBlock />
							</VControl>
						</VField>
					</div>
				</div>
			</VCard>

			<!-- Summary -->
			<div class="column is-4 p-0 ml-2">
				<Summary
					:participants="participantsArr.length"
					:data="form"
					:plans="plansArr.length"
				></Summary>
			</div>

			<!-- Actions -->
			<div class="column is-11 p-0 mt-4">
				<VButtons class="is-right">
					<VButton color="primary" outlined raised @click="beforeStep()"
						><i class="fas fa-angle-left mr-2" aria-hidden="true"></i> Atras
					</VButton>
					<VButton color="primary" raised @click="nextStep()">
						Siguiente <i class="fas fa-angle-right ml-2" aria-hidden="true"></i
					></VButton>
				</VButtons>
			</div>
		</div>
	</SidebarLayout>
</template>

<style lang="scss">
.v-top {
	vertical-align: top;
	border: 1px solid;
}

.border {
	border: 1px solid;
}
</style>
