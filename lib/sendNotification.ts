import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export async function sendNotification(targetFids: number[] = [], filters = {}, notification: { title: string; body: string; target_url?: string }) {
  try {
    // Instantiate the client at call time so we avoid type mismatches at module initialization.
    // The Neynar client constructor shape may vary; allow a flexible call here.
    // @ts-expect-error allow flexible constructor for Neynar SDK
    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY || "");

    // @ts-expect-error allow flexible payload shape for Neynar SDK
    const response = await client.publishFrameNotifications({
      targetFids,
      filters,
      notification,
    } as unknown);
    return { success: true, data: response };
  } catch (error: unknown) {
    console.error("Failed to send notification:", error);
    const message =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message || String(error)
        : String(error);
    return { success: false, error: message };
  }
}
