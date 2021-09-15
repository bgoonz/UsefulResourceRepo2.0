# Table OF Contents

- [Table OF Contents](#table-of-contents)
  - [1\. Compatibility](#1-compatibility)
    - [Support Existing Content](#support-existing-content)
    - [Degrade Gracefully](#degrade-gracefully)
    - [Do not Reinvent the Wheel](#do-not-reinvent-the-wheel)
    - [Pave the Cowpaths](#pave-the-cowpaths)
    - [Evolution Not Revolution](#evolution-not-revolution)
  - [2\. Utility](#2-utility)
    - [Solve Real Problems](#solve-real-problems)
    - [Priority of Constituencies](#priority-of-constituencies)
    - [Secure By Design](#secure-by-design)
    - [Separation of Concerns](#separation-of-concerns)
    - [DOM Consistency](#dom-consistency)
  - [3\. Interoperability](#3-interoperability)
    - [Well-defined Behavior](#well-defined-behavior)
    - [Avoid Needless Complexity](#avoid-needless-complexity)
    - [Handle Errors](#handle-errors)
  - [4\. Universal Access](#4-universal-access)
    - [Media Independence](#media-independence)
    - [Support World Languages](#support-world-languages)
    - [Accessibility](#accessibility)
    - [Source](#source)

## 1\. Compatibility

There are many ways of interpreting compatibility. Sometimes the terms "backwards compatibility" and "forwards compatibility" are used, but sometimes the meaning of those terms can be unclear. The principles in this section address different facets of compatibility.

---

### Support Existing Content

This principle applies primarily to the supported language.

Existing content often relies upon expected user agent processing and behavior to function as intended. Processing requirements should be specified to ensure that user agents implementing this specification will be able to handle most existing content. In particular, it should be possible to process existing HTML documents as HTML 5 and get results that are compatible with the existing expectations of users and authors, based on the behavior of existing browsers. It should be made possible, though not necessarily required, to do this without mode switching.

Content relying on existing browser behavior can take many forms. It may rely on elements, attributes or APIs that are part of earlier HTML specifications, but not part of HTML 5, or on features that are entirely proprietary. It may depend on specific error handling rules. In rare cases, it may depend on a feature from earlier HTML specifications _not_ being implemented as specified.

When considering changes to legacy features or behavior, relative to current implementations and author expectations, the following questions should be considered:

- Does a significant quantity of existing content depend on the feature or behavior?
- Does any of the dependent content occur on particularly popular websites?
- Is the dependent content genuinely intended for consumption, rather than occurring solely in test cases or examples?
- Is the dependent content on the public web, rather than found solely on internal sites with a controlled user environment?
- Does the dependent content currently work as intended in multiple popular user agents, rather than explicitly targeting only one particular user agent, or only very old or otherwise unpopular ones?

The benefit of the proposed change should be weighed against the likely cost of breaking content, as measured by these criteria. In some cases, it may be desirable to make a nonstandard feature or behavior part of the conforming language, if it satisfies a valid use case. However, the fact that something is part of the supported language does not by itself mean that relying on it is condoned or encouraged.

---

- _**Examples**_

Many sites use broken markup, such as badly nested elements (**`\<b>a\<i>b\</b>c\</i>`**), and both authors and users have expectations based on the error handling used by legacy user agents. We need to define processing requirements that remain compatible with the expected handling of such content.

Some sites rely on the **`\<u>`** element giving the presentational effect of an underline.

---

### Degrade Gracefully

---

This guideline applies fundamentally to the adjusting language.

On the World Wide Web, creators are regularly hesitant to utilize new dialect includes that mess up more seasoned client specialists, or that don't give a type of elegant fallback. HTML 5 report conformance prerequisites should be planned so that Web substance can debase nimbly in more established or less fit client specialists, in any event, when utilizing new components, traits, APIs and substance models.

It isn't really suitable to consider each Web client specialist ever constructed, including even old variants of programs or apparatuses that are amazingly disagreeable even in their specialty markets. Nonetheless, solid thought should be given to the accompanying classes of client specialists. All things considered, content creators will think that its imperative to focus on these classifications:

- Current forms of the top standard Web programs.

- Highly well known more established renditions of standard Web programs.

- The top client specialists intended to address explicit issues or address specific business sectors, for example, assistive innovations, versatile programs or client specialists focusing on less commonplace media, for example, text-just terminals or print.

Sometimes, another component may just not matter to a specific class of client specialists, or might be unfeasible to plan in a manner that can corrupt. For instance, new scripting APIs can't be made to work in scriptless client specialists. Be that as it may, as a rule, approaches like the accompanying can be utilized:

- another component or quality may give extra semantics without losing basic usefulness when not comprehended.

- another scripting technique or trait can be tried before use in content utilizing ECMAScript reflection offices.

- another component or characteristic may give semantics and a straightforward default delivering that can be accomplished utilizing CSS, so expansion of a little template permits smooth corruption.

- another component, characteristic or scripting API may have conduct that can be imitated using extra content, despite the fact that the scripted methodology may not give a similar degree of execution and comfort.

- another component may require a profoundly particular delivering, however permit diverse substance to be given as fallback to client specialists that don't comprehend the component.

- _**Examples**_

The default introduction of the proposed 'insignificant' trait can be copied through the CSS rule '\[irrelevant] { show: none; }'.

Proposed new sight and sound components like '\<canvas> fallback \</canvas>' or '\<video> fallback \</video>' permit fallback content. More established client specialists will show "fallback" while client specialists supporting 'canvas' or 'video' will show the interactive media content.

The proposed 'getElementsByClassName()' strategy can be made extensively quicker than unadulterated ECMAScript usage found in existing libraries, however a content based execution can be utilized when the local form isn't accessible.

The '\<datalist>' component can be related with an '\<input>' component and may contain a covered up '\<select>' component. This way the fallback for the proposed "combo box" control can be a content field or a book field with a related spring up menu in existing standard programs

Now and again, another component may essentially not make a difference to a specific class of client specialists, or might be unfeasible to plan in a manner that can debase. For instance, new scripting APIs can't be made to work in scriptless client specialists. Be that as it may, as a rule, approaches like the accompanying can be utilized:

- another component or quality may give extra semantics without losing fundamental usefulness when not comprehended.

- another scripting strategy or property can be tried before use in content utilizing ECMAScript reflection offices.

- another component or property may give semantics and a basic default delivering that can be accomplished utilizing CSS, so expansion of a little template permits effortless corruption.

- another component, quality or scripting Programming interface may have conduct that can be imitated using extra content, in spite of the fact that the scripted methodology may not give a similar degree of execution and accommodation.

- another component may require a profoundly specific delivering, however permit distinctive substance to be given as fallback to client specialists that don't comprehend the component.

This rundown isn't thorough; now and again marginally more muddled methodologies are more viable.

---

### Do not Reinvent the Wheel

If there is already a widely used and implemented technology covering particular use cases, consider specifying that technology in preference to inventing something new for the same purpose. Sometimes, though, new use cases may call for a new approach instead of more extensions on an old approach.

**`contenteditable=""`** was already used and implemented by user agents. No need to invent a new feature.

---

### Pave the Cowpaths

When a practice is already widespread among authors, consider adopting it rather than forbidding it or inventing something new.

Authors already use the **`\<br/>`** syntax as opposed to **`\<br>`** in HTML and there is no harm done by allowing that to be used.

---

### Evolution Not Revolution

Revolutions sometimes change the world to the better. Most often, however, it is better to evolve an existing design rather than throwing it away. This way, authors don't have to learn new models and content will live longer. Specifically, this means that one should prefer to design features so that old content can take advantage of new features without having to make unrelated changes. And implementations should be able to add new features to existing code, rather than having to develop whole separate modes.

Switching to XML syntax requires a global change, so continue supporting classic HTML syntax as well.

## 2\. Utility

These principles call for a design that makes sure HTML can be used effectively for its many intended purposes.

---

### Solve Real Problems

Changes to the spec should solve actual real-world problems. Abstract architectures that don't address an existing need are less favored than pragmatic solutions to problems that web content faces today. And existing widespread problems should be solved, when possible.

---

### Priority of Constituencies

In case of conflict, consider users over authors over implementors over specifiers over theoretical purity. In other words costs or difficulties to the user should be given more weight than costs to authors; which in turn should be given more weight than costs to implementors; which should be given more weight than costs to authors of the spec itself, which should be given more weight than those proposing changes for theoretical reasons alone. Of course, it is preferred to make things better for multiple constituencies at once.

---

### Secure By Design

Ensure that features work with the security model of the web. Preferrably address security considerations directly in the specification.

Communicating between documents from different sites is useful, but an unrestricted version could put user data at risk. Cross-document messaging is designed to allow this without violating security constraints.

---

### Separation of Concerns

HTML should allow separation of content and presentation. For this reason, markup that expresses structure is usually preferred to purely presentational markup. However, structural markup is a means to an end such as media independence. Profound and detailed semantic encoding is not necessary if the end can be reached otherwise. Defining reasonable default presentation for different media may be sufficient. HTML strikes a balance between semantic expressiveness and practical usefulness. Names of elements and attributes in the markup may be pragmatic (for brevity, history, simplicity) rather than completely accurate.

The **`article`** element defines an individual article, but not the details of how it is displayed. A journal article may be the only article on a page, formatted in multiple columns, while a blog post may share a page with multiple other articles and be presented in a box with a border.

The **`b`** and **`i`** elements are widely used — it is better to give them good default rendering for various media including aural than to try to ban them.

---

### DOM Consistency

The two serializations should be designed in such a way that the DOM trees produced by the respective parsers appear as consistently as feasible to scripts and other program code operating on the document trees. Discrepancies can be allowed for compatibility with legacy implementations, but the differences should be minimized.

Also, unless required for compatibility with legacy implementations and deployed content, gratuitous difference in syntactic appearance should be avoided as well.

The HTML (**`text/html`**) parser puts elements in the **`http://www.w3.org/1999/xhtml`** namespace in the DOM for compatibility with the XML syntax of HTML 5.

## 3\. Interoperability

These principles exist to improve the chances of HTML implementations being truly interoperable.

---

### Well-defined Behavior

Prefer to clearly define behavior that content authors could rely on, in preference to vague or implementation-defined behavior. This way, it is easier to author content that works in a variety of user agents. However, implementations should still be free to make improvements in areas such as user interface and quality of rendering.

---

### Avoid Needless Complexity

Simple solutions are preferred to complex ones, when possible. Simpler features are easier for user agents to implement, more likely to be interoperable, and easier for authors to understand. But this should not be used as an excuse to avoid satisfying the other principles.

---

### Handle Errors

Error handling should be defined so that interoperable implementations can be achieved. Prefer graceful error recovery to hard failure, so that users are not exposed to authoring errors.

## 4\. Universal Access

Features should be designed for universal access. This category covers various principles related to that.

---

### Media Independence

Features should, when possible, work across different platforms, devices, and media. This should not be taken to mean that a feature should be omitted just because some media or platforms can't support it. For example, interactive features should not be omitted merely because they can not be represented in a printed document.

The general reflowability of HTML text makes it more suitable to variable screen dimensions than a representation of exact glyph positions.

A hyperlink can not be actuated in a printed document, but that is no reason to omit the **`a`** element.

---

### Support World Languages

Enable publication in all world languages. But this should not be taken as equalizing writing systems by prohibiting features that do not apply to all of them. Features for packing multiple translations of a document in a single file are out of scope.

Supporting Unicode allows text in most of the world's languages, including mixing of text in different languages.

Italic text is useful because it applies to many bicameral scripts, even though some scripts have no such concept. Similarly, ruby is useful for many scripts, even though it has a CJK focus.

Text in element content has better language support than text in attribute content; in element content ruby annotations can be inserted, as well as **`dir`** attributes and **`bdo`** elements in case the Unicode bidirectional algorithm is insufficient to correctly order adjacent runs of mixed direction text.

---

### Accessibility

Design features to be accessible to users with disabilities. Access by everyone regardless of ability is essential. This does not mean that features should be omitted entirely if not all users can make full use of them, but alternate mechanisms should be provided.

The image in an **`img`** may not be visible to blind users, but that is a reason to provide alternate text, not to leave out images.

The **`progress`** element is intrinsically accessible as it has unambiguous progress bar semantics which permits mapping to accessibility APIs that can represent progress indicators.

---

### [Source](https://www.w3.org/TR/2007/WD-html-design-principles-20071126/#compatibility)

> http://www.w3.org/TR/2007/WD-html-design-principles-20071126/
