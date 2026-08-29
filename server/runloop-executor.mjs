/**
 * Deliberately small boundary around Runloop.
 *
 * The hackathon repository ships without credentials or target automation. A
 * live environment injects an adapter implementing `startWorker`. That adapter
 * creates a fresh Runloop sandbox, starts the requested agent skill, waits for
 * one structured evidence patch, and destroys nothing without operator policy.
 */
export class RunloopExecutor {
  constructor({ startWorker }) {
    if (typeof startWorker !== "function") {
      throw new TypeError("RunloopExecutor requires a startWorker adapter");
    }
    this.startWorker = startWorker;
  }

  async execute(task, context) {
    const envelope = {
      taskId: crypto.randomUUID(),
      skill: task.skill,
      objective: task.objective,
      scope: context.scope,
      knownEvidence: task.knownEvidence ?? [],
      prohibited: [
        "denial of service",
        "intentional degradation",
        "destructive testing",
        "unnecessary data collection",
      ],
      stopConditions: [
        "objective answered",
        "unexpected sensitive data",
        "scope uncertainty",
        "service instability",
      ],
    };

    const patch = await this.startWorker({
      name: `spydr-${task.skill}-${envelope.taskId.slice(0, 8)}`,
      envelope,
      skillPath: `skills/${task.skill}/SKILL.md`,
      isolated: true,
    });

    return context.merge(patch);
  }
}
