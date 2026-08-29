# Codex Community Hackathon submission

## Team name

SPYDR

## Team members

- Rajiv Singh — rajivsingh430@gmail.com

## Project description

**We used Runloop to red-team Runloop—and found real vulnerabilities.**

- SPYDR is an autonomous black-box red-team agent. It tests the running product like an attacker instead of only reading source code.
- A main Codex agent coordinates specialist security agents running inside isolated Runloop sandboxes.
- Every worker contributes to one shared evidence graph: surfaces, workflows, attacker influence, hypotheses, probes, observations, and attack paths.
- SPYDR performs reconnaissance, learns how the product works, creates competing security hypotheses, and runs small controlled probes against the live system.
- Runtime oracles—including callbacks, authorization differences, state changes, and network behavior—separate real vulnerabilities from false positives.
- Individual capabilities become a complete chain: attacker input → system behavior → gained authority → observable impact.
- To validate the approach, we pointed SPYDR at Runloop itself. It discovered real server-side request and authorization-boundary vulnerabilities that required runtime testing to prove.
- Sensitive reproduction details are withheld for responsible disclosure. Sanitized evidence is available to the judges and Runloop.
- Every result separates confirmed, inferred, rejected, and unproven claims.
- SPYDR finishes with a narrow fix and regression test—not another scanner report.

## One-line description

SPYDR used Runloop to red-team Runloop—and found real runtime vulnerabilities that source review alone could not prove.

## Runloop

Yes.

## GitHub

https://github.com/toughyear/spydr

## Demo

Add the hosted URL after publishing the site.
