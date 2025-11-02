import { Handlers } from "$fresh/server.ts";
import timelineData from "../../data/timelineData.json" with { type: "json" };

export const handler: Handlers = {
  GET(_req) {
    return new Response(JSON.stringify(timelineData), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
