DEFINITION:::::: Context provide a way to pass data through the component tree without having to pass down manually at every level

HOW TO USE:::::: DECLARATION::: const MyContext = React.createContext() Creating a new Context for each unique piece of data that needs to be available throughout your component data const LocaleContext = React.createContext() Properties of LocaleContext ——– LocaleContext.Provider LocaleContext.Consumer

What is a Provider Allows us to “declare the data that we want available throughout our component tree”

What is a Consumer Allows “any component in the tree that needs that data to be able to subscibe to it”

How to use Provider &lt;MyContext.Provider value={data}&gt; &lt;/MyContext.Provider&gt;
