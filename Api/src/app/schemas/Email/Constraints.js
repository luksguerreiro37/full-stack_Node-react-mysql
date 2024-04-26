const constraints = {
    mail: {
        presence: {
            allowEmpty: false,
            message: "deve ser informado",
        },
        type: {
            type: "string",
            message: "deve ser uma string",
        },
        email: {
            email: true,
            message: "deve ser um email válido",
        },
        length: {
            maximum: 255,
            message: "deve ter no máximo 255 carácteres",
        },
    },
};

module.exports = constraints;