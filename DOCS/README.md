# SnapSite API Documentation

Welcome to the SnapSite API! This comprehensive API allows developers to integrate powerful AI-driven website generation, editing, and management capabilities into their applications.

## 🚀 Quick Start

Get up and running with SnapSite API in minutes:

1. **Get your API key** from the [SnapSite Developer Dashboard](https://app.snap-site.dev/developers)
2. **Install our SDK** for your preferred language
3. **Generate your first website** with a simple API call

```bash
npm install @snapsite/sdk
```

```javascript
import { SnapSite } from '@snapsite/sdk';

const snapsite = new SnapSite({ apiKey: 'your-api-key' });

const website = await snapsite.websites.create({
  prompt: "Create a modern e-commerce site for selling shoes",
  template: "ecommerce",
  customization: {
    primaryColor: "#2563eb",
    font: "Inter"
  }
});

console.log(website.url); // https://your-site.snap-site.dev
```

## 📚 Documentation Structure

- **[Authentication](./authentication.md)** - API keys, OAuth, and security
- **[Website Generation](./website-generation.md)** - AI-powered website creation
- **[Website Management](./website-management.md)** - Edit, update, and manage sites
- **[Domain Management](./domain-management.md)** - Custom domains and SSL
- **[Analytics](./analytics.md)** - Traffic and performance insights
- **[Webhooks](./webhooks.md)** - Real-time notifications
- **[SDK Reference](./sdk-reference.md)** - Official libraries and tools
- **[Rate Limits](./rate-limits.md)** - Usage limits and best practices
- **[Changelog](./changelog.md)** - API updates and version history

## 🌟 Key Features

- **AI Website Generation** - Create professional websites from simple prompts
- **Real-time Editing** - Live preview and instant updates
- **Template Library** - 50+ premium templates across industries
- **Custom Domains** - Connect your own domain with SSL
- **Analytics Dashboard** - Detailed visitor and performance metrics
- **Collaboration Tools** - Team management and permissions
- **Export Options** - Download as HTML, React, or deploy anywhere

## 🏗️ Base URL

All API requests should be made to:

```
https://api.snap-site.dev/v1
```

## 🔐 Authentication

Include your API key in the request headers:

```bash
curl -H "Authorization: Bearer your-api-key" \
     -H "Content-Type: application/json" \
     https://api.snap-site.dev/v1/websites
```

## 📊 Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0"
  }
}
```

## ❌ Error Handling

Error responses include detailed information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid template specified",
    "details": {
      "field": "template",
      "validOptions": ["business", "ecommerce", "portfolio"]
    }
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## 🆘 Support

- **Documentation Issues**: [docs@snap-site.dev](mailto:docs@snap-site.dev)
- **API Support**: [api-support@snap-site.dev](mailto:api-support@snap-site.dev)
- **Status Page**: [status.snap-site.dev](https://status.snap-site.dev)
- **Discord Community**: [discord.gg/snapsite](https://discord.gg/snapsite)

## 🔄 Status & Uptime

Current API status: **🟢 All systems operational**

- **Uptime**: 99.9%
- **Average Response Time**: 250ms
- **Rate Limit**: 1000 requests/hour (Free), 10,000 requests/hour (Pro)

---

*Last updated: January 15, 2024*
*API Version: 1.2.3*