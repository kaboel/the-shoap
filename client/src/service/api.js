import Axios from 'axios'

const uri = Axios.create({
  baseURL: `http://localhost:8089/v0`
})

export default {
  getAllProduct () {
    return uri.get(`/products`)
  }
}
