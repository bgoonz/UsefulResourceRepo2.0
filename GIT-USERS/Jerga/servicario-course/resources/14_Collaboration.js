import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withAuthorization from "components/hoc/withAuthorization";

class Collaboration extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="root">
          {/* Body */}
          <div className="body">
            <div className="viewListUser">
              <div className="viewWrapItem">
                <img
                  className="viewAvatarItem"
                  src="https://i.imgur.com/cVDadwb.png"
                  alt="icon avatar"
                />
                <div className="viewWrapContentItem">
                  <span className="textItem">Nickname: Filip Jerga</span>
                  <span className="textItem">online</span>
                </div>
              </div>
            </div>
            <div className="viewBoard">
              <div className="viewChatBoard">
                <div className="headerChatBoard">
                  <img
                    className="viewAvatarItem"
                    src="https://i.imgur.com/cVDadwb.png"
                    alt="icon avatar"
                  />
                  <span class="textHeaderChatBoard">Filip Jerga</span>
                </div>
                <div className="viewListContentChat">
                  <div class="viewWrapItemLeft">
                    <div class="viewWrapItemLeft3">
                      <img
                        src="https://i.imgur.com/cVDadwb.png"
                        alt="avatar"
                        class="peerAvatarLeft"
                      />
                      <div class="viewItemLeft">
                        <span class="textContentItem">hey</span>
                      </div>
                    </div>
                    <span class="textTimeLeft">Oct 31, 2019</span>
                  </div>
                  <div class="viewItemRight">
                    <span class="textContentItem">hey</span>
                  </div>
                  <div style={{ float: "left", clear: "both" }}></div>
                </div>
                <div className="viewBottom">
                  <input
                    className="viewInput"
                    placeholder="Type your message..."
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthorization(Collaboration);
