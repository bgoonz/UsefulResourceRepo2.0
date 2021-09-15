# Convert any folder into a website using Pandoc and a Makefile

> It was a long day. I was lurking HackerNews and /r/programming. Things were going slow. I had been taking quite a lot of notes inside a plain ol’ directory. I know, 2016 right?! But every single note taking application had failed me. Although I had no use of viewing my markdown notes in the browser, I decided to do it anyways. For the sake of completeness. I immediately thought of dystic, my personal static site generator, but dissed it as too heavy. I decided then, that I wanted something I could hack together in the next 10 minutes.

_On Oct 28, 2016 by Mitesh Shah_

It was a long day. I was lurking HackerNews and /r/programming. Things were going slow. I had been taking quite a lot of notes inside a plain ol’ directory. I know, 2016 right?! But every single note taking application had failed me.

Although I had no use of viewing my _markdown_ notes in the browser, I decided to do it anyways. For the sake of completeness.

I immediately thought of [dystic](https://github.com/oxalorg/dystic), my personal static site generator, but dissed it as too heavy. I decided then, that I wanted something I could hack together in the next 10 minutes.

I immediately thought of [pandoc](https://pandoc.org/).

    pandoc --toc --from markdown --to html my-note.md -o my-note.html

Done. Easy, wasn’t it?

Now let’s do this for the entire directory, _recursively_. We could write a simple shell script, but that would run everytime on everyfile. We don’t want that. We want to regenerate the _html_ only if the _markdown_ counterpart has been updated since the previous build.

What ~better~ faster way than to use GNU Make for `mtime` based builds.

**/notes/Makefile**:

    # Find all markdown files
    MARKDOWN=$(shell find . -iname "*.md")
    # Form all 'html' counterparts
    HTML=$(MARKDOWN:.md=.html)

    .PHONY = all tar clean
    all: $(HTML)

    %.html: %.md
        pandoc --from markdown --to html $< -o $@

    tar: $(MARKDOWN)
        tar --exclude=notes.tar.gz --exclude=.git/ -czvf notes.tar.gz ./

    clean:
        rm $(HTML)

We’re almost done. Now just run `make all` in `/notes` and all your _markdown_ files will be built into _html_ files.

Run `make clean` to remove all the html files and run `make tar` to backup all your notes.

Simply open your browser and type “/notes” (or your complete path) into the address bar and voila! It’s not pretty but it works. (PS: use `file:///path/to/folder` if not using chrome)

---

To make your files more pretty use my minimal css theme [sakura](https://github.com/oxalorg/sakura) and then change the pandoc command as follows:

    cd /notes
    wget "https://raw.githubusercontent.com/oxalorg/sakura/master/sakura.css"
    pandoc --css /notes/sakura.css --from markdown --to html $< -o $@

Now you can remote sync the entire website easily using rsync:

    rsync --exclude '*.md' source/ destination/

That’s the basics. This can easily be used to create your own blog, websites, small projects, pretty much anything. The best part being that it needs no ‘rules’ from your end, you’re free to structure your content anyway you like; something which is missing from almost every static site generator out there. This is one of my quibbles which I’m trying to fix with [dystic](https://github.com/oxalorg/dystic).

I added a couple more feature including making automatic indexes, sorting using title/date, metadata parsing etc. But I quickly realised that it’s a lot of pain to be doing it using _only_ GNU Make. So I’ve decided to start working on `dystic` again. Maybe even re-write it in `nim` or `golang`.

Let me know your comments below.

---

[Source](https://computableverse.com/blog/create-website-using-pandoc-make-file)
