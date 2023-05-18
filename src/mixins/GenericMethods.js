export default {
    data: () => ({
        alerta: false,
        textoAlerta: "",
        tipoAlerta: "",
        loader: false,
        dialog: false,
        search: '',
        sortBy: 'Id',
        sortDesc: true,
        flagAutoComplete: false,
        dados: null,
        required: {
            required: value => !!value || 'Campo Obrigatório.',
        },
    }),

    methods: {
        EnableAlert(texto, tipoAlerta) {
            this.alerta = true
            this.tipoAlerta = tipoAlerta
            this.textoAlerta = texto

            setTimeout(() => {
                this.alerta = false
            }, 3500)
        },

        RetornaSimNao(item) {
            return item ? "Sim" : "Não"
        },

        RetornaTrueFalse(item) {
            return item == 'Sim'
        },

        RetornoErro(error) {
            debugger
            let retorno = error.response == undefined || error.response.status == 401 ? error.message : error.response.data

            this.EnableAlert(retorno, "error")
            console.log(error)
        },

        MudarCor(item) {
            return item == "Sim" ? 'color: green;' : 'color: red;'
        },
    },
}