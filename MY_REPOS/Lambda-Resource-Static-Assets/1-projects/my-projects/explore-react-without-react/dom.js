"use strict";
{
  const VOID_ELEMENTS = new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  Object.assign(self, { df, fc });
  Object.assign(self, { VOID_ELEMENTS, R });

  function df(t) {
    return new DOMParser().parseFromString(
      `<template>${t}</template>`,
      "text/html"
    ).head.firstElementChild.content;
  }

  function fc(t) {
    const article = document.createElement("article");
    article.innerHTML = t;
    return article.firstElementChild;
  }

  function R(parts, ...vals) {
    parts = Array.from(parts);
    vals = vals.map((v) =>
      typeof v == "object" ? escape(JSON.stringify(v)) : v
    );
    let str = "";
    while (parts.length > 1) {
      str += parts.shift();
      str += vals.shift();
    }
    str += parts.shift();
    return str;
  }
}
