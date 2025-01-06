import { serverAddress, clientId } from "./serverConfig.js";

// 서버로 프롬프트 큐잉
export async function queuePrompt(prompt) {
  const response = await fetch(`http://${serverAddress}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, client_id: clientId })
  });
  if (!response.ok) throw new Error("Failed to queue prompt.");
  return await response.json();
}