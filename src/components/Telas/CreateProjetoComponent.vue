<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <dialog-persistent-component
            tamanho="600"
            titulo="Cadastrar Projeto"
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
                        v-model="Descricao"
                        label="Descrição"
                        prepend-icon="mdi-text-box-edit"
                        required
                        :rules="[() => !!Descricao || 'Campo Obrigatório']"
                    />
                    <v-textarea
                        v-model="Observacao"
                        label="Observações"
                        prepend-icon="mdi-text-box-edit"
                    />
                    <v-banner
                        outlined
                    >
                    <v-subheader>Incluir no Projeto</v-subheader>
                    <v-row>
                        <v-col 
                            cols="6"
                            md="4"
                        >
                            <v-checkbox
                            class="pl-3"
                            v-model="PlanoAlimentar"
                            label="Plano Alimentar"
                            ></v-checkbox>
                        </v-col>
                        <v-col 
                            cols="6"
                            md="4"
                        >
                            <v-checkbox
                            class="pl-3"
                            v-model="Treino"
                            label="Treino"
                            ></v-checkbox>
                        </v-col>
                        <v-col 
                            cols="6"
                            md="4"
                        >
                            <v-checkbox
                            class="pl-3"
                            v-model="Fotos"
                            label="Fotos"
                            ></v-checkbox>
                        </v-col>
                        <v-col 
                            cols="6"
                            md="4"
                        >
                            <v-checkbox
                            class="pl-3"
                            v-model="Avaliacao"
                            label="Avaliação"
                            ></v-checkbox>
                        </v-col>
                        <v-col 
                            cols="6"
                            md="4"
                        >
                            <v-checkbox
                            class="pl-3"
                            v-model="Exames"
                            label="Exames"
                            ></v-checkbox>
                        </v-col>
                        <v-col 
                            cols="6"
                            md="4"
                        >
                            <v-checkbox
                            class="pl-3"
                            v-model="Anamnese"
                            label="Anamnese"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                    </v-banner>
                </v-form>
              <v-divider/>
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
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import DialogPersistentComponent from '../Fields/DialogPersistentComponent.vue'

export default {
    components: { AlertComponent, LoadComponent, DialogPersistentComponent },
    name: 'CreateProjetoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,

        Id: null,
        Descricao: null,
        Ativo: null,
        Observacao: null,
        PlanoAlimentar: false,
        Treino: false,
        Fotos: false,
        Avaliacao: false,
        Exames: false,
        Anamnese: false,
        EmpresaId: null
    }),

    methods: {
        close() {
            this.localDialog = !this.localDialog
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
            
            this.RequestPost('Projeto',
            {
                ativo: this.Ativo,
                nome: this.Descricao,
                planoAlimentar: this.PlanoAlimentar,
                treino: this.Treino,
                foto: this.Fotos,
                avaliacao: this.Avaliacao,
                exame: this.Exames,
                anamnese: this.Anamnese,
                observacoes: this.Observacao,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Projeto salvo com sucesso.", "success")
                this.$emit("ProjetoSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Alterar() {
            debugger
            this.loader = !this.loader;
            
            debugger
            this.RequestPut('Projeto',
            {
                id: this.Id,
                ativo: this.Ativo,
                nome: this.Descricao,
                planoAlimentar: this.PlanoAlimentar,
                treino: this.Treino,
                foto: this.Fotos,
                avaliacao: this.Avaliacao,
                exame: this.Exames,
                anamnese: this.Anamnese,
                observacoes: this.Observacao,
                empresaId: this.EmpresaId
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Treino salvo com sucesso.", "success")
                this.$emit("ProjetoSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        }
    },

    watch: {
        dialog() {
            this.localDialog = true

            this.Id = null
            this.Descricao = null
            this.Observacao = null
            this.PlanoAlimentar = false
            this.Treino = false
            this.Fotos = false
            this.Avaliacao = false
            this.Exames = false
            this.Anamnese = false
            this.EmpresaId = null

            if (this.dados != null) {
                debugger
                this.Id = this.dados.Id
                this.Descricao = this.dados.Descricao
                this.Ativo = this.RetornaTrueFalse(this.dados.Ativo)
                this.Observacao = this.dados.Observacoes
                this.PlanoAlimentar = this.RetornaTrueFalse(this.dados.PlanoAlimentar)
                this.Treino = this.RetornaTrueFalse(this.dados.Treino)
                this.Fotos = this.RetornaTrueFalse(this.dados.Fotos)
                this.Avaliacao = this.RetornaTrueFalse(this.dados.Avaliacao)
                this.Exames = this.RetornaTrueFalse(this.dados.Exames)
                this.Anamnese = this.RetornaTrueFalse(this.dados.Anamnese)
                this.EmpresaId = this.dados.EmpresaId
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