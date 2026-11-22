"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  IndianRupee,
  Info,
  RotateCcw,
  Target,
  TrendingUp,
} from "lucide-react";

const initialValues = {
  sellingPrice: "500",
  variableCost: "250",
  fixedCosts: "50000",
  expectedSales: "300",
};

type CalculatorValues = typeof initialValues;

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function NumberField({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <div className="calculator-input-wrap">
        <IndianRupee size={17} />
        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <small className="form-hint">{description}</small>
    </div>
  );
}

export default function BreakEvenCalculatorPage() {
  const [values, setValues] =
    useState<CalculatorValues>(initialValues);

  function updateValue(
    key: keyof CalculatorValues,
    value: string
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  const results = useMemo(() => {
    const sellingPrice = Number(values.sellingPrice);
    const variableCost = Number(values.variableCost);
    const fixedCosts = Number(values.fixedCosts);
    const expectedSales = Number(values.expectedSales);

    const contribution = sellingPrice - variableCost;

    const contributionMargin =
      sellingPrice > 0
        ? (contribution / sellingPrice) * 100
        : null;

    const breakEvenUnits =
      contribution > 0
        ? Math.ceil(fixedCosts / contribution)
        : null;

    const breakEvenRevenue =
      breakEvenUnits !== null
        ? breakEvenUnits * sellingPrice
        : null;

    const expectedRevenue = expectedSales * sellingPrice;

    const expectedVariableCosts =
      expectedSales * variableCost;

    const expectedOperatingResult =
      expectedRevenue -
      expectedVariableCosts -
      fixedCosts;

    const salesAboveBreakEven =
      breakEvenUnits !== null
        ? expectedSales - breakEvenUnits
        : null;

    return {
      contribution,
      contributionMargin,
      breakEvenUnits,
      breakEvenRevenue,
      expectedRevenue,
      expectedOperatingResult,
      salesAboveBreakEven,
    };
  }, [values]);

  const hasInvalidInput = Object.values(values).some(
    (value) =>
      value.trim() === "" ||
      !Number.isFinite(Number(value)) ||
      Number(value) < 0
  );

  function resetCalculator() {
    setValues(initialValues);
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
          <h1>Break-even Calculator</h1>
          <p>
            Calculate the sales volume and revenue required to
            cover your business costs.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Target size={36} />
        </div>
      </section>

      <div className="calculator-layout">
        <section className="calculator-panel">
          <div className="calculator-panel-heading">
            <Calculator size={22} />
            <div>
              <h2>Enter your business figures</h2>
              <p>
                Use figures for one product or one consistent
                service unit.
              </p>
            </div>
          </div>

          <div className="calculator-fields">
            <NumberField
              label="Selling price per unit"
              description="The amount received for selling one unit."
              value={values.sellingPrice}
              onChange={(value) =>
                updateValue("sellingPrice", value)
              }
            />

            <NumberField
              label="Variable cost per unit"
              description="Direct cost of producing or delivering one unit."
              value={values.variableCost}
              onChange={(value) =>
                updateValue("variableCost", value)
              }
            />

            <NumberField
              label="Total monthly fixed costs"
              description="Monthly rent, salaries and other fixed expenses."
              value={values.fixedCosts}
              onChange={(value) =>
                updateValue("fixedCosts", value)
              }
            />

            <NumberField
              label="Expected monthly unit sales"
              description="Your estimated number of units sold per month."
              value={values.expectedSales}
              onChange={(value) =>
                updateValue("expectedSales", value)
              }
            />
          </div>

          <button
            type="button"
            className="button button-secondary calculator-reset"
            onClick={resetCalculator}
          >
            <RotateCcw size={16} />
            Reset calculator
          </button>
        </section>

        <section className="calculator-results">
          <div className="calculator-panel-heading">
            <TrendingUp size={22} />
            <div>
              <h2>Break-even results</h2>
              <p>Calculated using your entered figures.</p>
            </div>
          </div>

          {hasInvalidInput ? (
            <div className="auth-message auth-error">
              Enter valid non-negative numbers in all fields.
            </div>
          ) : results.contribution <= 0 ? (
            <div className="auth-message auth-error">
              Your selling price must be greater than your
              variable cost. Otherwise, each sale contributes
              nothing towards covering fixed costs.
            </div>
          ) : (
            <>
              <article className="calculator-result-card primary-result">
                <span>Break-even sales volume</span>
                <strong>
                  {results.breakEvenUnits?.toLocaleString("en-IN")} units
                </strong>
                <small>
                  Minimum whole units needed to cover fixed costs
                </small>
              </article>

              <article className="calculator-result-card">
                <span>Break-even revenue</span>
                <strong>
                  {formatINR(results.breakEvenRevenue ?? 0)}
                </strong>
              </article>

              <article className="calculator-result-card">
                <span>Contribution per unit</span>
                <strong>
                  {formatINR(results.contribution)}
                </strong>
              </article>

              <article className="calculator-result-card">
                <span>Contribution margin</span>
                <strong>
                  {results.contributionMargin?.toFixed(2)}%
                </strong>
              </article>

              <article className="calculator-result-card">
                <span>Estimated monthly operating result</span>
                <strong
                  className={
                    results.expectedOperatingResult >= 0
                      ? "result-positive"
                      : "result-negative"
                  }
                >
                  {formatINR(results.expectedOperatingResult)}
                </strong>
                <small>
                  Based on your expected monthly unit sales
                </small>
              </article>

              <article className="calculator-result-card">
                <span>Sales above or below break-even</span>
                <strong>
                  {results.salesAboveBreakEven === 0
                    ? "Exactly at break-even"
                    : `${Math.abs(
                        results.salesAboveBreakEven ?? 0
                      ).toLocaleString("en-IN")} units ${
                        (results.salesAboveBreakEven ?? 0) > 0
                          ? "above"
                          : "below"
                      }`}
                </strong>
              </article>
            </>
          )}

          <div className="calculator-disclaimer">
            <Info size={18} />
            <p>
              This is a simplified break-even estimate. It assumes
              a constant selling price and variable cost per unit.
              It excludes taxes, financing costs, discounts, returns,
              inventory changes and other expenses not entered.
              Actual results may differ.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}