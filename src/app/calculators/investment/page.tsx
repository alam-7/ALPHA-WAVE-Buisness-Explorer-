"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  IndianRupee,
  Info,
  RotateCcw,
  TrendingUp,
  Wallet,
} from "lucide-react";

const initialValues = {
  setupCost: "500000",
  equipmentCost: "200000",
  workingCapital: "150000",
  monthlyRevenue: "200000",
  monthlyFixedCost: "50000",
  monthlyVariableCost: "80000",
};

type CalculatorValues = typeof initialValues;

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
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
          step="1000"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <small className="form-hint">{description}</small>
    </div>
  );
}

export default function InvestmentCalculatorPage() {
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
    const numbers = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        value === "" ? 0 : Number(value),
      ])
    ) as Record<keyof CalculatorValues, number>;

    const initialInvestment =
      numbers.setupCost +
      numbers.equipmentCost +
      numbers.workingCapital;

    const monthlyOperatingCost =
      numbers.monthlyFixedCost +
      numbers.monthlyVariableCost;

    const monthlyOperatingProfit =
      numbers.monthlyRevenue - monthlyOperatingCost;

    const profitMargin =
      numbers.monthlyRevenue > 0
        ? (monthlyOperatingProfit / numbers.monthlyRevenue) * 100
        : null;

    const paybackMonths =
      monthlyOperatingProfit > 0
        ? initialInvestment / monthlyOperatingProfit
        : null;

    return {
      initialInvestment,
      monthlyOperatingCost,
      monthlyOperatingProfit,
      profitMargin,
      paybackMonths,
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
          <h1>Investment Calculator</h1>
          <p>
            Estimate the capital needed to start a business and
            understand its basic monthly operating position.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Calculator size={36} />
        </div>
      </section>

      <div className="calculator-layout">
        <section className="calculator-panel">
          <div className="calculator-panel-heading">
            <Wallet size={22} />
            <div>
              <h2>Investment and cost inputs</h2>
              <p>Enter your own estimated amounts in Indian rupees.</p>
            </div>
          </div>

          <div className="calculator-fields">
            <NumberField
              label="Business setup cost"
              description="Registration, interiors, deposits and other setup expenses."
              value={values.setupCost}
              onChange={(value) => updateValue("setupCost", value)}
            />

            <NumberField
              label="Machinery and equipment"
              description="Machines, tools, computers and essential equipment."
              value={values.equipmentCost}
              onChange={(value) => updateValue("equipmentCost", value)}
            />

            <NumberField
              label="Initial working capital"
              description="Money reserved for early operating expenses."
              value={values.workingCapital}
              onChange={(value) => updateValue("workingCapital", value)}
            />

            <div className="calculator-divider" />

            <NumberField
              label="Expected monthly revenue"
              description="Your estimated monthly sales or service income."
              value={values.monthlyRevenue}
              onChange={(value) => updateValue("monthlyRevenue", value)}
            />

            <NumberField
              label="Monthly fixed costs"
              description="Rent, salaries and other costs that remain relatively stable."
              value={values.monthlyFixedCost}
              onChange={(value) => updateValue("monthlyFixedCost", value)}
            />

            <NumberField
              label="Monthly variable costs"
              description="Materials, packaging, delivery and other sales-related costs."
              value={values.monthlyVariableCost}
              onChange={(value) => updateValue("monthlyVariableCost", value)}
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
              <h2>Estimated results</h2>
              <p>Results update as you change the inputs.</p>
            </div>
          </div>

          {hasInvalidInput ? (
            <div className="auth-message auth-error">
              Enter valid non-negative numbers in all fields.
            </div>
          ) : (
            <>
              <article className="calculator-result-card primary-result">
                <span>Total initial capital required</span>
                <strong>
                  {formatINR(results.initialInvestment)}
                </strong>
                <small>
                  Setup + equipment + initial working capital
                </small>
              </article>

              <article className="calculator-result-card">
                <span>Monthly operating costs</span>
                <strong>
                  {formatINR(results.monthlyOperatingCost)}
                </strong>
              </article>

              <article className="calculator-result-card">
                <span>Estimated monthly operating result</span>
                <strong
                  className={
                    results.monthlyOperatingProfit >= 0
                      ? "result-positive"
                      : "result-negative"
                  }
                >
                  {formatINR(results.monthlyOperatingProfit)}
                </strong>
                <small>
                  Revenue minus fixed and variable costs
                </small>
              </article>

              <article className="calculator-result-card">
                <span>Operating margin</span>
                <strong>
                  {results.profitMargin === null
                    ? "Not available"
                    : `${results.profitMargin.toFixed(1)}%`}
                </strong>
              </article>

              <article className="calculator-result-card">
                <span>Simple estimated payback period</span>
                <strong>
                  {results.paybackMonths === null
                    ? "Not reached"
                    : `${results.paybackMonths.toFixed(1)} months`}
                </strong>
                <small>
                  Initial capital divided by monthly operating result
                </small>
              </article>
            </>
          )}

          <div className="calculator-disclaimer">
            <Info size={18} />
            <p>
              These are illustrative calculations based entirely on
              your inputs. They are not forecasts or guaranteed
              business outcomes. The operating result excludes taxes,
              loan interest, depreciation and other costs not entered.
              Actual payback may take longer or may never occur.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}