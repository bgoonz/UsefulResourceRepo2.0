<script>
import { fetchResources } from "@/actions";
import ResourceDetail from "@/components/ResourceDetail";
import ResourceList from "@/components/ResourceList";
export default {
  components: {
    ResourceDetail,
    ResourceList,
  },
  data() {
    return {
      title: "Your resources",
      selectedResource: null,
      resources: [],
    };
  },
  async created() {
    this.resources = await fetchResources();
  },
  computed: {
    hasResources() {
      return this.resourceCount > 0;
    },
    activeResource() {
      return (
        this.selectedResource ||
        (this.hasResources && this.resources[0]) ||
        null
      );
    },
    resourceCount() {
      return this.resources.length;
    },
  },
  methods: {
    selectResource(resource) {
      this.selectedResource = { ...resource };
    },
  },
};
</script>
