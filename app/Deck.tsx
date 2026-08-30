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
      chapter={`FINDING ${number} OF ${findings.length} / ACTIVE / ${finding.severity}`}
      title={finding.title}
      tone="light"
      className={`findingSlide ${finding.severity === "CRITICAL" ? "findingCritical" : ""}`}
    >
      <div className="findingPath">
        {finding.path.map((step, index) => (
          <span key={step}>{step}{index < finding.path.length - 1 ? <b>→</b> : null}</span>
        ))}
      </div>
      <div className="findingProof">
        <div><span>PROOF</span><p>{finding.proof}</p></div>
      </div>
      <p className="findingNotice">RUNLOOP TEAM: PLEASE REVIEW AFTER THE HACKATHON OR CONTACT RAJIV AT RAJIVSINGH430@GMAIL.COM</p>
    </Frame>
  );
}

export function Deck() {
  const [index, setIndex] = useState(0);

  const slides: ReactNode[] = [
    <Frame key="cover" chapter="SPYDR / CODEX COMMUNITY HACKATHON" title={<>SPYDR is your<br />autonomous red team.</>} className="coverSlide">
      <p className="heroCopy">Give me a domain. I find and prove security bugs in the live product.</p>
      <div className="coverProof"><span>LIVE PROOF</span><strong>I found 5 active vulnerabilities in Runloop.</strong><em>1 CRITICAL · 4 HIGH</em></div>
    </Frame>,

    <Frame key="thesis" chapter="WHY LIVE TESTING" title={<>Source code shows<br />possible bugs.</>} tone="light">
      <p className="bigAnswer">I test the live product. This shows what an attacker can really do.</p>
    </Frame>,

    <Frame key="seed" chapter="STEP 1 / START" title={<>First, give me<br />one domain.</>}>
      <div className="seedDomain">runloop.ai<span className="blink">_</span></div>
      <p className="singleLine">I start with public information. I see what an outside user sees.</p>
    </Frame>,

    <Frame key="certs" chapter="STEP 2 / FIND ENDPOINTS" title={<>I find public<br />endpoints.</>} className="reconSlide">
      <div className="reconTerminal">
        <div className="terminalBar"><span>crt.name/v1/search?apex=runloop.ai</span><b>{recon.names.length} names</b></div>
        <div className="domainGrid">
          {recon.names.map((name) => <span className={recon.focus.includes(name) ? "focusDomain" : ""} key={name}>{name}</span>)}
        </div>
      </div>
      <p className="sourceNote">Certificate records give me a list to check. A visible endpoint is not a vulnerability.</p>
    </Frame>,

    <Frame key="docs" chapter="STEP 3 / LEARN" title={<>I read the<br />public docs.</>} tone="acid">
      <div className="docsUrl">docs.runloop.ai</div>
      <div className="docConcepts">
        <span>AGENTS</span><b>→</b><span>DEVBOXES</span><b>→</b><span>GATEWAYS</span><b>→</b><span>MCP</span><b>→</b><span>WORKSTATIONS</span>
      </div>
      <p className="darkNote">The docs show me the main systems and how they connect.</p>
    </Frame>,

    <Frame key="signup" chapter="STEP 4 / SIGN UP" title={<>I create a normal<br />user account.</>} tone="light">
      <div className="roleCard"><span>ROLE</span><strong>MEMBER</strong><p>I can launch agents.<br />I cannot manage private gateways.<br />I have no admin access.</p></div>
      <p className="singleLine darkText">I use the same self-service access as a normal customer.</p>
    </Frame>,

    <Frame key="graph" chapter="STEP 5 / BUILD A GRAPH" title={<>I build a map<br />of the product.</>} className="graphSlide">
      <div className="graphModel" aria-label="Member creates agent, agent runs in devbox, devbox calls gateway, gateway reaches control plane">
        <span><i>USER</i>MEMBER</span><b>CREATES →</b><span><i>TASK</i>AGENT</span><b>RUNS IN →</b><span><i>SANDBOX</i>DEVBOX</span><b>CALLS →</b><span><i>SERVICE</i>GATEWAY</span><b>REACHES →</b><span className="graphHot"><i>TRUSTED SERVICE</i>CONTROL PLANE</span>
      </div>
      <p className="singleLine">The map contains users, systems, actions, and secrets. Each line shows how two parts connect.</p>
    </Frame>,

    <Frame key="model" chapter="STEP 6 / FIND TRUST CHANGES" title={<>I find where normal input<br />reaches a trusted system.</>}>
      <p className="bigQuestion">Can user input make the system perform a sensitive action?</p>
      <div className="authorityPath"><span>USER INPUT</span><b>→</b><span>AGENT</span><b>→</b><span className="hot">RUNLOOP SERVICE</span><b>→</b><span>SECRET / HOST / NETWORK</span></div>
    </Frame>,

    <Frame key="loop" chapter="STEP 7 / TEST" title={<>I test one idea<br />at a time.</>}>
      <div className="loopSteps">
        {[
          ["01", "WATCH"], ["02", "FORM IDEA"], ["03", "TEST"], ["04", "COMPARE"], ["05", "LEARN"],
        ].map(([n, label]) => <div key={n}><span>{n}</span><b>{label}</b></div>)}
      </div>
      <p className="singleLine">I compare each result with a control test. This tells me which system performed the action.</p>
    </Frame>,

    <FindingSlide key="finding-1" finding={findings[0]} number={1} />,
    <FindingSlide key="finding-2" finding={findings[1]} number={2} />,
    <FindingSlide key="finding-3" finding={findings[2]} number={3} />,
    <FindingSlide key="finding-4" finding={findings[3]} number={4} />,
    <FindingSlide key="finding-5" finding={findings[4]} number={5} />,

    <Frame key="truth" chapter="RESULT / EVIDENCE" title={<>I report only<br />what I prove.</>}>
      <div className="truthColumns truthSingle">
        <div><span className="yes">PROVEN IN LIVE TESTS</span><p>Server-side requests.<br />OAuth redirect to a local address.<br />Use of another user&apos;s credential.<br />A command outside the selected folder.<br />A server response returned to the user.</p></div>
      </div>
    </Frame>,

    <Frame key="fixes" chapter="RESULT / FIXES" title={<>I give one fix<br />for each bug.</>} tone="acid">
      <div className="fixList">
        {findings.map((finding, i) => <div key={finding.short}><span>0{i + 1}</span><b>{finding.short}</b><p>{finding.fix}</p></div>)}
      </div>
    </Frame>,

    <Frame key="swarm" chapter="HOW I SCALE" title={<>I use seven<br />small agents.</>}>
      <div className="agentGrid">
        {["FIND ENDPOINTS", "LEARN PRODUCT", "FORM IDEAS", "RUN TESTS", "CHECK RESULTS", "BUILD PROOF", "WRITE FIX"].map((agent, i) => <span key={agent}><i>0{i + 1}</i>{agent}</span>)}
      </div>
      <p className="singleLine">Runloop sandboxes keep each agent separate. All agents update the same evidence graph.</p>
    </Frame>,

    <Frame key="close" chapter="SPYDR" title={<>Give me a domain.<br />I will test it.</>} tone="light" className="closeSlide">
      <p className="bigAnswer">Find the input. Test the live system. Prove the impact. Give the fix.</p>
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
