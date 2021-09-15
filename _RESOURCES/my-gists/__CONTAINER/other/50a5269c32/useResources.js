import { ref, onMounted, computed } from "vue";
import { fetchResources } from "@/actions";

export default function useResources() {
  const resources = ref([]);
  const getResources = async () => (resources.value = await fetchResources());

  onMounted(getResources);

  const resourceCount = computed(() => resources.value.length);
  const hasResources = computed(() => resourceCount.value > 0);

  return {
    resources,
    resourceCount,
    hasResources,
  };
}
