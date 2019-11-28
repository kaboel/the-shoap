import Axios from 'axios'

const uri = Axios.create({
  baseURL: `http://localhost:8089/v0`
})

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const stringify = data => {
  return JSON.stringify(data);
}

export default {
  getAllProduct () {
    return uri.get(`/products`)
  },

  deleteProduct(id) {
    return uri.post(`/product/delete`, {
      id: id
    })
  }
}
