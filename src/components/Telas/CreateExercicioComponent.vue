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
                        v-model="Descricao"
                        label="Descrição"
                        prepend-icon="mdi-text-box-edit"
                        required
                        :rules="[() => !!Descricao || 'Campo Obrigatório']"
                    />
                    <v-text-field
                        v-model="Serie"
                        label="Séries"
                        prepend-icon="mdi-text-box-edit"
                        required
                        :rules="[() => !!Serie || 'Campo Obrigatório']"
                    />
                    <v-text-field
                        v-model="TempoDescanso"
                        label="Tempo Descanso"
                        prepend-icon="mdi-text-box-edit"
                        required
                        :rules="[() => !!TempoDescanso || 'Campo Obrigatório']"
                    />
                    <v-text-field
                        v-model="Repeticoes"
                        label="Repetições"
                        prepend-icon="mdi-text-box-edit"
                        required
                        :rules="[() => !!Repeticoes || 'Campo Obrigatório']"
                    />
                    <v-textarea
                        v-model="Tecnica"
                        label="Técnica"
                        prepend-icon="mdi-text-box-edit"
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
export default {
    components: { AlertComponent, LoadComponent, DialogPersistentComponent },
    name: 'CreateExercicioComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        localDialog: false,

        Id: null,
        Descricao: null,
        Serie: null,
        TempoDescanso: null,
        Repeticoes: null,
        Tecnica: null,
        Ativo: true,
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
            
            this.RequestPost('Exercicio',
            {
                ativo: this.Ativo,
                descricao: this.Descricao,
                serie: this.Serie,
                tempoDescanso: this.TempoDescanso,
                repeticoes: this.Repeticoes,
                tecnica: this.Tecnica,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Exercicio salvo com sucesso.", "success")
                this.$emit("ExercicioSalvo", true)
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        Alterar() {
            this.loader = !this.loader;

            this.RequestPut('Exercicio',
            {
                id: this.dados.Id,
                ativo: this.Ativo,
                descricao: this.Descricao,
                serie: this.Serie,
                tempoDescanso: this.TempoDescanso,
                repeticoes: this.Repeticoes,
                tecnica: this.Tecnica,
                empresaId: 2
            },
            (retorno) => {
                this.localDialog = !this.localDialog
                this.EnableAlert("Exercicio salvo com sucesso.", "success")
                this.$emit("ExercicioSalvo", true)
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
            this.Serie = null
            this.TempoDescanso = null
            this.Repeticoes = null
            this.Tecnica = null

            if (this.dados != null) {
                this.Id = this.dados.Id
                this.Descricao = this.dados.Descricao
                this.Serie = this.dados.Serie
                this.TempoDescanso = this.dados.TempoDescanso
                this.Repeticoes = this.dados.Repeticoes
                this.Tecnica = this.dados.Tecnica
                this.Ativo = this.RetornaTrueFalse(this.dados.Ativo)
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