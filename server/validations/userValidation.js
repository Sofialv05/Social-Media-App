import { z } from "zod";

const UserValidation = z.object({
  username: z.string().min(1, { message: "username is required" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "invalid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .min(5, { message: "min. password: 5 characters" }),
});

export default UserValidation;
