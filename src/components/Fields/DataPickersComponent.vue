<template>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="dateFormatted"
      persistent
      width="290px"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="dateFormatted"
            :label="titulo"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="date"
          scrollable
          locale="pt-br"
      >
          <v-spacer></v-spacer>
          <v-btn
          text
          color="primary"
          @click="modal = false"
          >
          Cancelar
          </v-btn>
          <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(dateFormatted); SalvarData(dateFormatted)"
          >
          Ok
          </v-btn>
      </v-date-picker>
      </v-dialog>
  </template>
  
  <script>
import GenericMethods from '@/mixins/GenericMethods'
  export default {
      name: 'DataPIckersComponente',
      mixins: [GenericMethods],
      data: (vm) => ({
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
        dateFormatted: vm.FormatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)),
        modal: false
      }),

      methods: {
        SalvarData(dateFormatted) {
            this.$emit('DataRetorno', this.dateFormatted)
        }
    },

    watch: {
        date (val) {
            
            this.dateFormatted = this.FormatDate(this.date)
        },

        dataRecebimento(val) {
            if (val == null)
                return this.dateFormatted = this.FormatDate(this.date)

            this.dateFormatted = this.FormatDate(val)
        },
    },

    props: {
        titulo: String,
        dataRecebimento: String
    }
  }
  </script>
  
  <style>
  
  </style>