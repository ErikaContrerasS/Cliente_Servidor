<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { barData, barData2, usersBarOptions } from "/@src/data/dashboards/company/usersBarChart";
import ApexChart from "vue3-apexcharts";
import { usersOptions } from "/@src/data/dashboards/company/usersChart";
import {
	personalScoreGaugeOptions,
	onPersonalScoreGaugeReady,
} from "/@src/data/widgets/charts/personalScoreGauge";
import { useUserSession } from "/@src/stores/userSession";
import { tryGetGeneralDashboard } from "/@src/services/usercore/index";
import { useI18n } from "vue-i18n";
import moment from "moment";
import { IRangeOptions } from "/@src/utils/interfaces/dashboard";

const userSession = useUserSession();
const { locale, t } = useI18n();

let isLoading = ref(false);
let hasCustomizedRange = ref(false);

const range = ref("last_30_days");
const manualRange = ref({ start: new Date(), end: new Date() });
const rangeOptions = ref<IRangeOptions[]>([]);
const selectedProducts = ref(["korsa", "iex", "nemaAgu", "uello"]);
const productsOptions = ref([
	{ value: "korsa", label: "Clube Mercosul" },
	{ value: "iex", label: "Iex" },
	{ value: "nemaCarioca", label: "Nema - Carioca" },
	{ value: "nemaClub", label: "Nema - Club Simples" },
	{ value: "nemaAgu", label: "Nema - Assoc. Iguatuense" },
	{ value: "uello", label: "Uello" },
	{ value: "supernova", label: "SuperNova" },
	{ value: "hospital", label: "Hospital Card" },
	{ value: "sollo", label: "Sollo / QualityLife" },
	{ value: "james", label: "James" },
	{ value: "pax", label: "Pax" },
	{ value: "qualividad", label: "Qualividad" },
]);
const data = ref({} as any);

const user = computed(() => userSession.user);

const mappedData = computed(() => {
	const filteredData = Object.keys(data.value)
		.filter((key) => selectedProducts.value.includes(key))
		.reduce((obj: any, key: any) => {
			obj[key] = data.value[key];
			return obj;
		}, []) as any[];

	const activePolicies = Object.values(filteredData).reduce(
		(t, { activePolicies }) => t + activePolicies,
		0
	) as number;

	const canceledPolicies = Object.values(filteredData).reduce(
		(t, { canceledPolicies }) => t + canceledPolicies,
		0
	) as number;

	const soldPolicies = Object.values(filteredData).reduce(
		(t, { soldPolicies }) => t + soldPolicies,
		0
	) as number;

	const totalActivePremium = Object.values(filteredData).reduce(
		(t, { totalActivePremium }) => t + totalActivePremium,
		0
	) as number;

	const totalCanceledPremium = Object.values(filteredData).reduce(
		(t, { totalCanceledPremium }) => t + totalCanceledPremium,
		0
	) as number;

	return {
		activePolicies,
		averageAge: 0,
		canceledPolicies,
		soldPolicies,
		totalActivePremium,
		totalCanceledPremium,
	};
});

const handleConsultData = async (range: string) => {
	isLoading.value = true;
	let response: Record<string, any>;

	if (hasCustomizedRange.value) {
		const startDate = manualRange.value.start.toLocaleDateString("en-US");
		const endDate = manualRange.value.end.toLocaleDateString("en-US");

		response = await tryGetGeneralDashboard(startDate, endDate);
	} else {
		const { startDate, endDate } = getDateRange(range);

		response = await tryGetGeneralDashboard(startDate, endDate);
	}

	if (!response.status) {
		isLoading.value = false;
		return;
	}

	data.value = response.data;

	isLoading.value = false;
};

const getDateRange = (range: string) => {
	let startDate;
	let endDate = new Date();
	const now = new Date();

	switch (range) {
		case "today":
			startDate = new Date();
			break;
		case "yesterday":
			startDate = substractDays(1, new Date());
			break;
		case "last_7_days":
			startDate = substractDays(7, new Date());
			break;
		case "last_30_days":
			startDate = substractDays(30, new Date());
			break;
		case "last_90_days":
			startDate = substractDays(90, new Date());
			break;
		case "current_month":
			startDate = new Date(now.getFullYear(), now.getMonth(), 1);
			endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
			break;
		case "last_semester":
			startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
			break;
	}

	return {
		startDate: startDate.toLocaleDateString("en-US"),
		endDate: endDate.toLocaleDateString("en-US"),
	};
};

