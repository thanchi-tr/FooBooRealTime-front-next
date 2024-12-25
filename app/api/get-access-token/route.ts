import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Make the request to Auth0's `/oauth/token` endpoint
    const response = await axios.post(
      "https://dev-llzbopidy6i26kov.us.auth0.com/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_CLIENT_ID!,
        client_secret: process.env.AUTH0_CLIENT_SECRET!,
        audience: "https://dev-llzbopidy6i26kov.us.auth0.com/api/v2/",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Return the token to the client
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching token:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 }
    );
  }
}
