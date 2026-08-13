import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API_URL = "https://oss.exercisedb.dev/api/v1/exercises";
const PAGE_SIZE = 25;
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, "../public/exercise-media.json");

const normalizeName = (name = "") =>
  name.trim().toLocaleLowerCase().replace(/\s+/g, " ");

const wait = (milliseconds) =>
  new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

const fetchPage = async (url) => {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }

    if (response.status !== 429) {
      throw new Error(`ExerciseDB request failed with ${response.status}`);
    }

    const retryAfter = Number(response.headers.get("retry-after"));
    await wait(
      Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : 5000 * (attempt + 1)
    );
  }

  throw new Error("ExerciseDB rate limit did not reset in time.");
};

const mediaIndex = {};
let cursor = "";

do {
  const url = new URL(API_URL);
  url.searchParams.set("limit", String(PAGE_SIZE));
  if (cursor) {
    url.searchParams.set("after", cursor);
  }

  const payload = await fetchPage(url);
  for (const exercise of payload.data ?? []) {
    if (exercise.name && exercise.gifUrl) {
      mediaIndex[normalizeName(exercise.name)] = exercise.gifUrl;
    }
  }

  cursor = payload.meta?.hasNextPage ? payload.meta.nextCursor : "";
  if (cursor) {
    await wait(1000);
  }
} while (cursor);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(mediaIndex)}\n`, "utf8");

console.log(`Wrote ${Object.keys(mediaIndex).length} media entries.`);
