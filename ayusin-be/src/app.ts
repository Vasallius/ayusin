import createApp from "./lib/create-app";
import configureOpenAPI from "./lib/openapi-spec";
import index from "./routes/index";
import reports from "./routes/reports/index";
import departments from "./routes/departments/index";

const app = createApp();
configureOpenAPI(app);

const routes = [
    index,
    reports,
    departments
]

routes.forEach((route) => {
    app.route("/", route)
})

export default app;
