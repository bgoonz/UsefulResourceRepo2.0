"use strict";
{
  /**
    In react we do
    
    function Welcome(props) {
      return <h1> Hello, {props.name}</h1>;
    }
    
  **/

  // in RACT, racked we do

  function Welcome(props) {
    return `<h1> Hello, ${props.name}</h1>`;
  }

  // Code expansion: #props_used + 2 ( 1 extra character for each prop + 2 for the start and end backticks )
  // But build simplification: 
  // - No JSX
  // - No transpilation
  // - No complex build chain

  /**
     in react we can do
     
     const element = <Welcome name="Sara" />
     
     ReactDOM.render(
      element,
      document.getElementById('root');
     );
     
     which produces <h1> Hello, Sara</h1> on the page
   **/

  // in RACT/racked we do
  const caseMap = {};
  const Racked = { render };
  const element = `<Welcome name="Sara" />`;

  // now what happens is 
  // we end up with a HTML element called "component" that looks like this:
  // <component name=Sara></component>

  // then we do

  Racked.render(
    element,
    document.getElementById('root')
  )

  function App() {
    return R`
      <div>
        <Welcome name="Sara"/>
        <Welcome name="Cahal"/>
        <Welcome name="Edite"/>
      </div>
    `
  }

  Racked.render(
    `<App />`,
    document.getElementById('root')
  );

  function render(textrack, where) {
    const rack = fc(textrack);
    if ( ! rack ) {
      return textrack;
    }

    const parser = document.createTreeWalker(rack,NodeFilter.SHOW_ALL);
    const stack = [];
    let html = '';

    do {
      const node = parser.currentNode;
      switch( node.nodeType ) {
        case Node.ELEMENT_NODE: {
          const name = node.tagName.toLowerCase();
          const CapitalizedNameIndex = textrack.toLowerCase().indexOf(name);
          let CapitalizedName = name;
          if ( CapitalizedNameIndex >= 0 ) {
            CapitalizedName = textrack.substr(CapitalizedNameIndex,name.length);
          }
          // see if it's a ract component (if there's a function called <CapitalizedName>))
          try {
            const props = Array.from(node.attributes)
              .reduce((all,{name,value}) => {
                try {
                  all[name] = JSON.parse(unescape(value));
                } catch(e) {
                  all[name] = value;
                }
                return all;
              },{});
            let componentHtml = eval(`${CapitalizedName}(${JSON.stringify(props)})`);
            const renderedAgainComponentHtml = render(componentHtml,null);
            if ( componentHtml !== renderedAgainComponentHtml ) {
              componentHtml = renderedAgainComponentHtml; 
            }
            html += componentHtml;
            break;
          } catch(e) {
            // not a ract component so we need to close it
            stack.push(node);
            // and report it
            html += `<${name}${node.attributes.length ? ' ' + 
              Array.from(node.attributes)
              .map( attr => `${attr.name}="${attr.value}"` )
              .join(' ') : ''}>`;
            break;
          }
        }
        default: {
          if ( !! node.nodeValue ) {
            const renderedAgainComponentHtml = render(node.nodeValue,null);
            if ( renderedAgainComponentHtml !== node.nodeValue ) {
              html += renderedAgainComponentHtml;
            } else {
              html += node.nodeValue || '';
            }
          }
          break;
        }
      }
      if ( ! node.nextSibling && ! node.childNodes.length ) {
        const parent = stack.pop(); 
        if ( !! parent && ! VOID_ELEMENTS.has(parent.localName)) {
          // close it
          html += `</${parent.tagName.toLowerCase()}>`;
        }
      }
    } while(parser.nextNode());

    if ( ! where ) {
      return html;
    } else {
      where.innerHTML = html;
      //where.insertAdjacentHTML('afterBegin', html);
    }
  }
}
  
  
