# Website Generation API

Generate professional websites using AI with SnapSite's powerful generation engine. Our API supports multiple generation modes, templates, and customization options.

## 🚀 Quick Example

```javascript
const website = await snapsite.websites.create({
  prompt: "Create a modern restaurant website with online ordering",
  template: "restaurant",
  generation_mode: "premium",
  customization: {
    primaryColor: "#2563eb",
    font: "Inter",
    style: "modern"
  }
});
```

## 📝 Create Website

Generate a new website from a text prompt.

### Endpoint

```
POST /v1/websites
```

### Request Body

```json
{
  "prompt": "Create a modern e-commerce site for selling handmade jewelry",
  "template": "ecommerce",
  "generation_mode": "premium",
  "customization": {
    "primaryColor": "#8b5cf6",
    "secondaryColor": "#06b6d4",
    "font": "Inter",
    "style": "modern",
    "layout": "grid"
  },
  "features": [
    "responsive",
    "seo_optimized",
    "analytics",
    "ecommerce",
    "blog"
  ],
  "target_audience": "jewelry enthusiasts, gift buyers",
  "brand": {
    "name": "Sparkle Gems",
    "description": "Handcrafted jewelry with natural stones",
    "tone": "elegant, trustworthy"
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | ✅ | Detailed description of the website |
| `template` | string | ❌ | Template category (see available templates) |
| `generation_mode` | string | ❌ | `standard`, `premium`, `enterprise` (default: `standard`) |
| `customization` | object | ❌ | Design customization options |
| `features` | array | ❌ | Additional features to include |
| `target_audience` | string | ❌ | Description of target audience |
| `brand` | object | ❌ | Brand information |

### Generation Modes

| Mode | Description | Generation Time | Quality Score | Features |
|------|-------------|-----------------|---------------|----------|
| **Standard** | Fast generation | 15-30s | 75-85 | Basic templates, responsive |
| **Premium** | High-quality output | 45-90s | 85-95 | AI optimization, advanced SEO |
| **Enterprise** | Maximum quality | 90-180s | 90-98 | Custom AI models, A/B testing |

### Available Templates

```json
{
  "business": "Professional business websites",
  "ecommerce": "Online stores and marketplaces",
  "portfolio": "Creative portfolios and showcases",
  "restaurant": "Food and dining establishments",
  "agency": "Marketing and creative agencies",
  "saas": "Software and tech companies",
  "blog": "Content and news websites",
  "nonprofit": "Non-profit organizations",
  "medical": "Healthcare and medical practices",
  "education": "Schools and learning platforms",
  "real_estate": "Property and real estate",
  "fitness": "Gyms and fitness centers",
  "photography": "Photography and visual arts",
  "music": "Musicians and entertainment",
  "crypto": "Blockchain and cryptocurrency",
  "nft": "NFT and digital collectibles"
}
```

### Customization Options

```json
{
  "customization": {
    "primaryColor": "#hex-color",
    "secondaryColor": "#hex-color",
    "font": "Inter|Roboto|Playfair|Montserrat",
    "style": "modern|classic|minimal|bold|creative",
    "layout": "grid|list|masonry|carousel",
    "animations": "subtle|dynamic|none",
    "sections": [
      "hero",
      "about",
      "services",
      "portfolio",
      "testimonials",
      "contact",
      "blog",
      "team",
      "pricing"
    ]
  }
}
```

### Available Features

```json
{
  "features": [
    "responsive",           // Mobile-responsive design
    "seo_optimized",       // SEO meta tags and structure
    "analytics",           // Google Analytics integration
    "contact_forms",       // Contact and lead forms
    "social_media",        // Social media integration
    "blog",               // Blog functionality
    "ecommerce",          // Online store features
    "booking",            // Appointment booking
    "multilingual",       // Multi-language support
    "dark_mode",          // Dark mode toggle
    "accessibility",      // WCAG compliance
    "performance",        // Speed optimization
    "security",           // Security headers and SSL
    "custom_domain"       // Custom domain support
  ]
}
```

## 📊 Response

### Successful Response

```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "url": "https://sparkle-gems-1234.snap-site.dev",
    "preview_url": "https://preview.snap-site.dev/ws_1234567890abcdef",
    "status": "generating",
    "generation": {
      "mode": "premium",
      "template": "ecommerce",
      "progress": 15,
      "estimated_completion": "2024-01-15T10:32:30Z",
      "current_step": "Analyzing requirements and target audience"
    },
    "quality_metrics": {
      "overall_score": null,
      "accessibility_score": null,
      "seo_score": null,
      "performance_score": null,
      "estimated_score": 88
    },
    "metadata": {
      "word_count": 1250,
      "image_count": 12,
      "page_count": 5,
      "load_time": "< 2s"
    }
  },
  "meta": {
    "requestId": "req_1234567890",
    "timestamp": "2024-01-15T10:30:00Z",
    "processing_time": "1.2s"
  }
}
```

### Generation Status

Track generation progress by checking the website status:

```
GET /v1/websites/{website_id}
```

**Response during generation:**
```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "status": "generating",
    "generation": {
      "progress": 65,
      "current_step": "Generating premium HTML and CSS",
      "steps_completed": [
        "Requirements analysis",
        "Template selection",
        "Content generation",
        "Design system application"
      ],
      "estimated_completion": "2024-01-15T10:31:45Z"
    }
  }
}
```

**Response when completed:**
```json
{
  "success": true,
  "data": {
    "website_id": "ws_1234567890abcdef",
    "status": "completed",
    "url": "https://sparkle-gems-1234.snap-site.dev",
    "preview_url": "https://preview.snap-site.dev/ws_1234567890abcdef",
    "html_url": "https://api.snap-site.dev/v1/websites/ws_1234567890abcdef/html",
    "quality_metrics": {
      "overall_score": 92,
      "accessibility_score": 95,
      "seo_score": 89,
      "performance_score": 94,
      "mobile_score": 96
    },
    "metadata": {
      "word_count": 1847,
      "image_count": 18,
      "page_count": 6,
      "load_time": "1.3s",
      "html_size": "145kb",
      "css_size": "23kb"
    },
    "features_included": [
      "responsive",
      "seo_optimized",
      "contact_forms",
      "ecommerce",
      "analytics"
    ]
  }
}
```

## 🎨 Advanced Generation

### A/B Testing

Generate multiple variations for testing:

```json
{
  "prompt": "Modern SaaS landing page for project management tool",
  "template": "saas",
  "generation_mode": "enterprise",
  "ab_testing": {
    "variations": 3,
    "focus": ["conversion", "engagement", "trust"]
  }
}
```

### Industry-Specific Generation

```json
{
  "prompt": "Medical practice website with appointment booking",
  "template": "medical",
  "industry_config": {
    "compliance": ["HIPAA", "ADA"],
    "required_sections": ["services", "doctors", "insurance"],
    "trust_signals": ["certifications", "testimonials", "security"]
  }
}
```

### Multi-language Support

```json
{
  "prompt": "E-commerce site for international audience",
  "template": "ecommerce",
  "localization": {
    "primary_language": "en",
    "additional_languages": ["es", "fr", "de"],
    "currency": "USD",
    "regions": ["US", "EU", "LATAM"]
  }
}
```

## ⚠️ Error Responses

### Invalid Template

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TEMPLATE",
    "message": "The specified template is not available",
    "details": {
      "template": "invalid-template",
      "available_templates": ["business", "ecommerce", "portfolio"]
    }
  }
}
```

### Generation Failed

```json
{
  "success": false,
  "error": {
    "code": "GENERATION_FAILED",
    "message": "Website generation failed due to content analysis issues",
    "details": {
      "reason": "prompt_too_vague",
      "suggestions": [
        "Be more specific about your business type",
        "Include target audience information",
        "Specify desired features and functionality"
      ]
    }
  }
}
```

## 📋 Best Practices

### Effective Prompts

✅ **Good prompts:**
- "Create a modern bakery website with online ordering, featuring artisan breads and custom cakes for celebrations"
- "Build a consulting firm website focused on digital transformation for mid-size companies, with case studies and team bios"

❌ **Poor prompts:**
- "Make a website"
- "Business site"

### Optimization Tips

1. **Be specific** about your business and goals
2. **Include target audience** information
3. **Specify required features** upfront
4. **Choose appropriate template** for your industry
5. **Use premium mode** for production websites

---

*Need help with website generation? Check our [examples repository](https://github.com/snapsite/examples) or contact [api-support@snap-site.dev](mailto:api-support@snap-site.dev)*