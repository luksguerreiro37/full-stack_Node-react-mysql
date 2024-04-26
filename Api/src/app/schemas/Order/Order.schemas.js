const validate = require("validate.js");
const constraints = require("./Constraints");

class OrderSchemas {
    createOrderSchema(name, quantity) {
        const orderData = { name, quantity };
        const isInvalid = validate(orderData, constraints);
        return isInvalid;
    }
}

module.exports = new OrderSchemas();
