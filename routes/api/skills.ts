import { Handler } from "$fresh/server.ts";
import skillsData from "../../data/skillsData.json" with {
  type: "json",
};

export const handler: Handler = (_req, _ctx) => {
  return new Response(JSON.stringify(skillsData), {
    headers: { "Content-Type": "application/json" },
  });
};
