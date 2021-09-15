import jwtDecode from 'jwt-decode'
import axios from 'axios'

export const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token)
    if (decodedToken) return decodedToken
  } catch (error) {
    console.error(error)
  }
}

export const isAuthenticated = (token) => {
  // Asynchronous user validation
  const validate = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/validate`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response) return true
      else return false
    } catch (error) {
      console.error(error)
    }
  }

  // Return true if user is validated, false otherwise
  if (token) return validate()
  else return false
}
