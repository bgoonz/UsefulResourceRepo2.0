export const parseOptions = (domainOptions) => {
  return domainOptions.map((domainOption) => {
    const domain = typeof domainOption === 'string' ? domainOption : domainOption.domain
    if (!domain) {
      throw new Error(
        `gatsby-plugin-preconnect: cannot parse \`domain\` from ${domainOption}. Expected a string or \`{domain: string}\``
      )
    }

    let crossOrigin = domainOption.crossOrigin === undefined ? true : domainOption.crossOrigin
    if (
      crossOrigin !== false &&
      crossOrigin !== true &&
      crossOrigin !== '' &&
      crossOrigin !== 'anonymous' &&
      crossOrigin !== 'use-credentials'
    ) {
      throw new Error(
        `gatsby-plugin-preconnect: cannot parse \`crossOrigin\` from ${domainOption.crossOrigin}. Expected \`undefined\`, \`\`, \`false\`, \`true\`, \`anonymous\`, or \`use-credentials\`.`
      )
    }

    crossOrigin = crossOrigin === true ? '' : crossOrigin

    return { domain, crossOrigin }
  })
}

export const removeDuplicates = (domainOptions) => {
  return domainOptions.filter((currentDomainOption, i) => {
    for (let j = 0; j < i; j++) {
      if (
        currentDomainOption.crossOrigin === domainOptions[j].crossOrigin &&
        currentDomainOption.domain === domainOptions[j].domain
      ) {
        return false
      }
    }
    return true
  })
}
