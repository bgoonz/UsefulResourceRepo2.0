const replace = async (input, regex, replacer) => {
  // we need to remove the 'g' flag, if defined, so that all replacements can be made
  let flags = (regex.flags || '').replace('g', '');
  let re = new RegExp(regex.source || regex, flags);
  let index = 0;
  let match;

  while ((match = re.exec(input.slice(index)))) {
    let value = await replacer(...match);
    index += match.index;
    input = input.slice(0, index) + value + input.slice(index + match[0].length);
    index += match[0].length;

    // if 'g' was not defined on flags, break
    if (flags === regex.flags) {
      break;
    }
  }

  return input;
};