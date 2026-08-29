import { readFile } from "node:fs/promises";

const replayUrl = new URL("../demo/investigation.json", import.meta.url);

export class ReplayExecutor {
  constructor({ delay = 260 } = {}) {
    this.delay = delay;
  }

  async execute(onEvent) {
    const investigation = JSON.parse(await readFile(replayUrl, "utf8"));
    for (const [index, event] of investigation.timeline.entries()) {
      await new Promise((resolve) => setTimeout(resolve, this.delay));
      await onEvent({ ...event, index, total: investigation.timeline.length });
    }
    return investigation;
  }
}
