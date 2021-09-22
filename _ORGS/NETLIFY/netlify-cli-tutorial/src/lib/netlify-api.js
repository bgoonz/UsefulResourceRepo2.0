import { getPagination } from './pagination';

const API_ROOT = 'https://api.netlify.com/api/v1';
const SITE_DOMAIN = 'netlify.com';
const PER_PAGE = 10;

export default class NetlifyApi {
  constructor(options) {
    this.token = options['accessToken'];
    this.root = options['apiBase'] || API_ROOT;
    this.siteDomain = options['siteDomain'] || SITE_DOMAIN;
  }

  headers(headers = {}) {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...headers
    };
  }

  request(path, options = {}) {
    return fetch(this.root + path, {...options, headers: this.headers(options.headers || {})})
      .then((response) =>
        response.json().then((json) => ({ json, response }))
      ).then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        const pagination = getPagination(response);

        return {
          data: json,
          pagination
        };
      });
  }

  site(id) {
    return this.request(`/sites/${id}`);
  }

  sites({ page, per_page, guest }) {
    let path = `/sites?page=${page || 1}&per_page=${per_page || PER_PAGE}`;
    if (guest) {
      path = path + '&guest=true';
    }
    return this.request(path);
  }

  build(id) {
    return this.request(`/deploys/${id}`);
  }

  builds(siteId, { page, per_page }) {
    const path = `/sites/${siteId}/deploys?page=${page}&per_page=${per_page || PER_PAGE}`;
    return this.request(path);
  }

  publishBuild(id) {
    const path = `/deploys/${id}/restore`;
    return this.request(path, {method: 'POST'});
  }

  createDeployKey() {
    return this.request('/deploy_keys', {method: 'POST'});
  }

  createSite(attributes = {}) {
    return this.request('/sites', {method: 'POST', body: JSON.stringify(attributes)});
  }

  createDeploy(siteId, attributes = {}) {
    return this.request(`/sites/${siteId}/deploys`, {method: 'POST', body: JSON.stringify(attributes)});
  }

  updateSite(id, updates) {
    return this.request(`/sites/${id}`, {method: 'PUT', body: JSON.stringify(updates)});
  }

  uploadFile(deployId, path, content) {
    return this.request(`/deploys/${deployId}/files${path}`, {
      method: 'PUT', body: content, headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
  }
}
