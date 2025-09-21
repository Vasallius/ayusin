import createApp from "./lib/create-app";
import configureOpenAPI from "./lib/openapi-spec";
import index from "./routes/index";

const app = createApp();
configureOpenAPI(app);

app.route("/", index);

export default app;
