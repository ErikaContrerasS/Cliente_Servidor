<script setup lang="ts">
import ApexChart from "vue3-apexcharts";
import { bitcoinChartOptions } from "/@src/data/dashboards/banking-v3/bitcoinPriceChart";
import { evolutionRadialOptions } from "/@src/data/dashboards/banking-v3/evolutionRadialChart";
import { barOptions } from "/@src/data/dashboards/analytics/profitBarChart";
import { popularityGaugeOptions } from "/@src/data/dashboards/banking-v3/popularityGaugeChart";
import { popovers } from "/@src/data/users/userPopovers";
</script>

<template>
	<div class="banking-dashboard banking-dashboard-v3">
		<!--Body-->
		<div class="columns">
			<div class="column is-12">
				<!--Tiles-->
				<div class="dashboard-tiles">
					<!--Tile-->
					<div class="dashboard-tile">
						<span>Sales this Month</span>
						<span class="dark-inverted">2,870</span>
					</div>
					<!--Tile-->
					<div class="dashboard-tile">
						<span>New Users</span>
						<span class="dark-inverted">131</span>
					</div>
					<!--Tile-->
					<div class="dashboard-tile">
						<span>Earned Today</span>
						<span class="dark-inverted">$398,49</span>
					</div>
					<div class="dashboard-tile">
						<span>Total Balanced</span>
						<span class="dark-inverted">$6542,31</span>
					</div>
				</div>

				<!--Chart-->
				<div class="dashboard-card">
					<ApexChart
						id="currency-chart"
						:height="bitcoinChartOptions.chart.height"
						:type="bitcoinChartOptions.chart.type"
						:series="bitcoinChartOptions.series"
						:options="bitcoinChartOptions"
					>
					</ApexChart>
				</div>

				<div class="columns is-multiline">
					<div class="column is-6">
						<div class="dashboard-card">
							<ApexChart
								id="radial-chart"
								:height="evolutionRadialOptions.chart.height"
								:type="evolutionRadialOptions.chart.type"
								:series="evolutionRadialOptions.series"
								:options="evolutionRadialOptions"
							>
							</ApexChart>
						</div>
					</div>
					<div class="column is-6">
						<div class="dashboard-card">
							<div class="card-head">
								<h3 class="dark-inverted">Profit Evolution</h3>
							</div>
							<ApexChart
								id="profit-chart"
								:height="barOptions.chart.height"
								:type="barOptions.chart.type"
								:series="barOptions.series"
								:options="barOptions"
							>
							</ApexChart>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../../../scss/abstracts/mixins";

.banking-dashboard-v3 {
	.dashboard-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: var(--font);
		margin-bottom: 20px;

		.left {
			> span {
				color: var(--light-text);
			}

			.currency {
				.amount {
					position: relative;
					font-size: 2rem;
					font-weight: 600;
					color: var(--dark-text);

					&.is-positive {
						&::after {
							color: var(--green);
						}
					}

					&.is-negative {
						&::after {
							color: var(--red);
						}
					}

					&::after {
						content: "+3.4%";
						position: relative;
						top: -8px;
						right: -8px;
						font-size: 1.1rem;
					}
				}
			}
		}
	}

	.dashboard-tiles {
		display: flex;
		margin-left: -8px;
		margin-right: -8px;
		margin-top: -8px;
		margin-bottom: 1rem;

		.dashboard-tile {
			@include vuero-s-card;

			width: calc(33.3% - 16px);
			margin: 8px;

			span {
				display: block;
				font-family: var(--font);

				&:first-child {
					font-size: 0.9rem;
					color: var(--light-text);
					margin-bottom: 4px;
				}

				&:nth-child(2) {
					font-weight: 500;
					font-size: 1.2rem;
					color: var(--dark-text);
				}
			}
		}
	}

	.dashboard-card {
		@include vuero-s-card;

		&:not(:last-child) {
			margin-bottom: 1.5rem;
		}

		&.is-side {
			padding: 30px;

			.people {
				.v-avatar {
					margin-right: 0.5rem;
					margin-bottom: 0.5rem;
				}
			}
		}

		&.is-wallet {
			img {
				display: block;
				max-width: 200px;
				margin: 0 auto;
			}
		}

		.subheading-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30px;

			.subheading {
				font-family: var(--font-alt);
				font-weight: 600;
				font-size: 0.8rem;
				text-transform: uppercase;
				color: var(--dark-text);
			}

			.action-link {
				font-size: 0.9rem;
			}
		}

		.currency-description {
			padding: 10px 0 20px;
		}

		.button-wrap {
			display: flex;
			justify-content: space-between;

			.button {
				width: 49%;
			}
		}
	}
}

.is-dark {
	.banking-dashboard-v3 {
		.dashboard-tiles {
			.dashboard-tile {
				@include vuero-card--dark;
			}
		}

		.dashboard-card {
			@include vuero-card--dark;
		}
	}
}

@media only screen and (max-width: 767px) {
	.banking-dashboard-v3 {
		.dashboard-header {
			flex-direction: column;

			.left {
				margin-bottom: 1.5rem;
			}
		}

		.dashboard-tiles {
			flex-wrap: wrap;

			.dashboard-tile {
				width: calc(100% - 16px) !important;
				min-width: calc(100% - 16px) !important;
			}
		}
	}
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
	.banking-dashboard-v3 {
		.dashboard-tiles {
			.dashboard-tile {
				span {
					&:nth-child(2) {
						font-size: 1.1rem;
					}
				}
			}
		}
	}
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
	.banking-dashboard-v3 {
		.dashboard-tiles {
			.dashboard-tile {
				span {
					&:nth-child(2) {
						font-size: 1rem;
					}
				}
			}
		}
	}
}
</style>
