<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <dialog-persistent-component 
          tamanho="600"
          titulo="Cadastrar Treino"
          @close="close"
          :dialog="localDialog"
        >
          <template v-slot:text>
              <v-form
                  ref="form"
                  lazy-validation
              >
                <v-row class="ml-6">
                    <v-col cols="4"
                            md="2">
                        <v-text-field
                            label="Código"
                            v-model="Id"
                            disabled
                        />
                    </v-col>
                    <v-col cols="3" md="6"/>
                    <v-col cols="4" md="4">
                        <v-switch
                            v-model="Ativo"
                            inset
                            label="Ativo"
                        ></v-switch>
                    </v-col>
                </v-row>
                  <v-text-field
                      v-model="Descricao"
                      label="Descrição"
                      prepend-icon="mdi-text-box-edit"
                      required
                      :rules="[() => !!Descricao || 'Campo Obrigatório']"
                  />
                  <auto-complete-field-component
                    Label="Aluno" 
                    Icon="mdi-account-circle"
                    Url="Usuario/GetByEmpresaId/2"
                    @retorno="retornoUsuario"
                    :receberDados="dados?.Usuario"
                    :flagAutoComplete="flagAutoComplete"
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
import DialogPersistentComponent from '../Fields/DialogPersistentComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import AutoCompleteFieldComponent from '../Fields/AutoCompleteFieldComponent.vue'

export default {
    components: { DialogPersistentComponent, LoadComponent, AlertComponent, AutoCompleteFieldComponent },
    name: 'CreateTreinoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,
        Id: null,
        Descricao: null,
        UsuarioId: null,
        Ativo: true
    }),

    methods: {
        close() {
            this.localDialog = !this.localDialog
        },

        retornoUsuario(retorno) {
            this.UsuarioId = retorno?.id
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
            debugger
            this.loader = !this.loader;
            
            
            this.RequestPost('Treino',
            {
                ativo: this.Ativo,
                descricao: this.Descricao,
                usuarioId: this.UsuarioId,
                ativo: this.Ativo,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Treino salvo com sucesso.", "success")
                this.$emit("TreinoSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Alterar() {
            debugger
            this.loader = !this.loader;
            
            debugger
            this.RequestPut('Treino',
            {
                id: this.dados.Id,
                ativo: this.Ativo,
                descricao: this.Descricao,
                usuarioId: this.UsuarioId,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Treino salvo com sucesso.", "success")
                this.$emit("TreinoSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        }
    },

    watch: {
        dialog() {
            debugger
            this.localDialog = true
            this.Descricao = null
            this.Id = null

            if (this.dados != null) {
                this.Id = this.dados.Id
                this.Descricao = this.dados.Descricao
                this.Ativo = this.RetornaTrueFalse(this.dados.Ativo)
            }
        }
    },
    
    props: {
        dialog: Boolean,
        dados: Object,
        flagAutoComplete: Boolean
    }
}
</script>

<style>
  
</style>