import React, { Component } from "react";
import styled from "styled-components";

import Entry from "./shared/Entry";
import PageTitle from "./shared/PageTitle";

const entries = [
  {
    id: 1,
    name: "Github",
    description:
      'The source code is hosted here: <a target="_blank" href="https://github.com/danielres/myTribe">https://github.com/danielres/myTribe</a>',
  },
];

const Wrapper = styled.section``;

class About extends Component {
  render() {
    return (
      <Wrapper>
        <PageTitle>About</PageTitle>

        <div className="entries">
          {entries.map((entry) => (
            <Entry key={entry.id}>
              <h1>{entry.name}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: entry.description,
                }}
              />
            </Entry>
          ))}
        </div>
      </Wrapper>
    );
  }
}

export default About;
