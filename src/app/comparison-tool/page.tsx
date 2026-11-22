"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRightLeft,
  Plus,
  RotateCcw,
  Trash2,
  Info,
  Scale,
} from "lucide-react";

type BusinessOption = {
  id: number;
  name: string;
  investment: string;
  monthlyRevenue: string;
  monthlyCosts: string;
  workingCapital: string;
  riskLevel: string;
  notes: string;
};

const initialBusinesses: BusinessOption[] = [
  {
    id: 1,
    name: "Business Option A",
    investment: "500000",
    monthlyRevenue: "200000",
    monthlyCosts: "140000",
    workingCapital: "150000",
    riskLevel: "Medium",
    notes: "",
  },
  {
    id: 2,
    name: "Business Option B",
    investment: "800000",
    monthlyRevenue: "300000",
    monthlyCosts: "220000",
    workingCapital: "200000",
    riskLevel: "Medium",
    notes: "",
  },
];

const emptyBusiness = (id: number): BusinessOption => ({
  id,
  name: `Business Option ${String.fromCharCode(65 + id - 1)}`,
  investment: "",
  monthlyRevenue: "",
  monthlyCosts: "",
  workingCapital: "",
  riskLevel: "Not assessed",
  notes: "",
});

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function amount(value: string) {
  const result = Number(value);
  return Number.isFinite(result) && result >= 0 ? result : 0;
}

