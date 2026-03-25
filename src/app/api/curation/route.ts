import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), "curation.json");

function read(): string[] {
  if (!existsSync(FILE)) return [];
  try {
    return JSON.parse(readFileSync(FILE, "utf-8")).removed || [];
  } catch {
    return [];
  }
}

function write(removed: string[]) {
  writeFileSync(FILE, JSON.stringify({ removed }, null, 2));
}

export async function GET() {
  return NextResponse.json({ removed: read() });
}

export async function POST(req: Request) {
  const { slug, action } = await req.json();
  const removed = read();
  if (action === "remove" && !removed.includes(slug)) {
    removed.push(slug);
  } else if (action === "restore") {
    const idx = removed.indexOf(slug);
    if (idx !== -1) removed.splice(idx, 1);
  }
  write(removed);
  return NextResponse.json({ removed });
}
