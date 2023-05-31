<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <card-padrao-component>
            <template v-slot:titulo>
                <div>
                    <v-icon class="mx-3">
                        mdi-account-check
                    </v-icon>
                    Avaliações
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
                    @click="CriarAvaliacao()"
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
                    :items="avaliacoes"
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
                    <template v-slot:item.Ativo="{ item }">
                        <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            color="error"
                            class="mr-3"
                            large
                            @click="DeletarAvaliacao(item)"
                        >
                            mdi-delete-circle
                        </v-icon>
                        <v-icon
                            color="primary"
                            class="mr-3"
                            large
                            @click="EditarAvaliacao(item)"
                        >
                            mdi-text-box-edit
                        </v-icon>
                    </template>
                </v-data-table>
            </template>
        </card-padrao-component>
        <create-avaliacao-component
            :dialog="dialog"
            :dados="dados"
            @AvaliacaoSalva="AvaliacaoSalva"
            :recebe-empresa-id="EmpresaId"
            :recebe-usuario-id="UsuarioId"
        />
        <dialog-sim-nao-component
            :dialog="dialogSimNao"
            titulo="Atenção"
            texto="Deseja excluir a avaliação?"
            @Ok="RetornoSimNao"
            :dados="dadosSimNao"
        />
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import DataPickersComponent from '../Fields/DataPickersComponent.vue'
import CreateAvaliacaoComponent from './CreateAvaliacaoComponent.vue'
import DialogSimNaoComponent from '../Fields/DialogSimNaoComponent.vue'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent, DataPickersComponent, CreateAvaliacaoComponent, DialogSimNaoComponent },
    name: 'ListAvaliacaoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        headers: [
            { text: 'Código', value: 'Id', width: '10%', align: 'center'},
            { text: 'Descrição', value: 'Descricao', width: '72%'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
            { text: '', value: 'Observacoes', align: ' d-none'},
        ],
        avaliacoes: [],
        todasAvaliacoes: [],
        dadosSimNao: null
    }),

    methods: {
        LocalFiltroStatus(item) {
            this.avaliacoes = this.FiltrarStatus(item, this.todasAvaliacoes)
        },

        RetornoSimNao(retorno) {
            this.Deletar(retorno)
        },

        BuscarAvaliacaoUsuario(usuarioId) {
            this.loader = !this.loader;
            
            this.RequestGet('Avaliacao/UsuarioId/'+usuarioId+'/TipoBusca/1',
            (retorno) => {
                this.avaliacoes = []
                retorno.data.forEach(element => {
                    this.avaliacoes.push({
                        Id: element.id,
                        Descricao: element.descricao,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })

                    this.todasAvaliacoes = this.avaliacoes
                    this.Status = 'Todos'
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        DeletarAvaliacao(item) {
            this.dialogSimNao = !this.dialogSimNao
            this.dadosSimNao = item
        },

        Deletar(item) {
            this.loader = !this.loader;
            
            this.RequestDelete('Avaliacao?avaliacaoId='+item.Id,
            (retorno) => {
                this.EnableAlert("Avaliação excluida com sucesso.", "success")
            }, 
            (error) => this.RetornoErro(error),
            () => {
                this.loader = !this.loader
                this.BuscarAvaliacaoUsuario(this.UsuarioId)
            })
        },

        CriarAvaliacao() {
            this.dados = null
            this.dialog = !this.dialog
        },

        EditarAvaliacao(item) {
            this.dados = item.Id
            this.dialog = !this.dialog
        },

        AvaliacaoSalva(retorno) {
            if (retorno == true)
                this.BuscarAvaliacaoUsuario(this.UsuarioId)
        },
    },

    created() {
        if (this.UsuarioId != null)
            this.BuscarAvaliacaoUsuario(this.UsuarioId)
    },

    props: {
        UsuarioId: Number,
        EmpresaId: Number
    }

}
</script>

<style>

</style>