export default function ComparisonToolPage() {
  const [businesses, setBusinesses] =
    useState<BusinessOption[]>(initialBusinesses);

  function updateBusiness(
    id: number,
    field: keyof BusinessOption,
    value: string
  ) {
    setBusinesses((current) =>
      current.map((business) =>
        business.id === id
          ? { ...business, [field]: value }
          : business
      )
    );
  }

  function addBusiness() {
    if (businesses.length >= 3) return;

    const nextId =
      Math.max(0, ...businesses.map((business) => business.id)) + 1;

    setBusinesses((current) => [
      ...current,
      emptyBusiness(nextId),
    ]);
  }

  function removeBusiness(id: number) {
    setBusinesses((current) =>
      current.filter((business) => business.id !== id)
    );
  }

  function resetComparison() {
    setBusinesses(initialBusinesses);
  }

  const results = useMemo(
    () =>
      businesses.map((business) => {
        const investment = amount(business.investment);
        const revenue = amount(business.monthlyRevenue);
        const costs = amount(business.monthlyCosts);
        const workingCapital = amount(business.workingCapital);
        const monthlyResult = revenue - costs;

        const margin =
          revenue > 0 ? (monthlyResult / revenue) * 100 : null;

        const payback =
          monthlyResult > 0
            ? investment / monthlyResult
            : null;

        return {
          ...business,
          investment,
          revenue,
          costs,
          workingCapital,
          monthlyResult,
          margin,
          payback,
        };
      }),
    [businesses]
  );

  const invalidInput = businesses.some((business) =>
    [
      business.investment,
      business.monthlyRevenue,
      business.monthlyCosts,
      business.workingCapital,
    ].some(
      (value) =>
        value.trim() !== "" &&
        (!Number.isFinite(Number(value)) || Number(value) < 0)
    )
  );

  const comparisonRows = [
    {
      label: "Initial investment",
      getValue: (business: (typeof results)[number]) =>
        formatINR(business.investment),
    },
    {
      label: "Working capital",
      getValue: (business: (typeof results)[number]) =>
        formatINR(business.workingCapital),
    },
    {
      label: "Monthly revenue",
      getValue: (business: (typeof results)[number]) =>
        formatINR(business.revenue),
    },
    {
      label: "Monthly operating costs",
      getValue: (business: (typeof results)[number]) =>
        formatINR(business.costs),
    },
    {
      label: "Monthly operating result",
      getValue: (business: (typeof results)[number]) =>
        formatINR(business.monthlyResult),
    },
    {
      label: "Operating margin",
      getValue: (business: (typeof results)[number]) =>
        business.margin === null
          ? "Not available"
          : `${business.margin.toFixed(1)}%`,
    },
    {
      label: "Simple payback estimate",
      getValue: (business: (typeof results)[number]) =>
        business.payback === null
          ? "Not available"
          : `${business.payback.toFixed(1)} months`,
    },
    {
      label: "Risk assessment",
      getValue: (business: (typeof results)[number]) =>
        business.riskLevel,
    },
  ];

  return (
    <main className="page-container workspace-page">
      <div className="workspace-back">
        <Link href="/workspace">
          <ArrowLeft size={17} />
          Back to workspace
        </Link>
      </div>

      <section className="workspace-welcome">
        <div>
          <span className="eyebrow">BUSINESS ANALYSIS TOOL</span>
          <h1>Business Comparison</h1>
          <p>
            Compare up to three opportunities using consistent
            financial assumptions and planning factors.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Scale size={36} />
        </div>
      </section>

      <section className="calculator-panel">
        <div className="calculator-panel-heading">
          <ArrowRightLeft size={22} />
          <div>
            <h2>Comparison inputs</h2>
            <p>
              Enter comparable estimates for each business option.
            </p>
          </div>
        </div>

        <div className="comparison-input-grid">
          {businesses.map((business) => (
            <article
              className="comparison-input-card"
              key={business.id}
            >
              <div className="comparison-input-heading">
                <h3>{business.name}</h3>

                <button
                  type="button"
                  className="risk-remove-button"
                  onClick={() => removeBusiness(business.id)}
                  disabled={businesses.length <= 2}
                  aria-label={`Remove ${business.name}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="form-group">
                <label>Business name</label>
                <input
                  value={business.name}
                  maxLength={100}
                  onChange={(event) =>
                    updateBusiness(
                      business.id,
                      "name",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Initial investment (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={business.investment}
                  onChange={(event) =>
                    updateBusiness(
                      business.id,
                      "investment",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Monthly revenue (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={business.monthlyRevenue}
                  onChange={(event) =>
                    updateBusiness(
                      business.id,
                      "monthlyRevenue",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Monthly operating costs (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={business.monthlyCosts}
                  onChange={(event) =>
                    updateBusiness(
                      business.id,
                      "monthlyCosts",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Working capital (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={business.workingCapital}
                  onChange={(event) =>
                    updateBusiness(
                      business.id,
                      "workingCapital",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Risk assessment</label>
                <select
                  value={business.riskLevel}
                  onChange={(event) =>
                    updateBusiness(
                      business.id,
                      "riskLevel",
                      event.target.value
                    )
                  }
                >
                  <option>Not assessed</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label>Additional notes</label>
                <textarea
                  rows={3}
                  value={business.notes}
                  maxLength={500}
                  onChange={(event) =>
                    updateBusiness(
                      business.id,
                      "notes",
                      event.target.value
                    )
                  }
                  placeholder="Add research notes..."
                />
              </div>
            </article>
          ))}
        </div>

        <div className="comparison-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={addBusiness}
            disabled={businesses.length >= 3}
          >
            <Plus size={17} />
            Add business
          </button>

          <button
            type="button"
            className="button button-secondary"
            onClick={resetComparison}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </section>

      <section className="calculator-panel comparison-results-panel">
        <div className="calculator-panel-heading">
          <Scale size={22} />
          <div>
            <h2>Side-by-side results</h2>
            <p>
              Compare the calculations using the values entered above.
            </p>
          </div>
        </div>

        {invalidInput ? (
          <div className="auth-message auth-error">
            Please correct invalid or negative financial inputs.
          </div>
        ) : (
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Comparison factor</th>

                  {results.map((business) => (
                    <th key={business.id}>
                      {business.name || "Unnamed business"}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th>{row.label}</th>

                    {results.map((business) => (
                      <td key={business.id}>
                        {row.getValue(business)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="workspace-note">
        <h2>How to interpret the comparison</h2>

        <ul>
          <li>
            Compare businesses using the same time period and
            accounting assumptions.
          </li>
          <li>
            A higher estimated monthly result does not automatically
            mean a better business opportunity.
          </li>
          <li>
            Consider market demand, competition, skills, regulation
            and operational complexity.
          </li>
          <li>
            Verify all investment and operating figures using
            current quotations and reliable research.
          </li>
        </ul>
      </section>

      <div className="calculator-disclaimer">
        <Info size={18} />
        <p>
          The sample figures are illustrative only. The payback
          calculation is a simplified estimate based on the entered
          monthly operating result. It is not a forecast or guarantee.
          This tool currently compares manually entered information;
          it does not yet load saved business records or store
          comparison results in Supabase.
        </p>
      </div>
    </main>
  );
}