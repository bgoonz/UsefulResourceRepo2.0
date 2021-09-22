<BaseLayout navClass="transparent" user={user} loading={loadingUser}>
  <BasePage
    noWrapper
    indexPage
    title={`${portfolio?.title} - Minh Hiep Le  `}
    metaDescription={portfolio?.description}
  >
    <div className="portfolio-detail">
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <main role="main" className="inner page-cover">
          {router.isFallback ? (
            <h1 className="cover-heading">Your page is geting served...</h1>
          ) : !portfolio ? (
            <>Your Error page</>
          ) : (
            <React.Fragment>
              <h1 className="cover-heading">{portfolio.title}</h1>
              <p className="lead dates">
                {formatDate(portfolio.startDate)} -{" "}
                {formatDate(portfolio.endDate) || "Present"}
              </p>
              <p className="lead info mb-0">
                {portfolio.jobTitle} | {portfolio.company} |{" "}
                {portfolio.location}
              </p>
              <p className="lead">{portfolio.description}</p>
              <p className="lead">
                <a
                  href={portfolio.companyWebsite}
                  target="_"
                  className="btn btn-lg btn-secondary"
                >
                  Visit Company
                </a>
              </p>
            </React.Fragment>
          )}
        </main>
      </div>
    </div>
  </BasePage>
</BaseLayout>;
