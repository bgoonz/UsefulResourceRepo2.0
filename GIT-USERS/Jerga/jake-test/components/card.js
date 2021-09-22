const Card = (props) => {
  return (
    <>
      <div className="card">
        <div
          className="card-image"
          style={{
            background:
              'url("https://images.unsplash.com/photo-1517177646641-83fe10f14633?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1404&q=80")',
          }}
        ></div>

        <div className="card-content">
          <h2>Ice Skating</h2>
          <div className="card-footer">
            <div className="age-range">2 - 10 yrs</div>
            <div className="location">Perroy</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          width: 350px;
          height: 340px;
          background: #fff;
          box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
            0px 5px 8px 0px rgba(0, 0, 0, 0.14),
            0px 1px 14px 0px rgba(0, 0, 0, 0.12);
          transition: 0.3s;
          cursor: pointer;
        }

        .card :hover {
          box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
            0px 10px 14px 1px rgba(0, 0, 0, 0.14),
            0px 4px 18px 3px rgba(0, 0, 0, 0.12);
        }

        .card-image {
          width: 350px;
          height: 250px;
          display: block !important;
          background-size: cover !important;
          background-repeat: no-repeat !important;
        }

        .card-content {
          padding: 0 20px;
        }

        h2 {
          font-size: 1.5rem;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0em;
          color: rgb(0, 0, 0, 0.8);
        }

        .card-footer {
          display: flex;
          margin-top: -3px;
          color: rgb(0, 0, 0, 0.8);
        }

        .location {
          margin-left: auto;
        }
      `}</style>
    </>
  );
};

export default Card;
