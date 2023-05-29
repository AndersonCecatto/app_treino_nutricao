<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <load-component :Ativo="loader"/>
        <dialog-persistent-component
            tamanho="1000"
            titulo="Cadastrar Avaliação"
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
                    <v-banner
                        outlined
                        class="mb-3"
                    >
                        <v-subheader>Informações Base</v-subheader>
                    
                        <v-text-field
                            v-model="Descricao"
                            label="Descrição"
                            prepend-icon="mdi-text-box-edit"
                            required
                            :rules="[() => !!Descricao || 'Campo Obrigatório']"
                        />
                        <v-text-field
                            v-model="TreinoKcal"
                            label="Treino Kcal"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="Cardio"
                            label="Cardio"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <data-pickers-component @DataRetorno="DataRetorno" :data-recebimento="DataAvaliacaoRetorno"
                            titulo="Data Avaliação"/>
                    </v-banner>
                    <v-banner
                        outlined
                        class="mb-3"
                    >
                        <v-subheader>Composição Corporal</v-subheader>

                        <v-text-field
                            v-model="Peso"
                            label="Peso Kg"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="MassaMuscular"
                            label="Massa Muscular"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="IdadeCorporal"
                            label="Idade Corporal"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="Imc"
                            label="IMC"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="GorduraCorporal"
                            label="Gordura Corporal %"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="GorduraVisceral"
                            label="Gordura Visceral"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="MetabolismoBasal"
                            label="Metabolismo Basal"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="Pernas"
                            label="Perna++"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="KgMassaMagra"
                            label="Kg Massa Magra"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="KgGordura"
                            label="Kg Gordura"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="RelacaoAbdomemOmbro"
                            label="Relação Abdomem Ombro"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="RelacaoAbdomemPeito"
                            label="Relação Abdomem Peito"
                            prepend-icon="mdi-text-box-edit"
                        />
                    </v-banner>
                    <v-banner
                        outlined
                        class="mb-3"
                    >
                        <v-subheader>Medidas Superior</v-subheader>
                        
                        <v-text-field
                            v-model="Ombro"
                            label="Ombro"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="Peito"
                            label="Peito"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="BracoDireito"
                            label="Braço Direito"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="BracoEsquerdo"
                            label="Braço Esquerdo"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="Cintura"
                            label="Cintura"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="Abdomem"
                            label="Abdomem"
                            prepend-icon="mdi-text-box-edit"
                        />
                    </v-banner>
                    <v-banner
                        outlined
                        class="mb-3"
                    >
                        <v-subheader>Medidas Inferior</v-subheader>

                        <v-text-field
                            v-model="PernasInferiores"
                            label="Pernas++"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="PernaDireita"
                            label="Perna Direita"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="PernaEsquerda"
                            label="Perna Esquerda"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="PanturilhaDireita"
                            label="Panturilha Direita"
                            prepend-icon="mdi-text-box-edit"
                        />
                        <v-text-field
                            v-model="PanturilhaEsquerda"
                            label="Panturilha Esquerda"
                            prepend-icon="mdi-text-box-edit"
                        />
                    </v-banner>
                </v-form>
            </template>
            <template v-slot:actions >
              <v-spacer/>
              <v-btn
                  outlined
                  large
                  color="green"
                  class="mr-2 mb-2"
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
    name: 'CreateAvaliacaoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,

        Id: null,
        Ativo: null,
        Descricao: null,
        TreinoKcal: null,
        Cardio: null,
        DataAvaliacaoEnvio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
        DataAvaliacaoRetorno: null,
        Peso: null,
        MassaMuscular: null,
        IdadeCorporal: null,
        Imc: null,
        GorduraCorporal: null,
        GorduraVisceral: null,
        MetabolismoBasal: null,
        Pernas: null,
        KgMassaMagra: null,
        KgGordura: null,
        RelacaoAbdomemOmbro: null,
        RelacaoAbdomemPeito: null,
        Ombro: null,
        Peito: null,
        BracoDireito: null,
        BracoEsquerdo: null,
        Cintura: null,
        Abdomem: null,
        PernasInferiores: null,
        PernaDireita: null,
        PernaEsquerda: null,
        PanturilhaDireita: null,
        PanturilhaEsquerda: null,

        UsuarioId: null,
        EmpresaId: null
    }),

    methods: {
        close() {
            this.localDialog = !this.localDialog
        },

        DataRetorno(retorno){
            this.DataAvaliacaoEnvio = retorno
        },

        LimparCampos() {
            this.Id = null
            this.Ativo = null
            this.Descricao = null
            this.TreinoKcal = null
            this.Cardio = null
            this.Peso = null
            this.MassaMuscular = null
            this.IdadeCorporal = null
            this.Imc = null
            this.GorduraCorporal = null
            this.GorduraVisceral = null
            this.MetabolismoBasal = null
            this.Pernas = null
            this.KgMassaMagra = null
            this.KgGordura = null
            this.RelacaoAbdomemOmbro = null
            this.RelacaoAbdomemPeito = null
            this.Ombro = null
            this.Peito = null
            this.BracoDireito = null
            this.BracoEsquerdo = null
            this.Cintura = null
            this.Abdomem = null
            this.PernasInferiores = null
            this.PernaDireita = null
            this.PernaEsquerda = null
            this.PanturilhaDireita = null
            this.PanturilhaEsquerda = null

            this.UsuarioId = null
            this.EmpresaId = null
        },

        BuscarPorId() {
            this.loader = !this.loader;
            
            this.RequestGet('Avaliacao/'+this.dados,
            (retorno) => {
                this.Id = retorno.data.id,
                this.Ativo = retorno.data.ativo,
                this.Descricao = retorno.data.descricao,
                this.TreinoKcal = retorno.data.treinoKcal,
                this.Cardio = retorno.data.cardio,
                this.DataAvaliacaoRetorno = retorno.data.data,
                this.Peso = retorno.data.peso,
                this.MassaMuscular = retorno.data.massaMuscular,
                this.IdadeCorporal = retorno.data.idadeCorporal,
                this.Imc = retorno.data.imc,
                this.GorduraCorporal = retorno.data.gorduraCorporal,
                this.GorduraVisceral = retorno.data.gorduraViceral,
                this.MetabolismoBasal = retorno.data.metabolismoBasal,
                this.Pernas = retorno.data.pernas,
                this.KgMassaMagra = retorno.data.kgMassaMagra,
                this.KgGordura = retorno.data.kgGordura,
                this.RelacaoAbdomemOmbro = retorno.data.relacaoAbdomenOmbro,
                this.RelacaoAbdomemPeito = retorno.data.relacaoAbdomenPeito,
                this.Ombro = retorno.data.ombro,
                this.Peito = retorno.data.peito,
                this.BracoDireito = retorno.data.bracoDireito,
                this.BracoEsquerdo = retorno.data.brasoEsquerdo,
                this.Cintura = retorno.data.cintura,
                this.Abdomem = retorno.data.abdomen,
                this.PernasInferiores = retorno.data.pernasInferiores,
                this.PernaDireita = retorno.data.pernaDireita,
                this.PernaEsquerda = retorno.data.pernaEsquerda,
                this.PanturilhaDireita = retorno.data.panturilhaDireita,
                this.PanturilhaEsquerda = retorno.data.panturilhaEsquerda,
                this.UsuarioId = retorno.data.usuarioId
                this.EmpresaId = retorno.data.empresaId
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
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
            
            this.RequestPost('Avaliacao', this.MontarObjeto(0),
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Avaliação salva com sucesso.", "success")
                this.$emit("AvaliacaoSalva", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Alterar() {
            this.loader = !this.loader;

            this.RequestPut('Avaliacao', this.MontarObjeto(this.Id),
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Avaliação salva com sucesso.", "success")
                this.$emit("AvaliacaoSalva", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        MontarObjeto (id) {

            debugger
            this.DataAvaliacaoEnvio = this.DataAvaliacaoEnvio == null ? this.DataAvaliacaoRetorno : this.DataAvaliacaoEnvio

            return {
                id: id,
                ativo: this.Ativo,
                descricao: this.Descricao,
                metabolismoBasal: this.MetabolismoBasal,
                treinoKcal: this.TreinoKcal,
                cardio: this.Cardio,
                data: this.ParseDate(this.DataAvaliacaoEnvio),
                peso: this.Peso,
                massaMuscular: this.MassaMuscular,
                idadeCorporal: this.IdadeCorporal,
                imc: this.Imc,
                gorduraCorporal: this.GorduraCorporal,
                gorduraViceral: this.GorduraVisceral,
                pernas: this.Pernas,
                kgMassaMagra: this.KgMassaMagra,
                kgGordura: this.KgGordura,
                relacaoAbdomenOmbro: this.RelacaoAbdomemOmbro,
                relacaoAbdomenPeito: this.RelacaoAbdomemPeito,
                ombro: this.Ombro,
                peito: this.Peito,
                bracoDireito: this.BracoDireito,
                brasoEsquerdo: this.BracoEsquerdo,
                cintura: this.Cintura,
                abdomen: this.Abdomem,
                pernasInferiores: this.PernasInferiores,
                pernaDireita: this.PernaDireita,
                pernaEsquerda: this.PernaEsquerda,
                panturilhaDireita: this.PanturilhaDireita,
                panturilhaEsquerda: this.PanturilhaEsquerda,
                usuarioId: this.UsuarioId,
                empresaId: this.EmpresaId
            }
        }
    },

    watch: {
        dialog() {
            this.LimparCampos()
            debugger

            this.localDialog = true
            this.UsuarioId = this.RecebeUsuarioId
            this.EmpresaId = this.RecebeEmpresaId
            this.Ativo = true

            if (this.dados != null)
                this.BuscarPorId()

        }
    },

    props: {
        dialog: Boolean,
        dados: Object,
        RecebeUsuarioId: Number,
        RecebeEmpresaId: Number
    }
}
</script>

<style>
    .v-card__text {
        width: 100%;
        padding-bottom: 0px !important;
    }
</style>