import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Factory,
  FileSearch,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata = {
  title: "Supplier Research Directory | ALPHA WAVE",
  description:
    "Research suppliers, compare quotations and evaluate vendors for Indian businesses.",
};

const supplierCategories = [
  {
    name: "Raw Material Suppliers",
    description:
      "Research suppliers of industrial materials, agricultural inputs, packaging materials and production components.",
    examples: [
      "Metals and industrial materials",
      "Chemicals and approved processing materials",
      "Agricultural raw materials",
      "Packaging and consumables",
    ],
    icon: Package,
  },
  {
    name: "Machinery and Equipment",
    description:
      "Identify manufacturers and dealers supplying machinery, tools and production equipment.",
    examples: [
      "Manufacturing machinery",
      "Food processing equipment",
      "Workshop tools",
      "Industrial automation equipment",
    ],
    icon: Factory,
  },
  {
    name: "Packaging Suppliers",
    description:
      "Research businesses supplying product packaging and labelling materials.",
    examples: [
      "Corrugated boxes",
      "Bottles and containers",
      "Labels and printing",
      "Protective packaging",
    ],
    icon: Package,
  },
  {
    name: "Logistics and Distribution",
    description:
      "Identify service providers for transportation, warehousing and product distribution.",
    examples: [
      "Road transportation",
      "Warehousing",
      "Courier services",
      "Freight forwarding",
    ],
    icon: Truck,
  },
];

const researchPortals = [
  {
    name: "Government e-Marketplace",
    description:
      "Official government procurement platform. Useful for researching registered sellers and products offered through public procurement.",
    url: "https://gem.gov.in/",
    type: "Government portal",
  },
  {
    name: "MSME Ministry",
    description:
      "Government information and resources for micro, small and medium enterprises.",
    url: "https://msme.gov.in/",
    type: "Government resource",
  },
  {
    name: "IndiaMART",
    description:
      "B2B marketplace where businesses can discover product suppliers and request quotations.",
    url: "https://www.indiamart.com/",
    type: "B2B marketplace",
  },
  {
    name: "TradeIndia",
    description:
      "B2B marketplace for discovering manufacturers, exporters and suppliers.",
    url: "https://www.tradeindia.com/",
    type: "B2B marketplace",
  },
];

const verificationChecklist = [
  "Confirm the supplier's legal business identity.",
  "Check GST registration where applicable.",
  "Verify the supplier's physical business address.",
  "Request a written quotation with item specifications.",
  "Compare pricing, taxes, delivery and payment terms.",
  "Request product samples where appropriate.",
  "Check relevant quality certifications and licences.",
  "Ask for references or documented business history.",
  "Confirm warranty and after-sales support.",
  "Keep written records of communication and agreements.",
];

const quotationFields = [
  "Supplier name and legal business identity",
  "Product or machinery specification",
  "Quantity and unit of measurement",
  "Price per unit",
  "GST and other applicable charges",
  "Transportation and delivery costs",
  "Expected delivery period",
  "Payment terms",
  "Warranty and service conditions",
  "Quotation date and validity",
];

export default function SupplierDirectoryPage() {
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
          <span className="eyebrow">BUSINESS PROCUREMENT RESEARCH</span>
          <h1>Supplier Research Directory</h1>
          <p>
            Find potential suppliers, evaluate vendors and
            organise procurement research for your business idea.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Building2 size={36} />
        </div>
      </section>

      <section className="research-intro">
        <div className="research-intro-icon">
          <ShieldCheck size={25} />
        </div>

        <div>
          <h2>Verify before purchasing</h2>
          <p>
            A marketplace listing is not proof that a supplier is
            reliable. Independently verify identity, specifications,
            product quality, quotations and commercial terms before
            placing an order.
          </p>
        </div>
      </section>

      <section className="research-centre-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SUPPLIER CATEGORIES</span>
            <h2>Explore supplier types</h2>
            <p>
              Identify the suppliers your business may require.
            </p>
          </div>
        </div>

        <div className="supplier-category-grid">
          {supplierCategories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                className="supplier-category-card"
                key={category.name}
              >
                <div className="supplier-category-icon">
                  <Icon size={24} />
                </div>

                <h3>{category.name}</h3>
                <p>{category.description}</p>

                <div className="supplier-example-list">
                  <strong>Examples</strong>
                  <ul>
                    {category.examples.map((example) => (
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
            <span className="eyebrow">SUPPLIER DISCOVERY</span>
            <h2>Research portals</h2>
            <p>
              External resources for discovering potential vendors.
            </p>
          </div>
        </div>

        <div className="supplier-portal-grid">
          {researchPortals.map((portal) => (
            <article
              className="supplier-portal-card"
              key={portal.name}
            >
              <span className="supplier-portal-type">
                {portal.type}
              </span>

              <h3>{portal.name}</h3>
              <p>{portal.description}</p>

              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="scheme-official-link"
              >
                Visit website
                <ArrowUpRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="research-centre-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">VENDOR DUE DILIGENCE</span>
            <h2>Supplier verification checklist</h2>
            <p>
              Use this checklist before treating a supplier as verified.
            </p>
          </div>
        </div>

        <div className="supplier-checklist-card">
          <div className="supplier-checklist-heading">
            <ClipboardCheck size={24} />
            <div>
              <h3>Verification requirements</h3>
              <p>
                These are checks to perform, not completed verification.
              </p>
            </div>
          </div>

          <ul className="supplier-checklist">
            {verificationChecklist.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="research-centre-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">QUOTATION COMPARISON</span>
            <h2>What to record in a quotation</h2>
            <p>
              Use consistent information when comparing multiple vendors.
            </p>
          </div>
        </div>

        <div className="supplier-checklist-card">
          <div className="supplier-checklist-heading">
            <FileSearch size={24} />
            <div>
              <h3>Quotation information checklist</h3>
              <p>
                Compare equivalent products and specifications.
              </p>
            </div>
          </div>

          <ul className="supplier-checklist">
            {quotationFields.map((field, index) => (
              <li key={field}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {field}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="workspace-note">
        <h2>Supplier verification policy</h2>
        <p>
          Supplier information should be labelled as unverified,
          verification pending or verified only when appropriate
          evidence has been reviewed. Marketplace membership,
          online reviews and a website alone do not establish
          supplier reliability. Never treat an indicative online
          price as a confirmed quotation.
        </p>
      </section>

      <section className="research-next-step">
        <div>
          <div className="research-intro-icon">
            <Factory size={23} />
          </div>

          <div>
            <h2>Connect suppliers with business research</h2>
            <p>
              Explore business opportunities and identify the
              procurement requirements for each industry.
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