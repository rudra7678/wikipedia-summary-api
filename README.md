# Wikipedia Summary API on Cloudflare Workers

A serverless API for fetching summaries of Wikipedia pages, powered by Cloudflare Workers. This project is designed to be highly performant, scalable, and cost-effective, running on the edge to provide quick responses.

---

## Features
-   **Fast:** Delivers summaries with low latency.
-   **Serverless:** No servers to manage, scales automatically.
-   **Simple:** Easy to use with a straightforward query parameter.
-   **Comprehensive:** Returns title, summary, thumbnail, and the original page URL.

---

## Usage

This API has two main endpoints:

### 1. Fetching a Summary

Send a GET request with the `topic` query parameter.

**Endpoint:** `YOUR_WORKER_URL/`
**Example:** `https://your-worker-name.your-username.workers.dev/?topic=Cloudflare`

**Response:**
```json
{
  "title": "Cloudflare",
  "extract": "Cloudflare, Inc. is an American content delivery network and DDoS mitigation company...",
  "thumbnail": "...",
  "url": "[https://en.wikipedia.org/wiki/Cloudflare](https://en.wikipedia.org/wiki/Cloudflare)",
  "credit": "API built by @Rudra7678"
}
