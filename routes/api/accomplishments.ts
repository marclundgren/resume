import { Handlers } from "$fresh/server.ts";
import accomplishmentsData from "../../data/accomplishmentsData.json" with { type: "json" };

export const handler: Handlers = {
  GET(_req) {
    return new Response(JSON.stringify(accomplishmentsData), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
