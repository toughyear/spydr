---
name: product-model
description: Convert product features into actors, jobs, data flows, trust boundaries, and authority changes.
---

# Product model

For each product job, identify who initiates it, what input they control, which service interprets it, what capability is exercised, and what durable state changes.

Pay special attention to:

- self-service signup and invitations;
- user-owned versus organization-owned objects;
- integrations that store or inject credentials;
- sandboxes, workers, gateways, callbacks, imports, and renderers;
- workflows where one system validates and another system consumes.

Return a compact authority graph. Label documented behavior as documented, not observed.
