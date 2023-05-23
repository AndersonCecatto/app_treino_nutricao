<template>
  <div>
    <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
    <load-component :Ativo="loader"/>
    <dialog-persistent-component
        tamanho="600"
        titulo="Cadastrar Alimento"
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
                    v-model="Quantidade"
                    label="Quantidade"
                    prepend-icon="mdi-text-box-edit"
                    required
                    :rules="[() => !!Quantidade || 'Campo Obrigatório']"
                />
                <v-select
                    v-model="Medida"
                    :items="ListMedidas"
                    label="Medidas"
                    prepend-icon="mdi-text-box-edit"
                ></v-select>
                <v-textarea
                    v-model="Observacao"
                    label="Observações"
                    prepend-icon="mdi-text-box-edit"
                />
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
import DialogPersistentComponent from '../Fields/DialogPersistentComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
export default {
    components: { AlertComponent, LoadComponent, DialogPersistentComponent },
    name: 'CreateAlimentoComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,
        ListMedidas: [
            '1 - ML', 
            '2 - MG', 
            '3 - G', 
            '4 - KG',
            '5 - Unidade',
            '6 - Litros'
        ],
        Medida: '1 - ML',
        Id: null,
        Quantidade: null,
        Nome: null,
        Observacao: null
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
            
            this.RequestPost('Alimento',
            {
                ativo: this.Ativo,
                nome: this.Nome,
                quantidade: this.Quantidade,
                medida: parseInt(this.Medida.substring(0, this.Medida.indexOf('-')).trimEnd()),
                observacoes: this.Observacao,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Alimento salvo com sucesso.", "success")
                this.$emit("AlimentoSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Alterar() {
            this.loader = !this.loader;
            
            this.RequestPut('Alimento',
            {
                id: this.dados.Id,
                ativo: this.Ativo,
                nome: this.Nome,
                quantidade: this.Quantidade,
                medida: parseInt(this.Medida.substring(0, this.Medida.indexOf('-')).trimEnd()),
                observacoes: this.Observacao,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Alimento salvo com sucesso.", "success")
                this.$emit("AlimentoSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        ConverterMedidas(medida) {
            switch (medida) {
                case 'ML':
                    return '1 - ML'
                case 'MG':
                    return '2 - MG'
                case 'G':
                    return '3 - G'
                case 'KG':
                    return '4 - KG'
                case 'Unidade':
                    return '5 - Unidade'
                case 'Litros':
                    return '6 - Litros'
                default:
                    return null
            }
        }
    },

    watch: {
        dialog() {
            this.localDialog = true

            this.Id = null
            this.Nome = null
            this.Quantidade = null
            this.Medida = '1 - ML'
            this.Observacao = null
            
            if (this.dados != null) {
                debugger
                this.Id = this.dados.Id
                this.Nome = this.dados.Nome
                this.Quantidade = this.dados.Quantidade
                this.Ativo = this.RetornaTrueFalse(this.dados.Ativo)
                this.Medida = this.ConverterMedidas(this.dados.Medida)
                this.Observacao = this.dados.Observacoes
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