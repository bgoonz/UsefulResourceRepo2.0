---
title: Letter and word spacing in CSS
categories:
  - code
  - typography
  - UI
tags:
  - CSS
---

I'm using `letter-spacing` on a daily basis, but I've never used `word-spacing`, I think so, I'm not 100% sure about that. :)

I use `letter-spacing` in two cases.

First, to increase spaces between characters of small headings, which contain one, two, max. three words.

Second, to decrease spaces between characters of big fat headings. They look much better.

![letter-spacing](./letter-spacing.png)

As you can see, in both cases the `word-spacing` property is not really necessary.

But if you want to increase spaces between characters of text longer than 1-3 words, using of `word-spacing` may improve readability. The bigger positive value you apply with `letter-spacing` the more you will need `word-spacing` to correct arising problem. A big positive value of `letter-spacing` destroys borders between words and text become hard to read.

So, in such a case `word-spacing` to the rescue.
