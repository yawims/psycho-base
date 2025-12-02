"use client";

import React from "react";
import { useMiniApp } from "@neynar/react";

export default function NeynarAddButton() {
  // The Neynar SDK types may differ between versions; cast to a safe typed shape at runtime.
  type MiniCtx = { isSDKLoaded?: boolean; addMiniApp?: () => Promise<unknown> };
  const ctx = useMiniApp() as unknown as MiniCtx;
  const isSDKLoaded: boolean = Boolean(ctx?.isSDKLoaded);
  const addMiniApp = ctx?.addMiniApp;

  const handleAdd = async () => {
    if (!isSDKLoaded || typeof addMiniApp !== "function") return;
    try {
      type AddResult = { added?: boolean; notificationDetails?: { token?: string } };
      const result = (await addMiniApp()) as unknown as AddResult;
      console.log("addMiniApp result:", result);
      if (result?.added && result?.notificationDetails) {
        console.log("Notification token:", result.notificationDetails.token);
      }
    } catch (err) {
      console.error("Failed to add mini app:", err);
    }
  };

  return (
    <button onClick={handleAdd} style={{ padding: "8px 12px", borderRadius: 8 }}>
      Add Mini App (Enable Notifications)
    </button>
  );
}
