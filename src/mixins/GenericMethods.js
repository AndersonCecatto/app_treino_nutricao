export default {
    data: () => ({
        alerta: false,
        textoAlerta: "",
        tipoAlerta: "",
        loader: false,
        dialog: false,
        search: '',
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
    },
}