import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Factory,
  GraduationCap,
  HandCoins,
  Landmark,
  Leaf,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Government Schemes | ALPHA WAVE Business Explorer",
  description:
    "Explore official Indian government schemes and support programmes for entrepreneurs, startups and MSMEs.",
};

const schemes = [
  {
    name: "Prime Minister's Employment Generation Programme",
    shortName: "PMEGP",
    category: "Business establishment",
    description:
      "A credit-linked subsidy programme supporting eligible applicants establishing new micro-enterprises in the non-farm sector.",
    support: "Bank finance with eligible margin-money subsidy",
    eligibility:
      "Individual applicants must generally be at least 18 years old. Other project and applicant conditions apply.",
    authority: "Ministry of MSME / KVIC",
    url: "https://pmegp.msme.gov.in/",
    icon: Factory,
  },
  {
    name: "Pradhan Mantri MUDRA Yojana",
    shortName: "PMMY / MUDRA",
    category: "Micro-business finance",
    description:
      "Provides institutional credit support for eligible non-corporate, non-farm micro and small business activities.",
    support: "Business loans through participating lending institutions",
    eligibility:
      "Eligible micro-businesses and entrepreneurs, subject to lender assessment and scheme rules.",
    authority: "Department of Financial Services",
    url: "https://www.mudra.org.in/",
    icon: HandCoins,
  },
  {
    name: "Credit Guarantee Scheme for Micro and Small Enterprises",
    shortName: "CGTMSE",
    category: "Credit guarantee",
    description:
      "Provides credit guarantee support to eligible lending institutions for qualifying credit facilities extended to micro and small enterprises.",
    support: "Credit guarantee mechanism",
    eligibility:
      "Eligible micro and small enterprises and lending institutions under applicable guidelines.",
    authority: "CGTMSE",
    url: "https://www.cgtmse.in/",
    icon: ShieldCheck,
  },
  {
    name: "Startup India",
    shortName: "Startup India",
    category: "Startup development",
    description:
      "A government initiative providing information, resources and access to programmes supporting eligible startups and entrepreneurship.",
    support: "Startup recognition information, resources and ecosystem support",
    eligibility:
      "Recognition and programme eligibility depend on the applicable DPIIT criteria.",
    authority: "DPIIT, Ministry of Commerce and Industry",
    url: "https://www.startupindia.gov.in/",
    icon: GraduationCap,
  },
  {
    name: "PM Formalisation of Micro Food Processing Enterprises",
    shortName: "PMFME",
    category: "Food processing",
    description:
      "A programme supporting the formalisation and development of eligible micro food-processing enterprises.",
    support: "Programme-based financial, technical and capacity-building support",
    eligibility:
      "Subject to current scheme guidelines, enterprise type and application conditions.",
    authority: "Ministry of Food Processing Industries",
    url: "https://pmfme.mofpi.gov.in/",
    icon: Leaf,
  },
  {
    name: "PM Vishwakarma",
    shortName: "PM Vishwakarma",
    category: "Traditional businesses",
    description:
      "Provides support to eligible traditional artisans and craftspeople through training, recognition, toolkit incentives and credit-related assistance.",
    support: "Skill development, toolkit and other eligible support",
    eligibility:
      "Limited to eligible traditional artisan trades and applicants meeting scheme conditions.",
    authority: "Ministry of MSME",
    url: "https://pmvishwakarma.gov.in/",
    icon: Building2,
  },
  {
    name: "Procurement and Marketing Support Scheme",
    shortName: "PMS",
    category: "Marketing support",
    description:
      "Supports eligible MSMEs in improving market access, marketing capabilities and participation in relevant promotional activities.",
    support: "Marketing and market-development assistance",
    eligibility:
      "Subject to MSME classification and the current programme guidelines.",
    authority: "Ministry of MSME",
    url: "https://msme.gov.in/",
    icon: Landmark,
  },
  {
    name: "Scheme of Fund for Regeneration of Traditional Industries",
    shortName: "SFURTI",
    category: "Traditional industries",
    description:
      "Supports the development of traditional industry clusters and improvement of their competitiveness.",
    support: "Cluster development, infrastructure and capacity-building support",
    eligibility:
      "Eligible cluster-based projects and implementing agencies under scheme guidelines.",
    authority: "Ministry of MSME",
    url: "https://msme.gov.in/",
    icon: Factory,
  },
];

