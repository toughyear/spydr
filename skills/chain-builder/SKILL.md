---
name: chain-builder
description: Compose confirmed capabilities into an ordered attacker-to-impact path.
---

# Chain builder

Build paths as ordered edges:

```text
attacker position → controlled input → system transformation → gained capability → protected asset → impact
```

Every edge needs its own truth state and evidence reference. A path inherits the state of its weakest edge. Prefer deterministic chains that require no victim cooperation or model obedience. Do not relabel crashes, metadata exposure, version matches, or isolated primitives as code execution or data compromise.

Return the best path, rejected alternatives, weakest edge, impact boundary, and next discriminating task.
