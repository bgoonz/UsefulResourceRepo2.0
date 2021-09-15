import React from "react";
import "./styles.css";

function FirstComponent({ children }) {
  return (
    <div>
      <h3>I am the first component</h3>;
     { children }
    </div>
  );
}

function SecondComponent({ children }) {
  return (
    <div>
      <h3>I am the second component</h3>;
     {children}
    </div>
  );
}

function ThirdComponent({ children }) {
  return (
    <div>
      <h3>I am the third component</h3>
        {children}
    </div>
  );
}

function ComponentNeedingProps({ content }) {
  return <h3>{content}</h3>
}

export default function App() {
  const content = "Who needs me?";
 return (
    <div className="App">
      <FirstComponent>
        <SecondComponent>
          <ThirdComponent>
            <ComponentNeedingProps content={content}  />
          </ThirdComponent>
        </SecondComponent>
      </FirstComponent>
    </div>
  );
}