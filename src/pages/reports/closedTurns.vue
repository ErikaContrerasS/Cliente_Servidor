<script>
import { ref, watch, computed } from "vue";
import { useHead } from "@vueuse/head";
import { useRouter } from "vue-router";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { tryGetClosingTurns } from "/@src/services/usercore";
import { useUserSession } from "/@src/stores/userSession";
import moment from "moment";
import { useNotyf } from "/@src/composable/useNotyf";
import { generateExcel } from "/@src/services/usercore";

export default {
	name: "Empleados AIG",
	setup() {
		const viewWrapper = useViewWrapper();
		const router = useRouter();
		const notyf = useNotyf();
		viewWrapper.setPageTitle("Venta de Turnos");
		const user = useUserSession();

		useHead({
			title: "CRECIENDO SEGURO",
		});

		let isLoading = ref(false);

		const today = ref(substractDays(30, new Date()));
		const endDate = ref(new Date());

		const shifts = ref();
		const station = ref();
		const userData = ref({});
		const productsDataOptions = ref([]);
		const iniciatives = ref("");
		const policies = ref([]);
		const isDownloading = ref(false);
		const stations = ref("");

		const users = computed(() => localStorage.getItem("user"));
		let datauser = JSON.parse(users.value);

		const downloadExcel = async () => {
			await downloadReport();
		};

		const downloadReport = async () => {
			/** Format data to send to the API */
			isDownloading.value = true;

			let labels = {};
			let records = rows.value;
			let type = "";

			labels = {
				name: "OPERADOR",
				station: "ESTACIÓN",
				startAt: "FECHA CREACIÓN",
				endAtt: "FECHA FIN",
				totalturnSales: "TOTAL TURNOS",
				totalcashSales: "TOTAL EFECTIVO",
				totatlcSales: "TOTAL TC",
				tcPolicies: "TOTAL POLIZAS VENDIDAS",
				totalpolicies: "DETALLE POLIZAS VENDIDAS",
			};
			records.forEach((element) => {
				element.name = element.name;
				element.station = element.station;
				element.startAt = moment(element.startAt).format("YYYY/MM/DD hh:ss");
				element.endAt = moment(element.endAt).format("YYYY/MM/DD hh:ss");
				element.totalturnSales = element.turnSales;
				element.totalcashSales = element.cashSales;
				element.totatlcSales = element.tcSales;
				element.tcPolicies = element.totalspolicies;
				element.totalpolicies = element.tpolicies;
				// if (element.tpolicies.length > 0) {
				// 	for (const policies of element.tpolicies) {
				// 		policiesConcat = "CSID: " + policies.csId + "\n" + "AUTOID: " + policies.autoId;
				// 	}
				// 	policies.value.push(policiesConcat);
				// }
				// element.tpolicies = policies.value;
			});
			const accessTokenCore = localStorage.getItem("token");
			const body = {
				records,
				labels,
				type: "DATASTUDIO",
			};

			/** Call API through usercore service */
			await generateExcel(accessTokenCore, body).then((response) => {
				var fileURL = window.URL.createObjectURL(
					new Blob([response.data], {
						type: "application/vnd.ms-excel",
					})
				);
				var fileLink = document.createElement("a");
				fileLink.href = fileURL;
				fileLink.setAttribute(
					"download",
					"Reportes_Venta_Turnos" + "_" + new Date().toLocaleDateString() + ".xlsx"
				);
				document.body.appendChild(fileLink);
				isDownloading.value = false;
				fileLink.click();
			});
		};

		const range = ref({
			start: today.value,
			end: endDate.value,
		});

		const columns = ref([
			{
				label: "Operador",
				field: "name",
				sortable: false,
			},
			{
				label: "Estación",
				field: "station",
				sortable: false,
			},
			{
				label: "Fecha Inicio ",
				field: "startAt",
				sortable: false,
			},
			{
				label: "Fecha Fin",
				field: "endAt",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: false,
			},
			{
				label: "Total Turnos",
				field: "turnSales",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: false,
			},
			{
				label: "Total Efectivo ",
				field: "cashSales",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: false,
			},
			{
				label: "Total TC",
				field: "tcSales",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: false,
			},
			{
				label: "Total Polizas Vendidas",
				field: "totalspolicies",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: false,
			},
			{
				label: "Detalle Polizas Vendidas",
				field: "policies",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				formatFn: format(),
				sortable: false,
			},
		]);
		const rows = ref([]);

		/** Methods */
		function format(value) {
			return "$" + value;
		}
		async function getAllTurn(stations) {
			/** Show loading animation while all process is been done */
			isLoading.value = true;
			const accessTokenCore = localStorage.getItem("token");

			const body = {
				stationId: stations ? stations : "",
				// station.value,
			};
			const { shifts } = await tryGetClosingTurns(accessTokenCore, body);
			const closed = shifts;

			rows.value = [];
			const options2 = { style: "currency", currency: "USD" };

			if (closed.length) {
				closed.forEach((doc) => {
					policies.value = [];
					const mappedData = {
						name: doc.turn.name,
						startAt: moment(doc.turn.startAt).format("YYYY/MM/DD hh:ss"),
						endAt: moment(doc.turn.endAt).format("YYYY/MM/DD hh:ss"),
						station: doc.turn.station,
						turnSales: new Intl.NumberFormat("en-US", options2).format(doc.AllTurnSales),
						cashSales: new Intl.NumberFormat("en-US", options2).format(doc.allCashSales),
						tcSales: new Intl.NumberFormat("en-US", options2).format(doc.allTCsales),
						totalspolicies: doc.policiesSoldByTurn,
						tpolicies: doc.policies,
					};
					if (mappedData.tpolicies.length > 0) {
						for (const policiesData of mappedData.tpolicies) {
							let policiesConcat = policiesData.csId;
							policies.value.push(policiesConcat);
						}
					}
					mappedData.tpolicies = policies.value;
					rows.value.push(mappedData);
				});
			} else {
				notyf.warning({
					message: "No encontró data en ese rango fecha, favor utilizar otro rango!",
					duration: 7500,
					dismissible: true,
				});
			}

			isLoading.value = false;
		}

		function substractDays(days, date) {
			var res = date;
			res.setDate(res.getDate() - days);
			return res;
		}
		// function redirectToDetail(id) {
		// 	router.push(`/automarsh/list/${id}`);
		// }

		const formatDate = (date) => {
			return moment(date).format("DD/MM/YYYY");
		};
		watch(range.value, async (newValue) => await getAllTurn(), { immediate: true });

		return {
			formatDate,
			getAllTurn,
			downloadExcel,
			isLoading,
			columns,
			range,
			rows,
			policies,
			shifts,
			userData,
			productsDataOptions,
			iniciatives,
		};
	},
};
</script>

