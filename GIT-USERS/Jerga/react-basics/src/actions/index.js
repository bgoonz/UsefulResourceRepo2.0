import axios from "axios";
import { useState, useEffect, useCallback } from "react";

function getResources() {
  return axios.get("/api/resources").then((res) => res.data);
}

export function searchResourcesApi(title) {
  return axios.get(`/api/resources/s/${title}`).then((res) => res.data);
}

function getResourceById(resourceId) {
  return axios.get(`/api/resources/${resourceId}`).then((res) => res.data);
}

export function useGetResource(id) {
  const [resource, setResource] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const _getResource = async () => {
      try {
        const _resources = await getResourceById(id);
        setResource(_resources);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };

    _getResource();
  }, [id]);

  return { resource, loading, error };
}

export function useGetResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const _getResources = useCallback(async () => {
    const _resources = await getResources();
    setResources(_resources);
    setLoading(false);
  }, []);

  const refetchResources = () => {
    setLoading(true);
    _getResources();
  };

  useEffect(() => {
    _getResources();
  }, [_getResources]);

  return { resources, setResources, refetchResources, loading };
}

export function updateResourceApi(resourceId, resourceData) {
  return axios
    .patch(`/api/resources/${resourceId}`, resourceData)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err?.response?.data));
}

export function deleteResourceApi(resourceId) {
  return axios.delete(`/api/resources/${resourceId}`).then((res) => res.data);
}

export function createResourceApi(resource) {
  return axios
    .post(`/api/resources`, resource)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err?.response?.data));
}
