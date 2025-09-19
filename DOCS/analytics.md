# Analytics API

Get detailed insights into your website performance, visitor behavior, and engagement metrics with SnapSite's comprehensive analytics system.

## 📊 Overview

SnapSite Analytics provides:
- **Real-time visitor tracking**
- **Performance monitoring**
- **SEO insights**
- **Conversion tracking**
- **Custom events**
- **Heatmaps and user flows**
- **A/B testing results**

All data is GDPR-compliant with automatic privacy controls.

## 🚀 Quick Start

```javascript
// Get website analytics
const analytics = await snapsite.analytics.get('ws_1234567890abcdef', {
  period: '30d',
  metrics: ['views', 'visitors', 'bounce_rate', 'conversions']
});

console.log(`Total views: ${analytics.summary.total_views}`);
console.log(`Conversion rate: ${analytics.conversions.rate}%`);
```

## 📈 Get Analytics Data

Retrieve comprehensive analytics for your website.

### Endpoint

```
GET /v1/websites/{website_id}/analytics
```

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `period` | string | Time period: `1h`, `24h`, `7d`, `30d`, `90d`, `1y` | `7d` |
| `metrics` | string | Comma-separated metrics to include | `all` |
| `granularity` | string | Data granularity: `hour`, `day`, `week`, `month` | `day` |
| `timezone` | string | Timezone for data (IANA format) | `UTC` |
| `compare` | string | Compare with previous period | `false` |

### Example Request

```bash
curl -H "Authorization: Bearer your-api-key" \
     "https://api.snap-site.dev/v1/websites/ws_123/analytics?period=30d&metrics=views,visitors,conversions"
```

### Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "period": "30d",
    "timezone": "UTC",
    "date_range": {
      "from": "2024-01-01T00:00:00Z",
      "to": "2024-01-30T23:59:59Z"
    },
    "summary": {
      "total_views": 25840,
      "unique_visitors": 18392,
      "returning_visitors": 4821,
      "bounce_rate": 0.34,
      "avg_session_duration": "3m 24s",
      "pages_per_session": 2.8,
      "total_sessions": 21456
    },
    "comparison": {
      "views_change": 0.15,
      "visitors_change": 0.22,
      "bounce_rate_change": -0.08
    },
    "traffic_sources": {
      "direct": {
        "visitors": 8234,
        "percentage": 0.45,
        "bounce_rate": 0.28
      },
      "search": {
        "visitors": 5878,
        "percentage": 0.32,
        "bounce_rate": 0.31
      },
      "social": {
        "visitors": 2759,
        "percentage": 0.15,
        "bounce_rate": 0.42
      },
      "referral": {
        "visitors": 1521,
        "percentage": 0.08,
        "bounce_rate": 0.39
      }
    },
    "top_pages": [
      {
        "path": "/",
        "title": "Home - Sparkle Gems",
        "views": 8234,
        "unique_views": 6891,
        "avg_time_on_page": "2m 15s",
        "bounce_rate": 0.29,
        "exit_rate": 0.15
      },
      {
        "path": "/products",
        "title": "Products - Sparkle Gems",
        "views": 5467,
        "unique_views": 4821,
        "avg_time_on_page": "4m 32s",
        "bounce_rate": 0.22,
        "exit_rate": 0.31
      }
    ],
    "geographic_data": {
      "countries": [
        {
          "code": "US",
          "name": "United States",
          "visitors": 8234,
          "percentage": 0.45
        },
        {
          "code": "CA",
          "name": "Canada",
          "visitors": 2156,
          "percentage": 0.12
        }
      ],
      "cities": [
        {
          "name": "New York",
          "country": "US",
          "visitors": 1892,
          "percentage": 0.10
        }
      ]
    },
    "device_data": {
      "desktop": {
        "visitors": 10234,
        "percentage": 0.56,
        "bounce_rate": 0.31
      },
      "mobile": {
        "visitors": 6892,
        "percentage": 0.37,
        "bounce_rate": 0.38
      },
      "tablet": {
        "visitors": 1266,
        "percentage": 0.07,
        "bounce_rate": 0.35
      }
    },
    "browser_data": [
      {
        "name": "Chrome",
        "version": "120.0",
        "visitors": 11234,
        "percentage": 0.61
      },
      {
        "name": "Safari",
        "version": "17.1",
        "visitors": 4321,
        "percentage": 0.24
      }
    ]
  }
}
```

## 📊 Performance Analytics

Get detailed performance metrics for your website.

### Endpoint

```
GET /v1/websites/{website_id}/analytics/performance
```

### Response

```json
{
  "success": true,
  "data": {
    "core_web_vitals": {
      "largest_contentful_paint": {
        "avg": 1.8,
        "p75": 2.1,
        "p90": 2.8,
        "status": "good"
      },
      "first_input_delay": {
        "avg": 45,
        "p75": 67,
        "p90": 89,
        "status": "good"
      },
      "cumulative_layout_shift": {
        "avg": 0.08,
        "p75": 0.12,
        "p90": 0.18,
        "status": "good"
      }
    },
    "page_speeds": [
      {
        "path": "/",
        "desktop_speed": 94,
        "mobile_speed": 87,
        "avg_load_time": 1.2,
        "total_blocking_time": 89
      }
    ],
    "resource_timing": {
      "html_size": 45.2,
      "css_size": 23.8,
      "js_size": 67.4,
      "image_size": 234.6,
      "total_size": 371.0,
      "compression_ratio": 0.73
    },
    "uptime": {
      "percentage": 99.97,
      "incidents": 1,
      "avg_response_time": 245,
      "regions": [
        {
          "name": "us-east",
          "response_time": 198,
          "uptime": 99.98
        }
      ]
    }
  }
}
```

## 🎯 Conversion Tracking

Track goals and conversions on your website.

### Set Up Goals

```
POST /v1/websites/{website_id}/analytics/goals
```

### Request Body

```json
{
  "name": "Newsletter Signup",
  "type": "event",
  "trigger": {
    "event": "form_submit",
    "selector": "#newsletter-form",
    "value_source": "email"
  },
  "value": 5.00,
  "currency": "USD"
}
```

### Goal Types

| Type | Description | Trigger Options |
|------|-------------|-----------------|
| `pageview` | Page visit | `path`, `query_params` |
| `event` | Custom event | `event_name`, `selector`, `element` |
| `duration` | Time on site | `minimum_duration` |
| `scroll` | Scroll depth | `percentage`, `pixel_depth` |
| `download` | File download | `file_extension`, `filename` |

### Get Conversion Data

```
GET /v1/websites/{website_id}/analytics/conversions
```

### Response

```json
{
  "success": true,
  "data": {
    "goals": [
      {
        "goal_id": "goal_1234567890",
        "name": "Newsletter Signup",
        "conversions": 342,
        "conversion_rate": 0.13,
        "total_value": 1710.00,
        "avg_value": 5.00
      }
    ],
    "funnel_analysis": {
      "homepage_visits": 2580,
      "product_page_visits": 1456,
      "cart_additions": 423,
      "checkout_starts": 287,
      "purchases": 156,
      "conversion_rate": 0.06
    }
  }
}
```

## 🔍 Real-time Analytics

Get real-time visitor data and activity.

### Endpoint

```
GET /v1/websites/{website_id}/analytics/realtime
```

### Response

```json
{
  "success": true,
  "data": {
    "active_visitors": 47,
    "active_sessions": 52,
    "page_views_last_30min": 156,
    "top_active_pages": [
      {
        "path": "/",
        "active_visitors": 23,
        "percentage": 0.49
      },
      {
        "path": "/products",
        "active_visitors": 12,
        "percentage": 0.26
      }
    ],
    "traffic_sources": {
      "direct": 0.42,
      "search": 0.35,
      "social": 0.18,
      "referral": 0.05
    },
    "geographic_distribution": {
      "US": 18,
      "CA": 8,
      "GB": 6,
      "AU": 4,
      "DE": 3
    },
    "recent_events": [
      {
        "timestamp": "2024-01-15T15:45:23Z",
        "type": "pageview",
        "path": "/products",
        "country": "US",
        "device": "desktop"
      }
    ]
  }
}
```

## 📱 Custom Events

Track custom events and user interactions.

### JavaScript Tracking

```html
<script>
// Track custom event
snapsite.track('button_click', {
  button_name: 'cta_hero',
  value: 'Get Started',
  category: 'engagement'
});

