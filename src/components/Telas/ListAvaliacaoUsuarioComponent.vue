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
                    Usuarios Avaliações
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
            </template>
            <template v-slot:texto>
                <v-data-table
                    :headers="headers"
                    :items="usuariosAvaliacoes"
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
                    <template v-slot:item.Nome="{ item }">
                        <td class="font-weight-black">{{ item.Nome }}</td>
                    </template>
                    <template v-slot:item.Ativo="{ item }">
                        <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            color="success"
                            class="mr-3"
                            large
                            @click="AcessarAvaliacoes(item)"
                        >
                            mdi-arrow-right-bold-box
                        </v-icon>
                    </template>
                </v-data-table>
            </template>
        </card-padrao-component>
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent },
    name: 'ListAvaliacaoUsuarioComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        headers: [
            { text: 'Código', value: 'Id', width: '10%', align: 'center'},
            { text: 'Nome', value: 'Nome', width: '75%'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
        ],
        usuariosAvaliacoes: [],

        EmpresaId: null,
        UsuarioId: null
    }),

    methods: {
        BuscarAvaliacaoUsuario() {
            this.loader = !this.loader;
            
            this.RequestGet('Usuario/GetByEmpresaId/2/TipoBusca/1',
            (retorno) => {
                this.usuariosAvaliacoes = []
                retorno.data.forEach(element => {
                    this.usuariosAvaliacoes.push({
                        Id: element.id,
                        Nome: element.nome,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        AcessarAvaliacoes(item) {
            debugger
            this.$emit('UsuarioId', item.Id)
        }
    },

    created() {
        this.BuscarAvaliacaoUsuario()
    },
}
</script>

<style>

</style>