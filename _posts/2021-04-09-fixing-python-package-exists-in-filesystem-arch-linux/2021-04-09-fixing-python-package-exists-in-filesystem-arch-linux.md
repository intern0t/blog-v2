---
layout: post
title:  "Fixing Python package exists in filesystem error in Arch Linux."
author: Prashant Shrestha
date:   2021-04-09 12:03:23 -400
categories: linux
tags: linux pacman yay update arch build filesystem python pip package
words: 2735
---

While trying to update an existing built-from-source package, I ran into many warnings and eventually errors. I use `yay` to build and install packages from source when prebuilt packages are unavailable to install through `pacman`.

The package in context of this post is called `polybar`, specifically, `aur/polybar 3.5.5-1 (+354 11.70)`.

```bash
error: failed to commit transaction (conflicting files)
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/__init__.py exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/__pycache__/__init__.cpython-39.pyc exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/__pycache__/_compat.cpython-39.pyc exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/__pycache__/_constants.cpython-39.pyc exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/__pycache__/_native.cpython-39.pyc exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/_compat.py exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/_constants.py exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/_native.py exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/_speedups.c exists in filesystem
python-markupsafe: /usr/lib/python3.9/site-packages/markupsafe/_speedups.cpython-39-x86_64-linux-gnu.so exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__init__.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/__init__.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/_compat.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/_identifier.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/asyncfilters.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/asyncsupport.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/bccache.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/compiler.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/constants.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/debug.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/defaults.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/environment.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/exceptions.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/ext.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/filters.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/idtracking.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/lexer.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/loaders.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/meta.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/nativetypes.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/nodes.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/optimizer.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/parser.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/runtime.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/sandbox.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/tests.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/utils.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/__pycache__/visitor.cpython-39.pyc exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/_compat.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/_identifier.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/asyncfilters.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/asyncsupport.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/bccache.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/compiler.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/constants.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/debug.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/defaults.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/environment.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/exceptions.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/ext.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/filters.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/idtracking.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/lexer.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/loaders.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/meta.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/nativetypes.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/nodes.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/optimizer.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/parser.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/runtime.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/sandbox.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/tests.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/utils.py exists in filesystem
python-jinja: /usr/lib/python3.9/site-packages/jinja2/visitor.py exists in filesystem
```

... and more errors, those are quite simple though, it simply mentions those packages were not installed in the process of update.

```bash
Errors occurred, no packages were upgraded.
error: target not found: python-pytz
error: target not found: python-babel
error: target not found: python-docutils
error: target not found: python-imagesize
error: target not found: python-markupsafe
error: target not found: python-jinja
error: target not found: python-pygments
error: target not found: python-snowballstemmer
error: target not found: python-sphinx-alabaster-theme
error: target not found: python-sphinxcontrib-applehelp
error: target not found: python-sphinxcontrib-devhelp
error: target not found: python-sphinxcontrib-htmlhelp
error: target not found: python-sphinxcontrib-jsmath
error: target not found: python-sphinxcontrib-qthelp
error: target not found: python-sphinxcontrib-serializinghtml
error: target not found: python-sphinx
exit status 1
```

I tried many different approaches but they left many files in my system without properly removing the links. I ended up overwriting the entire conflicting packages. Utilizing an `--overwrite` flag, I was able to resolve this **"exists in filesystem"** problem.

```bash
yay -Syyu --overwrite '*'
```

:thumbsup: