import Axios from 'axios'

const uri = Axios.create({
  baseURL: `http://localhost:8089/v0`
})

const product = {
  getAllProduct () {
    return uri.get(`/products`)
  },
  deleteProduct (id) {
    return uri.post(`/product/delete`, {
      id: id
    })
  },
  storeProduct (product) {
    return uri.post(`/products`, {
      name: product.name,
      description: product.description,
      duration: product.duration,
      price: product.price
    })
  }
}

const type = {
  getAllTypes () {
    return uri.get(`/types`)
  },
  deleteType (id) {
    return uri.post(`/type/delete`, {
      id: id
    })
  },
  storeType (type) {
    return uri.post(`/types`, {
      name: type.name,
      extraPrice: type.extraPrice
    })
  }
}

export default {
  product, type
}
