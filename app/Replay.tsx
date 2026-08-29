"use client";

import { useEffect, useState } from "react";
import investigation from "../demo/investigation.json";

const labels: Record<string, string> = {
  observed: "OBSERVED",
  inferred: "INFERRED",
  confirmed: "CONFIRMED",
  proposed: "PROPOSED",
};

export function Replay() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const item = investigation.timeline[active];

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (active === investigation.timeline.length - 1) {
        setRunning(false);
      } else {
        setActive((value) => value + 1);
      }
    }, 1250);
    return () => window.clearTimeout(timer);
  }, [active, running]);

  function run() {
    setActive(0);
    setRunning(true);
  }

  return (
    <div className="replayFrame">
      <div className="replayBar">
        <div><span className="pulse" /> RUN / RUNLOOP-BLACKBOX-001</div>
        <button type="button" onClick={run} disabled={running}>
          {running ? "RUNNING…" : "REPLAY INVESTIGATION ↗"}
        </button>
      </div>

      <div className="replayBody">
        <ol className="replayNav" aria-label="Investigation replay steps">
          {investigation.timeline.map((step, index) => (
            <li key={step.id}>
              <button
                type="button"
                className={index === active ? "active" : index < active ? "done" : ""}
                onClick={() => { setActive(index); setRunning(false); }}
                aria-current={index === active ? "step" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {step.label}
              </button>
            </li>
          ))}
        </ol>

        <div className="replayOutput" aria-live="polite">
          <div className="outputMeta">
            <span className={`state state-${item.status}`}>{labels[item.status]}</span>
            <span>AGENT / {item.agent}</span>
            <span>{item.metric}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
          <div className="pathLine" aria-label="Confirmed attack path">
            {investigation.path.map((node, index) => (
              <span key={node} className={index <= active - 1 ? "lit" : ""}>
                {node}{index < investigation.path.length - 1 ? <b>→</b> : null}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
