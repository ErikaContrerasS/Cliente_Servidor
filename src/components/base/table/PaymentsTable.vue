<script setup>
import { ref, computed } from "vue";
const props = defineProps({
	data: { type: Array },
});
const columns = ref([
	{
		label: "Referencia",
		field: "billing_reference",
		sortable: false,
	},
	{
		label: "Método de Pago",
		field: "payment_method",
		sortable: false,
	},
	{
		label: "Fecha de Pago",
		field: "billing_date",
		sortable: true,
		tdClass: "has-text-centered",
	},
	{
		label: "Periodo de Pago",
		field: "billing_transaction",
		sortable: false,
		thClass: "has-text-centered",
		tdClass: "has-text-centered",
	},
	{
		label: "Prima",
		field: "premium_amount",
		sortable: false,
		thClass: "has-text-centered",
		tdClass: "has-text-centered",
	},
	{
		label: "Impuestos",
		field: "taxes_amount",
		sortable: false,
		thClass: "has-text-centered",
		tdClass: "has-text-centered",
	},
	{
		label: "Total",
		field: "total_amount",
		sortable: false,
		thClass: "has-text-centered",
		tdClass: "has-text-centered",
	},
	{
		label: "Estado",
		field: "collected_date",
		sortable: false,
		thClass: "has-text-centered",
		tdClass: "has-text-centered",
	},
	{
		label: "Comentario",
		field: "_status",
		sortable: true,
		thClass: "has-text-centered",
		tdClass: "has-text-centered",
	},
]);
const paidInstallmentsInfo = computed(() => props.data || []);
</script>

<template>
	<vue-good-table
		v-if="paidInstallmentsInfo.length != 0"
		:columns="columns"
		:rows="paidInstallmentsInfo"
		:sort-options="{
			enabled: true,
			initialSortBy: { field: 'billing_date', type: 'desc' },
		}"
		:search-options="{
			enabled: true,
		}"
		:pagination-options="{
			enabled: true,
			position: 'top',
			perPageDropdown: [5, 10, 25, 50, 100],
			dropdownAllowAll: true,
			setCurrentPage: 1,
			nextLabel: 'Siguiente',
			prevLabel: 'Anterior',
			rowsPerPageLabel: 'Filas por página',
			ofLabel: 'De',
			allLabel: 'Todas',
		}"
		max-height="300px"
	>
		<template #table-row="props">
			<div v-if="props.column.field === 'collected_date'">
				<VTag
					:color="props.row.collected_date == '' ? 'danger' : 'success'"
					:label="props.row.collected_date == '' ? 'Rechazado' : 'Aprobado'"
				/>
			</div>
		</template>
	</vue-good-table>

	<div v-else>
		<VPlaceholderSection
			title="No hay datos disponibles"
			subtitle="No encontramos cuotas pagadas para esta póliza en nuestro sistema"
		/>
	</div>
</template>
