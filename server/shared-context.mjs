const TRUTH_STATES = new Set([
  "observed",
  "inferred",
  "confirmed",
  "contradicted",
  "rejected",
  "unproven",
  "proposed",
]);

export class SharedContext {
  constructor({ target, scope = [] }) {
    this.target = target;
    this.scope = scope;
    this.events = [];
    this.claims = new Map();
    this.paths = [];
  }

  merge(patch) {
    if (!patch?.worker || !Array.isArray(patch.claims)) {
      throw new TypeError("A worker patch needs a worker id and claims array");
    }

    for (const claim of patch.claims) {
      if (!TRUTH_STATES.has(claim.status)) {
        throw new TypeError(`Unknown truth state: ${claim.status}`);
      }
      this.claims.set(claim.id, { ...claim, worker: patch.worker });
    }

    this.events.push({
      worker: patch.worker,
      action: patch.action,
      evidence: patch.evidence ?? [],
      limits: patch.limits ?? [],
    });

    if (patch.path) this.paths.push(patch.path);
    return this.snapshot();
  }

  snapshot() {
    return {
      target: this.target,
      scope: [...this.scope],
      claims: [...this.claims.values()],
      paths: [...this.paths],
      eventCount: this.events.length,
    };
  }
}
