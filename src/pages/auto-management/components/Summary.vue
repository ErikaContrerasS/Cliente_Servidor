<script setup>
import { computed } from "vue";

const props = defineProps({
	data: { type: Object, required: false, default: () => {} },
	participants: { type: Number, required: false, default: () => {} },
	plans: { type: Number, required: false, default: () => {} },
});

const data = computed(() => props.data);
const participants = computed(() => props.participants);
const plans = computed(() => props.plans);
</script>

<template>
	<VCard>
		<div class="columns is-multiline is-vcentered p-5 is-mobile">
			<div class="column is-12 has-text-left has-text-weight-bold p-0">
				<i class="lnir lnir-clipboard is-size-5" aria-hidden="true"></i
				><span class="pl-3 is-size-5">Resumos</span>
			</div>
			<div class="column is-12 has-text-left has-text-weight-bold p-0 m-0 mt-5">
				<span class="is-size-5">Participantes</span>
			</div>
			<div class="column is-12 pl-0 pr-0">
				<h1 class="has-text-weight-bold is-2">
					Nome:
					<span class="has-text-weight-normal">{{ data.sponsor.name || "" }}</span>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Nome Empresarial :
					<span class="has-text-weight-normal">{{ data.sponsor.legal_sponsor_name || "" }}</span>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Certificado:
					<span class="has-text-weight-normal">{{ data.sponsor.sponsor_policy || "" }}</span>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Cuantidade de Participantes:
					<span class="has-text-weight-normal">{{ participants || 0 }}</span>
				</h1>
				<hr />
			</div>
			<div class="column is-12 has-text-left has-text-weight-bold p-0 m-0">
				<span class="is-size-5">Producto</span>
			</div>
			<div class="column is-12 pl-0 pr-0">
				<h1 class="has-text-weight-bold is-2">
					Nome:
					<span class="has-text-weight-normal"
						>{{ data.product.name || "" }} ({{ data.product.code }})</span
					>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Produto AIG :
					<span class="has-text-weight-normal">{{ data.product.coverType || "" }}</span>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Idade:
					<span class="has-text-weight-normal"
						>{{ data.product.minAgeSale || 0 }} - {{ data.product.maxAgeSale || 0 }}</span
					>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Beneficiarios Permitidos:
					<span class="has-text-weight-normal">{{ data.product.allowedBeneficiaries || 0 }}</span>
				</h1>
				<hr />
			</div>
			<div class="column is-12 has-text-left has-text-weight-bold p-0 m-0">
				<span class="is-size-5">Campaña</span>
			</div>
			<div class="column is-12 pl-0 pr-0">
				<h1 class="has-text-weight-bold is-2">
					Nome:
					<span class="has-text-weight-normal">{{ data.campaign.name || "" }}</span>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Ano :
					<span class="has-text-weight-normal">{{ data.campaign.year || "" }}</span>
				</h1>
				<h1 class="has-text-weight-bold is-2">
					Vigencia:
					<span class="has-text-weight-normal"
						>{{ data.product.effectiveStart || "" }} - {{ data.product.endOfTerm || "" }}</span
					>
				</h1>
				<hr />
			</div>
			<div class="column is-12 has-text-left has-text-weight-bold p-0 m-0">
				<span class="is-size-5">Plan</span>
			</div>
			<div class="column is-12 pl-0 pr-0">
				<h1 class="has-text-weight-bold is-2">
					Cuantidade do plano:
					<span class="has-text-weight-normal">{{ plans || 0 }} </span>
				</h1>
			</div>
			<slot></slot>
		</div>
	</VCard>
</template>
