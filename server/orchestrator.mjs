import { ReplayExecutor } from "./replay-executor.mjs";

const green = "\u001b[38;2;220;255;67m";
const red = "\u001b[38;2;255;75;54m";
const dim = "\u001b[2m";
const reset = "\u001b[0m";

const executor = new ReplayExecutor();

console.log(`\n${green}SPYDR${reset} / AUTONOMOUS RED TEAM`);
console.log(`${dim}SANITIZED RUNTIME REPLAY · NO NETWORK REQUESTS${reset}\n`);

const investigation = await executor.execute(async (event) => {
  const number = String(event.index + 1).padStart(2, "0");
  const state = event.status === "confirmed" ? red : green;
  console.log(`${dim}${number}/${String(event.total).padStart(2, "0")}${reset}  ${state}${event.status.toUpperCase()}${reset}  ${event.label.toUpperCase()}`);
  console.log(`       ${event.title}`);
  console.log(`${dim}       ${event.detail}${reset}\n`);
});

console.log(`${green}PROVEN PATH${reset}`);
console.log(`  ${investigation.path.join(` ${green}→${reset} `)}\n`);
console.log(`${red}CONFIRMED${reset}  ${investigation.proof.confirmed}`);
console.log(`${dim}LIMIT      ${investigation.proof.limited}${reset}`);
console.log(`${green}FIX        ${investigation.proof.next}${reset}\n`);
