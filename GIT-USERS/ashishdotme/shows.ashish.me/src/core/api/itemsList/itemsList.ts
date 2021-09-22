import axios from 'axios'

const ItemsListApi = () =>
  axios.get(`https://api.ashish.me/shows`).then((result) => {
    return result.data
  })

export default ItemsListApi
