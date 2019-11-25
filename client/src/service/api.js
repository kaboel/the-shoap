import Axios from 'axios'

const api = Axios.create({
  baseURL: `http://localhost:8089/v0`
})

export default {
  getAllProduct () {
    return api.get(`/products`)
  }
}
