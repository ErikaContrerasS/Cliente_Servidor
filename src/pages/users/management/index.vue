<route lang="yaml">
meta:
  requiresAuth: true
</route>
<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { tryGetUsers, generateExcel, trySendEmail, tryActiveUsers } from "/@src/services/usercore";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { newUserStatus, User } from "/@src/utils/interfaces/schema";
import { Notyf } from "notyf";
import { useI18n } from "vue-i18n";
import moment from "moment";
import Swal from "sweetalert2";
import { useUserSession } from "/@src/stores/userSession";

const NewUser = JSON.parse(localStorage.getItem("user") || "");
NewUser.isVisibleSelectRegional = "true";
useUserSession().setUser(NewUser);

const user = useUserSession();

const router = useRouter();
const notif = new Notyf();
const viewWrapper = useViewWrapper();
const { locale, t } = useI18n();
const UserLocale = ref(user.user?.country as number);
const rolUser = JSON.parse(window.localStorage.user).role;

const selectedRows = ref([]);
const selectedRowsId = ref([]);
let isLoading = ref(true);
const columns = ref([] as any);
const rows = ref([] as User[]);
const deactivationReason = ref("" as String);

/** Methods */

const getUsers = async () => {
	UserLocale.value = user.user?.country;
	rows.value = [];
	const response = await tryGetUsers();

	if (response.status) {
		for (const e of response.data) {
			rows.value.push({
				id: e.id,
				createdAt: e.createdAt,
				identification: e.identification,
				role: e.role,
				createdBy: e.createdBy,
				name: e.name,
				email: e.email,
				lastname: e.lastname,
				status: e.isActive,
			});
		}
	}

	columns.value = [
		{
			label: t("users.list.tableColumns.fullname"),
			field: "name",
			sortable: false,
		},
		{
			label: t("users.list.tableColumns.email"),
			field: "email",
			sortable: false,
		},
		{
			label: t("users.list.tableColumns.role"),
			field: "role",
			sortable: false,
			thClass: "has-text-centered",
			tdClass: "has-text-centered",
		},

		{
			label: t("utils.vuegoodtable.columns.status"),
			field: "status",
			sortable: false,
			thClass: "has-text-centered",
			tdClass: "has-text-centered",
		},
	];
	isLoading.value = false;
};
const setLabel = (labels: String[]) => {
	labels.forEach((item, idx) => {
		if (item == "MEX") labels[idx] = "Región Mexico";
		if (item == "BRA") labels[idx] = "Región Brasil";
		if (item == "ADM-REPO") labels[idx] = "Administrador de Reportes";
		if (item == "ADM-USER") labels[idx] = "Administrador de Usuarios";
	});
	return labels;
};
const response = await tryGetUsers();

