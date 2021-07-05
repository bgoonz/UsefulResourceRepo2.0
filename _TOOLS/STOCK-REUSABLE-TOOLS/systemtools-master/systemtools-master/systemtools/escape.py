"""
Escape and Un-escape strings.

"""


def escape_string(orig_string, esc_chars):
    """Escape specified characters in the given string.

    Encode each occurrenc, in orig_string, of a character specified in
    esc_chars to a specially encoded representation of that character.  The
    backslash '\' character is always escaped, and it is not necessary to
    include it in esc_chars.

    Arguments:
    orig_string -- String to translate plain => escaped characters.
    esc_chars   -- Sequence of plain characters to encode.

    Returns:
    String containing encoded characters.

    """
    if '~' in esc_chars:
        esc_chars = list(esc_chars)
        esc_chars.remove('~')

    orig_string = orig_string.replace('~', '~'+hex(ord('~')))
    for c in esc_chars:
        orig_string = orig_string.replace(c, '~'+hex(ord(c)))
    return orig_string


def unescape_string(orig_string, esc_chars):
    """Un-Escape specified characters in the given string.

    Decode each occurrenc, in orig_string, of the encoded representation of a
    character specified in esc_chars to the plain varsion of that character.
    It is not necessary to include the backslash '\' in esc_chars.

    Arguments:
    orig_string -- String to translate escaped => plain characters.
    esc_chars   -- Sequence of plain characters to decode.

    Returns:
    String containing decoded characters.

    """
    if '~' in esc_chars:
        esc_chars = list(esc_chars)
        esc_chars.remove('~')

    for c in esc_chars:
        orig_string = orig_string.replace('~'+hex(ord(c)), c)
    return orig_string.replace('~'+hex(ord('~')), '~')
