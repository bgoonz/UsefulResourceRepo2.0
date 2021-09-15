<template>
  <div class="row">
    <div class="col-md-4 order-md-2 mb-4">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">{{ title }}</span>
        <span class="badge badge-secondary badge-pill">{{
          resourceCount
        }}</span>
      </h4>
      <button
        @click="
          addResource();
          selectedResource = null;
        "
        class="btn btn-sm btn-primary mb-2 mr-2"
      >
        Add Resource
      </button>
      <control-modal />
      <div class="input-group mb-2">
        <input
          @keyup="handleSearch"
          type="text"
          class="form-control"
          placeholder="Some title"
        />
        <div class="input-group-append"></div>
      </div>
      <resource-list
        :resources="resources"
        :activeId="activeResource?._id"
        @on-item-click="selectResource"
      />
    </div>
    <div class="col-md-8 order-md-1">
      <h4 class="mb-3">
        Resource {{ activeResource?._id }}
        <button
          @click="
            removeResource(activeResource);
            selectedResource = null;
          "
          class="btn btn-sm btn-danger mb-2"
        >
          Delete
        </button>
      </h4>
      <teleport to="#teleportContent">
        <div class="teleport-body">I am Teleported!</div>
      </teleport>
      <resource-detail :resource="activeResource" />
    </div>
  </div>
</template>

<script>
import ResourceDetail from "@/components/ResourceDetail";
import ResourceList from "@/components/ResourceList";
import useResources from "@/composition/useResources";
import ControlModal from "@/components/ControlModal";
export default {
  components: {
    ResourceDetail,
    ResourceList,
    ControlModal,
  },
  data() {
    return {
      title: "Your resources",
      selectedResource: null,
    };
  },
  setup() {
    return {
      ...useResources(),
    };
  },
  computed: {
    activeResource() {
      return (
        this.selectedResource ||
        (this.hasResources && this.resources[0]) ||
        null
      );
    },
  },
  methods: {
    selectResource(resource) {
      this.selectedResource = { ...resource };
    },
    handleSearch(e) {
      this.setSearchQuery(e.target.value);
    },
  },
};
</script>
<style>
.teleport-body {
  padding: 20px;
  background-color: #e6e6e6;
  margin: 10px;
}
</style>
