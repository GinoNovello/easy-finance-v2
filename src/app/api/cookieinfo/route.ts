import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookie = cookies();
  const { sheetUrl, sheetName } = await new Response(req.body).json();

  cookie.set({
    name: "sheetUrl",
    value: sheetUrl,
  });
  cookie.set({
    name: "sheetName",
    value: sheetName,
  });

  const url = cookie.get("sheetUrl");
  const name = cookie.get("sheetName");
  return NextResponse.json({ message: "Get request", cookies: { url, name } });
}
