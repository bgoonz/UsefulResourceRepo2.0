<div className="booking">
  <h3 className="booking-price">
    $ 12 <span className="booking-per-night">per night</span>
  </h3>
  <hr></hr>
  <div className="form-group">
    <label htmlFor="dates">Dates</label>
    <input
      placeholder="2020/12/12"
      type="text"
      className="form-control"
    ></input>
  </div>
  <div className="form-group">
    <label htmlFor="guests">Guests</label>
    <input
      value="1"
      type="number"
      className="form-control"
      id="guests"
      aria-describedby="guests"
    ></input>
  </div>
  <button className="btn btn-bwm-main btn-block">Reserve place now</button>
  <hr></hr>
  <p className="booking-note-title">People are interested into this house</p>
  <p className="booking-note-text">
    More than 500 people checked this rental in last month.
  </p>
</div>;

// .booking {
//   padding: 20px;
//   border: 1px solid #dedada;

//   .btn-confirm {
//     font-size: 17px;
//     font-weight: 700;
//     padding: 13px;
//   }

//   label {
//     font-size:12px;
//     font-weight: 300;
//     margin-bottom: 0;
//   }

//   &-price {
//     font-size: 22px;
//     font-weight: 700;
//   }

//   &-per-night {
//     font-size: 13px;
//     font-weight: 300;
//   }

//   &-note-title {
//     font-size: 14px;
//     margin-bottom: 10px;
//   }

//   &-note-text {
//     font-size: 13px;
//     font-weight: 300;
//   }

//   .should-login-btn-container {
//     text-align: center;
//     margin-bottom: 10px;

//     .btn-login {
//     text-align:center;
//     font-size: 15px;
//     padding: 15px;

//     &:hover, &:focus {
//         color: white;
//         text-decoration: none;
//       }
//     }
//   }
// }

// // MODAL
// .booking-modal {
//   .title {
//     font-weight: 700;
//     font-size: 26px;
//   }

//   .buttons {
//     margin: 15px 0px;
//   }

//   em {
//     font-style: normal;
//     font-size: 17px;
//     font-weight: 700;
//   }

//   p {
//     margin: 0;
//   }
// }
