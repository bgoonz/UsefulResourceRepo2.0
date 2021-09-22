- Understand the problem and ask clarifying questions
- Come up with a plan, write it out in sentences/comments/pseudocode
- Implement a first pass idea
- Evaluate (fix bugs, big-O analysis, readability, redundancy) and iterate

# Polya's Problem Solving (Reworded)
1. What is the problem asking me to do?

    Some questions to ask yourself to check your understanding of the problem:

    - Could you explain this problem to another person who has never seen it before?
    - Can you run some arbitrary inputs through your mental model of the problem and figure out what the output for your example input would be?
2. What steps will I take to solve the problem?

    In other words, ***what*** are the steps you're going to take to solve the problem? Think about this entirely separately from the code you're going to write to actually solve the problem; it helps a lot to only focus on figuring out the steps you'll be taking without any of the code-related details coming into play yet.

    At this stage, the question becomes, "how do I solve this problem as a human?" Verbalize those steps and write them down, as those steps will then become the directions that you'll be following through on in the next step. 

    A good starting point is to list out all of the important sounding nouns and verbs in the problem description and trying to map each one to an algorithm, process, or some/all of a data structure from your personal "toolkit" of computer science knowledge and skills.

    If you can map all of the components of the problem to all of the requirements of a technique or strategy you are familiar with, you're halfway done.

    We'll consider this step complete when you have a set of steps that make you think "if I correctly implement these steps in code, it *should* work". 

    At this point we can already start to think about what the runtime is for our strategy/strategies. This is especially useful in the case when we come up with multiple viable strategies but have to decide on which one to commit to and implement in code. 

3. How do I implement those steps?

    At this point, if you planned out your strategy thoroughly enough, you'll have a set of directions that you then simply need to implement code to fulfill those directions. 

    That's not to say this step is trivial. It's at this phase in the process that we start to worry about code-related details that we simply brushed under the rug in the previous step. 

4. Is this implementation as good as I can make it?

    Questions to ask yourself at this stage:

    - Does your solution work for the main use case?
    - Does it work for any edge cases you can think of?
    - What's the runtime of your solution now that you've implemented it in code?
    - Is your solution doing any work that doesn't actually need to be done to solve the problem?