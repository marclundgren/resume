import { Handler } from "$fresh/server.ts";
import educationData from "../../data/educationData.json" with {
  type: "json",
};

export const handler: Handler = (_req, _ctx) => {
  return new Response(JSON.stringify(educationData), {
    headers: { "Content-Type": "application/json" },
  });
};
