<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <card-padrao-component>
            <template v-slot:titulo>
            <div>
                <v-icon class="mx-3">
                    mdi-silverware-fork-knife
                </v-icon>
                Planos Alimentares
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
                @click="CriarPlanoAlimentar()"
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
                :items="planosAlimentares"
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
                <template v-slot:item.ListAlimentos="{ item }">
                    <td class="font-weight-black">{{ item.ListAlimentos }}</td>
                </template>
                <template v-slot:item.Ativo="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        color="primary"
                        class="mr-3"
                        large
                        @click="EditarPlanoALimentar(item)"
                    >
                        mdi-text-box-edit
                    </v-icon>
                </template>
            </v-data-table>
        </template>
        </card-padrao-component>
        <create-plano-alimentar-component
            :dialog="dialog"
            :dados="dados"
            @PlanoAlimentarSalvo="PlanoAlimentarSalvo"
            :flagAutoComplete="flagAutoComplete"
        />
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import CreatePlanoAlimentarComponent from './CreatePlanoAlimentarComponent.vue'
export default {
  components: { AlertComponent, LoadComponent, CardPadraoComponent, CreatePlanoAlimentarComponent },
    name: 'ListPlanoAlimentarComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        headers: [
            { text: '', value: 'Usuario', align: ' d-none'},
            { text: '', value: 'Alimentos', align: ' d-none'},
            { text: 'Código', value: 'Id', align: 'center',  width: '10%'},
            { text: 'Descrição', value: 'Descricao'},
            { text: 'Alimentos', value: 'ListAlimentos'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
        ],
        planosAlimentares: [],
        todosPlanoAlimentares: []
    }),

    methods: {
        LocalFiltroStatus(item) {
            this.planosAlimentares = this.FiltrarStatus(item, this.todosPlanoAlimentares)
        },

        BuscarPlanosAlimentares() {
            this.loader = !this.loader;
            
            this.RequestGet('PlanoAlimentar/EmpresaId/'+2,
            (retorno) => {
                this.planosAlimentares = []
                retorno.data.forEach(element => {
                    var listAlimentos = element.alimentos != null ? 
                                element.alimentos.split(';').length > 1 ? 
                                element.alimentos.split(';').length + ' Selecionados': 
                                element.alimentos : null

                    this.planosAlimentares.push({
                        Id: element.id,
                        Descricao: element.descricao,
                        Observacoes: element.observacoes,
                        Alimentos: element.alimentos,
                        ListAlimentos: listAlimentos,
                        Usuario: element.usuario,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })

                    this.todosPlanoAlimentares = this.planosAlimentares
                    this.Status = 'Todos'
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        CriarPlanoAlimentar() {
            this.dados = null
            this.flagAutoComplete = !this.flagAutoComplete
            this.dialog = !this.dialog
        },

        EditarPlanoALimentar(item) {
            this.dados = item
            this.dialog = !this.dialog
        },

        PlanoAlimentarSalvo(retorno) {
            if (retorno == true)
                this.BuscarPlanosAlimentares()
        }
    },

    created() {
        this.BuscarPlanosAlimentares();
    },
}
</script>

<style>

</style>