"""
Module for prompting for and reading user input.

This module provides different methods to prompt for and read user input.  It
is useful when writing interactive python programs.  All methods support an
optional timeout value, to limit the time waiting for user input.

"""
from __future__ import print_function

__copyright__ = "Copyright 2010, Andrew Gillis"
__license__ = "http://www.opensource.org/licenses/mit-license.php"


from select import select
import sys


def timed_input(prompt, timeout):
    """Wait for user input, or timeout.

    Arguments:
    prompt  -- String to present to user.
    timeout -- Seconds to wait for input before returning None.

    Return:
    User input string.  Empty string is user only gave Enter key input.
    None for timeout.

    """
    sys.stdout.write('(waiting %d seconds) ' % (int(timeout),))
    sys.stdout.write(prompt)
    sys.stdout.flush()
    rlist, wlist, xlist = select([sys.stdin], [], [], timeout)
    if rlist:
        return sys.stdin.readline().strip()
    print()
    return None


def confirm(prompt, default=None, timeout=None):
    """Ask user to answer y or n to the prompt.

    If a timeout value is given, and this time in seconds is exceeded while
    waiting for input, then return the default value.  If no timeout given,
    then continue prompting until acceptable input is given.

    Arguments:
    prompt  -- String to present to user.
    default -- Default answer.  If None, then user must supply y or n answer.
               If True or False, the default to y or n respectively if empty
               answer given.
    timeout -- Optional.  Seconds to wait for input until timeout.

    Return:
    True if user answers y, False if n.

    """
    if default is None:
        default_yn = 'y/n'
    elif default:
        default_yn = 'Y/n'
    else:
        default_yn = 'y/N'
    prompt = '%s (%s): ' % (prompt, default_yn)

    confirmed = None
    while confirmed is None:
        if timeout:
            yn = timed_input(prompt, timeout)
            if yn is None:
                confirmed = default
                break
            # No timeout after any user input.
            timeout = None
        else:
            yn = raw_input(prompt)
        if yn:
            yn = yn.lower()
            if yn in ('y', 'yes'):
                confirmed = True
            elif yn in ('n', 'no'):
                confirmed = False
        elif default is not None:
            confirmed = default

    return confirmed


def ask_input(prompt, default=None, timeout=None):
    """Prompt for input and read line of input.

    Prompt the user for input and read the user input.  If the caller provides
    a default response message, the 'default' param, this message is displayed
    in square brackets as part of the prompt.  If the user gives an empty
    response, the the default response message is used as the user input.

    If a timeout value is given, and this time in seconds is exceeded while
    waiting for input, then return the default value.  If no timeout given,
    then continue prompting until acceptable input is given.

    Arguments:
    prompt  -- User prompt message.
    default -- Optional.  Default user response.
    timeout -- Optional.  Seconds to wait for input until timeout.

    Return:
    String containing user input.

    """
    if default:
        prompt = '%s [%s]: ' % (prompt, default)
    else:
        prompt = prompt + ': '

    if timeout:
        answer = timed_input(prompt, timeout)
    else:
        answer = raw_input(prompt)
    if default is not None and not answer:
        answer = default

    return answer


def choose(prompt, choices, default=None, timeout=None):
    """Prompt user make a selection from a list of choices.

    If a default choice number if given, then the default choice is displayed
    in square brackets as part of the prompt.  If the user supplies an empty
    choice, then the default value is used as the user's choice.  If no default
    is give, then the user is forced to provide a valid choice.

    If a timeout value is given, and this time in seconds is exceeded while
    waiting for input, then return the default value.  If no timeout given,
    then continue prompting until acceptable input is given.

    prompt  -- User prompt message (displayed at end of menu).
    choices -- List of strings, each element describing choice.
    default -- Optional.  Default choice in choices.
    timeout -- Optional.  Seconds to wait for input until timeout.

    Return:
    Index into choices specifying which element chosen by user.

    """
    if default is not None and default in choices:
        prompt = '%s [%s]: ' % (prompt, default)
    else:
        prompt = prompt + ': '
        default = None

    # Prompt and read input, coninue until valid input given.
    answer = None
    while answer is None:
        for ch in choices:
            print(ch)

        if timeout:
            choice = timed_input(prompt, timeout)
            if choice is None:
                return default
            # No timeout after any user input.
            timeout = None
        else:
            choice = raw_input(prompt)

        if choice:
            if choice in choices:
                answer = choice
        elif default is not None:
            answer = default

    return answer


def choose_number(prompt, choices, default=None, timeout=None):
    """Prompt user make a selection from a list of numbered choices.

    If a default choice number if given, then this value is displayed in square
    brackets as part of the prompt.  If the user supplies an empty choice, then
    the default value is used as the user's choice.  If no default is give,
    then the user is forced to provide a valid choice.

    If a timeout value is given, and this time in seconds is exceeded while
    waiting for input, then return the default value.  If no timeout given,
    then continue prompting until acceptable input is given.

    Arguments:
    prompt  -- User prompt message (displayed at end of menu).
    choices -- List of strings, each element describing choice.
    default -- Optional.  Default choice number.
    timeout -- Optional.  Seconds to wait for input until timeout.

    Return:
    Index into choices specifying which element chosen by user.

    """
    if default is not None and choices[default] in choices:
        prompt = '%s [%d]: ' % (prompt, default)
    else:
        prompt = prompt + ': '
        default = None

    good_range = xrange(len(choices))

    # Prompt and read input, coninue until valid input given.
    answer = None
    while answer is None:
        for i, ch in enumerate(choices):
            print('[%s] %s' % (i, ch))

        if timeout:
            choice = timed_input(prompt, timeout)
            if choice is None:
                return default
            # No timeout after any user input.
            timeout = None
        else:
            choice = raw_input(prompt)

        if choice:
            if choice.isdigit() and int(choice) in good_range:
                answer = int(choice)
        elif default is not None:
            answer = default

    return answer


if __name__ == '__main__':
    # Run this module as a script to see how the user input methods work.
    v = ask_input('Enter something')
    print('You entered:', v)

    print()
    v = ask_input('Enter something', None, 5)
    print('You entered:', v)

    print()
    v = confirm('Do you like this', True)
    print('You entered:', v)

    print()
    v = confirm('Do you like this', None, 5)
    print('You entered:', v)

    print()
    v = confirm('Do you still like this', False, 5)
    print('You entered:', v)

    c = ['foo', 'bar', 'baz']
    print()
    v = choose('Make a choice', c, c[0], 5)
    print('You entered:', v)

    print()
    v = choose_number('Choice a number', c, 1, 5)
    print('You entered: %s (%s)' % (v, c[v]))
