import { validate } from "~/middleware/validate";
import { APIhandler } from "~/utils/types";
import exampleValidation from "~/validations/example";

// This is the route "{prefix}/example/validation"

// Declare the prehandlers where all the process hapends before the main handler
// This is usually used to prepare data, do validation, authentificate users to
// Reduce the ammount of code you have to write in the main handler
// WARNING: the order of how you arrange the preHandlers matters!!!
export const preHandlers: APIhandler<any>[] = [
    // Validation function that takes in a schema parameter
    validate(
        // Schema parameter that can be found at src/validation/example
        exampleValidation.example
    ),
];

// Declare the main handler where all the process happends
// This always runs after preHandlers have been ran asynchronously
// You can pass generics into the APIhandler interface to declare the type of the:
// body, query, params, and append extra values to req (in case you do that in the prehandlers)
// Optionally you can pass the res type as well which is the type of the response
export const handler: APIhandler<{
    // Addons are extra values to req that can be passed from the prehandlers
    req: {
        user_id: number; // req.user_id
    };
    // Body declaration
    body: {
        email: string; // req.body.email
        optional_number?: number; // req.body?.optional_number
    };
    // Query declaration
    query: {
        test?: string; // req.query.test
    };
}> = async (req, res, throwerr) => {
    res.status(200).json({
        message: "Hello world",
        your_email: req.body.email,
        query: req.query.test || "No Query",
    });
};
