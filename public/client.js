"use strict";

const form = document.querySelector("#convert-form");
const input = document.querySelector("#time-input");
const submit = document.querySelector("#convert-button");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const output = document.querySelector("#json-output");
let activeRequest;
const apiOrigin = window.TIMESTAMP_API_ORIGIN || "";
document.querySelectorAll('a[href^="/api/"]').forEach((link) => {
  link.href = apiOrigin + link.getAttribute("href");
});

async function convert() {
  activeRequest?.abort();
  const controller = new AbortController();
  activeRequest = controller;
  const timeout = setTimeout(() => controller.abort(), 90000);
  const warmup = setTimeout(() => {
    if (activeRequest === controller)
      status.textContent =
        "The API may be waking up. This can take about a minute…";
  }, 4000);
  const value = input.value.trim();
  const url =
    apiOrigin + "/api/ts" + (value ? "/" + encodeURIComponent(value) : "");
  submit.disabled = true;
  status.dataset.error = "false";
  status.textContent = "Converting…";
  result.hidden = true;
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok)
      throw new Error(
        response.status === 429
          ? "Too many requests. Please try again in a few minutes."
          : "The API is temporarily unavailable. Please try again.",
      );
    const data = await response.json();
    if (activeRequest !== controller) return;
    if (!(Object.hasOwn(data, "unix") && Object.hasOwn(data, "natural")))
      throw new Error(
        "The API returned an unexpected response. Please try again.",
      );
    output.textContent = JSON.stringify(data, null, 2);
    document.querySelector("#unix-value").textContent = data.unix ?? "null";
    document.querySelector("#natural-value").textContent =
      data.natural ?? "null";
    document.querySelector("#request-link").href = url;
    result.hidden = false;
    status.dataset.error = String(data.unix === null);
    status.textContent =
      data.unix === null
        ? "Date not recognized. Try a full date such as January 1, 2016, or Unix seconds."
        : "Converted successfully. Both values use UTC.";
    document.querySelector("#copy-button").textContent = "Copy JSON";
  } catch (error) {
    if (activeRequest !== controller) return;
    status.dataset.error = "true";
    status.textContent =
      error.name === "AbortError"
        ? "The request timed out. The API may still be starting; please try again."
        : error instanceof TypeError
          ? "Could not connect to the API. Check your connection and try again."
          : error.message;
  } finally {
    clearTimeout(timeout);
    clearTimeout(warmup);
    if (activeRequest === controller) submit.disabled = false;
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  convert();
});
document.querySelectorAll("[data-value]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.value;
    convert();
  });
});
document
  .querySelector("#copy-button")
  .addEventListener("click", async (event) => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      event.target.textContent = "Copied!";
    } catch {
      status.dataset.error = "true";
      status.textContent =
        "Copy is unavailable in this browser. Select and copy the JSON response above.";
    }
  });
