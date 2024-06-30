import z from "zod";

const jobPostValidationSchema = z.object({
  companyName: z
    .string()
    .min(3, { message: "Company name must contain atleast 3 characters." }),
  companyLogoUrl: z.string().url({ message: "Invalid URL for company logo." }),
  aboutCompany: z.string().min(20, {
    message: "Must be atleast 20 character long.",
  }),
  information: z.string(),
  jobStatus: z.enum(["Open", "Closed", "Filled"]), // create and enum and use instead.
  jobTitle: z.string().min(1, { message: "Job title is required." }),
  jobDescription: z
    .string()
    .min(20, { message: "Description must be atleast 20 characters long." }),
  jobType: z.enum(["Full-Time", "Part-Time", "Contract", "Internship"]),

  jobLocation: z
    .string()
    .min(3, { message: "Location must contain atleast 3 characters." }),

  jobLocationType: z.enum(["OnSite", "Remote", "Hybrid"]),

  jobDuration: z.enum(["Short-Term", "Long-Term", "Contract"]),

  skillsRequired: z.array(
    z
      .string()
      .min(1, { message: "Each skill must be a non-empty string value" })
  ),
  experienceLevel: z.string(),
  educationRequirement: z
    .string()
    .min(1, { message: "Education is required." }),
  teamSize: z.string().min(1, { message: "Team Size is Required" }),
  salary: z.string().min(1, { message: "Salary is required." }),
});

export default {
  jobPostValidationSchema,
};
