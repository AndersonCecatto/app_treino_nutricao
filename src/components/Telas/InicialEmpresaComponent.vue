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
        <list-treino-component v-if="ListTreinoComponent"/>
        <list-projeto-component v-if="ListProjetoComponent"/>
        <list-plano-alimentar-component v-if="ListPlanoAlimentarComponent"/>
        <list-alimentos-component v-if="ListAlimentosComponent"/>
        <list-exercicios-component v-if="ListExerciciosComponent"/>
        <list-avaliacao-usuario-component v-if="ListAvaliacaoUsuarioComponent" @UsuarioId="UsuarioId"/>
        <list-avaliacao-component v-if="ListAvaliacaoComponent" :UsuarioId="LocalUsuarioId" :EmpresaId="2"/>
        <list-usuario-component v-if="ListUsuarioComponent"/>
      </v-main>
      <load-component :Ativo="loader"/>
    </v-app>
  </template>

<script>
import LoadComponent from '../Fields/LoadComponent.vue'
import AnamneseComponent from './AnamneseComponent.vue';
import ListAlimentosComponent from './ListAlimentosComponent.vue';
import ListAvaliacaoComponent from './ListAvaliacaoComponent.vue';
import ListAvaliacaoUsuarioComponent from './ListAvaliacaoUsuarioComponent.vue';
import ListExerciciosComponent from './ListExerciciosComponent.vue';
import ListPlanoAlimentarComponent from './ListPlanoAlimentarComponent.vue';
import ListProjetoComponent from './ListProjetoComponent.vue';
import ListTreinoComponent from './ListTreinoComponent.vue';
import ListUsuarioComponent from './ListUsuarioComponent.vue';
export default {
  components: { 
    LoadComponent, AnamneseComponent, 
    ListTreinoComponent, ListProjetoComponent, 
    ListPlanoAlimentarComponent, ListAlimentosComponent, 
    ListExerciciosComponent,
    ListAvaliacaoComponent,
    ListAvaliacaoUsuarioComponent,
    ListUsuarioComponent },
    name: "InicialEmpresaComponent",
    data: () => ({
        AnamneseComponent: false,
        ListTreinoComponent: false,
        ListProjetoComponent: false,
        ListPlanoAlimentarComponent: false,
        ListAlimentosComponent: false,
        ListExerciciosComponent: false,
        ListAvaliacaoComponent: false,
        ListAvaliacaoUsuarioComponent: false,
        ListUsuarioComponent: false,

        LocalUsuarioId: 0,
        drawer: null,
        list: null,
        loader: false,
        menus: [
            { Id: 1, title: 'Resultados', icon: 'mdi-medal' },
            { Id: 2, title: 'Projeto', icon: 'mdi-weight-lifter' },
            { Id: 3, title: 'Treino', icon: 'mdi-dumbbell' },
            { Id: 4, title: 'Exercicios', icon: 'mdi-run' },
            { Id: 5, title: 'Plano Alimentar', icon: 'mdi-silverware-fork-knife' },
            { Id: 6, title: 'Alimentos', icon: 'mdi-food-apple' },
            { Id: 7, title: 'Avaliações', icon: 'mdi-account-check' },
            { Id: 8, title: 'Exames', icon: 'mdi-pill-multiple' },
            { Id: 9, title: 'Usuarios', icon: 'mdi-account-group' },
            { Id: 10, title: 'Anamnese', icon: 'mdi-account-details' },
            { Id: 11, title: 'Financeiro', icon: 'mdi-currency-usd' },
        ],
        countNotificacoes: 7,
        items: [
            { title: 'Adicionar ficha de Anamnese' },
            { title: 'Cadastro Incompleto, Verifique seus dados' },
            { title: 'Click Me' },
            { title: 'Click Me 2' },
        ],
    }),

    methods: {
        AcessarLink(item){
            this.DesabilitarComponentes()

            if (item.Id == 2)
                this.ListProjetoComponent = true;
            else if (item.Id == 3)
                this.ListTreinoComponent = true;
            else if (item.Id == 4)
                this.ListExerciciosComponent = true
            else if (item.Id == 5)
                this.ListPlanoAlimentarComponent = true;
            else if (item.Id == 6)
                this.ListAlimentosComponent = true
            else if (item.Id == 7)
                this.ListAvaliacaoUsuarioComponent = true
            else if (item.Id == 9)
                this.ListUsuarioComponent = true
            else if (item.Id == 10)
                this.AnamneseComponent = true;
        },

        DesabilitarComponentes() {
            this.AnamneseComponent = false
            this.ListTreinoComponent = false
            this.ListProjetoComponent = false
            this.ListPlanoAlimentarComponent = false
            this.ListAlimentosComponent = false
            this.ListExerciciosComponent = false
            this.ListAvaliacaoUsuarioComponent = false
            this.ListAvaliacaoComponent = false
            this.ListUsuarioComponent = false
        },

        Sair() {
            this.loader = !this.loader;
            this.$router.push({ path: '/login', name: 'login'})
        },

        AbriuNotificacao() {
            this.countNotificacoes = 0
        },

        UsuarioId(retorno) {
            debugger
            this.LocalUsuarioId = retorno
            this.ListAvaliacaoUsuarioComponent = false
            this.ListAvaliacaoComponent = true
        }
    },

    watch: {
        list() {
            if (this.$vuetify.breakpoint.name === "xs" ||
                this.$vuetify.breakpoint.name === "md") {
                this.drawer = !this.drawer
            }
        }
    }
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