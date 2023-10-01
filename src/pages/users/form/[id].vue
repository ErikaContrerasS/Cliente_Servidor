<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useHead } from "@vueuse/head";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { tryGetUsers } from "/@src/services/usercore";
import moment from "moment";
import { useRouter } from "vue-router";
import { useNotyf } from "/@src/composable/useNotyf";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
// const columns = ref([]);
const rows = ref([]);
const route = useRoute();

const viewWrapper = useViewWrapper();
const router = useRouter();
const notyf = useNotyf();

let isLoading = ref(false);
const { locale, t } = useI18n();
const selectedRows = ref([]);
const selectedRowsId = ref([]);
const isDownloading = ref(false);
let masks = ref({
	input: "DD/MM/YYYY",
});
const today = ref(new Date());
const endDate = ref(substractDays(30));

const processId = computed(() => route.params.id);

function formatDate(date) {
	return moment(date).format("DD/MM/YYYY");
}

function substractDays(days) {
	var res = new Date();
	res.setDate(res.getDate() - days);
	return res;
}
const getPolicy = async () => {
	console.log("se ejecuta el get policy");
	const params = JSON.parse(atob(processId.value));
	const response = await tryGetUsers();
	let userArray = [];
	rows.value = [];
	for (const element of params.data) {
		const users = response.data.find((e) => e.id == element);
		if (users) {
			userArray.push(users);
		}
	}
	const validateStatus = (userStatus) => {
		if (userStatus === true && params.action == "active") {
			return "Este Usuario ya se encuentra Activo";
		} else if (userStatus === false && params.action == "active") {
			return "Listo para Activar";
		} else if (userStatus === true && params.action == "inactive") {
			return "Listo para Inactivar";
		} else if (userStatus === false && params.action == "inactive") {
			return "Este Usuario ya se encuentra Inactivo";
		}
	};

	for (const e of userArray) {
		rows.value.push({
			id: e.id,
			createdAt: e.createdAt,
			identification: e.identification,
			role: e.role,
			createdBy: e.createdBy,
			name: e.name + " " + e.lastname,
			email: e.email,
			status: e.isActive == true ? "ACTIVO" : "INACTIVO",
			message: validateStatus(false),
		});
	}
};

// columns properties allow to customize the entire table
const columns = {
	name: {
		label: "Nombre Completo",
	},
	email: {
		label: "E-mail",
	},
	role: "Rol",
	// industry: 'Industry', <- this column is not visible
	status: {
		label: "Status",
		align: "center",
	},
	message: {
		label: "Comentario",
		align: "center",
		bold: true,
		colorClass: "red",
	},
};

onMounted(async () => {
	viewWrapper.setPageTitle("Operarios");
	useHead({
		title: "LIVERPOOL - CONSULTA MASIVA",
	});
	await getPolicy();
});
</script>

<template>
	<SidebarLayout>
		<VCard radius="regular" elevated class="mb-5 p-b-10">
			<VFlexTable :columns="columns" :data="rows" :class="columns.colorClass" />
			<VButtons class="is-right">
				<VButton
					style="color: white; background-color: #0c7083"
					color="primary"
					raised
					@click="router.push('/users/form/')"
					>ACTIVAR</VButton
				>
			</VButtons>
		</VCard>

		<VPlaceloadText v-if="isLoading" :lines="20" center="true" last-line-width="100%" />
	</SidebarLayout>
</template>

<style lang="scss">
.tag-width {
	width: 80px;
}
</style>
