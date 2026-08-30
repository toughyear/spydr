"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { FaSpider } from "react-icons/fa";
import recon from "../demo/recon.json";
import findings from "../demo/findings.json";

type Finding = (typeof findings)[number];

const ASCII_SPIDER = String.raw`           ;               ,
         ,;                 '.
        ;:                   :;
       ::                     ::
       ::                     ::
       ':                     :
        :.                    :
     ;' ::                   ::  '
    .'  ';                   ;'  '.
   ::    :;                 ;:    ::
   ;      :;.             ,;:     ::
   :;      :;:           ,;"      ::
   ::.      ':;  ..,.;  ;:'     ,.;:
    "'"...   '::,::::: ;:   .;.""'
        '"""....;:::::;,;."""
    .:::.....'"':::::::'",...;::::;.
   ;:' '""'"";.,;:::::;.'""""""  ':;
  ::'         ;::;:::;::..         :;
 ::         ,;:::::::::::;:..       ::
 ;'     ,;;:;:::::::::::::::";..    ':.
::     ;:"  ::::::"""'::::::  ":     ::
 :.    ::   ::::::;  :::::::   :     ;
  ;    ::   :::::::  :::::::   :    ;
   '   ::   ::::::....:::::'  ,:   '
    '  ::    :::::::::::::"   ::
       ::     ':::::::::"'    ::
       ':       """""""'      ::
        ::                   ;:
        ':;                 ;:"
          ';              ,;'
            "'           '"
              '`;

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
  tone?: "dark" | "light" | "acid";
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
  const severityBars = finding.severity === "CRITICAL"
    ? [18, 24, 31, 27, 39, 46, 41, 58, 67, 61, 78, 100]
    : [14, 20, 24, 22, 31, 37, 34, 45, 52, 49, 61, 74];

  return (
    <Frame
      chapter={`FINDING ${number} OF ${findings.length}`}
      title={finding.severity}
      className={`findingSlide finding${finding.severity}`}
    >
      <div className="findingLive"><i />LIVE ON RUNLOOP.AI</div>
      <div className="findingSummary">
        <div><h3>{finding.title}</h3><p className="findingImpact"><span>IMPACT</span>{finding.impact}</p></div>
        <div className="severityMeter" aria-label={`${finding.severity} severity signal`}>
          <span>SEVERITY SIGNAL</span>
          <div>{severityBars.map((height, barIndex) => <i key={`${height}-${barIndex}`} style={{ height: `${height}%`, animationDelay: `${barIndex * 45}ms` }} />)}</div>
          <b>{finding.severity}</b>
        </div>
      </div>
      <div className="findingPathLabel"><i />ATTACK PATH PROVEN</div>
      <div className="findingPath">
        {finding.path.map((step, index) => (
          <div key={step}><i /><span>{step}</span><b>{String(index + 1).padStart(2, "0")}</b></div>
        ))}
      </div>
      <div className="findingDetails">
        <div><span>PROVEN</span><p>{finding.proof}</p></div>
        <div><span>FIX</span><p>{finding.fix}</p></div>
      </div>
      <p className="findingNotice">RUNLOOP TEAM: PLEASE REVIEW AFTER THE HACKATHON. CONTACT RAJEEV AT RAJIVSINGH430@GMAIL.COM</p>
    </Frame>
  );
}

