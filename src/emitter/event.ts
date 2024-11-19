import emitter from "./emitter";

emitter.on(
  "History",
  async function (event: { plu: string; shopUid?: string; action: string }) {
    console.log("SEND", event);
    await fetch("http://localhost:3001/api/history", {
      method: "POST",
      body: JSON.stringify({ event }),
      headers: { "Content-Type": "application/json" },
    });
  },
);
