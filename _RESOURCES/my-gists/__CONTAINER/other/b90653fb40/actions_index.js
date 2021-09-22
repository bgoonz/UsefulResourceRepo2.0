import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then(async (res) => {
    const result = await res.json();

    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });

export const useGetProjetById = (id) => {
  const { data, error, ...rest } = useSWR(
    id ? `/api/v1/projets/${id}` : null,
    fetcher
  );
  return { data, error, loading: !data && !error, ...rest };
};

export const useGetProjets = () => {
  const { data, error, ...rest } = useSWR("/api/v1/projets", fetcher);
  return { data, error, loading: !data && !error, ...rest };
};
