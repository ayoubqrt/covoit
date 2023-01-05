import { z } from "zod";
import { initContract } from "@ts-rest/core";

const c = initContract();

export interface Post {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  published: boolean;
  tags: string[];
}

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.string().nullable(),
  published: z.boolean(),
  tags: z.array(z.string()),
});

export const contract = c.router({
  getPosts: {
    method: "GET",
    path: "/posts",
    responses: {
      200: z.object({
        posts: PostSchema.array(),
        count: z.number(),
        skip: z.number(),
        take: z.number(),
      }),
    },
    query: z.object({
      take: z.string().transform(Number),
      skip: z.string().transform(Number),
      search: z.string().optional(),
    }),
    summary: "Get all posts",
    headers: z.object({
      "x-pagination": z.coerce.number().optional(),
    }),
    metadata: { roles: ["guest", "user"] } as const,
  },
  hello: {
    method: "GET",
    path: "/hello",
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
    summary: "Hello world",
    metadata: { roles: ["guest", "user"] } as const,
  },
});
