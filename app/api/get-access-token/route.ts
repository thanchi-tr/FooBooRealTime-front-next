// import axios from "axios";
import { NextResponse } from "next/server";
import { getAccessToken } from "@auth0/nextjs-auth0";
export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const result = await getAccessToken();
    return NextResponse.json(result.accessToken);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching token:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch token=" },
      { status: 500 }
    );
  }
}
