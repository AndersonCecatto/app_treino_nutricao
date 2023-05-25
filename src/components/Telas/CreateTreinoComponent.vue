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
                            v-model="GrupoMuscular"
                            :items="ListGrupoMuscular"
                            label="Grupo Muscular"
                            multiple
                            chips
                            prepend-icon="mdi-text-box-edit"
                        ></v-select>
                        <v-select
                            v-model="Exercicios"
                            :items="ListExercicio"
                            label="Exercicios"
                            multiple
                            chips
                            prepend-icon="mdi-text-box-edit"
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
        Ativo: true,
        Observacoes: null,

        GrupoMuscular: null,
        ListGrupoMuscular: [
            '1 - Peito',
            '2 - Costas',
            '3 - Ombro',
            '4 - Pernas',
            '5 - Biceps',
            '6 - Triceps'
        ],

        Exercicios: null,
        ListExercicio: []
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
            
            this.RequestPost('Treino',
            {
                ativo: this.Ativo,
                descricao: this.Descricao,
                usuarioId: this.UsuarioId,
                grupoMuscular: this.GrupoMuscular.length > 1 ? this.GrupoMuscular.toString().replaceAll(',', ';') : null,
                exercicios: this.Exercicios.length > 1 ? this.Exercicios.toString().replaceAll(',', ';') : null,
                observacoes: this.Observacoes,
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
            this.loader = !this.loader;

            this.GrupoMuscular = this.GrupoMuscular.toString() == '' ? null : this.GrupoMuscular
            this.Exercicios = this.Exercicios.toString() == '' ? null : this.Exercicios
            
            this.RequestPut('Treino',
            {
                id: this.dados.Id,
                ativo: this.Ativo,
                descricao: this.Descricao,
                grupoMuscular: this.GrupoMuscular != null ? this.GrupoMuscular.toString().replaceAll(',', ';') : null,
                exercicios: this.Exercicios != null ? this.Exercicios.toString().replaceAll(',', ';') : null,
                observacoes: this.Observacoes,
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
        },

        BuscarExercicios() {
            this.loader = !this.loader;
            
            this.RequestGet('Exercicio/EmpresaId/'+2+'/TipoBusca/2', 
            (retorno) => {
                this.ListExercicio = []
                retorno.data.forEach(element => {
                    this.ListExercicio.push(
                        element.id + ' - ' + element.descricao
                    )
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },
    },

    watch: {
        dialog() {
            
            this.Id = null
            this.localDialog = true
            this.Descricao = null
            this.Observacoes = null
            this.GrupoMuscular = null
            this.Exercicios = null

            this.BuscarExercicios()

            debugger

            if (this.dados != null) {
                this.Id = this.dados.Id
                this.Descricao = this.dados.Descricao
                this.GrupoMuscular = this.dados.GrupoMuscular != null ? this.dados.GrupoMuscular.split(';') : null
                this.Observacoes = this.dados.Observacoes
                this.Exercicios = this.dados.Exercicios != null ? this.dados.Exercicios.split(';') : null 
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