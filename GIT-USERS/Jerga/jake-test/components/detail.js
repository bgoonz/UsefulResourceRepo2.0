import { useRouter } from "next/router";
import { getActivityById, deleteActivity } from "../actions";
import Link from "next/link";

const Details = (props) => {
  return (
    <div>
      <div className="details-card">
        <div className="card-header">
          <h1>{props.name}</h1>
          <div id="back-btn" onClick={props.closeModal}>
            <img id="arrow-left" src="/arrow-left.svg" alt="Go Back" />
            <span className="back">BACK</span>
          </div>
        </div>

        <div className="card-banner">
          <div id="location">
            <p className="banner-label">Location /</p>
            <p className="banner-info">{props.city}</p>
          </div>
          <div id="price-range">
            <p className="banner-label">Price Range /</p>
            <p className="banner-info">{props.price}</p>
          </div>
          <div id="age-range">
            <p className="banner-label">Age Range /</p>
            <p className="banner-info">
              {props.ageFrom} - {props.ageTo} years
            </p>
          </div>
          <div id="icons">
            <img
              className="banner-icon"
              src="/favorite.svg"
              alt="Add to favorites"
            />
            <img className="banner-icon" src="/share.svg" alt="Share" />
          </div>
        </div>

        <div className="card-content">
          <div className="info-section">
            <p className="description">{props.description}</p>
            {props.address.length > 0 && (
              <span>
                <p className="info">
                  <a
                    href={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      props.address
                    }
                    target="_blank"
                  >
                    <img
                      className="map-icon"
                      align="top"
                      src="/place.svg"
                      alt="Map pin"
                    />
                    {props.address}
                  </a>
                </p>
              </span>
            )}

            {props.phone.length > 0 && (
              <span>
                <p className="info">
                  <a href={"tel:" + props.phoneFormatted}>
                    <img
                      className="map-icon"
                      align="top"
                      src="/phone.svg"
                      alt="Phone icon"
                    />
                    {props.phone}
                  </a>
                </p>
              </span>
            )}

            {props.website.length > 0 && (
              <span>
                <p className="info">
                  <a href={"http://" + props.website} target="_blank">
                    <img
                      className="map-icon"
                      align="top"
                      src="/right-arrow.svg"
                      alt="Right arrow"
                    />
                    {props.website}
                  </a>
                </p>
              </span>
            )}

            <p className="info">
              <img
                className="map-icon"
                align="top"
                src="/tags.svg"
                alt="Tags icon"
              />
              {props.category}
            </p>
          </div>
          <img className="image-section" src={props.image} alt={props.name} />

          {/* <button onClick={() => handleDelete(id)} href="#" role="button">Delete</button>
        <Link href="/activities/[id]/edit" as={`/activities/${id}/edit`}>
          <button 
          role="button">Edit</button>
        </Link>

        <p className="desc-text">{ activity.longDesc }</p> */}
        </div>
      </div>

      <style jsx>{`
        #back-btn {
          margin-left: auto;
          margin-top: 15px;
          cursor: pointer;
          opacity: 0.7;
        }

        #back-btn :hover {
          opacity: 1;
        }

        #arrow-left {
          margin-bottom: -6px;
          margin-right: 3px;
        }

        .card-content {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .card-header {
          display: flex;
          padding: 0 20px;
        }

        .details-card {
          width: 1140px;
          background: #fff;
          box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
            0px 5px 8px 0px rgba(0, 0, 0, 0.14),
            0px 1px 14px 0px rgba(0, 0, 0, 0.12);
        }

        .card-banner {
          display: flex;
          justify-content: space-between;
          height: 60px;
          background: #ff6633;
          padding: 0 20px;
          margin-bottom: 20px;
        }

        .banner-label {
          color: rgb(255, 255, 255, 0.8);
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .label {
          color: rgb(0, 0, 0, 0.6);
          font-size: 0.8rem;
          text-transform: uppercase;
          margin-bottom: -10px;
        }

        .info {
          color: #0097a7;
          margin: 5px 0;
        }

        a {
          color: #0097a7;
          text-decoration: none;
        }

        a :hover {
          text-decoration: underline;
        }

        .banner-info {
          color: white;
          font-size: 1rem;
          margin-top: -10px;
        }

        #icons {
          width: 55px;
          display: flex;
          justify-content: space-between;
        }

        .banner-icon {
          width: 25px;
          opacity: 0.5;
          cursor: pointer;
        }

        .banner-icon :hover {
          opacity: 1;
        }

        .map-icon {
          margin-top: 0;
          margin-right: 10px;
          width: 1.2rem;
        }

        .image-section {
          width: 700px;
          display: block !important;
        }

        .info-section {
          width: 370px;
          margin-top: -20px;
        }

        .description {
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
};

// Details.getInitialProps = async ({ id }) => {
//   const activity = await getActivityById(id)
//   return { activity }
// }

export default Details;
