<template>
    <v-app>
        <v-main>
            <inicial-empresa-component/>
        </v-main>
    </v-app>
</template>

<script>

import InicialEmpresaComponent from '@/components/Telas/InicialEmpresaComponent.vue'

export default {
  components: { InicialEmpresaComponent },
    name: "InicialEmpresaView"
}
</script>

<style scoped>
    .v-main {
        padding: 15px 15px !important;
    }
</style>
    
</style>