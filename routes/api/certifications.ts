import { Handler } from "$fresh/server.ts";
import certificationsData from "../../data/certificationsData.json" with {
  type: "json",
};

export const handler: Handler = (_req, _ctx) => {
  return new Response(JSON.stringify(certificationsData), {
    headers: { "Content-Type": "application/json" },
  });
};
