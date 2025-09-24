import { z } from "zod";

// TODO: Use proper float32/64 depending on db
const Location = z.object({
	x: z.number(),
	y: z.number(),
});

export const ReportSchema = z.object({
	id: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
	title: z.string(),
	description: z.string().optional(),
	category: z.string(),
	scope: z.enum(["Barangay", "City", "Province", "Regional", "National"]),
	labels: z.array(z.string()),
	media_links: z.array(z.string()),
	upvotes: z.number(),
	location: Location,
});
