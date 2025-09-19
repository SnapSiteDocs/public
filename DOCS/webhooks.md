# Webhooks

Receive real-time notifications about events in your SnapSite account through HTTP callbacks to your application.

## 🔔 Overview

Webhooks allow your application to receive automatic notifications when specific events occur in your SnapSite account. Instead of polling our API, we'll send HTTP POST requests to your configured endpoints.

### Common Use Cases

- **Website completion notifications** - Know when AI generation finishes
- **Domain verification updates** - Track custom domain setup progress
- **Analytics alerts** - Get notified of traffic spikes or issues
- **Subscription changes** - Handle billing and plan updates
- **Security events** - Monitor API key usage and account access

## 🚀 Quick Start

1. **Create a webhook endpoint** in your application
2. **Register the webhook** with SnapSite API
3. **Verify webhook signatures** for security
4. **Handle events** in your application logic

```javascript
// Express.js webhook handler example
app.post('/webhooks/snapsite', (req, res) => {
  const signature = req.headers['snapsite-signature'];
  const payload = req.body;

  // Verify signature (recommended)
  if (!verifySignature(payload, signature, webhookSecret)) {
    return res.status(401).send('Invalid signature');
  }

  // Handle the event
  switch (payload.event) {
    case 'website.completed':
      console.log(`Website ${payload.data.website_id} completed!`);
      break;
    case 'domain.verified':
      console.log(`Domain ${payload.data.domain} verified!`);
      break;
  }

  res.status(200).send('OK');
});
```

## 📝 Create Webhook

Register a new webhook endpoint to receive event notifications.

### Endpoint

```
POST /v1/webhooks
```

### Request Body

