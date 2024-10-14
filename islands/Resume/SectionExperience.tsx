import { ExperienceItem } from "./ExperienceItem.tsx";

export const SectionExperience = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
      Experience
    </h2>
    <div className="space-y-6">
      <ExperienceItem
        title="User Interface Software Engineer"
        company="Microsoft (Copilot Studio Team)"
        period="2022 - Present"
        responsibilities={[
          "Develop and maintain core UI/UX components for Microsoft Copilot Studio using React, TypeScript, and Fluent UI",
          "Architect and implement key features including conversational AI creation experiences and experimental control management",
          "Collaborate with architect designers to contribute to critical architectural decisions, enhancing system scalability and performance",
          "Optimize user interfaces for mobile devices, ensuring a seamless cross-platform experience",
          "Participate in live site operations, including on-call rotations and incident management, presenting incident resolution takeaways to the team",
          "Conduct regular code reviews for junior, mid-level, and senior developers, maintaining high code quality standards",
          "Mentor junior teammates, fostering their professional growth and improving team productivity",
          "Contribute to the development of a new embedded conversational AI creation experience for Microsoft 365 applications, including Outlook and Teams",
          '[Placeholder for user adoption metric: e.g., "Contributed to a X% increase in user engagement with the new Copilot Studio features"]',
          "Implement UI components for Copilot agents, enabling AI automation of business processes",
          "Design user interfaces for integrating Copilot Studio with SharePoint and other Microsoft 365 services",
          "Ensure alignment with Microsoft's Responsible AI principles and enterprise data protection standards in UI implementations",
        ]}
        technologies="React, TypeScript, Fluent UI, Microsoft 365 ecosystem"
      />
      <ExperienceItem
        title="Senior Front End Engineer (remote)"
        company="Kareo"
        period="Nov 2019 - 2021"
        responsibilities={[
          "Reduced Kareo's monolith application's build time by ~30%",
          "Implemented an Apple Pay, Google Pay Point-Of-Sale UI with Stripe payment integration",
          "Enabled TypeScript React.js capabilities for Kareo's UI monolith application",
        ]}
        technologies="React.js, TypeScript, AWS"
      />
      <ExperienceItem
        title="Senior Front End Engineer, Cloud Software Engineer"
        company="Rallio"
        period="Sep 2016 - Nov 2019"
        responsibilities={[
          "Redesigned and re-architected Rallio's flagship application",
          "Architected, designed and implemented a AWS Fault-tolerant Data-integration application",
          "Mentored junior UI developers",
        ]}
        technologies="Node.js, Ember.js, React.js, AWS"
      />
      <ExperienceItem
        title="Front End Engineer (remote)"
        company="Kinvey"
        period="Sep 2015 - Aug 2016"
        responsibilities={[
          "Built and maintained a high-traffic complex single page application",
          "Delivered a cloud-data backed identification cross-platform mobile app",
          "Deployed and iterated in an agile start-up environment",
          "Increased stability by introducing integration and acceptance tests for all Kinvey UIs",
        ]}
        technologies="Node.js, Ember.js, Google Firebase"
      />
      <ExperienceItem
        title="Front End Developer"
        company="FIDM"
        period="Aug 2014 - Feb 2015"
        responsibilities={[
          "Designed and built two Single Page Applications with React.js",
        ]}
        technologies="React.js, Mithril.js"
      />
      <ExperienceItem
        title="Front End Software Engineer"
        company="Liferay"
        period="Feb 2012 - Aug 2014"
        responsibilities={[
          "Open Source Development",
          "Responsive, Mobile First Development",
          "HTML5",
          "Accessibility",
          "Bootstrap 2 Implementation",
        ]}
        technologies="HTML5, CSS3, JavaScript, Bootstrap"
      />
    </div>
  </section>
);