const formatDate = (date: any) => {
	return moment(date._seconds * 1000).format("DD/MM/YY");
};

function substractDays(days: number, date: any) {
	var res = date;
	res.setDate(res.getDate() - days);
	return res;
}

watch(
	range,
	async () => {
		if (!range.value) {
			return;
		}

		await handleConsultData(range.value);
	},
	{ immediate: true }
);

watch(
	locale,
	() => {
		rangeOptions.value = [
			{ value: "today", label: t("dashboard.options.today") },
			{ value: "yesterday", label: t("dashboard.options.yesterday") },
			{ value: "last_7_days", label: t("dashboard.options.last_7_days") },
			{ value: "last_30_days", label: t("dashboard.options.last_30_days") },
			{ value: "last_90_days", label: t("dashboard.options.last_90_days") },
			{ value: "current_month", label: t("dashboard.options.currentMonth") },
			{ value: "last_semester", label: t("dashboard.options.lastSemester") },
		];
	},
	{ immediate: true }
);

onMounted(async () => {
	setTimeout(() => {
		usersBarOptions.series = [
			{
				name: "Orders",
				data: barData,
			},
		];
	}, 1000);

	setTimeout(() => {
		usersBarOptions.series = [
			...usersBarOptions.series,
			{
				name: "Abandonned",
				data: barData2,
			},
		];
	}, 2500);
});
</script>

