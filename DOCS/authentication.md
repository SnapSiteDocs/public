# Authentication

SnapSite API uses API keys for authentication. All requests must include a valid API key in the request headers.

## 🔑 API Keys

### Getting Your API Key

1. Sign up for a [SnapSite account](https://app.snap-site.dev/signup)
2. Navigate to **Settings** → **API Keys**
3. Click **Generate New Key**
4. Copy and securely store your API key

> ⚠️ **Important**: API keys are sensitive. Never expose them in client-side code or public repositories.

### API Key Types

| Type | Description | Rate Limit | Features |
|------|-------------|------------|----------|
| **Development** | For testing and development | 100 req/hour | Basic features, test mode |
| **Production** | For live applications | 1,000 req/hour | Full features, real websites |
| **Enterprise** | For high-volume usage | 10,000 req/hour | Priority support, custom limits |

## 🔐 Authentication Methods

### Bearer Token (Recommended)

Include your API key in the `Authorization` header:

```bash
curl -H "Authorization: Bearer sk_live_123456789abcdef" \
     -H "Content-Type: application/json" \
     https://api.snap-site.dev/v1/websites
```

```javascript
const response = await fetch('https://api.snap-site.dev/v1/websites', {
  headers: {
    'Authorization': 'Bearer sk_live_123456789abcdef',
    'Content-Type': 'application/json'
  }
});
```

### API Key Header

Alternatively, use the `X-API-Key` header:

```bash
curl -H "X-API-Key: sk_live_123456789abcdef" \
     -H "Content-Type: application/json" \
     https://api.snap-site.dev/v1/websites
```

## 🔒 Security Best Practices

### Environment Variables

Store API keys in environment variables:

```bash
# .env
SNAPSITE_API_KEY=sk_live_123456789abcdef
```

```javascript
const snapsite = new SnapSite({
  apiKey: process.env.SNAPSITE_API_KEY
});
```

### Key Rotation

Regularly rotate your API keys:

1. Generate a new API key
2. Update your applications
3. Test thoroughly
4. Revoke the old key

### Scope Limitations

API keys have different scopes:

```json
{
  "key_id": "key_123456789",
  "scopes": [
    "websites:read",
    "websites:write",
    "domains:read",
    "analytics:read"
  ],
  "restrictions": {
    "ip_whitelist": ["192.168.1.1", "10.0.0.0/8"],
    "referrer_whitelist": ["https://yourapp.com"]
  }
}
```

## 📋 Scope Permissions

| Scope | Description | Endpoints |
|-------|-------------|-----------|
| `websites:read` | View websites and templates | `GET /websites/*` |
| `websites:write` | Create and edit websites | `POST /websites`, `PUT /websites/*` |
| `websites:delete` | Delete websites | `DELETE /websites/*` |
| `domains:read` | View domain settings | `GET /domains/*` |
| `domains:write` | Manage custom domains | `POST /domains`, `PUT /domains/*` |
| `analytics:read` | Access analytics data | `GET /analytics/*` |
| `team:read` | View team members | `GET /team/*` |
| `team:write` | Manage team access | `POST /team`, `PUT /team/*` |

## 🚨 Error Responses

### Invalid API Key

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or has been revoked",
    "details": {
      "key_prefix": "sk_live_123...",
      "suggestion": "Check your API key and ensure it hasn't expired"
    }
  }
}
```

### Insufficient Permissions

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Your API key doesn't have permission to perform this action",
    "details": {
      "required_scope": "websites:write",
      "current_scopes": ["websites:read", "analytics:read"]
    }
  }
}
```

### Rate Limit Exceeded

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API rate limit exceeded",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset_at": "2024-01-15T11:00:00Z"
    }
  }
}
```

## 🔧 Testing Authentication

Test your API key with a simple request:

```bash
curl -H "Authorization: Bearer your-api-key" \
     https://api.snap-site.dev/v1/auth/verify
```

**Response:**
```json
{
  "success": true,
  "data": {
    "key_id": "key_123456789",
    "account_id": "acc_987654321",
    "scopes": ["websites:read", "websites:write"],
    "rate_limit": {
      "limit": 1000,
      "remaining": 999,
      "reset_at": "2024-01-15T11:00:00Z"
    }
  }
}
```

## 🌐 OAuth 2.0 (Coming Soon)

We're working on OAuth 2.0 support for more secure integrations:

- **Authorization Code Flow** for web applications
- **PKCE** for mobile and SPA applications
- **Client Credentials** for server-to-server

---

*Need help with authentication? Contact [api-support@snap-site.dev](mailto:api-support@snap-site.dev)*