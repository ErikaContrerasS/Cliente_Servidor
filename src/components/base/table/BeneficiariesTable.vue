<script>
import moment from "moment";
import { useI18n } from "vue-i18n";

export default {
	name: "BeneficiariesTable",
	props: {
		data: {
			type: Array,
			default: () => {},
		},
	},
	emits: ["update-table"],
	setup() {
		const { locale, t } = useI18n();
		return {
			t,
			locale,
		};
	},
	data() {
		return {
			isDetailOpen: false,
			isEditOpen: false,
			selectedBeneficiary: null,
			totalBenPercentages: null,
		};
	},
	computed: {
		beneficiaryInfo() {
			return this.data || [];
		},
	},
	methods: {
		formatDate(date) {
			return moment(date, "YYYY/MM/DD").format("DD/MM/YYYY");
		},
		getTotalPercentages(beneficiary) {
			let updatedSum = 0;
			const sum = this.beneficiaryInfo.reduce(function (acc, el) {
				if (beneficiary.beneficiary_order != el.beneficiary_order) {
					updatedSum = acc + Number(el.benefit_percentage);
				}
				return updatedSum;
			}, 0);

			this.totalBenPercentages = sum;
		},
		changeColorStatus(value) {
			return value == "A" ? "success" : "danger";
		},
		changeLabel(value) {
			return value == "A"
				? t("utils.vuegoodtable.columns.statusUello.active")
				: t("utils.vuegoodtable.columns.statusUello.cancelled");
		},
		format(value) {
			return `${value}%`;
		},
		setModalInfo(beneficiary, modal) {
			this.selectedBeneficiary = beneficiary;
			if (modal == "edit") {
				this.getTotalPercentages(beneficiary);
				this.isEditOpen = true;
			} else this.isDetailOpen = true;
		},
		updateAndClose() {
			this.isEditOpen = false;
			this.$emit("update-table");
		},
	},
};
</script>

<template>
	<VCard v-if="this.beneficiaryInfo.length != 0" radius="smooth" class="mt-5">
		<!--Detail Modal -->
		<BeneficiaryDetailsModal
			:is-open="this.isDetailOpen"
			:data="this.selectedBeneficiary"
			@hide="this.isDetailOpen = false"
		/>

		<h3 class="title is-5 has-text-centered">{{ t("utils.tabs.Depentents.title") }}</h3>
		<table class="table is-hoverable is-fullwidth">
			<thead>
				<tr>
					<th scope="col" class="is-media"></th>
					<th scope="col">{{ t("utils.tabs.beneficiaries.tableColumns.name") }}</th>
					<th scope="col">{{ t("utils.tabs.Depentents.IdentificationNumber") }}</th>
					<th scope="col" class="has-text-centered">
						{{ t("utils.tabs.Depentents.Dateofbirth") }}
					</th>
					<th scope="col" class="has-text-centered">
						{{ t("utils.tabs.beneficiaries.tableColumns.benefitamount") }}
					</th>
					<th scope="col">{{ t("utils.tabs.Depentents.Gender") }}</th>
					<th scope="col" class="has-text-centered">
						{{ t("utils.tabs.beneficiaries.tableColumns.action") }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="beneficiary in beneficiaryInfo" :key="beneficiary.person_id">
					<td class="is-media">
						<VAvatar :initials="beneficiary.beneficiary_given_name.charAt(0)" color="info" />
					</td>
					<td>
						{{ beneficiary.beneficiary_given_name + " " + beneficiary.beneficiary_family_name }}
					</td>
					<td>{{ beneficiary.id_number || "N/A" }}</td>
					<td class="has-text-centered">
						{{ this.formatDate(beneficiary.beneficiary_dob) || "N/A" }}
					</td>
					<td class="has-text-centered">{{ Number(beneficiary.benefit_percentage) || "0" }}</td>
					<td>{{ beneficiary.sex_code == "M" ? "Masculino" : "Femenino" }}</td>
					<td class="has-text-centered">
						<VIconButton
							color="primary"
							class="ml-2"
							v-tooltip.top.right="t('utils.tooltips.seeDetails')"
							outlined
							icon="feather:eye"
							@click="setModalInfo(beneficiary, 'details')"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</VCard>

	<div v-else>
		<VPlaceholderSection
			title="No hay datos disponibles"
			subtitle="No encontramos beneficiarios para esta póliza en nuestro sistema"
		/>
	</div>
</template>
