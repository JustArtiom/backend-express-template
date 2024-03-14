import Joi from "joi";

const exampleValidation = {
    example: {
        body: {
            str_test: Joi.string().required(),
            optional_number: Joi.number().min(5).max(20),
            email: Joi.string().email().required(),
        },
        query: {
            test: Joi.string(),
        },
    },
    error_showcase: {
        query: {
            example: Joi.string().required(),
        },
    },
    create_user: {
        body: {
            username: Joi.string()
                .min(3)
                .max(64)
                // .alphanum()    // I decided that i will have a regex letting the username have dots and underscores
                .regex(/^[A-Za-z0-9._]+$/, { name: "username characters" })
                .required(),
        },
    },
};

export default exampleValidation;
