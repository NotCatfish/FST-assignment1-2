import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .email("Please provide a valid corporate or personal email address"),
  projectType: z.enum(["fullstack", "ml_pipeline", "consulting", "other"], {
    message: "Please select a valid project category",
  }),
  budget: z.enum(["< $1k", "$1k - $5k", "$5k - $10k", "> $10k"], {
    message: "Please select a budget range",
  }),
  message: z
    .string()
    .min(10, "Project description must be at least 10 characters")
    .max(1000, "Project description must not exceed 1000 characters"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export type ServerActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  recordId?: string;
};