```json
{
  "url": "https://your-app.com/webhooks/snapsite",
  "events": [
    "website.created",
    "website.completed",
    "website.published",
    "domain.verified",
    "analytics.alert"
  ],
  "description": "Main webhook for website events",
  "secret": "your-webhook-secret-key",
  "active": true,
  "retry_policy": {
    "max_attempts": 3,
    "backoff_strategy": "exponential"
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | ✅ | HTTPS endpoint to receive webhooks |
| `events` | array | ✅ | List of events to subscribe to |
| `description` | string | ❌ | Human-readable description |
| `secret` | string | ❌ | Secret key for signature verification |
| `active` | boolean | ❌ | Enable/disable webhook (default: true) |
| `retry_policy` | object | ❌ | Retry configuration |

### Response

```json
{
  "success": true,
  "data": {
    "webhook_id": "wh_1234567890abcdef",
    "url": "https://your-app.com/webhooks/snapsite",
    "events": [
      "website.created",
      "website.completed",
      "website.published",
      "domain.verified",
      "analytics.alert"
    ],
    "description": "Main webhook for website events",
    "active": true,
    "created_at": "2024-01-15T10:30:00Z",
    "secret_hint": "your-web***-key"
  }
}
```

## 📋 List Webhooks

Get all webhooks configured for your account.

### Endpoint

```
GET /v1/webhooks
```

### Response

```json
{
  "success": true,
  "data": {
    "webhooks": [
      {
        "webhook_id": "wh_1234567890abcdef",
        "url": "https://your-app.com/webhooks/snapsite",
        "events": ["website.completed", "domain.verified"],
        "description": "Main webhook",
        "active": true,
        "created_at": "2024-01-15T10:30:00Z",
        "last_delivery": "2024-01-15T15:22:30Z",
        "delivery_stats": {
          "total_deliveries": 1247,
          "successful_deliveries": 1243,
          "failed_deliveries": 4,
          "success_rate": 0.997
        }
      }
    ]
  }
}
```

## 🔍 Get Webhook Details

Retrieve details about a specific webhook.

### Endpoint

```
GET /v1/webhooks/{webhook_id}
```

### Response

```json
{
  "success": true,
  "data": {
    "webhook_id": "wh_1234567890abcdef",
    "url": "https://your-app.com/webhooks/snapsite",
    "events": ["website.completed", "domain.verified"],
    "description": "Main webhook for website events",
    "active": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "secret_hint": "your-web***-key",
    "retry_policy": {
      "max_attempts": 3,
      "backoff_strategy": "exponential",
      "timeout": 30
    },
    "delivery_stats": {
      "total_deliveries": 1247,
      "successful_deliveries": 1243,
      "failed_deliveries": 4,
      "success_rate": 0.997,
      "avg_response_time": 245
    },
    "recent_deliveries": [
      {
        "delivery_id": "del_1234567890",
        "event": "website.completed",
        "timestamp": "2024-01-15T15:22:30Z",
        "status": "success",
        "response_code": 200,
        "response_time": 189
      }
    ]
  }
}
```

## ✏️ Update Webhook

Modify webhook configuration.

### Endpoint

```
PUT /v1/webhooks/{webhook_id}
```

### Request Body

```json
{
  "url": "https://your-app.com/api/webhooks/snapsite",
  "events": [
    "website.created",
    "website.completed",
    "website.published",
    "website.failed",
    "domain.verified",
    "domain.failed"
  ],
  "description": "Updated webhook for all events",
  "active": true
}
```

### Response

```json
{
  "success": true,
  "data": {
    "webhook_id": "wh_1234567890abcdef",
    "updated_fields": ["url", "events", "description"],
    "updated_at": "2024-01-15T16:00:00Z"
  }
}
```

## 🗑️ Delete Webhook

Remove a webhook endpoint.

### Endpoint

```
DELETE /v1/webhooks/{webhook_id}
```

### Response

```json
{
  "success": true,
  "data": {
    "webhook_id": "wh_1234567890abcdef",
    "deleted_at": "2024-01-15T17:00:00Z"
  }
}
```

## 📋 Available Events

### Website Events

| Event | Description | Payload Example |
|-------|-------------|-----------------|
| `website.created` | Website generation started | `{ website_id, status: "generating" }` |
| `website.completed` | Website generation finished | `{ website_id, url, quality_metrics }` |
| `website.failed` | Website generation failed | `{ website_id, error, retry_available }` |
| `website.published` | Website published live | `{ website_id, url, published_at }` |
| `website.updated` | Website content updated | `{ website_id, updated_fields }` |
| `website.deleted` | Website permanently deleted | `{ website_id, deleted_at }` |

### Domain Events

| Event | Description | Payload Example |
|-------|-------------|-----------------|
| `domain.added` | Custom domain added | `{ domain_id, domain, verification_required }` |
| `domain.verified` | Domain ownership verified | `{ domain_id, domain, ssl_provisioning }` |
| `domain.failed` | Domain verification failed | `{ domain_id, domain, error, retry_after }` |
| `domain.ssl_issued` | SSL certificate issued | `{ domain_id, domain, certificate_info }` |
| `domain.ssl_expired` | SSL certificate expiring | `{ domain_id, domain, expires_at }` |

### Analytics Events

| Event | Description | Payload Example |
|-------|-------------|-----------------|
| `analytics.traffic_spike` | Unusual traffic increase | `{ website_id, current_visitors, threshold }` |
| `analytics.goal_achieved` | Conversion goal reached | `{ website_id, goal_id, conversions }` |
| `analytics.downtime` | Website downtime detected | `{ website_id, duration, regions }` |

### Account Events

| Event | Description | Payload Example |
|-------|-------------|-----------------|
| `account.limit_reached` | Usage limit approached | `{ limit_type, current_usage, limit }` |
| `account.upgraded` | Plan upgraded | `{ old_plan, new_plan, effective_date }` |
| `api.key_compromised` | Suspicious API key usage | `{ api_key_id, suspicious_activity }` |

## 📨 Webhook Payload Format

All webhook payloads follow a consistent structure:

```json
{
  "event": "website.completed",
  "timestamp": "2024-01-15T15:30:00Z",
  "webhook_id": "wh_1234567890abcdef",
  "delivery_id": "del_9876543210fedcba",
  "data": {
    "website_id": "ws_1234567890abcdef",
    "name": "Sparkle Gems Store",
    "url": "https://sparkle-gems.snap-site.dev",
    "status": "completed",
    "quality_metrics": {
      "overall_score": 92,
      "accessibility_score": 95,
      "seo_score": 89,
      "performance_score": 94
    },
    "generation": {
      "mode": "premium",
      "template": "ecommerce",
      "processing_time": 75.4,
      "word_count": 1847,
      "features_included": [
        "responsive",
        "seo_optimized",
        "ecommerce"
      ]
    }
  },
  "account_id": "acc_1234567890abcdef"
}
```

### Common Fields

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Event type identifier |
| `timestamp` | string | ISO 8601 timestamp of the event |
| `webhook_id` | string | ID of the webhook that triggered this delivery |
| `delivery_id` | string | Unique ID for this delivery attempt |
| `data` | object | Event-specific payload data |
| `account_id` | string | Your account identifier |

## 🔐 Security & Verification

### Signature Verification

We sign each webhook request with your secret key. Always verify signatures to ensure requests are from SnapSite:

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature.replace('sha256=', '')),
    Buffer.from(expectedSignature)
  );
}
```

