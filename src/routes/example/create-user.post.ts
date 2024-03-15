import { validate } from "~/middleware/validate";
import prisma, { isUniqueConstantViolation } from "~/utils/db";
import ErrorBuilder from "~/utils/errors";
import { APIhandler } from "~/utils/types";
import exampleValidation from "~/validations/example";

// This is just an EXAMPLE OF ENDPOINT
// This is the route "{prefix}/example/create-user"

// Declare the prehandlers where all the process hapends before the main handler
// This is usually used to prepare data, do validation, authentificate users to
// Reduce the ammount of code you have to write in the main handler
// WARNING: the order of how you arrange the preHandlers matters!!!
export const preHandlers: APIhandler<any>[] = [
    // Validation function that takes in a schema parameter
    validate(
        // Schema parameter that can be found at src/validation/example
        exampleValidation.create_user
    ),
];

// Declare the main handler where all the process happends
// This always runs after preHandlers have been ran asynchronously
// You can pass generics into the APIhandler interface to declare the type of the:
// body, query, params, and append extra values to req (in case you do that in the prehandlers)
// Optionally you can pass the res type as well which is the type of the response
export const handler: APIhandler<{
    body: {
        username: string;
    };
}> = async (req, res, throwerr) => {
    // Make a query request to the database to create a new user
    const dbresp = await prisma.users
        .create({
            data: {
                username: req.body.username,
            },
        })
        .catch((err) => ({ error: true, data: err }));

    // Catch errors in case there are any
    if ("error" in dbresp) {
        // Check if maybe the username was already taken since usernames are unique
        if (isUniqueConstantViolation(dbresp.data))
            return throwerr(
                new ErrorBuilder(1003)
                    .setMessage("Username already taken")
                    .build()
            );
        else return throwerr(new ErrorBuilder(1001).build());
    }

    // If everything is successful, return the status and the information
    res.status(200).json(dbresp);
};
