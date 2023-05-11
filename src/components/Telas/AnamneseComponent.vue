<template>
  <div>
    <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
    <load-component :Ativo="loader"/>
    <card-padrao-component>
      <template v-slot:titulo>
        Anamnese
      </template>
      <template v-slot:texto>
        <v-form
          ref="form"
          lazy-validation
          class="px-4 mt-3"
        >
        <!-- Ficha de Anamnese -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader>Ficha de Anamnese</v-subheader>
            <v-text-field
              v-model="Nome"
              label="Nome Completo"
              required
              prepend-icon="mdi-text-box-edit"
            />
            <data-pickers-component v-model="DataNascimento" titulo="Data de Nascimento"/>
            <v-select
                v-model="GeneroSelect"
                :items="Genero"
                label="Genero"
                prepend-icon="mdi-list-box"
            />
            <v-text-field
              v-model="Ocupacao"
              label="Ocupacao"
              required
              prepend-icon="mdi-text-box-edit"
            />
            <v-textarea
              v-model="Objetivo"
              label="Objetivo"
              required
              prepend-icon="mdi-text-box-edit"
            />
        </v-banner>
        <!-- Histórico Clínico -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">Histórico Clínico</v-subheader>
          <v-row>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Hipertensao"
                label="Hipertensão"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Diabetes"
                label="Diabetes"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="7"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Hipotireoidismo"
                label="Hipotireoidismo"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="4"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="PreDiabetes"
                label="Pré Diabetes"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Dislipdemia"
                label="Dislipdemia"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Ansiedade"
                label="Ansiedade"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="DoencaRenalCronica"
                label="Doença Renal Crônica"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="DoencasRespiratarias"
                label="Doenças Respiratórias"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="4"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Colite"
                label="Colite"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Hipotireoidismo"
                label="Hipotireoidismo"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="Triglicerides"
                label="Triglicérides"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="TranstornosAlimentares"
                label="Transtornos Alimentares"
              ></v-checkbox>
            </v-col>
            <v-col 
              cols="6"
              md="3"
            >
              <v-checkbox
                class="pl-3"
                v-model="DoencasCardiovasculares"
                label="Doenças Cardiovasculares"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-banner>
        <!-- É Fumante? -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">É Fumante?</v-subheader>
          <v-row>
            <v-radio-group v-model="Fumante" row>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Sim" :value="1"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Não" :value="0"></v-radio>
              </v-col>
            </v-radio-group>
          </v-row>
        </v-banner>
        <!-- Bebida alcoólica? -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">Bebida alcoólica?</v-subheader>
          <v-row>
            <v-radio-group v-model="BebidaAlcoolica" row>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Sim" :value="1"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Não" :value="0"></v-radio>
              </v-col>
            </v-radio-group>
          </v-row>
        </v-banner>
        <!-- Pratica atividade física? -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">Pratica atividade física?</v-subheader>
          <v-row>
            <v-radio-group v-model="AtividadeFisica" row>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Sim" :value="1"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Não" :value="0"></v-radio>
              </v-col>
            </v-radio-group>
            <v-col
                cols="12"
                md="6"
                v-if="AtividadeFisica==1"
              >
                <v-textarea
                  v-model="localNomeCompleto"
                  label="Qual a frequencia?"
                  required
                  prepend-icon="mdi-text-box-edit"
                />
              </v-col>
          </v-row>
        </v-banner>
        <!-- Qual é sua qualidade do sono? -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">Qual é sua qualidade do sono?</v-subheader>
          <v-row>
            <v-radio-group v-model="QualidadeSono" row>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Muito Ruim" :value="0"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Ruim" :value="1"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Normal" :value="2"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Boa" :value="3"></v-radio>
              </v-col>
            </v-radio-group>
          </v-row>
        </v-banner>
        <!-- Quantas horas você costuma dormir? -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">Quantas horas você costuma dormir?</v-subheader>
          <v-row>
            <v-radio-group v-model="HorasDormir" row>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Mais que 9 horas" :value="0"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Entre 7 e 9 horas" :value="1"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Entre 4 e 7 horas" :value="2"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="3">
                <v-radio label="Menos que 4 horas" :value="3"></v-radio>
              </v-col>
            </v-radio-group>
          </v-row>
        </v-banner>
        <!-- Faz uso de medicamentos ou suplementos? -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">Faz uso de medicamentos ou suplementos?</v-subheader>
          <v-row>
            <v-radio-group v-model="MedicamentosSuplementos" row>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Sim" :value="1"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Não" :value="0"></v-radio>
              </v-col>
            </v-radio-group>
            <v-col
                cols="12"
                md="6"
                v-if="MedicamentosSuplementos==1"
              >
                <v-textarea
                  v-model="localNomeCompleto"
                  label="Qual?"
                  required
                  prepend-icon="mdi-text-box-edit"
                />
              </v-col>
          </v-row>
        </v-banner>
        <!-- Realizou algum procedimento cirúrgico? -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-5">Realizou algum procedimento cirúrgico?</v-subheader>
          <v-row>
            <v-radio-group v-model="ProcedimentoCirurgico" row>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Sim" :value="1"></v-radio>
              </v-col>
              <v-col 
                cols="6"
                md="6">
                <v-radio label="Não" :value="0"></v-radio>
              </v-col>
            </v-radio-group>
            <v-col
                cols="12"
                md="6"
                v-if="ProcedimentoCirurgico==1"
              >
                <v-textarea
                  v-model="localNomeCompleto"
                  label="Qual?"
                  required
                  prepend-icon="mdi-text-box-edit"
                />
              </v-col>
          </v-row>
        </v-banner>
        <!-- PadraoAlimentar -->
        <v-banner
          outlined
          class="mb-5"
        >
          <v-subheader class="mb-3">Padrão Alimentar</v-subheader>
          <!-- Possui alergia a algum alimento? -->
          <v-banner
            outlined
            class="mb-5"
          >
            <v-subheader class="mb-3">Possui alergia a algum alimento?</v-subheader>
            <v-row>
              <v-radio-group v-model="AlergiaAlimento" row>
                <v-col 
                  cols="6"
                  md="6">
                  <v-radio label="Sim" :value="1"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="6">
                  <v-radio label="Não" :value="0"></v-radio>
                </v-col>
              </v-radio-group>
              <v-col
                  cols="12"
                  md="6"
                  v-if="AlergiaAlimento==1"
                >
                  <v-textarea
                    v-model="localNomeCompleto"
                    label="Qual?"
                    required
                    prepend-icon="mdi-text-box-edit"
                  />
                </v-col>
            </v-row>
          </v-banner>
          <!-- Como você classifica o seu apetite? -->
          <v-banner
            outlined
            class="mb-5"
          >
            <v-subheader class="mb-3">Como você classifica o seu apetite?</v-subheader>
            <v-row>
              <v-radio-group v-model="ClassificacaoApetite" row>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Baixo" :value="0"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Normal" :value="1"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Aumentado" :value="2"></v-radio>
                </v-col>
              </v-radio-group>
            </v-row>
          </v-banner>
          <!-- Qual é a cadência de sua mastigação? -->
          <v-banner
            outlined
            class="mb-5"
          >
            <v-subheader class="mb-3">Qual é a cadência de sua mastigação?</v-subheader>
            <v-row>
              <v-radio-group v-model="Mastigacao" row>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Como devagar" :value="0"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Normal" :value="1"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Como rápido" :value="2"></v-radio>
                </v-col>
              </v-radio-group>
            </v-row>
          </v-banner>
          <!-- Quem prepara as refeições na sua casa? -->
          <v-banner
            outlined
            class="mb-5"
          >
            <v-subheader class="mb-3">Quem prepara as refeições na sua casa?</v-subheader>
            <v-row>
              <v-col
                cols="6"
                md="3"
              >
                <v-checkbox
                  class="pl-3"
                  v-model="checkbox"
                  label="Eu preparo"
                ></v-checkbox>
              </v-col>
              <v-col
                cols="6"
                md="3"
              >
                <v-checkbox
                  class="pl-3"
                  v-model="checkbox"
                  label="Outra pessoa prepara"
                ></v-checkbox>
              </v-col>
              <v-col
                cols="6"
                md="3"
              >
                <v-checkbox
                  class="pl-3"
                  v-model="checkbox"
                  label="Eu compro"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-banner>
          <!-- Você tem o hábito de comer fora? -->
          <v-banner
            outlined
            class="mb-5"
          >
            <v-subheader class="mb-3">Você tem o hábito de comer fora?</v-subheader>
            <v-row>
              <v-radio-group v-model="ComeFoma" row>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="Não tenho" :value="0"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="Algumas vezes por mês" :value="1"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="Toda semana" :value="2"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="Todos os dias" :value="3"></v-radio>
                </v-col>
              </v-radio-group>
            </v-row>
          </v-banner>
        </v-banner>
        <!-- Hábito Intestinal e urinário -->
        <v-banner
            outlined
            class="mb-5"
        >
          <v-subheader class="mb-3">Hábito Intestinal e urinário</v-subheader>
          <!-- Frequência de defecação? -->
          <v-banner
            outlined
            class="mb-5"
          >
            <v-subheader class="mb-3">Frequência de defecação?</v-subheader>
            <v-row>
              <v-radio-group v-model="Defecacao" row>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="1 vez ao dia" :value="0"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="Mais de 1 vez ao dia" :value="1"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="1 a 3 vezes ao dia" :value="2"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="3">
                  <v-radio label="1 vez a cada 2 dias" :value="3"></v-radio>
                </v-col>
              </v-radio-group>
            </v-row>
          </v-banner>
          <!-- Frequência do hábito urinário? -->
          <v-banner
            outlined
            class="mb-5"
          >
            <v-subheader class="mb-3">Frequência do hábito urinário?</v-subheader>
            <v-row>
              <v-radio-group v-model="HabitoUrinario" row>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="1 a 3 vezes ao dia" :value="0"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Mais de 3 vezes ao dia" :value="1"></v-radio>
                </v-col>
                <v-col 
                  cols="6"
                  md="4">
                  <v-radio label="Menos de 1 vez a cada 2 dias" :value="2"></v-radio>
                </v-col>
              </v-radio-group>
            </v-row>
          </v-banner>
        </v-banner>
        <!-- Histórico de Doenças Familiares -->
        <v-banner
            outlined
            class="mb-5"
        >
          <v-subheader class="mb-3">Histórico de Doenças Familiares</v-subheader>
          <v-row>
            <v-col
              cols="10"
              md="12"
            >
              <v-textarea
                v-model="localNomeCompleto"
                label="Resposta"
                required
                prepend-icon="mdi-text-box-edit"
              />
            </v-col>
          </v-row>
        </v-banner>
        <!-- Qual seu objetivo, ou meta para nosso plano? -->
        <v-banner
            outlined
            class="mb-5"
        >
          <v-subheader class="mb-3">Qual seu objetivo, ou meta para nosso plano?</v-subheader>
          <v-row>
            <v-col
              cols="10"
              md="12"
            >
              <v-textarea
                v-model="localNomeCompleto"
                label="Resposta"
                required
                prepend-icon="mdi-text-box-edit"
              />
            </v-col>
          </v-row>
        </v-banner>
        <!-- Tem alguma observação para fazer em relação a dieta, saúde e exercicío? -->
        <v-banner
            outlined
            class="mb-5"
        >
          <v-subheader class="my-3">Tem alguma observação para fazer em relação a dieta, saúde e exercicío?</v-subheader>
          <v-row>
            <v-col
              cols="10"
              md="12"
            >
              <v-textarea
                v-model="localNomeCompleto"
                label="Resposta"
                required
                prepend-icon="mdi-text-box-edit"
              />
            </v-col>
          </v-row>
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
          <v-icon left> mdi-check-bold </v-icon>
          Salvar
        </v-btn>
      </template>
    </card-padrao-component>
  </div>
  
