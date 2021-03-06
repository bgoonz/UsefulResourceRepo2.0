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
"""Traversing Python modules and classes."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import inspect
import sys

__all__ = ["traverse"]


def _traverse_internal(root, visit, stack, path):
    """Internal helper for traverse."""
    new_stack = stack + [root]

    # Only traverse modules and classes
    if not inspect.isclass(root) and not inspect.ismodule(root):
        return

    try:
        if inspect.ismodule(root) and hasattr(root, "__all__"):
            children = [
                (name, getattr(root, name))
                for name in root.__all__
                if hasattr(root, name)
            ]
        else:
            children = inspect.getmembers(root)
    except ImportError:
        # On some Python installations, some modules do not support enumerating
        # members (six in particular), leading to import errors.
        children = []

    # filter out 'builtin' modules
    filtered_children = []
    for name, child in children:
        # Do not descend into built-in modules
        if inspect.ismodule(child) and child.__name__ in sys.builtin_module_names:
            continue

        if any(child is item for item in new_stack):  # `in`, but using `is`
            continue

        filtered_children.append((name, child))

    children = filtered_children

    visit(path, root, children)

    for name, child in children:
        # Break cycles
        child_path = path + (name,)
        _traverse_internal(child, visit, new_stack, child_path)


def traverse(root, visit, root_name):
    """Recursively enumerate all members of `root`.

  Similar to the Python library function `os.path.walk`.

  Traverses the tree of Python objects starting with `root`, depth first.
  Parent-child relationships in the tree are defined by membership in modules or
  classes. The function `visit` is called with arguments
  `(path, parent, children)` for each module or class `parent` found in the tree
  of python objects starting with `root`. `path` is a string containing the name
  with which `parent` is reachable from the current context. For example, if
  `root` is a local class called `X` which contains a class `Y`, `visit` will be
  called with `('Y', X.Y, children)`).

  If `root` is not a module or class, `visit` is never called. `traverse`
  never descends into built-in modules.

  `children`, a list of `(name, object)` pairs are determined by
  `inspect.getmembers`. To avoid visiting parts of the tree, `children` can
  be modified in place, using `del` or slice assignment.

  Cycles (determined by reference equality, `is`) stop the traversal. A stack of
  objects is kept to find cycles. Objects forming cycles may appear in
  `children`, but `visit` will not be called with any object as `parent` which
  is already in the stack.

  Traversing system modules can take a long time, it is advisable to pass a
  `visit` callable which blacklists such modules.

  Args:
    root: A python object with which to start the traversal.
    visit: A function taking arguments `(path, parent, children)`. Will be
      called for each object found in the traversal.
    root_name: The short-name of the root module.
  """
    _traverse_internal(root, visit, [], (root_name,))
