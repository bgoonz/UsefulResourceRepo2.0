import React, { useState } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";
import Link from "next/link";
import Details from "./detail";
import { getActivityById } from "../actions";

const ActivityList = (props) => {
  const [open, setOpen] = useState();
  const { activities } = props;
  const [selectedActivity, setSelectedActivity] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    image: "",
    website: "",
    city: "",
    address: "",
    phone: "",
    phoneFormatted: "",
    price: "",
    ageFrom: "",
    ageTo: "",
  });

  const openModal = async (id) => {
    // 1 getActivityById (in actions.js)
    const activity = await getActivityById(id);
    // 2 update the selectedActivity state
    setSelectedActivity({
      id: activity.id,
      name: activity.name,
      category: activity.category,
      description: activity.description,
      image: activity.image,
      website: activity.website,
      city: activity.city,
      address: activity.address,
      phone: activity.phone,
      phoneFormatted: activity.phoneFormatted,
      price: activity.price,
      ageFrom: activity.ageFrom,
      ageTo: activity.ageTo,
    });
    // 3 open the modal
    setOpen(true);
  };

  return (
    <>
      {activities.map((activity) => (
        <div key={activity.id}>
          {/* open in modal */}
          {/* <div className="grid-item" onClick={event => openModal(activity.id)}> */}
          {/* open page */}
          <div className="grid-item">
            <Link href={`/activities/${activity.id}`}>
              <div className="card">
                <div
                  className="card-image"
                  style={{ background: "url(" + activity.image + ")" }}
                ></div>
                <div className="card-content">
                  <h2>{activity.name}</h2>
                  <div className="card-footer">
                    <div className="age-range">
                      {activity.ageFrom + " - " + activity.ageTo + " yrs"}
                    </div>
                    <div className="location">{activity.city}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}

      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="backdrop">
            <div className="modal">
              <Details
                id={selectedActivity.id}
                name={selectedActivity.name}
                city={selectedActivity.city}
                price={selectedActivity.price}
                ageFrom={selectedActivity.ageFrom}
                ageTo={selectedActivity.ageTo}
                description={selectedActivity.description}
                address={selectedActivity.address}
                phone={selectedActivity.phone}
                website={selectedActivity.website}
                category={selectedActivity.category}
                phoneFormatted={selectedActivity.phoneFormatted}
                image={selectedActivity.image}
                closeModal={(event) => setOpen(false)}
              />
            </div>
          </div>
        </ClientOnlyPortal>
      )}

      <style jsx>{`
        .backdrop {
          position: fixed;
          background-color: rgba(0, 0, 0, 0.7);
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .modal {
          position: absolute;
          left: 50%;
          margin-left: -570px;
          margin-top: 200px;
          width: 1140px;
        }

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

        .card-footer {
          display: flex;
          margin-top: -3px;
          color: rgb(0, 0, 0, 0.8);
        }

        .location {
          margin-left: auto;
        }

        .close {
          margin-bottom: -150px;
        }
      `}</style>
    </>
  );
};

export default ActivityList;
