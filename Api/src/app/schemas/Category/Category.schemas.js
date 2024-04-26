const validate = require("validate.js");
const constraints = require("./Constraints");

class CategorySchemas {
    createCategorySchema(name) {
        const categoryData = { name };
        const validationResult = validate(categoryData, constraints);
        return validationResult;
    }
}

module.exports = new CategorySchemas();
