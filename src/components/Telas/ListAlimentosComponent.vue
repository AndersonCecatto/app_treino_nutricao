<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <card-padrao-component>
            <template v-slot:titulo>
                <div>
                    <v-icon class="mx-3">
                        mdi-food-apple
                    </v-icon>
                    Alimentos
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
                    @click="CriarAlimentos()"
                    >
                    Novo
                </v-btn>
            </template>
        <template v-slot:texto>
            <v-data-table
                :headers="headers"
                :items="alimentos"
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
                <template v-slot:item.Quantidade="{ item }">
                    <td class="font-weight-black">{{ item.Quantidade }}</td>
                </template>
                <template v-slot:item.Medida="{ item }">
                    <td class="font-weight-black">{{ item.Medida }}</td>
                </template>
                <template v-slot:item.Ativo="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        color="primary"
                        class="mr-3"
                        large
                        @click="EditarAlimento(item)"
                    >
                        mdi-text-box-edit
                    </v-icon>
                </template>
            </v-data-table>
        </template>
        </card-padrao-component>
        <create-alimento-component
            :dialog="dialog"
            :dados="dados"
            @AlimentoSalvo="AlimentoSalvo"
        />
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import CreateAlimentoComponent from './CreateAlimentoComponent.vue'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent, CreateAlimentoComponent },
    name: 'ListAlimentosComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        headers: [
            { text: '', value: 'Id', align: ' d-none'},
            { text: '', value: 'EmpresaId', align: ' d-none'},
            { text: 'Nome', value: 'Nome'},
            { text: 'Quantidade', value: 'Quantidade'},
            { text: 'Medida', value: 'Medida'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
            { text: '', value: 'Observacoes', align: ' d-none'},
        ],
        alimentos: []
    }),

    methods: {
        BuscarAlimentos() {
            this.loader = !this.loader;
            
            this.RequestGet('Alimento/EmpresaId/'+2+'/TipoBusca/1',
            (retorno) => {
                this.alimentos = []
                retorno.data.forEach(element => {
                    this.alimentos.push({
                        Id: element.id,
                        Nome: element.nome,
                        Quantidade: element.quantidade,
                        Medida: this.ConverterMedidas(element.medida),
                        Observacoes: element.observacoes,
                        EmpresaId: element.empresaId,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        CriarAlimentos() {
            this.dados = null
            this.dialog = !this.dialog
        },

        EditarAlimento(item) {
            this.dados = item
            this.dialog = !this.dialog
        },

        AlimentoSalvo(retorno) {
            if (retorno == true)
                this.BuscarAlimentos()
        },

        ConverterMedidas(medida) {
            switch (medida) {
                case 1:
                    return 'ML'
                case 2:
                    return 'MG'
                case 3:
                    return 'G'
                case 4:
                    return 'KG'
                case 5:
                    return 'Unidade'
                case 6:
                    return 'Litro'
            }
        }
    },

    created() {
        this.BuscarAlimentos()
    }
}
</script>

<style>

</style>