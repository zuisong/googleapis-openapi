#!/usr/bin/env -S deno run --allow-net=github.com,raw.githubusercontent.com --allow-write=./googleapis/ --allow-read=./googleapis/ --no-prompt
import { ensureFileSync } from "jsr:@std/fs";
import * as asserts from "jsr:@std/assert";
import { convert } from "https://esm.sh/gh/APIs-guru/google-discovery-to-swagger@openapi3/src/index.js?bundle&dev&target=denonext&zzz.js";

const input = [
  [
    "https://github.com/google/generative-ai-go/raw/main/genai/internal/generativelanguage/v1beta/generativelanguage-api.json",
    "./googleapis/generativelanguage/v1beta/generativelanguage-api-openapi_v3.json",
  ],
];

async function main() {
  for (const [discoveryResourceUrl, outputFile] of input) {
    const data = await fetch(discoveryResourceUrl);
    const openapi = convert((await data.json()) ?? "{}");
    console.log(`Converted ${discoveryResourceUrl}`);
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
