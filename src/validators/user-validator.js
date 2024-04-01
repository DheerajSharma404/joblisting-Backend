import z from "zod";

const userRegisterValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain atleast 3 character." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .refine((value) => value.length >= 8, {
      message: "Password must contain at least 8 characters.",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number.",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message: "Password must contain at least one symbol.",
    }),
  mobileNumber: z.string(),
});

const userLoginValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .refine((value) => value.length >= 8, {
      message: "Password must contain at least 8 characters.",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number.",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message: "Password must contain at least one symbol.",
    }),
});

export default {
  userLoginValidationSchema,
  userRegisterValidationSchema,
};
