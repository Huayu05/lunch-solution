import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const pageToken = searchParams.get("pagetoken"); // optional

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat or lng" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  // Build the URL
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=restaurant&key=${apiKey}`;
  if (pageToken) {
    url += `&pagetoken=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Note: Google requires a short delay (~2s) before using next_page_token
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch from Google API" }, { status: 500 });
  }
}