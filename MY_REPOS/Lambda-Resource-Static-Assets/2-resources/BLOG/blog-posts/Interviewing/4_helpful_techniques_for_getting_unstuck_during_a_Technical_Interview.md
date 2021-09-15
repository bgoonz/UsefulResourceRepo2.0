# 4 helpful techniques for getting unstuck during a Technical Interview

> Feeling nervous, huh? This is normal. All you need is a lifeline when you’re stuck in a technical interview. It’s here.

[![Passionate Programmers](https://miro.medium.com/fit/c/96/96/1*_UuWCXPnOSWW1BA5_TV3Xw.jpeg)](https://passionateprogrammers.medium.com/?source=post_page-----1447e617b51a--------------------------------)

Feeling nervous, huh? This is normal. All you need is a lifeline when you’re stuck in a technical interview. It’s here.

![Image for post](https://miro.medium.com/max/2560/1*Aii_yErFa4uiFkSt9UhjZg.png)

Helpful Techniques for Technical Interview

It’s hard to get stuck during a coding interview.

> _Any one who has never made a mistake has never tried anything new — Arthur C. Clarke ( Science writer, futurist and Inventor)_

If you weren’t in an interview, you might want to take a break or ask Google for help. But there’s a clock ticking, and you don’t have Google.

You’ve just got an empty whiteboard, a fragrant marker, and an interviewer who looks at you expectantly. There’s nothing else going through your mind except how stuck you are

At these times you need a lifeline — such as a small box that says, “Break glass in an emergency.”

Inside that glass box? A list of tricks for getting unstuck. Here’s that list of tricks.

**Start with writing out an example input on the whiteboard and make your way to the correct output “by hand.”** Observe the manner in which you do things. While developing your process, be on the lookout for patterns that might exist. Use these to write code that implements your process.

![Image for post](https://miro.medium.com/max/2560/0*N9alsTsNQqPVN9Z6)

**How would you go about reversing a string if you were to attempt it?** Let’s write “hello” on the board. One way to get characters from one place to another is to “reverse” their positions by hand, and then draw arrows between the two positions.

**Note the pattern:** it looks like we’re swapping character pairs, starting from the outside and moving in. We’re halfway to an algorithm now.

**Resolve a simpler version of the problem.** Remove or simplify one of the problem requirements. Once you have a solution, see if you can tailor that approach to the original question.

> _Measuring programming progress by lines of code is like measuring aircraft building progress by weight — Bill Gates_

Trying to find the largest k-element in a set? Walk through finding the biggest element, then the second largest, then the third largest. Generalizing from there to find the k-largest isn’t that bad.

if you’re new to this programming field and want to [learn programming faster](https://passionateprogrammers.com/fastest-way-to-learn-programming-in-2021) than everyone else, Visit here for [tips](https://passionateprogrammers.com/fastest-way-to-learn-programming-in-2021)

**Start with an inefficient solution.** Even if it feels stupidly inefficient, it’s often helpful to start with something that’s going to give the right answer. From there, you just need to optimize your solution. Explain to your interviewer that this is only your first idea, and that you suspect that there are faster solutions.

Suppose you were given two lists of sorted numbers and asked to find the median of the two lists together. It’s messy, but you could just:

1.  Concatenate the arrays into a new array.
2.  Sort up the new array.
3.  Returns a value to the middle index.

**Look for a repeat task.** If your current solution goes through the same data multiple times, you’re doing unnecessary rework. See if you can save time by looking at the data only once.

![Image for post](https://miro.medium.com/max/2560/0*Lad29KQWAMq83Jvv)

Say there’s a brute-force operation inside one of your loops to find an element in the array. You’re repeatedly looking through things you don’t have to do. Instead, you could convert the array to a search table to dramatically improve your runtime.

**Look for hints on the specifics of the problem.** Is the input array being sorted? Is the binary tree balanced, huh? Details like this can give you huge hints about the solution. If it didn’t matter, it wouldn’t have been brought up by your interviewer. It’s a strong sign that it exploits the best solution to the problem.

Suppose you are prompted to find the first occurrence of a number in a sorted array. The fact that the array is sorted is a strong hint-take advantage of this by using a binary search.

> _Sometimes interviewers leave the question deliberately vague, because they want you to ask questions in order to uncover these important tidbits of context. So, at the beginning of the problem, ask some questions._

**Throw some of the data structures at the problem**.

[Learn Top data Structures and algorithm’s here](https://passionateprogrammers.com/top-data-structures-and-algorithms-in-python?guid=296c96bc-4573-44db-a501-cd51cb1b565b&deviceId=54f14c99-fd82-49ce-b9ac-0be203a061c5)

Can you save time by using a hash table’s quick lookup? Can you express the relationship between data points as a graph? Look at the requirements of the problem and ask yourself if there is a data structure that has those properties.

**Establish space and runtime boundaries.** Think loud about the parameters of the problem. Try to get a sense of how fast your algorithm might be:

**Stop being unclear about where you are!** To put it another way, state what you know, what you’re trying to do, and show how far apart the two are. By being completely clear about the exact problem that you are experiencing, your interviewer is able to provide you with guidance to help you move forward.

![Image for post](https://miro.medium.com/max/2560/0*HwHjSD2eLKiZznLh)

**Remember to focus on your interviewer.** You may have been giving her a clue with your previous statement if she asked a question about something you just said. Instead of getting worried about losing your train of thought, drop what you are doing and get into her question. Don’t worry, everything is going to be fine.

Interviewers choose to have tough problems on purpose. They want to see how you’re poking a problem that you don’t know how to solve right away.

It’s serious. If you’re not stuck and just breeze through the problem, your interviewer’s assessment might just say, “Didn’t you get a good read of the candidate’s problem-solving process-maybe she’d already seen this interview question before?”

On the other hand, if you get stuck, use one of these tricks to get unstuck, and communicate clearly with your interviewer all the time… that’s how you get an evaluation like, “Great problem-solving skills. Hire them.”

if you get stuck, use one of these tricks to get unstuck, and communicate clearly with your interviewer all the time

If this article was helpful, please share and also subscribe to my newsletter to be notified when I post a new subject.


[Source](https://medium.com/star-gazers/4-helpful-techniques-for-getting-unstuck-during-a-technical-interview-1447e617b51a)