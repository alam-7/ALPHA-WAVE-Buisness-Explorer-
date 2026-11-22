import Link from "next/link";
import {
  ArrowLeft,
  BookCheck,
  CheckCircle2,
  FileSearch,
  Info,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

export const metadata = {
  title: "Research & Verification Centre | ALPHA WAVE",
  description:
    "Understand research evidence, source quality and verification labels used by ALPHA WAVE Business Explorer.",
};

const evidenceLevels = [
  {
    title: "Officially verified",
    label: "Official source",
    description:
      "Supported by a relevant government department, regulator, official filing or primary institutional source.",
    examples: [
      "Government registration requirements",
      "Published regulatory notifications",
      "Official scheme guidelines",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Published estimate",
    label: "Published research",
    description:
      "A figure or finding published by an identifiable research organisation, industry association or credible publication.",
    examples: [
      "Published industry reports",
      "Survey findings",
      "Documented market estimates",
    ],
    icon: BookCheck,
  },
  {
    title: "Research-based estimate",
    label: "Analyst estimate",
    description:
      "An estimate developed from multiple identified sources, stated assumptions and a transparent calculation method.",
    examples: [
      "Estimated operating expenses",
      "Indicative production requirements",
      "Calculated demand scenarios",
    ],
    icon: FileSearch,
  },
  {
    title: "Illustrative assumption",
    label: "Example only",
    description:
      "A hypothetical input used to demonstrate a business model or calculator. It is not a verified market fact.",
    examples: [
      "Example selling prices",
      "Sample monthly revenue",
      "Demonstration investment figures",
    ],
    icon: Info,
  },
  {
    title: "Not verified",
    label: "Verification pending",
    description:
      "Information that has not yet been checked against adequate evidence. It must not be presented as established fact.",
    examples: [
      "Unconfirmed supplier details",
      "Unverified quotations",
      "Undocumented market claims",
    ],
    icon: TriangleAlert,
  },
];

const sourcePrinciples = [
  {
    title: "Prefer primary sources",
    description:
      "Use government departments, regulators, official company disclosures and original research wherever possible.",
  },
  {
    title: "Record publication dates",
    description:
      "Show when a source was published and when the information was last reviewed.",
  },
  {
    title: "Make calculations transparent",
    description:
      "Explain the inputs, formula and assumptions behind calculated figures.",
  },
  {
    title: "Separate facts from estimates",
    description:
      "Never label a forecast, assumption or analyst estimate as an officially verified fact.",
  },
  {
    title: "Review changing information",
    description:
      "Recheck regulations, scheme eligibility, prices, supplier information and market conditions periodically.",
  },
  {
    title: "Keep evidence traceable",
    description:
      "Each important research claim should connect to its supporting source or clearly state that evidence is unavailable.",
  },
];

export default function ResearchCentrePage() {
  return (
    <main className="page-container workspace-page">
      <div className="workspace-back">
        <Link href="/">
          <ArrowLeft size={17} />
          Back to homepage
        </Link>
      </div>

      <section className="workspace-welcome">
        <div>
          <span className="eyebrow">RESEARCH STANDARDS</span>
          <h1>Research & Verification Centre</h1>
          <p>
            Understand where business information comes from,
            how evidence is assessed and what each verification
            label means.
          </p>
        </div>

        <div className="workspace-user-icon">
          <ShieldCheck size={36} />
        </div>
      </section>

      <section className="research-intro">
        <div className="research-intro-icon">
          <FileSearch size={25} />
        </div>

        <div>
          <h2>Evidence before conclusions</h2>
          <p>
            ALPHA WAVE aims to make business research transparent.
            Important claims should have traceable evidence, a
            source date and a clear verification status. Missing
            evidence must be disclosed rather than invented.
          </p>
        </div>
      </section>

      <section className="research-centre-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EVIDENCE CLASSIFICATION</span>
            <h2>Research verification labels</h2>
            <p>
              Learn how to interpret the evidence behind a research claim.
            </p>
          </div>
        </div>

        <div className="research-evidence-grid">
          {evidenceLevels.map((level) => {
            const Icon = level.icon;

            return (
              <article
                className="research-evidence-card"
                key={level.title}
              >
                <div className="research-evidence-icon">
                  <Icon size={23} />
                </div>

                <span className="research-evidence-label">
                  {level.label}
                </span>

                <h3>{level.title}</h3>
                <p>{level.description}</p>

                <div className="research-example-list">
                  <strong>Examples</strong>
                  <ul>
                    {level.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="research-centre-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">QUALITY CONTROL</span>
            <h2>Research standards</h2>
            <p>
              Principles for preparing reliable and transparent reports.
            </p>
          </div>
        </div>

        <div className="research-principles-grid">
          {sourcePrinciples.map((principle, index) => (
            <article
              className="research-principle-card"
              key={principle.title}
            >
              <span className="research-principle-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace-note">
        <h2>Important research disclaimer</h2>
        <p>
          A verification label does not guarantee that a business
          opportunity will succeed. Sources can become outdated,
          estimates can differ and actual business conditions can
          change. Independently verify important commercial,
          financial, legal and regulatory information before
          making decisions.
        </p>
      </section>

      <section className="research-next-step">
        <div>
          <CheckCircle2 size={22} />
          <div>
            <h2>Explore business research</h2>
            <p>
              Review business opportunities and examine the
              evidence attached to individual reports.
            </p>
          </div>
        </div>

        <Link href="/businesses" className="button button-primary">
          Explore businesses
        </Link>
      </section>
    </main>
  );
}