// Track conversion
snapsite.track('purchase', {
  value: 99.99,
  currency: 'USD',
  product_id: 'prod_123',
  quantity: 1
});

// Track page view (automatic)
snapsite.page('/about', 'About Us');
</script>
```

### API Event Tracking

```
POST /v1/websites/{website_id}/analytics/events
```

### Request Body

```json
{
  "events": [
    {
      "event": "purchase",
      "timestamp": "2024-01-15T15:30:00Z",
      "properties": {
        "value": 99.99,
        "currency": "USD",
        "product_id": "prod_123",
        "category": "electronics"
      },
      "user": {
        "id": "user_456",
        "country": "US",
        "device": "mobile"
      }
    }
  ]
}
```

## 🗺️ Heatmaps & User Flow

Analyze user behavior with visual insights.

### Get Heatmap Data

```
GET /v1/websites/{website_id}/analytics/heatmaps
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `page` | Specific page path |
| `type` | `click`, `scroll`, `move` |
| `device` | `desktop`, `mobile`, `tablet` |
| `period` | Time period |

### Response

```json
{
  "success": true,
  "data": {
    "page": "/",
    "type": "click",
    "device": "desktop",
    "data_points": [
      {
        "x": 450,
        "y": 320,
        "clicks": 234,
        "element": "button.cta-primary"
      },
      {
        "x": 200,
        "y": 150,
        "clicks": 156,
        "element": "nav a"
      }
    ],
    "scroll_depth": {
      "25%": 0.89,
      "50%": 0.67,
      "75%": 0.43,
      "100%": 0.28
    }
  }
}
```

### User Flow Analysis

```
GET /v1/websites/{website_id}/analytics/user-flow
```

### Response

```json
{
  "success": true,
  "data": {
    "entry_pages": [
      {
        "path": "/",
        "visitors": 1234,
        "percentage": 0.67
      }
    ],
    "popular_paths": [
      {
        "path": ["/" , "/products", "/checkout"],
        "users": 456,
        "conversion_rate": 0.12
      }
    ],
    "exit_pages": [
      {
        "path": "/contact",
        "exits": 234,
        "exit_rate": 0.78
      }
    ],
    "drop_off_points": [
      {
        "from": "/products",
        "to": "/checkout",
        "drop_off_rate": 0.64,
        "users_lost": 289
      }
    ]
  }
}
```

## 🔗 UTM Tracking

Track campaign performance with UTM parameters.

### Campaign Performance

```
GET /v1/websites/{website_id}/analytics/campaigns
```

### Response

```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "utm_campaign": "summer_sale",
        "utm_source": "google",
        "utm_medium": "cpc",
        "visitors": 1234,
        "conversions": 67,
        "conversion_rate": 0.054,
        "revenue": 6789.50,
        "cost_per_acquisition": 15.23
      }
    ],
    "sources": {
      "google": {
        "visitors": 2345,
        "conversions": 123,
        "revenue": 12345.67
      },
      "facebook": {
        "visitors": 1234,
        "conversions": 67,
        "revenue": 6789.50
      }
    }
  }
}
```

## 📧 Analytics Reports

Schedule and export analytics reports.

### Create Report

```
POST /v1/websites/{website_id}/analytics/reports
```

### Request Body

```json
{
  "name": "Monthly Traffic Report",
  "frequency": "monthly",
  "metrics": ["views", "visitors", "conversions", "revenue"],
  "format": "pdf",
  "recipients": ["analytics@company.com"],
  "filters": {
    "traffic_source": "organic"
  }
}
```

### Export Data

```
GET /v1/websites/{website_id}/analytics/export
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `format` | `csv`, `json`, `xlsx` |
| `period` | Time period |
| `metrics` | Metrics to include |

---

*Need help with analytics? Contact [analytics-support@snap-site.dev](mailto:analytics-support@snap-site.dev)*