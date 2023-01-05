import fastify from "fastify";
import { initServer } from "@ts-rest/fastify";
import cors from "@fastify/cors";
import { contract, type Post } from "@api/contract";

const app = fastify({
  logger: true,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.register(cors, {
  origin: "*",
});

const server = initServer();

const router = server.router(contract, {
  getPosts: async ({ query }) => {
    const posts = [mockPostFixtureFactory({ id: "1" }), mockPostFixtureFactory({ id: "2" })];

    return {
      status: 200,
      body: {
        posts,
        count: 0,
        skip: query.skip,
        take: query.take,
      },
    };
  },
  hello: async () => {
    return {
      status: 200,
      body: {
        message: "Hello world",
      },
    };
  },
});

app.register(server.plugin(router));

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

export const mockPostFixtureFactory = (partial: Partial<Post>): Post => ({
  id: "mock-id",
  title: `Post`,
  content: `Content`,
  description: `Description`,
  published: true,
  tags: ["tag1", "tag2"],
  ...partial,
});

start();