const handleUpdateStatus = async (userId: [], status: String) => {
	if (user.user?.role == "SUPERVISOR") {
		let userArray = [];
		for (const element of userId) {
			const users = response.data.find((e) => e.email == element);
			if (users) {
				userArray.push(users);
			}
		}
		const validateStatus = (nameUser: string, userStatus: boolean) => {
			if (userStatus === true && status == "ACTIVE") {
				return `Usuario ${nameUser} ya se encuentra Activo`;
			} else if (userStatus === false && status == "ACTIVE") {
				return "Listo para Activar";
			} else if (userStatus === true && status == "INACTIVE") {
				return "Listo para Inactivar";
			} else if (userStatus === false && status == "INACTIVE") {
				return `Este Usuario ${nameUser} ya se encuentra Inactivo`;
			}
		};

		let userDB = [];
		for (const e of userArray) {
			const messageOperator = validateStatus(e.name, e.isActive);

			if (
				(messageOperator && messageOperator === "Listo para Activar") ||
				(messageOperator && messageOperator === "Listo para Inactivar")
			) {
				userDB.push(messageOperator);
			}
		}

		if (userDB.length > 0) {
			Swal.fire({
				title: `${
					status == "ACTIVE"
						? "Está seguro que desea activar este usuario?"
						: "Está seguro que desea inactivar este usuario?"
				}`,

				icon: "warning",
				showCancelButton: true,

				confirmButtonColor: "#d33",
				cancelButtonColor: "#c4c4c4",
				confirmButtonText: "Si, quiero hacerlo!",
			}).then((result) => {
				if (result.isConfirmed) {
					const token = localStorage.getItem("token");
					const base64Url = token?.split(".")[1]; // Extraer la parte codificada en Base64 del token
					const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/"); // Reemplazar caracteres especiales
					const decodedToken = JSON.parse(atob(base64)); // Decodificar la parte codificada en Base64 y parsearla como JSON

					const uid = decodedToken.user_id;
					const body = {
						emails: userId,
						uid: uid,
						action: status,
					};
					trySendEmail(body);
					if (response.status == true) {
						Swal.fire({
							title: `${
								status == "ACTIVE"
									? "Para continuar con la Activación, ingresa el codigo enviado a tu correo electronico"
									: "Para continuar con la Inactivación, ingresa el codigo enviado a tu correo electronico"
							}`,
							icon: "question",
							input: "text",
							inputPlaceholder: "Codigo de Verificación",
							confirmButtonText: "Enviar",
							confirmButtonColor: "#d33",
							showCancelButton: true,
						}).then((result) => {
							if (result.isConfirmed) {
								Swal.fire({
									title: "Cargando!",
									text: "En unos segundos terminaremos",
									didOpen: async () => {
										Swal.showLoading();
										const inputvalue = result.value;

										const body = {
											otp: inputvalue,
											uid: decodedToken.user_id,
										};
										const response = await tryActiveUsers(body);

										Swal.close();
										if (response.status == true) {
											notif.success({
												message: "Usuario activado / desactivado con éxito!",
												dismissible: true,
												duration: 5000,
											});
											setTimeout(() => {
												location.reload();
											}, 5000);
										} else {
											notif.error({
												message: "Codigo Incorrecto, vuelva intentarlo!",
												dismissible: true,
												duration: 5000,
											});
										}
									},
								});
							}
						});
					}
				}
			});
		} else {
			const statusmsg = status == "ACTIVE" ? "ACTIVO" : "INACTIVO";
			Swal.fire({
				title: `Alguno de los usuarios seleccionados ya se encuentra ${statusmsg}, por favor intente nuevamente`,

				icon: "warning",
				showCancelButton: true,

				confirmButtonColor: "#d33",
				cancelButtonColor: "#c4c4c4",
			});
		}
	} else {
		notif.error("No cuenta con los permisos para esta acción");
	}
};
const editUser = (value: any, data: any) => {
	if (user.user?.role == "visor" || user.user?.role == "broker") {
		notif.error("No cuenta con los permisos para esta acción");
	} else {
		localStorage.setItem("dataUserSection", JSON.stringify(data));
		if (value === "edit") {
			router.push("/users/form/" + data.id);
		}
	}
};

const ActionUser = (data: [], path: any, action: string) => {
	const obj = {
		action,
		data,
	};
	const encodedBody = btoa(JSON.stringify(obj));
	const fullPath = path + "/" + encodedBody;

	router.push(fullPath);
};
const formatDate = (date: any) => {
	if (date == "N/A") {
		return date;
	} else {
		return moment(date).format("DD/MM/YYYY");
	}
};
const downloadExcel = async () => {
	/** Format data to send to the API */
	const labels = {
		employeenumber: "NÚMERO DE EMPLEADO",
		name: "NOMBRE",
		lastname: "APELLIDO",
		email: "CORREO",
		createdBy: "CREADO POR",
		deactivationDate: "FECHA DE DESACTIVACION",
		deactivationReason: "RAZON DE DESACTIVACION",
		clearence: "PERMISOS",
		status: "ESTADO",
		role: "ROL",
		country: "REGION",
		permissions: "INICIATIVA(S)",
	};
	const records = JSON.parse(JSON.stringify(rows.value));

	records.forEach((el: any) => {
		el.deactivationDate =
			el.deactivationDate != "N/A"
				? moment(el.deactivationDate).format("DD/MM/YYYY")
				: el.deactivationDate;
		delete el.id;
	});

	const body = {
		records,
		labels,
		type: "USUARIOS",
	};

	/** Call API through usercore service */
	await generateExcel(body).then((response) => {
		var fileURL = window.URL.createObjectURL(
			new Blob([response.data], {
				type: "application/vnd.ms-excel",
			})
		);
		var fileLink = document.createElement("a");
		fileLink.href = fileURL;
		fileLink.setAttribute(
			"download",
			`Reportes_${body.type}_${new Date().toLocaleDateString()}.xlsx`
		);
		document.body.appendChild(fileLink);
		fileLink.click();
	});
};

function selectionChanged(params) {
	selectedRows.value = params.selectedRows;
	selectedRowsId.value = selectedRows.value.map((e) => {
		return e.email;
	});
}

