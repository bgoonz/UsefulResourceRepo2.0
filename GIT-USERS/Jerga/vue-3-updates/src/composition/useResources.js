import { ref, onMounted, computed } from "vue";
import { fetchResources } from "@/actions";
import useSearchResources from "./useSearch";

const generateResource = () => {
  const _id = "_" + Math.random().toString(36).slice(2);
  const type = ["book", "blog", "video"][Math.floor(Math.random() * 3)];
  return {
    _id,
    title: `New Resource - ${_id}`,
    description: `Description - ${_id}`,
    link: "https://eincode.com/blogs/learn-how-to-validate-custom-input-components-with-react-hook-form",
    type,
  };
};

export default function useResources() {
  const resources = ref([]);
  const getResources = async () => (resources.value = await fetchResources());

  onMounted(getResources);

  const resourceCount = computed(() => resources.value.length);
  const hasResources = computed(() => resourceCount.value > 0);

  const { searchedResources, setSearchQuery } = useSearchResources(resources);

  const addResource = () => resources.value.unshift(generateResource());
  const removeResource = (resource) =>
    resources.value.splice(
      resources.value.findIndex((r) => r._id === resource._id),
      1
    );

  return {
    resources: searchedResources,
    addResource,
    removeResource,
    resourceCount,
    hasResources,
    setSearchQuery,
  };
}
