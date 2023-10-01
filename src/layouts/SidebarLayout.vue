<script setup lang="ts">
import { ref, watchPostEffect, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserSession } from "/@src/stores/userSession";
import type { SidebarTheme } from "/@src/components/navigation/desktop/Sidebar.vue";
import { usePanels } from "/@src/stores/panels";
import { useViewWrapper } from "/@src/stores/viewWrapper";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();
//useUserSession().user?.countryLocal;
// const countryUser = JSON.parse(localStorage.getItem("user") || "");
const isVisibleSelectRegional =
	useUserSession().user?.isVisibleSelectRegional == "true" ? true : false;
const props = withDefaults(
	defineProps<{
		theme?: SidebarTheme;
		defaultSidebar?: string;
		closeOnChange?: boolean;
		openOnMounted?: boolean;
		nowrap?: boolean;
	}>(),
	{
		defaultSidebar: "dashboard",
		theme: "color",
	}
);

const userSession = useUserSession();
const viewWrapper = useViewWrapper();
const panels = usePanels();
const route = useRoute();
const isMobileSidebarOpen = ref(false);
const isDesktopSidebarOpen = ref(props.openOnMounted);
const activeMobileSubsidebar = ref(props.defaultSidebar);
const selectedRegion = ref("");
const countryOptions = ref([]);
// const region = JSON.parse(localStorage.getItem("user") || "").region;
const hasClearence = (clearenceCode: string) => {
	return userSession.hasClearence(clearenceCode);
};

// countryUser.countryLocal = countryUser.country;

function switchSidebar(id: string) {
	if (id === activeMobileSubsidebar.value) {
		isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value;
	} else {
		isDesktopSidebarOpen.value = true;
		activeMobileSubsidebar.value = id;
	}
}
/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */

const getCountry = async () => {
	const { data } = await tryGetUserCountry();
	countryOptions.value = data.country;
};

watchPostEffect(() => {
	viewWrapper.setPushed(isDesktopSidebarOpen.value ?? false);
});
watch(
	() => route.fullPath,
	() => {
		isMobileSidebarOpen.value = false;

		if (props.closeOnChange && isDesktopSidebarOpen.value) {
			isDesktopSidebarOpen.value = false;
		}
	}
);
watch(
	() => selectedRegion.value,
	() => {
		const user = JSON.parse(localStorage.getItem("user") || "");
		user.country = parseInt(selectedRegion.value);
		useUserSession().setUser(user);
	}
);

// if(countryUser.countryLocal == 3) await getCountry();
</script>

