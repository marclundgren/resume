import { Handler } from "$fresh/server.ts";
import experienceData from "../../data/experienceData.json" with {
  type: "json",
};

export const handler: Handler = (_req, _ctx) => {
  return new Response(JSON.stringify(experienceData), {
    headers: { "Content-Type": "application/json" },
  });
};
