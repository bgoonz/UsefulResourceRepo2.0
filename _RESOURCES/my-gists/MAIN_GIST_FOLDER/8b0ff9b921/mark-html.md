Converting md files to html w/highlighting
0a) Create a root directory to pull in all the repos
0b) Recursively clone or pull each repo
	$> git clone <repo_url> | git pull on the existing repos 
0c) Create a TOC index.html file for the root folder
	$> echo '<head>' >> index.html
	$> echo '' >> index.html
	$> echo '</head>' >> index.html
	$> echo '<body>' >> index.html
	$> ls >> temp.html
	$> sed -n '/./s/<a href="($1)">($1)</a>/p' temp.html >> index.html 
	$> echo '</body>' >> index.html
	$> rm temp.html

1)  Recursively convert each md file to html using pandoc:
	$> find . -name "*.md" | while read i; do pandoc -f markdown -t html "$i" -o "${i%.*}.html"; done

2) Change all internal file urls from pointing to *.md links and instead point to the local *.html file
	a) recursively run this sed command (programatically replace FILENAME)
		sed -n -i.bak '/href="\./s/\.md/\.html/' FILENAME.html
	b) alternatively, run the following command instead (programatically replace FILENAME)
		sed -e '/href="\./s/\.md/\.html/' FILENAME.html > FILENAME.html.tmp && mv FILENAME.html.tmp FILENAME.html

3) Add code highlighting to all pages with highlight.js library using the following:
	a)  Download highlight js and add to assets folder
	b)  Add <head></head> to each .html file (via temp file) if it doesn't already exist
		$> touch temp.html
		$> echo '<head>' >> temp.html
		$> echo '' >> temp.html
		$> echo '<link rel="stylesheet" href="/path/to/styles/default.css">' >> temp.html
		$> echo '<link rel="stylesheet" href="../../css/typeplate.css">' >> temp.html
		$> echo '<link rel="stylesheet" href="../../css/custom.css">' >> temp.html
		$> echo '' >> temp.html
		$> echo '<script src="/path/to/highlight.pack.js"></script>' >> temp.html
		$> echo '<script>hljs.initHighlightingOnLoad();</script>' >> temp.html
		$> echo '</head>' >> temp.html
		$> echo '<body>' >> temp.html
		$> cat FILENAME.html >> temp.html
		$> cat temp.html > FILENAME.html
		$> echo '</body>' >> FILENAME.html
		$> rm temp.html

4) Recursively delete all *.md files
	$> find . -name "*.md" | while read i; do pandoc -f markdown -t html "$i" -o "${i%.*}.html"; done

5) Fire up a simple static server to serve these files:
	a) use python:
		i) cd /path/to/files
		ii) python -m SimpleHTTPServer [port]

	b) use Node:
		i) install http-server: npm install http-server -g
		ii) cd /path/to/files
		iii) http-server -p [port]    ==> default_port=8080 

***** EXTRAS:
1) From each file, extract 'Goals', 'Exercises', and 'Resources' if they exist
	*** Write a Ruby script to split out the Goals/Exercises/Resources sections
	*** Use File.open to work on the file: http://www.tutorialspoint.com/ruby/ruby_input_output.htm
	*** Use "string".include?(other_string) to break up sections on <h2> headers
		http://www.ruby-doc.org/core-2.1.2/String.html#method-i-include-3F
	*** Insert <div id="SECTION-NAME" > .... </div> around each of those sections
3) Label the new divs according to the section .. eg. <div id="goals">...</div>
	a) 'Goals' is the first <h2> in the document
	b) 'Exercises' is the last or 2nd-to-last <h2> in the document
	c) 'Resources' is the last <h2> in the document
4) Change the page layout and move these sections in such a way as to improve
	page navigation.  Add the following to custom.css:
	a) #goals {...} styles/layout
	b) #exercises {...} styles/layout
	c) #resources {...} styles/layout
5) Add any necessary JQuery animation effects to these elements
	*** maybe use the jQuery velocity.js library
6) Add any other CSS styles to the page as deemed necessary
7) Add hotkeys for the website - see:
	*** http://www.hanselman.com/blog/TheWebIsTheNewTerminalAreYouUsingTheWebsKeyboardShortcutsAndHotkeys.aspx