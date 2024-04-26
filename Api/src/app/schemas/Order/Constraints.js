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
    },
    quantity: {
        presence: {
            allowEmpty: false,
            message: "deve ser informado",
        },
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            message: "deve ser um número inteiro positivo",
        },
    },
};

module.exports = constraints;