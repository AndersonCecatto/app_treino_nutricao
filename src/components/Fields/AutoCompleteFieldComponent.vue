<template>
  <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        item-text="Description"
        item-value="id"
        :label="this.Label"
        :prepend-icon="this.Icon"
        return-object
        auto-select-first
    ></v-autocomplete>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import RequestMethods from '@/mixins/RequestMethods'
export default {
    name: 'AutoCompleteFieldComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        entries: [],
        isLoading: false,
        model: null,
        search: null,
    }),

    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.id + ' - ' + entry.nome
          return Object.assign({}, entry, { Description })
        })
      },
    },

    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true
         
        this.RequestGet(this.Url,
        (retorno) => {
          this.entries = retorno.data
        },
        (error) => this.RetornoErro(error),
        () => (this.isLoading = false))
      },

      model (val) {
        this.$emit('retorno', val)
        
        if (this.model == null && this.receberDados != null)
          this.entries = []
      },

      receberDados(val) {
        this.entries = []
        this.model = null
        if (val != null) {
            this.entries = [val]
            this.model = val
        }
      },
        
      flagAutoComplete(val) {
        this.entries = []
        this.model = null
        if (this.receberDados != null) {
            this.entries = [this.receberDados]
            this.model = this.receberDados
        }
      }
    },

    created() {
        if (this.receberDados != null) {
          this.entries = [this.receberDados]
          this.model = this.receberDados
        }
    },

    props: {
        Url: String,
        Label: String,
        Icon: String,
        receberDados: Object,
        flagAutoComplete: Boolean
    }
}
</script>

<style>
    
</style>