import axios from 'axios'

const ItemsListApi = () =>
  axios.get(`https://api.ashish.me/courses`).then((result) => {
    return result.data
  })

export default ItemsListApi