</template>

<script>

import GenericMethods from '@/mixins/GenericMethods';
import AlertComponent from '../Fields/AlertComponent.vue'
import CardPadraoComponent from '../Fields/CardPadraoComponent.vue'
import LoadComponent from '../Fields/LoadComponent.vue';
import DataPickersComponent from '../Fields/DataPickersComponent.vue';
export default {
  components: { CardPadraoComponent, AlertComponent, LoadComponent, DataPickersComponent },
    name: 'AnamneseComponent',
    mixins: [GenericMethods],
    data:() => ({
      Fumante: null,
      AtividadeFisica: null,
      MedicamentosSuplementos: null,
      ProcedimentoCirurgico: null,
      AlergiaAlimento: null,
      GeneroSelect: null,

      Nome: null,
      DataNascimento: null,
      GeneroSelect: null,
      Ocupacao: null,
      Objetivo: null,

      Hipertensao: null,
      Diabetes: null,
      Hipotireoidismo: null,
      PreDiabetes: null,
      Dislipdemia: null,
      Ansiedade: null,
      DoencaRenalCronica: null,
      DoencasRespiratarias: null,
      Colite: null,
      Hipotireoidismo: null,
      Triglicerides: null,
      TranstornosAlimentares: null,
      DoencasCardiovasculares: null,

      Genero: [ "Masculino", "Feminino" ]
    }),

    methods: {
      Salvar() {
        this.loader = !this.loader
        this.EnableAlert("Anamnese salva com sucesso.", "success")
        this.loader = !this.loader
      },

      VerificarSimNaoCheckbox(Sim, Nao) {
        debugger
        if (Sim == true && Nao == true) {
          this.Nao = false
        }

        var teste = this.Fumante
        var teste1 = this.FumanteNao
      }
    }
}
</script>

<style scoped>
  .v-input--selection-controls.v-input {
    padding: 0px 10px !important;
    margin: 0px !important;
  }
</style>