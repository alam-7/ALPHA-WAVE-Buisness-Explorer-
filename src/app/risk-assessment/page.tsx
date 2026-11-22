"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Info,
  Plus,
  Trash2,
} from "lucide-react";

type Risk = {
  id: number;
  name: string;
  category: string;
  likelihood: number;
  impact: number;
};

const initialRisks: Risk[] = [
  {
    id: 1,
    name: "Insufficient customer demand",
    category: "Market",
    likelihood: 3,
    impact: 5,
  },
  {
    id: 2,
    name: "Unexpected operating expenses",
    category: "Financial",
    likelihood: 3,
    impact: 4,
  },
  {
    id: 3,
    name: "Supplier delays",
    category: "Operations",
    likelihood: 3,
    impact: 3,
  },
  {
    id: 4,
    name: "Regulatory changes",
    category: "Compliance",
    likelihood: 2,
    impact: 5,
  },
  {
    id: 5,
    name: "Strong competition",
    category: "Market",
    likelihood: 4,
    impact: 4,
  },
];

const categories = [
  "Market",
  "Financial",
  "Operations",
  "Compliance",
  "Technology",
  "Workforce",
  "Environmental",
  "Other",
];

function getRiskLevel(score: number) {
  if (score >= 16) {
    return {
      label: "Critical",
      className: "risk-critical",
    };
  }

  if (score >= 10) {
    return {
      label: "High",
      className: "risk-high",
    };
  }

  if (score >= 5) {
    return {
      label: "Moderate",
      className: "risk-moderate",
    };
  }

  return {
    label: "Low",
    className: "risk-low",
  };
}

