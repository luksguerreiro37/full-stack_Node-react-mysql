const validate = require("validate.js");
const constraints = require("./Constraints");

class UserSchemas {
    createUserSchema(mail, password, name, photoString) {
        const userData = { mail, password, name, photoString };
        const isInvalid = validate(userData, constraints);
        return isInvalid;
    }
}

module.exports = new UserSchemas();
