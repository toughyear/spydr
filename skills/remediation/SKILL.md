---
name: remediation
description: Turn a confirmed path into a narrow fix and an executable regression-test outline.
---

# Remediation

Find the earliest reliable edge that can be cut without depending on attacker-controlled interpretation. Propose defense in depth only after the primary invariant is restored.

Return:

1. the broken invariant in one sentence;
2. the narrow code or policy change;
3. server-side enforcement location;
4. positive, negative, encoded, redirect, stale-state, and cross-identity tests as applicable; and
5. deployment checks that prove the running system contains the fix.

Do not claim a patch is effective until the original runtime oracle is replayed and fails safely.
