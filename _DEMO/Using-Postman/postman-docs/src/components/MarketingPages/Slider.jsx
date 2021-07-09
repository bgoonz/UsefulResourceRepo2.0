import './_slider.scss';
import React from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import chooseVerbVideo from '../../assets/choose-verb.mp4';
import sendVideo from '../../assets/send.mp4';
import enterUrlVideo from '../../assets/enter-url.mp4';

// implemented with react-tabs plugin https://github.com/reactjs/react-tabs

const Slider = () => (
  <section id="send-a-request">
    <h2 className="send-a-request__header">1. Send a Request</h2>
    <Tabs forceRenderTabPanel>
      <TabList>
        <Tab>
          <span className="number">1</span>
          Choose your verb
        </Tab>
        <Tab>
          <span className="number">2</span>
          Enter a URL
        </Tab>
        <Tab>
          <span className="number">3</span>
          Send a request
        </Tab>
      </TabList>

      <TabPanel>
        <div className="send-a-request-content">
          <video
            className="send-a-request-content-video"
            src={chooseVerbVideo}
            autoPlay
            loop
          />
          <div className="send-a-request-content-text">
            <h3 className="send-a-request-content-text-title">
              Choose your verb
            </h3>
            <div className="send-a-request-content-text-description">
              <p>
                In this example, we&apos;re making a GET request to retrieve data
                from the server.
              </p>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="send-a-request-content">
          <video
            className="send-a-request-content-video"
            src={enterUrlVideo}
            autoPlay
            loop
          />
          <div className="send-a-request-content-text">
            <h3 className="send-a-request-content-text-title">Enter a URL</h3>
            <div className="send-a-request-content-text-description">
              <p>Now let’s send our first API request!</p>
              <p>
                Enter
                {' '}
                <span>postman-echo.com/get</span>
                {' '}
                into the URL field.
                {' '}
              </p>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="send-a-request-content">
          <video
            className="send-a-request-content-video"
            src={sendVideo}
            autoPlay
            loop
          />
          <div className="send-a-request-content-text">
            <h3 className="send-a-request-content-text-title">
              Send a request
            </h3>
            <div className="send-a-request-content-text-description">
              <p>
                Click the &quot;Send&quot; button and inspect the returned response
                body.
              </p>
            </div>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  </section>
);

export default Slider;
