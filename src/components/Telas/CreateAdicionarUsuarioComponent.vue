<template>
  <div>
    <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
    <load-component :Ativo="loader"/>
    <dialog-persistent-component
        tamanho="850"
        titulo="Alunos"
        @close="close"
        :dialog="localDialog"
    >
        <template v-slot:text>
            <v-expansion-panels>
                <v-expansion-panel
                >
                <v-expansion-panel-header>Cadastrar Aluno</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form
                        ref="form"
                        lazy-validation
                    >
                        <v-select
                            v-model="Usuarios"
                            :items="ListUsuarios"
                            label="Alunos"
                            prepend-icon="mdi-account-multiple-plus"
                            multiple
                            chips
                        ></v-select>
                        <v-select
                            v-model="Treinos"
                            :items="ListTreinos"
                            label="Treinos"
                            prepend-icon="mdi-account-multiple-plus"
                            multiple
                            chips
                        ></v-select>
                        <v-select
                            v-model="PlanosAlimentares"
                            :items="ListPlanosAlimentares"
                            label="Planos Alimentares"
                            prepend-icon="mdi-account-multiple-plus"
                            multiple
                            chips
                        ></v-select>
                        <v-row class="my-1 mr-1">
                            <v-spacer/>
                            <v-btn
                                outlined
                                large
                                color="green"
                                @click="Salvar()"
                                >
                                <v-icon left>
                                    mdi-check
                                </v-icon>
                                Salvar
                            </v-btn>
                        </v-row>
                    </v-form>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            
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
            </v-data-table>
        </template>
        <template v-slot:actions>
        </template>
    </dialog-persistent-component>
  </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import DialogPersistentComponent from '../Fields/DialogPersistentComponent.vue'

export default {
    components: { AlertComponent, LoadComponent, DialogPersistentComponent },
    name: 'CreateAdicionarUsuarioComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,
        UsuarioId: null,
        headers: [
            { text: '', value: 'Id', align: ' d-none'},
            { text: 'Nome', value: 'Descricao'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
        ],

        ListUsuarios: [],
        ListTreinos: [],
        ListPlanosAlimentares: [],

        Usuarios: [],
        Treinos: [],
        PlanosAlimentares: []

    }),

    methods: {
        close() {
            this.localDialog = !this.localDialog
        },

        retornoUsuario(retorno) {
            this.UsuarioId = retorno?.id
        },

        BuscarUsuarios() {
            this.loader = !this.loader;
            
            this.RequestGet('Usuario/GetByEmpresaId/'+2, 
            (retorno) => {
                this.ListUsuarios = []
                retorno.data.forEach(element => {
                    this.ListUsuarios.push(
                        element.id + ' - ' + element.nome
                    )
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        BuscarTreinos() {
            this.loader = !this.loader;
            
            this.RequestGet('Treino/EmpresaId/'+2, 
            (retorno) => {
                this.ListTreinos = []
                retorno.data.forEach(element => {
                    this.ListTreinos.push(
                        element.id + ' - ' + element.descricao
                    )
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        BuscarPlanosAlimentares() {
            this.loader = !this.loader;
            
            this.RequestGet('PlanoAlimentar/EmpresaId/'+2, 
            (retorno) => {
                this.ListPlanosAlimentares = []
                retorno.data.forEach(element => {
                    this.ListPlanosAlimentares.push(
                        element.id + ' - ' + element.descricao
                    )
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Salvar() {
            this.loader = !this.loader;
            
            debugger

            var teste = []

            this.Usuarios.forEach(element => {
                
            });

            var teste1 = this.Usuarios
            var teste2 = this.Treinos
            var t3 = this.PlanosAlimentares
        

            // this.RequestPost('Projeto/ProjetoAluno',
            // {
            //     ativo: this.Ativo,
            //     nome: this.Descricao,
            //     planoAlimentar: this.PlanoAlimentar,
            //     treino: this.Treino,
            //     foto: this.Fotos,
            //     avaliacao: this.Avaliacao,
            //     exame: this.Exames,
            //     anamnese: this.Anamnese,
            //     observacoes: this.Observacao,
            //     empresaId: 2
            // },
            // (retorno) => {
            //     this.localDialog = !this.localDialog
            //     this.EnableAlert("Projeto salvo com sucesso.", "success")
            //     this.$emit("ProjetoSalvo", true)
            // }, 
            // (error) => this.RetornoErro(error),
            // () => (this.loader = !this.loader))
        }
    },

    watch: {
        dialog() {
            debugger
            this.localDialog = true
        }
    },

    created() {
        debugger

        this.BuscarUsuarios()
        this.BuscarTreinos()
        this.BuscarPlanosAlimentares()
    },

    props: {
        dialog: Boolean,
    }
}
</script>

<style>

</style>