export function Deck() {
  const [index, setIndex] = useState(0);

  const slides: ReactNode[] = [
    <Frame key="cover" chapter="SPYDR / CODEX COMMUNITY HACKATHON" title={<>SPYDR is your<br />autonomous red team.</>} className="coverSlide">
      <pre className="coverSpider" aria-hidden="true">{ASCII_SPIDER}</pre>
      <p className="heroCopy">Give SPYDR a domain. SPYDR finds and proves security bugs in the live product.</p>
      <div className="coverProof"><span>LIVE PROOF</span><strong>SPYDR found 6 active vulnerabilities in Runloop.</strong><em>1 CRITICAL · 5 HIGH</em></div>
    </Frame>,

    <Frame key="thesis" chapter="WHY LIVE TESTING" title={<>Source code shows<br />possible bugs.</>} tone="light">
      <p className="bigAnswer">SPYDR tests the live product. The result shows what an attacker can really do.</p>
    </Frame>,

    <Frame key="seed" chapter="STEP 1 / START" title={<>SPYDR starts with<br />one domain.</>}>
      <div className="crawlGraph hubGraph" aria-label="SPYDR expands runloop.ai into DNS and certificate lookup, docs.runloop.ai, app.runloop.ai, and reflex.runloop.ai">
        <i className="hubEdge hubEdgeTop" /><i className="hubEdge hubEdgeRight" /><i className="hubEdge hubEdgeBottom" /><i className="hubEdge hubEdgeLeft" />
        <span className="crawlNode hubRoot"><FaSpider aria-hidden="true" /><b>SEED DOMAIN</b>runloop.ai</span>
        <span className="crawlNode hubTop"><b>READ</b>docs.runloop.ai</span>
        <span className="crawlNode hubRight"><b>OPEN</b>app.runloop.ai</span>
        <span className="crawlNode hubBottom"><b>CHECK</b>reflex.runloop.ai</span>
        <span className="crawlNode hubLeft"><b>LOOK UP</b>DNS + CERTS</span>
        <span className="hubStatus"><i />SURFACE EXPANDING</span>
      </div>
      <p className="singleLine">SPYDR starts with public information. The view is the same as an outside user.</p>
    </Frame>,

    <Frame key="certs" chapter="STEP 2 / FIND ENDPOINTS" title={<>SPYDR finds public<br />endpoints.</>} className="reconSlide">
      <div className="reconTerminal">
        <div className="terminalBar"><span><i className="crawlPulse" />crt.name/v1/search?apex=runloop.ai</span><b>{recon.names.length} names</b></div>
        <div className="domainGrid">
          {recon.names.map((name, itemIndex) => <span style={{ animationDelay: `${itemIndex * 28}ms` }} className={recon.focus.includes(name) ? "focusDomain" : ""} key={name}>{name}</span>)}
        </div>
      </div>
      <p className="sourceNote">Certificate records give SPYDR a list to check. A visible endpoint is not a vulnerability.</p>
    </Frame>,

    <Frame key="docs" chapter="STEP 3 / LEARN" title={<>SPYDR reads the<br />public docs.</>} tone="acid">
      <div className="docsUrl">docs.runloop.ai</div>
      <div className="docConcepts">
        <span>AGENTS</span><b>→</b><span>DEVBOXES</span><b>→</b><span>GATEWAYS</span><b>→</b><span>MCP</span><b>→</b><span>WORKSTATIONS</span>
      </div>
      <p className="darkNote">The docs show SPYDR the main systems and how they connect.</p>
    </Frame>,

    <Frame key="signup" chapter="STEP 4 / SIGN UP" title={<>SPYDR creates a normal<br />user account.</>} tone="light">
      <div className="accessPass" aria-label="Runloop self-service access pass for SPYDR with Member role">
        <div className="passHeader"><span>RUNLOOP ACCESS PASS</span><b>SELF SERVICE</b></div>
        <div className="passBody">
          <div className="passPhoto"><FaSpider /><span>SPYDR</span></div>
          <dl><div><dt>ACCOUNT</dt><dd>SPYDR AGENT</dd></div><div><dt>ROLE</dt><dd>MEMBER</dd></div><div><dt>ACCESS</dt><dd>NORMAL CUSTOMER</dd></div></dl>
          <div className="passRules"><span>CAN</span><b>Launch agents</b><span>CANNOT</span><b>Manage private gateways</b><span>ADMIN</span><b>None</b></div>
        </div>
        <div className="passFooter"><i /><span>RL-SPYDR-0829</span><strong>ADMITTED</strong></div>
      </div>
      <p className="singleLine darkText">SPYDR uses the same self-service access as a normal customer.</p>
    </Frame>,

    <Frame key="graph" chapter="STEP 5 / BUILD A GRAPH" title={<>SPYDR builds a graph<br />of the product.</>} className="graphSlide">
      <div className="graphModel" aria-label="Member creates agent, agent runs in devbox, devbox calls gateway, gateway reaches control plane">
        <span><i>USER</i>MEMBER</span><b>CREATES →</b><span><i>TASK</i>AGENT</span><b>RUNS IN →</b><span><i>SANDBOX</i>DEVBOX</span><b>CALLS →</b><span><i>SERVICE</i>GATEWAY</span><b>REACHES →</b><span className="graphHot"><i>TRUSTED SERVICE</i>CONTROL PLANE</span>
      </div>
      <p className="singleLine">The map contains users, systems, actions, and secrets. Each line shows how two parts connect.</p>
    </Frame>,

    <Frame key="model" chapter="STEP 6 / FIND TRUST CHANGES" title={<>SPYDR finds where input<br />reaches a trusted system.</>}>
      <p className="bigQuestion">Can user input make the system perform a sensitive action?</p>
      <div className="authorityPath"><span>USER INPUT</span><b>→</b><span>AGENT</span><b>→</b><span className="hot">RUNLOOP SERVICE</span><b>→</b><span>SECRET / HOST / NETWORK</span></div>
    </Frame>,

    <Frame key="loop" chapter="STEP 7 / TEST" title={<>SPYDR tests one idea<br />at a time.</>}>
      <div className="loopSteps">
        {[
          ["01", "WATCH"], ["02", "FORM IDEA"], ["03", "TEST"], ["04", "COMPARE"], ["05", "LEARN"],
        ].map(([n, label]) => <div key={n}><span>{n}</span><b>{label}</b></div>)}
      </div>
      <p className="singleLine">SPYDR compares each result with a control test. The comparison shows which system performed the action.</p>
    </Frame>,

    <FindingSlide key="finding-1" finding={findings[0]} number={1} />,
    <FindingSlide key="finding-2" finding={findings[1]} number={2} />,
    <FindingSlide key="finding-3" finding={findings[2]} number={3} />,
    <FindingSlide key="finding-4" finding={findings[3]} number={4} />,
    <FindingSlide key="finding-5" finding={findings[4]} number={5} />,
    <FindingSlide key="finding-6" finding={findings[5]} number={6} />,

    <Frame key="truth" chapter="RESULT / EVIDENCE" title={<>SPYDR reports only<br />proven results.</>}>
      <div className="truthColumns truthSingle">
        <div><span className="yes">PROVEN IN LIVE TESTS</span><p>Server-side requests.<br />OAuth redirect to a local address.<br />Use of another user&apos;s credential.<br />Deployment-wide feature-flag write access.<br />A command outside the selected folder.<br />A server response returned to the user.</p></div>
      </div>
    </Frame>,

    <Frame key="fixes" chapter="RESULT / FIXES" title={<>SPYDR gives one fix<br />for each bug.</>} tone="acid">
      <div className="fixList">
        {findings.map((finding, i) => <div key={finding.short}><span>0{i + 1}</span><b>{finding.short}</b><p>{finding.fix}</p></div>)}
      </div>
    </Frame>,

    <Frame key="swarm" chapter="HOW SPYDR SCALES" title={<>SPYDR runs seven<br />small agents.</>}>
      <div className="agentGrid">
        {["FIND ENDPOINTS", "LEARN PRODUCT", "FORM IDEAS", "RUN TESTS", "CHECK RESULTS", "BUILD PROOF", "WRITE FIX"].map((agent, i) => <span key={agent}><i>0{i + 1}</i>{agent}</span>)}
      </div>
      <p className="singleLine">Runloop sandboxes keep each agent separate. All agents update the same evidence graph.</p>
    </Frame>,

    <Frame key="close" chapter="SPYDR" title={<>Give SPYDR a domain.<br />SPYDR will test it.</>} tone="light" className="closeSlide">
      <p className="bigAnswer">Find the input. Test the live system. Prove the impact. Give the fix.</p>
      <a className="repoLink" href="https://github.com/toughyear/spydr" target="_blank" rel="noreferrer">github.com/toughyear/spydr ↗</a>
    </Frame>,
  ];

  const last = slides.length - 1;
  const navigate = useCallback((value: number, replace = false) => {
    const nextIndex = Math.max(0, Math.min(last, value));
    setIndex(nextIndex);
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(nextIndex + 1));
    window.history[replace ? "replaceState" : "pushState"]({}, "", url);
  }, [last]);
  const next = useCallback(() => navigate(index + 1), [index, navigate]);
  const previous = useCallback(() => navigate(index - 1), [index, navigate]);

  useEffect(() => {
    function syncFromUrl() {
      const requested = Number(new URLSearchParams(window.location.search).get("slide"));
      setIndex(Number.isFinite(requested) && requested > 0 ? Math.min(last, requested - 1) : 0);
    }
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [last]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(event.key)) { event.preventDefault(); next(); }
      if (["ArrowLeft", "ArrowUp", "Backspace"].includes(event.key)) { event.preventDefault(); previous(); }
      if (event.key === "Home") navigate(0);
      if (event.key === "End") navigate(last);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [last, navigate, next, previous]);

  function tapThrough(event: React.PointerEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("button,a")) return;
    if (event.clientX < window.innerWidth * 0.28) previous(); else next();
  }

  return (
    <main className="deck" onPointerUp={tapThrough}>
      <header className="deckHeader">
        <button className="deckBrand" type="button" onClick={() => navigate(0)} aria-label="Go to the SPYDR cover">
          <FaSpider className="brandSpider" aria-hidden="true" /><b>SPYDR</b>
        </button>
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