<template>
	<div class="columns is-multiline">
		<div class="column is-4">
			<VField grouped>
				<VControl>
					<VSwitchSegment
						v-model="hasCustomizedRange"
						:label-true="t('dashboard.labels.manualRange')"
						:label-false="t('dashboard.labels.selectRange')"
						color="primary"
						@click="hasCustomizedRange = !hasCustomizedRange"
					/>
				</VControl>
			</VField>
		</div>
	</div>
	<div class="columns is-multiline">
		<div v-if="!hasCustomizedRange" class="column is-4">
			<VField v-slot="{ id }">
				<label>{{ t("dashboard.labels.dateRange") }}</label>
				<VControl>
					<Multiselect
						v-model="range"
						:attrs="{ id }"
						:options="rangeOptions"
						:placeholder="`** ${t('selectAnOption')} **`"
					/>
				</VControl>
			</VField>
		</div>
		<div v-else class="column is-6">
			<label>{{ t("dashboard.labels.dateRange") }}</label>

			<VDatePicker
				v-model="manualRange"
				is-range
				color="green"
				trim-weeks
				:masks="{ input: 'DD/MM/YYYY' }"
			>
				<template #default="{ inputValue, inputEvents }">
					<VField addons>
						<VControl>
							<input
								:value="inputValue.start"
								class="input"
								v-on="inputEvents.start"
								placeholder="DD/MM/YYYY"
							/>
						</VControl>
						<VControl>
							<a class="button is-static"
								><i class="iconify" data-icon="feather:arrow-right"></i
							></a>
						</VControl>
						<VControl>
							<input
								:value="inputValue.end"
								class="input"
								v-on="inputEvents.end"
								placeholder="DD/MM/YYYY"
							/>
						</VControl>
						<VControl>
							<VButton class="ml-3" color="primary" raised @click="handleConsultData"
								>Consultar</VButton
							>
						</VControl>
					</VField>
				</template>
			</VDatePicker>
		</div>
		<div class="column is-6 ml-auto">
			<VField v-slot="{ id }">
				<label>{{ t("dashboard.labels.products") }}</label>
				<VControl>
					<Multiselect
						v-model="selectedProducts"
						:attrs="{ id }"
						mode="tags"
						:options="productsOptions"
						:placeholder="`** ${t('selectAnOption')} **`"
					/>
				</VControl>
			</VField>
		</div>
	</div>

	<div v-if="isLoading" class="business-dashboard company-dashboard">
		<div class="company-header is-dark-card-bordered is-dark-bg-6">
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-users-alt is-dark-primary"></i>
					<span class="dark-inverted">
						<VPlaceloadText
							class="is-flex is-flex-direction-column is-align-items-center mt-4"
							:lines="2"
							width="75%"
							last-line-width="75%"
						/>
					</span>
					<p></p>
				</div>
			</div>
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-diamond-alt is-dark-primary"></i>
					<span class="dark-inverted">
						<VPlaceloadText
							class="is-flex is-flex-direction-column is-align-items-center mt-4"
							:lines="2"
							width="75%"
							last-line-width="75%"
						/>
					</span>
					<p></p>
				</div>
			</div>
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-briefcase-alt is-dark-primary"></i>
					<span class="dark-inverted">
						<VPlaceloadText
							class="is-flex is-flex-direction-column is-align-items-center mt-4"
							:lines="2"
							width="75%"
							last-line-width="75%"
						/>
					</span>
					<p></p>
				</div>
			</div>
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-ticket is-dark-primary"></i>
					<span class="dark-inverted">
						<VPlaceloadText
							class="is-flex is-flex-direction-column is-align-items-center mt-4"
							:lines="2"
							width="75%"
							last-line-width="75%"
						/>
					</span>
					<p></p>
				</div>
			</div>
		</div>

		<div class="columns is-multiline">
			<div class="column is-4">
				<div class="dashboard-card is-company">
					<VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />

					<h3 class="dark-inverted">
						<VPlaceloadText
							class="is-flex is-flex-direction-column is-align-items-center mt-4"
							:lines="3"
							width="75%"
							last-line-width="75%"
						/>
					</h3>
					<p></p>
					<div class="description">
						<p></p>
					</div>
					<div class="company-stats is-dark-bordered-12">
						<div class="company-stat">
							<div>
								<span>Región</span>
								<span class="dark-inverted">
									<VPlaceloadText
										class="is-flex is-flex-direction-column is-align-items-center mt-4"
										:lines="1"
										width="75%"
										last-line-width="75%"
									/>
								</span>
							</div>
						</div>
						<div class="company-stat">
							<div>
								<span>Creado</span>
								<span class="dark-inverted"
									><VPlaceloadText
										class="is-flex is-flex-direction-column is-align-items-center mt-4"
										:lines="1"
										width="75%"
										last-line-width="75%"
								/></span>
							</div>
						</div>
						<div class="company-stat">
							<div>
								<span>Estado</span>
								<span class="dark-inverted"
									><VPlaceloadText
										class="is-flex is-flex-direction-column is-align-items-center mt-4"
										:lines="1"
										width="75%"
										last-line-width="75%"
								/></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-8">
				<div class="dashboard-card is-base-chart">
					<div class="content-box">
						<div class="revenue-stats is-dark-bordered-12">
							<div class="revenue-stat">
								<span>Monto Prima</span>
								<span class="current">
									<VPlaceloadText
										class="is-flex is-flex-direction-column is-align-items-center mt-4"
										:lines="1"
										width="75%"
										last-line-width="75%"
									/>
								</span>
							</div>
							<div class="revenue-stat">
								<span>Monto Cancelado</span>
								<span class="dark-inverted"
									><VPlaceloadText
										class="is-flex is-flex-direction-column is-align-items-center mt-4"
										:lines="1"
										width="75%"
										last-line-width="75%"
								/></span>
							</div>
							<div class="revenue-stat">
								<span>Total</span>
								<span class="dark-inverted"
									><VPlaceloadText
										class="is-flex is-flex-direction-column is-align-items-center mt-4"
										:lines="1"
										width="75%"
										last-line-width="75%"
								/></span>
							</div>
						</div>
					</div>
					<div class="chart-container"></div>
				</div>
			</div>
		</div>
	</div>

	<div v-else class="business-dashboard company-dashboard">
		<div class="company-header is-dark-card-bordered is-dark-bg-6">
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-users-alt is-dark-primary"></i>
					<span class="dark-inverted">{{ mappedData.activePolicies }}</span>
					<p>{{ t("dashboard.labels.totalActivePolicies") }}</p>
				</div>
			</div>
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-diamond-alt is-dark-primary"></i>
					<span class="dark-inverted">{{ mappedData.soldPolicies }}</span>
					<p>{{ t("dashboard.labels.totalSoldPolicies") }}</p>
				</div>
			</div>
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-briefcase-alt is-dark-primary"></i>
					<span class="dark-inverted">{{ mappedData.canceledPolicies }}</span>
					<p>{{ t("dashboard.labels.totalCanceledPolicies") }}</p>
				</div>
			</div>
			<div class="header-item is-dark-bordered-12">
				<div class="item-inner">
					<i aria-hidden="true" class="lnil lnil-ticket is-dark-primary"></i>
					<span class="dark-inverted">{{ mappedData.averageAge }}</span>
					<p>{{ t("dashboard.labels.ageAverage") }}</p>
				</div>
			</div>
		</div>

		<div class="columns is-multiline">
			<div class="column is-4">
				<div class="dashboard-card is-company">
					<VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />

					<h3 class="dark-inverted">{{ user?.name }} {{ user?.lastname }}</h3>
					<p>{{ t(`config.parameters.users.${user?.profile}`) }}</p>
					<div class="description">
						<p>
							{{ t("dashboard.title", { add: "@" }) }},
							{{ t("dashboard.subtitle", { add: "@" }) }}
						</p>
					</div>
					<div class="company-stats is-dark-bordered-12">
						<div class="company-stat">
							<div>
								<span>{{ t("dashboard.labels.region") }}</span>
								<span class="dark-inverted">Brasil</span>
							</div>
						</div>
						<div class="company-stat">
							<div>
								<span>{{ t("dashboard.labels.created") }}</span>
								<span class="dark-inverted">{{ formatDate(user?.createdAt) }}</span>
							</div>
						</div>
						<div class="company-stat">
							<div>
								<span>{{ t("dashboard.labels.status") }}</span>
								<span class="dark-inverted">{{
									user?.status == "active"
										? t("dashboard.labels.active")
										: t("dashboard.labels.inactive")
								}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-8">
				<div class="dashboard-card is-base-chart">
					<div class="content-box">
						<div class="revenue-stats is-dark-bordered-12">
							<div class="revenue-stat">
								<span>{{ t("dashboard.labels.totalActivePremium") }}</span>
								<span class="current">{{ mappedData.totalActivePremium.toFixed(2) }}</span>
							</div>
							<div class="revenue-stat">
								<span>{{ t("dashboard.labels.totalCanceledPremium") }}</span>
								<span class="dark-inverted">{{ mappedData.totalCanceledPremium.toFixed(2) }}</span>
							</div>
							<div class="revenue-stat">
								<span>{{ t("dashboard.labels.total") }}</span>
								<span class="dark-inverted">{{
									(mappedData.totalActivePremium - mappedData.totalCanceledPremium).toFixed(2)
								}}</span>
							</div>
						</div>
					</div>
					<div class="chart-container">
						<ApexChart
							id="users-chart"
							:height="usersOptions.chart.height"
							:type="usersOptions.chart.type"
							:series="usersOptions.series"
							:options="usersOptions"
						>
						</ApexChart>
					</div>
				</div>
			</div>
			<!-- <div class="column is-12">
        <div class="dashboard-card">
          <div class="card-head">
            <h3 class="dark-inverted">Subscriptions</h3>
          </div>
          <ApexChart
            id="bar-chart"
            :height="usersBarOptions.chart.height"
            :type="usersBarOptions.chart.type"
            :series="usersBarOptions.series"
            :options="usersBarOptions"
          >
          </ApexChart>
        </div>
      </div> -->
		</div>
	</div>
</template>

<style lang="scss">
@import "../../../../scss/abstracts/mixins";

.company-dashboard {
	.company-header {
		display: flex;
		padding: 20px;
		background: var(--white);
		border: 1px solid var(--fade-grey-dark-3);
		border-radius: var(--radius-large);
		margin-bottom: 1.5rem;

		.header-item {
			width: 25%;
			border-right: 1px solid var(--fade-grey-dark-3);

			&:last-child {
				border-right: none;
			}

			.item-inner {
				text-align: center;

				.lnil,
				.lnir {
					font-size: 1.8rem;
					margin-bottom: 6px;
					color: var(--primary);
				}

				span {
					display: block;
					font-family: var(--font);
					font-weight: 600;
					font-size: 1.6rem;
					color: var(--dark-text);
				}

				p {
					font-family: var(--font-alt);
					font-size: 0.95rem;
				}
			}
		}
	}

	.widget {
		height: 100%;
	}

	.dashboard-card {
		@include vuero-s-card;

		height: 100%;

		&.is-company {
			text-align: center;
			padding: 30px;

			.v-avatar {
				display: block;
				margin: 0 auto 10px;

				.button {
					position: absolute;
					bottom: 0;
					right: 0;
					max-width: 35px;
				}
			}

			> h3 {
				color: var(--dark-text);
				font-family: var(--font-alt);
				font-size: 1.2rem;
				font-weight: 600;
			}

			> p {
				font-size: 0.9rem;
			}

			.description {
				padding: 10px 0 0;
			}

			.company-stats {
				display: flex;
				padding-top: 20px;
				margin-top: 20px;
				border-top: 1px solid var(--fade-grey-dark-3);

				.company-stat {
					width: 33.3%;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;

					span {
						display: block;
						font-family: var(--font);

						&:first-child {
							text-transform: uppercase;
							font-family: var(--font-alt);
							font-size: 0.75rem;
							color: var(--light-text);
						}

						&:nth-child(2) {
							color: var(--dark-text);
							font-size: 1.4rem;
							font-weight: 600;
						}
					}
				}
			}
		}

		&.is-base-chart {
			padding: 0;
			display: flex;
			flex-direction: column;

			.content-box {
				padding: 30px;

				.revenue-stats {
					display: flex;
					padding-bottom: 20px;
					border-bottom: 1px solid var(--fade-grey-dark-3);

					.revenue-stat {
						margin-right: 30px;
						font-family: var(--font);

						span {
							display: block;

							&:first-child {
								text-transform: uppercase;
								font-family: var(--font-alt);
								font-size: 0.75rem;
								color: var(--light-text);
							}

							&:nth-child(2) {
								color: var(--dark-text);
								font-size: 1.6rem;
								font-weight: 600;
							}

							&.current {
								color: var(--primary);
							}
						}
					}
				}
			}

			.chart-container {
				margin-top: auto;
			}
		}

		&.is-tickets {
			padding: 30px;

			.ticket-list {
				padding: 10px 0;

				.media-flex {
					+ .media-flex {
						margin-top: 20px;
						padding-top: 20px;
						border-top: 1px solid var(--fade-grey-dark-3);
					}

					.flex-meta {
						span {
							&:nth-child(2) {
								font-size: 1rem;
								margin: 4px 0;
								color: var(--light-text-dark-20);
								max-width: 430px;
							}

							&:nth-child(3) {
								font-size: 0.9rem;
								color: var(--light-text);
							}
						}
					}
				}
			}
		}

		.card-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;

			h3 {
				font-family: var(--font-alt);
				font-size: 1rem;
				font-weight: 600;
				color: var(--dark-text);
			}
		}
	}

	.table-wrapper {
		min-height: 0;
	}

	.dataTable-wrapper {
		.dataTable-top {
			padding: 0 !important;
			margin: 0 !important;
		}
	}
}

.is-dark {
	.company-dashboard {
		.dashboard-card {
			@include vuero-card--dark;
		}
	}
}

@media only screen and (max-width: 767px) {
	.company-dashboard {
		.company-header {
			flex-wrap: wrap;

			.header-item {
				width: 50%;
				border-right: none;
				border: none;
				padding: 16px 0;
			}
		}

		.dashboard-card {
			&.is-tickets {
				padding: 30px;

				.ticket-list {
					.media-flex {
						.flex-meta {
							margin-bottom: 1rem;
						}
					}
				}
			}
		}
	}
}
</style>
