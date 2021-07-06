import argparse

welcome = "Practicing creating interactive command-line interfaces"

parser = argparse.ArgumentParser(description=welcome)
parser.add_argument('--domain', '-d', required=True,
                    help='domain name of the website you want to scrape. i.e. "https://ahadsheriff.com"')
parser.add_argument('--ofile', '-o',
                    help='define output file to save results of stdout. i.e. "output.txt"')
parser.add_argument('--lines', '-l', 
                    help='number of lines of output to print to the console"', type=int)
parser.parse_args()

args = parser.parse_args()

domain = args.domain
ofile = args.ofile
lines = args.lines

print("domain:", domain)
print("output file:", ofile)
print("lines:", lines)
