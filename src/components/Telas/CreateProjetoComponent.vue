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
                        class="mb-3"
                    >
                        <v-subheader>Adicionar</v-subheader>
                        <v-select
                            v-model="PlanosAlimentares"
                            :items="ListPlanosAlimentares"
                            label="Planos Alimentares"
                            prepend-icon="mdi-silverware-fork-knife"
                            multiple
                            chips
                        ></v-select>
                        <v-select
                            v-model="Treinos"
                            :items="ListTreinos"
                            label="Treinos"
                            prepend-icon="mdi-dumbbell"
                            multiple
                            chips
                        ></v-select>
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
        Exame: false,
        Anamnese: false,
        EmpresaId: null,

        Treinos: [],
        PlanosAlimentares: [],
        ListTreinos: []
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
            this.loader = !this.loader;
            
            this.RequestPost('Projeto',
            {
                ativo: this.Ativo,
                nome: this.Descricao,
                planoAlimentar: this.PlanoAlimentar,
                treino: this.Treino,
                foto: this.Fotos,
                avaliacao: this.Avaliacao,
                exame: this.Exame,
                anamnese: this.Anamnese,
                observacoes: this.Observacao,
                empresaId: 2,
                planosAlimentares: this.PlanosAlimentares.length > 1 ? this.PlanosAlimentares.toString().replaceAll(',', ';') : null,
                treinos: this.Treinos.length > 1 ? this.Treinos.toString().replaceAll(',', ';') : null
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
            this.loader = !this.loader;
            debugger

            this.PlanosAlimentares = this.PlanosAlimentares.toString() == '' ? null : this.PlanosAlimentares
            this.Treinos = this.Treinos.toString() == '' ? null : this.Treinos

            this.RequestPut('Projeto',
            {
                id: this.Id,
                ativo: this.Ativo,
                nome: this.Descricao,
                planoAlimentar: this.PlanoAlimentar,
                treino: this.Treino,
                foto: this.Fotos,
                avaliacao: this.Avaliacao,
                exame: this.Exame,
                anamnese: this.Anamnese,
                observacoes: this.Observacao,
                empresaId: this.EmpresaId,
                planosAlimentares: this.PlanosAlimentares != null ? this.PlanosAlimentares.toString().replaceAll(',', ';') : null,
                treinos: this.Treinos != null ? this.Treinos.toString().replaceAll(',', ';') : null
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Treino salvo com sucesso.", "success")
                this.$emit("ProjetoSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        BuscarTreinos() {
            this.loader = !this.loader;
            
            this.RequestGet('Treino/EmpresaId/'+2, 
            (retorno) => {
                this.ListTreinos = []
                retorno.data.forEach(element => {
                    this.ListTreinos.push(
                        element.id + ' - ' + element.descricao
                    )
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        BuscarPlanosAlimentares() {
            this.loader = !this.loader;
            
            this.RequestGet('PlanoAlimentar/EmpresaId/'+2, 
            (retorno) => {
                this.ListPlanosAlimentares = []
                retorno.data.forEach(element => {
                    this.ListPlanosAlimentares.push(
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
            this.localDialog = true

            this.Id = null
            this.Descricao = null
            this.Observacao = null
            this.PlanoAlimentar = false
            this.Treino = false
            this.Fotos = false
            this.Avaliacao = false
            this.Exame = false
            this.Anamnese = false
            this.EmpresaId = null

            this.Treinos = []
            this.PlanosAlimentares = []

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
                this.Exame = this.RetornaTrueFalse(this.dados.Exame)
                this.Anamnese = this.RetornaTrueFalse(this.dados.Anamnese)
                this.EmpresaId = this.dados.EmpresaId,
                this.PlanosAlimentares = this.dados.PlanosAlimentares != null ? this.dados.PlanosAlimentares.split(';') : null
                this.Treinos = this.dados.Treinos != null ? this.dados.Treinos.split(';') : null
            }
        }
    },

    created() {
        this.BuscarTreinos()
        this.BuscarPlanosAlimentares()
    },

    props: {
        dialog: Boolean,
        dados: Object,
    }
}
</script>

<style>

</style>