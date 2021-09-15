---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
test: "net"
---

Hello There
Guys

{{ range first 10 ( where .Site.RegularPages "Type" "blogs" ) }}

- {{ .Title }}
  {{ end }}

---

.Site.RegularPages
a shortcut to the regular page collection. .Site.RegularPages is equivalent to where .Site.Pages "Kind" "page". See .Site.Pages.

---

{{ range first 10 (.Site.RegularPages) }}

- {{ .Title }}
  {{ end }}
