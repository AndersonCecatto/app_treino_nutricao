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
                <v-spacer></v-spacer>
                <v-btn
                    v-if="exibeBotaoVoltar"
                    class="mr-3"
                    outlined
                    large
                    right
                    color="primary"
                    @click="Voltar()"
                    >
                    <v-icon left>
                        mdi-arrow-down-left
                    </v-icon>
                    Voltar
                </v-btn>
            </template>
            <template v-slot:texto>
                <v-row>
                    <v-col cols="12" md="6"
                        v-for="item in planosAlimentares"
                        :key="item"
                    >
                        <v-card>
                            <v-card-title>
                                <v-icon class="mx-3">
                                    mdi-arrow-right-bold-box
                                </v-icon>
                                {{ item.Descricao }}
                            </v-card-title>
                            <v-card-text>
                                <v-row  v-if="item.Observacoes != ''" class="ml-1 pt-3">
                                    <v-icon class="mx-3">
                                        mdi-arrow-right-bold
                                    </v-icon>
                                    <b style="color: red">
                                        {{ item.Observacoes }}
                                    </b>
                                </v-row>
                                <v-row class="ml-1"
                                    v-for="alimento in item.ListaAlimentos"
                                    :key="alimento.Id"
                                >
                                    <v-icon class="mx-2">
                                        mdi-asterisk
                                    </v-icon>
                                    <v-col cols="3" md="3">
                                        <b style="color: black;">
                                            {{ alimento.Nome }}
                                        </b>
                                    </v-col>
                                    <v-col cols="3" md="3">
                                        <b style="color: black;">
                                            {{ alimento.Quantidade }} - {{ ConverterMedidas(alimento.Medida) }}
                                        </b>
                                    </v-col>
                                    <v-col cols="3" md="3">
                                        <b style="color: black;">
                                            {{ alimento.Observacoes }}
                                        </b>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </card-padrao-component>
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent },
    name: 'ListPlanoAlimentarAlunoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        planosAlimentares: [],
        listaPlanosAlimentares: [],
        exibeBotaoVoltar: false
    }),

    methods: {
        Voltar() {
            this.$emit('VoltarPlanoAlimentar', true)
        },

        BuscarPlanosAlimentaressAluno() {
            this.loader = !this.loader;
            
            this.RequestPost('PlanoAlimentar/BuscarPorIdsPlanosAlimentares', this.listaPlanosAlimentares,
            (retorno) => {
                this.planosAlimentares = []
                retorno.data.forEach(element => {
                    debugger

                    this.planosAlimentares.push({
                        Id: element.id,
                        Descricao: element.descricao,
                        Alimentos: element.alimentos,
                        Observacoes: element.observacoes,
                        ListaAlimentos: []
                    })

                    var listaAlimentos = []

                    element.alimentos.split(';').forEach(element => {
                        listaAlimentos.push(parseInt(element.substring(0, element.indexOf('-')).trim()))
                    });

                    if (listaAlimentos.length > 0) {
                        this.BuscarAlimentos(listaAlimentos, element.id)
                    } 
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        BuscarAlimentos(listaAlimentos, planoAlimentarId) {
            this.loader = !this.loader;
            
            this.RequestPost('Alimento/BuscarPorIdsAlimentos', listaAlimentos,
            (retorno) => {
                
                var planoAlimentar = this.planosAlimentares.find((x) => x.Id == planoAlimentarId)
                    
                var alimentos = []
                
                retorno.data.forEach(element => {
                    alimentos.push({
                        Id: element.id,
                        Nome: element.nome,
                        Quantidade: element.quantidade,
                        Medida: element.medida,
                        Observacoes: element.observacoes
                    })
                });
                    
                planoAlimentar.ListaAlimentos = alimentos
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
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
        debugger
        if (this.dados?.planosAlimentares != null) {

            this.dados.planosAlimentares.split(';').forEach(element => {
               this.listaPlanosAlimentares.push(parseInt(element.substring(0, element.indexOf('-')).trim()))
            });

            this.BuscarPlanosAlimentaressAluno()
            
            this.exibeBotaoVoltar = true
        }
    },  

    props: {
        dados: Object
    }
}
</script>

<style>

</style>