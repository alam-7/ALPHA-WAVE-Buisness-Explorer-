"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calculator,
  IndianRupee,
  Info,
  RotateCcw,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

const initialValues = {
  openingBalance: "100000",
  salesIncome: "200000",
  otherIncome: "10000",
  materialCosts: "50000",
  salaries: "40000",
  rent: "15000",
  utilities: "5000",
  marketing: "10000",
  loanPayments: "10000",
  otherExpenses: "5000",
};

type CalculatorValues = typeof initialValues;

const inputGroups = [
  {
    title: "Cash position and inflows",
    description: "Money available or expected to enter the business.",
    fields: [
      {
        key: "openingBalance",
        label: "Opening cash balance",
        hint: "Cash available at the beginning of the month.",
      },
      {
        key: "salesIncome",
        label: "Sales and service receipts",
        hint: "Money actually expected to be collected from customers.",
      },
      {
        key: "otherIncome",
        label: "Other cash inflows",
        hint: "Other receipts, excluding non-cash accounting entries.",
      },
    ],
  },
  {
    title: "Cash outflows",
    description: "Money expected to leave the business.",
    fields: [
      {
        key: "materialCosts",
        label: "Materials and purchases",
        hint: "Raw materials, inventory and product purchases.",
      },
      {
        key: "salaries",
        label: "Salaries and wages",
        hint: "Employee and worker payments.",
      },
      {
        key: "rent",
        label: "Rent and premises",
        hint: "Monthly rent and related premises costs.",
      },
      {
        key: "utilities",
        label: "Utilities",
        hint: "Electricity, water, internet and similar expenses.",
      },
      {
        key: "marketing",
        label: "Marketing and distribution",
        hint: "Advertising, delivery and promotional costs.",
      },
      {
        key: "loanPayments",
        label: "Loan repayments",
        hint: "Cash paid towards loan instalments.",
      },
      {
        key: "otherExpenses",
        label: "Other cash expenses",
        hint: "Other payments not included above.",
      },
    ],
  },
] as const;

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CashFlowCalculatorPage() {
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

    const totalInflows =
      numbers.salesIncome + numbers.otherIncome;

    const totalOutflows =
      numbers.materialCosts +
      numbers.salaries +
      numbers.rent +
      numbers.utilities +
      numbers.marketing +
      numbers.loanPayments +
      numbers.otherExpenses;

    const netCashFlow = totalInflows - totalOutflows;

    const closingBalance =
      numbers.openingBalance + netCashFlow;

    return {
      totalInflows,
      totalOutflows,
      netCashFlow,
      closingBalance,
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
          <span className="eyebrow">BUSINESS FINANCIAL TOOL</span>
          <h1>Cash Flow Calculator</h1>
          <p>
            Estimate how money moves into and out of your business
            during a typical month.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Wallet size={36} />
        </div>
      </section>

      <div className="calculator-layout">
        <section className="calculator-panel">
          <div className="calculator-panel-heading">
            <Calculator size={22} />
            <div>
              <h2>Monthly cash flow inputs</h2>
              <p>Enter estimated cash amounts in Indian rupees.</p>
            </div>
          </div>

          {inputGroups.map((group) => (
            <div className="cash-flow-group" key={group.title}>
              <div className="cash-flow-group-heading">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>

              <div className="calculator-fields">
                {group.fields.map((field) => (
                  <div className="form-group" key={field.key}>
                    <label htmlFor={field.key}>
                      {field.label}
                    </label>

                    <div className="calculator-input-wrap">
                      <IndianRupee size={17} />
                      <input
                        id={field.key}
                        type="number"
                        min="0"
                        step="100"
                        value={values[field.key]}
                        onChange={(event) =>
                          updateValue(
                            field.key,
                            event.target.value
                          )
                        }
                        placeholder="Enter amount"
                      />
                    </div>

                    <small className="form-hint">
                      {field.hint}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          ))}

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
              <h2>Cash flow results</h2>
              <p>Updated automatically from your inputs.</p>
            </div>
          </div>

          {hasInvalidInput ? (
            <div className="auth-message auth-error">
              Enter valid non-negative numbers in all fields.
            </div>
          ) : (
            <>
              <article className="calculator-result-card">
                <span>Opening cash balance</span>
                <strong>
                  {formatINR(Number(values.openingBalance))}
                </strong>
              </article>

              <article className="calculator-result-card">
                <span>Total cash inflows</span>
                <strong className="result-positive">
                  {formatINR(results.totalInflows)}
                </strong>
              </article>

              <article className="calculator-result-card">
                <span>Total cash outflows</span>
                <strong>
                  {formatINR(results.totalOutflows)}
                </strong>
              </article>

              <article className="calculator-result-card primary-result">
                <span>Net monthly cash flow</span>
                <strong
                  className={
                    results.netCashFlow >= 0
                      ? "result-positive"
                      : "result-negative"
                  }
                >
                  {formatINR(results.netCashFlow)}
                </strong>
                <small>
                  Total inflows minus total outflows
                </small>
              </article>

              <article className="calculator-result-card">
                <span>Estimated closing cash balance</span>
                <strong
                  className={
                    results.closingBalance >= 0
                      ? "result-positive"
                      : "result-negative"
                  }
                >
                  {formatINR(results.closingBalance)}
                </strong>
                <small>
                  Opening balance plus net cash flow
                </small>
              </article>

              <div className="cash-flow-status">
                {results.closingBalance >= 0 ? (
                  <>
                    <TrendingUp size={19} />
                    <span>
                      Your estimated closing cash balance is
                      non-negative.
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown size={19} />
                    <span>
                      Your estimated closing cash balance is
                      negative. Your projected cash requirements
                      exceed the available balance.
                    </span>
                  </>
                )}
              </div>
            </>
          )}

          <div className="calculator-disclaimer">
            <Info size={18} />
            <p>
              This is a simplified monthly cash flow estimate.
              Enter actual expected payment dates and collections
              when preparing a real cash flow forecast. This
              calculator does not include taxes, depreciation,
              unpaid invoices, inventory timing or every possible
              financing transaction. Loan payments are treated
              as cash outflows.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}