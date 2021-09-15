import BaseLayout from "../components/BaseLayout.js";
import { withRouter } from "next/router";
import withAuth from "../components/hoc/withAuth";

const Bio = (props) => (
  <BaseLayout title={"Filip Jerga About Page"}>
    <section className="bio-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="brand">
              <h1 className="title fadein">Hello, how are you?</h1>
              <h4 className="subTitle fadein">Let's get know better</h4>
              <p className="subsubTitle fadein">
                If you have a minute or two get know me better
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="myStory fadein">
              <div className="wall" data-simplebar>
                <div className="myStory-content" id="intro">
                  <p className="intro">
                    My name is Filip Jerga and I am an experienced software
                    engineer and freelance developer.{" "}
                  </p>
                  <p>
                    I have a Master's degree in Artificial Intelligence and
                    several years of experience working on a wide range of
                    technologies and projects from C++ development for
                    ultrasound devices to modern mobile and web applications in
                    React and Angular.
                  </p>
                  <p>
                    Throughout my career, I have acquired advanced technical
                    knowledge and the ability to explain programming topics
                    clearly and in detail to a broad audience. I invite you to
                    take my course, where I have put a lot of effort to explain
                    web and software engineering concepts in a detailed,
                    hands-on and understandable way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BaseLayout>
);

// export default Bio;
export default withRouter(Bio);
