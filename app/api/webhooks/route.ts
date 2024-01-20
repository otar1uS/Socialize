import { deleteUser, updateOrCreateUser } from "@/lib/actions/user";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as WebhookEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, username, image_url } = evt.data;

    try {
      await updateOrCreateUser(id, email_addresses, username, image_url);

      console.log("its been used");

      return new Response("user is created or updated", {
        status: 200,
      });
    } catch (e) {
      return new Response(`${e} `, {
        status: 400,
      });
    }
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      await deleteUser(id);
    } catch (e) {
      return new Response(`${e} `, {
        status: 400,
      });
    }
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
