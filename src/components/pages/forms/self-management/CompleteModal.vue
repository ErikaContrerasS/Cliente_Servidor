<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	isOpen: { type: Boolean, default: false, required: true },
	data: { type: Object, default: () => {}, required: false },
	enableEdit: { type: Boolean, required: true },
});

const coverage = {
	description: "",
	ins_sum: "",
	code: "",
	percent: "",
	tax: "",
};

const premium = {
	pay_method: "",
	min_age: "",
	max_age: "",
	premium: "",
};

const coverArr = ref([]);
const premiumsArr = ref([]);

function addCoverage() {
	const fillData = {
		description: coverage.description,
		ins_sum: coverage.ins_sum,
		code: coverage.code,
		percent: coverage.percent,
		tax: coverage.tax,
	};

	coverArr.value.push(fillData);
}

function addpremiums() {
	const fillData = {
		pay_method: premium.pay_method,
		min_age: premium.min_age,
		max_age: premium.max_age,
		premium: premium.premium,
	};

	premiumsArr.value.push(fillData);
}

const emit = defineEmits(["hide"]);

const { t } = useI18n();

const canEdit = computed(() => props.enableEdit);
const dataInfo = computed(() => props.data);

const a = ref("");
const b = ref("");

function deleteCoverages(item) {
	let indexITM = coverArr.value.indexOf(item);
	coverArr.value.splice(indexITM, 1);
}

function deletePremiums(item) {
	let indexITM = premiumsArr.value.indexOf(item);
	premiumsArr.value.splice(indexITM, 1);
}

// watch(hasOriginCountry, () => getLocationCodes('origin'))
</script>

<template>
	<VModal
		:title="dataInfo.planName"
		:open="props.isOpen"
		size="big"
		actions="center"
		cancel-label="Cerrar"
		@close="emit('hide')"
	>
		<template #content>
			<!-- Coverages -->

			<div class="container">
				<h3>Coberturas</h3>
				<div class="columns is-centered is-vcentered is-multiline is-mobile mt-2">
					<VField class="column">
						<label class="mb-2"> descrição </label>
						<VControl>
							<input
								v-model="coverage.description"
								type="text"
								class="input"
								placeholder=""
								required
							/>
						</VControl>
					</VField>
					<VField class="column">
						<label class="mb-2"> montante segurado </label>
						<VControl>
							<input v-model="coverage.ins_sum" type="text" class="input" placeholder="" required />
						</VControl>
					</VField>
					<VField class="column">
						<label class="mb-2"> Código </label>
						<VControl>
							<input v-model="coverage.code" type="text" class="input" placeholder="" required />
						</VControl>
					</VField>
					<VField class="column is-2">
						<label class="mb-2"> percentagem </label>
						<VControl>
							<input v-model="coverage.percent" type="text" class="input" placeholder="" required />
						</VControl>
					</VField>
					<VField class="column is-2">
						<label class="mb-2"> imposto </label>
						<VControl>
							<input v-model="coverage.tax" type="text" class="input" placeholder="" required />
						</VControl>
					</VField>
					<VButton class="mt-3" outlined color="primary" @click="addCoverage()">+</VButton>
					<hr />
					<div v-if="coverArr.length > 0" class="column is-12">
						<table class="table is-fullwidth is-strippet" style="overflow-x: auto">
							<thead>
								<tr>
									<td class="has-text-centered is-uppercase">descrição</td>
									<td class="has-text-centered is-uppercase">montante segurado</td>
									<td class="has-text-centered is-uppercase">Código</td>
									<td class="has-text-centered is-uppercase">percentagem</td>
									<td class="has-text-centered is-uppercase">imposto</td>
									<td class="has-text-centered is-uppercase">Acções</td>
								</tr>
							</thead>
							<tbody class="has-text-centered">
								<tr v-for="cover in coverArr" :key="cover">
									<td>{{ cover.description }}</td>
									<td>{{ cover.ins_sum }}</td>
									<td>{{ cover.code }}</td>
									<td>{{ cover.percent }}</td>
									<td>{{ cover.tax }}</td>
									<td>
										<VButtons class="is-centered">
											<VIconButton
												color="danger"
												v-tooltip="'Eliminar'"
												raised
												outlined
												icon="feather:trash"
												@click="deleteCoverages(cover)"
											/>
										</VButtons>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<hr />

				<div class="container mt-5">
					<h3>Premiums</h3>
					<div class="columns is-centered is-vcentered is-multiline is-mobile mt-2">
						<VField class="column">
							<label class="mb-2"> forma de pagamento </label>
							<VControl>
								<input
									v-model="premium.pay_method"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
						<VField class="column">
							<label class="mb-2"> idade mínima </label>
							<VControl>
								<input
									v-model="premium.min_age"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
						<VField class="column">
							<label class="mb-2"> idade máxima </label>
							<VControl>
								<input
									v-model="premium.max_age"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
						<VField class="column is-2">
							<label class="mb-2"> prémio </label>
							<VControl>
								<input
									v-model="premium.premium"
									type="text"
									class="input"
									placeholder=""
									required
								/>
							</VControl>
						</VField>
						<div class="column is-2"></div>
						<VButton class="mt-3" outlined color="primary" @click="addpremiums()">+</VButton>
						<hr />
						<div v-if="premiumsArr.length > 0" class="column is-12">
							<table class="table is-fullwidth is-strippet" style="overflow-x: auto">
								<thead>
									<tr>
										<td class="has-text-centered is-uppercase">forma de pagamento</td>
										<td class="has-text-centered is-uppercase">idade mínima</td>
										<td class="has-text-centered is-uppercase">idade máxima</td>
										<td class="has-text-centered is-uppercase">prémio</td>
										<td class="has-text-centered is-uppercase">Acções</td>
									</tr>
								</thead>
								<tbody class="has-text-centered">
									<tr v-for="premium in premiumsArr" :key="premium">
										<td>{{ premium.pay_method }}</td>
										<td>{{ premium.min_age }}</td>
										<td>{{ premium.max_age }}</td>
										<td>{{ premium.premium }}</td>
										<td>
											<VButtons class="is-centered">
												<VIconButton
													color="danger"
													v-tooltip="'Eliminar'"
													raised
													outlined
													icon="feather:trash"
													@click="deletePremiums(premium)"
												/>
											</VButtons>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template #action>
			<VButton type="submit" color="primary" raised icon="fas fa-check" @click="emit('hide')"
				>Guardar
			</VButton>
		</template>
	</VModal>
</template>
