import Axios from 'axios'

const uri = Axios.create({
  baseURL: `http://localhost:8089/v0`
})

const product = {
  getAllProduct () {
    return uri.get(`/products`)
  },
  getProductById (id) {
    return uri.get(`product/${id}`)
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
  getTypeById (id) {
    return uri.get(`/type/${id}`)
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

const order = {
  getAllOrders () {
    return uri.get(`/orders`)
  },
  placeOrder (order) {
    return uri.post('/orders', {
      name: order.name,
      phone: order.phone,
      email: order.email,
      address: order.address,
      order: order.order
    })
  },
  getOrderById (id) {
    return uri.get(`/order/${id}`)
  },
  getOrderByStatus (status) {
    return uri.get(`/orders/${status}`)
  },
  setComplete (order) {
    return uri.post(`/order/update`, {
      id: order.id,
      status: order.status
    })
  }
}

export default {
  product, type, order
}
