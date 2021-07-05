"""
Unit tests for escape module.

"""

# Uncomment to import from repo instead of site-packages.
import os
import sys
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parentdir)

import escape

ORIG_STRING = "Hello\\wo-rld, \\0x5c it's my b-day."
ESC_CHARS = (',-')


class TestEscape(object):

    def test_escape(self):
        s = str(ORIG_STRING)

        print('Escaping string...')
        print("  Before:", s)
        s = escape.escape_string(s, ESC_CHARS)
        print("  After:", s)

        assert ',' not in s
        assert '-' not in s

        print('\nUnescaping string...')
        print("  Before:", s)
        s = escape.unescape_string(s, ESC_CHARS)
        print("  After:", s)

        assert ',' in s
        assert '-' in s
        assert s == ORIG_STRING

    def test_escape_twice(self):
        s = str(ORIG_STRING)

        print('\nEscaping string twice...')
        print("  Before:", s)
        s = escape.escape_string(s, ESC_CHARS)
        print("  After 1st:", s)
        s = escape.escape_string(s, ESC_CHARS)
        print("  After 2nd:", s)

        assert ',' not in s
        assert '-' not in s

        print('\nUnescaping string twice...')
        print("  Before:", s)
        s = escape.unescape_string(s, ESC_CHARS)
        print("  After 1st:", s)

        assert ',' not in s
        assert '-' not in s

        s = escape.unescape_string(s, ESC_CHARS)
        print("  After 2nd:", s)
        assert ',' in s
        assert '-' in s
        assert s == ORIG_STRING
