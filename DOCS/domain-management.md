# Domain Management API

Manage custom domains, SSL certificates, and DNS configurations for your SnapSite websites.

## 🌐 Overview

SnapSite supports custom domains with automatic SSL provisioning, DNS management, and global CDN distribution. Connect your own domain or use our subdomains.

### Default Domains

All websites get a free subdomain:
- Format: `{site-name}.snap-site.dev`
- SSL included
- Global CDN
- Instant activation

### Custom Domains

Bring your own domain:
- Automatic SSL certificates
- DNS verification
- CNAME/A record support
- Subdomain support (www, blog, shop, etc.)

## 📋 List Domains

Get all domains associated with your account.

### Endpoint

```
GET /v1/domains
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `active`, `pending`, `failed` |
| `website_id` | string | Filter by website |

### Response

```json
{
  "success": true,
  "data": {
    "domains": [
      {
        "domain_id": "dom_1234567890abcdef",
        "domain": "www.sparklegems.com",
        "website_id": "ws_1234567890abcdef",
        "status": "active",
        "ssl_status": "active",
        "verification_status": "verified",
        "dns_configured": true,
        "created_at": "2024-01-15T10:30:00Z",
        "verified_at": "2024-01-15T10:35:00Z",
        "ssl_issued_at": "2024-01-15T10:36:00Z",
        "expires_at": "2025-01-15T10:36:00Z"
      }
    ]
  }
}
```

## ➕ Add Custom Domain

Connect a custom domain to your website.

### Endpoint

```
POST /v1/domains
```

### Request Body

```json
{
  "domain": "www.sparklegems.com",
  "website_id": "ws_1234567890abcdef",
  "redirect_apex": true,
  "force_https": true,
  "verification_method": "dns"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string | ✅ | The custom domain (with or without www) |
| `website_id` | string | ✅ | Target website ID |
| `redirect_apex` | boolean | ❌ | Redirect apex to www (default: true) |
| `force_https` | boolean | ❌ | Force HTTPS redirects (default: true) |
| `verification_method` | string | ❌ | `dns` or `file` (default: dns) |

### Response

```json
{
  "success": true,
  "data": {
    "domain_id": "dom_1234567890abcdef",
    "domain": "www.sparklegems.com",
    "status": "pending_verification",
    "verification": {
      "method": "dns",
      "dns_records": [
        {
          "type": "CNAME",
          "name": "www",
          "value": "sparkle-gems-store.snap-site.dev",
          "ttl": 300
        },
        {
          "type": "TXT",
          "name": "_snapsite-verification",
          "value": "snapsite-verify=abc123def456",
          "ttl": 300
        }
      ],
      "verification_url": "https://www.sparklegems.com/.well-known/snapsite-verification.txt"
    },
    "estimated_completion": "2024-01-15T10:45:00Z"
  }
}
```

## 🔍 Get Domain Details

Get detailed information about a specific domain.

### Endpoint

```
GET /v1/domains/{domain_id}
```

### Response

```json
{
  "success": true,
  "data": {
    "domain_id": "dom_1234567890abcdef",
    "domain": "www.sparklegems.com",
    "apex_domain": "sparklegems.com",
    "website_id": "ws_1234567890abcdef",
    "status": "active",
    "ssl_status": "active",
    "verification_status": "verified",
    "dns_configured": true,
    "created_at": "2024-01-15T10:30:00Z",
    "verified_at": "2024-01-15T10:35:00Z",
    "ssl_issued_at": "2024-01-15T10:36:00Z",
    "expires_at": "2025-01-15T10:36:00Z",
    "dns_records": [
      {
        "type": "CNAME",
        "name": "www",
        "value": "sparkle-gems-store.snap-site.dev",
        "status": "active"
      }
    ],
    "ssl_certificate": {
      "issuer": "Let's Encrypt",
      "valid_from": "2024-01-15T10:36:00Z",
      "valid_to": "2024-04-15T10:36:00Z",
      "auto_renewal": true
    },
    "performance": {
      "global_cdn": true,
      "cache_enabled": true,
      "compression": true,
      "regions": ["us-east", "us-west", "eu-west", "ap-southeast"]
    }
  }
}
```

## ✅ Verify Domain

Manually trigger domain verification.

### Endpoint

```
POST /v1/domains/{domain_id}/verify
```

### Response

```json
{
  "success": true,
  "data": {
    "domain_id": "dom_1234567890abcdef",
    "verification_status": "verified",
    "verified_at": "2024-01-15T10:35:00Z",
    "ssl_provisioning": "in_progress",
    "estimated_ssl_completion": "2024-01-15T10:40:00Z"
  }
}
```

## 🔒 SSL Certificate Management

### Get SSL Status

```
GET /v1/domains/{domain_id}/ssl
```

### Response

```json
{
  "success": true,
  "data": {
    "ssl_status": "active",
    "certificate": {
      "issuer": "Let's Encrypt",
      "subject": "www.sparklegems.com",
      "valid_from": "2024-01-15T10:36:00Z",
      "valid_to": "2024-04-15T10:36:00Z",
      "auto_renewal": true,
      "next_renewal": "2024-03-15T10:36:00Z"
    },
    "security": {
      "tls_version": "1.3",
      "cipher_suites": ["TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256"],
      "hsts_enabled": true,
      "hsts_max_age": 31536000
    }
  }
}
```

### Renew SSL Certificate

```
POST /v1/domains/{domain_id}/ssl/renew
```

### Response

```json
{
  "success": true,
  "data": {
    "renewal_status": "initiated",
    "estimated_completion": "2024-01-15T11:00:00Z"
  }
}
```

## 🔄 Update Domain Settings

Modify domain configuration and settings.

### Endpoint

```
PUT /v1/domains/{domain_id}
```

### Request Body

```json
{
  "redirect_apex": true,
  "force_https": true,
  "www_redirect": "add_www",
  "dns_settings": {
    "ttl": 300,
    "proxy_enabled": true
  },
  "security": {
    "hsts_enabled": true,
    "hsts_max_age": 31536000,
    "security_headers": true
  }
}
```

### Parameters

| Parameter | Description | Options |
|-----------|-------------|---------|
| `www_redirect` | WWW handling | `add_www`, `remove_www`, `no_redirect` |
| `force_https` | HTTPS enforcement | `true`, `false` |
| `proxy_enabled` | CDN proxy | `true`, `false` |
| `security_headers` | Security headers | `true`, `false` |

### Response

```json
{
  "success": true,
  "data": {
    "domain_id": "dom_1234567890abcdef",
    "updated_settings": ["force_https", "security.hsts_enabled"],
    "propagation_time": "5-10 minutes"
  }
}
```

## 🌍 DNS Management

### Get DNS Records

```
GET /v1/domains/{domain_id}/dns
```

### Response

```json
{
  "success": true,
  "data": {
    "records": [
      {
        "type": "CNAME",
        "name": "www",
        "value": "sparkle-gems-store.snap-site.dev",
        "ttl": 300,
        "status": "active",
        "proxied": true
      },
      {
        "type": "A",
        "name": "@",
        "value": "192.0.2.1",
        "ttl": 300,
        "status": "active",
        "proxied": true
      }
    ],
    "nameservers": [
      "ns1.snap-site.dev",
      "ns2.snap-site.dev"
    ]
  }
}
```

### Add DNS Record

```
POST /v1/domains/{domain_id}/dns
```

### Request Body

```json
{
  "type": "CNAME",
  "name": "blog",
  "value": "blog.sparklegems.com",
  "ttl": 300,
  "proxied": true
}
```

### Supported Record Types

| Type | Description | Example |
|------|-------------|---------|
| `A` | IPv4 address | `192.0.2.1` |
| `AAAA` | IPv6 address | `2001:db8::1` |
| `CNAME` | Canonical name | `www.example.com` |
| `MX` | Mail exchange | `10 mail.example.com` |
| `TXT` | Text record | `v=spf1 include:_spf.google.com ~all` |

## 📊 Domain Analytics

Get analytics for your custom domain.

### Endpoint

```
GET /v1/domains/{domain_id}/analytics
```

### Response

```json
{
  "success": true,
  "data": {
    "period": "7d",
    "requests": {
      "total": 45320,
      "cached": 38921,
      "cache_hit_ratio": 0.86
    },
    "bandwidth": {
      "total_gb": 12.4,
      "cached_gb": 10.7,
      "origin_gb": 1.7
    },
    "response_times": {
      "avg_ms": 145,
      "p95_ms": 280,
      "p99_ms": 450
    },
    "geographic_distribution": {
      "us": 0.45,
      "eu": 0.32,
      "asia": 0.18,
      "other": 0.05
    }
  }
}
```

## ❌ Delete Domain

Remove a custom domain from your website.

### Endpoint

```
DELETE /v1/domains/{domain_id}
```

### Request Body

```json
{
  "confirm": true,
  "cleanup_dns": true
}
```

### Response

```json
{
  "success": true,
  "data": {
    "domain_id": "dom_1234567890abcdef",
    "domain": "www.sparklegems.com",
    "deleted_at": "2024-01-15T17:00:00Z",
    "ssl_certificate_revoked": true,
    "dns_records_cleaned": true
  }
}
```

## 🚨 Error Codes

### Domain Verification Errors

```json
{
  "success": false,
  "error": {
    "code": "DOMAIN_VERIFICATION_FAILED",
    "message": "Unable to verify domain ownership",
    "details": {
      "domain": "www.sparklegems.com",
      "verification_method": "dns",
      "expected_record": "snapsite-verify=abc123def456",
      "found_record": null,
      "suggestions": [
        "Check that DNS record is properly configured",
        "Wait for DNS propagation (up to 48 hours)",
        "Try file verification method instead"
      ]
    }
  }
}
```

### SSL Certificate Errors

```json
{
  "success": false,
  "error": {
    "code": "SSL_ISSUANCE_FAILED",
    "message": "Failed to issue SSL certificate",
    "details": {
      "domain": "www.sparklegems.com",
      "reason": "domain_validation_failed",
      "retry_after": "2024-01-15T11:30:00Z"
    }
  }
}
```

## 📋 Best Practices

### DNS Configuration

1. **Use CNAME for subdomains** (www, blog, shop)
2. **Use A records for apex domains** (example.com)
3. **Set appropriate TTL values** (300 seconds recommended)
4. **Enable proxying for better performance**

### SSL Security

1. **Enable HSTS** for enhanced security
2. **Use security headers** for additional protection
3. **Keep certificates auto-renewed**
4. **Monitor certificate expiration**

### Performance Optimization

1. **Enable CDN proxying**
2. **Use appropriate cache settings**
3. **Monitor response times**
4. **Optimize for your audience's geography**

---

*Need help with domain configuration? Contact [api-support@snap-site.dev](mailto:api-support@snap-site.dev)*