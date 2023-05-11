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
      </v-main>
      <load-component :Ativo="loader"/>
    </v-app>
  </template>

<script>
import LoadComponent from '../Fields/LoadComponent.vue'
import AnamneseComponent from './AnamneseComponent.vue';
export default {
  components: { LoadComponent, AnamneseComponent },
    name: "InicialEmpresaComponent",
    data: () => ({
        AnamneseComponent: false,

        drawer: null,
        list: null,
        loader: false,
        menus: [
            { Id: 1, title: 'Home', icon: 'mdi-home' },
            { Id: 2, title: 'Histórico', icon: 'mdi-history' },
            { Id: 3, title: 'Anamnese', icon: 'mdi-history' },
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

            if (item.Id == 3)
                this.AnamneseComponent = true;
        },

        DesabilitarComponentes() {
            this.AnamneseComponent = false
        },

        Sair() {
            this.loader = !this.loader;
            this.$router.push({ path: '/login', name: 'login'})
        },

        AbriuNotificacao() {
            this.countNotificacoes = 0
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