<template>
  <div>
    <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
    <load-component :Ativo="loader"/>
    <dialog-persistent-component
        tamanho="850"
        titulo="Alunos Adicionados"
        @close="close"
        :dialog="localDialog"
    >
        <template v-slot:text>
            <v-expansion-panels>
                <v-expansion-panel
                >
                <v-expansion-panel-header>Adicionar Aluno</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form
                        ref="form"
                        lazy-validation
                    >
                        <auto-complete-field-component
                            Label="Aluno" 
                            Icon="mdi-account-circle"
                            Url="Usuario/GetByEmpresaId/2/TipoBusca/2"
                            @retorno="retornoUsuario"
                            :receberDados="null"
                            :flagAutoComplete="true"
                        />
                        <v-row class="my-1 pr-3">
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
                :items="alunos"
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
                <template v-slot:item.Ativo="{ item }">
                    <v-chip
                        :color="item.Ativo == 'Sim' ? 'green' : 'red'"
                        dark
                    >
                        {{ item.Ativo }}
                    </v-chip>
                    <!-- <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td> -->
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        color="error"
                        class="mr-3"
                        large
                        @click="Deletar(item)"
                    >
                        mdi-delete-circle
                    </v-icon>
                </template>
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
import AutoCompleteFieldComponent from '../Fields/AutoCompleteFieldComponent.vue'

export default {
    components: { AlertComponent, LoadComponent, DialogPersistentComponent, AutoCompleteFieldComponent },
    name: 'CreateAdicionarUsuarioComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,
        UsuarioId: null,
        headers: [
            { text: '', value: 'Id', align: ' d-none'},
            { text: 'Código', value: 'IdAluno', width: '100px'},
            { text: 'Nome', value: 'Nome', width: '65%'},
            { text: 'Ativo', value: 'Ativo' },
            { text: 'Ações', value: 'actions', align: 'center', sortable: false },
        ],
        alunos: []
    }),

    methods: {
        close() {
            this.localDialog = !this.localDialog
        },

        retornoUsuario(retorno) {
            this.UsuarioId = retorno?.id
        },

        VerificarUsuarioLista() {

            if(this.UsuarioId == null) {
                this.EnableAlert("Selecione um usuario.", "warning")
                return true
            }
            else if(this.alunos.some((x) => x.IdAluno == this.UsuarioId)) {
                this.EnableAlert("Aluno já adicionado na lista.", "warning")
                return true
            }
        },

        Salvar() {
            if (this.VerificarUsuarioLista())
                return

            this.loader = !this.loader;
            
            this.RequestPost('ProjetoAluno',
            {
                usuarioId: this.UsuarioId,
                projetoId: this.dados.Id
            },
            (retorno) => {
                this.EnableAlert("Aluno salvo com sucesso.", "success")
            }, 
            (error) => this.RetornoErro(error),
            () => {
                this.loader = !this.loader
                this.BuscarProjetos()
            })
        },

        Deletar(item) {
            this.loader = !this.loader;
            
            this.RequestDelete('ProjetoAluno/'+item.Id,
            (retorno) => {
                this.EnableAlert("Aluno excluido com sucesso.", "success")
            }, 
            (error) => this.RetornoErro(error),
            () => {
                this.loader = !this.loader
                this.BuscarProjetos()
            })
        },

        BuscarProjetos() {
            this.loader = !this.loader;
            
            this.RequestGet('ProjetoAluno/'+this.dados.Id,
            (retorno) => {
                this.alunos = []
                retorno.data.forEach(element => {
                    this.alunos.push({
                        Id: element.id,
                        IdAluno: element.usuarioId,
                        Nome: element.usuario.nome,
                        Ativo: this.RetornaSimNao(element.usuario.ativo)
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },
    },

    watch: {
        dialog() {
            this.localDialog = true

            if(this.dados != null)
                this.BuscarProjetos()
        }
    },

    props: {
        dialog: Boolean,
        dados: Object
    }
}
</script>

<style>

</style>