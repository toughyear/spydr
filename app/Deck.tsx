"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import recon from "../demo/recon.json";
import findings from "../demo/findings.json";

type Finding = (typeof findings)[number];

function Frame({
  chapter,
  title,
  children,
  tone = "dark",
  className = "",
}: {
  chapter: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "dark" | "light" | "acid" | "red";
  className?: string;
}) {
  return (
    <section className={`slide slide-${tone} ${className}`}>
      <div className="slideChapter">{chapter}</div>
      <div className="slideContent">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function FindingSlide({ finding, number }: { finding: Finding; number: number }) {
  return (
    <Frame
      chapter={`0${number} / FINDING · ${finding.severity}`}
      title={finding.title}
      tone={finding.severity === "CRITICAL" ? "red" : "light"}
      className="findingSlide"
    >
      <div className="findingPath">
        {finding.path.map((step, index) => (
          <span key={step}>{step}{index < finding.path.length - 1 ? <b>→</b> : null}</span>
        ))}
      </div>
      <div className="findingProof">
        <div><span>PROOF</span><p>{finding.proof}</p></div>
        <div><span>LIMIT</span><p>{finding.limit}</p></div>
      </div>
    </Frame>
  );
}

export function Deck() {
  const [index, setIndex] = useState(0);

  const slides: ReactNode[] = [
    <Frame key="cover" chapter="SPYDR / CODEX COMMUNITY HACKATHON" title={<>We used Runloop<br />to red-team Runloop.</>} className="coverSlide">
      <p className="heroCopy">A black-box agent found real vulnerabilities in the platform running it.</p>
      <div className="coverStamp"><span>1 CRITICAL</span><span>4 HIGH</span><span>RUNTIME PROOF</span></div>
    </Frame>,

    <Frame key="thesis" chapter="01 / THE IDEA" title={<>Code tells you<br />what might happen.</>} tone="light">
      <p className="bigAnswer">The running product tells you what an attacker can actually make happen.</p>
    </Frame>,

    <Frame key="seed" chapter="02 / RECON" title={<>It started with<br />one domain.</>}>
      <div className="seedDomain">runloop.ai<span className="blink">_</span></div>
      <p className="singleLine">No source code. No internal map. The same starting point as an outsider.</p>
    </Frame>,

    <Frame key="certs" chapter="03 / CERTIFICATE RECON" title={<>Public records exposed<br />the shape of the system.</>} className="reconSlide">
      <div className="reconTerminal">
        <div className="terminalBar"><span>crt.name/v1/search?apex=runloop.ai</span><b>{recon.names.length} names</b></div>
        <div className="domainGrid">
          {recon.names.map((name) => <span className={recon.focus.includes(name) ? "focusDomain" : ""} key={name}>{name}</span>)}
        </div>
      </div>
      <p className="sourceNote">Certificate history creates leads. Some hosts responded; others could be historical. Visibility is not a vulnerability.</p>
    </Frame>,

    <Frame key="docs" chapter="04 / DOCUMENTATION" title={<>Then we read<br />how the product works.</>} tone="acid">
      <div className="docsUrl">docs.runloop.ai</div>
      <div className="docConcepts">
        <span>AGENTS</span><b>→</b><span>DEVBOXES</span><b>→</b><span>GATEWAYS</span><b>→</b><span>MCP</span><b>→</b><span>WORKSTATIONS</span>
      </div>
      <p className="darkNote">The docs did not prove bugs. They showed where authority moves.</p>
    </Frame>,

    <Frame key="model" chapter="05 / PRODUCT MODEL" title={<>The question was not<br />“where is the input?”</>}>
      <p className="bigQuestion">Where does user input gain more authority?</p>
      <div className="authorityPath"><span>USER</span><b>→</b><span>DEVBOX</span><b>→</b><span className="hot">CONTROL PLANE</span><b>→</b><span>SECRET / HOST / NETWORK</span></div>
    </Frame>,

    <Frame key="signup" chapter="06 / ORDINARY USER" title={<>The agent signed up<br />and became a Member.</>} tone="light">
      <div className="roleCard"><span>ROLE</span><strong>MEMBER</strong><p>Could launch agents.<br />Could not administer private gateways.<br />Held no internal privilege.</p></div>
      <p className="singleLine darkText">The test began from normal self-service access—not an employee or admin account.</p>
    </Frame>,

    <Frame key="loop" chapter="07 / INVESTIGATION LOOP" title={<>Every guess had to<br />survive an oracle.</>}>
      <div className="loopSteps">
        {[
          ["01", "OBSERVE"], ["02", "HYPOTHESIZE"], ["03", "PROBE"], ["04", "ORACLE"], ["05", "UPDATE"],
        ].map(([n, label]) => <div key={n}><span>{n}</span><b>{label}</b></div>)}
      </div>
      <p className="singleLine">Controls separated Devbox behavior from Runloop server behavior. Failed ideas stayed failed.</p>
    </Frame>,

    <FindingSlide key="finding-1" finding={findings[0]} number={8} />,
    <FindingSlide key="finding-2" finding={findings[1]} number={9} />,
    <FindingSlide key="finding-3" finding={findings[2]} number={10} />,
    <FindingSlide key="finding-4" finding={findings[3]} number={11} />,
    <FindingSlide key="finding-5" finding={findings[4]} number={12} />,

    <Frame key="truth" chapter="13 / PROOF BOUNDARY" title={<>Strong findings say<br />what did not happen.</>}>
      <div className="truthColumns">
        <div><span className="yes">CONFIRMED</span><p>Server-side requests.<br />OAuth redirect into loopback.<br />Cross-user credential use.<br />Host command outside the chosen root.<br />Upstream error reflection.</p></div>
        <div><span className="no">NOT CLAIMED</span><p>No cloud credential.<br />No cross-organization access.<br />No Runloop host compromise.<br />No destructive action.</p></div>
      </div>
    </Frame>,

    <Frame key="fixes" chapter="14 / REMEDIATION" title={<>Each path had one edge<br />worth cutting first.</>} tone="acid">
      <div className="fixList">
        {findings.map((finding, i) => <div key={finding.short}><span>0{i + 1}</span><b>{finding.short}</b><p>{finding.fix}</p></div>)}
      </div>
    </Frame>,

    <Frame key="swarm" chapter="15 / HOW SPYDR SCALES" title={<>One investigation.<br />Seven narrow agents.</>}>
      <div className="agentGrid">
        {["RECON", "PRODUCT MODEL", "HYPOTHESIS", "PROBE", "ORACLE", "CHAIN", "REPAIR"].map((agent, i) => <span key={agent}><i>0{i + 1}</i>{agent}</span>)}
      </div>
      <p className="singleLine">Runloop sandboxes isolate the workers. One evidence graph keeps them honest.</p>
    </Frame>,

    <Frame key="close" chapter="16 / SPYDR" title={<>Find the path<br />before they do.</>} tone="light" className="closeSlide">
      <p className="bigAnswer">Attacker input → runtime behavior → gained authority → impact → fix.</p>
      <a className="repoLink" href="https://github.com/toughyear/spydr" target="_blank" rel="noreferrer">github.com/toughyear/spydr ↗</a>
    </Frame>,
  ];

  const last = slides.length - 1;
  const next = useCallback(() => setIndex((value) => Math.min(last, value + 1)), [last]);
  const previous = useCallback(() => setIndex((value) => Math.max(0, value - 1)), []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(event.key)) { event.preventDefault(); next(); }
      if (["ArrowLeft", "ArrowUp", "Backspace"].includes(event.key)) { event.preventDefault(); previous(); }
      if (event.key === "Home") setIndex(0);
      if (event.key === "End") setIndex(last);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last, next, previous]);

  function tapThrough(event: React.PointerEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("button,a")) return;
    if (event.clientX < window.innerWidth * 0.28) previous(); else next();
  }

  return (
    <main className="deck" onPointerUp={tapThrough}>
      <header className="deckHeader">
        <button className="deckBrand" type="button" onClick={() => setIndex(0)}><i>✳</i> SPYDR</button>
        <span>CODEX × RUNLOOP</span>
      </header>

      <div className="progress"><i style={{ width: `${((index + 1) / slides.length) * 100}%` }} /></div>
      <div className="slideStage" key={index} aria-live="polite">{slides[index]}</div>

      <footer className="deckControls">
        <span className="tapHint">TAP OR USE ARROW KEYS</span>
        <div className="slideCount"><b>{String(index + 1).padStart(2, "0")}</b> / {String(slides.length).padStart(2, "0")}</div>
        <div className="controlButtons">
          <button type="button" onClick={previous} disabled={index === 0} aria-label="Previous slide">←</button>
          <button type="button" onClick={next} disabled={index === last} aria-label="Next slide">→</button>
        </div>
      </footer>
    </main>
  );
}
