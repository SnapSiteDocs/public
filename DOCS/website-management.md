# Website Management API

Manage your generated websites with full CRUD operations, real-time editing, and advanced customization options.

## 📋 List Websites

Retrieve all websites in your account.

### Endpoint

```
GET /v1/websites
```

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `limit` | integer | Number of results (1-100) | 20 |
| `offset` | integer | Pagination offset | 0 |
| `status` | string | Filter by status | all |
| `template` | string | Filter by template | all |
| `sort` | string | Sort order | `created_desc` |

### Example Request

```bash
curl -H "Authorization: Bearer your-api-key" \
     "https://api.snap-site.dev/v1/websites?limit=10&status=published"
```

### Response

```json
{
  "success": true,
  "data": {
    "websites": [
      {
        "website_id": "ws_1234567890abcdef",
        "name": "Sparkle Gems Store",
        "url": "https://sparkle-gems.snap-site.dev",
        "custom_domain": "www.sparklegems.com",
        "status": "published",
        "template": "ecommerce",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T14:22:30Z",
        "analytics": {
          "total_views": 1247,
          "unique_visitors": 892,
          "bounce_rate": 0.34
        }
      }
    ],
    "pagination": {
      "total": 45,
      "limit": 10,
      "offset": 0,
      "has_more": true
    }
  }
}
```

## 🔍 Get Website Details

Retrieve detailed information about a specific website.

### Endpoint

```
GET /v1/websites/{website_id}
```

### Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "name": "Sparkle Gems Store",
    "description": "Handcrafted jewelry with natural stones",
    "url": "https://sparkle-gems.snap-site.dev",
    "preview_url": "https://preview.snap-site.dev/ws_1234567890abcdef",
    "custom_domain": "www.sparklegems.com",
    "status": "published",
    "template": "ecommerce",
    "generation_mode": "premium",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T14:22:30Z",
    "published_at": "2024-01-15T11:45:00Z",
    "settings": {
      "seo": {
        "title": "Sparkle Gems - Handcrafted Jewelry",
        "description": "Discover unique handcrafted jewelry...",
        "keywords": ["jewelry", "handcrafted", "gems"]
      },
      "analytics": {
        "google_analytics": "GA_MEASUREMENT_ID",
        "facebook_pixel": "FB_PIXEL_ID"
      },
      "design": {
        "primaryColor": "#8b5cf6",
        "secondaryColor": "#06b6d4",
        "font": "Inter",
        "style": "modern"
      }
    },
    "quality_metrics": {
      "overall_score": 92,
      "accessibility_score": 95,
      "seo_score": 89,
      "performance_score": 94,
      "mobile_score": 96
    },
    "features": [
      "responsive",
      "seo_optimized",
      "ecommerce",
      "analytics",
      "contact_forms"
    ],
    "pages": [
      {
        "id": "home",
        "title": "Home",
        "path": "/",
        "status": "published"
      },
      {
        "id": "products",
        "title": "Products",
        "path": "/products",
        "status": "published"
      }
    ]
  }
}
```

## ✏️ Update Website

Update website settings, design, or content.

### Endpoint

```
PUT /v1/websites/{website_id}
```

### Request Body

```json
{
  "name": "Sparkle Gems Jewelry",
  "description": "Premium handcrafted jewelry collection",
  "settings": {
    "seo": {
      "title": "Sparkle Gems - Premium Handcrafted Jewelry",
      "description": "Discover our exclusive collection of handcrafted jewelry with natural stones",
      "keywords": ["premium jewelry", "handcrafted", "natural stones"]
    },
    "design": {
      "primaryColor": "#7c3aed",
      "font": "Playfair"
    },
    "analytics": {
      "google_analytics": "G-XXXXXXXXXX"
    }
  }
}
```

### Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "updated_fields": ["name", "description", "settings.seo", "settings.design"],
    "updated_at": "2024-01-15T15:30:00Z",
    "regeneration_required": false
  }
}
```

## 🎨 Update Design

Modify the visual design and branding of your website.

### Endpoint

```
PUT /v1/websites/{website_id}/design
```

### Request Body

```json
{
  "primaryColor": "#2563eb",
  "secondaryColor": "#7c3aed",
  "font": "Inter",
  "style": "modern",
  "logo": {
    "url": "https://your-domain.com/logo.png",
    "alt": "Your Brand Logo"
  },
  "favicon": "https://your-domain.com/favicon.ico",
  "custom_css": ".hero { background: linear-gradient(45deg, #2563eb, #7c3aed); }"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "design_updated": true,
    "preview_url": "https://preview.snap-site.dev/ws_1234567890abcdef",
    "estimated_propagation": "2-5 minutes"
  }
}
```

