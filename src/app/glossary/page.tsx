import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Search,
} from "lucide-react";

export const metadata = {
  title: "Business Glossary | ALPHA WAVE Business Explorer",
  description:
    "Understand important business, finance, investment and startup terminology.",
};

const glossary = [
  {
    category: "Business Fundamentals",
    terms: [
      {
        term: "Business Model",
        definition:
          "The way a business creates value for customers and earns revenue.",
      },
      {
        term: "Revenue",
        definition:
          "The total income generated from selling products or providing services before deducting expenses.",
      },
      {
        term: "Profit",
        definition:
          "The amount remaining after deducting relevant expenses from revenue.",
      },
      {
        term: "Target Market",
        definition:
          "The specific group of customers a business intends to serve.",
      },
      {
        term: "Value Proposition",
        definition:
          "The main benefit or solution a business promises to provide to its customers.",
      },
      {
        term: "Scalability",
        definition:
          "The ability of a business to increase its operations without costs growing at the same rate.",
      },
    ],
  },
  {
    category: "Investment and Finance",
    terms: [
      {
        term: "Capital",
        definition:
          "Money or other resources used to establish and operate a business.",
      },
      {
        term: "Initial Investment",
        definition:
          "The money required to begin a business, including setup and initial operating requirements.",
      },
      {
        term: "Working Capital",
        definition:
          "Current assets minus current liabilities. It indicates the short-term resources available to support operations.",
      },
      {
        term: "Fixed Costs",
        definition:
          "Business expenses that generally remain stable over a relevant period, such as rent.",
      },
      {
        term: "Variable Costs",
        definition:
          "Expenses that change with production or sales volume, such as direct material costs.",
      },
      {
        term: "Cash Flow",
        definition:
          "The movement of money into and out of a business over a period.",
      },
      {
        term: "Return on Investment (ROI)",
        definition:
          "A measure comparing the gain or loss from an investment with its cost.",
      },
      {
        term: "Payback Period",
        definition:
          "The estimated time required for an investment to generate enough cash returns to recover its initial cost.",
      },
    ],
  },
  {
    category: "Profitability and Planning",
    terms: [
      {
        term: "Gross Profit",
        definition:
          "Revenue minus the direct cost of goods sold or services delivered.",
      },
      {
        term: "Net Profit",
        definition:
          "The remaining profit after all relevant expenses have been deducted.",
      },
      {
        term: "Profit Margin",
        definition:
          "Profit expressed as a percentage of revenue.",
      },
      {
        term: "Break-even Point",
        definition:
          "The sales level at which total revenue equals total costs.",
      },
      {
        term: "Contribution Margin",
        definition:
          "Selling price per unit minus variable cost per unit. It contributes towards fixed costs and profit.",
      },
      {
        term: "Operating Expenses",
        definition:
          "The regular costs involved in running a business, such as administration, rent and salaries.",
      },
      {
        term: "Forecast",
        definition:
          "An estimate of future business performance based on assumptions and available information.",
      },
      {
        term: "Sensitivity Analysis",
        definition:
          "A method of examining how changes in important assumptions affect business results.",
      },
    ],
  },
  {
    category: "Market and Competition",
    terms: [
      {
        term: "Market Research",
        definition:
          "The process of collecting and analysing information about customers, competitors and market conditions.",
      },
      {
        term: "Market Size",
        definition:
          "An estimate of the total demand or economic value of a defined market.",
      },
      {
        term: "Market Share",
        definition:
          "The percentage of a defined market's total sales or activity represented by a business.",
      },
      {
        term: "Competitor Analysis",
        definition:
          "Research into competing businesses, their products, pricing, strengths and market position.",
      },
      {
        term: "Customer Acquisition",
        definition:
          "The process of attracting and converting new customers.",
      },
      {
        term: "Customer Retention",
        definition:
          "The ability of a business to keep customers returning over time.",
      },
      {
        term: "USP",
        definition:
          "Unique Selling Proposition: a distinctive benefit or feature that differentiates an offering.",
      },
    ],
  },
  {
    category: "Operations and Manufacturing",
    terms: [
      {
        term: "Production Capacity",
        definition:
          "The maximum output a business can produce under specified operating conditions.",
      },
      {
        term: "Raw Materials",
        definition:
          "Basic materials used to manufacture a product.",
      },
      {
        term: "Supply Chain",
        definition:
          "The network involved in sourcing, producing, storing and delivering products.",
      },
      {
        term: "Inventory",
        definition:
          "Goods and materials held by a business for production or sale.",
      },
      {
        term: "Quality Control",
        definition:
          "Processes used to check whether products or services meet specified quality requirements.",
      },
      {
        term: "Capacity Utilisation",
        definition:
          "The percentage of available production capacity actually being used.",
      },
    ],
  },
  {
    category: "Startup and Legal",
    terms: [
      {
        term: "Startup",
        definition:
          "A newly established business, often developed to test and grow a product, service or business model.",
      },
      {
        term: "Bootstrapping",
        definition:
          "Building a business using personal funds and revenue rather than relying primarily on outside investment.",
      },
      {
        term: "Funding",
        definition:
          "Money obtained to establish, operate or expand a business.",
      },
      {
        term: "Compliance",
        definition:
          "Following applicable laws, regulations, licences and other official requirements.",
      },
      {
        term: "Intellectual Property",
        definition:
          "Legal rights associated with creations such as inventions, designs, trademarks and original works.",
      },
      {
        term: "Due Diligence",
        definition:
          "A careful investigation of a business, investment or opportunity before making a decision.",
      },
    ],
  },
];

export default function GlossaryPage() {
  const totalTerms = glossary.reduce(
    (total, group) => total + group.terms.length,
    0
  );

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
          <span className="eyebrow">LEARNING CENTRE</span>
          <h1>Business Glossary</h1>
          <p>
            Understand the terminology used in business research,
            financial planning and entrepreneurship.
          </p>
        </div>

        <div className="workspace-user-icon">
          <BookOpen size={36} />
        </div>
      </section>

      <section className="glossary-overview">
        <div>
          <strong>{totalTerms}</strong>
          <span>Definitions</span>
        </div>

        <div>
          <strong>{glossary.length}</strong>
          <span>Subject categories</span>
        </div>

        <div>
          <strong>English</strong>
          <span>Language</span>
        </div>
      </section>

      <div className="glossary-search-note">
        <Search size={19} />
        <p>
          Browse the sections below to find definitions. More
          terminology and a searchable glossary can be added later.
        </p>
      </div>

      <div className="glossary-sections">
        {glossary.map((group, index) => (
          <section
            className="glossary-category"
            key={group.category}
          >
            <div className="glossary-category-heading">
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2>{group.category}</h2>
            </div>

            <div className="glossary-term-grid">
              {group.terms.map((item) => (
                <article
                  className="glossary-term-card"
                  key={item.term}
                >
                  <h3>{item.term}</h3>
                  <p>{item.definition}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="workspace-note">
        <h2>Important note</h2>
        <p>
          These are introductory educational definitions. The
          precise meaning of financial and legal terms can depend
          on the accounting framework, contract or applicable law.
          Verify important decisions using authoritative sources.
        </p>
      </section>
    </main>
  );
}