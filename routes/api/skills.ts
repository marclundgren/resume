import { Handlers } from "$fresh/server.ts";
import skillsData from "../../data/skillsData.json" with { type: "json" };

export const handler: Handlers = {
  GET(_req) {
    return new Response(JSON.stringify(skillsData), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
