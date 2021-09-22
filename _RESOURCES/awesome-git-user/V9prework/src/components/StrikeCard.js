import React from "react"

const StrikeCard = (props) => {
  return (
    <div className="table-row border-bottom text-light">
      <p className="d-inline-block text-center mt-3">{props.name}</p>
      <p className="d-inline-block text-center mt-3">{props.id}</p>
      <p className="d-inline-block text-center mt-3">{props.nametype}</p>
      <p className="d-inline-block text-center mt-3">{props.recclass}</p>
      <p className="d-inline-block text-center mt-3">{props.mass}</p>
      <p className="d-inline-block text-center mt-3">{props.fall}</p>
      <p className="d-inline-block text-center mt-3">{props.year}</p>
      <p className="d-inline-block text-center mt-3">{props.latitude}</p>
      <p className="d-inline-block text-center mt-3">{props.longitude}</p>
    </div>
  )
}

export default StrikeCard
