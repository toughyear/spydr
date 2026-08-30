# Codex Community Hackathon submission

## Team name

SPYDR

## Team members

- Rajeev Singh, rajivsingh430@gmail.com

## Project description

**SPYDR is your autonomous red team.**

- Give SPYDR a domain. It learns the product from the outside, tests the running system like an attacker, and proves which paths lead to real impact.
- Proof: SPYDR found six vulnerabilities in Runloop, one Critical and five High.
- New High: a normal self-service tenant Owner reached a deployment-wide global flag write route and received HTTP 200, while platform-admin routes denied the same account.
- A main Codex agent coordinates specialist security agents running inside isolated Runloop sandboxes.
- Every worker contributes to one shared evidence graph: surfaces, workflows, attacker influence, hypotheses, probes, observations, and attack paths.
- SPYDR performs reconnaissance, learns how the product works, creates competing security hypotheses, and runs small controlled probes against the live system.
- Runtime oracles, including callbacks, authorization differences, state changes, and network behavior, separate real vulnerabilities from false positives.
- Individual capabilities become a complete chain: attacker input → system behavior → gained authority → observable impact.
- To validate the approach, SPYDR investigated Runloop itself. It discovered real server-side request and authorization-boundary vulnerabilities that required runtime testing to prove.
- Sensitive reproduction details are withheld for responsible disclosure. Sanitized evidence is available to the judges and Runloop.
- Every result separates confirmed, inferred, rejected, and unproven claims.
- SPYDR finishes with a narrow fix and regression test, not another scanner report.

## One-line description

SPYDR is your autonomous red team: give it a domain and it finds real runtime vulnerabilities that source review alone cannot prove.

## Runloop

Yes.

## GitHub

https://github.com/toughyear/spydr

## Demo

https://spydr-red-team.vercel.app
