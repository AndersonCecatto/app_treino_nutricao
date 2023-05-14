<template>
  <div>
    <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
    <load-component :Ativo="loader"/>
    <card-padrao-component>
        <template v-slot:titulo>
            <div>
                <v-icon class="mx-3">
                    mdi-dumbbell
                </v-icon>
                Treinos
            </div>
            <v-spacer/>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Pesquisar"
                single-line
                hide-details
            />
            <v-spacer></v-spacer>
            <v-btn
                class="mr-3"
                outlined
                large
                right
                color="primary"
                @click="CriarTreino()"
                >
                Novo
            </v-btn>
        </template>
        <template v-slot:texto>
            <v-data-table
                :headers="headers"
                :items="treinos"
                :search="search"
                :footer-props="{
                    'items-per-page-text':'Linhas por pagina',
                    'items-per-page-options': [5, 10, 20, 50]
                }"
                :header-props="{
                    'sortByText': 'Ordenar'
                }"
                :sort-desc.sync="sortDesc"
                :sort-by.sync="sortBy"
            >
                <template v-slot:item.Descricao="{ item }">
                    <td class="font-weight-black">{{ item.Descricao }}</td>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        color="primary"
                        class="mr-3"
                        large
                        @click="EditarTreino(item)"
                    >
                        mdi-text-box-edit
                    </v-icon>
                </template>
            </v-data-table>
        </template>
    </card-padrao-component>
    <create-treino-component
        :dialog="dialog"
        :dados="dados"
        @TreinoSalvo="TreinoSalvo"
        :flagAutoComplete="flagAutoComplete"
    />
  </div>
</template>

<script>

import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import LoadComponent from '../Fields/LoadComponent.vue'
import CreateTreinoComponent from './CreateTreinoComponent.vue'

export default {
    components: { AlertComponent, CardPadraoComponent, LoadComponent, CreateTreinoComponent },
    name: 'ListTreinoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        headers: [
            { text: '', value: 'Id', align: ' d-none'},
            { text: '', value: 'Usuario', align: ' d-none'},
            { text: 'Descrição', value: 'Descricao'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
        ],
        treinos: []
    }),

    methods: {
        BuscarTreinos() {
            this.loader = !this.loader;
            
            this.RequestGet('Treino/EmpresaId/'+2,
            (retorno) => {
                this.treinos = []
                retorno.data.forEach(element => {
                    this.treinos.push({
                        Id: element.id,
                        Descricao: element.descricao,
                        Usuario: element.usuario,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        CriarTreino() {
            this.dados = null
            this.flagAutoComplete = !this.flagAutoComplete
            this.dialog = !this.dialog
        },

        EditarTreino(item) {
            this.dados = item
            this.dialog = !this.dialog
        },

        TreinoSalvo(retorno) {
            if (retorno == true)
                this.BuscarTreinos(1)
        }
    },

    created() {
        this.BuscarTreinos();
    }
}
</script>

<style>

</style>