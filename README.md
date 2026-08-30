# SPYDR

**Your autonomous red team.**

SPYDR learns a product from the outside, attacks its assumptions at runtime,
and proves which paths lead to real impact.

> We used Runloop to red-team Runloop—and found real runtime security
> boundaries that source review alone could not prove.

## Why it exists

Most security tools return suspicious pieces. Attackers compose pieces into a
path. SPYDR does the second job.

It starts with the same view as an outsider: a domain, public documentation,
and self-service product access. A coordinator launches narrow workers in
isolated Runloop sandboxes. The workers share one structured case file, create
competing hypotheses, run bounded probes, interpret runtime oracles, and join
confirmed capabilities into an end-to-end attack path.

```text
target
  → recon
  → product and authority model
  → competing hypotheses
  → isolated runtime probes
  → observable oracles
  → confirmed attack path
  → fix and regression test
```

## Try the replay

```bash
npm install
npm run demo
npm run dev
```

The demo is a deterministic, sanitized replay. It makes no network requests
and needs no credentials. The public case study withholds sensitive
reproduction details for responsible disclosure.

The browser experience is a tap-through deck. Click the right side, use the
visible controls, or press the arrow keys to walk from recon through proof.

## The agent swarm

| Worker | Job |
| --- | --- |
| Recon | Map what an outsider can see and reach |
| Product model | Learn jobs, actors, data, and authority boundaries |
| Hypothesis | Generate competing explanations for suspicious behavior |
| Probe | Design the smallest safe experiment that separates them |
| Oracle | Interpret callbacks, errors, timing, and state changes |
| Chain builder | Compose confirmed capabilities into impact |
| Remediation | Cut the weakest edge and write the regression test |

The coordinator contract is in [`agents/main-agent.md`](agents/main-agent.md).
The seven worker contracts live under [`skills/`](skills/).

## Shared context, not one giant prompt

Every worker reads a small task envelope and returns an evidence patch. The
coordinator merges patches into one case file containing:

- observed entities and relationships;
- confirmed, inferred, contradicted, and rejected claims;
- hypotheses and their falsification probes;
- ordered paths from attacker input to impact; and
- the weakest unproven edge in each path.

This lets workers run independently without losing the investigation's state
or quietly promoting guesses into findings.

## Runloop

Runloop provides the isolation boundary for specialist workers. A production
coordinator would create a fresh sandbox for each task, pass only the bounded
task envelope, and merge the returned evidence patch after the worker exits.

This repository defaults to `ReplayExecutor`, so judges can inspect and run it
without credentials. `server/runloop-executor.mjs` documents the deliberately
small live adapter boundary. The real hackathon investigation used Runloop and
Reflex to test Runloop itself.

## What the case study proves

The public deck walks through five evidence-bounded findings:

- a same-organization Member exercising another user's private gateway credential when the gateway ID is already known;
- server-side gateway requests reaching a link-local HTTP service outside the disposable sandbox;
- OAuth preflight following an attacker-directed registration redirect into loopback before any MCP config or agent exists;
- an MCP connection test reflecting a controlled upstream error marker; and
- a connected Workstation command escaping the directory boundary enforced by the file tools.

It does **not** claim that SPYDR obtained cloud credentials, customer data,
cross-organization authority, Runloop host compromise, or destructive impact.

That distinction is the product: SPYDR reports what happened, what it means,
and what remains unproven.

## Repository map

```text
agents/                coordinator contract
skills/                seven specialist worker skills
server/                replay, shared context, and Runloop adapter boundary
demo/                   certificate recon, findings, and terminal replay data
app/                    tap-through hackathon deck
```

## Responsible use

SPYDR is for systems you own or are authorized to test. It prohibits denial of
service, intentional degradation, destructive testing, and unnecessary data
collection. See [`SECURITY.md`](SECURITY.md).

Built at the Codex Community Hackathon in San Francisco, August 2026.