## 📝 Update Content

Modify specific content sections of your website.

### Endpoint

```
PUT /v1/websites/{website_id}/content
```

### Request Body

```json
{
  "sections": {
    "hero": {
      "title": "Handcrafted Jewelry That Tells Your Story",
      "subtitle": "Discover unique pieces made with love and natural stones",
      "cta_text": "Shop Collection",
      "background_image": "https://images.unsplash.com/jewelry-hero"
    },
    "about": {
      "title": "Our Craft",
      "content": "Every piece is carefully handcrafted...",
      "image": "https://images.unsplash.com/artisan-work"
    }
  }
}
```

### Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "sections_updated": ["hero", "about"],
    "updated_at": "2024-01-15T15:45:00Z",
    "preview_url": "https://preview.snap-site.dev/ws_1234567890abcdef"
  }
}
```

## 🔄 Regenerate Website

Regenerate parts or all of your website with new AI processing.

### Endpoint

```
POST /v1/websites/{website_id}/regenerate
```

### Request Body

```json
{
  "scope": "partial",
  "sections": ["hero", "services"],
  "prompt_updates": "Focus more on luxury and premium quality",
  "generation_mode": "premium",
  "preserve": ["contact_info", "testimonials"]
}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `scope` | string | `full`, `partial`, `design_only` |
| `sections` | array | Specific sections to regenerate |
| `prompt_updates` | string | Additional instructions |
| `generation_mode` | string | Generation quality level |
| `preserve` | array | Sections to keep unchanged |

### Response

```json
{
  "success": true,
  "data": {
    "regeneration_id": "regen_1234567890",
    "status": "processing",
    "estimated_completion": "2024-01-15T16:15:00Z",
    "sections_being_regenerated": ["hero", "services"],
    "preview_url": "https://preview.snap-site.dev/ws_1234567890abcdef/regen_1234567890"
  }
}
```

## 📤 Publish Website

Publish your website to make it live.

### Endpoint

```
POST /v1/websites/{website_id}/publish
```

### Request Body

```json
{
  "subdomain": "sparkle-gems-store",
  "custom_domain": "www.sparklegems.com",
  "ssl_enabled": true,
  "force_https": true
}
```

### Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "status": "published",
    "url": "https://sparkle-gems-store.snap-site.dev",
    "custom_domain_url": "https://www.sparklegems.com",
    "published_at": "2024-01-15T16:30:00Z",
    "ssl_status": "active",
    "dns_instructions": {
      "type": "CNAME",
      "name": "www",
      "value": "sparkle-gems-store.snap-site.dev"
    }
  }
}
```

## 🗂️ Export Website

Export your website in various formats.

### Endpoint

```
GET /v1/websites/{website_id}/export
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | `html`, `react`, `vue`, `angular` |
| `include_assets` | boolean | Include images and files |
| `minified` | boolean | Minify output |

### Example

```bash
curl -H "Authorization: Bearer your-api-key" \
     "https://api.snap-site.dev/v1/websites/ws_123/export?format=html&include_assets=true" \
     -o website.zip
```

### Response

Returns a ZIP file containing:
- HTML files
- CSS stylesheets
- JavaScript files
- Image assets
- Configuration files

## 🗑️ Delete Website

Permanently delete a website.

### Endpoint

```
DELETE /v1/websites/{website_id}
```

### Request Body

```json
{
  "confirm": true,
  "backup": false
}
```

### Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "deleted_at": "2024-01-15T17:00:00Z",
    "backup_url": null
  }
}
```

## 📊 Website Analytics

Get analytics data for your website.

### Endpoint

```
GET /v1/websites/{website_id}/analytics
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `period` | string | `24h`, `7d`, `30d`, `90d` |
| `metrics` | string | Comma-separated metrics |

### Response

```json
{
  "success": true,
  "data": {
    "period": "7d",
    "summary": {
      "total_views": 5420,
      "unique_visitors": 3892,
      "bounce_rate": 0.32,
      "avg_session_duration": "2m 34s"
    },
    "traffic_sources": {
      "direct": 0.45,
      "search": 0.32,
      "social": 0.15,
      "referral": 0.08
    },
    "top_pages": [
      {
        "path": "/",
        "views": 2341,
        "unique_views": 1892
      },
      {
        "path": "/products",
        "views": 1234,
        "unique_views": 987
      }
    ]
  }
}
```

---

*Need help managing your websites? Contact [api-support@snap-site.dev](mailto:api-support@snap-site.dev)*