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
            <!-- Inicio Filtros -->
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <b>Filtros</b>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-select
                                    v-model="Status"
                                    :items="listStatus"
                                    label="Status"
                                    @change="LocalFiltroStatus"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <!-- Fim Filtros -->
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
                <template v-slot:item.ListGrupoMuscular="{ item }">
                    <td class="font-weight-black">{{ item.ListGrupoMuscular }}</td>
                </template>
                <template v-slot:item.ListExercicios="{ item }">
                    <td class="font-weight-black">{{ item.ListExercicios }}</td>
                </template>
                <template v-slot:item.Ativo="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td>
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
            { text: '', value: 'GrupoMuscular', align: ' d-none'},
            { text: '', value: 'Exercicios', align: ' d-none'},
            { text: '', value: 'Observacoes', align: ' d-none'},
            { text: 'Descrição', value: 'Descricao'},
            { text: 'Grupo Muscular', value: 'ListGrupoMuscular'},
            { text: 'Exercicios', value: 'ListExercicios'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
        ],
        treinos: [],
        todosTreinos: []
    }),

    methods: {
        LocalFiltroStatus(item) {
            this.treinos = this.FiltrarStatus(item, this.todosTreinos)
        },

        BuscarTreinos() {
            this.loader = !this.loader;
            
            this.RequestGet('Treino/EmpresaId/'+2,
            (retorno) => {
                this.treinos = []
                retorno.data.forEach(element => {
                    var listGrupoMuscular = element.grupoMuscular != null ? 
                                            element.grupoMuscular.split(';').length > 1 ? 
                                            element.grupoMuscular.split(';').length + ' Selecionados': 
                                            element.grupoMuscular : null

                    var listExercicios = element.exercicios != null ? 
                                        element.exercicios.split(';').length > 1 ? 
                                        element.exercicios.split(';').length + ' Selecionados': 
                                        element.exercicios : null


                    this.treinos.push({
                        Id: element.id,
                        Descricao: element.descricao,
                        GrupoMuscular: listGrupoMuscular,
                        ListGrupoMuscular: listGrupoMuscular,
                        GrupoMuscular: element.grupoMuscular,
                        ListExercicios: listExercicios,
                        Exercicios: element.exercicios,
                        Observacoes: element.observacoes,
                        Usuario: element.usuario,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })

                    this.todosTreinos = this.treinos
                    this.Status = 'Todos'
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
                this.BuscarTreinos()
        },
    },

    created() {
        this.BuscarTreinos();
    }
}
</script>

<style>

</style>