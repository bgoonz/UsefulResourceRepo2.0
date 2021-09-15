<template>
  <div class="row">
    <div class="col-md-4 order-md-2 mb-4">
      <div class="mb-2">
        <settings-modal />
      </div>
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">Your Resources</span>
        <span class="badge badge-secondary badge-pill">{{
          resourcesLength
        }}</span>
      </h4>
      <resource-search @on-search="handleSearch" />
      <resource-list
        :resources="resources"
        :activeId="activeResource?._id"
        @on-item-click="selectResource"
      />
    </div>
    <div class="col-md-8 order-md-1">
      <h4 class="mb-3">
        Resource {{ activeResource?._id }}
        <template v-if="hasResources">
          <button
            @click="toggleView"
            :class="`btn btn-sm ${toggleBtnClass} mr-2`"
          >
            {{ isDetailView ? "Update" : "Detail" }}
          </button>
          <resource-delete
            @on-resource-delete="
              handleResourceChange($event, 'delete');
              !hasResources ? (isDetailView = true) : null;
            "
            :activeId="activeResource?._id"
          />
        </template>
      </h4>
      <resource-detail v-if="isDetailView" :resource="activeResource">
        <template #buttonLink>
          <router-link
            class="btn btn-outline-success"
            :to="{
              name: 'resourceDetailPage',
              params: { id: activeResource?._id },
            }"
          >
            See detail page
          </router-link>
        </template>
      </resource-detail>
      <resource-update
        v-else
        @on-resource-update="handleResourceChange($event, 'update')"
        :resource="activeResource"
      />
    </div>
  </div>
</template>

<script>
import ResourceSearch from "@/components/ResourceSearch";
import ResourceList from "@/components/ResourceList";
import ResourceUpdate from "@/components/ResourceUpdate";
import ResourceDetail from "@/components/ResourceDetail";
import ResourceDelete from "@/components/ResourceDelete";
import useResources from "@/composition/useResources";
import SettingsModal from "@/components/SettingsModal";
export default {
  components: {
    ResourceSearch,
    ResourceList,
    ResourceUpdate,
    ResourceDetail,
    ResourceDelete,
    SettingsModal,
  },
  data() {
    return {
      isDetailView: true,
      selectedResource: null,
    };
  },
  setup() {
    return { ...useResources() };
  },
  computed: {
    toggleBtnClass() {
      return this.isDetailView ? "btn-warning" : "btn-primary";
    },
    activeResource() {
      return (
        this.selectedResource ||
        (this.hasResources && this.resources[0]) ||
        null
      );
    },
  },
  methods: {
    toggleView() {
      this.isDetailView = !this.isDetailView;
    },
    selectResource(selectedResource) {
      this.selectedResource = selectedResource;
    },
    async handleSearch(title) {
      this.setSearchQuery(title);
      this.selectedResource = null;
    },
    handleResourceChange(newResource, operation) {
      this.hydrateResources(newResource, operation);
      const resourceToSelect =
        operation === "update" ? newResource : this.resources[0] || null;
      this.selectResource(resourceToSelect);
    },
  },
};
</script>
