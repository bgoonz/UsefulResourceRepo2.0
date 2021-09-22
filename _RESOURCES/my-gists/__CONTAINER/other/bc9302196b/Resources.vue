<script>
import ResourceDetail from "@/components/ResourceDetail";
import ResourceList from "@/components/ResourceList";
import useResources from "@/composition/useResources";
export default {
  components: {
    ResourceDetail,
    ResourceList,
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
  },
};
</script>
