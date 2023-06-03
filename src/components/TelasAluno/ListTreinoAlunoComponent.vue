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
                        v-for="item in treinos"
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
                                <v-icon class="mx-3">
                                    mdi-arrow-right-bold
                                </v-icon>
                                {{ item.Observacoes }}
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
    name: 'ListTreinoAlunoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        treinos: [],
        treinosEncontrados: [],
        listaTreinos: [],
        exibeBotaoVoltar: false
    }),

    methods: {
        Voltar() {
            this.$emit('VoltarTreino', true)
        },

        BuscarTreinosAluno() {
            this.loader = !this.loader;
            
            this.RequestPost('Treino/BuscarPorIdsTreinos', this.listaTreinos,
            (retorno) => {
                this.treinos = []
                debugger
                retorno.data.forEach(element => {
                    this.treinos.push({
                        Id: element.id,
                        Descricao: element.descricao,
                        GrupoMuscular: element.grupoMuscular,
                        Exercicios: element.exercicios,
                        Observacoes: element.observacoes
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        }
    },

    created() {
        debugger
        if (this.dados?.treinos != null) {

            this.dados.treinos.split(';').forEach(element => {
               this.listaTreinos.push(parseInt(element.substring(0, element.indexOf('-')).trim()))
            });

            this.BuscarTreinosAluno()
            
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