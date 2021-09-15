/**
 * A jscodeshift codemod for replacing import & export paths with their full
 * paths, including extensions. Effectively fixes imports for use as ES modules
 * in Node.js.
 *
 * Copyright Eemeli Aro <eemeli@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted.
 */

const { dirname, relative, resolve, sep } = require('path')

const useFullFilePath = dir => path => {
  const { source } = path.value
  if (source && source.value.startsWith('.')) {
    const absPath = require.resolve(resolve(dir, source.value))
    const relPath = relative(dir, absPath)
    source.value = relPath.startsWith('.') ? relPath : `.${sep}${relPath}`
  }
}

module.exports = function useFullImportFilePaths(fileInfo, api) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const dir = dirname(resolve(fileInfo.path))
  const fix = useFullFilePath(dir)
  for (const d of [
    j.ImportDeclaration,
    j.ExportAllDeclaration,
    j.ExportNamedDeclaration
  ])
    root.find(d).forEach(fix)
  return root.toSource({ quote: 'single' })
}