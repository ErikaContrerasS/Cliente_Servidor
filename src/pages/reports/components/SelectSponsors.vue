<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
	isVisible: { type: Boolean, default: false },
	data: { type: Array, default: [] },
	loading: { type: Boolean, default: "" },
});

const emits = defineEmits(["dataSelected", "getReport"]);

const isVisible = computed(() => props.isVisible);
const data = computed(() => props.data);
const loading = computed(() => props.loading);

const data_selected = ref("");

const emitData = (type: string) => {
	if (type == "sponsor") emits("dataSelected", data_selected.value);
	if (type == "report") emits("getReport");
};
</script>

<template>
	<div class="">
		<div class="column" v-if="isVisible">
			<VField>
				<VControl class="has-icons-left" icon="fas fa-building">
					<div class="select">
						<select v-model="data_selected" style="height: 38px" @change="emitData('sponsor')">
							<option value="" selected>Seleccione un Reporte</option>
							<option v-for="(sponsor, idx) in data" :key="idx" :value="sponsor">
								{{ sponsor }}
							</option>
						</select>
					</div>
				</VControl>
			</VField>
		</div>
		<!-- <div class="column" v-if="data_selected">
			<VButton
				color="primary"
				raised
				icon="feather:zoom-in"
				:loading="loading"
				@click="emitData('report')"
				>Generar Reporte Liverpool</VButton
			>
		</div> -->
	</div>
</template>
