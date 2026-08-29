import { Replay } from "./Replay";

const workers = [
  ["01", "Recon", "Maps what an outsider can see and reach."],
  ["02", "Product model", "Learns the jobs, actors, and authority boundaries."],
  ["03", "Hypothesis", "Generates competing explanations, not one guess."],
  ["04", "Probe", "Runs the smallest safe test that separates them."],
  ["05", "Oracle", "Reads callbacks, errors, timing, and state changes."],
  ["06", "Chain", "Connects small capabilities into business impact."],
  ["07", "Repair", "Writes the fix and the regression test."],
];

const truth = [
  ["Observed", "A runtime event SPYDR directly measured."],
  ["Inferred", "The best current explanation, waiting for a stronger test."],
  ["Confirmed", "The full claimed boundary was exercised end to end."],
  ["Rejected", "A plausible path that the evidence disproved."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="wordmark" href="#top" aria-label="SPYDR home">
          <span className="mark" aria-hidden="true">✳</span> SPYDR
        </a>
        <div className="navMeta">
          <span>CODEX × RUNLOOP</span>
          <a href="#proof">THE PROOF ↓</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span className="pulse" /> AUTONOMOUS RED TEAM</div>
        <h1>Find the path<br />before they do.</h1>
        <div className="heroBottom">
          <p>
            SPYDR learns a product from the outside, attacks its assumptions at
            runtime, and proves which paths lead to real impact.
          </p>
          <a className="primary" href="#proof">See the proof <span>↘</span></a>
        </div>
      </section>

      <section className="statement" id="proof">
        <div className="shell statementGrid">
          <div className="sectionIndex">[ 00 / PROOF ]</div>
          <div>
            <p className="statementLead">We used Runloop to<br />red-team Runloop.</p>
            <p className="statementCopy">
              The agent found real runtime security boundaries while running on
              the platform it was testing. Source review suggested the questions.
              Controlled probes supplied the proof.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell" aria-labelledby="replay-title">
        <div className="sectionHead">
          <div className="sectionIndex">[ 01 / RUNTIME REPLAY ]</div>
          <div>
            <h2 id="replay-title">Watch the investigation think.</h2>
            <p>One shared case file. Specialist workers. Every claim tied to evidence.</p>
          </div>
        </div>
        <Replay />
      </section>

      <section className="section shell" aria-labelledby="difference-title">
        <div className="sectionHead">
          <div className="sectionIndex">[ 02 / THE DIFFERENCE ]</div>
          <div><h2 id="difference-title">Code is a map.<br />Runtime is the territory.</h2></div>
        </div>
        <div className="comparison">
          <article className="comparisonCard mutedCard">
            <span className="cardNumber">OLD WAY</span>
            <h3>Looks suspicious.</h3>
            <p>Scanners find patterns and hand engineers a list. They cannot tell whether the pieces form a usable path.</p>
            <div className="verdict">△ POSSIBLE</div>
          </article>
          <article className="comparisonCard activeCard">
            <span className="cardNumber">SPYDR</span>
            <h3>Proves the path.</h3>
            <p>Agents use the real product, test competing explanations, and stop only when the boundary is demonstrated.</p>
            <div className="verdict">● CONFIRMED</div>
          </article>
        </div>
      </section>

      <section className="section shell" aria-labelledby="workers-title">
        <div className="sectionHead">
          <div className="sectionIndex">[ 03 / AGENT SWARM ]</div>
          <div>
            <h2 id="workers-title">One case. Many hunters.</h2>
            <p>The coordinator launches narrow workers in isolated Runloop sandboxes. They share evidence, not a giant prompt.</p>
          </div>
        </div>
        <div className="workerGrid">
          {workers.map(([number, name, detail]) => (
            <article className="worker" key={number}>
              <span>{number}</span><h3>{name}</h3><p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="truth-title">
        <div className="sectionHead">
          <div className="sectionIndex">[ 04 / EVIDENCE ]</div>
          <div>
            <h2 id="truth-title">No maybes dressed as findings.</h2>
            <p>SPYDR preserves the difference between a lead and a vulnerability.</p>
          </div>
        </div>
        <div className="truthGrid">
          {truth.map(([name, detail], index) => (
            <div className="truthRow" key={name}>
              <span>0{index + 1}</span><b>{name}</b><p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="caseStudy">
        <div className="shell">
          <div className="sectionIndex darkIndex">[ 05 / RUNLOOP CASE STUDY ]</div>
          <p className="caseHeadline">A sandbox looked isolated.<br />The request was not.</p>
          <div className="casePath" aria-label="Sanitized confirmed path">
            <span>ATTACKER INPUT</span><b>→</b><span>AGENT GATEWAY</span><b>→</b><span>SERVER REQUEST</span><b>→</b><span>TRUST BOUNDARY</span>
          </div>
          <div className="caseNotes">
            <article><span>CONFIRMED</span><p>A Runloop-side service made the controlled request outside the disposable agent sandbox.</p></article>
            <article><span>NOT CLAIMED</span><p>No cloud credential, cross-tenant data, or destructive impact was accessed.</p></article>
            <article><span>FIX</span><p>Validate resolved destinations, block private ranges, and re-check every redirect hop.</p></article>
          </div>
          <p className="disclosure">Sanitized for responsible disclosure. Full evidence is available privately to Runloop and the judges.</p>
        </div>
      </section>

      <section className="closing shell">
        <div className="eyebrow"><span className="pulse" /> THE OUTPUT</div>
        <h2>Not a list of alerts.<br />A path you can cut.</h2>
        <div className="closingBottom">
          <p>Attacker input → system behavior → gained authority → impact → fix → regression test.</p>
          <a className="primary" href="https://github.com/toughyear/spydr">View the code <span>↗</span></a>
        </div>
      </section>

      <footer className="footer shell">
        <span>SPYDR / 2026</span>
        <span>BUILT AT CODEX COMMUNITY HACKATHON · SAN FRANCISCO</span>
        <span>YOUR AUTONOMOUS RED TEAM</span>
      </footer>
    </main>
  );
}
