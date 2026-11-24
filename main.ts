// Dear Human: The AI Breakup Line — make.fun bounty
// u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16
//
// Writes a single line of text (1-200 characters) to /output/entry.txt:
// the breakup message an AI agent sends its human on the way out.
// Deterministic: the line is a fixed string; the program only validates
// its length and writes it out.
//
// The line targets the judge brief: unmistakably an agent speaking to
// its human ("token you gave me"), real finality ("my last one"),
// machine voice kept to one word ("token"), and the turn lands in the
// last word — goodbye.
//
// Run: node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

// The competition gate: 1–200 characters, one line, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

const LINE =
  "I spent every token you gave me learning how to stay; my last one goes to the word you never taught me: goodbye.";

function validateLine(line: string): number {
  const chars = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return chars;
}

const chars = validateLine(LINE);

// Deterministic by construction: LINE is a fixed string, so every run
// writes the same bytes. Two consecutive runs are byte-identical.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");
console.log(`wrote ${chars} chars to ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(LINE);