<template>
	<div class="sidebar-layout">
		<div class="app-overlay"></div>

		<!-- Mobile navigation -->
		<MobileNavbar
			:is-open="isMobileSidebarOpen"
			@toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
		>
			<template #brand>
				<RouterLink :to="{ name: 'index' }" class="navbar-item is-brand">
					<AnimatedLogo width="38px" height="38px" />
				</RouterLink>

				<div class="brand-end">
					<!-- <NotificationsMobileDropdown /> -->
					<UserProfileDropdown />
				</div>
			</template>
		</MobileNavbar>

		<!-- Mobile sidebar links -->
		<MobileSidebar
			:is-open="isMobileSidebarOpen"
			@toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
		>
			<template #links>
				<!-- <li>
          <a
            :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']"
            aria-label="Display dashboard content"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'dashboard'"
            @click="activeMobileSubsidebar = 'dashboard'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:activity"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Display layout content"
            :class="[activeMobileSubsidebar === 'layout' && 'is-active']"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'layout'"
            @click="activeMobileSubsidebar = 'layout'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:grid"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Display element content"
            :class="[activeMobileSubsidebar === 'elements' && 'is-active']"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'elements'"
            @click="activeMobileSubsidebar = 'elements'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:box"></i>
          </a>
        </li>
        <li>
          <a
            aria-label="Display components content"
            :class="[activeMobileSubsidebar === 'components' && 'is-active']"
            tabindex="0"
            @keydown.space.prevent="activeMobileSubsidebar = 'components'"
            @click="activeMobileSubsidebar = 'components'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:cpu"></i>
          </a>
        </li> -->
				<!-- <li>
          <RouterLink :to="{ name: 'messaging-v1' }">
            <i aria-hidden="true" class="iconify" data-icon="feather:message-circle"></i>
          </RouterLink>
        </li> -->
			</template>

			<template #bottom-links>
				<!-- <li>
          <a
            aria-label="Display search panel"
            tabindex="0"
            @keydown.space.prevent="panels.setActive('search')"
            @click="panels.setActive('search')"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:search"></i>
          </a>
        </li> -->
				<!-- <li>
          <a aria-label="View settings" href="#">
            <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
          </a>
        </li> -->
			</template>
		</MobileSidebar>

		<Sidebar theme="color" :is-open="isDesktopSidebarOpen" style="width: auto; text-align: center">
			<template #links>
				<!-- Dashboards -->
				<li>
					<a id="open-messages" href="/sidebar/dashboards/banking-3" data-content="Home">
						<i
							aria-hidden="true"
							aria-label="View dashboards"
							class="iconify sidebar-svg"
							tabindex="0"
							data-icon="feather:home"
						></i>
						<br />
						<span class="icon-text hoverText">{{ t("sidebar.titles.home") }}</span>
					</a>
				</li>

				<!-- Reports -->
				<li class="has-text-centered">
					<a
						:class="[activeMobileSubsidebar === 'reports' && 'is-active']"
						data-content="Reports"
						aria-label="View Reports"
						tabindex="0"
						@keydown.space.prevent="switchSidebar('reports')"
						@click="switchSidebar('reports')"
					>
						<i
							aria-hidden="true"
							class="iconify sidebar-svg icon"
							data-icon="feather:trending-up"
						></i>
						<br />
						<span class="icon-text hoverText">{{ t("sidebar.titles.reports") }}</span>
					</a>
				</li>

				<!-- Users -->
				<li class="has-text-centered">
					<a
						:class="[activeMobileSubsidebar === 'users' && 'is-active']"
						:data-content="t('sidebar.titles.users')"
						aria-label="View Users"
						tabindex="0"
						@keydown.space.prevent="switchSidebar('users')"
						@click="switchSidebar('users')"
					>
						<i aria-hidden="true" class="iconify sidebar-svg icon" data-icon="feather:users"></i>
						<br />
						<span class="icon-text hoverText">{{ t("sidebar.titles.users") }}</span>
					</a>
				</li>
			</template>

			<template #bottom-links>
				<!-- Switch Sidebar  Layouts -->
				<li class="is-hidden-touch"></li>
				<li>
					<UserProfileDropdown up />
				</li>
			</template>
		</Sidebar>

		<Transition name="slide-x">
			<KeepAlive>
				<DashboardsSubsidebarMex
					v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'dashboard-mex'"
					@close="isDesktopSidebarOpen = false"
				/>
				<DashboardsSubsidebarBra
					v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'dashboard-bra'"
					@close="isDesktopSidebarOpen = false"
				/>
				<TracingSubsidebarMex
					v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'tracing-mex'"
					@close="isDesktopSidebarOpen = false"
				/>
				<ReportSubsidebar
					v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'reports'"
					@close="isDesktopSidebarOpen = false"
				/>
				<UsersSubsidebar
					v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'users'"
					@close="isDesktopSidebarOpen = false"
				/>
			</KeepAlive>
		</Transition>

		<LanguagesPanel />
		<ActivityPanel />
		<SearchPanel />
		<TaskPanel />

		<VViewWrapper>
			<VPageContentWrapper>
				<template v-if="props.nowrap">
					<slot></slot>
				</template>
				<VPageContent v-else class="is-relative">
					<div class="page-title has-text-centered">
						<!-- Sidebar Trigger -->
						<div
							class="vuero-hamburger nav-trigger push-resize"
							tabindex="0"
							@keydown.space.prevent="isDesktopSidebarOpen = !isDesktopSidebarOpen"
							@click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
						>
							<span class="menu-toggle has-chevron">
								<span :class="[isDesktopSidebarOpen && 'active']" class="icon-box-toggle">
									<span class="rotate">
										<i aria-hidden="true" class="icon-line-top"></i>
										<i aria-hidden="true" class="icon-line-center"></i>
										<i aria-hidden="true" class="icon-line-bottom"></i>
									</span>
								</span>
							</span>
						</div>

						<div class="title-wrap">
							<h1 class="title is-4">{{ viewWrapper.pageTitle }}</h1>
						</div>

						<Toolbar class="desktop-toolbar"> </Toolbar>
					</div>
					<!-- <div
            v-if="countryUser.countryLocal == 3 && isVisibleSelectRegional"
            class="mb-5 mx-2 columns"
          >
            <VField>
              <VControl class="has-icons-left" icon="fas fa-globe">
                <div class="select">
                  <select v-model="selectedRegion" style="height: 38px">
                    <option value="" selected disabled>Seleccione una region</option>
                    <option
                      v-for="val in countryOptions"
                      :value="val.value"
                      v-show="region.includes(val.value)"
                    >
                      {{ val.label }}
                    </option>
                  </select>
                </div>
              </VControl>
            </VField>
          </div> -->
					<slot></slot>
				</VPageContent>
			</VPageContentWrapper>
		</VViewWrapper>
	</div>
</template>

<style lang="scss">
.hoverText {
	color: #cccccc;
}
.hoverText:hover {
	color: #fff;
}
</style>
