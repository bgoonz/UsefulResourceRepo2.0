import React from "react";
import _ from "lodash";

import components, { Layout } from "../components";

export default class Landing extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        {_.map(_.get(this.props, "page.sections"), (section, section_idx) => {
          const component = _.upperFirst(_.camelCase(_.get(section, "_type")));
          const Component = components[component];
          return (
            <Component key={section_idx} {...this.props} section={section} />
          );
        })}
      </Layout>
    );
  }
}
