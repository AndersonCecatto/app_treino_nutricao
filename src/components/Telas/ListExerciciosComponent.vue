<template>
  <div>
    <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
    <load-component :Ativo="loader"/>
    <card-padrao-component>
        <template v-slot:titulo>
            <div>
                <v-icon class="mx-3">
                    mdi-run
                </v-icon>
                Exercicios
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
                @click="CriarExercicio()"
                >
                Novo
            </v-btn>
        </template>
        <template v-slot:texto>
            <v-data-table
                :headers="headers"
                :items="exercicios"
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
                <template v-slot:item.Descricao="{ item }">
                    <td class="font-weight-black">{{ item.Descricao }}</td>
                </template>
                <template v-slot:item.Serie="{ item }">
                    <td class="font-weight-black">{{ item.Serie }}</td>
                </template>
                <template v-slot:item.TempoDescanso="{ item }">
                    <td class="font-weight-black">{{ item.TempoDescanso }}</td>
                </template>
                <template v-slot:item.Repeticoes="{ item }">
                    <td class="font-weight-black">{{ item.Repeticoes }}</td>
                </template>
                <template v-slot:item.Tecnica="{ item }">
                    <td class="font-weight-black">{{ item.Tecnica }}</td>
                </template>
                <template v-slot:item.Ativo="{ item }">
                    <td class="font-weight-black" :style="MudarCor(item.Ativo)" >{{ item.Ativo }}</td>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        color="primary"
                        class="mr-3"
                        large
                        @click="EditarExercicio(item)"
                    >
                        mdi-text-box-edit
                    </v-icon>
                </template>
            </v-data-table>
        </template>
    </card-padrao-component>
    <create-exercicio-component
        :dialog="dialog"
        :dados="dados"
        @ExercicioSalvo="ExercicioSalvo"
    />
  </div>
</template>

<script>
import GenericMethods from '@/mixins/GenericMethods'
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue'
import RequestMethods from '@/mixins/RequestMethods'
import CreateExercicioComponent from './CreateExercicioComponent.vue'
export default {
    components: { AlertComponent, LoadComponent, CardPadraoComponent, CreateExercicioComponent },
    name: 'ListExerciciosComponent',
    mixins: [GenericMethods, RequestMethods],
    data: () => ({
        headers: [
            { text: '', value: 'Id', align: ' d-none'},
            { text: '', value: 'EmpresaId', align: ' d-none'},
            { text: 'Descrição', value: 'Descricao'},
            { text: 'Série', value: 'Serie'},
            { text: 'Tempo Descanso', value: 'TempoDescanso'},
            { text: 'Repetições', value: 'Repeticoes'},
            { text: 'Tecnica', value: 'Tecnica'},
            { text: 'Ativo', value: 'Ativo', },
            { text: 'Ações', value: 'actions', align: 'right', sortable: false },
        ],
        exercicios: []
    }),

    methods: {
        BuscarExercicios() {
            this.loader = !this.loader;
            
            this.RequestGet('Exercicio/EmpresaId/'+2+'/TipoBusca/1',
            (retorno) => {
                this.exercicios = []
                retorno.data.forEach(element => {
                    this.exercicios.push({
                        Id: element.id,
                        Descricao: element.descricao,
                        Serie: element.serie,
                        TempoDescanso: element.tempoDescanso,
                        Repeticoes: element.repeticoes,
                        Tecnica: element.tecnica,
                        EmpresaId: element.empresaId,
                        Ativo: this.RetornaSimNao(element.ativo)
                    })
                });
            }, 
            (error) => this.RetornoErro(error),
            () => (this.loader = !this.loader))
        },

        EditarExercicio(item) {
            this.dados = item
            this.dialog = !this.dialog
        },

        CriarExercicio() {
            this.dados = null
            this.dialog = !this.dialog
        },

        ExercicioSalvo(retorno) {
            if (retorno == true)
                this.BuscarExercicios()
        },
    },

    created() {
        this.BuscarExercicios()
    }
}
</script>

<style>

</style>