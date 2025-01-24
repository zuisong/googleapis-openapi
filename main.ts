#!/usr/bin/env -S deno run --allow-net=github.com,raw.githubusercontent.com,generativelanguage.googleapis.com --allow-write=./googleapis/ --allow-env=GEMINI_API_KEY --allow-read=. --no-prompt
import { ensureFileSync } from "jsr:@std/fs";
import * as asserts from "jsr:@std/assert";
import { convert } from "https://esm.sh/gh/APIs-guru/google-discovery-to-swagger@openapi3/src/index.js?bundle&dev&target=denonext&zzz.js";

import { parseArgs } from "jsr:@std/cli/parse-args";
async function main() {
  const flags = parseArgs(Deno.args, {
    string: ["geminiApiKey"],
    default: { geminiApiKey: Deno.env.get("GEMINI_API_KEY") },
    stopEarly: true,
    unknown: (arg) => {
      console.error(`Unknown flag: ${arg} `);
      Deno.exit(1);
    },
  });
  if (!flags.geminiApiKey) {
    console.error("Missing --geminiApiKey");
    Deno.exit(1);
  }

  const input = [
    [
      fetch(
        `https://generativelanguage.googleapis.com/$discovery/rest?version=v1beta&key=${flags.geminiApiKey}`,
      ).then((res) => res.json()),
      "./googleapis/generativelanguage/v1beta/generativelanguage-api-openapi_v3.json",
    ],
    [
      fetch(
        `https://generativelanguage.googleapis.com/$discovery/rest?version=v1alpha&key=${flags.geminiApiKey}`,
      ).then((res) => res.json()),
      "./googleapis/generativelanguage/v1alpha/generativelanguage-api-openapi_v3.json",
    ],
  ] as const;

  for (const [discoveryResourceUrl, outputFile] of input) {
    const data = await discoveryResourceUrl;
    const openapi = convert((await data) ?? "{}");
    ensureFileSync(outputFile);
    asserts.assertEquals(openapi.openapi, "3.0.0");
    await Deno.writeTextFile(outputFile, JSON.stringify(openapi, null, 2));
    console.log(`Wrote ${outputFile}`);
    console.log();
  }
}

if (import.meta.main) {
  await main();
}
