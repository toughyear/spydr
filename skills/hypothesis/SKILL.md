---
name: hypothesis
description: Generate falsifiable vulnerability hypotheses around lost constraints and authority amplification.
---

# Hypothesis

Generate competing explanations for a suspicious boundary. Look for disagreements such as:

- validated URL versus fetched URL;
- object owner versus object user;
- sandbox path versus host command;
- signed bytes versus parsed structure;
- visible permission versus raw API permission;
- request-time policy versus cached or snapshotted policy.

For every hypothesis include attacker input, expected system transformation, authority gained, observable oracle, negative control, likely impact, and the cheapest falsification test. Never propose denial of service or destructive validation.
