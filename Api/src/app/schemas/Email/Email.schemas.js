const validate = require("validate.js");
const constraints = require("./Constraints");

class EmailSchemas {
    validateEmail(email) {
        const emailData = { mail: email };
        const validationResult = validate(emailData, constraints);
        if (validationResult) {
            return validationResult.mail[0];
        }
        return null;
    }
}

module.exports = new EmailSchemas();
