<script>
import { ref, watch, computed } from "vue";
import { useHead } from "@vueuse/head";
import { useRouter } from "vue-router";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { tryGetPoliciesReport } from "/@src/services/usercore";
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
		viewWrapper.setPageTitle("Reporte");
		const user = useUserSession();

		useHead({
			title: "CRECIENDO SEGURO",
		});

		let isLoading = ref(false);

		const today = ref(substractDays(30, new Date()));
		const endDate = ref(new Date());

		const totalPolicySales = ref();
		const policiesSold = ref();
		const shifts = ref();

		const userData = ref({});
		const productsDataOptions = ref([]);
		const iniciatives = ref("");
		const isDownloading = ref(false);

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
				csId: "POLIZA",
				type: "TIPO DE VEHICULO",
				brand: "MARCA",
				model: "MODELO",
				yearPlate: "AÑO",
				fullName: "NOMBRE",
				ownerId: "ID del Propietario",
				months: "TIPO DE PLAN",
				createdAt: "FECHA CREACIÓN",
				chasis: "CHASIS",
				payMethod: "TIPO DE COBRO",
				price: "COSTO",
				status: "STATUS",
			};
			records.forEach((element) => {
				element.csId = element.csId;
				element.fullName = element.fullName;
				element.months = element.months;
				element.createdAt = element.createdAt;
				element.payMethod = element.payMethod;
				element.status = element.status == "ACTIVE" ? "ACTIVA" : "N/A";
				element.type = element.type;
				element.model = element.model;
				element.brand = element.brand;
				element.yearPlate = element.yearPlate;
				element.ownerId = element.ownerId;
				element.price = element.price;
				element.chasis = element.chasis;
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
					"Reportes_Polizas" + "_" + new Date().toLocaleDateString() + ".xlsx"
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
				label: "Poliza",
				field: "csId",
				sortable: false,
			},
			{
				label: "Tipo Vehiculo",
				field: "type",
				sortable: false,
			},
			{
				label: "Marca",
				field: "brand",
				sortable: false,
			},
			{
				label: "Modelo",
				field: "model",
				sortable: false,
			},
			{
				label: "Año",
				field: "yearPlate",
				sortable: false,
			},
			{
				label: "Nombre",
				field: "fullName",
				sortable: false,
			},
			{
				label: "ID del Propietario",
				field: "ownerId",
				sortable: false,
			},
			{
				label: "Tipo de Plan",
				field: "months",
				sortable: false,
			},
			{
				label: "Fecha Creación",
				field: "createdAt",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: false,
			},

			{
				label: "Tipo de Cobro",
				field: "payMethod",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: true,
			},
			{
				label: "Costo",
				field: "price",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: true,
			},
			{
				label: "Status",
				field: "status",
				thClass: "has-text-centered",
				tdClass: "has-text-centered",
				sortable: false,
			},
		]);
		const rows = ref([]);

		/** Methods */
		async function getAllPolicies(start, end) {
			/** Show loading animation while all process is been done */
			isLoading.value = true;
			const accessTokenCore = localStorage.getItem("token");
			/** Format data to send to the API */
			const body = {
				from: range.value.start,
				to: range.value.end,
				stationId: "",
				name: "",
			};

			const { data } = await tryGetPoliciesReport(accessTokenCore, body);
			const policies = data.policies;

			totalPolicySales.value = data.totalPolicySales;
			policiesSold.value = data.policiesSold;
			shifts.value = data.shifts;

			rows.value = [];
			const options2 = { style: "currency", currency: "USD" };
			// //   /** Mapping data to use it in vue-good-table */
			const dates = new Date();
			if (policies.length) {
				policies.forEach((doc) => {
					const mappedData = {
						fullName: doc.ownerName,
						id: doc.uid,
						createdAt: doc.createdAt,
						payMethod: doc.payMethod,
						status: doc.status,
						csId: doc.csId,
						months: `(${doc.months}) meses`,
						type: doc.type,
						model: doc.model,
						brand: doc.brand,
						model: doc.model,
						yearPlate: doc.yearPlate,
						ownerId: doc.ownerId,
						price: new Intl.NumberFormat("en-US", options2).format(doc.price),
						chasis: doc.chassis,
					};
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

		/** Watchers */
		watch(
			range.value,
			async (newValue) => await getAllPolicies(range.value.start, range.value.end),
			{ immediate: true }
		);

		return {
			formatDate,
			getAllPolicies,
			downloadExcel,
			isLoading,
			columns,
			range,
			rows,
			totalPolicySales,
			policiesSold,
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
			<h3 class="title is-5 mb-3">Listado de Reporte</h3>

			<div class="columns is-multiline mt-3 mb-3">
				<div class="column is-3">
					<VField>
						<label></label>
						<VControl icon="feather:search">
							<input class="input" placeholder="Filtrar por nombre" required />
						</VControl>
					</VField>
				</div>
				<div class="column is-2">
					<VField>
						<VControl class="has-icons-left" icon="fas fa-building">
							<div class="select">
								<select v-model="iniciatives" style="height: 38px">
									<option value="" selected>TIPO DE COBRO</option>
								</select>
							</div>
						</VControl>
					</VField>
				</div>
				<div class="column is-2">
					<VField>
						<VControl class="has-icons-left" icon="fas fa-building">
							<div class="select">
								<select v-model="iniciatives" style="height: 38px">
									<option value="" selected>ESTACIONES</option>
								</select>
							</div>
						</VControl>
					</VField>
				</div>
				<div class="column is-3">
					<VDatePicker v-model="range" is-range color="green" trim-weeks>
						<template #default="{ inputValue, inputEvents }">
							<VField addons>
								<VControl>
									<input :value="inputValue.start" class="input" v-on="inputEvents.start" />
								</VControl>
								<VControl>
									<a class="button is-static"
										><i class="iconify" data-icon="feather:arrow-right"></i
									></a>
								</VControl>
								<VControl>
									<input :value="inputValue.end" class="input" v-on="inputEvents.end" />
								</VControl>
							</VField>
						</template>
					</VDatePicker>
				</div>
				<div class="column is-2">
					<VControl>
						<VButton
							style="background-color: #0c7083"
							color="primary"
							raised
							:loading="isLoading"
							:disabled="!range.start"
							@click="getAllPolicies(range.start, range.end)"
							>Buscar</VButton
						>
					</VControl>
				</div>
			</div>
		</VCard>

		<div class="columns">
			<div class="column is-4">
				<div class="dashboard-card">
					<VLoader size="small" :active="isLoading" style="font-size: 1.95rem !important">
						<VBlock :title="shifts" subtitle="Turnos" center>
							<template #icon>
								<VIconBox color="info" rounded>
									<i aria-hidden="true" class="iconify" data-icon="feather:list"></i>
								</VIconBox>
							</template>
						</VBlock>
					</VLoader>
				</div>
			</div>
			<div class="column is-4">
				<div class="dashboard-card">
					<VLoader size="small" :active="isLoading">
						<VBlock
							:title="policiesSold"
							subtitle="Polizas Vendidas"
							center
							style="font-size: 1.95rem !important"
						>
							<template #icon>
								<VIconBox color="info" rounded>
									<i aria-hidden="true" class="iconify" data-icon="feather:user"></i>
								</VIconBox>
							</template>
						</VBlock>
					</VLoader>
				</div>
			</div>
			<div class="column is-4">
				<div class="dashboard-card">
					<VLoader size="small" :active="isLoading">
						<VBlock
							:title="totalPolicySales"
							subtitle="Dinero Recaudado"
							center
							style="font-size: 1.95rem !important"
						>
							<template #icon>
								<VIconBox color="green" rounded>
									<i aria-hidden="true" class="iconify" data-icon="feather:dollar-sign"></i>
								</VIconBox>
							</template>
						</VBlock>
					</VLoader>
				</div>
			</div>
		</div>

		<VPlaceloadText v-if="isLoading" :lines="20" />

		<vue-good-table
			v-else
			:color="primary"
			:columns="columns"
			:rows="rows"
			:sort-options="{
				enabled: true,
				initialSortBy: { field: 'createdAt', type: 'desc' },
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
