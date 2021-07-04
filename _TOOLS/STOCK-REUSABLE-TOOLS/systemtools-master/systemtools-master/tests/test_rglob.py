"""
Run with pytest.

"""
import pytest

# Uncomment to import from repo instead of site-packages.
import os
import sys
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parentdir)

from systemtools import rglob


class TestFilter(object):

    def test_filter1(self):
        f = rglob.Filter('a/**')
        assert f(r'a/a.b')
        assert f(r'a\a.b')
        assert f(r'a')
        assert not f(r'b')
        assert not f(r'b/a.b')

    def test_filter2(self):
        f = rglob.Filter('a*')
        assert not f(r'a/a.b')
        assert not f(r'a\a.b')
        assert f(r'a')
        assert f(r'abc')
        assert not f(r'b')

    def test_filter3(self):
        f = rglob.Filter('a*/**')
        assert f(r'a/a.b')
        assert f(r'a\a.b')
        assert f(r'a')
        assert f(r'a/b')
        assert f(r'ab')
        assert not f(r'ba')
        assert not f(r'b\a.b')

    def test_filter4(self):
        f = rglob.Filter('a/a*.xml')
        assert f(r'a\a.xml')
        assert f(r'a/a.xml')
        assert f(r'a\ab.xml')
        assert f(r'a/ab.xml')
        assert not f(r'a\a.txt')
        assert not f(r'a/a.txt')

    def test_filter_skip_dir(self):
        dirlist = ['xyz']
        f = rglob.Filter('a/**.xml', dirlist, False)
        assert f(r'a\abc\a.xml')
        assert f(r'a/abc/a.xml')
        assert not f(r'a\xyz\a.xml')
        assert not f(r'a/xyz/a.xml')
        assert not f(r'a\abc\xyz\a.xml')
        assert not f(r'a/abc/xyz/a.xml')
        assert f(r'a\xYz\a.xml')
        assert f(r'a\abc\XyZ\a.xml')
        assert f(r'a/abc/XyZ/a.xml')

    def test_filter_skip_dir_nocase(self):
        dirlist = ['Xyz']
        f = rglob.Filter('a/**.xml', dirlist, True)
        assert f(r'a\abc\a.xml')
        assert f(r'a/abc/a.xml')
        assert not f(r'a\xYz\a.xml')
        assert not f(r'a/xyZ/a.xml')
        assert not f(r'a\abc\XyZ\a.xml')
        assert not f(r'a/abc/XyZ/a.xml')

    def test_invalid_pattern(self):
        with pytest.raises(ValueError):
            f = rglob.Filter('a/***')
