# A Deeper Inspection Into Compilation And Interpretation

> There is perhaps nothing more satisfying than seeing the pieces of a puzzle come together. This is the case for actual puzzles, which I am…

[![Vaidehi Joshi](https://miro.medium.com/fit/c/96/96/1*QOQuWAqQd566oITj9rtCKw.jpeg)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@vaidehijoshi?source=post_page-----d98952ebc842--------------------------------)

![](https://miro.medium.com/max/1400/1*boC06EC2PGmMYNjpHtrL4A.jpeg)

A deeper inspection into compilation vs. interpretation

There is perhaps nothing more satisfying than seeing the pieces of a puzzle come together. This is the case for actual puzzles, which I am pretty bad at because I always seem to lose pieces under the couch, and more metaphorical puzzles, which I am generally better at what with no pieces to lose in strange places.

The puzzle of learning is certainly one of the more complicated enigmas out there. Learning a new thing is hard because you’re trying to constantly piece together ideas and construct concepts without always necessarily knowing how those parts fit into the larger whole. It can be difficult to try to wrap your head around something new when you constantly find yourself wondering what this new thing has to do with the broader picture that you’re already familiar with. It’s a little bit like finding a random puzzle piece and then trying to find the pieces that fit around it, but not necessarily knowing how those pieces fit into the big picture.

The same is true for learning a specific topic, like computer science. Oftentimes, it can feel like you’re picking up little bit of information — a data structure here, an algorithm there — without always knowing how one piece connects to another. I tend to think that this is the reason that learning computer science is so hard: there just aren’t very many resources that can construct the picture of the field with all of these perfectly pieces fit into one another.

However, every so often, if you really stick with a topic for long enough, you’ll find that some pieces will start to come together. And as we round out this series together, it’s time for that to finally happen!

When we first started this series nearly a year ago, the very first topic that we explored was something that is often thought of as the “cornerstone” of computer science: [binary](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/bits-bytes-building-with-binary-13cb4289aafa). We learned that, at their very core, binary is the language that every computer speaks and understands. Our machines, at the end of the day, each run on ones and zeros.

Since then, we’ve explored different data structures, like [trees](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/how-to-not-be-stumped-by-trees-5f36208f68a7), [graphs](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/a-gentle-introduction-to-graph-theory-77969829ead8), and [linked lists](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/whats-a-linked-list-anyway-part-1-d8b7e6508b9d), as well as [sorting algorithms](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/sorting-out-the-basics-behind-sorting-algorithms-b0a032873add) and [traversal or searching](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/finding-the-shortest-path-with-a-little-help-from-dijkstra-613149fbdc8e) algorithms. Now it’s time to finally bring it all together — or rather, bring it all _back_ to binary.

![](https://miro.medium.com/max/52/1*JrvsA3pmJCWqlPMGnIoSYA.jpeg?q=20)

![](https://miro.medium.com/max/1000/1*JrvsA3pmJCWqlPMGnIoSYA.jpeg)

We started with some source code and now we’re here.

We’ve gone around the world when it comes to core concepts in computing as well as computer science. But there’s one question that we haven’t really answered yet, even though it’s possible that we’ve been thinking about it this whole year: How on earth do we go from our code into the one’s and zero’s of our computer?

Well, before we get too far into _how_ the code we write gets turned into binary, let’s clarify what we really mean when we use the term binary in this context. The “binary” code that a computer reads and understands is generally referred to as **_machine language_** or **_machine code_**, which is a set of instructions given to a machine and run by a its **_central processing unit_** (or **_CPU_**).

An important thing to note is that there are different kinds of machine code, some of which are literally 0’s and 1’s, and others of which are decimals or [hexadecimals](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/hexs-and-other-magical-numbers-9785bc26b7ee) (which we already know a lot about!). Regardless of which exact format a machine language is written in, it has to be fairly rudimentary because it needs to be understood by or computer. This is why machine languages are referred to as low level languages, because they need to be simplified enough to be processed by our machine’s CPU, which we already know is just a bunch of switches, internally.

> We can think of low level languages as the “mother-tongues” of our computer; machine code should be directly readable by our machine, and shouldn’t ever need to be translated by them.

But how do we go from _our_ code to a machine-friendly (_machine code_) version of the exact same thing? Well, the code that we write as programmers and the machine code that a computer’s processor reads are nothing more than two different types of _languages_. If we think about it, all we really need to do is translate between these two languages.

Now comes another problem: we have no idea how to translate between our code and machine code! Okay, just kidding — this isn’t _really_ a problem. Because we have two helpful friends who can help us out here.

![](https://miro.medium.com/max/54/1*i6IkXutqKYWpm0JwlvzPUA.jpeg?q=20)

![](https://miro.medium.com/max/1000/1*i6IkXutqKYWpm0JwlvzPUA.jpeg)

Translators make our source text understandable to our machines!

In order for us to transform our source code into some computer-readable machine code in a binary format, we’ll need to rely on translators to help us make our source text understandable to our machines.

A **_translator_**, which is also sometimes called a programming language processor, is nothing more than a program that translates a **_source_** language into a **_target_** language, while maintaining the logical structure of the code that it is translating.

We’re already a little bit familiar with one kind of translator already, even though we might not know it just yet. Previously in this series, we’ve looked at the [lexical and syntax analysis](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/basecs/leveling-up-ones-parsing-game-with-asts-d7a6fc2400ff) phases (the front end) of the compiler, and the different data structures involved in the process.

As it turns out, the compiler is a _kind_ of translator! There is another translator, too, whose name often gets thrown around in conjunction with the compiler’s, called the **_interpreter_**. Both the compiler and the interpreter make or code readable to our computers, but in very different ways.

But let’s first start with what we already know, first: the compiler.

![](https://miro.medium.com/max/60/1*hmOcXMhDgZ3FiZTURbSgiA.jpeg?q=20)

![](https://miro.medium.com/max/1400/1*hmOcXMhDgZ3FiZTURbSgiA.jpeg)

The compiler: a definition.

The **_compiler_** is nothing more than a program that takes a high level language — the language that we write our code in — and converts it into machine code. The compiler has many moving parts to it (or rather, within it), including, potentially, a scanner, a lexer/tokenizer, and a parser. But at the end of the day, even with its complexity, it’s just a program that turns our code into machine-readable code.

However, even though its job might seem simple when we put it like this, the way that a compiler does this important task is worth highlighting.

![](https://miro.medium.com/max/56/1*US267VbwKwSVaLa-2MIGOw.jpeg?q=20)

![](https://miro.medium.com/max/1000/1*US267VbwKwSVaLa-2MIGOw.jpeg)

How the compiler does its job.

For most cases, the compiler does the job of translating our code into machine code in one fell swoop. In other words, the compiler translates all of a programmer’s source code before the source code can ever be executed or run. It takes our source code and converts it into a single file that is written in machine code. It is that very machine code file — called an **_executable_** file and often ending with an `.exe` extension — which actually allows us to run the original code that we wrote.

The most important idiosyncrasy of a compiler is the fact that it takes a source text, and translates it into machine code binary in “one shot”. It returns the translated, compiled file to the programmer, who will be able to run their code via the outputted executable.

> The executable file returned by the compiler can be run again and again once it has been translated; the compiler doesn’t need to be around for any subsequent reruns!

Once the compiler translates all the source code into machine code, the compiler’s job is done. The programmer can run the compiled code as many times as they want, with whichever inputs that they’d like to use. They can also share this compiled code with others, without ever having to share their original source code.

![](https://miro.medium.com/max/60/1*cV0BYWBDTFZbUr6iFjFNrg.jpeg?q=20)

![](https://miro.medium.com/max/1000/1*cV0BYWBDTFZbUr6iFjFNrg.jpeg)

Grace Hopper, © [TechCrunch](https://techcrunch.com/2016/11/17/grace-hopper-and-margaret-hamilton-awarded-presidential-medal-of-freedom-for-computing-advances/)

The concept behind this specific translator— as well as the term “compiler” itself — was coined by the illustrious **_Grace Hopper_**, back in 1952, in the most interesting of circumstances.

At the time, Hopper had been working at the Eckert-Mauchly Computer Corporation, helping develop the UNIVAC I computer as a mathematician on the team. Effectively, she was working on turning mathematical code into its own language (A-0 System language).

However, she had bigger ideas. She wanted to write an entirely new programming language that would words in English, rather than the limited number of mathematical symbols. However, when she shared this idea with her colleages. They shot her down, and told her that her idea wasn’t possible because “computers didn’t understand English”. But she was not deterred.

After three years of working on this team, Hopper had her very first working compiler. But no one believed that she had actually done it! In her biography, _Grace Hopper : Navy Admiral and Computer Pioneer_, she [explains](http://www.public.navy.mil/surfor/ddg70/Pages/namesake.aspx#.WjA760zGxE4):

> I had a running compiler and nobody would touch it. … they carefully told me, computers could only do arithmetic; they could not do programs.

It’s a good thing that Grace Hopper didn’t listen to any of those nonbelievers, because she ended up continuing her work and developing one of the earliest high level programming languages, called COBOL. She also won the [Presidential Medal of Freedom](https://techcrunch.com/2016/11/17/grace-hopper-and-margaret-hamilton-awarded-presidential-medal-of-freedom-for-computing-advances/), among many, many, many other accomplishments.

Indeed, if she _had_ listened to all of those pepole, she would have likely never taken computing to an entirely new level with her early work in constructing and designing the very first compiler. Grace Hopper’s work on the first compiler laid the groundwork for the another translator that came into existence a few years later: the interpreter.

In 1958, a few years after Grace Hopper’s work on the compiler, some students at MIT were in a lab, working with an [IBM 704](https://en.wikipedia.org/wiki/IBM_704) computer, a fairly new technology that had been introduced just four years earlier. One of these students, named Steve Russell, was working on a project called the MIT Artificial Intelligence Project, with his professor, John McCarthy.

Russell was working with the Lisp programming language at the time, and he had read a paper written by his professor on the subject. He came up with the idea to transform the `eval` function in Lisp into machine code, which set him on the path to creating the first Lisp interpreter, which was used to evaluate expressions in the language — the equivalent of running a program in Lisp at the time.

![](https://miro.medium.com/max/1200/1*hql6HmnIb5Jlw6xBVhMHMQ.jpeg)

Steve Russell, © [mass:werk](http://www.masswerk.at/spacewar/SpacewarOrigin.html)

Indeed, Hopper’s work directly impacted Russell’s invention. The first version of the Lisp interpreter was compiled by hand. In an interview with the Computer History Museum in 2008, Russell [explains](http://archive.computerhistory.org/resources/access/text/2012/08/102746453-05-01-acc.pdf) how compilers played into his work at MIT:

> And my remembrance is that John \[McCarthy\] sort of came in one day, in late September or October or something like, that with the universal M-expression, that is the Lisp interpreter written out as an M-expression, and we sort of looked at it and said, “Oh yeah, that’ll work,” and I looked at it and said, “Oh, that’s just a matter of doing more hand compiling, like I’ve been doing. I can do that.”
>
> …I got something working before Christmas, which was a useable interpreter; no garbage collector, but there weren’t any big programs yet.

Russell and his colleagues would go on to [hand-compile](http://www.computerhistory.org/pdp-1/steve-slug-russell/) the first two version of the Lisp interpreter. Today, most programmers wouldn’t even dream of hand-compiling any of their code! Indeed, many of us interact with an interpreter and use it multiple times in application development — we just might not always be aware of it.

So, what exactly _is_ an interpreter? It’s about time for an official definition!

![](https://miro.medium.com/max/1400/1*W3b3zEDlsm3ECrl6ZcsuKg.jpeg)

The interpreter: a definition.

An **_interpreter_** is also a translator, just like a compiler, in that it takes a high level language (our source text) and converts it into machine code. However, it does something slightly different: it actually runs and _executes_ the code that it translates immediately (inline) as it translates.

> We can think of an interpreter as the more “methodical” translator in the family. Rather than doing the work of translating our code into machine language in one single shot, it’s far more systematic about how it works.

An interpreter does its job piece by piece. It will translate a section of our source text at a time, rather than translating it all at once.

![](https://miro.medium.com/max/1000/1*cB2ZxcXz1ZKu7CxfdjIcNw.jpeg)

How the interpreter does its job.

Unlike a compiler, it doesn’t translate everything and hand over a file to us, the programmers, to execute. Instead, an interpreter will translate a single line/section of code at a time. Once it has finished translating one line, it will take the machine code version of it, and run it immediately.

Another way of thinking about it is that once a piece of code has been translated by the interpreter, only then can it be run. This seems fairly intuitive at first thought, because of course how can an interpreter run a line of code without knowing what it means in binary/machine code? But, if we think about it more deeply, there are other implications. Only once the interpreter finishes running one line of code successfully will it actually move onto the next line. We can imagine how this may or may not be a good thing, depending on what we’re trying to do.

For example, imagine we want to run our program with 10 different inputs. Our interpreter would have to run our program 10 times, interpreting it line by line, for each of our inputs. However, if we made a fatal flaw in our code, our interpreter could catch it for us the moment that it happens because it has literally just tried to run our (broken) line of code after it translated it!

By now, we might start to be able to see how both the interpreter and the compiler have tradeoffs. We’ve seen how different tools have pros and cons to them time and again in this series, and it’s probably a hallmark trait within the world of computer science. Keeping with this theme, let’s weigh the fundamental differences between interpretation and compilation as translation techniques.

The differences between interpretation and compilation and their respective translators tells us a lot about how these two programs are implemented. If we compare these two methodologies, we’ll start to see how they both accomplish the same task, but in fundamentally very different ways.

The illustration below illustrates this in a more obvious way.

![](https://miro.medium.com/max/1000/1*ZxXGe3fv1pzTQi8QLucYcQ.jpeg)

Compilation vs. interpretation: the tradeoffs.

1.  **_Returned result._** While a compiler will take some source code and return a compiled, executable file, an interpreter will actually translate and then execute the source code itself, returning the result of the translation directly.
2.  **_Run frequency._** A compiler will run only once, and will need to be called again to re-translate source code if it changes. On the other hand, an interpreter will run again and reinterpret source code when it changes; the interpreter “sticks around” to continually translate.
3.  **_Flexibility._** The compiler translates the source code in one shot, which means that the source code isn’t required again after compilation. However, the interpreter does require the source code in order to translate and execute the program, every single time that it is ever run.
4.  **_Debugging._** The compiler generally makes it more difficult to determine where mistakes occur in the source code, because the entire program has already been translated, and the error’s location might not be easily identifyable in the machine code. However, identifying errors is easier with an interpreter because it can maintain the location of an error or bug, and surface that issue to the programmer who wrote the code.

Because of these major differences, compiled code — code that is translated and run using the compilation process — tends to run a bit **_faster_** than interpreted code. This is because the work of translating the source text into machine code has already been done, before the code is ever executed.

![](https://miro.medium.com/max/1400/1*tEaHNTcgH3ksRTn_PPvUIA.jpeg)

Compiled code as compared to interpreted code.

On the flip side, interpreted code is far more **_flexible_**, since the interpreter stays around for the course of the translation “process” to read and process our code.

Flexibility in this context means being able to change our code and being able to immediately run it afterwards. There is no need to recompile our code if we make a change; the interpreter will just pick up on that chance, and reinterpret the code, making it a much more _interactive_ form of translation. Using an interpreter makes it much easier to test out small (or big!) changes in a source file.

![](https://miro.medium.com/max/1400/1*bEjIOSRlVoqme1h2uddSUQ.jpeg)

The benefits of compilation as compared to interpretation.

However, when it comes to interpretation, we actually need the source code in order to be able to do anything. It definitely is easier to test out changes and debug issues, but the source text has to be accessible, first and foremost. With compilation, this isn’t the case. Once we have compiled our code into an executable file, we don’t ever have to worry about the source code again — unless, of course, we need to recompile.

This can often make a compiler the “safer” choice, because our source code is not exposed; rather, the only output is the executable file itself, which is just 1’s and 0’s, and doesn’t ever show anyone _how_ we wrote our code or what it actually ever _said_, since it’s all machine language at that point.

> Compilation and interpretation play into our roles not just as developers of software, but also as consumers of it.

![](https://miro.medium.com/max/1000/1*G_MKTnRevNPkNVeh7Xu8hw.jpeg)

The easy and speed of compilation, in action.

For example, whenever we download a file, or run a program from an `.exe` file, we’re relying on the creators of some software to have compiled an executable for us.

Using compilation, we can easily distribute a program as an executable file. This will allow someone else to run the exact same code as us, but without ever actually showing them or giving them our literal code itself. A consumer of a compiled file never needs to see a source text, because they can simply be given an executable file to run on their own, local machine.

However, the issue with distributing a compiled file is creating files that are compatible on different platforms (like a Windows operating system versus OS X). As programmers, it’s our job to make sure our compiled executables run successfully on various platforms, and sometimes, this means recompiling our code!

![](https://miro.medium.com/max/1000/1*rqrqsd2_SZApubCulF0jwg.jpeg)

The efficiency and benefits of interpretation, in action.

On the other hand, when we use interpretation, we can distribute our source code directly, rather than worrying about platform-specific executables, or thinking about how we’ll go about compiling binaries for everyone to use.

However, in this case, we’ll need the consumer of our program to download an interpreter — which often actually just comes along with a language — and be sure that the interpreter exists on their machine(s). Once they have the interpreter, they can see our original source code, take that code, and then rely on their own version of the interpreter to run it locally.

In this scenario, we rely on the interpreter to make the compatible on all platforms, and we, as programmers and consumers, don’t need to think about it. Also, if something goes wrong (either something in the source that we wrote, or something relating to their own platform), the consumer of our code can figure out what the issue is much more easily than with a compiled file. The interpreter will make it easy to debug any problems, regardless of who is running our code.

But, regardless of whether we choose compilation or interpretation, the end goal is the same: to speak a language that our computers can understand! As it turns out, at the end of the day, it really just all _is_ binary.

Because both interpreters and compilers have been around for many years now, there are a good amount of resources out there on both of these types of translators. From an implementation perspective, there are many different approaches to writing a compiler versus an interpreter. But, if you’re looking to simply learn more or dig a little deeper, these resources are a good place to start.

1.  [Interpreters and Compilers (Bits and Bytes, Episode 6)](https://www.youtube.com/watch?v=_C5AHaS1mOA), Bits and Bytes TVO
2.  [The difference between a compiler and an interpreter](https://tomassetti.me/difference-between-compiler-interpreter/), Gabriele Tomassetti
3.  [Compilation vs Interpretation](https://www.youtube.com/watch?v=JNMy969SjyU), BogeysDevTips
4.  [Machine Code and High level Languages Using Interpreters and Compilers](https://www.youtube.com/watch?v=1OukpDfsuXE), Banchory Academy Computing Science
5.  [The Programming Process](http://www2.hawaii.edu/~takebaya/ics111/process_of_programming/process_of_programming.html), Professor Vern Takebayashi
6.  [Why was the first compiler written before the first interpreter?](https://softwareengineering.stackexchange.com/questions/251431/why-was-the-first-compiler-written-before-the-first-interpreter), StackOverflow

[Source](https://medium.com/basecs/a-deeper-inspection-into-compilation-and-interpretation-d98952ebc842)
