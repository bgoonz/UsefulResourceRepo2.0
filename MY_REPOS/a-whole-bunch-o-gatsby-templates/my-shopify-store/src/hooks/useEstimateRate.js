import * as React from "react"
import { useGetAddress } from "./useGetAddress"

export function useEstimateRate() {
  const [rates, setRates] = React.useState(null)
  const address = useGetAddress()

  async function getData({ country_code, postal_code }) {
    try {
      const data = await fetchRates({
        country_code,
        postal_code,
      })

      const preparedData = data.result.map(
        ({
          carrier_friendly_name,
          service_type,
          shipping_amount,
          estimated_delivery_date,
        }) => ({
          carrier_friendly_name,
          service_type,
          price: shipping_amount.amount,
          estimated_delivery_date,
        })
      )

      setRates(preparedData)
    } catch (e) {
      if (window.console && console.warn) {
        console.warn("Failed to fetch rates", e)
      }
    }
  }

  React.useEffect(() => {
    if (address) {
      const country_code = address.country_code
      const postal_code = address.postcode

      getData({ country_code, postal_code })
    }
  }, [address])

  return { address, rates }
}

async function fetchRates({ country_code, postal_code }) {
  const response = await fetch(
    `/api/estimateRate?country_code=${country_code}&postal_code=${postal_code}`
  )
  return await response.json()
}
