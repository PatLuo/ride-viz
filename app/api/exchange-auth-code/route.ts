import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { authCode } = await request.json();

  const baseUrl = "https://www.strava.com/";
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const url = `${baseUrl}oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${authCode}&grant_type=authorization_code`;

  try {
    const response = await fetch(url, {
      method: "POST", //exchange auth code for refresh token
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cookies().set("refresh_token", data.refresh_token); //set cookie to refresh token
    console.log("cookie set:", data.refresh_token);
    return new Response(
      JSON.stringify("cookie successfully set", data.refresh_token),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error exchanging token:", error);
    return new Response(JSON.stringify({ error: "Failed to exchange token" }), {
      status: 500,
    });
  }
}
