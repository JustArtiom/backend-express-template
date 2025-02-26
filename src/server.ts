import "dotenv/config";
import { app } from ".";

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
