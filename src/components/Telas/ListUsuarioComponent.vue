<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <card-padrao-component>
            <template v-slot:titulo>
                <div>
                    <v-icon class="mx-3">
                        mdi-account-group
                    </v-icon>
                    Usuarios
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
                    @click="CriarUsuario()"
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
                :items="usuarios"
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
                        color="primary"
                        class="mr-3"
                        large
                        @click="EditarUsuario(item)"
                    >
                        mdi-text-box-edit
                    </v-icon>
                </template>
            </v-data-table>
        </template>
        </card-padrao-component>
        <create-usuario-component
            :dialog="dialog"
            :dados="dados"
            @UsuarioSalvo="UsuarioSalvo"
        />
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import CreateUsuarioComponent from './CreateUsuarioComponent.vue'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent, CreateUsuarioComponent },
    name: 'ListUsuarioComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        headers: [
            { text: '', value: 'EmpresaId', align: ' d-none'},
            { text: 'Código', value: 'Id', align: 'center', width: '10%'},
            { text: 'Nome', value: 'Nome'},
            { text: 'Telefone', value: 'Telefone'},
            { text: 'Data Nascimento', value: 'DataNascimento'},
            { text: 'Email', value: 'Email'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
        ],
        usuarios: [],
        todosUsuarios: []
    }),

    methods: {
        LocalFiltroStatus(item) {
            this.usuarios = this.FiltrarStatus(item, this.todosUsuarios)
        },

        BuscarUsuarios() {
            this.loader = !this.loader;
            
            this.RequestGet('Usuario/GetByEmpresaId/2/TipoBusca/1',
            (retorno) => {
                this.usuarios = []
                retorno.data.forEach(element => {
                    this.usuarios.push({
                        Id: element.id,
                        Nome: element.nome,
                        Telefone: element.telefone,
                        DataNascimento: this.FormatDate(element.dataNascimento),
                        Email: element.email,
                        EmpresaId: element.empresaId,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })
                });

                this.todosUsuarios = this.usuarios
                this.Status = 'Todos'
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        CriarUsuario() {
            this.dados = null
            this.dialog = !this.dialog
        },

        UsuarioSalvo(retorno) {
            if (retorno == true)
                this.BuscarUsuarios()
        },

        EditarUsuario(item) {
            this.dados = item.Id
            this.dialog = !this.dialog
        },
    },

    created() {
        this.BuscarUsuarios()
    }
}
</script>

<style>

</style>