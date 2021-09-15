# Use Redux before it’s too late

> 2019 note: You absolutely do not need to use redux. It may be useful to you, it may not be. The most important thing is that you reason…

[![Ian Mundy](https://miro.medium.com/fit/c/56/56/0*zLKXuC-suK_ytguL.)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@ian.mundy?source=post_page-----a73d837a06aa--------------------------------)

![Image for post](https://miro.medium.com/max/60/1*Ur2yV071L8jnkpXpOoGPHA.png?q=20)

![Image for post](https://miro.medium.com/max/2972/1*Ur2yV071L8jnkpXpOoGPHA.png)

**2019 note**: You absolutely do not _need_ to use redux. It may be useful to you, it may not be. The most important thing is that you reason about state in the right way. You keep state local where it makes sense, elevate it when necessary, and build composable applications. What library you use for that (if you choose to use one at all — which I do not anymore) is second to the way in which you structure your state.

You may have heard advice that you [might not need redux](http://redux.js.org/docs/faq/General.html#general-when-to-use). If you’re new to redux (or other flux implementations, I’m being opinionated here), this might seem like comforting advice. There’s a lot of good truth to it too — for very simple apps you don’t need it and you shouldn’t use it.

For example say you’re writing a Blog. You don’t want comments (if I want that kind of abuse I’ll just get on Twitter) — just raw text, images, and headings. Pretty simple. We don’t need flux for that. We probably don’t even need React for that.

But me? I’m a developer which means I don’t realize how difficult a problem is until I’ve finished a pack of redbull and filled up a whiteboard — at which point I lean over to my friend and say “huh, I guess this is nontrivial."

Do you think there’s a chance your application is going to grow to a point where you _will want redux_? If so, don’t wait — do it right now.

Why?

I can’t express how true this was for me. For example, I’ll pretend we’re writing a text editor. (As an aside — can we just agree for a moment that writing your own text editor for your project is a terrible idea? Please trust me on this one… I don’t think I have the room here to go into it).

So, I think my text editor is definitely going to need redux at some point, but screw it, I’m already over my head and I don’t need that right now. I might decide to have 3 types of components.

Document:

{  
  sections: \[\]  
}

Section:

{  
  id: 1,  
  type: 'text',  
  title: 'Heading',  
  selectedLine: 1,  
  lines: \[\]  
}  

Line:

{  
  id: 1,  
  type: 'text',  
  content: 'The assyrian came down like a wolf on the fold'  
}

Three separate components all controlling their own states. This all makes sense on the surface (ignoring the inherit complexities of the problem space). For instance, if I wanted to change the text in a line, then I would only need to control the content of that `Line` component. The section would not have to know about the state of the line. Similarly a section would only care about the lines it had, but not what was in the lines. We could move a line around in a section, or between sections without knowing the content.

The issue though, is that we end up solving weird problems we don’t really need to be solving. For instance, imagine deleting a line. We’ll need to remove it from the section’s array, but also merge its content with the line before it. And then if it’s the first line in a section we’ll need to merge it to the previous section. With our current state, we might start writing this function…

// Section component that owns statedeleteLine = (id, content) => {  
  const lines = \[ ...this.state.lines\]  
  const index = this.state.lines.findIndex(line => line.id === id);  
  const lineToUpdate = Object.assign(this.state.lines\[index - 1\], {});  
  // wait how do I tell it to update? refs? some prop?  
  lineToUpdate.someProp = content;  
  lines\[index - 1\] = lineToUpdate;  
  // uh maybe this is wrong.

So you see the complexity here? All because we thought about our state “reasonably". But when we move to redux, our entire document is in our store and no component will controls its own state. So this problem we spent an hour solving (okay maybe l spent more than that), ends up being trivial. We just dispatch an action like:

// DocumentActions.js  
const DeleteLine = (sectionId, lineId, content) => {  
  return({ type: 'DELETE', sectionId, lineId, content });  
}// DocumentReducer.js  
case 'DELETE':  
  const section = state.document.sections\[sectionId\];  
  const lineToDelete = section.lines\[lineId\];  
  const index = section.lines.findIndex(id => id === lineId);  
  // now we know what we need to know. We can account for it being  
  // the first line in the section. Or the first line in the    
  // document. We have all the information.

So that problem we spent so much time solving? It’s not really something we need to solve at all. We spent time and cognitive space on a solution that we end up not having with redux. This is also known as wasting time :)

\* I realize now that maybe a more accurate title for my heading might be “It changes the way we reason about _changing_ state"

This is a pretty simple one. When you lift state out of components, it makes you question whether they really need to extend `Component` at all. Maybe they can just be pure functional components? For example, a header with a text input to search the content of our current screen — we might consider this to be a part of the component itself before redux. I mean it’s modifying the list in our state right?

class SomeComponent extends Component {state = {  
  list: \[\]  
}filterList = () => { ...modify the results }render() {  
  return (  
    <View>  
      <TextInput onChangeText={this.filterList}></TextInput>   
      ...rest of the component  
    </View>  
  );  
}

But when we change to redux we could filter our list through the store if we wanted. This means we could move our header component into some other file where it takes the filtering method as a prop. From my experience, this decomposition has a snowball effect. Once you remove one set of methods and rendering, you start to realize that other “integral" parts of the component, turn out to be their own little reusable sections. A `TextInput` that filters the results in one part of your application can actually filter _any_ list in your application.

A lot of this is more trivial than reasoning about state. You’re not wasting as much time by moving stuff around, but you’re still rethinking your decisions earlier once the components move to redux. You skip this “rethinking" by reduxifying your app earlier. While I’m a fan of rewriting, and rewriting often, it all still needs to be headed in the right direction. Redux connects ideas that you didn’t see as connected before. (get it guys? `connect`?)

This one is pretty straightforward. It’s the reason you don’t want to use redux in the first place. I’m actually agreeing with you. If you’ve never used it before, _redux is complicated._ Learning it — like learning many things — is painful. You are wrong, and you have to rewrite, but then you’re wrong again. _It’s a different way of thinking._

But trust me, make the switch now. Just dive in and start working through the problems. It will be hard. You will probably be faster writing components in a more familiar way, especially if you’re coming from a different framework like MVC. But in the end, you will love it.

The jump is worth it.

You know you want to right? Just go for it.


[Source](https://medium.com/@ian.mundy/use-redux-before-its-too-late-a73d837a06aa)
