import z from "zod";

export const createIssueSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title should be of type string.",
      required_error: "Title is required.",
    })
    .min(1, "Title should be at least 1 character.")
    .max(255, "Title cannot be more than 255 characters."),
  description: z
    .string({
      invalid_type_error: "Description should be of type string",
      required_error: "Description is required.",
    })
    .min(1, "Description should be at least 1 character."),
});
