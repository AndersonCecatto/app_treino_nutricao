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
                    Conteúdo Projeto
                </div>
                <v-spacer></v-spacer>
                <v-btn
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
                        v-for="item in resumo"
                        :key="item"
                    >
                        <v-hover
                            v-slot="{ hover }"
                        >
                            <v-card
                                :elevation="hover ? 5 : 2"
                                :class="{ 'on-hover': hover }"
                                @click="Acessar(item)"
                            >
                                <v-card-title>
                                    <v-icon class="mx-3">
                                        mdi-arrow-right-bold-box
                                    </v-icon>
                                    {{ item.nome }}
                                </v-card-title>
                                <v-card-text>
                                    <v-icon class="mx-3">
                                        mdi-arrow-right-bold
                                    </v-icon>
                                    {{ item.descricao }}
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </template>
        </card-padrao-component>
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent },
    name: 'ListResumoProjetoAlunoComponent',
    mixins: [GenericMethods],
    data: () => ({
        resumo: []
    }),

    methods: {
        Voltar() {
            this.$emit('VoltarResumo', true)
        },

        Acessar(item) {
            this.$emit('Resumo', { item, dados: this.dados })
        },
    },

    created() {
        debugger

        if (this.dados?.planosAlimentares != null) {
            this.resumo.push({
                nome: 'Planos Alimentares',
                descricao: 'Acesse seus planos alimentares',
            })
        }

        if (this.dados?.treinos != null) {
            this.resumo.push({
                nome: 'Treinos',
                descricao: 'Acesse seus treinos'
            })
        }
    },

    props: {
        dados: Object
    }
}
</script>

<style>

</style>