const researchResources = [
  {
    name: "Ministry of MSME",
    description:
      "Central government information about MSME policies, schemes and programmes.",
    url: "https://msme.gov.in/",
  },
  {
    name: "MyMSME Scheme Directory",
    description:
      "Official scheme listings and guidelines published through the MSME portal.",
    url: "https://my.msme.gov.in/mymsme/Scheme.aspx",
  },
  {
    name: "Maharashtra MSME Schemes",
    description:
      "Maharashtra government information about schemes and programmes relevant to MSMEs.",
    url: "https://msme.maharashtra.gov.in/schemes-programmes/page/4/",
  },
  {
    name: "Startup India",
    description:
      "Government resources and information about startup initiatives and support.",
    url: "https://www.startupindia.gov.in/",
  },
];

export default function GovernmentSchemesPage() {
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
          <span className="eyebrow">INDIA BUSINESS SUPPORT</span>
          <h1>Government Schemes & Support</h1>
          <p>
            Explore government programmes that may support
            eligible businesses, startups, manufacturers and
            traditional enterprises.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Landmark size={36} />
        </div>
      </section>

      <section className="research-intro">
        <div className="research-intro-icon">
          <ShieldCheck size={25} />
        </div>

        <div>
          <h2>Start with official information</h2>
          <p>
            Each programme has its own eligibility requirements,
            application process and conditions. Always read the
            latest official guidelines before relying on a scheme.
            A listed programme does not guarantee that an applicant
            will receive financial support.
          </p>
        </div>
      </section>

      <section className="research-centre-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SCHEME DIRECTORY</span>
            <h2>Explore support programmes</h2>
            <p>
              Eight programmes and initiatives to research further.
            </p>
          </div>
        </div>

        <div className="scheme-grid">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;

            return (
              <article className="scheme-card" key={scheme.shortName}>
                <div className="scheme-card-top">
                  <div className="scheme-icon">
                    <Icon size={23} />
                  </div>

                  <span className="scheme-category">
                    {scheme.category}
                  </span>
                </div>

                <span className="eyebrow">{scheme.shortName}</span>

                <h3>{scheme.name}</h3>

                <p>{scheme.description}</p>

                <div className="scheme-information">
                  <div>
                    <span>Type of support</span>
                    <strong>{scheme.support}</strong>
                  </div>

                  <div>
                    <span>Eligibility overview</span>
                    <strong>{scheme.eligibility}</strong>
                  </div>

                  <div>
                    <span>Authority</span>
                    <strong>{scheme.authority}</strong>
                  </div>
                </div>

                <a
                  href={scheme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scheme-official-link"
                >
                  Visit official portal
                  <ArrowUpRight size={17} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="research-centre-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OFFICIAL RESEARCH LINKS</span>
            <h2>Government information resources</h2>
            <p>
              Use these portals to check current notifications,
              guidelines and application information.
            </p>
          </div>
        </div>

        <div className="research-principles-grid">
          {researchResources.map((resource, index) => (
            <article
              className="research-principle-card"
              key={resource.name}
            >
              <span className="research-principle-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3>{resource.name}</h3>
                <p>{resource.description}</p>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scheme-official-link"
                >
                  Open official resource
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace-note">
        <h2>Important eligibility and age information</h2>
        <p>
          Some government finance and enterprise programmes require
          applicants to be adults, registered businesses or eligible
          legal entities. For example, PMEGP generally requires
          individual applicants to be at least 18 years old.
          Eligibility for other schemes varies. Young learners can
          use this directory for educational research and planning,
          but must not misrepresent their age or eligibility when
          applying.
        </p>
      </section>

      <section className="research-next-step">
        <div>
          <div className="research-intro-icon">
            <Building2 size={23} />
          </div>

          <div>
            <h2>Connect schemes with business ideas</h2>
            <p>
              Explore business opportunities and identify which
              official programmes may be relevant for further research.
            </p>
          </div>
        </div>

        <Link
          href="/businesses"
          className="button button-primary"
        >
          Explore businesses
        </Link>
      </section>
    </main>
  );
}