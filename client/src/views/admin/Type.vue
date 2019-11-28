<template>
  <section>
    <div class="loading"
         v-if="allTypes == null">
      Loading...
    </div>

    <div class="table-container"
         v-if="allTypes != null">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Extra Price (Rp.)</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        <tr v-for="type in allTypes" :key="type.id">
          <td>
            <span class="title is-size-6">{{type.name}}</span> <br/>
            <span class="subtitle is-size-xs fade">{{type._id}}</span>
          </td>
          <td>Rp. {{moneyFormat(type.extraPrice)}}</td>
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
          console.log(err.message)
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
              console.log(res);
              this.loadTypes();
            }).catch(err => {
              console.log(err.message);
            })
          }
        })
      },
      moneyFormat (number) {
        return (number)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
    font-size: 1rem;
    font-weight: bolder;
    color: #aaa;
    text-align: center;
  }
</style>
