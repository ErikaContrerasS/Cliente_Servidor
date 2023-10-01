<script setup lang="ts">
import ApexChart from "vue3-apexcharts";

import { incomeOptions } from "/@src/data/dashboards/banking-v1/incomeHistoryChart";
import { gaugeOptions } from "/@src/data/dashboards/analytics/goalChart";
import { popovers } from "/@src/data/users/userPopovers";
import {
	creativityRadialOptions,
	engagmentRadialOptions,
	popularityRadialOptions,
} from "/@src/data/dashboards/lifestyle-v1/groupedSocialCharts";
import {
	selectSlotValue,
	selectSlotOptions,
	valueSingle,
	optionsSingle,
} from "/@src/data/dashboards/banking-v1/dashboardData";
</script>

<template>
	<div class="banking-dashboard banking-dashboard-v1">
		<div class="columns is-multiline">
			<!--Credit Cards-->

			<div class="column is-12 is-full-tablet-p">
				<div class="columns is-multiline">
					<div class="column is-6">
						<div class="stat-widget grouped-stat-widget is-straight">
							<div class="widget-head">
								<h3 class="dark-inverted">Social Points</h3>
							</div>
							<div class="chart-group">
								<div class="group">
									<div class="group-content">
										<div class="chart-container">
											<ApexChart
												id="widget-group-radial-1"
												:height="creativityRadialOptions.chart.height"
												:type="creativityRadialOptions.chart.type"
												:series="creativityRadialOptions.series"
												:options="creativityRadialOptions"
											>
											</ApexChart>
										</div>
										<span class="dark-inverted">+ 234</span>
										<p>Creativity</p>
									</div>
								</div>
								<div class="group">
									<div class="group-content">
										<div class="chart-container">
											<ApexChart
												id="widget-group-radial-2"
												:height="engagmentRadialOptions.chart.height"
												:type="engagmentRadialOptions.chart.type"
												:series="engagmentRadialOptions.series"
												:options="engagmentRadialOptions"
											>
											</ApexChart>
										</div>
										<span class="dark-inverted">+37%</span>
										<p>Engagement</p>
									</div>
								</div>
								<div class="group">
									<div class="group-content">
										<div class="chart-container">
											<ApexChart
												id="widget-group-radial-3"
												:height="popularityRadialOptions.chart.height"
												:type="popularityRadialOptions.chart.type"
												:series="popularityRadialOptions.series"
												:options="popularityRadialOptions"
											>
											</ApexChart>
										</div>
										<span class="dark-inverted">+82%</span>
										<p>Popularity</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="column is-6">
						<div class="dashboard-card is-income">
							<VField class="is-minimal-select">
								<VControl>
									<Multiselect
										v-model="valueSingle"
										:options="optionsSingle"
										placeholder="Select an option"
										:max-height="145"
									/>
								</VControl>
							</VField>

							<ApexChart
								id="income-chart"
								:height="incomeOptions.chart.height"
								:type="incomeOptions.chart.type"
								:series="incomeOptions.series"
								:options="incomeOptions"
							>
							</ApexChart>
						</div>
					</div>

					<div class="column is-4">
						<div class="dashboard-card">
							<div class="card-head">
								<h3 class="dark-inverted">Goal Overview</h3>
							</div>

							<div class="radial-wrap">
								<ApexChart
									id="goal-gauge"
									:height="gaugeOptions.chart.height"
									:type="gaugeOptions.chart.type"
									:series="gaugeOptions.series"
									:options="gaugeOptions"
								>
								</ApexChart>
								<div class="radial-stats is-dark-bordered-12">
									<div class="radial-stat is-dark-bordered-12">
										<span>Completed</span>
										<span class="dark-inverted">1,223</span>
									</div>
									<div class="radial-stat">
										<span>In Progress</span>
										<span class="dark-inverted">467</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="column is-6">
						<div class="dashboard-card is-contacts">
							<div class="title-wrap">
								<h3 class="dark-inverted">Send Money To</h3>
							</div>

							<div class="people-wrap">
								<div class="people">
									<Tippy
										class="has-help-cursor"
										interactive
										:offset="[0, 10]"
										placement="bottom-end"
									>
										<VAvatar color="warning" initials="BT" size="small" />
										<template #content>
											<UserPopoverContent :user="popovers.user122" />
										</template>
									</Tippy>
									<Tippy
										class="has-help-cursor"
										interactive
										:offset="[0, 10]"
										placement="bottom-end"
									>
										<VAvatar picture="https://vuero.cssninja.io/demo/avatars/18.jpg" size="small" />
										<template #content>
											<UserPopoverContent :user="popovers.user18" />
										</template>
									</Tippy>
									<Tippy
										class="has-help-cursor"
										interactive
										:offset="[0, 10]"
										placement="bottom-end"
									>
										<VAvatar color="info" initials="JD" size="small" />
										<template #content>
											<UserPopoverContent :user="popovers.user123" />
										</template>
									</Tippy>
									<Tippy
										class="has-help-cursor"
										interactive
										:offset="[0, 10]"
										placement="bottom-end"
									>
										<VAvatar picture="https://vuero.cssninja.io/demo/avatars/7.jpg" size="small" />
										<template #content>
											<UserPopoverContent :user="popovers.user7" />
										</template>
									</Tippy>
								</div>
								<div class="actions">
									<span>See all Contacts</span>
									<a class="is-dark-primary-hover">
										<i aria-hidden="true" class="iconify" data-icon="feather:arrow-right" />
									</a>
								</div>
							</div>

							<div class="transfer-form">
								<VField class="is-image-select has-curved-images">
									<VControl>
										<Multiselect
											v-model="selectSlotValue"
											placeholder="Select a language"
											label="name"
											:max-height="145"
											:options="selectSlotOptions"
										>
											<template #singlelabel="{ value }">
												<div class="multiselect-single-label">
													<img class="select-label-icon" :src="value.icon" alt="" />
													<span class="select-label-text">
														{{ value.name }}
													</span>
												</div>
											</template>
											<template #option="{ option }">
												<img class="select-option-icon" :src="option.icon" alt="" />
												<span class="select-label-text">
													{{ option.name }}
												</span>
											</template>
										</Multiselect>
									</VControl>
								</VField>

								<div class="field">
									<label>Amount</label>
									<div class="field has-addons">
										<div class="control">
											<span class="select currency-select">
												<select>
													<option>$</option>
													<option>£</option>
													<option>€</option>
												</select>
											</span>
										</div>
										<div class="control is-expanded">
											<input class="input" type="text" placeholder="Amount of money" />
										</div>
									</div>
								</div>

								<p class="context-text">Funds will reach destination tomorrow.</p>

								<div class="submit-wrap">
									<VButton color="primary" size="big" fullwidth raised bold> Send Money </VButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import "../../../../scss/abstracts/mixins";

