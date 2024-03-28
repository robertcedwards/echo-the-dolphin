import { NextRequest, NextResponse } from "next/server";
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";

const HUB_URL = process.env["HUB_URL"] || "nemes.farcaster.xyz:2283";
const hubClient = getSSLHubRpcClient(HUB_URL);

export async function POST(req: NextRequest) {
  const {
    untrustedData: { inputText },
    trustedData: { messageBytes },
  } = await req.json();
  const frameMessage = Message.decode(Buffer.from(messageBytes, "hex"));
  const validateResult = await hubClient.validateMessage(frameMessage);

  if (validateResult.isOk() && validateResult.value.valid) {
    // Assuming inputText is the variable you want to use in the redirect URL
    const redirectUrl = `https://airstack-nft-gif-builder.vercel.app/?address=${encodeURIComponent(inputText)}`;

    // Perform the redirect
    return NextResponse.redirect(redirectUrl);
  } else {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const GET = POST;
