"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Rocket,
  RotateCcw,
  Target,
} from "lucide-react";

type RoadmapStage = {
  id: number;
  title: string;
  description: string;
  tasks: string[];
};

const stages: RoadmapStage[] = [
  {
    id: 1,
    title: "Business Idea Research",
    description: "Understand the opportunity before committing resources.",
    tasks: [
      "Define the business idea",
      "Identify the problem being solved",
      "Research customer needs",
      "Study existing competitors",
      "Identify your unique value proposition",
    ],
  },
  {
    id: 2,
    title: "Market Validation",
    description: "Check whether real customers may want the product or service.",
    tasks: [
      "Define the target customer",
      "Conduct customer interviews",
      "Study local and online demand",
      "Research competitor pricing",
      "Test the idea with potential customers",
    ],
  },
  {
    id: 3,
    title: "Business Planning",
    description: "Develop a practical plan for operating the business.",
    tasks: [
      "Choose a suitable business model",
      "Define products or services",
      "Identify sales channels",
      "Prepare an operating plan",
      "Prepare a basic business plan",
    ],
  },
  {
    id: 4,
    title: "Financial Planning",
    description: "Understand the financial requirements and assumptions.",
    tasks: [
      "Estimate initial setup costs",
      "Estimate machinery and equipment costs",
      "Calculate working capital requirements",
      "Estimate monthly operating expenses",
      "Prepare revenue and cash flow scenarios",
      "Calculate the break-even point",
    ],
  },
  {
    id: 5,
    title: "Legal and Compliance Research",
    description: "Identify the rules that may apply to the business.",
    tasks: [
      "Identify the appropriate business structure",
      "Research registration requirements",
      "Check applicable licences and permissions",
      "Research taxation requirements",
      "Check industry-specific regulations",
    ],
  },
  {
    id: 6,
    title: "Location and Infrastructure",
    description: "Determine where and how the business will operate.",
    tasks: [
      "Research suitable business locations",
      "Evaluate rent and property requirements",
      "Identify electricity and utility requirements",
      "Plan workspace and infrastructure",
      "Check transport and accessibility",
    ],
  },
  {
    id: 7,
    title: "Suppliers and Resources",
    description: "Identify the resources required for operations.",
    tasks: [
      "Identify potential suppliers",
      "Request and compare quotations",
      "Verify supplier credentials",
      "Identify machinery and equipment",
      "Plan inventory and procurement",
    ],
  },
  {
    id: 8,
    title: "Team and Operations",
    description: "Prepare the people and processes needed to run the business.",
    tasks: [
      "Identify required skills",
      "Estimate workforce requirements",
      "Define operational responsibilities",
      "Prepare standard operating procedures",
      "Plan quality checks and record keeping",
    ],
  },
  {
    id: 9,
    title: "Marketing and Launch Preparation",
    description: "Prepare the business to reach its first customers.",
    tasks: [
      "Choose a business name and identity",
      "Prepare product or service information",
      "Develop a marketing strategy",
      "Select sales and distribution channels",
      "Prepare a launch budget",
      "Plan customer support",
    ],
  },
  {
    id: 10,
    title: "Launch and Improvement",
    description: "Start operations, monitor results and improve the business.",
    tasks: [
      "Complete pre-launch checks",
      "Begin initial operations",
      "Monitor sales and expenses",
      "Collect customer feedback",
      "Review business performance",
      "Update the business plan when necessary",
    ],
  },
];

