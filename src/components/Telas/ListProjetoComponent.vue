<template>
  <div>
    <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
    <load-component :Ativo="loader"/>
    <card-padrao-component>
        <template v-slot:titulo>
            <div>
                <v-icon class="mx-3">
                    mdi-weight-lifter
                </v-icon>
                Projeto
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
                @click="CriarProjeto()"
                >
                Novo
            </v-btn>
        </template>
        <template v-slot:texto>
            <v-data-table
                :headers="headers"
                :items="projetos"
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
                <template v-slot:item.PlanosAlimentaresListar="{ item }">
                    <td class="font-weight-black">{{ item.PlanosAlimentaresListar }}</td>
                </template>
                <template v-slot:item.TreinosListar="{ item }">
                    <td class="font-weight-black">{{ item.TreinosListar }}</td>
                </template>
                <template v-slot:item.Ativo="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        color="green"
                        class="mr-3"
                        large
                        @click="AdicionarAlunos(item)"
                    >
                        mdi-account-multiple-plus
                    </v-icon>
                    <v-icon
                        color="primary"
                        class="mr-3"
                        large
                        @click="EditarProjeto(item)"
                    >
                        mdi-text-box-edit
                    </v-icon>
                </template>
            </v-data-table>
        </template>
    </card-padrao-component>
    <create-projeto-component
        :dialog="dialog"
        :dados="dados"
        @ProjetoSalvo="ProjetoSalvo"
        :flagAutoComplete="flagAutoComplete"
    />
    <create-adicionar-usuario-component
        :dialog="dialogAdicionarAluno"
        :dados="dados"
    />
  </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import CreateProjetoComponent from './CreateProjetoComponent.vue'
import CreateAdicionarUsuarioComponent from './CreateAdicionarUsuarioComponent.vue'

export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent, CreateProjetoComponent, CreateAdicionarUsuarioComponent },
    name: 'ListProjetoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        dialogAdicionarAluno: false,
        headers: [
            { text: 'Descrição', value: 'Descricao'},
            { text: 'Planos Alimentares', value: 'PlanosAlimentares', align: ' d-none'},
            { text: 'Planos Alimentares', value: 'PlanosAlimentaresListar'},
            { text: 'Treinos', value: 'TreinosListar'},
            { text: 'Treinos', value: 'Treinos', align: ' d-none'},
            { text: 'Exames', value: 'ExamesListar'},
            { text: 'Ativo', value: 'Ativo' },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
            { text: '', value: 'Id', align: ' d-none'},
            { text: '', value: 'EmpresaId', align: ' d-none'},
            { text: '', value: 'Observacoes', align: ' d-none'},
            { text: '', value: 'Exames', align: ' d-none'},
        ],
        projetos: []
    }),

    methods: {
        BuscarProjetos() {
            this.loader = !this.loader;
            
            this.RequestGet('Projeto/'+2,
            (retorno) => {
                this.projetos = []
                retorno.data.forEach(element => {
                    debugger
                    var treinosListar = element.treinos != null ? 
                                        element.treinos.split(';').length > 1 ? 
                                        element.treinos.split(';').length + ' Selecionados': 
                                        element.treinos : null

                    var planoALimentarListar = element.planosAlimentares != null ? 
                                               element.planosAlimentares.split(';').length > 1 ? 
                                               element.planosAlimentares.split(';').length + ' Selecionados': 
                                               element.planosAlimentares : null

                    var examesListar = element.exames != null ? 
                                element.exames.split(';').length > 1 ? 
                                element.exames.split(';').length + ' Selecionados': 
                                element.exames : null

                    this.projetos.push({
                        Id: element.id,
                        Descricao: element.nome,
                        Observacoes: element.observacoes,
                        EmpresaId: element.empresaId,
                        PlanosAlimentares: element.planosAlimentares,
                        Treinos: element.treinos,
                        Exames: element.exames,
                        PlanosAlimentaresListar: planoALimentarListar,
                        TreinosListar: treinosListar,
                        ExamesListar: examesListar,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        CriarProjeto() {
            this.dados = null
            this.flagAutoComplete = !this.flagAutoComplete
            this.dialog = !this.dialog
        },

        EditarProjeto(item) {
            this.dados = item
            this.dialog = !this.dialog
        },

        AdicionarAlunos(item) {
            this.dados = item
            this.dialogAdicionarAluno = !this.dialogAdicionarAluno
        },

        MudarCor(item) {
            return item == "Sim" ? 'color: green;' : 'color: red;'
        },

        ProjetoSalvo() {
            debugger
            this.BuscarProjetos()
        }
    },

    created() {
        this.BuscarProjetos()
    }
}
</script>

<style>

</style>