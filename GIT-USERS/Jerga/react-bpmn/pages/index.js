import React from "react";
import "../App.css";
import "../index.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import dynamic from "next/dynamic";

const BpmnModelerComponent = dynamic(
  () => import("../components/bpmn/bpmn.modeler.component"),
  {
    ssr: false,
  }
);

class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BpmnModelerComponent />
      </React.Fragment>
    );
  }
}

export default IndexPage;