### Headers Sent

| Header | Description |
|--------|-------------|
| `Snapsite-Signature` | HMAC-SHA256 signature |
| `Snapsite-Event` | Event type |
| `Snapsite-Delivery` | Unique delivery ID |
| `User-Agent` | `SnapSite-Webhooks/1.0` |
| `Content-Type` | `application/json` |

### IP Allowlist

Webhook requests come from these IP ranges:
- `52.89.214.238/32`
- `34.212.75.30/32`
- `54.218.53.128/32`

## 🔄 Retry Policy

### Default Retry Behavior

- **Max attempts**: 3
- **Backoff strategy**: Exponential (1s, 4s, 16s)
- **Timeout**: 30 seconds per attempt
- **Success codes**: 200-299
- **Retry codes**: 408, 429, 500-599

### Custom Retry Policy

```json
{
  "retry_policy": {
    "max_attempts": 5,
    "backoff_strategy": "linear",
    "initial_delay": 2,
    "max_delay": 300,
    "timeout": 45,
    "retry_codes": [408, 429, 500, 502, 503, 504]
  }
}
```

## 📊 Delivery Logs

### Get Delivery History

```
GET /v1/webhooks/{webhook_id}/deliveries
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `limit` | Number of deliveries (1-100) |
| `status` | Filter by status: `success`, `failed`, `pending` |
| `event` | Filter by event type |

### Response

```json
{
  "success": true,
  "data": {
    "deliveries": [
      {
        "delivery_id": "del_1234567890",
        "event": "website.completed",
        "timestamp": "2024-01-15T15:22:30Z",
        "status": "success",
        "response_code": 200,
        "response_time": 189,
        "attempts": 1,
        "next_retry": null
      },
      {
        "delivery_id": "del_0987654321",
        "event": "domain.verified",
        "timestamp": "2024-01-15T14:15:20Z",
        "status": "failed",
        "response_code": 500,
        "response_time": 30000,
        "attempts": 3,
        "next_retry": null,
        "error": "Connection timeout"
      }
    ],
    "pagination": {
      "total": 1247,
      "limit": 20,
      "offset": 0,
      "has_more": true
    }
  }
}
```

### Retry Failed Delivery

```
POST /v1/webhooks/{webhook_id}/deliveries/{delivery_id}/retry
```

## 🧪 Testing Webhooks

### Test Webhook Endpoint

Send a test payload to verify your webhook endpoint:

```
POST /v1/webhooks/{webhook_id}/test
```

### Request Body

```json
{
  "event": "website.completed",
  "test_data": {
    "website_id": "ws_test_123456",
    "name": "Test Website",
    "status": "completed"
  }
}
```

### Local Testing with ngrok

For local development, use ngrok to create a public tunnel:

```bash
# Install ngrok
npm install -g ngrok

# Create tunnel to your local server
ngrok http 3000

# Use the HTTPS URL for your webhook
# https://abc123.ngrok.io/webhooks/snapsite
```

## 🛠️ Best Practices

### Endpoint Requirements

1. **Use HTTPS** - HTTP endpoints are not supported
2. **Return 2xx status codes** for successful processing
3. **Respond quickly** (< 30 seconds timeout)
4. **Be idempotent** - Handle duplicate deliveries gracefully

### Error Handling

```javascript
app.post('/webhooks/snapsite', async (req, res) => {
  try {
    // Verify signature first
    if (!verifySignature(req.body, req.headers['snapsite-signature'], secret)) {
      return res.status(401).send('Invalid signature');
    }

    // Process the webhook
    await processWebhook(req.body);

    // Respond quickly
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook processing failed:', error);

    // Return 5xx for retries, 4xx to stop retries
    if (error.retry) {
      res.status(500).send('Temporary error');
    } else {
      res.status(400).send('Permanent error');
    }
  }
});
```

### Monitoring

- **Log all webhook events** for debugging
- **Monitor response times** to stay under timeout
- **Track delivery success rates**
- **Set up alerting** for failed deliveries

---

*Need help with webhooks? Contact [webhook-support@snap-site.dev](mailto:webhook-support@snap-site.dev)*