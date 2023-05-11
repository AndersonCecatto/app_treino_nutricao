<template>
    <div>
        <alert-component :texto-alerta="textoAlerta" :tipo='tipoAlerta' v-if="alerta == true"/>
        <v-container class="text-center">
            <v-row class="text-center">
                <v-col cols="12" 
                    sm="1"
                    xs="1"
                    md="3"
                    />
                <v-col cols="12"
                    md="6"
                    xs="10"
                    sm="10"
                >
                    <v-card
                        elevation="5"
                        class="px-6 top"
                        xs="top-mobile"
                        sm="top-mobile"
                    >
                        <v-card-title >Faça seu Login</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form
                                    ref="form" 
                                    lazy-validation
                                >
                                    <v-row class="px-6">
                                        <v-text-field
                                        v-model="usuario"
                                        label="Email"
                                        type="email"
                                        :rules="emailRules"
                                        required
                                        prepend-icon="mdi-account-check"
                                        />
                                    </v-row>
                                    <v-row  class="px-6 xs-6">
                                        <v-text-field
                                            v-model="senha"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="required"
                                            :type="show1 ? 'text' : 'password'"
                                            label="Senha"
                                            counter
                                            required
                                            @click:append="show1 = !show1"
                                            prepend-icon="mdi-lock-check"
                                        ></v-text-field>
                                    </v-row>
                                </v-form>
                                <v-row class="px-6 pt-6">
                                    <v-btn
                                        outlined
                                        large
                                        block
                                        color="green"
                                        @click="Logar()"
                                        >
                                        <v-icon left>
                                            mdi-login
                                        </v-icon>
                                        Continuar
                                    </v-btn>
                                </v-row>
                                <v-row>
                                    <v-col >
                                        <!-- lugar que vai os botoes para login Google, Apple -->
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <load-component :Ativo="loader"/>
    </div>
</template>

<script>
export default {
    name: "LoginComponent",
    data: () => ({
        login: null,
        senha: null,
        loader: false,
        required: [
            v => !!v || 'Campo Obrigatório'
        ],
    }),

    methods: {
        Logar() {
            if (!this.$refs.form.validate())
                return

                this.loader = !this.loader;
            ('Teste')
        }
    }
}
</script>
    
<style>
    .top {
        margin-top: 25% !important;
    }
</style>