<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <dialog-persistent-component
          tamanho="600"
          titulo="Cadastrar Plano Alimentar"
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
                    Url="Usuario/GetByEmpresaId/2/TipoBusca/2"
                    @retorno="retornoUsuario"
                    :receberDados="dados?.Usuario"
                    :flagAutoComplete="flagAutoComplete"
                  />
                  <v-textarea
                        v-model="Observacoes"
                        label="Observações"
                        prepend-icon="mdi-text-box-edit"
                    />
                  <v-banner
                    outlined
                    class="mb-3"
                  >
                    <v-subheader>Adicionar</v-subheader>
                    <v-select
                        v-model="Alimentos"
                        :items="ListAlimentos"
                        label="Alimentos"
                        prepend-icon="mdi-food-apple"
                        multiple
                        chips
                    ></v-select>
                  </v-banner>
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
import AutoCompleteFieldComponent from '../Fields/AutoCompleteFieldComponent.vue'
import DialogPersistentComponent from '../Fields/DialogPersistentComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
export default {
  components: { AlertComponent, LoadComponent, DialogPersistentComponent, AutoCompleteFieldComponent },
    name: 'CreatePlanoAlimentarComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,
        Id: null,
        Descricao: null,
        UsuarioId: null,
        Ativo: true,
        Alimentos: null,
        Observacoes: null,

        ListAlimentos: []
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
            
            this.loader = !this.loader;
            
            this.RequestPost('PlanoAlimentar',
            {
                ativo: this.Ativo,
                descricao: this.Descricao,
                observacoes: this.Observacoes,
                usuarioId: this.UsuarioId,
                alimentos: this.Alimentos.length > 1 ? this.Alimentos.toString().replaceAll(',', ';') : null,
                ativo: this.Ativo,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Plano Alimentar salvo com sucesso.", "success")
                this.$emit("PlanoAlimentarSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Alterar() {
            this.loader = !this.loader;
            
            this.Alimentos = this.Alimentos.toString() == '' ? null : this.Alimentos

            this.RequestPut('PlanoAlimentar',
            {
                id: this.dados.Id,
                ativo: this.Ativo,
                observacoes: this.Observacoes,
                alimentos: this.Alimentos != null ? this.Alimentos.toString().replaceAll(',', ';') : null,
                descricao: this.Descricao,
                usuarioId: this.UsuarioId,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Plano Alimentar salvo com sucesso.", "success")
                this.$emit("PlanoAlimentarSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        BuscarAlimentos() {
            this.loader = !this.loader;
            
            this.RequestGet('Alimento/EmpresaId/'+2+'/TipoBusca/2', 
            (retorno) => {
                this.ListAlimentos = []
                retorno.data.forEach(element => {
                    this.ListAlimentos.push(
                        element.id + ' - ' + element.nome
                    )
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },
    },

    watch: {
        dialog() {
            
            this.localDialog = true
            this.Descricao = null
            this.Id = null
            this.observacoes = null
            this.Alimentos = null
            this.ListAlimentos = []

            this.BuscarAlimentos()

            if (this.dados != null) {
                this.Id = this.dados.Id
                this.Descricao = this.dados.Descricao
                this.Observacoes = this.dados.Observacoes
                this.Ativo = this.RetornaTrueFalse(this.dados.Ativo)
                this.Alimentos = this.dados.Alimentos != null ? this.dados.Alimentos.split(';') : null
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