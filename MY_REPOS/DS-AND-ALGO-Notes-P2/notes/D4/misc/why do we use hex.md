# Why do we use hexadecimal?

> If you’re a programmer, you’re probably used to seeing hexadecimal notation pop up in tons of places. For example, hexadecimal is used to…

[![Niko Savas](https://miro.medium.com/fit/c/56/56/1*DIB9Ds-i_wf67B4DG7vhUg.png)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@savas?source=post_page-----d6d80b56f026--------------------------------)

If you’re a programmer, you’re probably used to seeing hexadecimal notation pop up in tons of places. For example, hexadecimal is used to denote colors in the “hex” scheme.

For memory readouts, values are also often in hexadecimal. Even braille is coded in hexadecimal.

There are a couple obvious reasons why hexadecimal is preferable to the standard binary that computers store at the low level.

1.  Readability. Hexadecimal uses digits that more closely resemble our usual base-10 counting system and it’s therefore easier to decide at a glance how big a number like e7 is as opposed to 11100111.
2.  Higher information density. With 2 hexadecimal digits, we can express any number from 0 to 255. To do the same in binary, we need 8 digits. As we get bigger and bigger numbers, we start needing more and more digits and it becomes harder to deal with.

> Why don’t we use decimal?

It seems like it just using our default counting system, base 10, might solve all of these problems. It’s definitely the easiest for readability since it’s what we learn while growing up, and it also compresses numbers relatively well. The main problem with decimal can be illustrated by the following graph:

![Image for post](https://miro.medium.com/max/60/1*1NGffiR_VdV4F7DKSyJ70A.png?q=20)

![Image for post](https://miro.medium.com/max/1304/1*1NGffiR_VdV4F7DKSyJ70A.png)

Each purple tick is when a new digit is added when representing numbers

Notice that binary and decimal never line up, whereas hexadecimal and binary **do**, in fact, they do it every 4 binary digits. In practice, this means that one digit of hexadecimal can always be represented with 4 digits of binary. Decimal doesn’t work this way. The key property that allows hexadecimal to work this way is that it has a base which is a multiple of 2. (2⁴ for hexadecimal). For this reason, **any number system we choose to compress binary data should have a base that is a multiple of 2**.

> Why don’t we use higher bases like base 128 or 256?

Base 128 and base 256 both follow the rule we outlined above (2⁷ and 2⁸ respectively), why don’t we use them?

This comes down entirely to readability. Hexadecimal uses the Arabic digits 0–9 and the English letters a-f. We have an innate grasp of “a” coming before “e”, and “c” coming before “d”, because we learned the alphabet at a very young age. If we used all of the English alphabet (26 letters, a-z) and the Arabic numbers(10 numbers, 0–9), we would end up with 36 characters. To represent base 128 we would need to add new characters like / or (. Imagine trying to decide which number was bigger, $#@/ or $\*(). Because we have no inherent ordering in our minds for whether @ or ) are bigger, it is a lot harder to reason about numbers that use characters outside of the standard alphabet.

Base 64 encoding solves this problem by using capital letters for an extra 26, then also using + and / to fill in the last 2 spots.

![Image for post](https://miro.medium.com/max/56/0*pvZ0uS4zO7NT694c.png?q=20)

![Image for post](https://miro.medium.com/max/762/0*pvZ0uS4zO7NT694c.png)

Base 64 Mappings ([Photo Credit](http://www.pixelstech.net/article/1457585550-How-does-Base64-work))

> Great! So we should just be using base 64 then, right? It’s easy to understand and compresses information well!

Well, not quite. This is where things get interesting. Our bases actually tell us something else that is important to consider, especially when programming. One base 32 (2⁵) digit maps to 5 binary digits. One base 64 (2⁶) digit maps to 6 binary digits.

Base Binary digits per character  
2    1  
4    2  
8    3  
16   4  
32   5  
64   6  
128  7  
256  8

The Byte
--------

Bytes are units of information that consist of 8 bits. Almost all computers are byte-addressed, meaning all memory is referenced by byte, instead of by bit. This fact means that bytes come up all the time in programming. Using a counting system that can easily convert into bytes is another important requirement for our binary representation. Base 256 is ideal for this, since it’s 2⁸, meaning one digit is exactly one byte. Unfortunately, for reasons we went over above, 256 would have other problems for readability and be very unwieldy to use.

And now we’re getting to why we use hexadecimal. Hexadecimal, base 16, or base 2⁴, represents exactly half a byte. Each byte can be fully represented by two hexadecimal digits, no more, no less. Hexadecimal also fits all of our other specifications:

1.  It successfully compresses data. one hex digit can represent 0–15, much better than the 0–1 that binary offers.
2.  It is easy to read. Everyone knows that C comes before E, and that 4 comes before 9.
3.  It easily converts to bytes. Two hex digits = 1 byte.

![Image for post](https://miro.medium.com/max/60/1*PjnSWBhLncFgbJmEuDzxzQ.png?q=20)

![Image for post](https://miro.medium.com/max/682/1*PjnSWBhLncFgbJmEuDzxzQ.png)

Criteria for a good byte representation scheme

But wait! We’re not done! If we’re going to follow this question all the way to the bottom, we have to ask:

> Why is a byte 8 bits?

The reason for this is quite interesting and goes back to the dawn of the computing age. Back in the 1960s, people realized that to encode text into binary we would need a system that mapped English characters to binary representations.

![Image for post](https://miro.medium.com/freeze/max/38/1*ewrAcsnAUtMv3x12Y4w1fA.gif?q=20)

![Image for post](https://miro.medium.com/max/354/1*ewrAcsnAUtMv3x12Y4w1fA.gif)

The Baudot code alphabet ([credit](http://mysite.du.edu/~jcalvert/tel/teletype.htm))

Way back in 1870, Emile Baudot came up with the [Baudot code,](https://www.wikiwand.com/en/Baudot_code) a 5 bit mapping scheme for use on manual keyboards. Unfortunately, 5 bit codes only really support letters and some punctuation, not nearly enough for the requirements of computers. (5 bits = 2⁵ = 32 characters)

![Image for post](https://miro.medium.com/max/60/1*x7WjI7j0QiOaU3jCiuYlIw.jpeg?q=20)

![Image for post](https://miro.medium.com/max/750/1*x7WjI7j0QiOaU3jCiuYlIw.jpeg)

The IBM 1620, a computer with a 6 bit architecture ([credit](https://www.wikiwand.com/en/IBM_1620))

As computers became more complex, 6 bit architectures such as [BCD](https://www.wikiwand.com/en/BCD_(character_encoding)) came into being. 6 bit character encoding would allow for 2⁶ = 64 characters, meaning we could fit numbers as well as either more punctuation or lowercase characters. Because there was no way to fit uppercase, lowercase, numbers, and punctuation into 64, 6-bit architectures didn’t hang around for very long.

![Image for post](https://miro.medium.com/max/60/1*nqICHJG-j6p3sDjSon_Dbg.jpeg?q=20)

![Image for post](https://miro.medium.com/max/994/1*nqICHJG-j6p3sDjSon_Dbg.jpeg)

7-bit ASCII table ([credit](http://richard-harper.me.uk/Kb/showtext.aspx?id=0005))

Now we get to the real juice. ASCII was formalized in 1963 and includes a 7-bit character set, which had space for all of the groups mentioned above, as well as a handful of extra codes that could be used for things like the 32 system codes at positions 0–31, things like “Start of text”, or even “Synchronous Idle”. 7-bit architectures eventually gave way to 8-bit ones for a couple of reasons:

1.  Since computers are binary, having everything be a power of 2 is encouraged, so 2³ = 8 makes more sense than 7 bits.
2.  Having this extra bit was also used for a “[parity bit](https://www.wikiwand.com/en/Parity_bit)” — The leading bit of the character would indicate whether the number of 1s in the following 7 bits were even or odd. This was used as error-detection in the error prone machines that existed in early computing.

I suppose we could follow this question even further to determine [why the English language is the standard for programming](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@jennymandl/why-are-all-programming-languages-in-english-12b1312bada4), or [why the English language has 26 characters in it](https://www.amazon.com/gp/product/0767911733?ie=UTF8&tag=danlewissspor-20&linkCode=shr&camp=213733&creative=393185&creativeASIN=0767911733&ref_=sr_1_1&qid=1316051145&sr=8-1), but I’ll leave it here and let you do your own research.


[Source](https://medium.com/@savas/why-do-we-use-hexadecimal-d6d80b56f026)