# Copyright 2015 The TensorFlow Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""Tests for tensorflow.tools.common.public_api."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from absl.testing import absltest
from tensorflow_docs.api_generator import public_api


class PublicApiTest(absltest.TestCase):
    class TestVisitor(object):
        def __init__(self):
            self.symbols = set()
            self.last_parent = None
            self.last_children = None

        def __call__(self, path, parent, children):
            self.symbols.add(path)
            self.last_parent = parent
            self.last_children = list(children)  # Make a copy to preserve state.

    def test_call_forward(self):
        visitor = self.TestVisitor()
        children = [("name1", "thing1"), ("name2", "thing2")]

        api_visitor = public_api.PublicAPIVisitor(visitor, base_dir="/")
        api_visitor(("tf", "test"), "dummy", children)

        self.assertEqual(set([("tf", "test")]), visitor.symbols)
        self.assertEqual("dummy", visitor.last_parent)
        self.assertEqual(
            [("name1", "thing1"), ("name2", "thing2")], visitor.last_children
        )

    def test_private_child_removal(self):
        visitor = self.TestVisitor()
        children = [("name1", "thing1"), ("_name2", "thing2")]
        api_visitor = public_api.PublicAPIVisitor(visitor, base_dir="/")
        api_visitor(("tf", "test"), "dummy", children)

        # Make sure the private symbols are removed before the visitor is called.
        self.assertEqual([("name1", "thing1")], visitor.last_children)
        self.assertEqual([("name1", "thing1")], children)

    def test_no_descent_child_removal(self):
        visitor = self.TestVisitor()
        children = [("name1", "thing1"), ("name2", "thing2")]

        api_visitor = public_api.PublicAPIVisitor(
            visitor, base_dir="/", do_not_descend_map={"tf.test": ["mock"]}
        )

        api_visitor(("tf", "test", "mock"), "dummy", children)

        # Make sure not-to-be-descended-into symbols's children are removed.
        self.assertEqual([], visitor.last_children)
        self.assertEqual([], children)

    def test_private_map_child_removal(self):
        visitor = self.TestVisitor()
        children = [("name1", "thing1"), ("mock", "thing2")]

        api_visitor = public_api.PublicAPIVisitor(
            visitor, base_dir="/", private_map={"tf.test": ["mock"]}
        )

        api_visitor(("tf", "test"), "dummy", children)
        # Make sure private aliases are removed.
        self.assertEqual([("name1", "thing1")], visitor.last_children)
        self.assertEqual([("name1", "thing1")], children)


if __name__ == "__main__":
    absltest.main()
