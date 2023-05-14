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
                <template v-slot:item.PlanoAlimentar="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.PlanoAlimentar)" >{{ item.PlanoAlimentar }}</td>
                </template>
                <template v-slot:item.Treino="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Treino)" >{{ item.Treino }}</td>
                </template>
                <template v-slot:item.Fotos="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Fotos)" >{{ item.Fotos }}</td>
                </template>
                <template v-slot:item.Avaliacao="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Avaliacao)" >{{ item.Avaliacao }}</td>
                </template>
                <template v-slot:item.Exames="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Exames)" >{{ item.Exames }}</td>
                </template>
                <template v-slot:item.Anamnese="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Anamnese)" >{{ item.Anamnese }}</td>
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
            { text: '', value: 'Id', align: ' d-none'},
            { text: '', value: 'EmpresaId', align: ' d-none'},
            { text: '', value: 'Observacoes', align: ' d-none'},
            { text: 'Descrição', value: 'Descricao'},
            { text: 'Plano Alimentar', value: 'PlanoAlimentar'},
            { text: 'Treino', value: 'Treino'},
            { text: 'Fotos', value: 'Fotos'},
            { text: 'Avaliação', value: 'Avaliacao'},
            { text: 'Exames', value: 'Exames'},
            { text: 'Anamnese', value: 'Anamnese'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
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
                    this.projetos.push({
                        Id: element.id,
                        Descricao: element.nome,
                        Observacoes: element.observacoes,
                        EmpresaId: element.empresaId,
                        PlanoAlimentar: this.RetornaSimNao(element.planoAlimentar),
                        Treino: this.RetornaSimNao(element.treino),
                        Fotos: this.RetornaSimNao(element.foto),
                        Avaliacao: this.RetornaSimNao(element.avaliacao),
                        Exames: this.RetornaSimNao(element.exame),
                        Anamnese: this.RetornaSimNao(element.anamnese),
                        Ativo: this.RetornaSimNao(element.ativo)
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        CriarProjeto() {
            this.dados = null
            this.dialog = !this.dialog
        },

        EditarProjeto(item) {
            this.dados = item
            this.dialog = !this.dialog
        },

        AdicionarAlunos(item) {
            debugger
            this.dialogAdicionarAluno = !this.dialogAdicionarAluno
        },

        MudarCor(item) {
            return item == "Sim" ? 'color: green;' : 'color: red;'
        },

        ProjetoSalvo(retorno) {
            if (retorno == true)
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