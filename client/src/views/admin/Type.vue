<template>
  <section>
    <div class="loading"
         v-if="allTypes == null">
      Loading...
    </div>

    <div class="table-container"
         v-if="allTypes != null">
      <table class="table is-narrow">
        <thead>
        <tr>
          <th>Name</th>
          <th>Extra Price (IDR)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="type in allTypes" :key="type._id">
          <td>
            <span class="title is-size-6">{{type.name}}</span> <br/>
            <span class="tag is-size-xs fade"><b>#</b>{{type._id}}</span>
          </td>
          <td>{{moneyFormat(type.extraPrice)}}</td>
          <td>
            <b-button class="is-danger" @click="deleteType(type._id)">
              <font-awesome-icon :icon="['fa', 'trash']"/>
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
import api from '../../service/api'
import {mapState} from 'vuex'

export default {
  name: 'Type',
  data () {
    return {
      allTypes: null
    }
  },
  computed: mapState(['types']),
  watch: {
    types (newVal, oldVal) {
      this.allTypes = newVal
    }
  },
  mounted () {
    this.loadTypes()
  },
  methods: {
    async loadTypes () {
      await api.type.getAllTypes().then(res => {
        this.$store.dispatch('fillTypes', res.data)
      }).catch(err => {
        this.$buefy.toast.open({
          duration: 5000,
          message: err,
          position: 'is-top',
          type: 'is-danger'
        })
      })
    },
    deleteType (id) {
      this.$buefy.dialog.confirm({
        title: 'Delete Shoe-type',
        message: 'Are you sure you want to <b>delete</b> this Shoe-type? This action cannot be undone.',
        confirmText: 'Delete this Shoe-type',
        type: 'is-danger',
        hasIcon: true,
        icon: 'info-circle',
        iconPack: 'fas',
        size: 'is-small',
        onConfirm: async () => {
          await api.type.deleteType(id).then(res => {
            this.loadTypes()
            this.$buefy.toast.open({
              duration: 5000,
              message: `Type deleted!`,
              position: 'is-top',
              type: 'is-danger'
            })
          }).catch(err => {
            this.$buefy.toast.open({
              duration: 5000,
              message: err,
              position: 'is-top',
              type: 'is-danger'
            })
          })
        }
      })
    },
    moneyFormat (number) {
      return new Intl.NumberFormat('en-IDR', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
      }).format(number);
    }
  }
}
</script>
<style scoped>
.is-size-xs {
  font-size: .7rem;
}
td {
  vertical-align: middle !important;
}
.loading {
  width: 100%;
  min-height: 75vh;
  line-height: 75vh;
  font-size: 1.4rem;
  font-weight: bolder;
  color: #aaa;
  text-align: center;
}
</style>
