const Newsletter = () => {
  return (
    <section className="section">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="container has-text-centered is-fluid">
            <div className="hero is-light">
              <div className="hero-body">
                <h2 className="title is-4">Sign up for our newsletter</h2>
                <div className="column is-6 is-offset-3">
                  <div className="field has-addons has-addons-centered">
                    <div className="control is-expanded">
                      <input
                        className="input "
                        type="text"
                        placeholder="Email address"
                      />
                    </div>
                    <div className="control">
                      <a className="button is-info">Subscribe</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
