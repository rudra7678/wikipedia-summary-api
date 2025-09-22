export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Check if the user is requesting the documentation page
    if (url.pathname === '/docs') {
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Wikipedia Summary API Documentation</title>
          <style>
            body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: auto; padding: 20px; background-color: #f4f4f4; color: #333; }
            h1, h2 { color: #0056b3; }
            code { background-color: #e2e2e2; padding: 2px 5px; border-radius: 4px; }
            pre { background-color: #e2e2e2; padding: 15px; border-radius: 8px; overflow-x: auto; }
            .credit { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 20px; text-align: center; font-size: 0.9em; color: #666; }
          </style>
        </head>
        <body>
          <h1>Wikipedia Summary API</h1>
          <p>This API provides a short summary of any topic from Wikipedia.</p>
          
          <h2>Features</h2>
          <ul>
            <li>Fetches the first paragraph of a Wikipedia page.</li>
            <li>Includes the page title, URL, and thumbnail.</li>
            <li>Built for speed using Cloudflare Workers.</li>
          </ul>
          
          <h2>Usage</h2>
          <p>To use the API, send a GET request to the root URL with a <code>topic</code> query parameter.</p>
          <pre><code>GET /?topic=Cloudflare</code></pre>

          <h3>Example Response:</h3>
          <pre><code>{
  "title": "Cloudflare",
  "extract": "Cloudflare, Inc. is an American content delivery network and DDoS mitigation company. It provides web optimization and security services...",
  "thumbnail": "...",
  "url": "..."
}</code></pre>

          <h2>About the Creator</h2>
          <p>This API was developed by Rudra. You can find me on GitHub: <a href="https://github.com/Rudra7678">@Rudra7678</a>.</p>
          
          <div class="credit">
            API built by @Rudra7678
          </div>
        </body>
        </html>
      `, {
        headers: {
          'Content-Type': 'text/html'
        }
      });
    }

    // Main API logic
    const topic = url.searchParams.get('topic');

    if (!topic) {
      return new Response(JSON.stringify({
        error: "Please provide a 'topic' parameter. Example: /?topic=Cloudflare",
        credit: "API built by @Rudra7678"
      }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 400
      });
    }

    try {
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 404) {
          return new Response(JSON.stringify({
            error: `No Wikipedia page found for the topic: "${topic}"`,
            credit: "API built by @Rudra7678"
          }), {
            headers: {
              'Content-Type': 'application/json'
            },
            status: 404
          });
        }
        throw new Error(`Wikipedia API responded with status ${response.status}`);
      }

      const data = await response.json();
      
      const summary = {
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail?.source || null,
        url: data.content_urls?.desktop?.page || null,
        credit: "API built by @Rudra7678"
      };

      return new Response(JSON.stringify(summary), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200
      });

    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({
        error: "An internal server error occurred.",
        credit: "API built by @Rudra7678"
      }), {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500
      });
    }
  },
};
