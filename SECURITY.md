# Responsible testing

SPYDR is designed for explicit, authorized security work.

- Test only first-party assets or customer-authorized tenant surfaces.
- Never perform denial of service, intentional degradation, or destructive testing.
- Prefer owned callbacks, synthetic identities, canary secrets, and minimal proof.
- Collect only the evidence needed to establish the security boundary.
- Never print or persist reusable credentials in reports or replay fixtures.
- Separate observed facts, inferences, confirmed impact, and unproven impact.
- Stop after sufficient evidence and prepare private disclosure before public detail.

The Runloop replay is sanitized. It contains no credential, account identifier,
private response body, exploit payload, or cross-tenant customer data.
