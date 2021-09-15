export function getFinalAriaDescribedBy(
  controlDescribedBy?: string,
  ariaDescribedBy?: string
) {
  return (
    [controlDescribedBy, ariaDescribedBy]
      .filter(describedBy => describedBy)
      .join(` `) || undefined
  )
}

export function getHintId(fieldId: string) {
  return `${fieldId}__hint`
}

export function getErrorId(fieldId: string) {
  return `${fieldId}__error`
}