.banking-dashboard-v1 {
	.columns {
		.column {
			height: fit-content;
		}
	}

	.dashboard-card {
		@include vuero-s-card;

		&:not(:last-child) {
			margin-bottom: 1.5rem;
		}

		&.is-credit-cards {
			padding: 0;

			.title-wrap {
				padding: 20px 20px 10px;
				margin-bottom: 0;
			}

			.card-block {
				.card-block-inner {
					display: flex;
					align-items: center;
					padding: 20px;

					&:not(:first-child) {
						border-top: 1.6px dashed var(--fade-grey-dark-4);
					}

					.credit-card {
						position: relative;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 80px;
						width: 120px;
						min-width: 120px;
						background: var(--fade-grey);
						border-radius: 10px;
						padding: 6px 10px 8px;
						overflow: hidden;

						&.is-theme-1 {
							background: var(--primary);
							box-shadow: var(--primary-box-shadow);
						}

						&.is-theme-2 {
							background: var(--info);
							box-shadow: var(--info-box-shadow);
						}

						.top {
							.card-number {
								display: flex;
								justify-content: space-between;
								align-items: center;

								span {
									font-family: var(--font);
									font-size: 0.8rem;
									font-weight: 500;
									color: var(--smoke-white);
									display: block;
								}

								img {
									display: block;
									width: 100%;
									max-width: 28px;
								}
							}
						}

						.bottom {
							font-family: var(--font);
							font-size: 0.7rem;
							font-weight: 500;
							color: var(--smoke-white);
						}

						.shape {
							position: absolute;
							bottom: -10px;
							right: -10px;
							height: 46px;
							width: 46px;
							background: var(--white);
							border-radius: var(--radius-rounded);
							opacity: 0.15;
						}
					}

					.credit-card-meta {
						margin-left: 16px;

						span {
							display: block;
							font-family: var(--font);

							&:first-child {
								font-size: 0.9rem;
								color: var(--light-text);
							}

							&:nth-child(2) {
								color: var(--dark-text);
								font-size: 1.6rem;
								font-weight: 600;
								line-height: 1.2;
							}
						}
					}

					.credit-card-end {
						margin-left: auto;
					}
				}

				.info-block-inner {
					padding: 10px 20px 20px;

					.title-wrap {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0;
						margin-bottom: 12px;

						h3 {
							font-size: 1rem;
							color: var(--dark-text);
							font-weight: 500;
						}

						.action-link {
							font-size: 0.9rem;
						}
					}

					.info-block-line {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 6px 0;

						h4 {
							font-family: var(--font);
							font-weight: 500;
							color: var(--dark-text);
							font-size: 0.9rem;
							line-height: 2;
						}

						span {
							color: var(--light-text);
							font-size: 0.9rem;

							&.has-image {
								display: flex;
								justify-content: flex-end;
								align-items: center;
								flex-grow: 2;

								img {
									max-width: 28px;
									margin-right: 6px;
								}
							}

							i {
								position: relative;
								top: 0;
								font-size: 10px;
								margin-right: 8px;
							}
						}
					}
				}
			}
		}

		&.is-contacts {
			display: flex;
			flex-direction: column;
			height: 372px;

			.people-wrap {
				.people {
					display: flex;
					padding: 10px 0;

					.v-avatar {
						margin: 0 4px;
					}
				}

				.actions {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-family: var(--font);
					padding: 0 4px;

					span {
						font-size: 0.9rem;
						color: var(--light-text);
					}

					a {
						color: var(--light-text);

						&:hover,
						&:focus {
							color: var(--primary);
						}

						svg {
							height: 16px;
							width: 16px;
						}
					}
				}
			}

			.transfer-form {
				margin-top: auto;
			}
		}

		&.is-transactions {
			.transactions {
				padding: 10px 0;

				.media-flex-center {
					.flex-meta {
						span {
							&:nth-child(2) {
								font-size: 0.85rem;
							}
						}
					}

					.flex-end {
						font-family: var(--font);
						font-size: 1rem;
						font-weight: 500;
						color: var(--dark-text);
					}
				}
			}
		}

		&.is-income {
			position: relative;

			.field {
				position: absolute;
				top: 12px;
				right: 16px;
				z-index: 5;
				min-width: 135px;

				.multiselect {
					.multiselect-input {
						.multiselect-single-label {
							color: var(--light-text);
						}
					}

					.multiselect-options {
						left: unset !important;
						min-width: 180px;
					}
				}
			}
		}

		> .title-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 12px;
			font-family: var(--font);

			h3 {
				font-family: var(--font-alt);
				font-size: 1rem;
				font-weight: 600;
				color: var(--dark-text);
			}

			.title-meta {
				font-size: 1rem;
				font-weight: 500;
				color: var(--dark-text);
			}

			.action-link {
				font-size: 0.9rem;
			}
		}

		.context-text {
			font-size: 0.9rem;
			margin-bottom: 10px;
		}
	}
}

.is-dark {
	.banking-dashboard-v1 {
		.dashboard-card {
			@include vuero-card--dark;
		}
	}
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
	.banking-dashboard-v1 {
		.dashboard-card {
			&.is-credit-cards {
				.card-block {
					.card-block-inner {
						.credit-card {
							height: 67px;
							width: 100px;
							min-width: 100px;
						}

						.credit-card-meta {
							span {
								&:nth-child(2) {
									font-size: 1.3rem;
								}
							}
						}
					}
				}
			}

			&.is-contacts {
				height: 400px;
			}

			.context-text {
				font-size: 0.8rem;
			}
		}
	}
}
</style>