if (user.user?.role == "visor" || user.user?.role == "broker") {
	Swal.fire({
		title: "No cuenta con permiso para esto.",
		icon: "error",
		confirmButtonText: "OK",
	}).then((result: any) => {
		if (result.isConfirmed) {
			router.go(-1);
		} else {
			router.go(-1);
		}
	});
} else {
	await getUsers();
}

/** Watch */

watch(
	() => user.user?.country,
	async () => {
		isLoading.value = true;
		await getUsers();
	}
);

onMounted(async () => {
	useHead({
		title: `AIG - ${t("users.list.pageTitle")}`,
	});
	viewWrapper.setPageTitle(t("users.list.pageTitle"));
});
/** Created Hook */
</script>

<template>
	<SidebarLayout>
		<VButtons class="is-right">
			<VButton
				v-if="selectedRows.length > 0"
				style="color: white; background-color: #0c7083"
				color="primary"
				raised
				:loading="isLoading"
				@click="handleUpdateStatus(selectedRowsId, 'ACTIVE')"
				>ACTIVAR
			</VButton>
			<VButton
				v-if="selectedRows.length > 0"
				style="color: white; background-color: #0c7083"
				color="primary"
				raised
				:loading="isLoading"
				@click="handleUpdateStatus(selectedRowsId, 'INACTIVE')"
				>INACTIVAR
			</VButton>
		</VButtons>
		<VButtons class="is-right"> </VButtons>

		<VPlaceloadText v-if="isLoading" :lines="20" />

		<vue-good-table
			v-else
			:columns="columns"
			:rows="rows"
			max-height="650px"
			:sort-options="{ enabled: true }"
			:search-options="{ enabled: true }"
			:select-options="{
				enabled: true,
				disableSelectInfo: true,
				selectOnCheckboxOnly: true,
			}"
			v-on:selected-rows-change="selectionChanged"
			:pagination-options="{
				enabled: true,
				position: 'top',
				perPageDropdown: [10, 25, 50, 100, 200],
				dropdownAllowAll: true,
				setCurrentPage: 1,
				nextLabel: t('utils.vuegoodtable.config.next'),
				prevLabel: t('utils.vuegoodtable.config.previous'),
				rowsPerPageLabel: t('utils.vuegoodtable.config.rowsPerPage'),
				ofLabel: t('utils.vuegoodtable.config.of'),
				allLabel: 'Todas',
			}"
		>
			<template #table-row="props">
				<div v-if="props.column.field === 'name'" id="sticky">
					{{ props.row.name + " " + props.row.lastname }}
				</div>
				<div v-if="props.column.field === 'role'">
					<VTag
						class="has-text-weight-semibold has-background-grey-lighter"
						style="width: 118 px"
						:label="props.row.role == 'visor' ? 'Consulta' : props.row.role"
					/>
				</div>
				<div v-if="props.column.field === 'permissions'">
					<div v-if="props.row.profile == 'SEGURIDAD'">
						<VTag color="primary" label="USER" />
					</div>
					<div v-else v-for="item in props.row.permissions" :key="item" class="mb-1">
						<VTag color="primary" :label="item" />
					</div>
				</div>
				<div v-if="props.column.field === 'deactivationDate'">
					{{ formatDate(props.row.deactivationDate) }}
				</div>

				<div v-if="props.column.field === 'status'">
					<VTag
						style="width: 60px"
						:color="props.row.status == true ? 'success' : 'danger'"
						:label="
							props.row.status == true
								? t('utils.vuegoodtable.columns.statusUser.active')
								: t('utils.vuegoodtable.columns.statusUser.inactive')
						"
					/>
				</div>
				<div v-if="props.column.field === 'action'">
					<VButtons class="is-centered">
						<VIconButton
							:color="'info'"
							v-tooltip.top.right="'editar usuario'"
							outlined
							:icon="'feather:edit'"
							:disabled="props.row.status != true"
							@click="editUser('edit', props.row)"
						/>
					</VButtons>
				</div>
			</template>
		</vue-good-table>
	</SidebarLayout>
</template>

<style lang="scss">
.page-content-wrapper {
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;

	.page-content {
		padding: 0;

		&.is-relative {
			position: relative;
		}

		&.kanban-content {
			padding: 0 20px;
		}

		&.chat-content {
			padding: 0;
		}

		&.card-content {
			padding: 0 20px;
		}

		&.waterfall-content {
			overflow: hidden;
		}

		&.projects-content {
			padding: 0;
		}
	}
}
</style>
