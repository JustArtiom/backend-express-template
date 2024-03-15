import { APIhandler } from "~/utils/types";

// This is the route "{prefix}/example/:dynamic_route"

// This is the main handler where the request process happends
// For typescript support you can pass generics to the interface to make it compatible with your code
export const handler: APIhandler<{
    // Define the parameter for the dynamic route
    params: {
        dynamic_route: string;
    };
}> = async (req, res, throwerr) => {
    res.status(200).json({
        dynamic_route: req.params.dynamic_route,
    });
};
