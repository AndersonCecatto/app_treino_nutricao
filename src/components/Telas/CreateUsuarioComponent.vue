<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <dialog-persistent-component
            tamanho="600"
            titulo="Cadastrar Usuário"
            @close="close"
            :dialog="localDialog"
        >
            <template v-slot:text>
                <v-form
                    ref="form"
                    lazy-validation
                >
                    <v-row class="ml-6">
                        <v-col cols="4" md="2">
                            <v-text-field
                                label="Código"
                                v-model="Id"
                                disabled
                            />
                        </v-col>
                        <v-col cols="3" md="6"/>
                        <v-col cols="4">
                            <v-switch
                                v-model="Ativo"
                                inset
                                label="Ativo"
                            ></v-switch>
                        </v-col>
                    </v-row>
                    <v-text-field
                        v-model="Nome"
                        label="Nome"
                        prepend-icon="mdi-text-box-edit"
                        required
                        :rules="[() => !!Nome || 'Campo Obrigatório']"
                    />
                    <v-text-field
                        v-model="Telefone"
                        label="Telefone"
                        prepend-icon="mdi-text-box-edit"
                        v-mask="'(##) #####-####'"
                    />
                    <data-pickers-component @DataRetorno="DataRetorno" :data-recebimento="DataNascimentoRetorno"
                        titulo="Data de Nascimento"/>
                    <v-text-field
                        v-model="Email"
                        label="Email"
                        :rules="[rules.required, rules.email]"
                        prepend-icon="mdi-text-box-edit"
                    />
                    <v-text-field
                        v-model="Senha"
                        label="Senha"
                        prepend-icon="mdi-lock-check"
                        :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="mostrarSenha ? 'text' : 'password'"
                        @click:append="mostrarSenha = !mostrarSenha"
                    />
                </v-form>
            </template>
            <template v-slot:actions>
                <v-spacer/>
                <v-btn
                    outlined
                    large
                    color="green"
                    @click="Salvar()"
                    >
                    <v-icon left>
                        mdi-check
                    </v-icon>
                    Salvar
                </v-btn>
            </template>
        </dialog-persistent-component>
    </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import DialogPersistentComponent from '../Fields/DialogPersistentComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import DataPickersComponent from '../Fields/DataPickersComponent.vue'
export default {
    components: { AlertComponent, LoadComponent, DialogPersistentComponent, DataPickersComponent },
    name: 'CreateUsuarioComponent',
    mixins: [GenericMethods, RequestMethods],
    data: (vm) => ({
        localDialog: false,
        mostrarSenha: false,

        Id: null,
        Ativo: null,
        Nome: null,
        Telefone: null,
        DataNascimento: null,
        DataNascimentoRetorno: null,
        Email: null,
        Senha: null,

        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email Inválido.'
          },
        }
    }),

    methods: {
        close() {
            this.localDialog = !this.localDialog
        },

        DataRetorno(retorno){
            this.DataNascimento = retorno
        },

        Salvar() {
            if (!this.$refs.form.validate()) 
                return 

            if (this.dados == null)
                this.Inserir()
            else
                this.Alterar()
        },

        Inserir() {
            this.loader = !this.loader;
            
            this.RequestPost('Usuario', this.MontarObjeto(0),
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Usuário salvo com sucesso.", "success")
                this.$emit("UsuarioSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Alterar() {
            this.loader = !this.loader;
            
            this.RequestPut('Usuario', this.MontarObjeto(this.dados),
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Usuário salvo com sucesso.", "success")
                this.$emit("UsuarioSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        MontarObjeto(id) {

            debugger
            return {
                id: id,
                nome: this.Nome,
                telefone: this.Telefone,
                dataNascimento: this.ParseDate(this.DataNascimento == null ? this.DataNascimentoRetorno : this.DataNascimento),
                email: this.Email,
                senha: this.Senha,
                ativo: this.Ativo,
                empresaId: 2
            }
        },

        BuscarUsuarioById(id) {
            debugger
            this.loader = !this.loader;
            
            this.RequestGet('Usuario/GetById/'+id,
            (retorno) => {
                debugger
                this.Id = retorno.data.id
                this.Nome = retorno.data.nome
                this.Telefone = retorno.data.telefone
                this.DataNascimentoRetorno = retorno.data.dataNascimento
                this.Email = retorno.data.email
                this.Senha = retorno.data.senha
                this.Ativo = retorno.data.ativo
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },
    },

    watch: {
        dialog() {
            this.localDialog = true

            this.Id = null
            this.Nome = null
            this.Telefone = null
            this.DataNascimentoRetorno = this.dateNow
            this.Email = null
            this.Senha = null
            this.Ativo = true

            if (this.dados != null) {
                debugger
                this.BuscarUsuarioById(this.dados)
            }
        }
    },

    props: {
        dialog: Boolean,
        dados: Object,
    }
}
</script>

<style>

</style>