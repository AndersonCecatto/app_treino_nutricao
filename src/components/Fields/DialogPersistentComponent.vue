<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        :max-width="tamanho"
    >
        <v-card>
            <v-card-title> {{ titulo }}
                <v-spacer/>
                <v-icon
                    @click="close()"
                >
                    mdi-close
                </v-icon>
            </v-card-title>
            <v-card-text>
                <slot name="text"></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    name: 'DialogPersistentComponent',

    methods: {
        close() {
            this.$emit('close', false);
        }
    },

    props: {
        dialog: Boolean,
        tamanho: String,
        titulo: String,
    }
}
</script>

<style>

</style>