const constraints = {
    name: {
        presence: {
            allowEmpty: false,
            message: "deve ser informado",
        },
        type: {
            type: "string",
            message: "deve ser uma string",
        },
        length: {
            maximum: 50,
            message: "deve ter no máximo 50 caracteres",
        },
    },
    category: {
        presence: {
            allowEmpty: false,
            message: "deve ser informada",
        },
        type: {
            type: "string",
            message: "deve ser uma string",
        },
    },
    price: {
        presence: {
            allowEmpty: false,
            message: "deve ser informado",
        },
        numericality: {
            greaterThan: 0,
            message: "deve ser maior que zero",
        },
    },
    stock: {
        presence: {
            allowEmpty: false,
            message: "deve ser informado",
        },
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0,
            message: "deve ser um número inteiro não negativo",
        },
    },
    description: {
        type: {
            type: "string",
            message: "deve ser uma string",
        },
    },
    photoStrings: {
        presence: {
            message: "deve ser informado",
        },
        type: {
            type: "string",
            message: "deve ser uma string",
        },
    },
};

module.exports = constraints;