<template>
	<SidebarLayout>
		<VCard radius="regular" elevated class="mb-5 p-b-10">
			<h3 class="title is-5 mb-3">Listado de Ventas</h3>

			<div class="columns is-multiline mt-3 mb-3">
				<div class="column is-3">
					<VField>
						<label></label>
						<VControl class="has-icons-left" icon="fas fa-building">
							<div class="select">
								<select v-model="stations" style="height: 38px">
									<option value="" selected>Seleccione una Iniciativa</option>
									<option value="Tropigas Villa Juana">Tropigas Villa Juana</option>
									<option value="Tropigas Sans Souci">Tropigas Sans Souci</option>
									<option value="Tropigas Las Palmas">Tropigas Las Palmas</option>
									<option value="Tropigas Sabana Perdida">Tropigas Sabana Perdida</option>
									<option value="Tropigas Zona Universitaria">Tropigas Zona Universitaria</option>
								</select>
							</div>
						</VControl>
					</VField>
				</div>
				<div class="column is-4">
					<VButton
						style="background-color: #0c7083"
						color="primary"
						raised
						icon="feather:zoom-in"
						:loading="isLoading"
						@click="getAllTurn(stations)"
						>Consultar</VButton
					>
				</div>
			</div>
		</VCard>
		<VPlaceloadText v-if="isLoading" :lines="20" />

		<vue-good-table
			v-else
			:color="primary"
			:columns="columns"
			:rows="rows"
			:sort-options="{
				enabled: true,
				initialSortBy: { field: 'startAt', type: 'desc' },
			}"
			:pagination-options="{
				enabled: true,
				position: 'top',
				perPageDropdown: [10, 50, 100, 200],
				dropdownAllowAll: true,
				setCurrentPage: 1,
				nextLabel: 'Siguiente',
				prevLabel: 'Anterior',
				rowsPerPageLabel: 'FILAS POR PÁGINA',
				ofLabel: 'De',
				allLabel: 'Todas',
			}"
		>
			<template #table-row="props">
				<div v-if="props.column.field === 'policies'">
					<div v-for="item in props.row.tpolicies" :key="item" class="mb-1">
						<VTag style="background-color: #0c7083; color: white" :label="item" />
					</div>
				</div>
			</template>
			<template #table-actions>
				<div class="mr-2">
					<VButton
						style="height: 33px; color: white; background-color: #0c7083"
						color="primary"
						icon="feather:download"
						raised
						:loading="isDownloading"
						:disabled="rows.length == 0"
						@click="downloadExcel()"
					>
						Exportar Excel
					</VButton>
				</div>
			</template>
		</vue-good-table>
	</SidebarLayout>
</template>

<style lang="scss">
@import "../../../scss/abstracts/mixins";

.dashboard-card {
	@include vuero-l-card;

	font-family: var(--font);

	&:not(:last-child) {
		margin-bottom: 1.5rem;
	}
}
</style>