export default function LaunchRoadmapPage() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [expandedStages, setExpandedStages] = useState<number[]>([1]);

  const totalTasks = stages.reduce(
    (total, stage) => total + stage.tasks.length,
    0
  );

  const completedCount = completedTasks.length;

  const progress = useMemo(
    () =>
      totalTasks === 0
        ? 0
        : Math.round((completedCount / totalTasks) * 100),
    [completedCount, totalTasks]
  );

  function toggleTask(taskId: string) {
    setCompletedTasks((current) =>
      current.includes(taskId)
        ? current.filter((item) => item !== taskId)
        : [...current, taskId]
    );
  }

  function toggleStage(stageId: number) {
    setExpandedStages((current) =>
      current.includes(stageId)
        ? current.filter((id) => id !== stageId)
        : [...current, stageId]
    );
  }

  function resetProgress() {
    setCompletedTasks([]);
    setExpandedStages([1]);
  }

  function getStageProgress(stage: RoadmapStage) {
    const completed = stage.tasks.filter((task, index) =>
      completedTasks.includes(`${stage.id}-${index}`)
    ).length;

    return {
      completed,
      total: stage.tasks.length,
      finished: completed === stage.tasks.length,
    };
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
          <span className="eyebrow">BUSINESS EXECUTION PLANNER</span>
          <h1>Business Launch Roadmap</h1>
          <p>
            Organise your business preparation into manageable
            stages and monitor your progress.
          </p>
        </div>

        <div className="workspace-user-icon">
          <Rocket size={36} />
        </div>
      </section>

      <section className="roadmap-progress-card">
        <div className="roadmap-progress-heading">
          <div>
            <span className="eyebrow">YOUR PROGRESS</span>
            <h2>{progress}% completed</h2>
          </div>

          <div className="roadmap-progress-count">
            {completedCount} / {totalTasks} tasks
          </div>
        </div>

        <div
          className="roadmap-progress-track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Business launch roadmap progress"
        >
          <div
            className="roadmap-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="roadmap-progress-footer">
          <span>{stages.length} planning stages</span>

          <button
            type="button"
            className="button button-secondary"
            onClick={resetProgress}
          >
            <RotateCcw size={15} />
            Reset progress
          </button>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR ACTION PLAN</span>
            <h2>Ten stages to business launch</h2>
            <p>
              Expand each stage and mark tasks as you complete them.
            </p>
          </div>
        </div>

        <div className="roadmap-timeline">
          {stages.map((stage) => {
            const stageProgress = getStageProgress(stage);
            const expanded = expandedStages.includes(stage.id);

            return (
              <article className="roadmap-stage" key={stage.id}>
                <button
                  type="button"
                  className="roadmap-stage-header"
                  onClick={() => toggleStage(stage.id)}
                  aria-expanded={expanded}
                >
                  <div className="roadmap-stage-number">
                    {stageProgress.finished ? (
                      <CheckCircle2 size={23} />
                    ) : (
                      String(stage.id).padStart(2, "0")
                    )}
                  </div>

                  <div className="roadmap-stage-title">
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                    <span>
                      {stageProgress.completed} of {stageProgress.total} tasks
                      completed
                    </span>
                  </div>

                  <ArrowRight
                    size={19}
                    className={`roadmap-stage-arrow ${
                      expanded ? "expanded" : ""
                    }`}
                  />
                </button>

                {expanded && (
                  <div className="roadmap-task-list">
                    {stage.tasks.map((task, index) => {
                      const taskId = `${stage.id}-${index}`;
                      const completed =
                        completedTasks.includes(taskId);

                      return (
                        <label
                          className={`roadmap-task ${
                            completed ? "completed" : ""
                          }`}
                          key={taskId}
                        >
                          <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => toggleTask(taskId)}
                          />

                          {completed ? (
                            <CheckCircle2 size={19} />
                          ) : (
                            <Circle size={19} />
                          )}

                          <span>{task}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {progress === 100 && (
        <section className="research-intro">
          <div className="research-intro-icon">
            <Target size={25} />
          </div>

          <div>
            <h2>All roadmap tasks completed!</h2>
            <p>
              Your checklist is complete. Review your assumptions,
              verify outstanding requirements and assess whether
              the business is genuinely ready to launch.
            </p>
          </div>
        </section>
      )}

      <section className="workspace-note">
        <h2>Planning reminder</h2>
        <p>
          Completing a checklist does not guarantee business
          readiness or success. Some stages require professional
          advice, official approvals, verified quotations and
          real-world customer validation. Do not commit money
          based only on an unfinished research estimate.
        </p>
      </section>
    </main>
  );
}