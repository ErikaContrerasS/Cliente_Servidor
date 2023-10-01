<script>
import { ref, watch, computed } from "vue";
import { useHead } from "@vueuse/head";
import { useRouter } from "vue-router";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { tryGetClosingShift } from "/@src/services/usercore";
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
		viewWrapper.setPageTitle("Cierre de Turnos");
		const user = useUserSession();

		useHead({
			title: "CRECIENDO SEGURO",
		});

		let isLoading = ref(false);

		const today = ref(substractDays(30, new Date()));
		const endDate = ref(new Date());

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
				name: "OPERADOR",
				station: "ESTACIÓN",
				startAt: "FECHA INICIO",
				endAt: "FECHA FIN",
			};
			records.forEach((element) => {
				element.name = element.name;
				element.station = element.station;
				element.startAt = moment(element.startAt).format("YYYY/MM/DD hh:ss");
				element.endAt = moment(element.endAt).format("YYYY/MM/DD hh:ss");
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
					"Reportes_Cierre_Turnos" + "_" + new Date().toLocaleDateString() + ".xlsx"
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
		]);
		const rows = ref([]);

		/** Methods */
		async function getAllTurn() {
			console.log("ingresa aqui");
			/** Show loading animation while all process is been done */
			isLoading.value = true;
			const accessTokenCore = localStorage.getItem("token");

			const { turns } = await tryGetClosingShift(accessTokenCore);
			const Turns = turns;

			shifts.value = Turns;

			rows.value = [];

			if (Turns.length) {
				Turns.forEach((doc) => {
					const mappedData = {
						name: doc.name,
						startAt: moment(doc.startAt).format("YYYY/MM/DD hh:ss"),
						endAt: moment(doc.endAt).format("YYYY/MM/DD hh:ss"),
						station: doc.station,
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
		watch(range.value, async (newValue) => await getAllTurn(), { immediate: true });

		return {
			formatDate,
			getAllTurn,
			downloadExcel,
			isLoading,
			columns,
			range,
			rows,
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
