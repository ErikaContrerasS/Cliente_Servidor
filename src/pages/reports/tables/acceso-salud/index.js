export const columnsSalud = [
	{
		label: "Número Poliza AIG",
		field: "policy_aig",
		width: "auto",
		sortable: false,
	},
	{
		label: "Poliza Acceso Salud",
		field: "policy_id",
		width: "auto",
		sortable: false,
	},
	{
		label: "Nombre Completo",
		field: "name",
		sortable: true,
	},
	{
		label: "Inicio Vigencia",
		field: "startofalidity",
		sortable: false,
	},
	{
		label: "ID Plan",
		field: "plan_id",
		width: "auto",
		sortable: false,
	},
	{
		label: "Producto",
		field: "product_id",
		width: "auto",
		sortable: false,
	},
	{
		label: "Prima Total",
		field: "premium",
		width: "auto",
		sortable: false,
	},
	{
		label: "ID Compra",
		field: "process_id",
		sortable: false,
	},
	{
		label: "ID Paciente",
		field: "id_number",
		sortable: false,
	},
	{
		label: "Status",
		field: "statusS",
		sortable: false,
	},
];

export const labelsSalud = {
	policy_aig: "NUMERO POLIZA AIG",
	policy_id: "POLIZA ACCESO SALUD",
	name: "NOMBRE COMPLETO",
	startofalidity: "INICIO VIGENCIA",
	plan_id: "ID PLAN",
	product_id: "PRODUCTO",
	premium: "PRIMA TOTAL",
	process_id: "ID COMPRA",
	id_number: "ID PACIENTE",
	statusS: "ESTADO",
};
