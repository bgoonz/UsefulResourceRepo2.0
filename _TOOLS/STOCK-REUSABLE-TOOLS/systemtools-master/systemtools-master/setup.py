import os, sys
try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

try:
    from distutils.command.build_py import build_py_2to3 as build_py
except ImportError:
    from distutils.command.build_py import build_py


def main():
    setup(
        name='systemtools',
        version= '1.0.2',
        author='Andrew Gillis',
        author_email='gillis.andrewj@gmail.com',
        url='https://github.com/gammazero/systemtools',
        description='systools: System utility modules',
        long_description = 'See https://github.com/gammazero/systemtools#systemtools',
        license='http://www.opensource.org/licenses/mit-license.php',
        platforms=['unix', 'linux', 'cygwin'],
        keywords='system CLI utility',
        classifiers=['Development Status :: 5 - Production/Stable',
                     'Intended Audience :: Developers',
                     'License :: OSI Approved :: MIT License',
                     'Operating System :: POSIX',
                     'Topic :: Software Development :: Libraries',
                     'Topic :: Utilities',
                     'Programming Language :: Python',
                     'Programming Language :: Python :: 2.7',
                     'Programming Language :: Python :: 3'],
        packages=['systemtools'],
        cmdclass = {'build_py': build_py},
        use_2to3=True,
        zip_safe=True,
        )


if __name__ == '__main__':
    main()
