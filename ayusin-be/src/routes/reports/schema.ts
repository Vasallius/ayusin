import { z } from "zod";

// TODO: Use proper float32/64 depending on db
const Location = z.object({
	x: z.number(),
	y: z.number(),
});

export const ReportSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	// TODO: Ideally this is an enum.
	category: z.string(),
	labels: z.array(z.string()),
	media_links: z.array(z.string()),
	upvotes: z.number(),
	location: Location,
});
