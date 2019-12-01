<template>
  <section>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title is-size-5">
          <font-awesome-icon :icon="['fa', 'plus-circle']"/>
          Add New Type
        </p>
      </header>
      <div class="modal-card-body columns">
        <div class="column">
          <b-field label="Type Name" label-position="inside">
            <b-input
              v-model="typeName"
              type="text"
              autocomplete="off"
              required>
            </b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Extra Price (IDR)" label-position="inside">
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
  name: 'AddType',
  data () {
    return {
      typeName: null,
      typeExtraPrice: null,
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
      this.typeExtraPrice = event.target._vCleave.getRawValue()
      this.moneyFormat = event.target._vCleave.getFormattedValue()
    },
    cancelAdd () {
      let store = this.$store
      let state = {parent: 'Types'}
      store.dispatch('sectionTo', state)
    },
    async saveProduct () {
      if (this.typeName && this.typeExtraPrice != null) {
        let newType = {
          name: this.typeName,
          extraPrice: this.typeExtraPrice
        }

        await api.type.storeType(newType).then(() => {
          this.$store.dispatch('sectionTo', {parent: 'Types'})
          this.$buefy.toast.open({
            duration: 3000,
            message: 'New Type added!',
            type: 'is-success'
          })
        }).catch(err => {
          this.$buefy.toast.open({
            duration: 3000,
            message: err,
            position: 'is-top',
            type: 'is-danger'
          })
        })
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: 'All fields are required.',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
