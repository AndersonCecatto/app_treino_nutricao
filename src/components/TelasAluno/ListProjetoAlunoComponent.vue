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
                    Projetos
                </div>
            </template>
            <template v-slot:texto>
                <v-row>
                    <v-col cols="12" md="6"
                        v-for="item in projetosAluno"
                        :key="item.Id"
                    >
                        <v-hover
                            v-slot="{ hover }"
                        >
                            <v-card 
                                v-if="item.Id != null"
                                :elevation="hover ? 5 : 2"
                                :class="{ 'on-hover': hover }"
                                @click="Acessar(item)"
                            >
                                <v-card-title>
                                    <v-icon class="mx-3">
                                        mdi-arrow-right-bold-box
                                    </v-icon>
                                    {{ item.Projeto.nome }}
                                </v-card-title>
                                <v-card-text>
                                    <v-icon class="mx-3">
                                        mdi-arrow-right-bold
                                    </v-icon>
                                    {{ item.Projeto.observacoes }}
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
import RequestMethods from '@/mixins/RequestMethods'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent },
    name: 'ListProjetoAlunoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        projetosAluno: []
    }),

    methods: {
        Acessar(item) {
            this.$emit('Projeto', item.Projeto)
        },

        BuscarProjetoAluno() {
            this.loader = !this.loader;
            
            this.RequestGet('ProjetoAluno/UsuarioId/'+4,
            (retorno) => {
                this.projetosAluno = []
                retorno.data.forEach(element => {
                    this.projetosAluno.push({
                        Id: element.id,
                        UsuarioId: element.usuarioId,
                        ProjetoId: element.projetoId,
                        Projeto: element.projeto
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        }
    },

    created() {
        this.BuscarProjetoAluno()
    }
}
</script>

<style>

</style>