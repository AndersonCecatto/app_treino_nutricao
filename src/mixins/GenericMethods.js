export default {
    data: () => ({
        alerta: false,
        textoAlerta: "",
        tipoAlerta: "",
        loader: false,
        dialog: false,
        dialogSimNao: false,
        retornoSimNao: false,
        search: '',
        sortBy: 'Id',
        sortDesc: true,
        flagAutoComplete: false,
        dados: null,
        dateNow: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
        required: {
            required: value => !!value || 'Campo Obrigatório.',
        },
        listStatus: [
            'Todos', 'Ativos', 'Inativos'
        ],
        Status: 'Todos'
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

        ParseDate (date) {
            if (!date) return null

            if (!date.includes('/'))
                return date

            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        FormatDate(date) {
            if (!date) return null

            if (date.includes('T'))
                date = date.substr(0, date.indexOf('T'))

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },

        FiltrarStatus(filtro, retorno) {
            debugger
            if (filtro == 'Todos') 
                return retorno
            else if (filtro == 'Ativos')
                return retorno.filter((x) => x.Ativo == 'Sim')
            else if (filtro == 'Inativos')
                return retorno.filter((x) => x.Ativo == 'Não')
        },
    },
}