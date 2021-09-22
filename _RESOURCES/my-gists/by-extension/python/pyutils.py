#!/usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" My not-too-naive answer to https://github.com/dutc/battlegame

Server part!

I am mainly trying to write fun and "Pythonic" Python, rather than trying to solve the questions.

- Author: Lilian Besson, (C) 2018.
- Online: https://bitbucket.org/lbesson/bin/src/master/battleserver.py
- License: MIT License (http://lbesson.mit-license.org).
"""
__author__ = "Lilian Besson"
__name_of_app__ = "Battle Server"
__version__ = "0.1"

import sys
from string import ascii_uppercase
from collections import OrderedDict
from pprint import pprint
from docopt import docopt
import numpy as np


# --- Ships

DEFAULT_X = DEFAULT_Y = 5

ships = OrderedDict({
    "Carrier": 5,
    "Battleship": 4,
    "cRuiser": 3,
    "Submarine": 3,
    "Destroyer": 2,
})
max_length = max(l for l in ships.values())

symbol_of_ship = OrderedDict({
    name: str.lower(list(set(name).intersection(ascii_uppercase))[0])
    for name in ships.keys()
})
ship_of_symbol = OrderedDict({v: k for k, v in symbol_of_ship.items()})


# --- Documentation

documentation = f"""{__name_of_app__}.

Usage:
    battleserver.py {' '.join([f'[--{name.lower()}=<x,y,dir>]' for name in ships.keys()])} [--random] [--size=<xy>] (--show | --play)
    battleserver.py (-h | --help)
    battleserver.py --version

Options:
    -h --help       Show this screen.
    --version       Show version.
    --show          Print the board.
    --play          Let you play a "one player" game interactively.
    --size=<xy>     Set size of the board [default: {DEFAULT_X},{DEFAULT_Y}].
    --random        Set every ship to a random position.
    {'    '.join([f'--{name.lower()}=<x,y,dir>     Place ship {name} at position x,y and direction (h or v) [default: {i+1},1,h].' for i, name in enumerate(list(ships.keys()))])}
""".replace(',h].', ',h].\n')


symbol_of_uint8 = OrderedDict({0: '-'})
symbol_of_uint8.update({
    i+1: symbol_of_ship[name]
    for i, name in enumerate(ships.keys())
})
uint8_of_symbol = OrderedDict({v: k for k, v in symbol_of_uint8.items()})


class Board(object):
    def __init__(self, x=DEFAULT_X, y=DEFAULT_Y):
        self.x = y
        self.y = x
        self.board = np.zeros((x, y), dtype=np.uint8)

    def __getitem__(self, *args, **kwargs): return self.board.__getitem__(*args, **kwargs)
    def __setitem__(self, *args, **kwargs): return self.board.__setitem__(*args, **kwargs)

    def is_empty(self):
        return np.all(self.board == 0)

    def get_ship(self, x, y):
        return ship_of_symbol[symbol_of_uint8[self[x, y]]]

    def ship_still_here(self, ship):
        return np.any(self.board == uint8_of_symbol[symbol_of_ship[ship]])

    def show(self):
        for line in self.board:
            print(''.join(symbol_of_uint8[c] for c in line))

    def add_ship(self, name, x=0, y=0, direction='h', debug=True):
        size = ships[name]
        # I store things in a "matrix" approach, not human coordinate
        horizontally = (direction == 'v')
        x, y = y, x
        if horizontally:
            if x + size > self.x:
                if debug: print(f"Unable to place ship '{name}' of size {size} at position {x}, {y} horizontally... ({x + size} > {self.x})")
                return 1
            if not set(self.board[x:x+size, y]) == {0}:
                if debug: print(f"Unable to place ship '{name}' at position {x}, {y} horizontally: line from {x} to {x+size} is not empty!")
                return 3
            self.board[x:x+size, y] = uint8_of_symbol[symbol_of_ship[name]]
        else:
            if y + size > self.y:
                if debug: print(f"Unable to place ship '{name}' of size {size} at position {x}, {y} vertically... ({x + size} > {self.x})")
                return 2
            if not set(self.board[x, y:y+size]) == {0}:
                if debug: print(f"Unable to place ship '{name}' at position {x}, {y} vertically: row from {y} to {y+size} is not empty!")
                return 4
            self.board[x, y:y+size] = uint8_of_symbol[symbol_of_ship[name]]
        return 0

    def random_add_ship(self, name, maxTrials=100):
        size = ships[name]
        trial = -1
        retcode = 10
        while trial < maxTrials and retcode > 0:
            retcode = self.add_ship(name, x=np.random.randint(self.x - size + 1), y=np.random.randint(self.y - size + 1), direction=np.random.choice(['h', 'v']), debug=False)
            trial += 1
        return retcode

    def play(self, cheat=False, max_nb_moves=None):
        seen_x_y = set()
        nb_moves = -1
        if max_nb_moves is None: max_nb_moves = self.x * self.y
        while nb_moves < max_nb_moves:
            nb_moves += 1
            if cheat: self.show()
            try:
                action = input("> ") if cheat else input("")
                if self.is_empty():
                    print(f"you win! in {nb_moves} moves")
                if action == '': return
                x, y = [int(i)-1 for i in action.replace(',', ' ').split(' ')]
                if (x, y) in seen_x_y:
                    print("already played")
                seen_x_y.add((x, y))
                if self[x, y] == 0:
                    print("miss")
                else:
                    ship = self.get_ship(x, y)
                    self[x, y] = 0
                    if self.ship_still_here(ship):
                        print(f"hit {ship.lower()}")
                    else:
                        print(f"sunk {ship.lower()}")
                # if self.is_empty():
                #     print(f"you win! in {nb_moves} moves")
                #     return 0
            except ValueError:
                pass
            except (EOFError, KeyboardInterrupt):
                return 2
        return 1


def main(args):
    # pprint(args)  # DEBUG
    sizex, sizey = [int(i) for i in args['--size'].split(',')]
    if min(sizex, sizey) < max_length:
        print(f"Error: <xy> both must be >= {max_length}.")
        return 1
    board = Board(x=sizex, y=sizey)
    for name in ships.keys():
        if args[f'--{name.lower()}']:
            if args[f'--{name.lower()}'] == 'r' or args['--random']:
                board.random_add_ship(name)
            else:
                x, y, direction = args[f'--{name.lower()}'].split(',')
                board.add_ship(name, x=int(x)-1, y=int(y)-1, direction=direction)
    if args['--show']:
        return board.show()
    elif args['--play']:
        return board.play()


if __name__ == '__main__':
    arguments = docopt(documentation, version=f"{__name_of_app__} v{__version__}")
    sys.exit(main(arguments))

#!/usr/bin/env python

# BibTeX bibliography beautifier.
#
# Author: David Pal <davidko.pal@gmail.com>
# Date: 2013, 2014, 2015
#
# Usage:
#
#   bibliography.py input.bib
#
# The script prints the formatted version on the console.
# To redirect into a file, use:
#
#   bibliography.py input.bib > output.bib

import re
import string
import sys

entry_types= {
               'article'       : 'Article',
               'book'          : 'Book',
               'booklet'       : 'Booklet',
               # 'Conference' is the same as 'InProceedings'
               'conference'    : 'InProceedings',
               'inbook'        : 'InBook',
               'incollection'  : 'InCollection',
               'inproceedings' : 'InProceedings',
               'manual'        : 'Manual',
               'mastersthesis' : 'MastersThesis',
               'misc'          : 'Misc',
               'phdthesis'     : 'PhDThesis',
               'proceedings'   : 'Proceedings',
               'techreport'    : 'TechReport',
               'unpublished'   : 'Unpublished',
               'string'        : 'String',
             }

months = {
                'jan'  :  'January',
                'feb'  :  'February',
                'mar'  :  'March',
                'apr'  :  'April',
                'may'  :  'May',
                'jun'  :  'June',
                'jul'  :  'July',
                'aug'  :  'August',
                'sep'  :  'September',
                'oct'  :  'October',
                'nov'  :  'November',
                'dec'  :  'December',
         }

def Format(text):
	return ' '.join(text.split())

def Capitalize(text):
	word_start = True
	s = ''
	for c in text.lower():
		if word_start:
			c = c.upper()
		word_start = not c.isalpha()
		s = s + c
	return s

def FindMatchingParenthesis(text):
	nesting = 1
	end = 0
	for i in range(1, len(text)):
		if text[i] == '{':
			nesting = nesting + 1
		elif text[i] == '}':
			nesting = nesting - 1
		end = i
		if nesting == 0:
			break
	end = end + 1
	return (text[:end], text[end:])

def RemoveBraces(text):
	if text[0] == '{':
		 text = text[1:]
	if text[-1] == '}':
		 text = text[:-1]
	return text

def NormalizeAuthor(text):
	parts = text.split(',', 1)
	if len(parts) >= 2:
		return parts[1].strip() + ' ' + parts[0].strip()
	return parts[0].strip()

def NormalizeAuthors(text):
	authors = text.split(' and ')
	return ' and '.join([NormalizeAuthor(author) for author in authors])

def NormalizePages(text):
	parts = text.split('--', 1)
	if not '--' in text:
		parts = text.split('-', 1)
	normalized = parts[0].strip()
	if len(parts) >= 2:
		normalized = parts[0].strip() + '--' + parts[1].strip()
	return normalized

def SafeParseInt(text):
	try:
        	return int(text)
	except ValueError:
		return None

def NormalizeYear(text):
	year = SafeParseInt(text)
	if not year:
		return text.strip()
	if (year >= 10) and (year <= 99):
		return str(1900 + year)
	return str(year)

def NormalizeMonth(text):
	prefix = text[:3].lower()
	if prefix in months:
		return months[prefix]
	return text


# An entry object
class Entry(object):
	def __init__(self):
		self.entry_type = 'UNKNOWN'
		self.entry_name = ''
		self.rows = { }

	def ParseFromString(self, text):
		m = re.match('\s*@\s*(\w+)\s*({)\s*', text)
		if not m:
			return None
		self.entry_type = m.group(1)
		self.entry_type = self.NormalizedEntryType()
		text = text[m.end(2):]
		text, rest = FindMatchingParenthesis(text)

		m = re.match('\s*([^\s]+)\s*,\s*', text)
		if m:
			self.entry_name = m.group(1)
			text = text[m.end():]

		while text:
			text = self.ParseRow(text)
		return rest

	def ParseRow(self, text):
		m = re.match('\s*,?\s*([\w-]+)\s*=\s*', text)
		if not m:
			return None
		key = m.group(1)
		if not self.entry_type == 'String':
			key = Capitalize(key)
		text = text[m.end():]

		value = ''
		if text[0] == '{':
			value, rest = FindMatchingParenthesis(text)
			value = RemoveBraces(value)
		elif text[0] == '\"':
			m = re.match('^"([^\"]+)"\s*,?\s*', text)
			value = m.group(1)
			rest = text[m.end():]
		else:
			m = re.match('\s*(\w+)\s*,?\s*', text)
			value = m.group(1)
			rest = text[m.end():]

		self.rows[key] = value.strip()
		return rest

	def NormalizedEntryType(self):
		entry_type = self.entry_type.lower()
		if entry_type in entry_types:
			entry_type = entry_types[entry_type]
		return entry_type

	def ToString(self):
		s = '@' + self.entry_type + '{'
		if self.entry_name:
			s += self.entry_name + ','
		s += '\n'
		keys = sorted(self.rows.keys())
		for key in keys:
			s += + 4*' '
			s += key
			s += max(0, 13-len(key))*' '
			s += ' = '
			value = self.rows[key]
			if (not self.entry_type == 'String'):
				if (key in ['Author', 'Editor']):
					value = NormalizeAuthors(value)
				if (key == 'Pages'):
					value = NormalizePages(value)
				if (key == 'Year'):
					value = NormalizeYear(value)
				if (key == 'Month'):
					value = NormalizeMonth(value)

			s += '{' + Format(value) + '}'
			if self.entry_type != 'String':
				s += ','
			s += '\n'
		return s + '}\n'

	def SortKey(self):
		priorities = {
               		'String'        : -99,
               		'Proceedings'   : 99,
               		'Book'          : 99,
	      	}
		if self.entry_type in priorities:
			return priorities[self.entry_type]
		return 0


def ParseEntries(text):
	entries = []
	while True:
		e = Entry()
		text = e.ParseFromString(text)
		if not text:
			break
		entries.append(e)
	return entries

def SortEntries(entries):
	entries.sort(key=lambda e: e.entry_name)
	entries.sort(key=lambda e: e.entry_type)
	entries.sort(key=lambda e: e.SortKey())
	return entries


def ReadFile():
	lines = []
	with open(sys.argv[1], 'r') as f:
		for line in f:
			if line.strip().startswith('%'):
				print(line.strip())
			else:
				lines.append(line)
	text = '\n'.join(lines)
	return text

# main
def main():
	text = ReadFile()
	entries = ParseEntries(text)
	entries = SortEntries(entries)
	for entry in entries:
		print(entry.ToString())

if __name__ == '__main__':
    main()

#!/usr/bin/env python
# -*- coding: utf-8; mode: python -*-
"""
A minimalist script to print the (ordered) list of Bitbucket repositories for a user :

$ bitbucket_repolist.py pseudo
git_repo1
...
git_repoK

- Date: 29-11-2013.
- Author: Lilian Besson, (C) 2016.
- Online: https://bitbucket.org/lbesson/bin/
- Licence: MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2/3 compatibility !
from json import load
from os import system
from sys import argv

# Read the pseudo from the command line, or use mine.
pseudo = argv[1] if len(argv) > 1 else "lbesson"
jsonfile = "bitbucket_{}.json".format(pseudo)
system("curl --silent https://bitbucket.org/api/1.0/users/" + pseudo + " > " + jsonfile)

b = load(open(jsonfile, 'r'))

# for i in b['repositories']:
#     print(i['slug'])
list_of_repo = sorted([i['slug'] for i in b['repositories']])
for i in list_of_repo:
    print(i)

#! /usr/bin/env python2
# -*- coding: utf-8 -*-
""" Petit script Python pour afficher des graphiques de ses comptes et calculer des intérêts.

- *Date:* 03 January 2019.
- *Author:* Lilian Besson, © 2016-18.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed
import sys
import time
import pickle
import matplotlib.pyplot as plt
import seaborn as sns

if sys.version_info.major == 3:
    try:
        import codecs
        sys.stdout = codecs.getwriter('utf8')(sys.stdout)
    except Exception as e:
        print("Failed to force utf8 for stdout...")

try:
    try:
        from ansicolortags import printc as print
    except ImportError as e:
        print("ansicolortags not available, using regular print.")
        print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")
        raise e
except ImportError:
    try:
        from ANSIColors import printc as print
    except ImportError:
        print("ANSIColors not available, using regular print.")
        print("  You can install it with : 'pip install ANSIColors-balises' (or sudo pip)...")


# Valeurs EMPIRIQUES des taux d'intérêts.
taux2020 = {'CCP' : 0.00,
            'LA'  : 0.73,
            'LEP' : 1.25,  # XXX I don't own a LEP anymore
            'LJ'  : 1.65,  # XXX I don't own a LJ anymore
            'PEA' : 0.00,  # XXX I don't own a PEA anymore
            'PEL' : 2.36,
            'CCP2': 0.00,
            }

path_comptes = "/home/lilian/comptes.pickle"

print("<yellow>Calcul des intérêts, <white>script <u>calc_interets.py<U>:")
try:
    print("Lecture des comptes via le fichier <u>'{}'<U>...".format(path_comptes))
    with open(path_comptes, 'r') as f:
        comptes = pickle.load(f)
except:
    print("Echec de la lecture. Le script va utiliser des valeurs par defaut : 2000.00 dans chaque compte (pour tester).")
    comptes = {'CCP': 2000.00,
               'LA': 2000.00,
               'LEP': 2000.00,
               'LJ': 2000.00,
               'PEA': 2000.00,
               'PEL': 2000.00,
               'CCP2': 2000.00,
               }


type_comptes = list(comptes.keys())


def maximizeWindow():
    """ Experimental function to try to maximize a plot.

    - Tries as well as possible to maximize the figure.
    - Cf. https://stackoverflow.com/q/12439588/
    """
    try:
        figManager = plt.get_current_fig_manager()
        figManager.window.showMaximized()
    except:
        try:
            figManager.frame.Maximize(True)
        except:
            try:
                figManager.window.state('zoomed')  # works fine on Windows!
            except:
                try:
                    figManager.full_screen_toggle()
                except:
                    print("Unable to maximize window...")


# FIXED use a clever color palette, eg http://seaborn.pydata.org/api.html#color-palettes
sns.set(context="talk", style="darkgrid", palette="hls", font="sans-serif", font_scale=1.4)


def palette(nb):
    """ Use a smart palette from seaborn, for nb different things to plot.

    - Ref: http://seaborn.pydata.org/generated/seaborn.hls_palette.html#seaborn.hls_palette
    """
    return sns.hls_palette(nb + 1)[:nb]


def calc_interets(comptes, taux=taux2020):
    """ Calcule une estimation de mes intérêts."""
    interet_fin_annee = sum(comptes[k] * taux[k] / 100.0 for k in type_comptes)
    for k in type_comptes:
        print("Pour mon <blue>compte {:>4}<white>, avec <magenta>{:>10,.2f} €<white>, et un <cyan<taux à <u>{:>4,.2f}%<U><white> {} <green>intérêt ~= {:>6.2f} €<white>.".format(k.upper(), comptes[k], taux[k], '→', comptes[k] * taux[k] / 100.0))
    print("<green>Intérêt estimé pour 2016 : {:.2f} €.<white>".format(interet_fin_annee))
    print("<red>Attention<white> : les vrais intérêts sont calculés toutes les quinzaines, mon estimation n'est pas précise !")
    return interet_fin_annee


def main(comptes, taux=taux2020):
    """ Affiche un beau diagramme camembert montrant la répartition de ses économies. """
    argenttotal = sum(comptes.values())
    interets = sum(round(comptes[k] * taux[k] / 100.0, 3) for k in type_comptes)
    print("Affichage d'un diagrame camembert en cours...")
    valeurs = list(comptes.values())
    print("Valeurs du diagrame : <black>{}<white>".format(valeurs))
    etiquettes = []
    legendes = []
    for k in type_comptes:
        etiquettes.append(u'{} : {} € (à {}% $\\rightarrow$ {} €)'.format(k, comptes[k], taux[k], round(comptes[k] * taux[k] / 100.0, 2)))
        legendes.append(u'{:6} (taux {:5}%)'.format(k, taux[k]))
    print("Étiquettes du diagrame : <black>{}<white>".format(etiquettes))
    explode = [0.05] * len(valeurs)  # Explode the pie chart
    colors = palette(len(valeurs))

    plt.pie(valeurs, labels=etiquettes, explode=explode, colors=colors, labeldistance=1.05, startangle=135)
    plt.legend(legendes, loc='lower right')

    mydate = time.strftime('%d %b %Y', time.localtime())
    # FIXME FUCKING hack because Matplotlib apparently fails to handles utf-8 correctly here...
    mydate2 = mydate.replace('û', 'u').replace('é', 'e')
    mytitle = "Mes comptes (le {}). Total = {:.2f} -> Interets = {:.2f} euros ?".format(mydate2, argenttotal, interets)
    print("Using title: <magenta>{}<white>".format(mytitle))
    mytitle = u"Mes comptes (le {}). Total = {:.2f} € $\\rightarrow$ intérêts = {:.2f} € ?".format(mydate, argenttotal, interets)

    plt.title(mytitle)
    plt.axis('equal')

    maximizeWindow()
    year  = time.strftime('%Y', time.localtime())
    month = time.strftime('%m', time.localtime())
    day   = time.strftime('%d', time.localtime())
    outfile = '/home/lilian/Public/argent_{}-{}_{}.png'.format(day, month, year)

    print("Sauvegarde de ce graphique vers {} en cours...".format(outfile))
    plt.savefig(outfile)
    plt.show()
    try:
        plt.close('all')
        return 0
    except:
        return 1


if __name__ == '__main__':
    print("Commence...")
    calc_interets(comptes=comptes)
    ret = main(comptes=comptes)
    print("Terminé !")
    sys.exit(ret)

# End of calc_interets.py

#!/usr/bin/env python3
# -*- coding: utf8 -*-
"""
Short algorithm to compute the day of the week of any date, given by its year, month and day.
Not so easy to learn and do in your head, but managable.

- Idea from http://www.commandlinefanatic.com/cgi-bin/showarticle.cgi?article=art009
"""

from __future__ import print_function


days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
adjustment = [0, 1, -1, 0, 0, 1, 1, 2, 3, 3, 4, 4]


def day_offset(y, m, d):
    # Add 1 if y > 2000 to account for the fact that 2000 was a leap year.
    year_offset = ( y - 2000 ) + ( ( y - 2000 ) // 4 ) + ( y > 2000 )
    # Account for wrongly computed leap years
    year_offset -= ( y - 2000 ) // 100

    # Add back 1 year if the target year is a leap year but the target day
    # is after the 29th (in other words, the leap day hasn't happened yet).
    if y % 100:
        year_offset += ( y < 2000 ) and not( y % 4 ) and ( m > 2 )
        year_offset -= ( y > 2000 ) and not( y % 4 ) and ( m < 3 )

    # Read month offset from the adjustment table
    # by default each month has 30 days, and the adjument corrects that
    month_offset = ( ( m - 1 ) * 2 ) + adjustment[ m - 1 ]

    # Remove today as we count from 0
    day_offset = d - 1

    return ( year_offset + month_offset + day_offset ) % 7


if __name__ == '__main__':
    import datetime
    from sys import argv
    assert len(argv) >= 4, "Need three arguments: '$ {} y m d'".format(argv[0])
    y, m, d = int(argv[1]), int(argv[2]), int(argv[3])
    offset = day_offset(y, m, d)
    # Saturday, Jan. 1, 2000 is the reference date
    date = ( offset + 5 ) % 7
    import datetime as dt
    today = datetime.datetime.today()
    then = datetime.datetime(y, m, d)
    verb = "will be" if today < then else "was" if today > then else "is"
    print("The date {}/{}/{} {} a {}.".format(d, m, y, verb, days[date]))

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" Check if an IBAN is correct.

Reference:
https://fr.wikipedia.org/wiki/International_Bank_Account_Number#Algorithme_de_v.C3.A9rification_de_l.27IBAN


- *Date:* Wednesday 09 March 2016.
- *Author:* Lilian Besson, (C) 2015-16.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed


def l_to_c(l):
    try:
        return str(int(l))
    except ValueError:
        return str(10 + ord(l.upper()) - ord('A'))


def check_iban(iban):
    print("\nChecking the IBAN number '%s'..." % iban)
    ib = iban.replace(' ', '')
    ib = ib[4:] + ib[:4]
    print("Of length", len(ib))
    i = int(''.join(l_to_c(l) for l in ib))
    check = (i % 97) == 1
    if check:
        print("OK '%s' seems to be a valid IBAN number." % iban)
    else:
        print("[WARNING] NOT OK '%s' seems to NOT be a valid IBAN number!" % iban)
    return check


def main(args):
    try:
        if not args:
            check_iban('HAHA LOL YOU THOUGH I WILL LET A REAL IBAN IN MY SCRIPT')
        else:
            for iban in args:
                check_iban(iban)
        return 0
    except Exception as e:
        print(e)
        return 1


if __name__ == '__main__':
    from sys import argv, exit
    exit(main(argv[1:]))

# End of check_IBAN.py

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" Check if an NIRPP ("numéro de sécurité sociale", in France) is correct.

Reference:
https://fr.wikipedia.org/wiki/Num%C3%A9ro_de_s%C3%A9curit%C3%A9_sociale_en_France#Signification_des_chiffres_du_NIR


- *Date:* Tuesday 01 November 2016.
- *Author:* Lilian Besson, © 2016.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

import subprocess

length_checksum = 2


def l_to_c(l):
    try:
        return str(int(l))
    except ValueError:
        return str(10 + ord(l.upper()) - ord('A'))


def check_nirpp(nirpp, length_checksum=length_checksum):
    print("\nChecking the NIRPP number '%s' ..." % nirpp)
    ib = nirpp.replace(' ', '')
    checksum = int(ib[-length_checksum:])
    ib = ib[:-length_checksum]
    print("  Of length", len(ib))
    num_nirpp = int(''.join(l_to_c(l) for l in ib))
    print("  Of sum num_nirpp =", num_nirpp)
    print("  Of check sum to 97 =", (97 - (num_nirpp % 97)))
    print("  And expected checksum was", checksum)
    check = (97 - (num_nirpp % 97)) == checksum
    if check:
        print("OK '%s' seems to be a valid NIRPP number." % nirpp)
    else:
        print("[WARNING] NOT OK '%s' seems to NOT be a valid NIRPP number!" % nirpp)
    return check


information_nirpp = {
    (0, 1): {
        "meaning": "sexe",
        "mapping": {
            "1": "homme",
            "2": "femme",
            "3": "personne étrangère de sexe masculin en cours d'immatriculation en France",
            "4": "personne étrangère de sexe féminin en cours d'immatriculation en France"
        }
    },
    (1, 2): {
        "meaning": "deux derniers chiffres de l'année de naissance",
        "mapping": {
            # DONE nothing to do for this information
        }
    },
    (3, 2): {
        "meaning": "mois de naissance",
        "mapping": {
            "01": "janvier",
            "02": "février",
            "03": "mars",
            "04": "avril",
            "05": "mai",
            "06": "juin",
            "07": "juillet",
            "08": "août",
            "09": "septembre",
            "10": "octobre",
            "11": "novembre",
            "12": "décembre",
        }
    },
    # Only case A : TODO implement case B and C
    (5, 2): {
        "meaning": "département de naissance métropolitain",
        "mapping": {  # Cf. http://www.insee.fr/fr/methodes/nomenclatures/cog/documentation.asp
            "01": "Ain",
            "02": "Aisne",
            "03": "Allier",
            "04": "Alpes-de-Haute-Provence",
            "05": "Hautes-Alpes",
            "06": "Alpes-Maritimes",
            "07": "Ardèche",
            "08": "Ardennes",
            "09": "Ariège",
            "10": "Aube",
            "11": "Aude",
            "12": "Aveyron",
            "13": "Bouches-du-Rhône",
            "14": "Calvados",
            "15": "Cantal",
            "16": "Charente",
            "17": "Charente-Maritime",
            "18": "Cher",
            "19": "Corrèze",
            "2A": "Corse-du-Sud",
            "2B": "Haute-Corse",
            "21": "Côte-d'Or",
            "22": "Côtes-d'Armor",
            "23": "Creuse",
            "24": "Dordogne",
            "25": "Doubs",
            "26": "Drôme",
            "27": "Eure",
            "28": "Eure-et-Loir",
            "29": "Finistère",
            "30": "Gard",
            "31": "Haute-Garonne",
            "32": "Gers",
            "33": "Gironde",
            "34": "Hérault",
            "35": "Ille-et-Vilaine",
            "36": "Indre",
            "37": "Indre-et-Loire",
            "38": "Isère",
            "39": "Jura",
            "40": "Landes",
            "41": "Loir-et-Cher",
            "42": "Loire",
            "43": "Haute-Loire",
            "44": "Loire-Atlantique",
            "45": "Loiret",
            "46": "Lot",
            "47": "Lot-et-Garonne",
            "48": "Lozère",
            "49": "Maine-et-Loire",
            "50": "Manche",
            "51": "Marne",
            "52": "Haute-Marne",
            "53": "Mayenne",
            "54": "Meurthe-et-Moselle",
            "55": "Meuse",
            "56": "Morbihan",
            "57": "Moselle",
            "58": "Nièvre",
            "59": "Nord",
            "60": "Oise",
            "61": "Orne",
            "62": "Pas-de-Calais",
            "63": "Puy-de-Dôme",
            "64": "Pyrénées-Atlantiques",
            "65": "Hautes-Pyrénées",
            "66": "Pyrénées-Orientales",
            "67": "Bas-Rhin",
            "68": "Haut-Rhin",
            "69": "Rhône",
            "70": "Haute-Saône",
            "71": "Saône-et-Loire",
            "72": "Sarthe",
            "73": "Savoie",
            "74": "Haute-Savoie",
            "75": "Paris",
            "76": "Seine-Maritime",
            "77": "Seine-et-Marne",
            "78": "Yvelines",
            "79": "Deux-Sèvres",
            "80": "Somme",
            "81": "Tarn",
            "82": "Tarn-et-Garonne",
            "83": "Var",
            "84": "Vaucluse",
            "85": "Vendée",
            "86": "Vienne",
            "87": "Haute-Vienne",
            "88": "Vosges",
            "89": "Yonne",
            "90": "Territoire de Belfort",
            "91": "Essonne",
            "92": "Hauts-de-Seine",
            "93": "Seine-Saint-Denis",
            "94": "Val-de-Marne",
            "95": "Val-d'Oise",
            # TODO support these too
            "971": "Guadeloupe",
            "972": "Martinique",
            "973": "Guyane",
            "974": "La Réunion",
            "975": "Saint-Pierre-et-Miquelon",
            "976": "Mayotte",
            "977": "Saint-Barthélemy",
            "978": "Saint-Martin",
            "984": "Terres australes et antarctiques françaises",
            "986": "Wallis-et-Futuna",
            "987": "Polynésie française",
            "988": "Nouvelle-Calédonie",
            "989": "Île de Clipperton"
        }
    },
    (7, 3): {
        "meaning": "code officiel de la commune de naissance",
        "mapping": {  # TODO
        }
    },
    (10, 3): {
        "meaning": "numéro d’ordre de la naissance dans le mois et la commune (ou le pays)",
        "mapping": {
            # DONE nothing to do for this information
        }
    }

}


def pprint_nirpp(nirpp, length_checksum=length_checksum):
    print("\nDisplaying information contained in the NIRPP number '%s' ..." % nirpp)
    ib = nirpp.replace(' ', '')
    ib = ib[:-length_checksum]
    # Printing
    for (i, l) in sorted(information_nirpp):
        n = nirpp[i: i + l]
        info = information_nirpp[(i, l)]
        if n in info["mapping"]:
            explain = "\"{}\"".format(info["mapping"][n])
        else:
            explain = n
        # For towns, durty hack to extract the town from the INSEE database
        if i == 7:
            try:
                # 1st try
                # https://docs.python.org/3/library/subprocess.html#replacing-shell-pipeline
                # args = [
                #     "grep", "--", "',{},{},'".format(
                #         nirpp[5: 5 + 2],
                #         nirpp[7: 7 + 3]
                #     ),
                #     "comsimp2016.txt",
                # ]
                # print("Executing subprocess.Popen to \"{}\"".format(' '.join(args)))
                # p1 = subprocess.Popen(args, stdout=subprocess.PIPE)
                # args = [
                #     "cut", "-d,", "-f10"
                # ]
                # print("Executing subprocess.Popen to \"{}\"".format(' '.join(args)))
                # p2 = subprocess.Popen(args, stdin=p1.stdout, stdout=subprocess.PIPE)
                # p1.stdout.close()  # Allow p1 to receive a SIGPIPE if p2 exits
                # explain = p2.communicate()[0]
                # print("explain =", explain)

                # 2nd try
                args = [
                    "grep", "--", "',{},{},'".format(
                        nirpp[5: 5 + 2],
                        nirpp[7: 7 + 3]
                    ),
                    "/home/lilian/bin/comsimp2016.txt",
                    "|", "cut", "-d,", "-f10"
                ]
                # print("Executing subprocess.check_output to \"{}\"".format(' '.join(args)))
                explain = subprocess.check_output(' '.join(args), shell=True)
                explain = explain[:-1].decode()
                # print("explain =", explain)
                explain = "{} (code {})".format(explain, nirpp[7: 7 + 3])
            except Exception:
                explain = n
        print("- Number '{}' (index {}:{}) means:\n\t\"{}\" : \t{}".format(
            n, i, i + l, info["meaning"], explain)
        )


def main(args):
    try:
        if not args:
            check_nirpp('HAHA LOL YOU THOUGH I WILL LET A REAL NIRPP IN MY SCRIPT')
        else:
            for nirpp in args:
                if check_nirpp(nirpp):
                    pprint_nirpp(nirpp)
        return 0
    except Exception as e:
        print(e)
        return 1


if __name__ == '__main__':
    from sys import argv, exit
    exit(main(argv[1:]))

# End of check_nirpp.py

#!/usr/bin/env python3
# -*- coding:utf8 -*-
"""
A simple Python 3.4+ script to use selenium to download a URL, research a message inside the interpreted web page (with JavaScript support!), and exit with return code 0 if message is found, 1 if message is not found.

- Copyright 2021 Lilian Besson
- License MIT.

Examples
--------
Use it with the Bash script check_site_and_texto_if_changed_selenium.sh

$ check_site_selenium.py "$URL" "$message" "$success"
"""

import sys

try:
    from selenium import webdriver
except ImportError:
    print("selenium module not found")
    print("Install it, see https://selenium-python.readthedocs.io/installation.html")
    from webbrowser import open_new_tab
    open_new_tab("https://selenium-python.readthedocs.io/installation.html")


def main(URL, message, success):
    print(f"Downloading '{URL}'...")
    firefoxOptions = webdriver.FirefoxOptions()
    firefoxOptions.headless = True
    browser = webdriver.Firefox(options=firefoxOptions)

    browser.get(URL)
    source = browser.page_source
    browser.close()

    if message in source:
        print(f"{URL} indique toujours le message recherché :\n\"{message}\"")
        return 0
    else:
        print(f"{URL} n'indique pas le message recherché :\n\"{message}\"\n{success}")
        # !FreeSMS.py f"{URL} semble indiquer qu'il y a des disponibilités désormais."
        # exit 1 to quit the "watch" loop
        return 1


if __name__ == '__main__':
    URL = "https://partners.doctolib.fr/hopital-public/perigueux/vaccination-covid?speciality_id=5494&enable_cookies_consent=1"
    if len(sys.argv) >= 2:
        URL = sys.argv[1]

    message = "ce centre n'a plus de disponibilités"
    if len(sys.argv) >= 3:
        message = sys.argv[2]
        message = message.replace(r"\'", "'")

    success = "Peut être qu'il y a des disponibilités désormais !"
    if len(sys.argv) >= 4:
        success = sys.argv[3]
        success = success.replace(r"\'", "'")

    sys.exit(main(URL, message, success))

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" EXPERIMENTAL Python 3.4+ script to check if a train ticket on https://www.voyages-sncf.com is available or not.

WARNING: this script is only here to play and experiment with it, and demonstrate what robobrowser can do, NOT to be ran really.

Requirement:
- RoboBrowser, https://robobrowser.readthedocs.io, pip install robobrowser


- *Date:* Tuesday 20 November 2018.
- *Author:* Lilian Besson, (C) 2016-2018.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

from robobrowser import RoboBrowser as RB
import re
import json
from sys import exit, argv


# Create and compile now the required regexp
url_finder = re.compile(r'http[^"]*')
query_finder = re.compile(r"data.query = JSON.parse\('\{[^\n]*")
searchResponse_finder = re.compile(r"data.searchResponse = JSON.parse\('\{[^\n]*")


# url0 = "http://www.voyages-sncf.com//vsc/train-ticket/?_LANG=fr&site_country=FR&site_language=fr&ORIGIN_CITY=Toulon&DESTINATION_CITY=Paris%20%28Toutes%20gares%20intramuros%29&OUTWARD_DATE=31/05/2016&OUTWARD_TIME=15&INWARD_DATE=&INWARD_TIME=7&COMFORT_CLASS=2&DISTRIBUTED_COUNTRY=FR&NB_TYPO_ADULT=1&bookingChoice=train&PASSENGER_1=YOUNG&PASSENGER_1_CARD=MI1ST&PASSENGER_1_FID_PROG=&PASSENGER_1FID_NUM_BEGIN=&CODE_PROMO_1=&action:searchTravel=Rechercher"

URL_TEMPLATE = "https://www.voyages-sncf.com/vsc/train-ticket/?_LANG=fr&site_country=FR&site_language=fr&ORIGIN_CITY={ORIGIN_CITY}&DESTINATION_CITY={DESTINATION_CITY}&OUTWARD_DATE={DATE}&OUTWARD_TIME={OUTWARD_TIME}&INWARD_DATE=&INWARD_TIME=7&COMFORT_CLASS=2&DISTRIBUTED_COUNTRY=FR&NB_TYPO_ADULT=1&bookingChoice=train&PASSENGER_1=YOUNG&PASSENGER_1_CARD=MI1ST&PASSENGER_1_FID_PROG=&PASSENGER_1FID_NUM_BEGIN=&CODE_PROMO_1=&action:searchTravel=Rechercher"


# url1 = 'http://www.voyages-sncf.com/vsc/proposals/findProposals?hid='


def main(url, MY_OUTWARD_TIME):
    """ Go to the page 'url', find the next link to got, then extract the JSON query result, find the wanted train, and display the results.
    """
    MY_OUTWARD_TIME = MY_OUTWARD_TIME.replace('h', ':')
    # Create the web browser object
    b = RB(history=True, allow_redirects=True)
    # Open the page
    b.open(url)
    # Find the next page to go
    res = str(b.select('#url_redirect_proposals')[0])
    # # - First solution: manual search
    # offset = 4 + res.index('hid=')
    # length = 3
    # key = res[offset: offset + length]
    # print("key =", key)
    # next_url = url1 + str(key)
    # print("1. Next url =", next_url)
    # - Second solution: search with a regexp
    m = url_finder.search(res)
    next_url = m.string[m.start():m.end()]
    print("Next url =", next_url, "...")
    # Follow this url
    b.open(next_url)
    # Get the data.query part
    script = b.select('#vsc-preloaded-data-snippet')[0]
    content = script.contents[0]
    # 1. Search for the query to display it nicely again
    m = query_finder.search(content)
    jsontext = m.string[m.start():m.end()]
    # print(jsontext)
    beginning = "data.query = JSON.parse('"
    end = "');"
    query = jsontext[len(beginning): -len(end)]
    jsonrawstr = query.replace(r'\"', '"').replace(r'\'', "'")  # \" > ", \' > '
    # print(jsonrawstr)
    jsonobj = json.loads(jsonrawstr)
    print(json.dumps(jsonobj, sort_keys=True, indent=4))
    # 2. Search for the result
    m = searchResponse_finder.search(content)
    jsontext = m.string[m.start():m.end()]
    # print(jsontext)
    beginning = "data.searchResponse = JSON.parse('"
    end = "');"
    searchResponse = jsontext[len(beginning): -len(end)]
    # print(searchResponse)
    jsonrawstr = searchResponse.replace(r'\"', '"').replace(r'\'', "'")  # \" > ", \' > '
    # print(jsonrawstr)
    jsonobj = json.loads(jsonrawstr)
    print(json.dumps(jsonobj, sort_keys=True, indent=4))
    # 3. Affichage des horaires
    print("\nDifferents horaires :")
    horaires = [ i['departureDate'] for i in jsonobj['results'] ]
    for number, h in enumerate(horaires):
        print("Pour un train partant a :", h)
        prices = jsonobj['results'][number]['priceProposals']
        print("Differentes categories :", list(prices.keys()))
        for cat in list(prices.keys()):
            prix = prices[cat]['amount']
            print("\tCategorie", cat, "==> prix", prix, "euros.")
    # 4. Affichages des prix
    longueur_date = len('2016-05-29')
    jour = horaires[0][:longueur_date]
    # FIXED search the list of horaires to find it
    # number = 4
    try:
        montiming = jour + 'T' + MY_OUTWARD_TIME + ':00'
        # FIXME what if the train starts the next day?
        print("Cherche le train partant a l'heure", MY_OUTWARD_TIME)
        print("Date =", montiming)
        number = horaires.index(montiming)
    except:
        print("Aucun train partant a l'heure demandee, je considere le premier de la liste")
        number = 0  # First train
    montrain = jsonobj['results'][number]['priceProposals']
    categories = list(montrain.keys())
    print("\nCategories :", categories)
    if 'FLEX' in categories:
        print("OK je peux le prendre (categorie 'FLEX')")
        prix = montrain['FLEX']['amount']
        print("Prix =", prix, "euros")
        print("URL =", url)
        return 0
    else:
        print("Pas de billet en categorie 'FLUX' disponible ! ... Triste :-( !!")  # XXX keep this 'Triste' part, the bash companion script uses it !
        return 1


if __name__ == '__main__':
    print("TODO: finish this script !")
    # FIXED parse cli argument
    print("Lecture des arguments", argv)
    DATE = argv[1] + '/2018' if len(argv) > 1 and argv[1] else '25/12/2018'
    OUTWARD_TIME = argv[2] if len(argv) > 2 and argv[2] else '12'
    MY_OUTWARD_TIME = argv[3] if len(argv) > 3 and argv[3] else '17:43'  # XXX too specific
    ORIGIN_CITY = argv[4] if len(argv) > 4 and argv[4] else 'Toulon'  # XXX too specific
    # DESTINATION_CITY = argv[5] if len(argv) > 5 and argv[5] else 'Paris'  # XXX too specific
    DESTINATION_CITY = argv[5] if len(argv) > 5 and argv[5] else 'Paris%20%28Toutes%20gares%20intramuros%29'
    print("- Date : ", DATE)
    print("- Heure depart minimale pour la recherche : ", OUTWARD_TIME)
    print("- Heure depart voulue : ", MY_OUTWARD_TIME)
    print("- Ville depart :", ORIGIN_CITY)
    print("- Ville arrivee :", DESTINATION_CITY)
    url = URL_TEMPLATE.format(DATE=DATE, OUTWARD_TIME=OUTWARD_TIME, ORIGIN_CITY=ORIGIN_CITY, DESTINATION_CITY=DESTINATION_CITY)
    print("Utilisant url =", url)
    exit(main(url=url, MY_OUTWARD_TIME=MY_OUTWARD_TIME))

# End of check_voyages-scnf.com

#!/usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" A simple script to check property on prime numbers, as explained in this article https://www.quantamagazine.org/mathematicians-discover-prime-conspiracy-20160313/.

- Author: Lilian Besson, (C) 2018.
- Online: https://bitbucket.org/lbesson/bin/
- Licence: MIT Licence (http://lbesson.mit-license.org).
"""
from sympy import sieve, nextprime



def ends_by_0(p):
    return (p % 10) == 9


def next_ends_by_9(p):
    np = nextprime(p)
    return (np % 10) == 9


def next_ends_by_1(p):
    np = nextprime(p)
    return (np % 10) == 1



def main(maxn):
    primes = sieve
    primes.extend(maxn)
    primes = primes._list
    nb_primes = len(primes)
    print(f"We found {nb_primes} primes smaller or equal than {maxn}...")

    filtered_primes = [ p for p in primes if ends_by_0(p) ]
    nb_filtered_primes = len(filtered_primes)
    print(f"We found {nb_filtered_primes} primes that finishes by 9...")
    rate = float(nb_filtered_primes) / float(nb_primes)
    print(f"That's about {rate:.3%}...")

    primes_satisfying_property = [ p for p in filtered_primes if next_ends_by_9(p) ]
    nb_primes_satisfying_property = len(primes_satisfying_property)
    print(f"\nWe found {nb_primes_satisfying_property} primes that has next primes finishing by 9...")
    second_rate = float(nb_primes_satisfying_property) / float(nb_filtered_primes)
    print(f"That's about {second_rate:.3%}...")

    primes_satisfying_property = [ p for p in filtered_primes if next_ends_by_1(p) ]
    nb_primes_satisfying_property = len(primes_satisfying_property)
    print(f"\nWe found {nb_primes_satisfying_property} primes that has next primes finishing by 1...")
    third_rate = float(nb_primes_satisfying_property) / float(nb_filtered_primes)
    print(f"That's about {third_rate:.3%}...")
    print(f"\n==> which is about {third_rate/second_rate:.3%} more!")

    return 0

if __name__ == '__main__':
    from sys import argv, exit
    maxn = int(argv[1]) if len(argv) > 1 else 1000
    exit(main(maxn))


#!/usr/bin/env python3
"""
http://cedeela.fr/~simon/files/print.py
"""

import cherrypy
import cups
import uuid
import tempfile

HTML_TEMPLATE = """
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html><head><title>Print</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head><body><h1>Print File</h1>
<form action="send" method="POST" enctype="multipart/form-data">
File name: <input name="file" type="file"><br>
User name: <input name="user"><br>
<input name="submit" type="submit">
</form>
</body>
</html>"""


class Print(object):
    @cherrypy.expose
    def index(self):
        return HTML_TEMPLATE

    @cherrypy.expose
    def send(self, file, user, **kwargs):
        try:
            cups.setUser(user)
            conn = cups.Connection()
            job_name = str(uuid.uuid4())
            content = file.file.read()
            with tempfile.NamedTemporaryFile(prefix="tmp_print") as f:
                f.write(content)
                f.flush()
                id = conn.printFile('MFP', f.name, job_name, {})
            msg = "success, job id: {}, job name: {}".format(id, job_name)
        except cups.IPPError as ex:
            status, description = ex
            msg = "IPP status is {}, meaning: {}".format(status, description)
        return msg


cherrypy.config.update({
    'server.socket_host': '0.0.0.0',
    'server.socket_port': 9999})
cherrypy.quickstart(Print())

#! /usr/bin/env python3
# -*- coding: utf-8 -*-
""" A small Python script to download and print statistics on historical weather data.

- *Date:* 18 January 2018.
- *Author:* Lilian Besson, © 2018.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

from os.path import expanduser, join
from datetime import date, timedelta
from dateutil.parser import parse
from datetime import datetime as dt
from json import load, dump

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.dates import DayLocator, HourLocator, DateFormatter

try:
    from darksky import forecast
except ImportError as e:
    print("Install 'darksky' module with 'pip install git+https://github.com/lukaskubis/darkskylib'...")
    raise e


def get_data(location, key, delay=365):
    thisday = date.today()
    oneday = timedelta(days=1)
    alldata = {}
    all_cloud_cover = {}
    for d in range(delay):
        t = thisday.isoformat()
        if 'T' not in t:
            t += 'T12:00:00'
        try:
            with forecast(key, *location, time=t) as weather:
                alldata[thisday] = weather
                all_cloud_cover[thisday] = weather["daily"]["data"][0]["cloudCover"]
                print("For the day", thisday, "the 'cloudCover' index was", all_cloud_cover[thisday])
        except:
                all_cloud_cover[thisday] = np.nan
                print("Missing data for", thisday, "so using a nan... it won't be included in the plots!")
        thisday = thisday - oneday
    return alldata, all_cloud_cover


def save_data(all_cloud_cover, filename):
    new_dict = dict()
    for d, k in all_cloud_cover.items():
        new_dict[d.isoformat()] = k
    with open(filename, "w") as fp:
        dump(new_dict, fp)


def load_data(filename):
    with open(filename, "r") as fp:
        new_dict = load(fp)
        all_cloud_cover = dict()
        for d, k in new_dict.items():
            dt = parse(d.replace('T12:00:00', ''))
            all_cloud_cover[dt] = k
    return all_cloud_cover


def plot_data(all_cloud_cover, name, filename):
    Xs = np.array(list(all_cloud_cover.keys()))
    Ys = np.array(list(all_cloud_cover.values()))

    # Remove day where we couldn't find the data
    are_nans = np.isnan(Ys)
    Xs = Xs[~are_nans]
    Ys = Ys[~are_nans]

    fig, ax = plt.subplots()
    ax.set_title(f"Cloud cover index in {name}")
    ax.set_xlabel("Date")
    ax.set_ylabel("Cloud cover (0 is fully sunny, 1 is fully cloudy)")
    ax.plot_date(Xs, Ys, ms=5, marker='o', color='black')

    ax.fmt_xdata = DateFormatter('%Y-%m-%d')
    fig.autofmt_xdate()

    plt.show()
    plt.savefig(filename)
    print("Figure was saved to", filename)


def plot_data_by_weekday(all_cloud_cover, name, filename):
    count_of_weekday = np.zeros(7)
    data_by_weekday = np.zeros(7)
    mean_by_weekday = np.zeros(7)
    for x, y in all_cloud_cover.items():
        if not np.isnan(y):
            weekday = x.weekday()
            count_of_weekday[weekday] += 1
            data_by_weekday[weekday] += y
            # print("For weekday", weekday, "one more count with cloud_cover =", y)
    for weekday in range(7):
        mean_by_weekday[weekday] = data_by_weekday[weekday] / count_of_weekday[weekday]

    plt.figure()
    plt.title(f"Mean cloud cover index in {name}, in 2017")
    plt.xlabel("Day of the week")
    plt.ylabel("Mean cloud cover (0 is fully sunny, 1 is fully cloudy)")

    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    x = np.arange(7)
    plt.bar(x, mean_by_weekday, color="gold")
    plt.xticks(x, days)
    plt.show()

    plt.savefig(filename)
    print("Figure was saved to", filename)


if __name__ == '__main__':
    # CentraleSupélec, campus of Rennes, France
    name = "CentraleSupélec, Rennes"
    # 48° 6' 36"N, 1° 40' 48"W
    # https://www.google.fr/maps/place/Supélec/@48.1252316,-1.6255899,17z/
    location = 48.1252316, -1.6255899

    # name = "Briançon, France"
    # location = 44.8826142, 6.6285124
    # # https://www.google.fr/maps/place/05100+Briançon/@44.8826142,6.6285124,16z/

    print("For localisation '{}' at location {}...".format(name, location))


    with open(join(expanduser("~"), ".darksky_api.key"), "r") as f:
        key = f.readline()
        print("Using key =", key)

    try:
        print("Trying to load the data from 'all_cloud_cover.json' ...")
        all_cloud_cover = load_data("all_cloud_cover.json")
        print("Success in loading the data from 'all_cloud_cover.json' ...")
    except:
        print("Failed to load the data from 'all_cloud_cover.json' ...")
        print("Using API to download data...")
        print(input("Enter to continue"))
        alldata, all_cloud_cover = get_data(location, key)
        print("Trying to save the data from 'all_cloud_cover.json' ...")
        save_data(all_cloud_cover, "all_cloud_cover.json")
        print("Success in saving the data from 'all_cloud_cover.json' ...")

    plot_data(all_cloud_cover, name, "all_cloud_cover.png")
    plot_data_by_weekday(all_cloud_cover, name, "cloud_cover_by_weekday.png")
    print("Done...")

#!/usr/bin/env python
# -*- coding: utf-8; mode: python -*-
"""
A minimalist script to select a color with the GTK ColorSelectionDialog tool.
The selected color is returned (printed) on the consol.

- Date: 02-06-2016
- Author: Lilian Besson, (C) 2016.
- Online: https://bitbucket.org/lbesson/bin/
- Licence: MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2/3 compatibility !

from gi.repository import Gtk
import sys

if __name__ == '__main__':
    color_sel = Gtk.ColorSelectionDialog("GTK Color Picker (color-picker.py)")

    if len(sys.argv) > 1:
        if Gtk.gdk.Color(sys.argv[1]):
            color_sel.colorsel.set_current_color(Gtk.gdk.Color(sys.argv[1]))

    if color_sel.run() == Gtk.ResponseType.OK:
        color = color_sel.get_color_selection().get_current_color()
        # Convert to 8bit channels
        red = int(color.red / 256)
        green = int(color.green / 256)
        blue = int(color.blue / 256)
        # Format
        finalcolor = "%02x%02x%02x" % (red, green, blue)
        print(finalcolor.upper())

    color_sel.destroy()

#! /usr/bin/env python2
# -*- coding: utf-8; mode: python -*-
""" Plot the relationship between commit size and commit message size.

- *Date:* 26/02/2015.
- *Author:* Erik Bernhardsson (http://erikbern.com/2015/02/26/the-relationship-between-commit-size-and-commit-message-size/).
- *Link:* https://gist.github.com/erikbern/0f347c8d789402a09f2e
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

import subprocess
import numpy
import matplotlib.pyplot as plt


def read_groups(data):
    buf = []
    for line in data:
        buf.append(line)
        if line.find('changed') != -1 and buf:
            yield buf
            buf = []


def main(url):
    command = 'git log --no-color --shortstat --log-size --format=oneline --no-merges'.split()
    data = subprocess.check_output(command).split('\n')


    xs, ys, msgs, commits = [], [], [], []
    for group in read_groups(data):
        if len(group) != 3: continue

        commit = group[0].split()[0]
        log_size = int(group[0].split()[-1])
        msg = group[1]
        change_size = sum(map(int, group[2].split()[3::2]))

        if log_size > 0 and change_size > 0:
            xs.append(change_size)
            ys.append(log_size)
            msgs.append(msg)
            commits.append(commit)

    fig, ax = plt.subplots()
    ax.set_xscale('log')
    ax.set_yscale('log')
    ax.set_xlabel('Size of commit (added + deleted lines)')
    ax.set_ylabel('Size of commit message')
    ax.scatter(xs, ys)

    xs_pixels, ys_pixels = ax.transData.transform(numpy.vstack([xs, ys]).T).T
    img_height = fig.get_figheight() * fig.dpi

    f = open('/home/lilian/Public/commit_size_vs_commit_message_size.html', 'w')
    f.write('<img src="commit_size_vs_commit_message_size.png" usemap="#points"/>')
    f.write('<map name="points">')
    for x_pixel, y_pixel, msg, commit in zip(xs_pixels, ys_pixels, msgs, commits):
        f.write('<area shape="circle" coords="%d,%d,5" href="https://%s/commit/%s" title="%s">' % (x_pixel, img_height-y_pixel, url, commit, msg.replace('"', '')))
    f.write('</map>')
    f.close()

    fig.savefig('/home/lilian/Public/commit_size_vs_commit_message_size.png', dpi=fig.dpi)


if __name__ == '__main__':
    # main("bitbucket.org/lbesson/bin")
    # main("bitbucket.org/lbesson/web-sphinx")
    # main("bitbucket.org/lbesson/lbesson.bitbucket.org")
    main("github.com/sphinx-doc/sphinx")

# End of commit_size_vs_commit_message_size.py

#! /usr/bin/env python3
# -*- coding: utf-8 -*-
""" Command line script to use DeepL translator service.

Requirement: https://github.com/EmilioK97/pydeepl

WARNING: not available, the DeepL API is now only for paying users.
See https://github.com/EmilioK97/pydeepl/issues/6 and https://www.deepl.com/api.html.

- *Date:* 11 December 2017.
- *Author:* Lilian Besson, © 2017.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

import sys

try:
    from pydeepl import translate
except ImportError:
    print("Unable to import 'pydeepl', please install it with 'pip install pydeepl'.")
    print("More details at 'https://github.com/EmilioK97/pydeepl'.")

try:
    try:
        from ansicolortags import printc
    except ImportError:
        print("Optional dependancy (ansicolortags) is not available, using regular print function.")
        print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")
        from ANSIColors import printc
except ImportError:
    print("Optional dependancy (ANSIColors) is not available, using regular print function.")
    print("  You can install it with : 'pip install ANSIColors-balises' (or sudo pip)...")

    def printc(*a, **kw):
        """ Fake function printc.

        ansicolortags or ANSIColors are not installed...
        Install ansicolortags from pypi (with 'pip install ansicolortags')
        """
        print(*a, **kw)

FROM_LANGUAGE = 'EN'
TO_LANGUAGE = 'FR'


def main(argv, to_language=TO_LANGUAGE, from_language=FROM_LANGUAGE):
    """ Main function. Use the arguments of the command line (sys.argv). """
    # TODO use docopt to handle the command line arguments! Cf. http://docopt.org/
    # TODO can docopt handle a cli documentation with ansicolortags tags in it? Cf. http://ansicolortags.rtfd.io/
    # Manual handing of the command line arguments
    if "-h" in argv or "--help" in argv:
        printc("""
<green>deepl.py<white> --help|-h | -f file | [--from LANG] [--to LANG] text

A simple Python script translate a text from a language to another language, using DeepL translator (https://www.deepl.com/translator).

<u>Examples:<U>
<black>$ deepl.py --help<white>
Print this help message!

<black>$ deepl.py -f test.txt<white>
Translate this text file.

<black>$ deepl.py "I like using command line to translate my text."<white>
J'aime utiliser la ligne de commande pour traduire mon texte.

<black>$ deepl.py --to ES "I like using command line to translate my text."<white>
Me gusta usar la línea de comandos para traducir mi texto.

<magenta>Copyleft 2017 Lilian Besson (License MIT)<white>
<b>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.<reset><white>
""")
        return 0

    if "--to" in argv:
        try:
            i = argv.index("--to")
            to_language = argv[i + 1]
            del argv[i], argv[i]
            # printc("<green>Using destination language {}<reset>...".format(to_language))
        except Exception as e:
            print(e)
            printc("<red>Ignored exception, using default destination language {}...<reset>".format(to_language))

    if "--from" in argv:
        try:
            i = argv.index("--from")
            from_language = argv[i + 1]
            del argv[i], argv[i]
            # printc("<green>Using destination language {}<reset>...".format(from_language))
        except Exception as e:
            print(e)
            printc("<red>Ignored exception, using default source language {}...<reset>".format(from_language))

    if "-f" in argv:
        try:
            with open(argv[argv.index("-f") + 1], 'r') as filename:
                text = "".join(filename.readlines())[:-1]
        except Exception as e:
            print(e)
            printc("<red>Trying to use the rest of the arguments to send the text message...<white>")
            text = "".join(argv)
    else:
        if argv:
            # Text
            if isinstance(argv, list):
                text = "".join(argv)
            elif isinstance(argv, str):
                text = argv
            else:
                printc("<Warning>argv seems to be of unknown type (not list, not str, but {}) ...".format(type(argv)))
                text = argv
            text = text.replace("\\n", "\n")
            # Durty hack to have true new lines in the message
        else:
            text = "I like using command line to translate my text."

    # print("text = '{}'".format(text))  # DEBUG
    results = []
    for t in text.splitlines():
        if t.isspace() or len(t) == 0:
            results.append(t)
        else:
            results.append(translate(t, to_lang=to_language, from_lang=from_language))
    result = "\n".join(results)
    print(result)
    return result


if __name__ == '__main__':
    main(sys.argv[1:])

#!/usr/bin/env python2
# -*- coding: utf8 -*-
"""
See https://github.com/andreecmonette/pydras
Author: Andree C. Monette
Source: https://raw.githubusercontent.com/andreecmonette/pydras/master/delqueen.py

Launch the script, cancel it with Ctrl+C to solve the n-queen problem

    $ delqueen.py 6
    Interrupt me to solve the 6 queens problem!
    ^CTraceback (most recent call last):
    File "/home/lilian/bin/delqueen.py", line 68, in <module>
        while True:
    KeyboardInterrupt
    894  board states traversed.
    The number of  6 -queens solutions is:  4
"""

from __future__ import print_function
import sys

if sys.version_info.major < 3:
    range = xrange


class delBoard:
    """ A weird object that does nothing while alive,
    but solves the n-queens problem when garbage collected.

    It uses CPython's garbage collection graph traversal algorithm to explore
    the graph of possible solutions to the n-queens problem.
    Very weird, but it works. And it's fast!
    """

    def __init__(self, nqueens=None):
        self.nqueens = nqueens
    
    def __del__(self):
        global __builtins__
        if not hasattr(self, 'myPos'):
            if not __name__ == "__main__":
                __builtins__ = delBoard
            __builtins__.nqueens = self.nqueens if self.nqueens else len(__name__)
            __builtins__.ans = 0
            __builtins__.collected = 0
            for j in range(__builtins__.nqueens):
                a = delBoard()
                a.boardState = ((set(), set(), set()))
                a.myPos = j
                a = 0
            print(str(__builtins__.collected), "board states traversed.")
            print("The number of", __builtins__.nqueens, "-queens solutions is:", __builtins__.ans)
            return

        __builtins__.collected += 1

        if self.myPos in self.boardState[0] \
            or self.myPos in self.boardState[1] \
            or self.myPos in self.boardState[2]:
            return

        if len(self.boardState[0]) == __builtins__.nqueens - 1:
            __builtins__.ans += 1
            return

        c = self.boardState[0].copy()
        c.add(self.myPos)
        l = set(map(lambda x: x - 1, self.boardState[1])).copy()
        l.add(self.myPos - 1)
        l.discard(-1)
        r = set(map(lambda x: x + 1, self.boardState[2])).copy()
        r.add(self.myPos + 1)
        r.discard(__builtins__.nqueens)
        for k in range(__builtins__.nqueens):
            b = delBoard()
            b.boardState = (c, l, r)
            b.myPos = k


# This has to be defined now
nqueens = int(sys.argv[1]) if len(sys.argv) > 1 else None
q = delBoard(nqueens)


if __name__ == "__main__":
    print("Interrupt me to solve the {} queens problem!".format(nqueens))
    while True:
        pass

#! /usr/bin/env python
# -*- coding: utf-8 -*-
"""
A small script to dump all Maths Exercice LaTeX sources from some website.
Eavily dependant on the website being used.

Doc: http://www.crummy.com/software/BeautifulSoup/bs3/documentation.html#Printing%20a%20Document
And an example: http://mp.cpgedupuydelome.fr/mesexos.php?idTeX=1485

- Author: Lilian BESSON
- Email: Lilian.BESSON[AT]ens-cachan[DOT]fr
- Web version: http://perso.crans.org/besson/bin/dump_dD.py
- Web version (2): https://bitbucket.org/lbesson/bin/src/master/dump_dD.py
- Date: 24-07-2013
"""

from __future__ import print_function  # Python 2/3 compatibility !
import sys

try:
    from ansicolortags import printc as print
except ImportError as e:
    print("ansicolortags not available, using regular print.")
    print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")

print("<yellow>.: Lilian Besson presents :.")
print("<cyan>Maths exercice LaTeX sources dumper, v0.1<reset>")

# Quicker if you keep this value up-to-date here
# nbExos=$(wget -O - --quiet "http://mp.cpgedupuydelome.fr/index.php" | html2text | grep Exercice | grep -o [0-9]*)
# nbExos  = 3994

# print("<reset>Choix aléatoire parmi <neg>%i<Neg> exercices de maths (niveau MPSI et MP)..." % nbExos)
# from random import randint
# numexo  = randint(1, nbExos)  # FIXME !

numexo = int(sys.argv[1]) if len(sys.argv) > 1 else 1485

chapter = str(sys.argv[2]) if len(sys.argv) > 2 else ""

urlToGo = "http://mp.cpgedupuydelome.fr/mesexos.php?idTeX=%i" % numexo

print("Numéro <magenta>%i<reset>. On va vers <u>\"%s\"<U><white>" % (numexo, urlToGo))

# On récupère la page (la partie la plus lente du coup)
import urllib2
response = urllib2.urlopen(urlToGo)
html = response.read()

# BeautifulSoup v3 (et pas v4, attention !)
from BeautifulSoup import BeautifulSoup

# On l'analyse
parsed_html = BeautifulSoup(html, fromEncoding='utf-8')

print("<black>Encodage original : %s<white>\n\n" % parsed_html.originalEncoding)

# On cherche la section <section id="contenu">..</section>
contenu = parsed_html.body.find('section', attrs={'id': 'contenu'})

# Et on prend le contenu de la première <textarea> !
codeTeX = contenu.findAll('textarea', limit=1)[0].renderContents()

# Quelques corrections, parce que BeautifulSoup échappe certains trucs
codeTeX = codeTeX.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&le;", "<=").replace("&ge;", ">=")

# Et d'autres erreurs fréquentes.
codeTeX = codeTeX.replace("^ - ", "^{-}")

# Ici on pourrait utiliser un outil de traduction bien conçu pour produire codeTeX_en en anglais
# FIXME !

# Là on galère pour afficher en UTF-8. Zut !
# print( unicode( codeTeX ) )
print("<blue><u>Code LaTeX de cet exercice:<U><white>\n\n%s" % codeTeX)

# On créé un fichier TeX
name = "ex_%i.fr.tex" % numexo
out = open(name, mode="w")

# On va écrire le code de l'exercice dedans
print("<green>On écrit dans %s !<white>" % out)

# Ajout de la possibilité de préciser le chapitre courant en train d'être construit.
if chapter:
    chapter = chapter.replace("_", " ").replace("/", "")
    print("<magenta>Pour le chapitre '%s' :<white>" % chapter)
    out.write("%%%% -*- mode: latex; coding: utf-8 -*-\n%%%% Chapter : %s.\n%%%% Start of LaTeX code, for exercise #%i (from '%s'), in French (file '%s').\n\n" % (chapter, numexo, urlToGo, name))
else:
    out.write("%%%% -*- mode: latex; coding: utf-8 -*-\n%%%% Start of LaTeX code, for exercise #%i (from '%s'), in French (file '%s').\n\n" % (numexo, urlToGo, name))

out.write(codeTeX)
out.write("\n%%%% End of LaTeX code, for exercise #%i (from '%s'), in French (file '%s').\n" % (numexo, urlToGo, name))

print("<green>Succès :)")
# DONE !

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" Substitue any :emojis: in the input document with its UTF-8 code.

- See https://stackoverflow.com/questions/42087466/sphinx-extension-to-use-github-markdown-emoji-in-sphinx
- Requirements: 'emoji' package, from https://github.com/carpedm20/emoji/

I use it with a small Bash script :

```bash
BUILDDIR=_build/html

for i in "$BUILDDIR"/*.html; do
    # Convert :emojis: to UTF-8 in HTML output (from GFM Markdown), see https://stackoverflow.com/questions/42087466/sphinx-extension-to-use-github-markdown-emoji-in-sphinx
    emojize.py "$i" > "$i".new   # new file
    wdiff -3 "$i" "$i".new       # print the difference
    mv -vf "$i".new "$i"         # write back to the first file
done
```

- *Date:* 07/04/2017
- *Author:* Lilian Besson, (C) 2017
- *Licence:* MIT Licence (http://lbesson.mit-license.org)
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

import re

# Install from https://github.com/carpedm20/emoji/
# with pip install emoji
try:
    from emoji import emojize
except ImportError:
    print("Error: package not found, install 'emoji' package with 'pip install emoji'")


def match_to_emoji(m):
    """Call emoji.emojize on m)."""
    return emojize(m.group(), use_aliases=True)


def emojize_all(s):
    """Convert all emojis :aliases: of the string s to emojis in UTF-8."""
    return re.sub(r":([a-z_-]+):", match_to_emoji, s)


def main(path):
    """Handle the file given by its path."""
    with open(path, 'r') as f:
        for line in f.readlines():
            print(emojize_all(line), end='')


if __name__ == '__main__':
    from sys import argv
    for arg in argv[1:]:
        main(arg)

# End of emojize.py

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" Substitue any :emojis: in the input document with a small HTML code for a link to a PNG or SVG image.

- See https://stackoverflow.com/questions/42087466/sphinx-extension-to-use-github-markdown-emoji-in-sphinx
- Requirements:
   + 'markdown' from https://pythonhosted.org/Markdown/install.html
   + 'pymdownx.emoji' from https://facelessuser.github.io/pymdown-extensions/installation/

I use it with a small Bash script :

```bash
BUILDDIR=_build/html

for i in "$BUILDDIR"/*.html; do
    # Convert :emojis: to  PNG/SVG in HTML output (from GFM Markdown), see https://stackoverflow.com/questions/42087466/sphinx-extension-to-use-github-markdown-emoji-in-sphinx
    emojize_pngorsvg.py "$i" > "$i".new   # new file
    wdiff -3 "$i" "$i".new       # print the difference
    mv -vf "$i".new "$i"         # write back to the first file
done
```

- *Date:* 07/04/2017
- *Author:* Lilian Besson, (C) 2017
- *Licence:* MIT Licence (http://lbesson.mit-license.org)
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

import re

try:
    from markdown import markdown
except ImportError:
    print("Error, module 'markdown' was not found, install it with 'pip install markdown' ...")

try:
    import pymdownx.emoji
except ImportError:
    print("Error, module 'pymdownx' was not found, install it with 'pip install pymarkdown-extensions' ...")


USE_SVG = False


def emojize(s, use_svg=USE_SVG):
    """Call markdown.markdown() on s."""
    emoji_generator = pymdownx.emoji.to_svg if use_svg else pymdownx.emoji.to_png
    extension_configs = {
        'pymdownx.emoji': {
            'emoji_generator': emoji_generator
        }
    }
    res = markdown(s,
                   extensions=['pymdownx.emoji'],
                   extension_configs=extension_configs
                  )
    return res.replace('<p>', '').replace('</p>', '')


def match_to_emoji(m, use_svg=USE_SVG):
    """Call emoji.emojize on m.group()."""
    return emojize(m.group(), use_svg=use_svg)


def emojize_all(s, use_svg=USE_SVG):
    """Convert all emojis :aliases: of the string s to emojis in UTF-8."""
    return re.sub(r":([a-z_-]+):", lambda s2: match_to_emoji(s2, use_svg=use_svg), s)


def main(path, use_svg=USE_SVG):
    """Handle the file given by its path."""
    with open(path, 'r') as f:
        for line in f.readlines():
            print(emojize_all(line, use_svg=use_svg), end='')


if __name__ == '__main__':
    from sys import argv
    if '--svg' in argv:
        USE_SVG = True
        while '--svg' in argv:
            del argv[argv.index('--svg')]
    for arg in argv[1:]:
        main(arg, use_svg=USE_SVG)

# End of emojize.py

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" Small Python 3.4 script to check the von Neumann method for generating a fair coin from a biasied one.

- Reference: https://en.wikipedia.org/wiki/Fair_coin#Fair_results_from_a_biased_coin


- *Date:* Tuesday 22 March 2016.
- *Author:* Lilian Besson, for the MVA Master, (C) 2015-16.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed
import numpy as np


def coin(p=0.5):
    """ 1 with probability = p, 0 with probability 1 - p. """
    return 1 * (np.random.random() < p)


def vonNeumann(q=0.5):
    """ Use von Neumann's rejection algorithm with an unknown coin (Bernoulli q). """
    x, y = coin(q), coin(q)
    while x == y:  # (x, y) not in {(1, 0), (1, 0)}
        x, y = coin(q), coin(q)
    return x


def main(n=1000):
    """ Check that the von Neumann method is indeed simulating a fair coin. """
    print("\n\n- Using n = {} tests of the von Neumann method, with unknown q in (0, 1).".format(n))
    q = 1.0 / np.pi   # Unknown float number 0.3183098861837907
    tests = [vonNeumann(q) for _ in range(n)]
    assert all(i in {0, 1} for i in tests), "Error of the vonNeumann function: a value outside of {0, 1} has been produced..."
    mu, sigma = np.mean(tests), np.var(tests)
    print("For the values x generated by the vonNeumann(q) function:\n Average mu = {:.4g} (should be 0.5) and variance sigma = {:.4g} (should be 0.25).".format(mu, sigma))
    delta_mu = abs(mu - 0.5) / 0.5
    delta_sigma = abs(sigma - 0.25) / 0.25
    print("Relative errors: delta_mu = {:.5%} and delta sigma = {:.5%} (both should be small).".format(delta_mu, delta_sigma))
    return mu, sigma


if __name__ == '__main__':
    for n in (10**i for i in range(1, 8)):
        main(n)

# End of fairCoin.py

#! /usr/bin/env python3
# -*- coding: utf8 -*-
"""
Script to read and fix a Jupyter notebook produced by the OCaml kernel.

- It duplicates the output cells of type 'execute_result' as 'stream' cells on the 'stderr' stream (fixes conversion to PDF with jupyter-nbconvert)
- Use it like this:
$ fix-iocaml-notebook-exports-to-pdf.py Old_notebook.ipynb New_notebook.ipynb

About:
- *Date:* 07/09/2017.
- *Author:* Lilian Besson, (C) 2017
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
- *Web*: https://github.com/Naereen/fix-iocaml-notebook-exports-to-pdf
"""

import sys
import os
import shutil
import json
import nbformat
from pprint import pprint


def is_stderr_used(outputs):
    for output in outputs:
        try:
            if output['name'] == "stderr":
                return True
        except KeyError:
            pass
    return False


def transform_data_texthtml(data_texthtml):
    data_texthtml[0] = data_texthtml[0][2:]
    for i in range(len(data_texthtml)):
        # Hack to replace a few HTML escaped caracters
        data_texthtml[i] = data_texthtml[i].replace('&gt;','>').replace('&lt;','<').replace('&quot;','\'')
    return data_texthtml


def get_data_texthtml(outputs):
    data_texthtml = []
    for output in outputs:
        try:
            if output['output_type'] == "execute_result" and 'text/html' in output['data']:
                long_data_texthtml = output['data']['text/html']
                assert len(long_data_texthtml) >= 8
                data_texthtml += transform_data_texthtml(long_data_texthtml[6:-1])
        except KeyError:
            pass
    return data_texthtml


def main(old, new, debug=False):
    filename = old
    assert filename[-6:] == '.ipynb', "Error: the input file is not a .ipynb Jupyter Notebook file."
    with open(filename, 'r') as file:
        content = json.load(file)
    # Check that it is a IOCaml notebook
    assert content['metadata']['kernelspec']['name'] == "iocaml-kernel" and content['metadata']['kernelspec']['language'] == "ocaml" and content['metadata']['kernelspec']['display_name'] == "OCaml", "Error: the input notebook does not appear to have been produced by the IOCaml OCaml kernel."
    # For each cell
    for cell in content['cells']:
        if cell['cell_type'] == "code":
            outputs = cell['outputs']
            # execution_count = cell['execution_count']
            # No need
            # if is_stderr_used(outputs):
            #     break
            data_texthtml = get_data_texthtml(outputs)
            # new_stderr_output = {
            #     "name": "stderr",
            #     "output_type": "stream",
            #     "text": data_texthtml,
            #     # "execution_count": execution_count,
            #     # "metadata": {}
            # }
            # if debug: pprint(new_stderr_output)
            # cell['outputs'].append(new_stderr_output)
            for output in outputs:
                if 'data' in output:
                    output['data']['text/plain'] = data_texthtml
                    if debug: pprint(output['data'])
                    break  # do not add twice the same output cell

    # Check before changing the file
    nbformat.validate(content)  # raise an Error if not valid notebook

    # Backup the input file by moving it to $input.ipynb~
    # shutil.copy(filename, filename.replace('.ipynb', '.ipynb~'))

    # Now write the JSON to the input file $input.ipynb
    with open(new, 'w') as file:
        json.dump(content, file, indent=2)
    print("New notebook written to", new)


if __name__ == '__main__':
    argv = sys.argv[1:]
    old = argv[0]
    if len(argv) < 2:
        new = old.replace('.ipynb', '__fix-iocaml-notebook-exports-to-pdf.ipynb')
    else:
        new = argv[1]
    print("old =", old)
    print("new =", new)
    main(old, new)

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" Calcule les frais de mission.

- *Date:* lundi 3 avril 2017.
- *Author:* Lilian Besson, (C) 2017.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2 compatibility if needed


# Constantes
repas = 15.25
hotel = 150
taxeSejour = 0  # 1.65
metro = 1.5


def main(nbJour=3, nbRepas=None, trains=None, nbNuit=None, totalHotel=None):
    """ Calcule et affiche les détails des frais de mission.

    Par exemple :
    >>> trains = {
           "Rennes > Lille": (44.00, "14/12/16"),
           "Lille > Paris ": (25.50, "16/12/16"),
           "Paris > Rennes": (35.00, "03/01/17"),
       }
    >>> main(nbJour=3, trains=trains)
    ...
    """
    print("Calcul des frais de mission pour", nbJour, "jours de mission ...")
    total = 0
    # Repas
    print("\n- Pour les repas :")
    if nbRepas is None:
        nbRepas = 2 * nbJour
        print("   2 repas par jour, pour", nbJour, "jours, soit", nbRepas, "repas.")
    totalRepas = repas * nbRepas
    print("  ", repas, "€ par repas, soit", totalRepas, "€ pour", nbRepas, "repas.")
    total += totalRepas

    # Hôtel
    if totalHotel:
        print("\n- Pour l'hôtel, un total de", totalHotel, "€.")
    else:
        print("\n- Pour l'hôtel : déjà réglé avant, normalement. Sinon, max", hotel, "€ par nuit.")
    if nbNuit is None:
        nbNuit = nbJour - 1
        print("  ", nbJour, "jours sur place, soit", nbNuit, "nuits d'hôtel (par défaut)")

    # Taxe de séjour
    print("\n- Taxe de séjour :")
    totalTaxeSejour = taxeSejour * nbNuit
    print("  ", taxeSejour, "€ par nuit, soit", totalTaxeSejour, "€ pour ces", nbNuit, "nuits.")
    total += totalTaxeSejour

    # Déplacements sur place
    print("\n- Métro :")
    totalMetro = 2 * metro * nbJour
    print("  ", metro, "€ par trajet, soit", totalMetro, "€ pour ces", nbJour, "jours sur place")
    total += totalMetro

    # Train
    print("\n- Train :")
    if trains is None:
        print("   Déjà réglé avant, normalement.")
    else:
        print("   Trajets :")
        totalTrain = 0
        for (trajet, (prix, date)) in trains.items():
            print("   -", trajet, "le", date, "à couté", prix, "€")
            totalTrain += prix
        print("   Soit", totalTrain, "€ pour ces", len(trains), "trajets en train.")
        total += totalTrain

    print("==> Soit un total de", total, "€ à me faire rembourser.")
    return total


if __name__ == '__main__':
    # Mission #4 en mars 2017.
    trains = None  # Payé par l'INRIA
    main(nbJour=11, trains=trains, nbRepas=11, totalHotel=0)

    # TODO prochaines missions !

# End of fraisMission.py

#!/usr/bin/env python2
# -*- coding:utf8 -*-
"""
A simple Python 3.4+ script to send a text message to a Free Mobile phone.

- Warning: it only works in France to a French number, using the mobile operator Free Mobile.
- Warning: some initial configuration is required before running this script (see the error messages).
- Copyright 2014-20 Lilian Besson
- License MIT.

Examples
--------
$ FreeSMS.py --help
Gives help

$ FreeSMS.py "I like using Python to send SMS to myself from my laptop -- and it's free thanks to Free Mobile !"
Will send a test message to your mobile phone.


- Last version? Take a look to the latest version at https://github.com/Naereen/FreeSMS.py
- Initial Copyright : José - Juin 2014 (http://eyesathome.free.fr/index.php/tag/freemobile/)
- License:

    MIT License

    Copyright (c) 2014-21 Lilian Besson (Naereen), https://github.com/Naereen

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
"""

from __future__ import print_function

# Use sys.version to be compatible with Python 2
import sys
# Use os.getenv to see try to emulate os.path.expanduser if needed
import os
# Use time to sleep and get string for today current hour
import time
# Use JSON to pretty print a dictionary
import json
# Use base64 to not keep plaintext files of the number, username and password in your home
import base64

today = time.strftime("%H:%M:%S %Y-%m-%d")

try:
    from os.path import expanduser
except ImportError:
    print("Warning, os.path.expanduser is not available, trying to use os.getenv('USER') = {} ...".format(os.getenv("USER")))

    def expanduser(s):
        """ Try to simulate the os.path.expanduser function. """
        return '/home/' + os.getenv("USER") + '/' + s


if sys.version_info < (3, 0):
    from urllib import urlencode
    from urllib2 import urlopen, HTTPError
else:
    from urllib3.request import urlencode
    from urllib.request import urlopen
    from urllib.error import HTTPError


try:
    try:
        from ansicolortags import printc
    except ImportError:
        print("Optional dependancy (ansicolortags) is not available, using regular print function.")
        print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")
        from ANSIColors import printc
except ImportError:
    print("Optional dependancy (ANSIColors) is not available, using regular print function.")
    print("  You can install it with : 'pip install ANSIColors-balises' (or sudo pip)...")

    def printc(*a, **kw):
        """ Fake function printc.

        ansicolortags or ANSIColors are not installed...
        Install ansicolortags from pypi (with 'pip install ansicolortags')
        """
        print(*a, **kw)


def testSpecialFile(name, number=''):
    """ Test if the hidden file '~/.smsapifreemobile_name.b64' exists and decodes (base64) correctly.
    """
    assert name in ["number", "user", "password"], "Error: unknown or incorrect value for 'name' for the function openSpecialFile(name) ..."
    # printc("<cyan>Testing the hidden file <white>'<u>~/.smsapifreemobile_{}.b64<U>'<cyan>...<white>".format(name))  # DEBUG
    try:
        with open(expanduser('~/') + ".smsapifreemobile_" + name + number + ".b64") as f:
            variable = base64.b64decode(f.readline()[:-1])
            while variable[-1] == '\n':
                variable = variable[:-1]
            return True
    except OSError:
        return False



def openSpecialFile(name, number=''):
    """ Open the hidden file '~/.smsapifreemobile_name.b64', read and decode (base64) and return its content.
    """
    assert name in ["number", "user", "password"], "Error: unknown or incorrect value for 'name' for the function openSpecialFile(name) ..."
    printc("<cyan>Opening the hidden file <white>'<u>~/.smsapifreemobile_{}.b64<U>'<cyan>, read and decode (base64) and return its content...<white>".format(name))
    try:
        with open(expanduser('~/') + ".smsapifreemobile_" + name + number + ".b64") as f:
            variable = base64.b64decode(f.readline()[:-1])
            while variable[-1] == '\n':
                variable = variable[:-1]
            return variable
    except OSError:
        printc("<red>Error: unable to read the file '~/.smsapifreemobile_{}.b64' ...<white>".format(name))
        printc("<yellow>Please check that it is present, and if it not there, create it:<white>")
        if name == "number":
            print("To create '~/.smsapifreemobile_number.b64', use your phone number (like '0612345678', not wiht +33), and execute this command line (in a terminal):")
            printc("<black>echo '0612345678' | base64 > '~/.smsapifreemobile_number.b64'<white>".format())
        elif name == "user":
            print("To create '~/.smsapifreemobile_user.b64', use your Free Mobile identifier (a 8 digit number, like '83123456'), and execute this command line (in a terminal):")
            printc("<black>echo '83123456' | base64 > '~/.smsapifreemobile_user.b64'<white>".format())
        elif name == "password":
            print("To create '~/.smsapifreemobile_password.b64', go to this webpage, https://mobile.free.fr/moncompte/index.php?page=options&show=20 (after logging to your Free Mobile account), and copy the API key (a 14-caracters string on [a-zA-Z0-9]*, like 'H6ahkTABEADz5Z'), and execute this command line (in a terminal):")
            printc("<black>echo 'H6ahkTABEADz5Z' | base64 > '~/.smsapifreemobile_password.b64<white>' ".format())


numbers = []

#: Number (not necessary)
# number = base64.b64decode(open(expanduser('~') + ".smsapifreemobile_number.b64").readline()[:-1])
# if number[-1] == '\n':
#     number = number[:-1]
number = openSpecialFile("number")
numbers.append(number)

if testSpecialFile("number", "2"):
    number2 = openSpecialFile("number", "2")
    numbers.append(number2)

# Detect language
language = os.getenv("LANG")
language = language[0:2] if language else "fr"


# Maximum size that can be sent
# XXX Reference: https://en.wikipedia.org/wiki/Short_Message_Service#Message_size
# "6 to 8 segment messages are the practical maximum"
MAX_SIZE = 4 * 159
STR_MAX_SIZE = "4*159"


if language == "fr":
    errorcodes = {
        400: "Un des paramètres obligatoires est manquant.",
        402: "Trop de SMS ont été envoyés en trop peu de temps.",
        403: """Le service n'est pas activé sur l'espace abonné, ou login / clé incorrect.
Allez sur '<black>https://mobile.free.fr/moncompte/index.php?page=options&show=20<white>' svp, et activez l'option correspondate.""",
        500: "Erreur côté serveur. Veuillez réessayez ultérieurement.",
        1:   "Le SMS a été envoyé sur votre mobile ({}).".format(number) if len(numbers) <= 1 else "Le SMS a été envoyé sur vos numéros ({}).".format(numbers),
        "toolong": "<red>Attention<white> : le message est trop long (+ de <black>{}<white> caracters, soit plus de 3 SMS).".format(STR_MAX_SIZE)
    }
else:
    errorcodes = {
        400: "One of the necessary parameter is missing.",
        402: "Too many SMSs has been sent in a short time (you might be a spammer!).",
        403: """Access denied: the service might not be activated on the online personnal space, or login/password is wrong.
Please go on '<black>https://mobile.free.fr/moncompte/index.php?page=options&show=20<white>' please, and enable the corresponding option.""",
        500: "Error from the server side. Please try again later.",
        1:   "The SMS has been sent to your mobile ({}).".format(number) if len(numbers) <= 1 else "The SMS has been sent to all your mobile numbers ({}).".format(numbers),
        "toolong": "<red>Warning<white>: message is too long (more than <black>{}<white> caracters, so more than 3 SMS).".format(STR_MAX_SIZE)
    }


def send_sms(text="Empty!", secured=True, sleep_duration=0):
    """ Sens a free SMS to the user identified by [user], with [password].

    :user: Free Mobile id (of the form [0-9]{8}),
    :password: Service password (of the form [a-zA-Z0-9]{14}),
    :text: The content of the message (a warning is displayed if the message is bigger than 480 caracters)
    :secured: True to use HTTPS, False to use HTTP.

    Returns a boolean and a status string.
    """
    # DONE split the text into smaller pieces if length is too big (automatically, or propose to do it ?)
    if len(text) > MAX_SIZE:
        printc(errorcodes["toolong"])
        nb_sub_messages = len(text) / MAX_SIZE
        printc("\n<red>Warning<white>: message will be split in <red>{} piece{}<white> of size smaller than <black>{} characters<white>...".format(nb_sub_messages + 1, 's' if nb_sub_messages > 0 else '', MAX_SIZE))
        printc("  <magenta>Note that new lines and other information can be lost!<white>")
        for i, index in enumerate(range(0, len(text), MAX_SIZE)):
            answer = send_sms(text[index: index + MAX_SIZE])
            printc("For piece #{} of the message, the answer is:\n  <magenta>{}<white>...\n".format(i + 1, answer[1]))
        return answer
        # raise ValueError(errorcodes["toolong"])

    # Read user and password

    users = []
    #: Identification Number free mobile
    user = openSpecialFile("user")
    users.append(user)
    if testSpecialFile("user", "2"):
        user2 = openSpecialFile("user", "2")
        users.append(user2)

    passwords = []
    #: Password
    password = openSpecialFile("password")
    passwords.append(password)
    if testSpecialFile("password", "2"):
        password2 = openSpecialFile("password", "2")
        passwords.append(password2)

    printc("\n<green>Your message is:<white>\n<yellow>" + text + "<white>")
    url = "https" if secured else "http"

    # Sending to all the numbers
    results = []

    for (user, password) in zip(users, passwords):
        dictQuery = {"user": user, "pass": password, "msg": text}
        string_query = json.dumps(dictQuery, sort_keys=True, indent=4)
        string_query = string_query.replace(password, '*' * len(password))
        printc("\nThe web-based query to the Free Mobile API (<u>{}://smsapi.free-mobile.fr/sendmsg?query<U>) will be based on:\n{}.".format(url, string_query))
        if sleep_duration > 0:
            printc("\nSleeping for <red>{}<reset><white> seconds before querying the API...".format(sleep_duration))
            try:
                time.sleep(sleep_duration)
            except KeyboardInterrupt as e:
                printc("<red>You interrupted the process of sending this message, skipping to next one (or stopping now)...<reset><white>")
            else:
                printc("\nDone sleeping for <red>{}<reset><white> seconds, it's time to query the API !".format(sleep_duration))

        query = urlencode(dictQuery)
        url += "://smsapi.free-mobile.fr/sendmsg?{}".format(query)

        try:
            urlopen(url)
            results.append((0, errorcodes[1]))
        except HTTPError as e:
            if hasattr(e, "code"):
                results.append((e.code, errorcodes[e.code]))
            else:
                print("Unknown error...")
                results.append((2, "Unknown error..."))

    # Now we return the list of results
    return results


def main(argv):
    """ Main function. Use the arguments of the command line (sys.argv).
    """
    # TODO use docopt to handle the command line arguments! Cf. http://docopt.org/
    # TODO can docopt handle a cli documentation with ansicolortags tags in it? Cf. http://ansicolortags.rtfd.io/
    # Manual handing of the command line arguments
    if "-h" in argv or "--help" in argv:
        printc("""
<green>FreeSMS.py<white> --help|-h | -f file | [--sleep] body of the message

A simple Python script to send a text message to a Free Mobile phone.
The message should be smaller than 480 caracters.

<u>Examples:<U>
<black>$ FreeSMS.py --help<white>
Print this help message!

<black>$ FreeSMS.py -f MyMessageFile.txt<white>
Try to send the content of the file MyMessageFile.txt.

<black>$ FreeSMS.py "I like using Python to send me SMS from my laptop -- and it"s free thanks to Free !"<white>
Will send a test message to your mobile phone.

<black>$ FreeSMS.py --sleep 1 "This option makes the script sleep for one minute"<white>
Sleep one minute.

<magenta>Copyright 2014-21 Lilian Besson (License MIT)<white>
<b>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.<reset><white>
""")
        return [(0, None)]

    sleep = False
    sleep_duration = 15  # in seconds
    if "--sleep" in argv:
        sleep = True
        index = argv.index("--sleep")
        if index + 1 < len(argv):
            try:
                sleep_duration = int(argv[index + 1])
            except:
                printc("<red>Unable to get a sleep duration value from the command line argument ('{}' does not convert to an integer).".format(argv[index + 1]))  # DEBUG
            else:
                argv.pop(index)  # remove sleep_duration
        argv.pop(index)  # remove "--sleep"

    if "-f" in argv:
        try:
            with open(argv[argv.index("-f") + 1], 'r') as filename:
                text = "".join(filename.readlines())[:-1]
        except Exception as e:
            print(e)
            print("Trying to use the rest of the arguments to send the text message...")
            text = " ".join(argv)
    else:
        if argv:
            # Text of the SMS
            if isinstance(argv, list):
                text = " ".join(argv)
            elif isinstance(argv, str):
                text = argv
            else:
                printc("<Warning>argv seems to be of unknown type (not list, not str, but {}) ...".format(type(argv)))
                text = argv
            text = text.replace("\\n", "\n")
            # Durty hack to have true new lines in the message
        else:
            text = """Test SMS sent from {machinename} with FreeSMS.py (the {date}).

    (a Python 2.7+ / 3.4+ script by Lilian Besson, open source, you can find the code
    at https://github.com/Naereen/FreeSMS.py
    or https://perso.crans.org/besson/bin/FreeSMS.py)

    For any issues, reach me by email at jarvis[at]crans[dot]org !"""
            # FIXED Check that this is working correctly!
            machinename = "jarvis"  # Default name!
            try:
                machinename = open("/etc/hostname").readline()[:-1]
            except OSError:
                print("Warning: unknown machine name (file '/etc/hostname' not readable?)...")
                machinename = "unknown machine"
            text = text.format(date=today, machinename=machinename)
            text = text.replace("[at]", "@").replace("[dot]", ".")

    answers = send_sms(text, sleep_duration=sleep_duration)
    return answers


if __name__ == "__main__":
    # from doctest import testmod  # DEBUG ?
    # testmod(verbose=False)  # DEBUG ?
    results = main(sys.argv[1:])
    first_result = results[0]
    code, message = first_result
    sys.exit(int(code))

#!/usr/bin/env python
# -*- coding:utf8 -*-
"""
A simple Python script to generate a square wordcloud from a file or a bunch of files.
https://github.com/Naereen/generate-word-cloud.py

Requires https://github.com/amueller/word_cloud/

.. note:: Copyright 2016 Lilian Besson
.. warning:: License GPLv3.

---

Examples
--------
$ generate-word-cloud.py --help
Gives help.

$ generate-word-cloud.py ./hamlet.txt
Generate a wordcloud from the textfile hamlet.txt, saving to hamlet.png.

$ generate-word-cloud.py -o wordcloud.png ./*.txt
Generate a wordcloud from all the txt files in the current directory, save it to wordcloud.png.

------

.. sidebar:: Last version?

   Take a look to the latest version at https://github.com/Naereen/generate-word-cloud.py

.. note::

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   generate-word-cloud.py is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

   See the GNU General Public License for more details.
   You should have received a copy of the GNU General Public License v3 along with generate-word-cloud.py.
   If not, see <http://perso.crans.org/besson/LICENSE.html>.
"""

from __future__ import print_function  # Python 2/3 compatible

from sys import exit, argv
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from os import path
# import argparse  # DONE : switch to docopt (https://github.com/docopt/docopt)
from docopt import docopt

try:
    try:
        from ansicolortags import printc
    except ImportError as e:
        print("Optional dependancy (ansicolortags) is not available, using regular print function.")
        print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")
        from ANSIColors import printc
except ImportError:
    printc = print

# Options
version = '0.2'
show = False


def readfiles(filenames):
    """ Return the content of each file, concatenated as one big string.

    - Path could be relative or absolute, but nothing fancy is done here.
    """
    text = ""
    # Read the whole text for each file
    for filename in filenames:
        try:
            text += open(filename, 'r').read()
            text += r"\n"
        except Exception as e:
            printc("<ERROR>Error, exception: <reset>{}.".format(e))
            printc("<red>Skipping file <black>'{}'<reset>...".format(filename))
    # return "\n".join(open(filename, 'r').read() for filename in filenames)
    return text


def generate(text, max_words=600, width=1600, height=900):
    """ Generate a word cloud image from the given text (one huge string). """
    # Take relative word frequencies into account, lower max_font_size
    # https://amueller.github.io/word_cloud/generated/wordcloud.WordCloud.html#wordcloud.WordCloud
    max_words = int(max_words) if max_words is not None else  600
    width     = int(width)     if width     is not None else  1600
    height    = int(height)    if height    is not None else  900
    wc = WordCloud(
        max_font_size=50,
        relative_scaling=.5,
        max_words=max_words,
        width=width,
        height=height
    )
    return wc.generate(text)


def makeimage(wordcloud,
              outname='wordcloud.png', title='Word cloud', show=False, force=False):
    """ Display or save the wordcloud as a image. """
    # Display the generated image:
    try:
        # 2. the matplotlib way:
        plt.figure()
        plt.imshow(wordcloud)
        plt.axis("off")
        if title:
            printc("<magenta>Using title<reset> <blue>'{}'<reset>.".format(title))
            plt.title(title)
        if show:
            printc("<green>Showing the generated image...<reset>")
            plt.show()
        else:
            printc("<green>Saving the generated image<reset> to <blue>'{}'<reset>...".format(outname))
            if (not force) and path.exists(outname):
                erase = raw_input("The outfile '{}' already exists, should I erase it ?  [y/N]".format(outname))
                if erase == 'y':
                    plt.savefig(outname)
                else:
                    printc("<magenta>Not erasing it...<reset>")
                    printc("<green>Showing the generated image...<reset>")
                    plt.show()
            else:
                if force:
                    printc("<WARNING> -f or --force has been used, overwriting the image '{}' <red>without<reset> asking you...".format(outname))
                plt.savefig(outname)
    except Exception as e:
        printc("<ERROR> Error, exception<reset>: {}".format(e))
        # 1. The pil way (if you don't have matplotlib)
        printc("<WARNING> Something went wrong with matplotlib, switching to PIL backend... (just showing the image, <red>not<reset> saving it!)")
        image = wordcloud.to_image()
        image.show()
    return True


#: Help for the cli
full_docopt_text = """
generate-word-cloud.py

Usage:
  generate-word-cloud.py [-s | --show] [-f | --force] [-o OUTFILE | --outfile=OUTFILE]
                         [-t TITLE | --title=TITLE] [-m MAX | --max=MAX]
                         [-w WIDTH | --width=WIDTH] [-H HEIGHT | --height=HEIGHT]
                         INFILE...
  generate-word-cloud.py [-h | --help]
  generate-word-cloud.py [-v | --version]

Options:
  -h --help            Show this help message and exit.
  -v --version         Show program's version number and exit.
  -s --show            Show the image but do not save it [default False].
  -f --force           Force to write the image, even if present (default is to ask before overwriting an existing file) [default False].
  -o OUTFILE --outfile=OUTFILE
                       Filename for the generated image [default 'wordcloud.png'].
  -t TITLE --title=TITLE
                       Title for the image [default None].
  -m MAX --max MAX
                       Max number of words to display on the cloud word [default 150].
  -w WIDTH --width WIDTH
                       Width of the generate image [default 400].
  -H HEIGHT --height HEIGHT
                       Height of the generate image [default 300].
  INFILE               A text file to read.


A simple Python script to generate a (square) wordcloud from a file INFILE (or bunch of files INFILE...).
Requires https://github.com/amueller/word_cloud/ (installable with pip).

Examples:
$ generate-word-cloud.py --help
Gives this help.

$ generate-word-cloud.py ./hamlet.txt
Generate a wordcloud from the textfile hamlet.txt, saving to 'wordcloud.png' (default).

$ generate-word-cloud.py -o mywordcloud.png ./*.txt
Generate a wordcloud from all the txt files in the current directory, save it to 'mywordcloud.png'.

Copyright 2016 Lilian Besson (License GPLv3)
generate-word-cloud.py is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
"""


def main(argv):
    """ Use the arguments of the command line. """
    # Use the arg parser
    args = docopt(full_docopt_text, argv=argv, version="generate-word-cloud.py v{}".format(version))
    # printc("<magenta>Arguments: {} <reset>".format(args))  # DEBUG

    # Read the files
    printc("<green>Reading the files<reset>, from: <blue>{}<reset>.".format(args['INFILE']))
    text = readfiles(args['INFILE'])
    # Decide where to save it
    outname = args['--outfile'] if args['--outfile'] else 'wordcloud.png'
    # Generate the wordcloud
    # print("Making a wordcloud from this text:\n", text)  # DEBUG
    wordcloud = generate(text,
                         max_words=args['--max'],
                         width=args['--width'],
                         height=args['--height']
                         )
    # Finally, saving the image
    printc("<green>Making the image<reset> and saving it to <blue>{}<reset>.".format(outname))
    makeimage(wordcloud,
              outname=outname, title=args['--title'],
              force=args['--force'], show=args['--show']
              )
    return 0


if __name__ == "__main__":
    exit(int(main(argv[1:])))

# End of generate-word-cloud.py

#! /usr/bin/env python3
# -*- coding: utf-8 -*-
""" A small Python script to download and print the current temperature in different places.

Used to get real-world numerical data for this demo.
MALIN: Multi-Arm bandit Learning for Iot Networks with GRC. Demo made by Lilian Besson, Rémi Bonnefoi, Christophe Moy. Presented at the ICT 2018 conference (http://ict-2018.org/call-for-demos/).
https://bitbucket.org/scee_ietr/malin-multi-arm-bandit-learning-for-iot-networks-with-grc/

- *Date:* 3 May 2018.
- *Author:* Lilian Besson, © 2018.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

from os.path import expanduser, join, isfile
from datetime import datetime
from json import load, dump


try:
    from darksky import forecast
except ImportError as e:
    print("Install 'darksky' module with 'pip install git+https://github.com/lukaskubis/darkskylib'...")
    raise e


def save_data(time_of_data, data, filename):
    new_dict = {
        time_of_data: data,
    }
    old_data = load_data(filename)
    old_data.update(new_dict)
    with open(filename, "w") as fp:
        dump(new_dict, fp)
    return new_dict


def load_data(filename):
    old_data = dict()
    if isfile(filename):
        with open(filename, "r") as fp:
            old_data = load(fp)
    return old_data


def get_data(names, locations, key, verbose=True):
    data = []
    now = datetime.now()
    for name, location in zip(names, locations):
        weather = forecast(key, *location)
        temperature_in_F = weather['currently']['temperature']
        temperature_in_C = round((temperature_in_F - 32) * (5/9), 1)
        data.append({
            "name": name,
            "location": location,
            "temperature_in_C": temperature_in_C,
        })
        if verbose:
            print("\n- In {}, at location {}, the temperature is {}°C at time {:%Y-%m-%d %H:%M}".format(name, location, temperature_in_C, now))
    return weather['currently']['time'], data


def main(filename, names, locations, key, verbose=True):
    time_of_data, data = get_data(names, locations, key, verbose=verbose)
    save_data(time_of_data, data, filename)
    return time_of_data, data


if __name__ == '__main__':
    filename = "get_current_temperature.json"
    names, locations = [], []

    # https://www.google.fr/maps/place/Supélec/@48.1252316,-1.6255899,17z/
    name = "CentraleSupélec, Rennes, France"
    location = 48.1252316, -1.6255899
    names.append(name); locations.append(location)

    # # https://www.google.fr/maps/place/05100+Briançon/@44.8826142,6.6285124,16z/
    # name = "Briançon, France"
    # location = 44.8826142, 6.6285124
    # names.append(name); locations.append(location)

    # https://www.google.fr/maps/place/Palais+du+Grand+Large/@48.6516678,-2.0214016,17z/
    name = "ICT conference, Saint-Malo, France"
    location = 48.6516678, -2.0214016
    names.append(name); locations.append(location)

    with open(join(expanduser("~"), ".darksky_api.key"), "r") as f:
        key = f.readline()
        # print("Using key =", key)  # DEBUG

    data = main(filename, names, locations, key)

#!/usr/bin/env python
# -*- coding: utf8 -*-

import urllib.request
import re
import json
import sys
response = urllib.request.urlopen(
    'https://scholar.google.fr/citations?user={}'.format(sys.argv[1]))
html = response.read()
m = re.search("<tbody(.*)</tbody>", str(html))

mm = re.findall(r"<tr class=\"gsc_a_tr\">(.*?)</tr>", m.group(0))
papers = []
for m in mm:
    xx = re.sub(r"<(.*?)>", r"£", m)
    xx = re.sub(r"£+", r"£", xx)
    yy = re.findall(r"£?(.*?)£", xx)
    paper = {
        "title": yy[0],
        "author": yy[1],
        "booktitle": yy[2],
    }
    papers.append(paper)

res = {"papers": papers}
print(json.JSONEncoder().encode(res))

#!/usr/bin/env python
# -*- coding: utf-8; mode: python -*-
"""
A simple python implementation of Gravatar Image requests (using their API).

- Author: Lilian Besson, (C) 2013.
- Online: https://bitbucket.org/lbesson/bin/src/master/gravatar.py
- Licence: MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2/3 compatibility !
# import code for encoding urls and generating md5 hashes
import urllib
import hashlib

# Set the default picture
# default = "http://perso.crans.org/besson/.besson.jpg"
default = "retro"

size = 256
secure = True


def gravatar(email, default=default, size=size, secure=secure):
    """
    gravatar(email, default=default, size=size, secure=secure) -> string"

    Return the URL of the gravatar picture associated with @email.
    @default: default picture to use if not available. Default is %s.
    @size: format to use (pixel x pixel). Default is %i.
    @secure: if true, the returned URL use https://secure.gravatar.com instead of http://www.gravatar.com. Default is %s."
    """ % (default, size, secure)
    if secure:
        gravatar_url = "https://secure.gravatar.com/avatar/" + hashlib.md5(email.lower()).hexdigest() + "?r=pg&"
    else:
        gravatar_url = "http://www.gravatar.com/avatar/" + hashlib.md5(email.lower()).hexdigest() + "?r=pg&"
    gravatar_url += urllib.urlencode({'d': default, 's': str(size)})
    return gravatar_url


if __name__ == '__main__':
    # Set the email address to check
    email = "lbessonATens-cachanDOTfr".replace("AT", "@").replace("DOT", ".")
    print("For the email adress " + email)
    print(gravatar(email))
    email = "ameliaDOTnoreenATgmailDOTcom".replace("AT", "@").replace("DOT", ".")
    print("For the email adress " + email)
    print(gravatar(email))

#! /usr/bin/env python3
# -*- coding: utf8 -*-
"""
Hand written implementation of a very naive hash table data structure.

- It supports the same interface as Python default 'dict' data structure.
- O(1) insertion, O(1) read, deletion and write (in average)
- It is not slow! For about 100 values, it is about has fast as 'dict', 10x slower for 1000 values, 100x slower for 10000 values.

About:
- *Date:* 23/09/2017.
- *Author:* Lilian Besson, (C) 2017
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
- *Web*: https://bitbucket.org/lbesson/bin/
"""


def small_hash(x, nb_bits=3):
    """A naive hash function."""
    # return abs(hash(x)) % 2  # test, to check that collisions are well handled
    return abs(hash(x)) % (1 << nb_bits)


NB_BITS = 4
DEFAULT_SIZE = 1 << NB_BITS


class hashtable(object):
    """Manual implementation of a naive hash table.

    - Can only store hashable values.
    - Use single-linked lists to be collision-resistant!
    - Uses a non cryptographic hash function (default `hash`).
    """

    def __init__(self, map_values=None, nb_bits=NB_BITS):
        self._nb_bits = nb_bits
        self._size = 1 << nb_bits
        self._nb = 0
        self._array = [[] for _ in range(self._size)]
        self._keys = []
        # Naive way of inserting
        if map_values is not None:
            for key, value in map_values:
                self.insert(key, value)

    # convenient methods

    def __len__(self):
        return self._nb

    def __str__(self):
        return "{" + ", ".join(["{}: {}".format(kv[0], kv[1]) for kv in self]) + "}"

    __repr__ = __str__

    def insert(self, key, value):
        """Insert a new (key, value) pair in the hash table."""
        if key in self.keys():
            raise ValueError("key = {} is already present in the hash table".format(key))
        self._keys.append(key)
        self._nb += 1
        h = small_hash(key, nb_bits=self._nb_bits)
        if self._nb >= self._size:
            self._double_size()
        self._array[h].append((key, value))

    # internal double method

    def _double_size(self, debug=False):
        """If needed, double the size of the hash table."""
        self._array += [[] for _ in range(self._size)]
        self._nb_bits += 1
        self._size *= 2
        if debug:
            print("Doubling the size of the hash table...\nUsing now {} bits for the addressing, and able to store up to {} values. Currently {} are used.".format(self._nb_bits, self._size, self._nb))  # DEBUG

    # read, write, delete methods

    def read(self, key):
        """Read the value stored with this key."""
        if key not in self.keys():
            raise IndexError
        h = small_hash(key, nb_bits=self._nb_bits)
        cell = self._array[h]
        for (k, v) in cell:
            if k == key:
                return v
        raise IndexError

    __getitem__ = read

    def delete(self, key):
        """Delete the value stored with this key."""
        if key not in self.keys():
            raise IndexError
        h = small_hash(key, nb_bits=self._nb_bits)
        cell = self._array[h]
        for i, (k, _) in enumerate(cell):
            if k == key:
                self._nb -= 1
                del cell[i]
                del self._keys[self._keys.index(k)]
                break
        else:
            raise IndexError

    __delitem__ = delete

    def write(self, key, value):
        """Set the value stored with this key."""
        if key not in self.keys():
            raise IndexError
        h = small_hash(key, nb_bits=self._nb_bits)
        cell = self._array[h]
        for i, (k, _) in enumerate(cell):
            if k == key:
                cell[i] = (key, value)
                break
        else:
            raise IndexError

    # dictionary like methods

    def keys(self):
        """Return iterator of keys."""
        return self._keys

    def items(self):
        """Return iterator of items."""
        return (self[k] for k in self.keys())

    def __contains__(self, key):
        return key in self.keys()

    def __setitem__(self, key, value):
        if key in self.keys():
            self.write(key, value)
        else:
            self.insert(key, value)

    def update(self, iterator):
        if hasattr(iterator, 'keys') and callable(iterator.keys):
            for k in iterator:
                self[k] = iterator[k]
        else:
            for k, v in iterator:
                self[k] = v

    # Methods to make it an iterator

    def list(self):
        r = []
        for c in self._array:
            if len(c) > 0:
                r += c
        return r

    def __iter__(self):
        for c in self._array:
            if len(c) > 0:
                for kv in c:
                    yield kv


# --- Testing

def test():
    print("Creating empty hash table ...")
    H = hashtable()
    print(H)

    print("Inserting i**2 for i = 0..9 ...")
    for i in range(10):
        H.insert(i, i**2)
    print(H)

    print("Reading i**2 for i = 0..9 ...")
    for i in range(10):
        assert H[i] == H.read(i)
        print("H[{}] = {} = H.read({}) = {}".format(i, H[i], i, H.read(i)))
    print(H)

    print("Writing in place i**3 ...")
    for i in range(10):
        H.write(i, i**3)
    print(H)

    print("Writing in place i**4 ...")
    for i in range(10):
        H[i] = i**4
    print(H)

    print("Deleting even values ...")
    for i in range(0, 10, 2):
        H.delete(i)
    print(H)

    print("Inserting a new value ...")
    H.insert(20, 8000)
    print(H)

    print("Deleting this new value ...")
    del H[20]
    print(H)

    print("len(H) =", len(H))

    print("list(H) =", list(H))

    print("Updating from a dictionary ...")
    H.update({k: k**2 for k in range(10, 15)})
    print(H)

    print("Updating from a list ...")
    H.update([(k, k**2) for k in range(15, 20)])
    print(H)

if __name__ == '__main__':
    test()

#!/usr/bin/python
"""Replacement for htpasswd"""
# Original author: Eli Carter
import os
import sys
import random
from optparse import OptionParser
# We need a crypt module, but Windows doesn't have one by default.  Try to find
# one, and tell the user if we can't.
try:
    import crypt
except ImportError:
    try:
        import fcrypt as crypt
    except ImportError:
        sys.stderr.write("Cannot find a crypt module.  "
                         "Possibly http://carey.geek.nz/code/python-fcrypt/\n")
        sys.exit(1)
def salt():
    """Returns a string of 2 randome letters"""
    letters = 'abcdefghijklmnopqrstuvwxyz' \
              'ABCDEFGHIJKLMNOPQRSTUVWXYZ' \
              '0123456789/.'
    return random.choice(letters) + random.choice(letters)
class HtpasswdFile:
    """A class for manipulating htpasswd files."""
    def __init__(self, filename, create=False):
        self.entries = []
        self.filename = filename
        if not create:
            if os.path.exists(self.filename):
                self.load()
            else:
                raise Exception("%s does not exist" % self.filename)
    def load(self):
        """Read the htpasswd file into memory."""
        lines = open(self.filename, 'r').readlines()
        self.entries = []
        for line in lines:
            username, pwhash = line.split(':')
            entry = [username, pwhash.rstrip()]
            self.entries.append(entry)
    def save(self):
        """Write the htpasswd file to disk"""
        open(self.filename, 'w').writelines(["%s:%s\n" % (entry[0], entry[1])
                                             for entry in self.entries])
    def update(self, username, password):
        """Replace the entry for the given user, or add it if new."""
        pwhash = crypt.crypt(password, salt())
        matching_entries = [entry for entry in self.entries
                            if entry[0] == username]
        if matching_entries:
            matching_entries[0][1] = pwhash
        else:
            self.entries.append([username, pwhash])
    def delete(self, username):
        """Remove the entry for the given user."""
        self.entries = [entry for entry in self.entries
                        if entry[0] != username]
def main():
    """
        %prog -b[c] filename username password
        %prog -D filename username"""
    # For now, we only care about the use cases that affect tests/functional.py
    parser = OptionParser(usage=main.__doc__)
    parser.add_option('-b', action='store_true', dest='batch', default=False,
        help='Batch mode; password is passed on the command line IN THE CLEAR.'
        )
    parser.add_option('-c', action='store_true', dest='create', default=False,
        help='Create a new htpasswd file, overwriting any existing file.')
    parser.add_option('-D', action='store_true', dest='delete_user',
        default=False, help='Remove the given user from the password file.')
    options, args = parser.parse_args()
    def syntax_error(msg):
        """Utility function for displaying fatal error messages with usage
        help.
        """
        sys.stderr.write("Syntax error: " + msg)
        sys.stderr.write(parser.get_usage())
        sys.exit(1)
    if not (options.batch or options.delete_user):
        syntax_error("Only batch and delete modes are supported\n")
    # Non-option arguments
    if len(args) < 2:
        syntax_error("Insufficient number of arguments.\n")
    filename, username = args[:2]
    if options.delete_user:
        if len(args) != 2:
            syntax_error("Incorrect number of arguments.\n")
        password = None
    else:
        if len(args) != 3:
            syntax_error("Incorrect number of arguments.\n")
        password = args[2]
    passwdfile = HtpasswdFile(filename, create=options.create)
    if options.delete_user:
        passwdfile.delete(username)
    else:
        passwdfile.update(username, password)
    passwdfile.save()
if __name__ == '__main__':
    main()
#!/usr/bin/env python
#-*- coding: utf-8 -*-

# Configure your logger.
import logging, coloredlogs
logger = logging.getLogger('your-module')
logger.addHandler(coloredlogs.ColoredStreamHandler())

# Some examples.
logger.setLevel(logging.DEBUG)
logger.debug("this is a debugging message")
logger.info("this is an informational message")
logger.warn("this is a warning message")
logger.error("this is an error message")
logger.fatal("this is a fatal message")
logger.critical("this is a critical message")

#!/usr/bin/env /usr/bin/python
#-*- coding: utf-8 -*-
# (C) Lilian BESSON, 2013
# http://perso.crans.org/besson/bin/mail.py

import subprocess
def notify(msg, submsg="mail.py : auto mailer (with notify-send)"):
 ''' Notification using subprocess and notify-send.
 Also print the informations directly to the screen.

 Fails simply if notify-send is not found.'''
 try:
  subprocess.Popen(['notify-send', msg, submsg])
 except:
  print "notify-send : not-found !"
  return -1
 print "msg=%s\nsubmsg=%s" % (msg, submsg)

# Import smtplib for the actual sending function
import smtplib

# Import the email modules we'll need
from email.mime.text import MIMEText

signature="""\n
--
%s
###	Auto-sent by [mail.py], a simple Python 2.6 script.
###	Auto configure with SMTP server on localhost in the cr@ns server.
###	(c) by Lilian Besson
"""

def send_me_an_email(message, subj="[LOG] no object", me="jarvisATcransDOTorg".replace("AT","@").replace("DOT","."), you="jarvisATcransDOTorg".replace("AT","@").replace("DOT","."), my_identity="jarvis log"):
	""" Send a message [message] by email.
	The content of the email is [message], the subject is [subj].
	The sender is [me], not necessary a valid sender for the SMTP.
	The mail will be sent to [you].

	Auto configure with SMTP server on localhost in the cr@ns server (http://www.crans.org)

	(c) Lilian Besson, 2012-2013.
	"""
	notify(subj, message+"\n### ME="+me+" YOU="+you)
	msg = MIMEText(message+(signature % me))
	# The order is "important", to act like a real mail client !
	msg['From'] = my_identity+" <"+me+">"
	msg['To'] = you
	msg['Subject'] = subj
	# Send the message via our own SMTP server, but don't include the
	# envelope header.
	s = smtplib.SMTP('smtp.crans.org')
	# s = smtplib.SMTP('localhost')
	s.sendmail(me, [you], msg.as_string())
	s.quit()
	print "An email has been sent to %s, from %s <%s>." % (you, my_identity, me)
	print "Title of the email : \n%s" % subj
	print "Content of the email : \n%s" % message

import sys, os

if __name__ == '__main__':
  if '-h' in sys.argv or '--help' in sys.argv:
   print "  mail.py [message [subject]]\nUSAGE:"
   print send_me_an_email.__doc__
   sys.exit(0)
  if len(sys.argv)>2:
   subject = sys.argv[2]
  else:
   subject = "[LOG] jarvis"
  identity = "User = %s @ Host = %s." % (os.getenv("USER"), os.getenv("HOSTNAME"))
  message="### Content of the email :\n"
  if len(sys.argv)>1:
   message=message+str(sys.argv[1])
  message=message+("\n### Content of command line : %s.\n### From %s" % (str(sys.argv), identity))
  send_me_an_email(message, subj=subject)

#!/usr/bin/env /usr/bin/python
# -*- coding: utf-8; mode: python -*-
"""
A small Python 2/3 script to send an email from the crans.org network.

- Author: Lilian Besson, (C) 2014.
- Online: https://bitbucket.org/lbesson/bin/src/master/mail_ghost.py
- Licence: MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2/3 compatibility !

# Import sys to use arg of the script
import sys
# Import smtplib for the actual sending function
import smtplib
# Import the email modules we'll need
from email.mime.text import MIMEText
from base64 import b64decode


defaultaddress = "jarvisATcransDOTorg".replace("AT", "@").replace("DOT", ".")

signature = """
--
%s
"""


def send_me_an_email(message, subj="[LOG] no object", me=defaultaddress,
                     you=defaultaddress, my_identity="jarvis"):
    """ Send a message [message] by email.
    The content of the email is [message], the subject is [subj].
    The sender is [me], not necessary a valid sender for the SMTP.
    The mail will be sent to [you].

    Auto configured with SMTP server (smtp.crans.org) with SSL support for the cr@ns server (http://www.crans.org)

    (c) Lilian Besson, 2012-2014.
    """
    msg = MIMEText("%s" % (message + (signature % me)).replace("\n", '\n'), _charset="utf-8")
    # The order is "important", to act like a real mail client !
    msg['User-Agent'] = "smtplib.text/plain with python 2.7.6 on jarvis.crans.org (with http://perso.crans.org/besson/bin/mail_ghost.py)"
    # Identity
    msg['From'] = my_identity + " <" + me + ">"
    msg['Reply-To'] = me
    msg['To'] = you
    msg['Subject'] = subj
    # Send the message via our own SMTP server, but don't include the envelope header.
    # s = smtplib.SMTP('localhost')
    # s = smtplib.SMTP('smtp.crans.org', port=465) # Try 587 for starttls ?
    s = smtplib.SMTP_SSL('smtp.crans.org', port=465)  # Try 587 for starttls ?
    # See https://docs.python.org/2/library/smtplib.html#smtplib.SMTP.login
    s.login(b64decode('YmVzc29u'), b64decode(open('/home/lilian/crans.b64').readline()[:-1]))
    s.sendmail(me, [you], msg.as_string())
    s.quit()
    print("An email has been sent to <%s>, from %s <%s>." % (you, my_identity, me))
    print("Title of the email : <%s>" % subj)
    print("Content of the email : \n%s" % message)


if __name__ == '__main__':
    if '-h' in sys.argv or '--help' in sys.argv:
        print("mail_ghost.py [message [subject [you [me [my_identity]]]]]\nUSAGE:")
        print(send_me_an_email.__doc__)
    sys.exit(0)
    my_identity = sys.argv[5] if len(sys.argv) > 5 else "jarvis"
    me = sys.argv[4] if len(sys.argv) > 4 else defaultaddress
    you = sys.argv[3] if len(sys.argv) > 3 else defaultaddress
    subject = sys.argv[2] if len(sys.argv) > 2 else "[LOG] jarvis.crans.org"
    message = "%s" % (str(sys.argv[1])) if len(sys.argv) > 1 else "Empty message."
    send_me_an_email(message, subj=subject, you=you, me=me, my_identity=my_identity)

#!/usr/bin/env /usr/bin/python
# -*- coding: utf-8; mode: python -*-
"""
A small Python 2/3 script to send a HTML formatted email from the crans.org network.

- Author: Lilian Besson, (C) 2014.
- Online: https://bitbucket.org/lbesson/bin/src/master/mail_html.py
- Licence: MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2/3 compatibility !

# Import sys to use arg of the script
import sys
# Import smtplib for the actual sending function
import smtplib
# Import the email modules we'll need
from email.mime.text import MIMEText
from base64 import b64decode
# Import date module
from datetime import date
datetoday = date.today().isoformat()

defaultaddress = "jarvisATcransDOTorg".replace("AT", "@").replace("DOT", ".")

signature = """<br>-- <br>%s<br>
<img style=\"display: none; vibility: hidden;\" src=\"https://ga-beacon.appspot.com/UA-38514290-15/mail_html.py/""" + datetoday + "?pixel\" />"


def send_me_an_email(message, subj="[LOG] no object", me=defaultaddress,
                     you=defaultaddress, my_identity="jarvis (HTML)"):
    """ Send a message [message] by email.
    The content of the email is [message] (encoded as HTML), the subject is [subj].
    The sender is [me], not necessary a valid sender for the SMTP.
    The mail will be sent to [you].

    Auto configured with SMTP server (smtp.crans.org) with SSL support for the cr@ns server (http://www.crans.org)

    (c) Lilian Besson, 2014.
    """
    msg = MIMEText("%s" % (message + (signature % me)).replace("\n", '\n'), _charset=None, _subtype="html")
    # The order is "important", to act like a real mail client !
    # Change "Content-Type" to "text/html"
    msg['Content-Transfer-Encoding'] = "utf-8"
    msg['Content-Type'] = "text/html"
    msg['User-Agent'] = "smtplib.text/html with python 2.7.3 on jarvis.crans.org (with http://perso.crans.org/besson/bin/mail_html.py)"
    # Identity
    msg['From'] = my_identity + " <" + me + ">"
    msg['Reply-To'] = me
    msg['To'] = you
    msg['Subject'] = subj

    # Send the message via our own SMTP server, but don't include the envelope header.
    # s = smtplib.SMTP('localhost')
    # s = smtplib.SMTP('smtp.crans.org', port=465) # Try 587 for starttls ?
    s = smtplib.SMTP_SSL('smtp.crans.org', port=465)  # Try 587 for starttls ?
    # See https://docs.python.org/2/library/smtplib.html#smtplib.SMTP.login
    s.login(b64decode('YmVzc29u'), b64decode(open('/home/lilian/crans.b64').readline()[:-1]))
    s.sendmail(me, [you], msg.as_string())
    s.quit()
    print("A HTML email has been sent to <%s>, from %s <%s>." % (you, my_identity, me))
    print("Title of the email : <%s>" % subj)
    print("Content of the email : \n%s" % message)


if __name__ == '__main__':
    if '-h' in sys.argv or '--help' in sys.argv:
        print("mail_html.py [message [subject [you [me [my_identity]]]]]\nUSAGE:")
        print(send_me_an_email.__doc__)
    sys.exit(0)
    my_identity = sys.argv[5] if len(sys.argv) > 5 else "jarvis (HTML)"
    me = sys.argv[4] if len(sys.argv) > 4 else defaultaddress
    you = sys.argv[3] if len(sys.argv) > 3 else defaultaddress
    subject = sys.argv[2] if len(sys.argv) > 2 else "[LOG] jarvis.crans.org (HTML)"
    message = "%s" % (str(sys.argv[1])) if len(sys.argv) > 1 else "Empty message."
    send_me_an_email(message, subj=subject, you=you, me=me, my_identity=my_identity)

#!/usr/bin/env /usr/bin/python
# -*- coding: utf-8; mode: python -*-
"""
A small Python 2/3 script to send an email from the crans.org network, verbous mode.

- Author: Lilian Besson, (C) 2014.
- Online: https://bitbucket.org/lbesson/bin/src/master/mail.py
- Licence: MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2/3 compatibility !

# Import smtplib for the actual sending function
import smtplib
# Import the email modules we'll need
from email.mime.text import MIMEText
import sys
import os

signature = """\n
--
%s
"""


def send_me_an_email(message, subj="[LOG] no object", me="jarvisATcransDOTorg".replace("AT", "@").replace("DOT", "."), you="0628412257ATsfrDOTfr".replace("AT", "@").replace("DOT", "."), my_identity="jarvis log"):
    """ Send a message [message] by email.
    The content of the email is [message], the subject is [subj].
    The sender is [me], not necessary a valid sender for the SMTP.
    The mail will be sent to [you].

    Auto configure with SMTP server on localhost in the cr@ns server (http://www.crans.org)

    (c) Lilian Besson, 2012-2013.
    """
    msg = MIMEText(message + (signature % me))
    # The order is "important", to act like a real mail client !
    msg['From'] = my_identity + " <" + me + ">"
    msg['To'] = you
    msg['Subject'] = subj
    # Send the message via our own SMTP server, but don't include the
    # envelope header.
    s = smtplib.SMTP('smtp.crans.org')
    # s = smtplib.SMTP('localhost')
    s.sendmail(me, [you], msg.as_string())
    s.quit()
    # print("An email has been sent to %s, from %s <%s>." % (you, my_identity, me))
    # print("Title of the email : \n%s" % subj)
    # print("Content of the email : \n%s" % message)


if __name__ == '__main__':
    if '-h' in sys.argv or '--help' in sys.argv:
        print("  mail.py [message [subject]]\nUSAGE:")
        print(send_me_an_email.__doc__)
        sys.exit(0)
    if len(sys.argv) > 2:
        subject = sys.argv[2]
    else:
        subject = "[LOG] jarvis"
        message = ""
    if len(sys.argv) > 1:
        message = message + str(sys.argv[1])
    send_me_an_email(message, subj=subject)

#!/usr/bin/env python
# -*- coding: utf-8; mode: python -*-
#
# [SNIPPET_NAME: GtkSourceView Example]
# [SNIPPET_CATEGORIES: PyGTK, PyGTKSourceView]
# [SNIPPET_DESCRIPTION: Demonstrates using Actions with a gtk.Action and gtk.AccelGroup]

"""
This script shows the use of pygtksourceview module, the python wrapper
of gtksourceview C library.
It has been directly translated from test-widget.c
and modified to use gtksourceview2

Copyright (C) 2004 - Inigo Serna <inigoserna@telefonica.net>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

- Date: 25/05/12
- Author: Lilian Besson, (C) 2012.
- Online: https://bitbucket.org/lbesson/bin/
"""

##################################################################
from __future__ import print_function  # Python 2/3 compatibility !

import os
import os.path
import sys
import pygtk
pygtk.require('2.0')

import gtk
if gtk.pygtk_version < (2, 10, 0):
    print("PyGtk 2.10 ou supérieur est requis pour cet exemple")
    raise SystemExit

import gtksourceview2
import pango


# global vars
windows = []    # this list contains all view windows
MARK_CATEGORY_1 = 'one'
MARK_CATEGORY_2 = 'two'
DATADIR = '/usr/share'


def error_dialog(parent, msg):
    dialog = gtk.MessageDialog(parent,
                               gtk.DIALOG_DESTROY_WITH_PARENT,
                               gtk.MESSAGE_ERROR,
                               gtk.BUTTONS_OK,
                               msg)
    dialog.run()
    dialog.destroy()


def remove_all_marks(buffer):
    begin, end = buffer.get_bounds()
    buffer.remove_source_marks(begin, end)


def load_file(buffer, path):
    buffer.begin_not_undoable_action()
    try:
        txt = open(path).read()
    except:
        return False
    buffer.set_text(txt)
    buffer.set_data('filename', path)
    buffer.end_not_undoable_action()

    buffer.set_modified(False)
    buffer.place_cursor(buffer.get_start_iter())
    return True


# buffer creation
def open_file(buffer, filename):
    # get the new language for the file mimetype
    manager = buffer.get_data('languages-manager')

    # essai pour charger un style particulier
    # gtk-source-style-scheme-manager-get-default
    try:
        stylescheme = buffer.get_style_scheme()  # un autre si possible
    except:
        # XXX A modifier si on veut un autre
        manager2 = buffer.get_data('styles-scheme-manager')
        print(manager2)
        stylescheme = manager2.get_scheme("naereen")
    print(stylescheme)
    # print(buffer)
    # stylescheme = manager.get_style_scheme("Naereen")
    buffer.set_style_scheme(stylescheme)

    if os.path.isabs(filename):
        path = filename
    else:
        path = os.path.abspath(filename)

    language = manager.guess_language(filename)
    if language:
        buffer.set_highlight_syntax(True)
        buffer.set_language(language)
    else:
        print('Aucune description de langage trouvé pour le fichier "%s"' % filename)
        buffer.set_highlight_syntax(False)

    remove_all_marks(buffer)
    load_file(buffer, path)  # TODO: check return
    return True


# Printing callbacks
def begin_print_cb(operation, context, compositor):
    while not compositor.paginate(context):
        pass
    n_pages = compositor.get_n_pages()
    operation.set_n_pages(n_pages)


def draw_page_cb(operation, context, page_nr, compositor):
    compositor.draw_page(context, page_nr)


# Action callbacks
def numbers_toggled_cb(action, sourceview):
    sourceview.set_show_line_numbers(action.get_active())


def marks_toggled_cb(action, sourceview):
    sourceview.set_show_line_marks(action.get_active())


def margin_toggled_cb(action, sourceview):
    sourceview.set_show_right_margin(action.get_active())


def auto_indent_toggled_cb(action, sourceview):
    sourceview.set_auto_indent(action.get_active())


def insert_spaces_toggled_cb(action, sourceview):
    sourceview.set_insert_spaces_instead_of_tabs(action.get_active())


def tabs_toggled_cb(action, action2, sourceview):
    sourceview.set_tab_width(action.get_current_value())


def new_view_cb(action, sourceview):
    window = create_view_window(sourceview.get_buffer(), sourceview)
    window.set_default_size(683, 700)
    window.show()


def print_cb(action, sourceview):
    window = sourceview.get_toplevel()
    buffer = sourceview.get_buffer()

    compositor = gtksourceview2.print_compositor_new_from_view(sourceview)
    compositor.set_wrap_mode(gtk.WRAP_CHAR)
    compositor.set_highlight_syntax(True)
    compositor.set_print_line_numbers(5)
    compositor.set_header_format(False, 'Imprimé dans %A', None, '%F')
    filename = buffer.get_data('filename')
    compositor.set_footer_format(True, '%T', filename, 'Page %N/%Q')
    compositor.set_print_header(True)
    compositor.set_print_footer(True)

    print_op = gtk.PrintOperation()
    print_op.connect("begin-print", begin_print_cb, compositor)
    print_op.connect("draw-page", draw_page_cb, compositor)
    res = print_op.run(gtk.PRINT_OPERATION_ACTION_PRINT_DIALOG, window)

    if res == gtk.PRINT_OPERATION_RESULT_ERROR:
        error_dialog(window, "Une erreur est survenue lors de l'impression du fichier :\n\n" + filename)
    elif res == gtk.PRINT_OPERATION_RESULT_APPLY:
        print('Le fichier suivant a bien été imprimé "%s"' % filename)


# Buffer action callbacks
def open_file_cb(action, buffer):
    chooser = gtk.FileChooserDialog('Ouvrir un fichier ...', None,
                                    gtk.FILE_CHOOSER_ACTION_OPEN,
                                    (gtk.STOCK_CANCEL, gtk.RESPONSE_CANCEL,
                                     gtk.STOCK_OPEN, gtk.RESPONSE_OK))
    response = chooser.run()
    if response == gtk.RESPONSE_OK:
        filename = chooser.get_filename()
        if filename:
            open_file(buffer, filename)
    chooser.destroy()


def update_cursor_position(buffer, view):
    tabwidth = view.get_tab_width()
    pos_label = view.get_data('pos_label')
    iter = buffer.get_iter_at_mark(buffer.get_insert())
    nchars = iter.get_offset()
    row = iter.get_line() + 1
    start = iter.copy()
    start.set_line_offset(0)
    col = 0
    while start.compare(iter) < 0:
        if start.get_char() == '\t':
            col += tabwidth - col % tabwidth
        else:
            col += 1
        start.forward_char()
    pos_label.set_text('[Caractère: %d, Ligne: %d, Colonne: %d]' % (nchars, row, col + 1))


def move_cursor_cb(buffer, cursoriter, mark, view):
    update_cursor_position(buffer, view)


def window_deleted_cb(widget, ev, view):
    if windows[0] == widget:
        gtk.main_quit()
    else:
        # remove window from list
        windows.remove(widget)
        # we return False since we want the window destroyed
        return False
    return True


def button_press_cb(view, ev):
    buffer = view.get_buffer()
    if not view.get_show_line_marks():
        return False
    # check that the click was on the left gutter
    if ev.window == view.get_window(gtk.TEXT_WINDOW_LEFT):
        if ev.button == 1:
            mark_category = MARK_CATEGORY_1
        else:
            mark_category = MARK_CATEGORY_2
        x_buf, y_buf = view.window_to_buffer_coords(gtk.TEXT_WINDOW_LEFT,
                                                    int(ev.x), int(ev.y))
        # get line bounds
        line_start = view.get_line_at_y(y_buf)[0]

        # get the markers already in the line
        mark_list = buffer.get_source_marks_at_line(line_start.get_line(), mark_category)
        # search for the marker corresponding to the button pressed
        for m in mark_list:
            if m.get_category() == mark_category:
                # a marker was found, so delete it
                buffer.delete_mark(m)
                break
        else:
            # no marker found, create one
            buffer.create_source_mark(None, mark_category, line_start)

    return False


# Actions & UI definition
buffer_actions = [
    ('Open', gtk.STOCK_OPEN, '_Ouvre', '<control>O', 'Ouvre un fichier', open_file_cb),
    ('Quit', gtk.STOCK_QUIT, '_Quitte', '<control>Q', 'Quitte l\'application', gtk.main_quit)
]

view_actions = [
    ('FileMenu', None, '_Fichier'),
    ('ViewMenu', None, '_Vue'),
    ('Print', gtk.STOCK_PRINT, '_Impression', '<control>P', 'Print the file', print_cb),
    ('NewView', gtk.STOCK_NEW, '_Nouvelle Vue', None, 'Create a new view of the file', new_view_cb),
    ('TabsWidth', None, '_Largeur des tabulations')
]

toggle_actions = [
    ('ShowNumbers', None, 'Montre les numéros de _lignes', None, 'Toggle visibility of line numbers in the left margin', numbers_toggled_cb, False),
    ('ShowMarkers', None, 'Montre les _Marqueurs', None, 'Toggle visibility of markers in the left margin', marks_toggled_cb, False),
    ('ShowMargin', None, 'Montre les M_arges', None, 'Toggle visibility of right margin indicator', margin_toggled_cb, False),
    ('AutoIndent', None, 'Activer l\'_auto-indentation', None, 'Toggle automatic auto indentation of text', auto_indent_toggled_cb, False),
    ('InsertSpaces', None, 'Insérer des e_spaces au lieu des tabulations', None, 'Whether to insert space characters when inserting tabulations', insert_spaces_toggled_cb, False)
]

radio_actions = [
    ('TabsWidth4', None, '4', None, 'Set tabulation width to 4 spaces', 4),
    ('TabsWidth6', None, '6', None, 'Set tabulation width to 6 spaces', 6),
    ('TabsWidth8', None, '8', None, 'Set tabulation width to 8 spaces', 8),
    ('TabsWidth10', None, '10', None, 'Set tabulation width to 10 spaces', 10),
    ('TabsWidth12', None, '12', None, 'Set tabulation width to 12 spaces', 12),
    ('TabsWidth14', None, '14', None, 'Set tabulation width to 14 spaces', 14)
]

view_ui_description = """
<ui>
  <menubar name='MainMenu'>
    <menu action='FileMenu'>
      <menuitem action='NewView'/>
      <placeholder name="FileMenuAdditions"/>
      <separator/>
      <menuitem action='Print'/>
    </menu>
    <menu action='ViewMenu'>
      <separator/>
      <menuitem action='ShowNumbers'/>
      <menuitem action='ShowMarkers'/>
      <menuitem action='ShowMargin'/>
      <separator/>
      <menuitem action='AutoIndent'/>
      <menuitem action='InsertSpaces'/>
      <separator/>
      <menu action='TabsWidth'>
        <menuitem action='TabsWidth4'/>
        <menuitem action='TabsWidth6'/>
        <menuitem action='TabsWidth8'/>
        <menuitem action='TabsWidth10'/>
        <menuitem action='TabsWidth12'/>
        <menuitem action='TabsWidth14'/>
      </menu>
    </menu>
  </menubar>
</ui>
"""

buffer_ui_description = """
<ui>
  <menubar name='MainMenu'>
    <menu action='FileMenu'>
      <placeholder name="FileMenuAdditions">
        <menuitem action='Open'/>
      </placeholder>
      <separator/>
      <menuitem action='Quit'/>
    </menu>
    <menu action='ViewMenu'>
    </menu>
  </menubar>
</ui>
"""


def create_view_window(buffer, sourceview=None):
    # window
    window = gtk.Window(gtk.WINDOW_TOPLEVEL)
    window.set_border_width(0)
    window.set_title('MOcaml FileViewer [Naereen test]')
    windows.append(window)  # this list contains all view windows

    # view
    view = gtksourceview2.View(buffer)
    buffer.connect('mark_set', move_cursor_cb, view)
    buffer.connect('changed', update_cursor_position, view)
    view.connect('button-press-event', button_press_cb)
    window.connect('delete-event', window_deleted_cb, view)

    # action group and UI manager
    action_group = gtk.ActionGroup('ViewActions')
    action_group.add_actions(view_actions, view)
    action_group.add_toggle_actions(toggle_actions, view)
    action_group.add_radio_actions(radio_actions, -1, tabs_toggled_cb, view)

    ui_manager = gtk.UIManager()
    ui_manager.insert_action_group(action_group, 0)
    # save a reference to the ui manager in the window for later use
    window.set_data('ui_manager', ui_manager)
    accel_group = ui_manager.get_accel_group()
    window.add_accel_group(accel_group)
    ui_manager.add_ui_from_string(view_ui_description)

    # misc widgets
    vbox = gtk.VBox(0, False)
    sw = gtk.ScrolledWindow()
    sw.set_shadow_type(gtk.SHADOW_IN)
    pos_label = gtk.Label('Position')
    view.set_data('pos_label', pos_label)
    menu = ui_manager.get_widget('/MainMenu')

    # layout widgets
    window.add(vbox)
    vbox.pack_start(menu, False, False, 0)
    vbox.pack_start(sw, True, True, 0)
    sw.add(view)
    vbox.pack_start(pos_label, False, False, 0)

    # setup view
    font_desc = pango.FontDescription('monospace 10')
    if font_desc:
        view.modify_font(font_desc)

    # change view attributes to match those of sourceview
    if sourceview:
        action = action_group.get_action('ShowNumbers')
        action.set_active(sourceview.get_show_line_numbers())
        action = action_group.get_action('ShowMarkers')
        action.set_active(sourceview.get_show_line_marks())
        action = action_group.get_action('ShowMargin')
        action.set_active(sourceview.get_show_right_margin())
        action = action_group.get_action('AutoIndent')
        action.set_active(sourceview.get_auto_indent())
        action = action_group.get_action('InsertSpaces')
        action.set_active(sourceview.get_insert_spaces_instead_of_tabs())
        action = action_group.get_action('TabsWidth%d' % sourceview.get_tab_width())
        if action:
            action.set_active(True)

    # add marker pixbufs
    pixbuf = gtk.gdk.pixbuf_new_from_file(os.path.join(DATADIR,
                                                       'pixmaps/apple-green.png'))
    if pixbuf:
        view.set_mark_category_pixbuf(MARK_CATEGORY_1, pixbuf)
    else:
        print('could not load marker 1 image.  Spurious messages might get triggered')
    pixbuf = gtk.gdk.pixbuf_new_from_file(os.path.join(DATADIR,
                                                       'pixmaps/apple-red.png'))
    if pixbuf:
        view.set_mark_category_pixbuf(MARK_CATEGORY_2, pixbuf)
    else:
        print('could not load marker 2 image.  Spurious messages might get triggered')

    vbox.show_all()

    return window


def create_main_window(buffer):
    window = create_view_window(buffer)
    ui_manager = window.get_data('ui_manager')

    # buffer action group
    action_group = gtk.ActionGroup('BufferActions')
    action_group.add_actions(buffer_actions, buffer)
    ui_manager.insert_action_group(action_group, 1)
    # merge buffer ui
    ui_manager.add_ui_from_string(buffer_ui_description)

    # preselect menu checkitems
    groups = ui_manager.get_action_groups()
    # retrieve the view action group at position 0 in the list
    action_group = groups[0]
    action = action_group.get_action('ShowNumbers')
    action.set_active(True)
    action = action_group.get_action('ShowMarkers')
    action.set_active(True)
    action = action_group.get_action('ShowMargin')
    action.set_active(False)
    action = action_group.get_action('AutoIndent')
    action.set_active(True)
    action = action_group.get_action('InsertSpaces')
    action.set_active(False)
    action = action_group.get_action('TabsWidth8')
    action.set_active(True)

    return window


def main(args):
    # create buffer
    lm = gtksourceview2.LanguageManager()
    sm = gtksourceview2.StyleSchemeManager()
    buffer = gtksourceview2.Buffer()
    buffer.set_data('languages-manager', lm)
    buffer.set_data('styles-scheme-manager', sm)

    # parse arguments
    if len(args) >= 2:
        open_file(buffer, args[1])
    else:
        sys.exit("Aucun argument")
        open_file(buffer, args[0])

    # create first window
    window = create_main_window(buffer)
    window.set_default_size(683, 700)
    # window.set_icon_from_file("/home/lilian/.mocaml/.mocamlViewFile.jpg")
    window.show()

    # main loop
    gtk.main()


if __name__ == '__main__':
    if '--debug' in sys.argv:
        import pdb
        pdb.run('main(sys.argv)')
    else:
        main(sys.argv)

/home/lilian/publis/mosaic.git/mosaic.py
#! /usr/bin/env python2
# -*- coding: utf-8; mode: python -*-
""" Small experimental bot for our Slack team at SCEE (https://sceeteam.slack.com/), CentraleSupélec campus de Rennes.

It reads a file full of quotes (from TV shows), and post one randomly at random times on the channel #random.

Requirements:
- If progressbar (https://pypi.python.org/pypi/progressbar) is installed, use it.

About:
- *Date:* 13/02/2017.
- *Author:* Lilian Besson, (C) 2017
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

import sys
import os
import random
from os.path import join, expanduser
import time

import logging
logging.basicConfig(
    format="%(asctime)s  %(levelname)s: %(message)s",
    datefmt='%m-%d-%Y %I:%M:%S %p',
    level=logging.INFO
)

from numpy.random import poisson
from slackclient import SlackClient

# --- Parameters of the bot

MINUTES = 60
HOURS = 60 * MINUTES

QUOTE_FILE = os.getenv("quotes", expanduser(join("~", ".quotes.txt")))

SLACK_TOKEN = open(expanduser(join("~", ".slack_api_key")), 'r').readline().strip()

USE_CHANNEL = False  # DEBUG
USE_CHANNEL = True
SLACK_USER = "@lilian"
SLACK_CHANNEL = "#random"

MEAN_TIME = (12 * HOURS) if USE_CHANNEL else 30

URL = "https://bitbucket.org/lbesson/bin/src/master/my-small-slack-bot.py"

POSITIVE_REACTIONS = ['up', '+1', 'thumbsup']
NEGATIVES_REACTIONS = ['down', '-1', 'thumbsdown']


# --- Functions

def sleeptime(lmbda=MEAN_TIME, use_poisson=True):
    """Random time until next message."""
    if use_poisson:
        return poisson(lmbda)
    else:
        return lmbda


def sleep_bar(secs):
    """Sleep with a bar, or not"""
    try:
        # From progressbar example #3, https://github.com/niltonvolpato/python-progressbar/blob/master/examples.py#L67
        from progressbar import Bar, ETA, ProgressBar, ReverseBar
        widgets = [Bar('>'), ' ', ETA(), ' ', ReverseBar('<')]
        pbar = ProgressBar(widgets=widgets, maxval=100).start()
        for i in range(100):
            # do something
            time.sleep(secs / 110.)
            pbar.update(i)
        pbar.finish()
    except ImportError:
        time.sleep(secs)


def random_line(lines):
    """Read the file and select one line."""
    try:
        return random.choice(lines).replace('`', '').replace('_', '')
    except:  # Default quote
        logging.info("Failed to read a random line from this list with {} lines...".format(len(lines)))  # DEBUG
        return "I love you !"


def get_reactions(list_of_ts_channel, sc):
    """Get the reaction of users on all the messages sent by the bot, to increase or decrease the frequency of messages."""
    scale_factor = 1.
    try:
        for (ts, c) in list_of_ts_channel:
            # https://api.slack.com/methods/reactions.get
            reaction = sc.api_call(
                "reactions.get", channel=c, timestamp=ts
            )
            logging.debug("reaction =", reaction)
            if 'message' not in reaction:
                continue
            text = {t['name']: t['count'] for t in reaction['message']['reactions']}
            logging.info("text =", text)
            if any(s in text.keys() for s in POSITIVE_REACTIONS):
                nb = max([0.5] + [text[s] for s in POSITIVE_REACTIONS if s in text.keys()])
                logging.info("I read {} positive reactions ...".format(int(nb)))
                scale_factor /= 2 * nb
            elif any(s in text for s in NEGATIVES_REACTIONS):
                nb = max([0.5] + [text[s] for s in NEGATIVES_REACTIONS if s in text.keys()])
                logging.info("I read {} negative reactions ...".format(int(nb)))
                scale_factor *= 2 * nb
            elif "rage" in text:
                raise ValueError("One user reacted with :rage:, the bot will quit...")
        return scale_factor
    except KeyError:
        return scale_factor


def send(text, sc, use_channel=USE_CHANNEL):
    """Send text to channel SLACK_CHANNEL with client sc.

    - https://github.com/slackapi/python-slackclient#sending-a-message
    """
    channel = SLACK_CHANNEL if use_channel else SLACK_USER
    text = "{}\n> (Sent by an _open-source_ Python script :snake:, {}, written by Lilian Besson)".format(text, URL)
    logging.info("Sending the message '{}' to channel/user {} ...".format(text, channel))
    # https://api.slack.com/methods/chat.postMessage
    return sc.api_call(
        "chat.postMessage", channel=channel, text=text,
        username="Citations aléatoires", icon_emoji=":robot_face:"
    )


def loop(quote_file=QUOTE_FILE):
    """Main loop."""
    logging.info("Starting my Slack bot, reading random quotes from the file {}...".format(quote_file))
    # Get list of quotes and parameters
    the_quote_file = open(quote_file, 'r')
    lines = the_quote_file.readlines()
    sc = SlackClient(SLACK_TOKEN)
    lmbda = MEAN_TIME
    list_of_ts_channel = []
    # Start loop
    while True:
        # 1. get random quote
        text = random_line(lines)
        logging.info("New message:\n{}".format(text))
        response = send(text, sc)
        # logging.debug("  response =", response)
        # 2. sleep until next quote
        secs = sleeptime(lmbda)
        str_secs = time.asctime(time.localtime(time.time() + secs))
        logging.info("  ... Next message in {} seconds, at {} ...".format(secs, str_secs))
        sleep_bar(secs)
        # 3. get response
        try:
            ts, c = response['ts'], response['channel']
            # logging.debug("  ts, c =", ts, c)
            list_of_ts_channel.append((ts, c))
            # Get reaction from users on the messages already posted
            scale_factor = get_reactions(list_of_ts_channel, sc)
            lmbda = scale_factor * MEAN_TIME  # Don't accumulate this!
        except KeyError:
            pass
        logging.info("  Currently, the mean time between messages is {} ...".format(lmbda))
    return 0


# --- Main script

if __name__ == '__main__':
    quote_file = sys.argv[1] if len(sys.argv) > 1 else QUOTE_FILE
    sys.exit(loop(quote_file))

# End of my-small-slack-bot.py

#!/usr/bin/env python
# -*- coding: utf-8; mode: python -*-
#
# Terminal visualization of 2D numpy arrays
# Copyright (c) 2009  Nicolas P. Rougier
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# this program.  If not, see <http://www.gnu.org/licenses/>.
# ------------------------------------------------------------------------------
"""
Terminal visualization of 2D numpy arrays
Using extended color capability of terminal (256 colors), the termimshow function
renders a 2D numpy array within terminal.
"""

from __future__ import print_function, division  # Python 2/3 compatibility !

import sys
import numpy as np

try:
    try:
        from ansicolortags import clearScreen
    except ImportError as e:
        print("Optional dependancy (ansicolortags) is not available, trying to import the old version (ANSIColors).")
        print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")
        from ANSIColors import clearScreen
except ImportError:
    print("Optional dependancy (ANSIColors) is not available, not using clearScreen().")
    print("  You can install it with : 'pip install ANSIColors-balises' (or sudo pip)...")

    def clearScreen():
        pass


class ColorMap:
    """ A colormap is used to map scalar values to colors. It is build by
        adding couples of (value,color) where value must be between 0 and 1.
        - The 'scale' method allows to specify the range of the colormap and
        - the 'color' method then returns a color for any value.
    """

    def __init__(self, colors, name=None):
        self.colors = colors
        self.min = 0
        self.max = 1
        if name:
            self.name = name
        else:
            self.name = "Default"

    def __str__(self):
        return "ColorMap (name = {}): min = {}, max = {}, colors = {}.".format(self.name, self.min, self.max, self.colors)

    def scale(self, vmin, vmax):
        self.min, self.max = vmin, vmax

    def color(self, value):
        """ Return the color corresponding to value. """
        if not len(self.colors):
            return (0, 0, 0)
        elif len(self.colors) == 1:
            return self.colors[0][1]
        elif value < self.min:
            return self.colors[0][1]
        elif value > self.max:
            return self.colors[-1][1]
        value = (value - self.min) / (self.max - self.min)
        sup_color = self.colors[0]
        inf_color = self.colors[-1]
        for i in range(len(self.colors) - 1):
            if value < self.colors[i + 1][0]:
                inf_color = self.colors[i]
                sup_color = self.colors[i + 1]
                break
        r = (value - inf_color[0]) / (sup_color[0] - inf_color[0])
        if r < 0:
            r = -r
        color = [sup_color[1][0] * r + inf_color[1][0] * (1 - r),
                 sup_color[1][1] * r + inf_color[1][1] * (1 - r),
                 sup_color[1][2] * r + inf_color[1][2] * (1 - r)]
        return color


# Some colormaps
CM_IceAndFire = ColorMap([(0.00, (0.0, 0.0, 1.0)),
                         (0.25, (0.0, 0.5, 1.0)),
                         (0.50, (1.0, 1.0, 1.0)),
                         (0.75, (1.0, 1.0, 0.0)),
                         (1.00, (1.0, 0.0, 0.0))], "Ice and Fire")
# ==> GAME OF THRONES !

CM_Ice = ColorMap([(0.00, (0.0, 0.0, 1.0)),
                   (0.50, (0.5, 0.5, 1.0)),
                   (1.00, (1.0, 1.0, 1.0))], "Ice")

CM_Fire = ColorMap([(0.00, (1.0, 1.0, 1.0)),
                    (0.50, (1.0, 1.0, 0.0)),
                    (1.00, (1.0, 0.0, 0.0))], "Fire")

CM_Hot = ColorMap([(0.00, (0.0, 0.0, 0.0)),
                   (0.33, (1.0, 0.0, 0.0)),
                   (0.66, (1.0, 1.0, 0.0)),
                   (1.00, (1.0, 1.0, 1.0))], "Hot")

CM_Grey = ColorMap([(0.00, (0.0, 0.0, 0.0)),
                    (1.00, (1.0, 1.0, 1.0))], "Grey")


def termimshow(Z, vmin=None, vmax=None, cmap=CM_Hot, show_cmap=True):
    """ Show a 2D numpy array using terminal colors. """

    if len(Z.shape) != 2:
        print("Cannot display non 2D array")
        return

    vmin = vmin or Z.min()
    vmax = vmax or Z.max()
    cmap.scale(vmin, vmax)

    # Build initialization string that setup terminal colors
    init = ''
    for i in range(240):
        v = cmap.min + (i / 240.0) * (cmap.max - cmap.min)
        r, g, b = cmap.color(v)
        init += "\x1b]4;%d;rgb:%02x/%02x/%02x\x1b\\" % (16 + i, int(r * 255), int(g * 255), int(b * 255))

    # Build array data string
    data = ''
    for i in range(Z.shape[0]):
        for j in range(Z.shape[1]):
            c = 16 + int(((Z[Z.shape[0] - i - 1, j] - cmap.min) / (cmap.max - cmap.min)) * 239)
            if (c < 16):
                c = 16
            elif (c > 255):
                c = 255
            data += "\x1b[48;5;%dm  " % c
            u = cmap.max - (i / float(Z.shape[0] - 1)) * ((cmap.max - cmap.min))
        if show_cmap:
            data += "\x1b[0m  "
            data += "\x1b[48;5;%dm  " % (16 + (1 - i / float(Z.shape[0])) * 239)
            data += "\x1b[0m %+.2f" % u
        data += "\n"

    sys.stdout.write(init + '\n')
    sys.stdout.write(data)


if __name__ == '__main__':
    dx, dy = .15, .15
    x = np.arange(-3.0, 3.75, dx)
    y = np.arange(-3.0, 3.75, dy)
    X, Y = np.meshgrid(x, y)

    # Example 1 :
    def func1(x, y):
        return (1 - x / 2 + x**5 + y**3) * np.exp(- x**2 - y**2)
    Z1 = np.array(func1(X, Y))
    print("Using color map : Hot.")
    termimshow(Z1, cmap=CM_Hot)
    print(raw_input("[Enter to continue]"))
    clearScreen()

    # Example 2 :
    def func2(x, y):
        return (1 - x / 4 + x**4 + y**3) * np.exp(- x**2 - y**2)
    Z2 = np.array(func2(X, Y))
    print("Using color map : IceAndFire.")
    termimshow(Z2, cmap=CM_IceAndFire)
    print(raw_input("[Enter to continue]"))
    clearScreen()

    # Example 3 :
    def func3(x, y):
        return (1 - x / 4 + x**2 + y**2) * np.exp(- x**2 - y**2)
    Z3 = np.array(func3(X, Y))
    print("Using color map : Ice.")
    termimshow(Z3, cmap=CM_Ice)
    print(raw_input("[Enter to continue]"))
    clearScreen()

    # Example 4 :
    def func4(x, y):
        return (1 - x / 4 + x**3 + y**1) * np.exp(- x**2 - y**2)
    Z4 = np.array(func4(X, Y))
    print("Using color map : Fire.")
    termimshow(Z4, cmap=CM_Fire)
    print(raw_input("[Enter to continue]"))
    clearScreen()

    # Example 5 :
    def func5(x, y):
        return (1 + 50 * y**2) * np.exp(- x**2 - y**2)
    Z5 = np.array(func5(X, Y))
    print("Using color map : Grey.")
    termimshow(Z5, cmap=CM_Grey)

#! /usr/bin/env python
# -*- coding: utf-8; mode: python -*-

"""
PasteBox script for http://p.boxnet.eu/api/
Copyright (C) 2011 <sinuc at boxnet dot eu>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

pastebox.py is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with pastebox.py.  If not, see <http://www.gnu.org/licenses/>.
"""

from __future__ import print_function  # Python 2/3 compatibility !
import sys
import urllib.request
import urllib.parse
import urllib.error
import getopt

URL = 'http://p.boxnet.eu/'


class PasteBox:
    def __init__(self):
        self.replyid = 0
        self.mode = 'text'
        self.ttl = 86400
        self.authhash = None

    def create(self, content):
        VALUES = {'content': content,
                  'replyid': self.replyid,
                  'mode': self.mode,
                  'ttl': self.ttl}

        if self.authhash:
            VALUES['authhash'] = self.authhash

        data = urllib.parse.urlencode(VALUES)
        req = urllib.request.Request('%sapi/' % URL, data)
        response = urllib.request.urlopen(req)
        page = response.read()
        return '%s%s' % (URL, page.decode('utf-8').replace('\n', ''))

    def read(self, pasteid):
        if not self.authhash:
            url = '%s%s/download' % (URL, pasteid)
        else:
            url = '%s%s/%s/download' % (URL, pasteid, self.authhash)
        req = urllib.request.Request(url)
        try:
            res = urllib.request.urlopen(req)
        except urllib.error.HTTPError:
            res = None
        return res

    def stdout(self, pasteid):
        print("reading %s.." % pasteid)
        response = self.read(pasteid)
        if response:
            for i in response.readlines():
                print(i.decode('utf-8').replace('\n', ''))
        else:
            print("Paste does not exist")

    def download(self, pasteid):
        print("downloading %s.." % pasteid)
        response = self.read(pasteid)
        if response:
            x = open('pastebox_%s.txt' % pasteid, 'w')
            for line in response.readlines():
                x.write(line.decode('utf-8'))
            x.close()
            print('stored as: pastebox_%s.txt' % pasteid)
        else:
            print("Paste does not exist")


def usage():
    print("""
    Usage: pastebox.py <option> <pasteid|file> ..

    Options:
    --authhash=<authhash>   authentication hash for additional protection ([a-z0-9])
    --ttl=<ttl>             time to live in seconds
    -s|--stdout             print paste to stdout
    -d|--download           download and store to file

    Usage examples:
    lspci|pastebox.py        Upload input by piping
    pastebox.py foo.c bar.h  Upload several files
    pastebox.py --authhash=foo -s 1234  Print Paste to stdout using authhash
    """)


def main(argv):
    try:
        opts, args = getopt.getopt(argv, "sdh", ["stdout", "download", "mode=", "authhash=", "ttl=", "help"])
    except getopt.GetoptError:
        usage()
        sys.exit(2)

    paste = PasteBox()

    for opt, arg in opts:
        if opt in ("--mode"):
            if arg:
                paste.mode = arg
            else:
                print("You need to provide a mode see usage (--help)")
                sys.exit(2)

        if opt in ("--authhash"):
            if arg:
                paste.authhash = arg
            else:
                print("You need to provide an authhash see usage (--help)")
                sys.exit(2)

        if opt in ("--ttl"):
            if arg:
                paste.ttl = arg
            else:
                print("You need to provide the TTL see usage (--help)")
                sys.exit(2)

        if opt in ("-h", "--help"):
            usage()
            sys.exit()
        elif opt == '-s' or opt == '--stdout':
            for pasteid in args:
                paste.stdout(pasteid)
        elif opt == '-d' or opt == '--download':
            for pasteid in args:
                paste.download(pasteid)

    if not opts and args:
        for file in args:
            try:
                print("%s: %s" % (file, paste.create(''.join(open(file, 'r').readlines()))))
            except IOError:
                print("skipping %s: file does not exist" % file)

    if not sys.stdin.isatty():
        paste = paste.create(' '.join(sys.stdin.readlines()))
        print(paste)

if __name__ == "__main__":
    main(sys.argv[1:])

#!/usr/bin/env python
# -*- coding: utf-8; mode: python -*-
""" A script to automatically plot notes for corrected written exams.

(C) Lilian BESSON ~ Janvier 2014
"""

from __future__ import print_function  # Python 2/3 compatibility !

try:
    try:
        from ansicolortags import printc as print
    except ImportError as e:
        print("Optional dependancy (ansicolortags) is not available, using regular print function.")
        print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")
        from ANSIColors import printc as print
except ImportError:
    print("Optional dependancy (ANSIColors) is not available, using regular print function.")
    print("  You can install it with : 'pip install ANSIColors-balises' (or sudo pip)...")


import sys
import csv as csv  #: To read .csv files
import numpy as np  #: To compute and use math tools
import pylab  #: To plot

#: Read the datas
csv_file = sys.argv[1]
csv_name = csv_file[:-3]

#: Load in the csv file
csv_file_object = csv.reader(open(csv_file, 'rb'))

#: Skip the fist line as it is a header
header = csv_file_object.next()

data = []
for row in csv_file_object:
    data.append(row)  # adding each row to the data variable
#: Then convert from a list to an array
data = np.array(data)

#: Just the notes
notes = data[::, 1].astype(np.float)
nbnotes = np.size(notes)

#: Sort decreasingly
ind = np.argsort(notes)
data = data[ind[::-1]]
notes = notes[ind[::-1]]

#: The grades are between 0 and this value. Default is the French convention: 20.
noteMax = 20

###################################################################
# I want now to produce annex files
f = file(csv_name + "table", 'w')
f.write("%% Notes from '%s'" % f.name)
for i in range(nbnotes):
    f.write("\n%s & %g/%i \\\\" % (data[i, 0], notes[i], noteMax))
    print("I wrote <blue>'%s & %g/%i \\\\'<white> in <u>%s<U>..." % (data[i, 0], notes[i], noteMax, f.name))

minimale = np.min(notes)
f = file(csv_name + "minimale", 'w')
f.write("%g/%i" % (minimale, noteMax))
print("I wrote the value of minimale (<cyan>%g<white>) to <u>%s<U>..." % (minimale, f.name))

argminimale = data[np.argmin(notes), 0]
f = file(csv_name + "argminimale", 'w')
f.write("%s" % argminimale)
print("I wrote the value of argminimale (<cyan>%s<white>) to <u>%s<U>..." % (argminimale, f.name))

maximale = np.max(notes)
f = file(csv_name + "maximale", 'w')
f.write("%g/%i" % (maximale, noteMax))
print("I wrote the value of maximale (<cyan>%g<white>) to <u>%s<U>..." % (maximale, f.name))

argmaximale = data[np.argmax(notes), 0]
f = file(csv_name + "argmaximale", 'w')
f.write("%s" % argmaximale)
print("I wrote the value of argmaximale (<cyan>%s<white>) to <u>%s<U>..." % (argmaximale, f.name))

moyenne = np.mean(notes)
f = file(csv_name + "moyenne", 'w')
f.write("%2.2g/%i" % (moyenne, noteMax))
print("I wrote the value of moyenne (<cyan>%2.2g<white>) to <u>%s<U>..." % (moyenne, f.name))

ecarttype = np.std(notes)
f = file(csv_name + "ecarttype", 'w')
f.write("%2.2g" % ecarttype)
print("I wrote the value of ecarttype (<cyan>%2.2g<white>) to <u>%s<U>..." % (ecarttype, f.name))

variance = np.var(notes)
f = file(csv_name + "variance", 'w')
f.write("%2.2g" % variance)
print("I wrote the value of variance (<cyan>%2.2g<white>) to <u>%s<U>..." % (variance, f.name))

###################################################################
# I want now to plot some graphics about the datas, with matplotlib
print("\nPloting some graphics from <u>%s<U> (<neg><green>%i student(s)<Neg><white>)..." % (csv_name + "csv", nbnotes))

#: Graph options
pylab.xlabel(u"Notes (entre $0$ et $%i$)" % noteMax)
pylab.ylabel(u"Nombre d'élève(s) ayant eu cette note")
pylab.title(u"Répartition des notes dans la classe")

pylab.xlim(0, noteMax)
pylab.xticks(np.arange(noteMax + 1))

xvalues, bins, patches = pylab.hist(notes, np.arange(noteMax + 1), range=(0., 20.), facecolor='blue', alpha=0.0)

pylab.ylim(0, xvalues.max() + 1)
pylab.yticks(np.arange(xvalues.max() + 1))

pylab.grid(True, alpha=0.3)

#: Print only little stars for grades really presents
idc = xvalues > 0
pylab.plot(bins[:-1][idc], xvalues[idc], 'g*--', linewidth=.5, markersize=18)

pylab.xticks(bins[:-1][idc])

# Tweak spacing to prevent clipping of ylabel
pylab.subplots_adjust(left=0.15)

# pylab.show()
pylab.savefig(csv_name + "pdf")
print("Ploting the grades repartition on an histogram: <u>" + csv_name + "pdf<U>")
pylab.draw()
pylab.clf()

#!/usr/bin/env python3
#-*- coding: utf-8 -*-

from z3 import *

# We know each queen must be in a different row.
# So, we represent each queen by a single integer: the column position
Q = [ Int('Q_%i' % (i + 1)) for i in range(8) ]

# Each queen is in a column {1, ... 8 }
val_c = [ And(1 <= Q[i], Q[i] <= 8) for i in range(8) ]

# At most one queen per column
col_c = [ Distinct(Q) ]

# Diagonal constraint
diag_c = [ If(i == j,
              True,
              And(Q[i] - Q[j] != i - j, Q[i] - Q[j] != j - i))
           for i in range(8) for j in range(i) ]

solve(val_c + col_c + diag_c)
#!/usr/bin/env python3
#-*- coding: utf8 -*-
"""Produce text from a list of sentences, inspired by https://github.com/jilljenn/markov.py"""

import argparse
import os
import random
from string import ascii_lowercase
from collections import Counter, defaultdict
from lea import Lea


WORD_LIST = '/home/lilian/bin/latin.txt'


def markov(corpus, start, length):
    # Counting occurrences
    next_one = defaultdict(Counter)
    for sentence in corpus:
        words = sentence.split()
        nb_words = len(words)
        for i in range(nb_words - 1):
            next_one[words[i]][words[i + 1]] += 1

    # Initializing states
    states = {}
    for word in next_one:
        states[word] = Lea.fromValFreqsDict(next_one[word])

    # Outputting visited states
    word = start
    words = [word]
    for _ in range(length - 1):
        word = states[word].random()
        words.append(word)
    return(words)


if __name__ == '__main__':
    # Parse cli arguments
    parser = argparse.ArgumentParser(description='Generate a random latin locution.')
    parser.add_argument(
        'demo_type',
        type=str,
        nargs='?',
        default='latin',
        help='A type of demo: "latin", "text", "music" or "word"')
    parser.add_argument(
        'start',
        type=str,
        nargs='?',
        default='None',
        help='A word to start the random latin locution')
    parser.add_argument(
        'length',
        type=int,
        nargs='?',
        default=-1,
        help='Length of the random latin locution')
    args = parser.parse_args()

    proba_title = 0

    # Generating sentences word by word
    if args.demo_type == 'text':
        corpus = [
            'je mange des cerises',
            'je mange des bananes',
            'je conduis des camions',
        ]
        starts = ['je']
        start = random.choice(starts)
        length = 4
    # Generating sentences word by word
    elif args.demo_type == 'latin':
        corpus = open(WORD_LIST).readlines()
        starts = [c.split()[0] for c in corpus]
        start = args.start
        if start is None or start == 'None':
            start = random.choice(starts)
        proba_title = len([1 for s in starts if s.istitle()]) / len(starts)
        length = args.length
        if length <= 0:
            length = random.randint(2, 8)
    # Generating music note by note
    elif args.demo_type == 'music':
        corpus = [
            'e d# e d# e b d c a',  # Lettre à Élise de Beethoven
            'C E g c e g c e C E g c e g c e C D a d f a d f'
        ]  # Bach
        starts = ['e', 'C']
        start = random.choice(starts)
        length = 20
    # Generating words letter by letter
    elif args.demo_type == 'word':
        corpus = [
            ' '.join(list(word)) for word in open(
                os.path.basename(WORD_LIST)).read().splitlines()
        ]
        starts = list(ascii_lowercase)
        start = random.choice(starts)
        length = 12

    # Try 100 times to generate a sentence
    nb_max_trial = 100
    for trial in range(nb_max_trial):
        try:
            words = markov(corpus, start, length)
            if random.random() <= proba_title:
                words[0] = words[0].title()
            print(' '.join(words))
            break
        except KeyError:
            start = random.choice(starts)
            continue

#!/usr/bin/env python

"""
rst2md.py
======

This module provides a simple command line interface that uses the
Markdown writer to output from reStructuredText source.

From: https://github.com/cgwrench/rst2md
"""

import locale
try:
    locale.setlocale(locale.LC_ALL, '')
except:
    pass

from docutils.core import publish_cmdline, default_description
try:
    from docutils.writers import markdown
except ImportError:
    # Obviously still just testing this package (i.e. have not installed it)
    # Remove this try-except from the final release version.
    import sys, os
    sys.path.insert(0, os.path.abspath('.'))
    import markdown

description = ('Generates Markdown formatted text from standalone '
               'reStructuredText sources.  ' + default_description)

publish_cmdline(writer=markdown.Writer(), description=description)

/home/lilian/publis/selfspy-vis/selfvis.py
#! /usr/bin/env python2
# -*- coding: utf-8; mode: python -*-
""" A tiny Python script to call sleep for a random time, drawn from a Poisson distribution of a certain mean time.

Requirements:
- numpy.random (poisson) is needed.

About:
- *Date:* 20/02/2017.
- *Author:* Lilian Besson, (C) 2017.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

import sys
from time import sleep
from numpy.random import poisson

MINUTE = 60
MEAN_TIME = 3 * MINUTE

# --- Main script

if __name__ == '__main__':
    mean_time = int(sys.argv[1]) if len(sys.argv) > 1 else MEAN_TIME
    waiting_time = poisson(mean_time)
    print("Sleeping for {:.3g} seconds ...".format(waiting_time))  # DEBUG
    sys.exit(sleep(waiting_time))

# End of sleep-poisson-time.py

#!/usr/bin/env python3
# -*- coding: utf8 -*-

from time import time
import numpy as np
import numba

def smooth_nojit(u, a):
    y = np.zeros_like(u)
    y[0] = (1-a)*u[0]
    for k in range(1, len(u)):
        y[k] = a*y[k-1] + (1-a)*u[k]
    return y


smooth_jit = numba.jit(smooth_nojit)
# <- factor ×100 speed-up!


if __name__ == '__main__':
    print("For 1e6 points...")
    u = np.random.randn(int(1e6), 1)
    a = 0.95
    start = time()
    smooth_nojit(u, a)
    print(f"No jit: {time() - start:.3g} seconds")
    start = time()
    smooth_jit(u, a)
    print(f"With Numba jit: {time() - start:.3g} seconds")

#!/usr/bin/env python
# -*- coding: utf-8 -*-
""" Convert some Markdown/StrapDown.js files to a single, simple HTML (.html) file,
which looks as a StrapDown.js powered page, but is autonomous and *does not* require JavaScript at all.

I tried to do it as (durtily) well as possible (and I included a couple of nice features).

Features:
- include a link to SquirtFr (http://lbesson.bitbucket.org/squirt/),
- include the bootstrap theme, cf. http://bootswatch.com/united for all the possibilities,
- support UTF-8 (TODO try with another encoding?),
- quick and pretty, even if the script is really DURTY...

Links:
- more information on StrapDown.js can be found here http://lbesson.bitbucket.org/md/,
- another script I wrote for StrapDown.js is strapdown2pdf, here http://lbesson.bitbucket.org/md/strapdown2pdf.html
- (TODO) Similarly, this page http://lbesson.bitbucket.org/md/strapdown2html.html will give info about that program strapdown2html.py

Copyright: 2015, Lilian Besson.
License: GPLv3.
"""

from __future__ import print_function  # Python 2/3 compatibility !
import sys
import codecs
import markdown
import re
import os.path
from bs4 import BeautifulSoup, SoupStrainer

__author__ = "Lilian Besson"
__version__ = "0.3.1"

# TODO: improve conformity with StrapDown.js Markdown parser:
# nested list for instance, generic source code printer etc.

try:
    try:
        # Load ansicolortags (Cf. http://ansicolortags.readthedocs.io/)
        from ansicolortags import printc
    except ImportError as e:
        print("Optional dependancy (ansicolortags) is not available, using regular print function.")
        print("  You can install it with : 'pip install ansicolortags' (or sudo pip)...")
        # Load ANSIColors (Cf. http://pythonhosted.org/ANSIColors-balises/)
        from ANSIColors import printc
except ImportError:
    print("Optional dependancy (ANSIColors) is not available, using regular print function.")
    print("  You can install it with : 'pip install ANSIColors-balises' (or sudo pip)...")

    def printc(*a, **kw):
        print(*a, **kw)

# Load some Markdown extensions (Cf. https://pythonhosted.org/Markdown/extensions/index.html)
try:
    import markdown.extensions
    list_extensions = [
        'markdown.extensions.extra',  # https://pythonhosted.org/Markdown/extensions/extra.html
        'markdown.extensions.smarty',  # https://pythonhosted.org/Markdown/extensions/smarty.html
        'markdown.extensions.headerid',  # https://pythonhosted.org/Markdown/extensions/header_id.html
        'markdown.extensions.tables',  # https://pythonhosted.org/Markdown/extensions/tables.html
        'markdown.extensions.smart_strong',  # https://pythonhosted.org/Markdown/extensions/smart_strong.html
        # 'urlize'  # https://github.com/r0wb0t/markdown-urlize
    ]
    try:
        # From https://github.com/selcuk/markdown-urlify
        from markdown.preprocessors import Preprocessor
        from markdown.extensions import Extension

        urlfinder = re.compile(r'((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+(:[0-9]+)?|'
                               r'(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:/[\+~%/\.\w\-_]*)?\??'
                               r'(?:[\-\+=&;%@\.\w_]*)#?(?:[\.!/\\\w]*))?)')

        class URLify(Preprocessor):
            def run(self, lines):
                return [urlfinder.sub(r'<\1>', line) for line in lines]

        class URLifyExtension(Extension):
            def extendMarkdown(self, md, md_globals):
                md.preprocessors.add('urlify', URLify(md), '_end')

        urlify_ext = URLifyExtension()
        # list_extensions.append(urlify_ext)
        # FIXME improve support for that extension
    except:
        printc(" <INFO> Failed to define the 'urlify' extension.<white>")
except:
    list_extensions = []
    # No extension

# Fix UTF-8 output
sys.stdout = codecs.getwriter('utf-8')(sys.stdout)

beta = False
eraseFileAlreadyThere = False


def main(argv=[], path='/tmp', outfile='test.html', title='Test', use_jquery=False):
    """ Convert every input file from Markdown to HTML, and concatenate all them to an output."""

    printc("<green>Starting main, with:<white>")
    # FIXME printc does not handle UTF-8 correctly ! AAAH!
    print("path='{path}', outfile='{outfile}'.".format(path=path, outfile=outfile))
    print("And the title is:", title)
    fullpath = os.path.join(path, outfile)

    printc("<magenta>The output file will be <white>'<u>{fullpath}<U>'.".format(fullpath=fullpath))

    with open(fullpath, "w") as html_file:
        html_file = codecs.getwriter('utf-8')(html_file)
        # Writing the head of the HTML file
        html_file.write(u"""<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" name="viewport">
    <meta charset="utf-8">
    <title>{title}</title>
    <link href="http://perso.crans.org/besson/_static/md/themes/united.min.css" rel="stylesheet">
    <link href="http://perso.crans.org/besson/_static/md/strapdown.min.css" rel="stylesheet">
    <link href="http://perso.crans.org/besson/_static/md/themes/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="http://perso.crans.org/besson/_static/prism/prism.css" rel="stylesheet">
    <link rel="shortcut icon" href="http://perso.crans.org/besson/_static/.favicon.ico">
    <meta name="author" content="Lilian Besson">
    <meta name="generator" content="https://bitbucket.org/lbesson/bin/src/master/strapdown2html.py">
""".format(title=title))
        # Include jquery, and some plugins. Useless except if there is a table in the input document
        # FIXME improve detection
        if use_jquery:
            html_file.write(u"""
    <script type="text/javascript" src="http://perso.crans.org/besson/_static/jquery.js"></script>
    <script type="text/javascript" src="http://perso.crans.org/besson/_static/jquery.quicksearch.min.js"></script>
    <script type="text/javascript" src="http://perso.crans.org/besson/_static/jquery.smooth-scroll.min.js"></script>\n""")
        # Beginning of the header
        html_file.write(u"""</head>
<body>
<div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <div id="headline" class="brand">
                    <span id="title" style="font-size:115%;">{title}</span>
                </div>
""".format(title=title))
        # Last part of the navbar
        html_file.write(u"""
                <div id="headline-copyrights" class="brand">
                    Generated with <a href="https://bitbucket.org/lbesson/bin/src/master/strapdown2html.py">Python</a>,
                    by <a href="http://perso.crans.org/besson/">Lilian Besson</a>.
                    Based on <a title="http://lbo.k.vu/md" href="http://lbesson.bitbucket.org/md/index.html">StrapDown.js</a>
                    (theme <a title="More information on this theme, on bootswatch.com." href="http://bootswatch.com/united"><i>united</i></a>),
                    <!-- hosted on <a href="http://perso.crans.org/besson/">perso.crans.org/besson</a>. -->
                </div>
                <div id="headline-squirt" class="brand">
                    <a title="Quick read with SquirtFR. Check http://lbesson.bitbucket.org/squirt/ for more information."
                    href="javascript:(function(){sq=window.sq;if(sq&amp;&amp;sq.closed){window.sq.closed&amp;&amp;window.document.dispatchEvent(new%20Event('squirt.again'));}else{sq=window.sq||{};sq.version='0.4';sq.host='http://lbesson.bitbucket.org/squirt';sq.j=document.createElement('script');sq.j.src=sq.host+'/squirt.js?src=strapdown.min.js';document.body.appendChild(sq.j);}})();">[QuickRead]</a>
                </div>
            </div>
        </div>
    <!-- </div> -->
</div>
<div id="content" class="container" style="font-size:140%;">""")
        # Include the jQuery.QuickSearch plugin (no by default).
        if use_jquery:
            html_file.write(u"""
    <blockquote class="pull-right" style="right-margin: 5%;">
        <h2>Search on that table?</h2>
            <p>(Thanks to the <a href="http://deuxhuithuit.github.io/quicksearch/">QuickSearch</a> <a href="https://www.jQuery.com/">jQuery</a> plugin.)</p>
            <form><fieldset>
                <input type="text" name="search" value="" id="id_search" placeholder="Search on that table" autofocus />
            </fieldset></form>
    </blockquote><hr><br>""")
        # Not useful anymore, my script works fine.
        if beta:
            html_file.write(u"""
    <div class="alert alert-dismissable alert-warning">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <h2>Warning!</h2>
        <p>This page has been converted from <a href="https://en.wikipedia.org/wiki/Markdown">Markdown</a> documents, with a Python script.<br>
        This <a href="https://bitbucket.org/lbesson/bin/src/master/strapdown2html.py">script</a> is still experimental! If needed, please <a href="https://bitbucket.org/lbesson/bin/issues/new" title="It's free, open to anyone, quick and easy!">fill a bug report</a>?</p>
    </div><br><hr>""")
        html_file.write(u"""\n<!-- First file -->\n""")

        # Now, work with each file.
        for inputfile in argv:
            try:
                printc("# <INFO> Trying to read from the file '<green><u>{inputfile}<reset><white>'.".format(inputfile=inputfile))
                with open(inputfile, 'r') as openinputfile:
                    printc(" I opened it, to '{openinputfile}'.".format(openinputfile=openinputfile))
                    # FIXME detect encoding better?
                    openinputfile = codecs.getreader('utf-8')(openinputfile)
                    printc(" <INFO> Codec manually changed to utf8.<white>")
                    html_text = "\t<!-- Failed to read from '{inputfile}'... This comment should have been replaced with the content of that file, converted to pure HTML... -->".format(inputfile=inputfile)

                    # Read that file !
                    markdown_text = openinputfile.read()
                    printc(" I just read from that file.")
                    if beta:
                        print(markdown_text)  # yes this works, useless now

                    # Let try to convert this text to HTML from Markdown
                    try:
                        # First, let try to see if the input file was not a StrapDown.js file.
                        try:
                            only_xmp_tag = SoupStrainer("xmp")
                            html = BeautifulSoup(markdown_text, "html.parser", parse_only=only_xmp_tag, from_encoding="utf-8")
                            if beta:
                                print(" BTW, this html read with Beautiful soup has the encoding,", html.original_encoding)
                            x = html.xmp
                            printc(" <black>BeautifulSoup<white> was used to read the input file as an HTML file, and reading its first xmp tag.")
                            # new_markdown_text = unicode(x.prettify("utf-8"), encoding="utf-8")
                            new_markdown_text = unicode(x.encode("utf-8"), encoding="utf-8")
                            printc(" I found the xmp tag and its content. Printing it:")
                            # OMG this is so durty ! FIXME do better?
                            if beta:
                                print(type(new_markdown_text))
                                print(new_markdown_text)
                            printc(" Now lets replaced '<xmp>' --> '' and '</xmp>' --> ''. Lets go!")
                            markdown_text = new_markdown_text.replace('<xmp>', '').replace('</xmp>', '')
                            printc(" Yeah, I replaced '<xmp>' --> '' and '</xmp>' --> ''. I did it!")
                            # Add code to add the good Prism.js class to <code> and <pre>, to color the code accordingly.
                            markdown_text = markdown_text.replace('```python', '<pre><code class="language-python" style="font-size:145%;">')
                            markdown_text = markdown_text.replace('```bash', '<pre><code class="language-bash" style="font-size:145%;">')
                            markdown_text = markdown_text.replace('```', '</code></pre>')
                            # This should be good.
                        except Exception as e:
                            printc(" <warning> Exception found: <yellow>{e}<white>.".format(e=e))
                            printc("  ===> <WARNING> I tried to read the file as a StrapDown.js powered file, but failed.<white>\n <magenta>I will now read it as a simple Markdown file.<white>")

                        # This is so durty... FIXME do better?
                        try:
                            markdown_text = markdown_text.replace('<!DOCTYPE html><html><head><meta charset="utf-8"/><title>', '<h1>')
                            markdown_text = markdown_text.replace('<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>', '<h1>')
                            markdown_text = markdown_text.replace('</title></head><body><xmp>', '</h1>')
                            markdown_text = markdown_text.replace('</title></head><body><xmp theme="united">', '</h1>')
                            markdown_text = markdown_text.replace('<xmp theme="united">', '')
                            markdown_text = markdown_text.replace('</title></head><body><xmp theme="cyborg">', '</h1>')
                            markdown_text = markdown_text.replace('<xmp theme="cyborg">', '')
                            markdown_text = markdown_text.replace('<p></xmp><script type="text/javascript" src="http://perso.crans.org/besson/s/md/strapdown.min.js"></script></body></html></p>', '')
                            printc(" <INFO> Now I replace '<xmp>' --> '' and '</xmp>' --> ''. Lets go!<white>")
                        except:
                            printc(" I tried (again) to replace '<xmp>' --> '' and '</xmp>' --> '' byt failed")
                        # Alright, let us convert this MD text to HTML
                        printc(" Let convert the content I read to HTML with markdown.markdown.")
                        if beta:
                            print(markdown_text)
                        # FIXME: use markdown.markdownFromFile instead (simpler ?)
                        markdown_text = markdown_text.replace('&gt; ', '> ')
                        # Cf. https://pythonhosted.org/Markdown/reference.html#markdownFromFile
                        html_text = markdown.markdown(markdown_text, extensions=list_extensions)
                        # BETA: improve how tables look like
                        html_text = html_text.replace('<table>', '<table class="table table-striped table-bordered">')
                        printc(" I converted from Markdown to HTML: yeah!!<white>")
                    # Oups ! Bug !
                    except Exception as e:
                        printc("<ERROR> Exception found: <yellow>{e}<white>.".format(e=e))
                        printc(" ===> <WARNING> I failed to markdownise these lines. Next!<reset><white>")

                    # Now we have that html_text, lets write to the output file (append mode).
                    html_file.write(html_text)
                    printc(" <blue>I wrote this to the output file '{html_file}'<white>.".format(html_file=html_file))
                    # Done for that reading from that file

                html_file.write("\n<!-- End of the HTML converted from the file '{inputfile}'. -->\n<br><hr><br>\n<!-- Next file -->\n".format(inputfile=inputfile))
            # Opening the input file failed !
            except Exception as e:
                printc("<ERROR> Exception found: <yellow>{e}<white>.".format(e=e))
                printc(" ==> <ERROR>: Failed to read from the file {inputfile}. Going to the next one.<reset><white>\n".format(inputfile=inputfile))

        if use_jquery:
            html_file.write(u"""
    <script type="text/javascript">
        $('input#id_search').quicksearch('table tbody tr');
        $('a').smoothScroll({
            offset: ((screen.width > 680) ? -60 : 0), preventDefault: true,
            direction: 'top', easing: 'swing', speed:  350, autoCoefficent: 3,
        });
    </script>""")
        # Print the © message
        html_file.write(u"""
    <div class="alert alert-success pull-right">
        <h4>© 2015 <a title="Check out my web-pages!" href="http://perso.crans.org/besson/">Lilian Besson</a>, generated by <a href="https://bitbucket.org/lbesson/bin/src/master/strapdown2html.py" title="Python 2.7 is cool!">an open-source Python script</a>.</h4>
    </div>
</div>
<script type="text/javascript" src="http://perso.crans.org/besson/_static/prism/prism.js"></script>
<noscript><img alt="GA|Analytics" style="visibility:hidden;display:none;" src="http://perso.crans.org/besson/beacon/{fullpath}?pixel"/></noscript>
<script type="text/javascript" src="http://perso.crans.org/besson/_static/ga.js" async defer></script>
</body></html>
""".format(fullpath=fullpath))
    return True


# Now let us use that thing.
if __name__ == '__main__':
    args = sys.argv
    # J'ai la flemme, je fais la gestion des options à la main. Et j'écris ce commentaire en français, OHOO!
    if '-?' in args or '-h' in args or '--help' in args:
        printc("""<yellow>strapdown2html.py<white>: -h | [options] file1 [file2 [file3 ..]]

Convert the input files (Markdown (.md) or HTML (.html) StrapDown.js-powered) to one autonomous HTML file.

Options:
    <magenta>-?|-h|--help<white>:\n\t\tdisplay this help,
    <magenta>-o|--out<white>:\n\t\tspecify the output file. Default is based on the first file name.
    <magenta>-t|--title<white>:\n\t\tspecify the title of the output. Default is based on the first file name (autodetection is not perfect).
    <magenta>-v|--view<white>:\n\t\topen the output file when done (default is not to do it).
    <magenta>--use-jquery<white>:\n\t\tforce to include jQuery and the jQuery.QuickSearch plugin (in case of a table for example).
    <magenta>-f|--force<white>:\n\t\teven if the output file is present, <red>erase it<white> (default is to find a new name).

Warning:
    Experimental! Almost done?

Copyright: 2015, Lilian Besson.
License: GPLv3.""")
        exit(1)

    # OK get it from the user
    out = "/tmp/test.html"
    if '-o' in args:
        out = str(args.pop(1 + args.index('-o')))
        args.remove('-o')
    if '--out' in args:
        out = str(args.pop(1 + args.index('--out')))
        args.remove('--out')

    # OK get from the user or from the file
    title = ''
    if '-t' in args:
        title = args.pop(1 + args.index('-t'))
        args.remove('-t')

    if '--title' in args:
        title = args.pop(1 + args.index('--title'))
        args.remove('--title')

    if '--force' in args:
        eraseFileAlreadyThere = True
        args.pop(args.index('--force'))

    if '-f' in args:
        eraseFileAlreadyThere = True
        args.pop(args.index('-f'))

    use_jquery = False
    if '--use-jquery' in args:
        use_jquery = True
        args.pop(args.index('--use-jquery'))

    # Cleverly detect the title. So durty, again!
    i = 0
    while title == '':
        i += 1
        try:
            # with open(args[i], 'r') as file1:
            with codecs.open(args[i], 'r', encoding='utf-8') as file1:
                try:
                    contentfile1 = file1.read()
                    # FIXME experimental detection of the need for QuickSearch
                    # use_jquery = use_jquery or ((contentfile1.find('<table>') >= 0) or (contentfile1.find('') >= 0))
                    title = re.search("<title>[^<]+</title>", contentfile1).group()
                    title = title.replace('<title>', '').replace('</title>', '')
                except Exception as e:
                    # printc("<ERROR> Exception found: <yellow>{e}<white>.".format(e=e))
                    printc("<WARNING> Failed to read title from the file '{file1}'.<white>".format(file1=file1))
        except:
            break
    if title == '':
        printc("<WARNING> I tried to read the title in one of the input file, but failed.<white>\n")
        title = '(No title for that StrapDown document)'

    # Try to guess path+outfile from the first inputfile.
    if out == "/tmp/test.html":
        try:
            out = args[1].replace('.md', '.html').replace('.markdown', '.html')
            while os.path.exists(out):
                if eraseFileAlreadyThere:
                    # OMG, so bad! Only for Linux! FIXME
                    import distutils.file_util  # Mais quel débile !
                    # distutils.file_util.copy_file(out, '/tmp/')
                    distutils.file_util.copy_file(out + '~', '/tmp/')
                    distutils.file_util.move_file(out, out + '~')
                else:
                    out = out.replace('.html', '__new.html')
                if len(out) > 100:
                    break
        except:
            printc("<WARNING> I tried to guess the output file myself, but failed. Let use '/tmp/test.html'...<white>")

    path = os.path.dirname(out) if out else '/tmp/'
    outfile = os.path.basename(out) if out else 'test.html'

    # Calling main
    main(args[1:], path=path, outfile=outfile, title=title, use_jquery=use_jquery)
    printc("\n<green>Done, I wrote to the file '{outfile}' in the dir '{path}'.<white>".format(path=path, outfile=outfile))

    if '-v' in args or '--view' in args:
        try:
            printc("Opening that document in your favorite browser...")
            import webbrowser  # Thanks to antigravity.py!
            webbrowser.open(os.path.join(path, outfile))
        except Exception as e:
            printc("But I failed in opening that page to show you the content")

#!/usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" A simple and tiny 9x9 Sudoku solver with z3.

- Author: Lilian Besson, (C) 2013, updated 2021.
- Online: https://bitbucket.org/lbesson/bin/
- Licence: MIT Licence (http://lbesson.mit-license.org).
- Dependency: install z3-solver (https://pypi.org/project/z3-solver/)
"""

from __future__ import print_function
import sys

if __name__ != "__main__":
    sys.exit(0)

try:
    import z3
except ImportError:
    print("Cannot import 'z3' package.\nHave you tried to install it?\n sudo pip3 install -U z3 solver")
    import webbrowser
    webbrowser.open_new_tab("https://pypi.org/project/z3-solver/")
    sys.exit(0)

# TODO check if we can easily change the size and generalize?
SIZE = 3

# 9x9 matrix of integer variables
X = [
     [ z3.Int("x_%s_%s" % (i + 1, j + 1)) for j in range(SIZE**2) ]
     for i in range(SIZE**2)
]

# each cell contains a value in {1, ..., 9}
cells_c = [ z3.And(1 <= X[i][j], X[i][j] <= SIZE**2)
            for i in range(SIZE**2)
            for j in range(SIZE**2)
          ]

# each row contains a digit at most once
rows_c = [ z3.Distinct(X[i]) for i in range(SIZE**2) ]

# each column contains a digit at most once
cols_c = [ z3.Distinct( [ X[i][j] for i in range(SIZE**2) ] )
           for j in range(SIZE**2)
         ]

# each 3x3 square contains a digit at most once
sq_c = [ z3.Distinct([ X[SIZE * i0 + i][SIZE * j0 + j]
                       for i in range(SIZE)
                                        for j in range(SIZE)
                  ])
        for i0 in range(SIZE)
        for j0 in range(SIZE)
       ]

sudoku_c = cells_c + rows_c + cols_c + sq_c

# sudoku instance, we use '0' for empty cells
if SIZE != 3:
    print("TODO write an instance of size = {}.".format(SIZE))
    sys.exit(1)

instance = [[0, 0, 0, 0, 0, 0, 7, 0, 0],
            [7, 3, 0, 0, 4, 0, 0, 0, 0],
            [1, 0, 0, 7, 5, 0, 0, 3, 0],
            [0, 0, 3, 2, 0, 5, 4, 0, 7],
            [0, 0, 0, 9, 0, 8, 0, 0, 0],
            [2, 0, 7, 1, 0, 4, 5, 0, 0],
            [0, 6, 0, 0, 8, 7, 0, 0, 4],
            [0, 0, 0, 0, 9, 0, 0, 1, 3],
            [0, 0, 2, 0, 0, 0, 0, 0, 0]]

try:
    from pprint import pprint
except ImportError:
    pprint = print

print("Trying to solve this 9x9 SUDOKU grid:")
pprint(instance)

import time
before = time.time()

instance_c = [ z3.If(instance[i][j] == 0, True, X[i][j] == instance[i][j])
               for i in range(9) for j in range(9)
             ]

s = z3.Solver()
s.add(sudoku_c + instance_c)

if s.check() == z3.sat:
    m = s.model()
    after = time.time()
    duration = after - before
    print("Solved in {:.4g} seconds.".format(duration))

    r = [ [ m.evaluate(X[i][j]) for j in range(SIZE**2) ]
            for i in range(SIZE**2) ]
    z3.print_matrix(r)
else:
    print("Failed to solve the grid...")

# -*- coding: utf8 -*-

############################################################################
# terminal.py - Embeded VTE terminal for gedit
# This file is part of gedit
#
# Copyright (C) 2005-2006 - Paolo Borelli
# Copyright (C) 2013  Lilian BESSON <lbesson at ens-cachan dot fr>
#
# gedit is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# gedit is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with gedit; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor,
# Boston, MA  02110-1301  USA
############################################################################
## To copy here : /usr/lib/gedit/plugins

""" A terminal embedded in Gedit inferior panel, v3.2.2."""

__author__ = "Paolo Borelli, Lilian BESSON <lbesson at ens-cachan dot fr> for Naereen CORP."
__version__ = "3.2.2"
__appname__ = "gedit-terminal"
__app_disp_name__ = "Gedit Embeded Terminal"
__website__ = "https://sites.google.com/site/naereencorp/gedit/"

print ".:[ Initializing %s, v%s. (c) %s ]:." % (__app_disp_name__, __version__, __author__)
print ".:[ Take a look at %s for more informations, or for the latest version of this piece of software. ]:." % (__website__)

from gi.repository import GObject, GLib, Gio, Pango, Gdk, Gtk, Gedit, Vte
import os
import gettext
from gpdefs import *
from signal import SIGTERM, SIGKILL

try:
    gettext.bindtextdomain(GETTEXT_PACKAGE, GP_LOCALEDIR)
    _ = lambda s: gettext.dgettext(GETTEXT_PACKAGE, s);
except:
    _ = lambda s: s

class GeditTerminal(Gtk.Box):
    """VTE terminal which follows gnome-terminal default profile options"""

    __gsignals__ = {
        "populate-popup": (
            GObject.SIGNAL_RUN_LAST,
            None,
            (GObject.TYPE_OBJECT,)
        )
    }

    defaults = {
        'emulation'             : 'xterm', # Don't try to put anything else here.
        'visible_bell'          : True, # NEW
        'audible_bell'          : True, # NEW
        #'opacity'          : 55000, # NEW
        'allow_bold'          : True, # NEW
    }

    def __init__(self):
        Gtk.Box.__init__(self)

        self.profile_settings = self.get_profile_settings()
        self.profile_settings.connect("changed", self.on_profile_settings_changed)
        self.system_settings = Gio.Settings.new("org.gnome.desktop.interface")
        self.system_settings.connect("changed::monospace-font-name", self.font_changed)

        self._vte = Vte.Terminal()
        self.reconfigure_vte()
        self._vte.set_size(self._vte.get_column_count(), 5)
        self._vte.set_size_request(200, 50)
        self._vte.show()
        self.pack_start(self._vte, True, True, 0)

        scrollbar = Gtk.Scrollbar.new(Gtk.Orientation.VERTICAL, self._vte.get_vadjustment())
        scrollbar.show()
        self.pack_start(scrollbar, False, False, 0)

        # we need to reconf colors if the style changes
        #FIXME: why?
        #self._vte.connect("style-update", lambda term, oldstyle: self.reconfigure_vte())
        self._vte.connect("key-press-event", self.on_vte_key_press)
        self._vte.connect("button-press-event", self.on_vte_button_press)
        self._vte.connect("popup-menu", self.on_vte_popup_menu)
        self._vte.connect("child-exited", self.on_child_exited)
#: FIXME: TypeError: on_child_exited() takes exactly 1 argument (2 given)
#:        self._vte.connect("child-exited", lambda (self2, term2): self2.on_child_exited() )
#:        print "Connecting child-exited to _vte, with :"
#:        print "lambda self2,term2: self2.on_child_exited()"

        self._accel_base = '<gedit>/plugins/terminal'
        self._accels = {
            'copy-clipboard': [Gdk.KEY_C, Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK, self.copy_clipboard],
            'paste-clipboard': [Gdk.KEY_V, Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK, self.paste_clipboard]
        }

        for name in self._accels:
            path = self._accel_base + '/' + name
            accel = Gtk.AccelMap.lookup_entry(path)

            if not accel[0]:
                 Gtk.AccelMap.add_entry(path, self._accels[name][0], self._accels[name][1])

        self._vte.fork_command_full(Vte.PtyFlags.DEFAULT, None, [Vte.get_user_shell()], None, GLib.SpawnFlags.SEARCH_PATH, None, None)

    def on_child_exited(self, term):
#:        print "on_child_exited have been called (shell is terminated)"
        print ".:[ Re-launching a shell, on %s, v%s. (c) %s ]:." % (__app_disp_name__, __version__, __author__)
        print ".:[ Take a look at %s for more informations, or for the latest version of this piece of software. ]:." % (__website__)
        print self._vte.fork_command_full(Vte.PtyFlags.DEFAULT, None, [Vte.get_user_shell()], None, GLib.SpawnFlags.SEARCH_PATH, None, None)

    def do_grab_focus(self):
        self._vte.grab_focus()

    def get_profile_settings(self):
        #FIXME return either the gnome-terminal settings or the gedit one
        return Gio.Settings.new("org.gnome.gedit.plugins.terminal")

    def get_font(self):
        if self.profile_settings.get_boolean("use-system-font"):
            font = self.system_settings.get_string("monospace-font-name")
        else:
            font = self.profile_settings.get_string("font")

        return font

    def font_changed(self, settings=None, key=None):
        font = self.get_font()
        font_desc = Pango.font_description_from_string(font)

        self._vte.set_font(font_desc)

    def reconfigure_vte(self):
        # Fonts
        self.font_changed()

        # colors
        context = self._vte.get_style_context()
        fg = context.get_color(Gtk.StateFlags.NORMAL)
        bg = context.get_background_color(Gtk.StateFlags.NORMAL)
        palette = []

        if not self.profile_settings.get_boolean("use-theme-colors"):
            fg_color = self.profile_settings.get_string("foreground-color")
            if fg_color != "":
                fg = Gdk.RGBA()
                parsed = fg.parse(fg_color)
            bg_color = self.profile_settings.get_string("background-color")
            if bg_color != "":
                bg = Gdk.RGBA()
                parsed = bg.parse(bg_color)
        str_colors = self.profile_settings.get_string("palette")
        if str_colors != "":
            for str_color in str_colors.split(':'):
                try:
                    rgba = Gdk.RGBA()
                    rgba.parse(str_color)
                    palette.append(rgba)
                except:
                    palette = []
                    break
            if (len(palette) not in (0, 8, 16, 24)):
                palette = []

        self._vte.set_colors_rgba(fg, bg, palette)

        self._vte.set_cursor_blink_mode(self.profile_settings.get_enum("cursor-blink-mode"))
        self._vte.set_cursor_shape(self.profile_settings.get_enum("cursor-shape"))
        self._vte.set_audible_bell(not self.profile_settings.get_boolean("silent-bell"))
        self._vte.set_allow_bold(self.profile_settings.get_boolean("allow-bold"))
        self._vte.set_scroll_on_keystroke(self.profile_settings.get_boolean("scrollback-on-keystroke"))
        self._vte.set_scroll_on_output(self.profile_settings.get_boolean("scrollback-on-output"))
        self._vte.set_word_chars(self.profile_settings.get_string("word-chars"))
        self._vte.set_emulation(self.defaults['emulation'])
        self._vte.set_visible_bell(self.defaults['visible_bell'])
        # NEW.
        self._vte.set_audible_bell(self.defaults['audible_bell'])
        #self._vte.set_opacity(self.defaults['opacity'])
        self._vte.set_allow_bold(self.defaults['allow_bold'])

        if self.profile_settings.get_boolean("scrollback-unlimited"):
            lines = -1
        else:
            lines = self.profile_settings.get_int("scrollback-lines")
        self._vte.set_scrollback_lines(lines)

    def on_profile_settings_changed(self, settings, key):
        self.reconfigure_vte()

    def on_vte_key_press(self, term, event):
        modifiers = event.state & Gtk.accelerator_get_default_mod_mask()
        if event.keyval in (Gdk.KEY_Tab, Gdk.KEY_KP_Tab, Gdk.KEY_ISO_Left_Tab):
            if modifiers == Gdk.ModifierType.CONTROL_MASK:
                self.get_toplevel().child_focus(Gtk.DirectionType.TAB_FORWARD)
                return True
            elif modifiers == Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK:
                self.get_toplevel().child_focus(Gtk.DirectionType.TAB_BACKWARD)
                return True

        for name in self._accels:
            path = self._accel_base + '/' + name
            entry = Gtk.AccelMap.lookup_entry(path)

            if entry and entry[0] and entry[1].accel_key == event.keyval and entry[1].accel_mods == modifiers:
                self._accels[name][2]()
                return True

        return False

    def on_vte_button_press(self, term, event):
        if event.button == 3:
            self._vte.grab_focus()
            self.make_popup(event)
            return True

        return False

    def on_vte_popup_menu(self, term):
        self.make_popup()

    def create_popup_menu(self):
        menu = Gtk.Menu()

        item = Gtk.ImageMenuItem.new_from_stock(Gtk.STOCK_COPY, None)
        item.connect("activate", lambda menu_item: self.copy_clipboard())
        item.set_accel_path(self._accel_base + '/copy-clipboard')
        item.set_sensitive(self._vte.get_has_selection())
        menu.append(item)

        item = Gtk.ImageMenuItem.new_from_stock(Gtk.STOCK_PASTE, None)
        item.connect("activate", lambda menu_item: self.paste_clipboard())
        item.set_accel_path(self._accel_base + '/paste-clipboard')
        menu.append(item)

        #MenuItem => separator
        item = Gtk.SeparatorMenuItem()
        menu.append(item)

        #MenuItem => About
        item = Gtk.ImageMenuItem.new_from_stock("gtk-about", None)
        item.connect("activate", lambda menu_item: self.show_about_dialog())
        menu.append(item)

        self.emit("populate-popup", menu)
        menu.show_all()
        return menu

    def make_popup(self, event = None):
        menu = self.create_popup_menu()
        menu.attach_to_widget(self, None)

        if event is not None:
            menu.popup(None, None, None, None, event.button, event.time)
        else:
            menu.popup(None, None,
                       lambda m: Gedit.utils_menu_position_under_widget(m, self),
                       None,
                       0, Gtk.get_current_event_time())
            menu.select_first(False)

    def copy_clipboard(self):
        self._vte.copy_clipboard()
        self._vte.grab_focus()

    def paste_clipboard(self):
        self._vte.paste_clipboard()
        self._vte.grab_focus()

    def change_directory(self, path):
        path = path.replace('\\', '\\\\').replace('"', '\\"')
        self._vte.feed_child('cd "%s" # Inserted by Gnome-Terminal.\n' % path, -1)
        self._vte.grab_focus()

    def show_about_dialog(self):
        """Display the about dialog."""
        about_dlg = Gtk.AboutDialog()
        #Set the content of the dialog
        about_dlg.set_program_name(__app_disp_name__)
        about_dlg.set_version(__version__)
        about_dlg.set_comments(__doc__)
        about_dlg.set_website(__website__)
        about_dlg.set_copyright("Copyright (c) 2005-13  %s" % __author__)
#: FIXME : on doit aller la chercher + intelligemment.
        logo = Gtk.Image.new_from_file("/usr/share/icons/gnome/32x32/apps/terminal.png") # 32x32
        about_dlg.set_logo(logo.get_pixbuf())
        #Signal
        about_dlg.connect("response", lambda w, r: w.destroy())
        #Display the dialog
        about_dlg.show()

class TerminalPlugin(GObject.Object, Gedit.WindowActivatable):
    __gtype_name__ = "TerminalPlugin"

    window = GObject.property(type=Gedit.Window)

    def __init__(self):
        GObject.Object.__init__(self)

    def do_activate(self):
        self._panel = GeditTerminal()
        self._panel.connect("populate-popup", self.on_panel_populate_popup)
        self._panel.show()

        image = Gtk.Image.new_from_icon_name("utilities-terminal", Gtk.IconSize.MENU)

        bottom = self.window.get_bottom_panel()
        bottom.add_item(self._panel, "GeditTerminalPanel", _("Embedded Terminal"), image)
        # FIXME

    def do_deactivate(self):
        bottom = self.window.get_bottom_panel()
        bottom.remove_item(self._panel)

    def do_update_state(self):
        pass

    def get_active_document_directory(self):
        doc = self.window.get_active_document()
        if doc is None:
            return None
        location = doc.get_location()
        if location is not None and Gedit.utils_location_has_file_scheme(location):
            directory = location.get_parent()
            return directory.get_path()
        return None

    def on_panel_populate_popup(self, panel, menu):
        menu.prepend(Gtk.SeparatorMenuItem())
        path = self.get_active_document_directory()
        item = Gtk.MenuItem.new_with_mnemonic(_("C_hange Directory"))
        item.connect("activate", lambda menu_item: panel.change_directory(path))
        item.set_sensitive(path is not None)
        menu.prepend(item)

# Let's conform to PEP8
# ex:ts=4:et:

# -*- coding: utf8 -*-

############################################################################
# terminal2.py - Embeded VTE terminal for gedit
# This file is part of gedit
#
# Copyright (C) 2005-2006 - Paolo Borelli
# Copyright (C) 2013  Lilian BESSON <lbesson at ens-cachan dot fr>
#
# gedit is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# gedit is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with gedit; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor,
# Boston, MA  02110-1301  USA
############################################################################
## To copy here : /usr/lib/gedit/plugins

""" A terminal embedded in Gedit lateral panel, v3.2.3."""

__author__ = "Paolo Borelli, Lilian BESSON <lbesson at ens-cachan dot fr> for Naereen CORP."
__version__ = "3.2.3"
__appname__ = "gedit-terminal2"
__app_disp_name__ = "Gedit Embeded Terminal Lateral"
__website__ = "https://sites.google.com/site/naereencorp/gedit/"

print ".:[ Initializing %s, v%s. (c) %s ]:." % (__app_disp_name__, __version__, __author__)
print ".:[ Take a look at %s for more informations, or for the latest version of this piece of software. ]:." % (__website__)

from gi.repository import GObject, GLib, Gio, Pango, Gdk, Gtk, Gedit, Vte
import os
import gettext
from gpdefs import *
from signal import SIGTERM, SIGKILL

try:
    gettext.bindtextdomain(GETTEXT_PACKAGE, GP_LOCALEDIR)
    _ = lambda s: gettext.dgettext(GETTEXT_PACKAGE, s);
except:
    _ = lambda s: s

class GeditTerminal2(Gtk.Box):
    """VTE terminal2 which follows gnome-terminal default profile options"""

    __gsignals__ = {
        "populate-popup": (
            GObject.SIGNAL_RUN_LAST,
            None,
            (GObject.TYPE_OBJECT,)
        )
    }

    defaults = {
        'emulation'             : 'xterm', # Don't try to put anything else here.
        'visible_bell'          : True, # NEW
        'audible_bell'          : True, # NEW
        #'opacity'          : 55000, # NEW
        'allow_bold'          : True, # NEW
    }

    def __init__(self):
        Gtk.Box.__init__(self)

        self.profile_settings = self.get_profile_settings()
        self.profile_settings.connect("changed", self.on_profile_settings_changed)
        self.system_settings = Gio.Settings.new("org.gnome.desktop.interface")
        self.system_settings.connect("changed::monospace-font-name", self.font_changed)

        self._vte = Vte.Terminal()
        self.reconfigure_vte()
        self._vte.set_size(self._vte.get_column_count(), 5)
        self._vte.set_size_request(200, 50)
        self._vte.show()
        self.pack_start(self._vte, True, True, 0)

        scrollbar = Gtk.Scrollbar.new(Gtk.Orientation.VERTICAL, self._vte.get_vadjustment())
        scrollbar.show()
        self.pack_start(scrollbar, False, False, 0)

        # we need to reconf colors if the style changes
        #FIXME: why?
        #self._vte.connect("style-update", lambda term, oldstyle: self.reconfigure_vte())
        self._vte.connect("key-press-event", self.on_vte_key_press)
        self._vte.connect("button-press-event", self.on_vte_button_press)
        self._vte.connect("popup-menu", self.on_vte_popup_menu)
        self._vte.connect("child-exited", self.on_child_exited)
#: FIXME: TypeError: on_child_exited() takes exactly 1 argument (2 given)
#:        self._vte.connect("child-exited", lambda (self2, term2): self2.on_child_exited() )
#:        print "Connecting child-exited to _vte, with :"
#:        print "lambda self2,term2: self2.on_child_exited()"

        self._accel_base = '<gedit>/plugins/terminal'
        self._accels = {
            'copy-clipboard': [Gdk.KEY_C, Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK, self.copy_clipboard],
            'paste-clipboard': [Gdk.KEY_V, Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK, self.paste_clipboard]
        }

        for name in self._accels:
            path = self._accel_base + '/' + name
            accel = Gtk.AccelMap.lookup_entry(path)

            if not accel[0]:
                 Gtk.AccelMap.add_entry(path, self._accels[name][0], self._accels[name][1])

        self._vte.fork_command_full(Vte.PtyFlags.DEFAULT, None, [Vte.get_user_shell()], None, GLib.SpawnFlags.SEARCH_PATH, None, None)

    def on_child_exited(self, term):
#:        print "on_child_exited have been called (shell is terminated)"
        print ".:[ Re-launching a shell, on %s, v%s. (c) %s ]:." % (__app_disp_name__, __version__, __author__)
        print ".:[ Take a look at %s for more informations, or for the latest version of this piece of software. ]:." % (__website__)
        print self._vte.fork_command_full(Vte.PtyFlags.DEFAULT, None, [Vte.get_user_shell()], None, GLib.SpawnFlags.SEARCH_PATH, None, None)

    def do_grab_focus(self):
        self._vte.grab_focus()

    def get_profile_settings(self):
        #FIXME return either the gnome-terminal settings or the gedit one
        return Gio.Settings.new("org.gnome.gedit.plugins.terminal")

    def get_font(self):
        if self.profile_settings.get_boolean("use-system-font"):
            font = self.system_settings.get_string("monospace-font-name")
        else:
            font = self.profile_settings.get_string("font")

        return font

    def font_changed(self, settings=None, key=None):
        font = self.get_font()
        font_desc = Pango.font_description_from_string(font)

        self._vte.set_font(font_desc)

    def reconfigure_vte(self):
        # Fonts
        self.font_changed()

        # colors
        context = self._vte.get_style_context()
        fg = context.get_color(Gtk.StateFlags.NORMAL)
        bg = context.get_background_color(Gtk.StateFlags.NORMAL)
        palette = []

        if not self.profile_settings.get_boolean("use-theme-colors"):
            fg_color = self.profile_settings.get_string("foreground-color")
            if fg_color != "":
                fg = Gdk.RGBA()
                parsed = fg.parse(fg_color)
            bg_color = self.profile_settings.get_string("background-color")
            if bg_color != "":
                bg = Gdk.RGBA()
                parsed = bg.parse(bg_color)
        str_colors = self.profile_settings.get_string("palette")
        if str_colors != "":
            for str_color in str_colors.split(':'):
                try:
                    rgba = Gdk.RGBA()
                    rgba.parse(str_color)
                    palette.append(rgba)
                except:
                    palette = []
                    break
            if (len(palette) not in (0, 8, 16, 24)):
                palette = []

        self._vte.set_colors_rgba(fg, bg, palette)

        self._vte.set_cursor_blink_mode(self.profile_settings.get_enum("cursor-blink-mode"))
        self._vte.set_cursor_shape(self.profile_settings.get_enum("cursor-shape"))
        self._vte.set_audible_bell(not self.profile_settings.get_boolean("silent-bell"))
        self._vte.set_allow_bold(self.profile_settings.get_boolean("allow-bold"))
        self._vte.set_scroll_on_keystroke(self.profile_settings.get_boolean("scrollback-on-keystroke"))
        self._vte.set_scroll_on_output(self.profile_settings.get_boolean("scrollback-on-output"))
        self._vte.set_word_chars(self.profile_settings.get_string("word-chars"))
        self._vte.set_emulation(self.defaults['emulation'])
        self._vte.set_visible_bell(self.defaults['visible_bell'])
        # NEW.
        self._vte.set_audible_bell(self.defaults['audible_bell'])
        #self._vte.set_opacity(self.defaults['opacity'])
        self._vte.set_allow_bold(self.defaults['allow_bold'])

        if self.profile_settings.get_boolean("scrollback-unlimited"):
            lines = -1
        else:
            lines = self.profile_settings.get_int("scrollback-lines")
        self._vte.set_scrollback_lines(lines)

    def on_profile_settings_changed(self, settings, key):
        self.reconfigure_vte()

    def on_vte_key_press(self, term, event):
        modifiers = event.state & Gtk.accelerator_get_default_mod_mask()
        if event.keyval in (Gdk.KEY_Tab, Gdk.KEY_KP_Tab, Gdk.KEY_ISO_Left_Tab):
            if modifiers == Gdk.ModifierType.CONTROL_MASK:
                self.get_toplevel().child_focus(Gtk.DirectionType.TAB_FORWARD)
                return True
            elif modifiers == Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK:
                self.get_toplevel().child_focus(Gtk.DirectionType.TAB_BACKWARD)
                return True

        for name in self._accels:
            path = self._accel_base + '/' + name
            entry = Gtk.AccelMap.lookup_entry(path)

            if entry and entry[0] and entry[1].accel_key == event.keyval and entry[1].accel_mods == modifiers:
                self._accels[name][2]()
                return True

        return False

    def on_vte_button_press(self, term, event):
        if event.button == 3:
            self._vte.grab_focus()
            self.make_popup(event)
            return True

        return False

    def on_vte_popup_menu(self, term):
        self.make_popup()

    def create_popup_menu(self):
        menu = Gtk.Menu()

        item = Gtk.ImageMenuItem.new_from_stock(Gtk.STOCK_COPY, None)
        item.connect("activate", lambda menu_item: self.copy_clipboard())
        item.set_accel_path(self._accel_base + '/copy-clipboard')
        item.set_sensitive(self._vte.get_has_selection())
        menu.append(item)

        item = Gtk.ImageMenuItem.new_from_stock(Gtk.STOCK_PASTE, None)
        item.connect("activate", lambda menu_item: self.paste_clipboard())
        item.set_accel_path(self._accel_base + '/paste-clipboard')
        menu.append(item)

        #MenuItem => separator
        item = Gtk.SeparatorMenuItem()
        menu.append(item)

        #MenuItem => About
        item = Gtk.ImageMenuItem.new_from_stock("gtk-about", None)
        item.connect("activate", lambda menu_item: self.show_about_dialog())
        menu.append(item)

        self.emit("populate-popup", menu)
        menu.show_all()
        return menu

    def make_popup(self, event = None):
        menu = self.create_popup_menu()
        menu.attach_to_widget(self, None)

        if event is not None:
            menu.popup(None, None, None, None, event.button, event.time)
        else:
            menu.popup(None, None,
                       lambda m: Gedit.utils_menu_position_under_widget(m, self),
                       None,
                       0, Gtk.get_current_event_time())
            menu.select_first(False)

    def copy_clipboard(self):
        self._vte.copy_clipboard()
        self._vte.grab_focus()

    def paste_clipboard(self):
        self._vte.paste_clipboard()
        self._vte.grab_focus()

    def change_directory(self, path):
        path = path.replace('\\', '\\\\').replace('"', '\\"')
        self._vte.feed_child('cd "%s" # Inserted by Gnome-Terminal.\n' % path, -1)
        self._vte.grab_focus()

    def show_about_dialog(self):
        """Display the about dialog."""
        about_dlg = Gtk.AboutDialog()
        #Set the content of the dialog
        about_dlg.set_program_name(__app_disp_name__)
        about_dlg.set_version(__version__)
        about_dlg.set_comments(__doc__)
        about_dlg.set_website(__website__)
        about_dlg.set_copyright("Copyright (c) 2005-13  %s" % __author__)
#: FIXME : on doit aller la chercher + intelligemment.
        logo = Gtk.Image.new_from_file("/usr/share/icons/gnome/32x32/apps/terminal.png") # 32x32
        about_dlg.set_logo(logo.get_pixbuf())
        #Signal
        about_dlg.connect("response", lambda w, r: w.destroy())
        #Display the dialog
        about_dlg.show()

class TerminalPlugin2(GObject.Object, Gedit.WindowActivatable):
    __gtype_name__ = "TerminalPlugin2"

    window = GObject.property(type=Gedit.Window)

    def __init__(self):
        GObject.Object.__init__(self)

    def do_activate(self):
        self._panel = GeditTerminal2()
        self._panel.connect("populate-popup", self.on_panel_populate_popup)
        self._panel.show()

        image = Gtk.Image.new_from_icon_name("utilities-terminal", Gtk.IconSize.MENU)

        side = self.window.get_side_panel()
        side.add_item(self._panel, "GeditTerminal2Panel", _("Embedded Terminal"), image)
        # FIXME

    def do_deactivate(self):
        side = self.window.get_side_panel()
        side.remove_item(self._panel)

    def do_update_state(self):
        pass

    def get_active_document_directory(self):
        doc = self.window.get_active_document()
        if doc is None:
            return None
        location = doc.get_location()
        if location is not None and Gedit.utils_location_has_file_scheme(location):
            directory = location.get_parent()
            return directory.get_path()
        return None

    def on_panel_populate_popup(self, panel, menu):
        menu.prepend(Gtk.SeparatorMenuItem())
        path = self.get_active_document_directory()
        item = Gtk.MenuItem.new_with_mnemonic(_("C_hange Directory"))
        item.connect("activate", lambda menu_item: panel.change_directory(path))
        item.set_sensitive(path is not None)
        menu.prepend(item)

# Let's conform to PEP8
# ex:ts=4:et:

# -*- coding: utf8 -*-

############################################################################
# terminal3.py - Embeded VTE terminal for gedit
# This file is part of gedit
#
# Copyright (C) 2005-2006 - Paolo Borelli
# Copyright (C) 2013  Lilian BESSON <lbesson at ens-cachan dot fr>
#
# gedit is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# gedit is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with gedit; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor,
# Boston, MA  02110-1301  USA
############################################################################
## To copy here : /usr/lib/gedit/plugins

""" A terminal embedded in Gedit inferior panel, v3.2.3."""

__author__ = "Paolo Borelli, Lilian BESSON <lbesson at ens-cachan dot fr> for Naereen CORP."
__version__ = "3.2.3"
__appname__ = "gedit-terminal3"
__app_disp_name__ = "Gedit Embeded Terminal3"
__website__ = "https://sites.google.com/site/naereencorp/gedit/"

print ".:[ Initializing %s, v%s. (c) %s ]:." % (__app_disp_name__, __version__, __author__)
print ".:[ Take a look at %s for more informations, or for the latest version of this piece of software. ]:." % (__website__)

from gi.repository import GObject, GLib, Gio, Pango, Gdk, Gtk, Gedit, Vte
import os
import gettext
from gpdefs import *
from signal import SIGTERM, SIGKILL

try:
    gettext.bindtextdomain(GETTEXT_PACKAGE, GP_LOCALEDIR)
    _ = lambda s: gettext.dgettext(GETTEXT_PACKAGE, s);
except:
    _ = lambda s: s

class GeditTerminal3(Gtk.Box):
    """VTE terminal3 which follows gnome-terminal default profile options"""

    __gsignals__ = {
        "populate-popup": (
            GObject.SIGNAL_RUN_LAST,
            None,
            (GObject.TYPE_OBJECT,)
        )
    }

    defaults = {
        'emulation'             : 'xterm', # Don't try to put anything else here.
        'visible_bell'          : True, # NEW
        'audible_bell'          : True, # NEW
        #'opacity'          : 55000, # NEW
        'allow_bold'          : True, # NEW
    }

    def __init__(self):
        Gtk.Box.__init__(self)

        self.profile_settings = self.get_profile_settings()
        self.profile_settings.connect("changed", self.on_profile_settings_changed)
        self.system_settings = Gio.Settings.new("org.gnome.desktop.interface")
        self.system_settings.connect("changed::monospace-font-name", self.font_changed)

        self._vte = Vte.Terminal()
        self.reconfigure_vte()
        self._vte.set_size(self._vte.get_column_count(), 5)
        self._vte.set_size_request(200, 50)
        self._vte.show()
        self.pack_start(self._vte, True, True, 0)

        scrollbar = Gtk.Scrollbar.new(Gtk.Orientation.VERTICAL, self._vte.get_vadjustment())
        scrollbar.show()
        self.pack_start(scrollbar, False, False, 0)

        # we need to reconf colors if the style changes
        #FIXME: why?
        #self._vte.connect("style-update", lambda term, oldstyle: self.reconfigure_vte())
        self._vte.connect("key-press-event", self.on_vte_key_press)
        self._vte.connect("button-press-event", self.on_vte_button_press)
        self._vte.connect("popup-menu", self.on_vte_popup_menu)
        self._vte.connect("child-exited", self.on_child_exited)
#: FIXME: TypeError: on_child_exited() takes exactly 1 argument (2 given)
#:        self._vte.connect("child-exited", lambda (self2, term2): self2.on_child_exited() )
#:        print "Connecting child-exited to _vte, with :"
#:        print "lambda self2,term2: self2.on_child_exited()"

        self._accel_base = '<gedit>/plugins/terminal'
        self._accels = {
            'copy-clipboard': [Gdk.KEY_C, Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK, self.copy_clipboard],
            'paste-clipboard': [Gdk.KEY_V, Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK, self.paste_clipboard]
        }

        for name in self._accels:
            path = self._accel_base + '/' + name
            accel = Gtk.AccelMap.lookup_entry(path)

            if not accel[0]:
                 Gtk.AccelMap.add_entry(path, self._accels[name][0], self._accels[name][1])

        self._vte.fork_command_full(Vte.PtyFlags.DEFAULT, None, [Vte.get_user_shell()], None, GLib.SpawnFlags.SEARCH_PATH, None, None)

    def on_child_exited(self, term):
#:        print "on_child_exited have been called (shell is terminated)"
        print ".:[ Re-launching a shell, on %s, v%s. (c) %s ]:." % (__app_disp_name__, __version__, __author__)
        print ".:[ Take a look at %s for more informations, or for the latest version of this piece of software. ]:." % (__website__)
        print self._vte.fork_command_full(Vte.PtyFlags.DEFAULT, None, [Vte.get_user_shell()], None, GLib.SpawnFlags.SEARCH_PATH, None, None)

    def do_grab_focus(self):
        self._vte.grab_focus()

    def get_profile_settings(self):
        #FIXME return either the gnome-terminal settings or the gedit one
        return Gio.Settings.new("org.gnome.gedit.plugins.terminal")

    def get_font(self):
        if self.profile_settings.get_boolean("use-system-font"):
            font = self.system_settings.get_string("monospace-font-name")
        else:
            font = self.profile_settings.get_string("font")

        return font

    def font_changed(self, settings=None, key=None):
        font = self.get_font()
        font_desc = Pango.font_description_from_string(font)

        self._vte.set_font(font_desc)

    def reconfigure_vte(self):
        # Fonts
        self.font_changed()

        # colors
        context = self._vte.get_style_context()
        fg = context.get_color(Gtk.StateFlags.NORMAL)
        bg = context.get_background_color(Gtk.StateFlags.NORMAL)
        palette = []

        if not self.profile_settings.get_boolean("use-theme-colors"):
            fg_color = self.profile_settings.get_string("foreground-color")
            if fg_color != "":
                fg = Gdk.RGBA()
                parsed = fg.parse(fg_color)
            bg_color = self.profile_settings.get_string("background-color")
            if bg_color != "":
                bg = Gdk.RGBA()
                parsed = bg.parse(bg_color)
        str_colors = self.profile_settings.get_string("palette")
        if str_colors != "":
            for str_color in str_colors.split(':'):
                try:
                    rgba = Gdk.RGBA()
                    rgba.parse(str_color)
                    palette.append(rgba)
                except:
                    palette = []
                    break
            if (len(palette) not in (0, 8, 16, 24)):
                palette = []

        self._vte.set_colors_rgba(fg, bg, palette)

        self._vte.set_cursor_blink_mode(self.profile_settings.get_enum("cursor-blink-mode"))
        self._vte.set_cursor_shape(self.profile_settings.get_enum("cursor-shape"))
        self._vte.set_audible_bell(not self.profile_settings.get_boolean("silent-bell"))
        self._vte.set_allow_bold(self.profile_settings.get_boolean("allow-bold"))
        self._vte.set_scroll_on_keystroke(self.profile_settings.get_boolean("scrollback-on-keystroke"))
        self._vte.set_scroll_on_output(self.profile_settings.get_boolean("scrollback-on-output"))
        self._vte.set_word_chars(self.profile_settings.get_string("word-chars"))
        self._vte.set_emulation(self.defaults['emulation'])
        self._vte.set_visible_bell(self.defaults['visible_bell'])
        # NEW.
        self._vte.set_audible_bell(self.defaults['audible_bell'])
        #self._vte.set_opacity(self.defaults['opacity'])
        self._vte.set_allow_bold(self.defaults['allow_bold'])

        if self.profile_settings.get_boolean("scrollback-unlimited"):
            lines = -1
        else:
            lines = self.profile_settings.get_int("scrollback-lines")
        self._vte.set_scrollback_lines(lines)

    def on_profile_settings_changed(self, settings, key):
        self.reconfigure_vte()

    def on_vte_key_press(self, term, event):
        modifiers = event.state & Gtk.accelerator_get_default_mod_mask()
        if event.keyval in (Gdk.KEY_Tab, Gdk.KEY_KP_Tab, Gdk.KEY_ISO_Left_Tab):
            if modifiers == Gdk.ModifierType.CONTROL_MASK:
                self.get_toplevel().child_focus(Gtk.DirectionType.TAB_FORWARD)
                return True
            elif modifiers == Gdk.ModifierType.CONTROL_MASK | Gdk.ModifierType.SHIFT_MASK:
                self.get_toplevel().child_focus(Gtk.DirectionType.TAB_BACKWARD)
                return True

        for name in self._accels:
            path = self._accel_base + '/' + name
            entry = Gtk.AccelMap.lookup_entry(path)

            if entry and entry[0] and entry[1].accel_key == event.keyval and entry[1].accel_mods == modifiers:
                self._accels[name][2]()
                return True

        return False

    def on_vte_button_press(self, term, event):
        if event.button == 3:
            self._vte.grab_focus()
            self.make_popup(event)
            return True

        return False

    def on_vte_popup_menu(self, term):
        self.make_popup()

    def create_popup_menu(self):
        menu = Gtk.Menu()

        item = Gtk.ImageMenuItem.new_from_stock(Gtk.STOCK_COPY, None)
        item.connect("activate", lambda menu_item: self.copy_clipboard())
        item.set_accel_path(self._accel_base + '/copy-clipboard')
        item.set_sensitive(self._vte.get_has_selection())
        menu.append(item)

        item = Gtk.ImageMenuItem.new_from_stock(Gtk.STOCK_PASTE, None)
        item.connect("activate", lambda menu_item: self.paste_clipboard())
        item.set_accel_path(self._accel_base + '/paste-clipboard')
        menu.append(item)

        #MenuItem => separator
        item = Gtk.SeparatorMenuItem()
        menu.append(item)

        #MenuItem => About
        item = Gtk.ImageMenuItem.new_from_stock("gtk-about", None)
        item.connect("activate", lambda menu_item: self.show_about_dialog())
        menu.append(item)

        self.emit("populate-popup", menu)
        menu.show_all()
        return menu

    def make_popup(self, event = None):
        menu = self.create_popup_menu()
        menu.attach_to_widget(self, None)

        if event is not None:
            menu.popup(None, None, None, None, event.button, event.time)
        else:
            menu.popup(None, None,
                       lambda m: Gedit.utils_menu_position_under_widget(m, self),
                       None,
                       0, Gtk.get_current_event_time())
            menu.select_first(False)

    def copy_clipboard(self):
        self._vte.copy_clipboard()
        self._vte.grab_focus()

    def paste_clipboard(self):
        self._vte.paste_clipboard()
        self._vte.grab_focus()

    def change_directory(self, path):
        path = path.replace('\\', '\\\\').replace('"', '\\"')
        self._vte.feed_child('cd "%s" # Inserted by Gnome-Terminal.\n' % path, -1)
        self._vte.grab_focus()

    def show_about_dialog(self):
        """Display the about dialog."""
        about_dlg = Gtk.AboutDialog()
        #Set the content of the dialog
        about_dlg.set_program_name(__app_disp_name__)
        about_dlg.set_version(__version__)
        about_dlg.set_comments(__doc__)
        about_dlg.set_website(__website__)
        about_dlg.set_copyright("Copyright (c) 2005-13  %s" % __author__)
#: FIXME : on doit aller la chercher + intelligemment.
        logo = Gtk.Image.new_from_file("/usr/share/icons/gnome/32x32/apps/terminal.png") # 32x32
        about_dlg.set_logo(logo.get_pixbuf())
        #Signal
        about_dlg.connect("response", lambda w, r: w.destroy())
        #Display the dialog
        about_dlg.show()

class TerminalPlugin3(GObject.Object, Gedit.WindowActivatable):
    __gtype_name__ = "TerminalPlugin3"

    window = GObject.property(type=Gedit.Window)

    def __init__(self):
        GObject.Object.__init__(self)

    def do_activate(self):
        self._panel = GeditTerminal3()
        self._panel.connect("populate-popup", self.on_panel_populate_popup)
        self._panel.show()

        image = Gtk.Image.new_from_icon_name("utilities-terminal", Gtk.IconSize.MENU)

        bottom = self.window.get_bottom_panel()
        bottom.add_item(self._panel, "GeditTerminal3Panel", _("Embedded Terminal"), image)
        # FIXME

    def do_deactivate(self):
        bottom = self.window.get_bottom_panel()
        bottom.remove_item(self._panel)

    def do_update_state(self):
        pass

    def get_active_document_directory(self):
        doc = self.window.get_active_document()
        if doc is None:
            return None
        location = doc.get_location()
        if location is not None and Gedit.utils_location_has_file_scheme(location):
            directory = location.get_parent()
            return directory.get_path()
        return None

    def on_panel_populate_popup(self, panel, menu):
        menu.prepend(Gtk.SeparatorMenuItem())
        path = self.get_active_document_directory()
        item = Gtk.MenuItem.new_with_mnemonic(_("C_hange Directory"))
        item.connect("activate", lambda menu_item: panel.change_directory(path))
        item.set_sensitive(path is not None)
        menu.prepend(item)

# Let's conform to PEP8
# ex:ts=4:et:

#! /usr/bin/python3
# -*- coding: utf8 -*-

# The directory passed as argument is the main directory of the
# mazhe project.


import os
import sys
import string

starting_path=os.path.abspath(sys.argv[1])

def exclude_dir(directory):
    if "build" in directory:
        return True
    if ".git" in directory :
        return True
    return False

def _tex_file_iterator(directory):
    for p in os.listdir(directory):
        path=os.path.join(directory,p)
        if os.path.isfile(path):
            if path.endswith(".tex"):
                yield path
        if os.path.isdir(path) and not exclude_dir(path):
            for f in _tex_file_iterator(path):
                yield f

def tex_file_iterator(directory):
    """
    Provides 'mazhe.bib' and then the '.tex' files in the
    directory (recursive).
    """
    yield os.path.join(directory,"mazhe.bib")
    for p in _tex_file_iterator(directory):
        yield p

def _file_to_url_iterator(filename):
    """
    iterate over the url cited in 'filename'
    """
    pos=0
    with open(filename,'r') as f:
        text=f.read()

    for line in text.split("\\url{")[1:]:
        url=line[0:line.find("}")]
        yield url
    for line in text.split("\\href{")[1:]:
        url=line[0:line.find("}")]
        yield url

    # La frime serait d'utiliser des vues de listes
    # pour éviter la copie.
    if filename.endswith("mazhe.bib"):
        for line in text.split("url =")[1:]:
            start=line.find('"')
            end=line.find('"',2)
            url=line[start+1:end]
            if url is not "...":
                yield url

# List of death links that we don't care (because from other projects)
useless_url=[]
useless_url.append("http://xmaths.free.fr/1S/exos/1SstatexA2.pdf")
useless_url.append("http://www.daniel-botton.fr/mathematiques/seconde/geometrie_plane/seconde_geometrie_plane_devoir.pdf")
useless_url.append("<++>")
useless_url.append("<++>")
useless_url.append("<++>")

def is_serious_url(url):
    if url == r"\lstname":
        return False
    if url in useless_url :
        return False
    return True


def file_to_url_iterator(filename):
    for url in _file_to_url_iterator(filename):
        if is_serious_url(url):
            yield url


def check_url_corectness(url,f):
    if url=="":
        print("There is an empty URL in ",f)
    if url[0] not in string.ascii_letters :
        print("In ",f," : the url does not starts with an ascii character :")
        print(url)

try:
    from httplib import HTTPConnection
except ImportError:
    from http.client import HTTPConnection
try:
    from urlparse import urlparse
except ImportError:
    from urllib.parse import urlparse

def checkUrl(url):
    try:
        p = urlparse(url)
        conn = HTTPConnection(p.netloc)
        conn.request('HEAD', p.path)
        resp = conn.getresponse()
        return resp.status < 400
    except Exception as e:
        print("Exception:", e)
        return False


import requests

def is_not_dead(url):
    try:
        ret = requests.head(url)
        return ret.status_code < 400
    except Exception as e:
        print("Exception:", e)
        return False

for f in tex_file_iterator(starting_path):
    print("File", f)
    for url in file_to_url_iterator(f):
        print("  URL", url)
        check_url_corectness(url,f)
        if not is_not_dead(url):
            print("death link in ",f," :")
            print(url)
        elif not checkUrl(url):
            print("death link in ",f," :")
            print(url)

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" Demo python script to test several algorithms that generate all permutation of a list.

Reference:
- http://typeocaml.com/2015/05/05/permutation/
- https://docs.python.org/3/library/itertools.html#itertools.permutations

- *Date:* 06/02/2017.
- *Author:* Lilian Besson, (C) 2015-16.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed
from functools import reduce

# Builtin implementation, as a reference
from itertools import permutations as itertools_permutations


# --- First algorithm : The insert-into-all-positions solution

def ins_all_positions(x, l):
    """Return a list of lists obtained from l by inserting x at every possible index."""
    res = []
    for i in range(0, len(l) + 1):
        res.append(l[:i] + [x] + l[i:])
    return res


# Now the main permutations generator.
def first_permutations(iterable):
    """Second algorithm, insert-into-all-positions solution."""
    if len(iterable) == 0:
        return []
    # we must specify this edge case
    elif len(iterable) == 1:
        return [[iterable[0]]]
    else:
        x, xs = iterable[0], iterable[1:]
        return reduce(lambda acc, p: acc + ins_all_positions(x, p), first_permutations(xs), [])


# --- Second algorithm : The fixed-head solution

def rm(x, l):
    """List l without element x."""
    return [y for y in l if x != y]


def head_of_all(x, l):
    """List of lists from l where x is the head of all the lists."""
    return [[x] + p for p in l]


def second_permutations(iterable):
    """Second algorithm, fixed-head solution."""
    if len(iterable) == 0:
        return []
    # we must specify this edge case
    elif len(iterable) == 1:
        return [[iterable[0]]]
    else:
        return reduce(lambda acc, x: acc + head_of_all(x, second_permutations(rm(x, iterable))), iterable, [])


# --- Third algorithm : Johnson Trotter algorithm
left = False
right = True


def attach_direction(t, d=left):
    """Attach the direction d to all elements of array t."""
    return [(x, d) for x in t]


def remove_direction(t):
    """Remove the attached direction d to all elements of array t."""
    return [y for y, _ in t]


def swap(t, i, j):
    """Swap t[i] and t[j] in array t."""
    t[i], t[j] = t[j], t[i]


def is_movable(a, i):
    """Can a[i] be moved?"""
    x, d = a[i]
    if d == left:
        return i > 0 and x > a[i - 1][0]
    elif d == right:
        return i < len(a) - 1 and x > a[i + 1][0]
    else:
        raise ValueError("unknown direction d = {}".format(d))


def move(a, i):
    """Move it if possible."""
    x, d = a[i]
    if is_movable(a, i):
        if d == left:
            swap(a, i, i - 1)
        elif d == right:
            swap(a, i, i + 1)
        else:
            raise ValueError("unknown direction d = {}".format(d))
    else:
        raise ValueError("not movable")


def scan_largest_movable(a):
    """Find the largest movable element."""
    def aux(acc, i):
        if i >= len(a):
            return acc
        else:
            if not is_movable(a, i):
                return aux(acc, i + 1)
            else:
                x, _ = a[i]
                if acc is None:
                    return aux(i, i + 1)
                else:
                    j = acc if x < a[acc][0] else i
                    return aux(j, i + 1)
    return aux(None, 0)


def flip(d):
    """Flip direction d : left -> right, right -> left"""
    return not d


def scan_flip_larger(x, a):
    """Scan to flip larger."""
    for i, (y, d) in enumerate(a):
        if y > x:
            a[i] = y, flip(d)


def third_permutations(iterable):
    """Third algorithm, Johnson Trotter algorithm."""
    i = sorted(list(iterable))  # Required by the algorithm
    a = attach_direction(i)
    r = list(iterable)[:]
    while True:
        p = r[:]
        yield p
        i = scan_largest_movable(a)
        if i is None:  # No more permutation!
            raise StopIteration
        else:
            x, _ = a[i]
            move(a, i)
            scan_flip_larger(x, a)
            r = remove_direction(a)


# --- Function to test and compare them

def test(list_of_f, iterable, stopearly=False):
    """ Test that all functions in list_of_f give the same list of permutation on this iterable."""
    print("\n\nTesting for the list of functions {} ...".format([f.__name__ for f in list_of_f]))  # DEBUG
    result = True
    print("Testing for the iterable {} ...".format(iterable))  # DEBUG
    i = iterable
    allperms = []
    for f in list_of_f:
        allperms.append(sorted([list(p) for p in f(iterable)]))
    for i, pi in enumerate(allperms):
        for j in range(i + 1, len(allperms)):
            pj = allperms[j]
            if pi != pj:
                print(" - Function #{} ({.__name__}) gave a different list of permutations as function #{} ({.__name__}) ...".format(i, list_of_f[i], j, list_of_f[j]))  # DEBUG
                # print("   - pi =", pi)  # DEBUG
                # print("   - pj =", pj)  # DEBUG
                if stopearly:
                    return False
                else:
                    result = False
            else:
                print(" - Function #{} ({.__name__}) gave the same list of permutations as function #{} ({.__name__}) ...".format(i, list_of_f[i], j, list_of_f[j]))  # DEBUG
    return result


def main():
    # list_of_f = [itertools_permutations, first_permutations]
    # list_of_f = [itertools_permutations, first_permutations, second_permutations]
    list_of_f = [itertools_permutations, first_permutations, second_permutations, third_permutations]

    iterable = [1, 2, 3]
    test(list_of_f, iterable)

    iterable = [1, 2, 3, 4, 5]
    test(list_of_f, iterable)

    iterable = [1, 2, 3, 4, 5, 6]
    test(list_of_f, iterable)


if __name__ == '__main__':
    main()
    print("TODO: finish this script !")

# End of test-permutation-algorithms.py

#! /usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" EXPERIMENTAL Python 3.4+ script to check if a train ticket on www.voyages-sncf.com is available or not.

WARNING: this script is only here to play and experiment with it, and demonstrate what robobrowser can do, NOT to be ran really.

Requirement:
- RoboBrowser, http://robobrowser.readthedocs.io, pip install robobrowser

- *Date:* Tuesday 20 November 2018.
- *Author:* Lilian Besson, (C) 2016-2018.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function, division  # Python 2 compatibility if needed

from robobrowser import RoboBrowser as RB
import re
import json
from sys import exit, argv


# Create and compile now the required regexp
url_finder = re.compile(r'http[^"]*')
query_finder = re.compile(r"data.query = JSON.parse\('\{[^\n]*")
searchResponse_finder = re.compile(r"data.searchResponse = JSON.parse\('\{[^\n]*")


# url0 = "http://www.voyages-sncf.com//vsc/train-ticket/?_LANG=fr&site_country=FR&site_language=fr&ORIGIN_CITY=Toulon&DESTINATION_CITY=Paris%20%28Toutes%20gares%20intramuros%29&OUTWARD_DATE=31/05/2016&OUTWARD_TIME=15&INWARD_DATE=&INWARD_TIME=7&COMFORT_CLASS=2&DISTRIBUTED_COUNTRY=FR&NB_TYPO_ADULT=1&bookingChoice=train&PASSENGER_1=YOUNG&PASSENGER_1_CARD=MI1ST&PASSENGER_1_FID_PROG=&PASSENGER_1FID_NUM_BEGIN=&CODE_PROMO_1=&action:searchTravel=Rechercher"

#URL_TEMPLATE = "http://www.voyages-sncf.com//vsc/train-ticket/?_LANG=fr&site_country=FR&site_language=fr&ORIGIN_CITY={ORIGIN_CITY}&DESTINATION_CITY={DESTINATION_CITY}&OUTWARD_DATE={DATE}&OUTWARD_TIME={OUTWARD_TIME}&INWARD_DATE=&INWARD_TIME=7&COMFORT_CLASS=2&DISTRIBUTED_COUNTRY=FR&NB_TYPO_ADULT=1&bookingChoice=train&PASSENGER_1=YOUNG&PASSENGER_1_CARD=MI1ST&PASSENGER_1_FID_PROG=&PASSENGER_1FID_NUM_BEGIN=&CODE_PROMO_1=&action:searchTravel=Rechercher"
URL_TEMPLATE = 'https://www.oui.sncf/vsc/train-ticket/?_LANG=fr&ORIGIN_CITY={ORIGIN_CITY}&DESTINATION_CITY={DESTINATION_CITY}&OUTWARD_DATE={DATE}&OUTWARD_TIME={OUTWARD_TIME}&DIRECT_TRAVEL_CHECK=1&COMFORT_CLASS=2&PASSENGER_1=YOUNG&PASSENGER_1_CARD=&PASSENGER_1_FID_PROG=&PASSENGER_1FID_NUM_BEGIN=&CODE_PROMO_1=&PASSENGER_1_CARD_NUMBER=&PASSENGER_1_CARD_BIRTH_DATE=&action:searchTravelLaunchTrain=Rechercher'
#EXEMPLE SANS CARTE PARTICULIERE TARIF NORMAL

# url1 = 'http://www.voyages-sncf.com/vsc/proposals/findProposals?hid='


def main(url, MY_OUTWARD_TIME_MINI, MY_OUTWARD_TIME_MAXI="23:59"):
    """ Go to the page 'url', find the next link to got, then extract the JSON query result, find the wanted train, and display the results.
    """
    MY_OUTWARD_TIME_MINI = MY_OUTWARD_TIME_MINI.replace('h', ':')
    MY_OUTWARD_TIME_MAXI = MY_OUTWARD_TIME_MAXI.replace('h', ':')
    # Create the web browser object
    b = RB(history=True, allow_redirects=True)
    # Open the page
    b.open(url)
    # Find the next page to go
    res = str(b.select('#url_redirect_proposals')[0])

    # # - First solution: manual search
    # offset = 4 + res.index('hid=')
    # length = 3
    # key = res[offset: offset + length]
    # print("key =", key)
    # next_url = url1 + str(key)
    # print("1. Next url =", next_url)
    # - Second solution: search with a regexp
    m = url_finder.search(res)
    next_url = m.string[m.start():m.end()]
    print("Next url =", next_url, "...")
    # Follow this url
    b.open(next_url)
    # Get the data.query part
    script = b.select('#vsc-preloaded-data-snippet')[0]
    content = script.contents[0]

    # 1. Search for the query to display it nicely again
    m = query_finder.search(content)
    jsontext = m.string[m.start():m.end()]
    # print(jsontext)
    beginning = "data.query = JSON.parse('"
    end = "');"
    query = jsontext[len(beginning): -len(end)]
    jsonrawstr = query.replace(r'\"', '"').replace(r'\'', "'")  # \" > ", \' > '
    # print(jsonrawstr)
    jsonobj = json.loads(jsonrawstr)
    #print(json.dumps(jsonobj, sort_keys=True, indent=4))

    # 2. Search for the result
    m = searchResponse_finder.search(content)
    jsontext = m.string[m.start():m.end()]
    # print(jsontext)
    beginning = "data.searchResponse = JSON.parse('"
    end = "');"
    searchResponse = jsontext[len(beginning): -len(end)]
    # print(searchResponse)
    jsonrawstr = searchResponse.replace(r'\"', '"').replace(r'\'', "'")  # \" > ", \' > '
    # print(jsonrawstr)
    jsonobj = json.loads(jsonrawstr)
    #print(json.dumps(jsonobj, sort_keys=True, indent=4))

    """
    with open('output.json', 'w+') as f:
        json.dump(jsonobj, f, sort_keys=True, indent=4)
    """

    # 3. Affichage des horaires
    print("\nDifferents horaires :")
    horaires = [ i['departureDate'] for i in jsonobj['trainProposals'] ]
    print(horaires)
    for number, h in enumerate(horaires):
        print("Pour un train partant a :", h)
        prices = jsonobj['trainProposals'][number]['priceProposals']
        if len(prices) > 0:
            prix = prices[0]['amount']
            print("\tPrix TGV minimum", "=", prix, "euros.")
        else:
            print("\tTrain complet.")





if __name__ == '__main__':

    dictRecherche = {
        'ORIGIN_CITY': 'Paris',
        'DESTINATION_CITY': 'Laval',
        'DATE': '29/11/2018',
        'OUTWARD_TIME': '6',
        }

    MY_OUTWARD_TIME_MINI = '06:00' # pas utilisé pour le moment
    MY_OUTWARD_TIME_MAXI = '23:59' # pas utilisé pour le moment

    url = URL_TEMPLATE.format(ORIGIN_CITY=dictRecherche['ORIGIN_CITY'], DESTINATION_CITY=dictRecherche['DESTINATION_CITY'], DATE=dictRecherche['DATE'], OUTWARD_TIME=dictRecherche['OUTWARD_TIME'])
    print("Utilisant url =", url)
    exit(main(url=url, MY_OUTWARD_TIME_MINI=MY_OUTWARD_TIME_MINI, MY_OUTWARD_TIME_MAXI=MY_OUTWARD_TIME_MAXI))


#!/usr/bin/python3
# -*- coding: utf-8; mode: python -*-
"""Small script to put all the strings in arguments to title case, as specified by the New York Times Manual of Style.

Requirements:
- *titlecase*, installable from PyPi or GitHub:
  $ (sudo) pip install titlecase
  Cf. https://github.com/ppannuto/python-titlecase/

About:
- *Date:* 19/02/2017.
- *Author:* Lilian Besson, (C) 2017
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function # Python 2 compatibility if needed

from sys import argv
try:
    from titlecase import titlecase
except ImportError:
    print("Install titlecase with 'pip install titlecase'...")  # DEBUG

if __name__ == '__main__':
    for v in argv[1:]:
        print(titlecase(v))

#!/usr/bin/env python
# -*- coding: utf-8; mode: python -*-
"""
A simple (beta) Python tool to plot graphics from Wikipédia statistics.

- Date: 02-06-2016
- Author: Lilian Besson, (C) 2016.
- Online: https://bitbucket.org/lbesson/bin/src/master/wikistats.py
- Licence: GPLv3.

Examples
--------
>>> wikistats.py --help
Gives help

>>> wikistats.py "Professeur Xavier" fr
Will produce a graphic of visiting statistics for the page https://fr.wikipedia.org/wiki/Professeur_Xavier for the last 30 days

------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

wikistats.py is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License v3 along with wikistats.py.
If not, see <http://perso.crans.org/besson/LICENSE.html>.
"""


from __future__ import print_function  # Python 2/3 compatibility !

# Pour détecter le langage par défault
import os
import sys

# Default values
language_default = os.getenv("LANG")[0:2]


def lang_to_text(lang, exception=False):
    """ lang_to_text(lang, exception=False) -> str

Convert a Wikipédia language code (two letters) to a English version of the language.

Example:
>>> lang_to_text("en")
'english'
>>> lang_to_text("fr")
'french'
    """
    if exception:
        try:
            # TODO improve this !
            return {"en": "english", "fr": "french"}[lang]
        except:
            "unknown"
    else:
        return {"en": "english", "fr": "french"}[lang]

latest = 30  # also 60 or 90 are available

template_url_default = "http://stats.grok.se/json/{language}/latest{latest}/{page}"

template_output_default = "{page}.{language}.json"


def download_json(page="JSON", language=language_default,
                  template_output=template_output_default,
                  template_url=template_url_default):
    """ download_json(page="JSON", template_output=template_output_default,                  language=language_default, template_url=templateurl_default) -> str

Download a JSON file.

@page: tell which Wikipédia page to lookup to.
@template_output: template string for the output JSON (.json) file.
@language: language to use for downloading the JSON.
@template_url: online page to use a format to download the JSON.

Example:
>>> download_json(page="France", language="en", template_output="{page}.en.json")
'France.en.json'

>>> download_json(page="France", language="fr", template_output="out_{page}.fr.json")
'out_France.fr.json'
    """
    from sys import stderr
    # To download the JSON file from the web
    # WARNING: https might not be supported
    import urllib2
    # To move the destination file to "/tmp/" if it is already there.
    import distutils.file_util

    url_to_download = template_url.format(page=page, language=language, latest=latest)
    outfile = template_output.format(page=page, language=language)

    try:
        stderr.write("\nWarning: The destination file '{outfile}' was already present in the current directory, now it is in {newfile}.\n".format(outfile=outfile, newfile=distutils.file_util.copy_file(outfile, "/tmp/")[0]))
    except distutils.file_util.DistutilsFileError:
        stderr.write("Perfect, apparently the destination file '{outfile}' is not there.\n".format(outfile=outfile))

    url_request = urllib2.urlopen(url_to_download)
    distutils.file_util.write_file(outfile, url_request.readlines())
    return outfile


def outfile_to_json(outfile_name):
    """ outfile_to_json(outfile_name) -> dir

    Try to dump and return the content of the file @outfile.
    """
    outfile = open(outfile_name)
    # To convert the content of this file in a Python dictionnary.
    import json
    try:
        json_obj = json.loads(outfile.readline())
    except ValueError:
        import string
        json_obj = json.loads(string.join(outfile.readlines()))
    return json_obj


def plot_stats_from_json(json_obj, graphic_name=None, graphic_name_template="{title}.{lang}.{ext}", ext="all", title=None):
    """ plot_stats_from_json(json_obj, graphic_name=None, graphic_name_template="{title}.{lang}.{ext}", ext="png") -> None

    Plot a couple of PNG/SVG/PDF statistics.

    .. warning:: Beta !
    """
    assert(ext in ["png", "svg", "pdf", "all"])

    title = title if title else json_obj["title"]
    lang = json_obj["project"]
    rank = json_obj["rank"]
    if rank == "-1":
        rank = "NA"

    if not graphic_name:
        graphic_name = graphic_name_template.format(title=title, lang=lang, ext=ext)

    views = json_obj["daily_views"]

    try:
        import datetime
        today = datetime.date.today()
        year, month, day = today.year, today.month, today.day
    except ImportError:
        year, month, day = "2016", "01", "01"

    # stats = {}
    data = []

    # We sort the keys by increasing dates
    for year_month_day in sorted(views, key=lambda s: s[-5:-3] + s[-2:]):
        # newkey = year_month_day[-5:-3] + "-" + year_month_day[-2:]
        # stats[newkey] = views[year_month_day]
        data.append([year_month_day, views[year_month_day]])
        # print("On {year}, the {date} the page \"{title}\" (lang={lang}) had {number} visitor{plural}.".format(date=newkey, number=stats[newkey], title=title, lang=lang, year=year, plural=("s" if stats[newkey]>1 else "")))

    # Now make a graphic thanks to this data
    print("A graphic will be produced to the file \"{graphic_name}\" (with the type \"{ext}\").".format(graphic_name=graphic_name, ext=ext))

    # We use numpy for the data manipulation and pylab for plotting (à la Matlab).
    import numpy
    import pylab
    data_old = data
    try:
        data = numpy.array(data)
    except:  # durty, almost impossible !
        print("Unable to convert data to a numpy array. Exiting now...")
        exit()

    # Just the numbers
    numbers = data[::, 1].astype(numpy.int)
    nbnumbers = numpy.size(numbers)

    print("The page \"{title}\", with language {lang}, has been ranked {rank}th on the {month}th month of {year}, for a total of {total} views.".format(title=title, lang=lang_to_text(lang, exception=True), rank=rank, month=month, year=year, total=sum(numbers)))

    # # Sort decreasingly (bad idea here)
    # ind = numpy.argsort(numbers)
    # data = data[ind]
    # numbers = numbers[ind]

    # Graph options
    pylab.xlabel("Dates from the last 30 days (at the {today})".format(today=datetime.date.today()))
    pylab.ylabel("Number of visitors")

    try:
        lang_name = "(in " + lang_to_text(lang, exception=False).capitalize() + ")"
    except KeyError:
        lang_name = "(unknown language)"
    pylab.title(u".: Visiting statistics for the Wikipedia page '{title}' {lang_name} :.\n (Data from http://stats.grok.se, Python script by Lilian Besson (C) 2014) ".format(title=title, lang_name=lang_name))

    # X axis
    pylab.xlim(1, nbnumbers + 1)
    pylab.xticks(range(nbnumbers + 1), [s[-2:] for s in data[:, 0]], rotation=70)
    # Y axis
    pylab.ylim(numbers.min() * 0.95, numbers.max() * 1.05)

    pylab.grid(True, alpha=0.4)

    # Compute (and plot) an (invisible) histogram
    # xvalues, bins, patches = pylab.hist(numbers, range(nbnumbers+1), alpha=0.0)
    bins = numpy.arange(start=1, stop=nbnumbers + 1)

    # We keep the days with visitors
    idc = numbers >= 0
    pylab.plot(bins[idc], numbers[idc], 'go--', linewidth=.5, markersize=5)

    # Tweak spacing to prevent clipping of ylabel
    pylab.subplots_adjust(left=0.15)  # bottom=0.5

#    pylab.show()  # only if interactive will testing
    # Plot the histogram on 3 files (png, svg, pdf)
    if ext == "all":
        graphic_name = "{title}.{lang}.".format(title=title, lang=lang)
        for ext in ["png", "svg", "pdf"]:
            pylab.savefig(graphic_name + ext, format=ext, dpi=600)
            print("Ploting the statistics on an histogram on the file \"{graphic_name}\".".format(graphic_name=graphic_name + ext))
            pylab.draw()
    # Otherwise use only the one given by the user
    else:
        pylab.savefig(graphic_name, format=ext, dpi=400)
        print("Ploting the statistics on an histogram on the file \"{graphic_name}\".".format(graphic_name=graphic_name))
        pylab.draw()
    pylab.clf()

    return views, data, data_old, numbers


def main(argv):
    """ main(argv) -> None

    Main function. Use the arguments of the command line."""

    # print("argv: ", argv)
    if "-h" in argv or "--help" in argv:
        print("wikistats.py --help|-h | page [language_code]")
        return 1

    language = argv[1] if len(argv) > 1 else language_default
    page = argv[0] if len(argv) > 0 else "Professeur Xavier"

    outfile = download_json(page=page, language=language)
    json_obj = outfile_to_json(outfile)

    views, data, data_old, numbers = plot_stats_from_json(json_obj, title=page)
    return 0


if __name__ == "__main__":
    sys.exit(int(main(sys.argv[1:])))

#! /usr/local/bin/scrapy runspider
# -*- coding: utf-8; mode: python -*-
""" A small scrapper (using Scrapy) to extract URL of some songs in my YouTube "Watch Later" playlist.

- *Reference:* https://doc.scrapy.org/
- *Date:* 01/04/2017.
- *Author:* Lilian Besson © 2017.
- *Licence:* MIT Licence (http://lbesson.mit-license.org).
"""

from __future__ import print_function  # Python 2 compatibility if needed

import logging
import scrapy

# Trying to disable logging
logging.getLogger('scrapy').setLevel(logging.WARNING)
logging.getLogger('scrapy').propagate = False
logging.getLogger('scrapy.utils').propagate = False


class QuotesSpider(scrapy.Spider):
    """Small scrapy Spider."""
    name = "Watch Later"
    start_urls = [
        'file:///tmp/wl.html'
    ]
    custom_settings = {
    	"LOG_ENABLED": False,
    	"LOG_LEVEL": 'ERROR',
    }

    def parse(self, response):
        """Parse the response to print a JSON file of all videos in /tmp/wl.html"""
        i = 0
        for item in response.css('td.pl-video-title'):
            i += 1  # enumerate(...) was not working!
            video = item.css('a.pl-video-title-link')[0]
            author = item.css('div.pl-video-owner')[0]
            res = {
                'id': i,
                'href': video.xpath('@href').extract_first().replace('&index=%i&list=WL'%i, ''),
                'title': video.css('a::text').extract_first().strip(),
                'author': author.css('a::text').extract_first().strip()
            }
            print(res)
            #yield res


# End of youtube_playlist_spider_scrapy.py

#!/usr/bin/env python3
# -*- coding: utf-8; mode: python -*-
""" My not-too-naive answer to https://github.com/dutc/battlegame

Bot part!

- Author: Lilian Besson, (C) 2018.
- Online: https://bitbucket.org/lbesson/bin/src/master/battleplayer.py
- License: MIT License (http://lbesson.mit-license.org).
"""
__author__ = "Lilian Besson"
__name_of_app__ = "Battle Client"
__version__ = "0.1"

import sys
from collections import defaultdict
from time import sleep
from random import choice
from docopt import docopt
import numpy as np
# https://stackoverflow.com/a/4896288/5889533
from subprocess import PIPE, Popen
ON_POSIX = 'posix' in sys.builtin_module_names

from battleserver import ships, DEFAULT_X, DEFAULT_Y

length_of_ships = defaultdict(lambda: min(ships.values()))
length_of_ships.update({k.lower(): v for k,v in ships.items()})

# --- Documentation

documentation = f"""{__name_of_app__}.

Usage:
    battleplayer.py [--delay=<t>] [--smart] [--size=<xy>] [--server_command=<cmd>]
    battleplayer.py (-h | --help)
    battleplayer.py --version

Options:
    -h --help       Show this screen.
    --version       Show version.
    --server_command=<cmd>  Play against a server launched by 'cmd' [default: ./battleserver.py --random --play].
    --size=<xy>     Set size of the board [default: {DEFAULT_X},{DEFAULT_Y}].
    --delay=<t>     Delay between successive plays, in seconds [default: 0.1].
    --smart         Try to be smart when playing. Experimental.
"""


def main(args):
    cmd = args['--server_command']
    sizex, sizey = [int(i) for i in args['--size'].split(',')]
    delay = float(args['--delay'])
    if '--size' not in cmd:
        cmd += f" --size={sizex},{sizey}"
    smart = args['--smart']

    if not cmd: return 1

    pipe = Popen(cmd.split(' '), stdout=PIPE, stdin=PIPE, bufsize=1, close_fds=ON_POSIX, universal_newlines=True)
    child_stdin, child_stdout = pipe.stdin, pipe.stdout

    all_possible_positions = [
        (x, y)
        for x in range(sizex)
        for y in range(sizey)
    ]
    max_nb_positions = len(all_possible_positions)
    hit_a_ship = False
    length_of_hit_ship = 0
    last_hist_ship = None
    next_x_y = []
    hit_x, hit_y = -1, -1

    def next_play():
        # global all_possible_positions, child_stdin
        x, y = 0, 0
        t = len(all_possible_positions)
        if t > 0:
            if next_x_y:
                # FIXME that's where I can improve!
                x, y = next_x_y.pop(0)
            else:
                x, y = choice(all_possible_positions)
        print(f"bot: {x},{y}")
        print(f"{x},{y}", file=child_stdin, flush=True)
        return x, y

    x, y = -1, -1
    while True:
        # 1. playing
        if (x, y) in all_possible_positions: all_possible_positions.remove((x, y))
        x, y = next_play()
        # 2. seeing output and using it as feedback
        stdout_data = child_stdout.readline()
        if not stdout_data:
            print("ERROR: Server died!")
            return 2
        if smart:
            if 'hit ' in stdout_data:  # hit a ship!
                new_hit_ship = stdout_data.replace('\n','').replace('hit ','')
                if not hit_a_ship:
                    # first hit of this ship
                    hit_a_ship = True
                    last_hist_ship = new_hit_ship
                    length_of_hit_ship = length_of_ships[last_hist_ship]
                    hit_x, hit_y = x, y
                    next_x_y = [
                        (newx, y)
                        for newx in range(
                            max(0, x - length_of_hit_ship),
                            min(sizex, x + length_of_hit_ship)
                        )
                        if (newx, y) in all_possible_positions
                        if newx != hit_x
                    ] + [
                        (x, newy)
                        for newy in range(
                            max(0, y - length_of_hit_ship),
                            min(sizey, y + length_of_hit_ship)
                        )
                        if (x, newy) in all_possible_positions
                        if newy != hit_y
                    ]
                else:
                    if new_hit_ship != last_hist_ship:
                        print(f"WARNING: was hitting {last_hist_ship} but now hitting {new_hit_ship}")
                        if new_hit_ship is None:
                            if x == hit_x:  # we tried to aim at same x
                                for _y in range(0, sizey):
                                    if _y in next_x_y and hit_y != _y: next_x_y.remove((x, _y))
                            if y == hit_y:  # we tried to aim at same y
                                for _x in range(0, sizex):
                                    if _x in next_x_y and hit_x != _x: next_x_y.remove((_x, y))
                    else:
                        if x == hit_x:  # the ship has same x
                            for _y in range(0, sizey):
                                if _y in next_x_y: next_x_y.remove((x, _y))
                        if y == hit_y:  # the ship has same y
                            for _x in range(0, sizex):
                                if _x in next_x_y: next_x_y.remove((_x, y))
            elif 'sunk ' in stdout_data:  # sunk a ship!
                new_hit_ship = stdout_data.replace('\n','').replace('sunk ','')
                if new_hit_ship != last_hist_ship:
                    print(f"WARNING: was hitting {last_hist_ship} but sunk {new_hit_ship}")
                else:
                    hit_a_ship = False
                    last_hist_ship = None
                    next_x_y = []
        # done for smart
        print(f"board: {stdout_data}", end='')
        if 'you win!' in stdout_data:
            print("VICTORY!")
            return 0
        if len(all_possible_positions) == 0:
            print("ERROR: cannot play anymore, all positions were tried but the bot did not win!")
            return 1
        sleep(delay)

if __name__ == '__main__':
    arguments = docopt(documentation, version=f"{__name_of_app__} v{__version__}")
    sys.exit(main(arguments))
