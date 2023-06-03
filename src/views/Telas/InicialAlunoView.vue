<template>
    <v-app>
        <v-main>
            <inicial-aluno-component/>
        </v-main>
    </v-app>
</template>

<script>
import InicialAlunoComponent from '@/components/TelasAluno/InicialAlunoComponent.vue'
export default {
  components: { InicialAlunoComponent },
    name: 'InicialAlunoView'
}
</script>

<style scoped>
    .v-main {
        padding: 15px 15px !important;
    }
</style>