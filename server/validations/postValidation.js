import { z } from "zod";

const PostValidation = z.object({
  content: z.string().min(1, { message: "content is required" }),
  imgUrl: z.string().min(1, { message: "image is required" }),
  authorId: z.string().min(1, { message: "author is required" }),
});

export default PostValidation;
