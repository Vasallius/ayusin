import createApp from "./lib/create-app";
import configureOpenAPI from "./lib/openapi-spec";
import index from "./routes/index";
import reports from "./routes/reports/index";
import * as HttpStatusCodes from "stoker/http-status-codes";

const app = createApp();
configureOpenAPI(app);

app.onError(function (err, c) {
	c.var.logger.error("Something went wrong!", err.cause, err.stack);
	return c.json(
		{
			status: "error",
			description: `Something went wrong: ${err.message}`,
		},
		HttpStatusCodes.INTERNAL_SERVER_ERROR,
	);
});

const routes = [index, reports];

routes.forEach((route) => {
	app.route("/", route);
});

export default app;
