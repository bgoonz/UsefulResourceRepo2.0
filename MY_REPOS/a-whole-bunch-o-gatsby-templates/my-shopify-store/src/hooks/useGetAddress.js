import * as React from "react"

export function useGetAddress() {
  const [address, setAddress] = React.useState(null)

  async function getData() {
    try {
      const coordinates = await fetchCoordinates()

      const data = await fetchAddress({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      })

      setAddress(data.result.address)
    } catch (e) {
      if (window.console && console.warn) {
        console.warn("Failed to fetch address", e)
      }
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  return address
}

async function fetchAddress({ latitude, longitude }) {
  const response = await fetch(
    `/api/getAddress?lat=${latitude}&lng=${longitude}`
  )
  return await response.json()
}

async function fetchCoordinates() {
  const response = await fetch(
    `https://geolocation-db.com/json/${process.env.GEOLOCATION_DB_API}`
  )
  return await response.json()
}
