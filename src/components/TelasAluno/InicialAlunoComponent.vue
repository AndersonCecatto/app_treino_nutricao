<template>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
        dark
        color="#1565C0"
        class="navigation-drawer"
      >
        <v-container>
            <v-list dense>
                <v-list-item-group
                    v-model="list"
                >
                    <v-list-item
                    v-for="item in menus"
                    :key="item.title"
                    link
                    @click="AcessarLink(item)"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                        
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-container>
      </v-navigation-drawer>
  
      <v-app-bar app dark color="#1565C0">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>Projeto</v-toolbar-title>
        <v-spacer/>
        <v-menu offset-y class="mx-5">
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-badge
                    color="green"
                    :content="countNotificacoes"
                    :value="countNotificacoes > 0"
                    disabled="true"
                >
                    <v-icon
                        medium
                        @click="AbriuNotificacao()"
                    >
                        mdi-bell
                    </v-icon>
                </v-badge>
            </v-btn>
            </template>
            <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
                <v-list-item-title>
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>

        <v-icon
            class="mx-3"
            medium
            @click="Sair()"
        >
            mdi-exit-to-app
        </v-icon>

      </v-app-bar>
  
      <v-main>
        <anamnese-component v-if="AnamneseComponent"/>
        <list-treino-aluno-component v-if="ListTreinoAlunoComponent" :dados="retornoProjetos" @VoltarTreino="VoltarTreino"/>
        <list-plano-alimentar-aluno-component v-if="ListPlanoAlimentarAlunoComponent" @VoltarPlanoAlimentar="VoltarPlanoAlimentar" :dados="retornoProjetos"/>
        <list-projeto-aluno-component v-if="ListProjetoAlunoComponent" @Projeto="RetornoProjetos" :dados="retornoProjetos" />
        <list-resumo-projeto-aluno-component v-if="ListResumoProjetoAlunoComponent" :dados="retornoProjetos" @Resumo="RetornoResumo" @VoltarResumo="VoltarResumo"/>
      </v-main>
      <load-component :Ativo="loader"/>
    </v-app>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods';
import LoadComponent from '../Fields/LoadComponent.vue'
import AnamneseComponent from '../Telas/AnamneseComponent.vue';
import ListTreinoAlunoComponent from './ListTreinoAlunoComponent.vue';
import RequestMethods from '@/mixins/RequestMethods';
import ListProjetoAlunoComponent from './ListProjetoAlunoComponent.vue';
import ListResumoProjetoAlunoComponent from './ListResumoProjetoAlunoComponent.vue';
import ListPlanoAlimentarAlunoComponent from './ListPlanoAlimentarAlunoComponent.vue';
export default {
    components: { 
        LoadComponent, 
        AnamneseComponent, 
        ListTreinoAlunoComponent, 
        ListProjetoAlunoComponent, ListResumoProjetoAlunoComponent, 
        ListPlanoAlimentarAlunoComponent },
    name: 'InicialAlunoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        AnamneseComponent: false,
        ListTreinoAlunoComponent: false,
        ListProjetoAlunoComponent: false,
        ListResumoProjetoAlunoComponent: false,
        ListPlanoAlimentarAlunoComponent: false,

        drawer: null,
        list: null,
        loader: false,
        countNotificacoes: 7,
        retornoProjetos: null,

        menus: [
            { Id: 1, title: 'Resultados', icon: 'mdi-medal' },
            { Id: 2, title: 'Projeto', icon: 'mdi-weight-lifter' },
            { Id: 3, title: 'Treino', icon: 'mdi-dumbbell' },
            { Id: 4, title: 'Exercicios', icon: 'mdi-run' },
            { Id: 5, title: 'Plano Alimentar', icon: 'mdi-silverware-fork-knife' },
            { Id: 6, title: 'Alimentos', icon: 'mdi-food-apple' },
            { Id: 7, title: 'Avaliações', icon: 'mdi-account-check' },
            { Id: 8, title: 'Exames', icon: 'mdi-pill-multiple' },
            { Id: 9, title: 'Anamnese', icon: 'mdi-account-details' },
        ],

        items: [
            { title: 'Adicionar ficha de Anamnese' },
            { title: 'Cadastro Incompleto, Verifique seus dados' },
            { title: 'Click Me' },
            { title: 'Click Me 2' },
        ],
        projetosAluno: []
    }),

    methods: {
        Sair() {
            this.loader = !this.loader;
            this.$router.push({ path: '/login', name: 'login'})
        },

        AbriuNotificacao() {
            this.countNotificacoes = 0
        },

        AcessarLink(item){
            this.DesabilitarComponentes()

            if (item.Id == 9)
                this.AnamneseComponent = true;
            else if (item.Id == 2)
                this.ListProjetoAlunoComponent = true;
            else if (item.Id == 3)
                this.ListTreinoAlunoComponent = true;
            else if (item.Id == 5)
                this.ListPlanoAlimentarAlunoComponent = true;
        },

        DesabilitarComponentes() {
            this.AnamneseComponent = false
            this.ListTreinoAlunoComponent = false;
            this.ListProjetoAlunoComponent = false;
            this.ListResumoProjetoAlunoComponent = false
            this.ListPlanoAlimentarAlunoComponent = false
        },

        RetornoProjetos(retorno) {
            this.ListProjetoAlunoComponent = false
            this.ListResumoProjetoAlunoComponent = true
            this.retornoProjetos = retorno
        },

        VoltarResumo(retorno) {
            this.ListProjetoAlunoComponent = true
            this.ListResumoProjetoAlunoComponent = false
        },

        VoltarTreino(retorno) {
            debugger
            this.ListTreinoAlunoComponent = false
            this.ListResumoProjetoAlunoComponent = true
        },

        VoltarPlanoAlimentar(retorno) {
            debugger
            this.ListPlanoAlimentarAlunoComponent = false
            this.ListResumoProjetoAlunoComponent = true
        },

        RetornoResumo(retorno) {
            if (retorno.item.nome == "Planos Alimentares") {
                this.ListResumoProjetoAlunoComponent = false
                this.ListPlanoAlimentarAlunoComponent = true
            }

            if (retorno.item.nome == "Treinos") {
                this.ListResumoProjetoAlunoComponent = false
                this.ListTreinoAlunoComponent = true
            }

            this.retornoProjetos = retorno.dados
        }
    },

    watch: {
        list() {
            if (this.$vuetify.breakpoint.name === "xs" ||
                this.$vuetify.breakpoint.name === "md") {
                this.drawer = !this.drawer
            }
        }
    },
}
</script>

<style scoped>
    .v-main {
        padding: 0px !important;
    }
    .navigation-drawer {
        z-index: 99999;
    }
</style>