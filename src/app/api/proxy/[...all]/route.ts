// src/app/api/proxy/[...all]/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  return proxyHandler(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxyHandler(req, "POST");
}

async function proxyHandler(req: NextRequest, method: "GET" | "POST") {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace("/api/proxy/", "");

    // Query params
    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => (params[key] = value));

    // POST data
    const data = method === "POST" ? await req.json() : undefined;

    const callerId = process.env.NEXT_API_CALLER_ID;
    const password = process.env.NEXT_API_PASSWORD;
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!callerId || !password || !baseURL) {
      return NextResponse.json(
        { message: "Server credentials missing" },
        { status: 500 }
      );
    }

    const response = await axios({
      method,
      url: `${baseURL}/${path}`,
      headers: {
        "Caller-Id": callerId,
        Password: password,
        Accept: "application/json",
      },
      params,
      data,
    });

    return NextResponse.json(response.data, {
      headers: { "Access-Control-Allow-Origin": "*" }, // جلوگیری از CORS
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "خطای ناشناخته" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
