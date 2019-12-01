<template>
  <section>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title is-size-5">
          <font-awesome-icon :icon="['fa', 'plus-circle']"/>
          Add New Product
        </p>
      </header>
      <div class="modal-card-body columns">
        <div class="column">
          <b-field label="Product Name" label-position="inside">
            <b-input
              v-model="productName"
              type="text"
              autocomplete="off"
              required>
            </b-input>
          </b-field>
          <b-field label="Duration (day)" label-position="inside">
            <b-numberinput :editable="false"
                           size="is-small"
                           v-model="productDuration"
                           autocomplete="off"
                           min="1"/>
          </b-field>
          <b-field label="Price (Rp.)" label-position="inside">
            <b-input
              id="currency"
              v-model="moneyFormat"
              v-cleave="masks.numeral"
              @input.native="onInput"
              autocomplete="off"
              required>
            </b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Product Description"
                   label-position="inside">
            <b-input maxlength="200"
                     type="textarea"
                     v-model="productDescription"
                     autocomplete="off"
                     required/>
          </b-field>
        </div>
      </div>
      <footer class="modal-card-foot">
        <button class="button" @click="cancelAdd">Cancel</button>
        <button class="button is-success" @click="saveProduct">Save</button>
      </footer>
    </div>
  </section>
</template>

<script>
import api from '../../service/api'
import Cleave from 'cleave.js'

const cleave = {
  name: 'cleave',
  bind (el, binding) {
    const input = el.querySelector('#currency')
    input._vCleave = new Cleave(input, binding.value)
  },
  unbind (el) {
    const input = el.querySelector('#currency')
    input._vCleave.destroy()
  }
}

export default {
  directives: { cleave },
  name: 'AddProduct',
  data () {
    return {
      productName: null,
      productDescription: null,
      productDuration: 1,
      productPrice: null,
      moneyFormat: null,
      masks: {
        numeral: {
          numeral: true,
          numeralDecimalScale: 7
        }
      }
    }
  },
  methods: {
    onInput (event) {
      this.productPrice = event.target._vCleave.getRawValue()
      this.moneyFormat = event.target._vCleave.getFormattedValue()
    },
    cancelAdd () {
      let store = this.$store
      let state = {parent: 'Products'}
      store.dispatch('sectionTo', state)
    },
    async saveProduct () {
      if (this.productName != null && this.productDescription != null && this.productPrice != null) {
        let newProduct = {
          name: this.productName,
          description: this.productDescription,
          duration: this.productDuration,
          price: this.productPrice
        }

        await api.product.storeProduct(newProduct).then(() => {
          this.$store.dispatch('sectionTo', {parent: 'Products'})
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'All fields are required.',
          position: 'is-top',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
