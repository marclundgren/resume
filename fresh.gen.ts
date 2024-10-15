// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_education from "./routes/api/education.ts";
import * as $api_experience from "./routes/api/experience.ts";
import * as $index from "./routes/index.tsx";
import * as $Resume_ExperienceItem from "./islands/Resume/ExperienceItem.tsx";
import * as $Resume_Header from "./islands/Resume/Header.tsx";
import * as $Resume_Resume from "./islands/Resume/Resume.tsx";
import * as $Resume_SectionCertifications from "./islands/Resume/SectionCertifications.tsx";
import * as $Resume_SectionEducation from "./islands/Resume/SectionEducation.tsx";
import * as $Resume_SectionExperience from "./islands/Resume/SectionExperience.tsx";
import * as $Resume_hooks_useQuery from "./islands/Resume/hooks/useQuery.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/education.ts": $api_education,
    "./routes/api/experience.ts": $api_experience,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Resume/ExperienceItem.tsx": $Resume_ExperienceItem,
    "./islands/Resume/Header.tsx": $Resume_Header,
    "./islands/Resume/Resume.tsx": $Resume_Resume,
    "./islands/Resume/SectionCertifications.tsx": $Resume_SectionCertifications,
    "./islands/Resume/SectionEducation.tsx": $Resume_SectionEducation,
    "./islands/Resume/SectionExperience.tsx": $Resume_SectionExperience,
    "./islands/Resume/hooks/useQuery.tsx": $Resume_hooks_useQuery,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
