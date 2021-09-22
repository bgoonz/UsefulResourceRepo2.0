import React from "react";
import BaseLayout from "../components/BaseLayout.js";

class Contact extends React.Component {
  render() {
    return (
      <BaseLayout>
        <section className="contactPage">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h1> Contact Me Today </h1>
                <div>
                  <div className="social-icons">
                    <i class="fab fa-facebook-square"></i>
                    <i class="fab fa-linkedin-in"></i>
                    <i class="fab fa-google-plus-g"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BaseLayout>
    );
  }
}

export default Contact;
