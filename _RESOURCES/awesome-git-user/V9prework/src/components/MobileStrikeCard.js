import React from "react"

const MobileStrikeCard = (props) => {
  return (
    <div className="mobile-card text-light">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h3 className="text-info">Name: {props.name}</h3>
            <p>ID: {props.id}</p>
            <p>Name Type: {props.nametype}</p>
            <p>Fall: {props.fall}</p>
          </div>
          <div className="col-sm-4">
            <h5>Year: {props.year}</h5>
            <p>Rec Class: {props.recclass}</p>
            <p>Mass: {props.mass} g</p>
          </div>
        </div>
        <p className="d-inline">Latitude: {props.latitude}</p>
        <p className="d-inline ml-4">Longitude: {props.longitude}</p>
      </div>
      <hr className="border-bottom" />
    </div>
  )
}

export default MobileStrikeCard