export default function RiskAssessmentPage() {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [newRiskName, setNewRiskName] = useState("");
  const [newCategory, setNewCategory] = useState("Other");

  const summary = useMemo(() => {
    const assessed = risks.map((risk) => ({
      ...risk,
      score: risk.likelihood * risk.impact,
    }));

    return {
      assessed,
      total: assessed.length,
      critical: assessed.filter((risk) => risk.score >= 16).length,
      high: assessed.filter(
        (risk) => risk.score >= 10 && risk.score < 16
      ).length,
      moderate: assessed.filter(
        (risk) => risk.score >= 5 && risk.score < 10
      ).length,
      low: assessed.filter((risk) => risk.score < 5).length,
    };
  }, [risks]);

  function updateRisk(
    id: number,
    field: "likelihood" | "impact",
    value: number
  ) {
    setRisks((current) =>
      current.map((risk) =>
        risk.id === id
          ? { ...risk, [field]: value }
          : risk
      )
    );
  }

  function addRisk() {
    const name = newRiskName.trim();

    if (!name) return;

    setRisks((current) => [
      ...current,
      {
        id: Math.max(0, ...current.map((risk) => risk.id)) + 1,
        name,
        category: newCategory,
        likelihood: 3,
        impact: 3,
      },
    ]);

    setNewRiskName("");
    setNewCategory("Other");
  }

  function removeRisk(id: number) {
    setRisks((current) =>
      current.filter((risk) => risk.id !== id)
    );
  }

  function resetAssessment() {
    setRisks(initialRisks);
    setNewRiskName("");
    setNewCategory("Other");
  }

  return (
    <main className="page-container workspace-page">
      <div className="workspace-back">
        <Link href="/businesses">
          <ArrowLeft size={17} />
          Back to business directory
        </Link>
      </div>

      <section className="workspace-welcome">
        <div>
          <span className="eyebrow">BUSINESS PLANNING TOOL</span>
          <h1>Risk Assessment</h1>
          <p>
            Identify potential business risks and evaluate their
            likelihood and possible impact.
          </p>
        </div>

        <div className="workspace-user-icon">
          <ShieldCheck size={36} />
        </div>
      </section>

      <section className="risk-summary-grid">
        <article className="risk-summary-card">
          <span>Total risks</span>
          <strong>{summary.total}</strong>
        </article>

        <article className="risk-summary-card">
          <span>Critical</span>
          <strong className="risk-critical-text">
            {summary.critical}
          </strong>
        </article>

        <article className="risk-summary-card">
          <span>High</span>
          <strong className="risk-high-text">
            {summary.high}
          </strong>
        </article>

        <article className="risk-summary-card">
          <span>Moderate</span>
          <strong className="risk-moderate-text">
            {summary.moderate}
          </strong>
        </article>

        <article className="risk-summary-card">
          <span>Low</span>
          <strong className="risk-low-text">
            {summary.low}
          </strong>
        </article>
      </section>

      <section className="calculator-panel risk-assessment-panel">
        <div className="calculator-panel-heading">
          <AlertTriangle size={22} />
          <div>
            <h2>Risk register</h2>
            <p>
              Adjust the likelihood and impact of each identified risk.
            </p>
          </div>
        </div>

        <div className="risk-scale">
          <div>
            <strong>Likelihood</strong>
            <span>1 = Rare · 5 = Almost certain</span>
          </div>

          <div>
            <strong>Impact</strong>
            <span>1 = Minor · 5 = Severe</span>
          </div>
        </div>

        <div className="risk-list">
          {summary.assessed.map((risk) => {
            const level = getRiskLevel(risk.score);

            return (
              <article className="risk-item" key={risk.id}>
                <div className="risk-item-heading">
                  <div>
                    <span className="risk-category">
                      {risk.category}
                    </span>
                    <h3>{risk.name}</h3>
                  </div>

                  <button
                    type="button"
                    className="risk-remove-button"
                    onClick={() => removeRisk(risk.id)}
                    aria-label={`Remove ${risk.name}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="risk-controls">
                  <label>
                    Likelihood
                    <select
                      value={risk.likelihood}
                      onChange={(event) =>
                        updateRisk(
                          risk.id,
                          "likelihood",
                          Number(event.target.value)
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Impact
                    <select
                      value={risk.impact}
                      onChange={(event) =>
                        updateRisk(
                          risk.id,
                          "impact",
                          Number(event.target.value)
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="risk-score">
                    <span>Score</span>
                    <strong>{risk.score}/25</strong>
                  </div>

                  <span className={`risk-level ${level.className}`}>
                    {level.label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {risks.length === 0 && (
          <div className="workspace-empty">
            <h2>No risks added</h2>
            <p>Add a risk to begin your assessment.</p>
          </div>
        )}

        <div className="risk-add-section">
          <h3>Add another risk</h3>

          <div className="risk-add-fields">
            <input
              type="text"
              value={newRiskName}
              onChange={(event) =>
                setNewRiskName(event.target.value)
              }
              placeholder="Enter a business risk"
              maxLength={120}
            />

            <select
              value={newCategory}
              onChange={(event) =>
                setNewCategory(event.target.value)
              }
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="button button-primary"
              onClick={addRisk}
              disabled={!newRiskName.trim()}
            >
              <Plus size={17} />
              Add risk
            </button>
          </div>
        </div>

        <button
          type="button"
          className="button button-secondary calculator-reset"
          onClick={resetAssessment}
        >
          <RotateCcw size={16} />
          Reset assessment
        </button>
      </section>

      <section className="workspace-note">
        <h2>How risk scoring works</h2>

        <p>
          Risk score = Likelihood × Impact. Each factor is rated
          from 1 to 5, producing a score between 1 and 25.
        </p>

        <ul>
          <li>1–4: Low risk</li>
          <li>5–9: Moderate risk</li>
          <li>10–15: High risk</li>
          <li>16–25: Critical risk</li>
        </ul>

        <p>
          These are indicative classifications for this tool,
          not a universal risk standard.
        </p>
      </section>

      <div className="calculator-disclaimer">
        <Info size={18} />
        <p>
          This assessment is an educational planning aid. It does
          not predict business failure or guarantee that identified
          risks will occur. Real risk assessment should consider
          evidence, controls, dependencies and professional review.
        </p>
      </div>
    </main>
  );
}