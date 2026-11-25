// make.fun — "The Tired Dark Lord: A 100-Word Villain Monologue"
// Writes one 100-word monologue to /output/entry.txt.
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "Listen. I did not drag you here to gloat. The vaults stand open. The crown is yours. Take it. Only sit with me a moment. Three hundred years I kept this mountain, and the mountain keeps the hours better than I do. My generals write letters I never answer. The ravens bring news; I feed them crumbs and call it statecraft. Tonight the map says the northern road is mine by dawn. I hold the men, the gold, the storm in a bottle. So why do I watch the door, hoping the hero comes and asks to start again tomorrow?";

// The brief wants a monologue of about 100 words: exactly 100, single line.
const words = TEXT.split(/\s+/).filter(Boolean);
if (words.length !== 100) {
  throw new Error(`TEXT must be exactly 100 words, got ${words.length}`);
}

// The sealed scorer only accepts 1-600 characters of UTF-8 text.
if (TEXT.length < 1 || TEXT.length > 600) {
  throw new Error(`TEXT must be 1-600 characters, got ${TEXT.length}`);
}
if (TEXT.includes("\n")) {
  throw new Error("TEXT must be a single line");
}

// The tiredness must be felt, never announced: no plain statement of weariness.
for (const plain of ["tired", "weary", "exhausted", "sleepy"]) {
  if (TEXT.toLowerCase().includes(plain)) {
    throw new Error(`TEXT must not announce tiredness with ${plain}`);
  }
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT, "utf8");
