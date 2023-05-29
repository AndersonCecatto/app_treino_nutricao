<template>
    <dialog-persistent-component
        tamanho="500"
        :titulo="titulo"
        @close="close"
        :dialog="localDialog"
        class="v-card-title-color"
    >
        <template v-slot:text>
            <v-container fill-height fluid>
                <v-row align="center"
                    justify="center">
                    <h2>{{ texto }}</h2>
                </v-row>
            </v-container>
        </template>
        <template v-slot:actions>
            <v-spacer/>
              <v-btn
                  outlined
                  large
                  color="green"
                  class="mr-2 mb-2"
                  @click="Ok()"
                  >
                  <v-icon left>
                      mdi-check
                  </v-icon>
                  Ok
              </v-btn>
        </template>
    </dialog-persistent-component>
</template>

<script>
import DialogPersistentComponent from "./DialogPersistentComponent.vue"

export default {
    components: { DialogPersistentComponent },
    name: 'DialogSimNaoComponent',
    data: () => ({
        localDialog: false
    }),

    methods: {
        close() {
            this.localDialog = !this.localDialog
        },

        Ok() {
            this.localDialog = !this.localDialog
            this.$emit('Ok', this.dados)
        }
    },

    watch: {
        dialog() {
            this.localDialog = true
        }
    },

    props: {
        dialog: Boolean,
        titulo: String,
        texto: String,
        dados: Object
    }
}
</script>

<style>

</style>