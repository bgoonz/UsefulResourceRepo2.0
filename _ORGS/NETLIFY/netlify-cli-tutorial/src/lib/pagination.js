export function getPagination(response) {
  var links = response.headers.get('Link');
  var pagination = {};
  var link, url, rel, m, page;
  if (links == null) {
    return null;
  }
  links = links.split(',');

  for (var i = 0, len = links.length; i < len; i++) {
    link = links[i].replace(/(^\s*|\s*$)/, '');
    [url, rel] = link.split(';');
    m = url.match(/page=(\d+)/);
    page = m && parseInt(m[1], 10);
    if (rel.match(/last/)) {
      pagination.last = page;
    } else if (rel.match(/next/)) {
      pagination.next = page;
    } else if (rel.match(/prev/)) {
      pagination.prev = page;
    } else if (rel.match(/first/)) {
      pagination.first = page;
    }
  }

  pagination.last = Math.max(pagination.last || 0, (pagination.prev && pagination.prev + 1) || 0);
  pagination.current = pagination.next ? pagination.next - 1 : pagination.last || 1;

  return pagination;
}
