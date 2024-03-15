import { validate } from "~/middleware/validate";
import APIerror from "~/utils/APIerror";
import ErrorBuilder from "~/utils/errors";
import { APIhandler } from "~/utils/types";
import exampleValidation from "~/validations/example";

// This is the route "{prefix}/example/errors"

// Declare the prehandlers where all the process hapends before the main handler
// This is usually used to prepare data, do validation, authentificate users to
// Reduce the ammount of code you have to write in the main handler
// WARNING: the order of how you arrange the preHandlers matters!!!
export const preHandlers: APIhandler<any>[] = [
    // Validation function that takes in a schema parameter
    validate(
        // Schema parameter that can be found at src/validation/example
        exampleValidation.error_showcase
    ),
];

// Declare the main handler where all the process happends
// This always runs after preHandlers have been ran asynchronously
// You can pass generics into the APIhandler interface to declare the type of the:
// body, query, params, and append extra values to req (in case you do that in the prehandlers)
// Optionally you can pass the res type as well which is the type of the response
export const handler: APIhandler<{
    query: {
        example: string;
    };
}> = async (req, res, throwerr) => {
    const err_example = parseInt(req.query.example);

    if (!err_example)
        return throwerr(
            new APIerror(new ErrorBuilder(400).build()).return(400)
        );

    switch (err_example) {
        case 1:
            // Create main class that holds the errors
            const apierr = new APIerror();

            // This is the error builder
            // Pass a number in the error builder constructor if you want to use a template
            const error_to_append = new ErrorBuilder(404)
                // Use the next function to update the template
                .setStatus(500)
                .setCode("SOME_ERROR_HAPPEND")
                .setMessage("Here is a custom message")
                // Always call the build function to return a object and not the class
                .build();

            // Append the Build error to the main APIerror class
            apierr.add(error_to_append);

            // "Compile" the api error and return with a main status code that will be the API response status code as well
            const error_to_throw = apierr.return(400);

            // Throw the "compiled" APIerror
            throwerr(error_to_throw);
            return;
        case 2:
            // You can throw the ErrorBuilder as well as it will be passed trough APIerror automatically by the throwerr function
            const error_to_throw2 = new ErrorBuilder(404)
                // Use the next function to update the template
                .setStatus(500)
                .setCode("SOME_ERROR_HAPPEND")
                .setMessage("Here is a custom message")
                // Always call the build function to return a object and not the class
                .build();

            throwerr(error_to_throw2);
            return;
        case 3:
            // multiple errors throw
            // Create main class that holds the errors
            const apierr3 = new APIerror(
                new ErrorBuilder(404).build(),
                new ErrorBuilder(400).build()
            )
                .add(new ErrorBuilder(401).build())
                .add(new ErrorBuilder(409).build())
                // Dont forget to return with the main status code!!!
                .return(402);

            throwerr(apierr3);
            return;
    }

    res.send(200).json({
        message: ":p you requested no error example in the query",
    });
};
