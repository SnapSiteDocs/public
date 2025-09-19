# SDK Reference

Official SDKs and libraries for integrating SnapSite API into your applications.

## 🚀 Official SDKs

We provide official SDKs for popular programming languages with full TypeScript support.

### JavaScript/TypeScript

**Installation:**
```bash
npm install @snapsite/sdk
# or
yarn add @snapsite/sdk
```

**Quick Start:**
```typescript
import { SnapSite } from '@snapsite/sdk';

const snapsite = new SnapSite({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
});
```

### Python

**Installation:**
```bash
pip install snapsite-sdk
```

**Quick Start:**
```python
from snapsite import SnapSite

snapsite = SnapSite(
    api_key='your-api-key',
    environment='production'
)
```

### PHP

**Installation:**
```bash
composer require snapsite/sdk
```

**Quick Start:**
```php
use SnapSite\Client;

$snapsite = new Client([
    'api_key' => 'your-api-key',
    'environment' => 'production'
]);
```

### Go

**Installation:**
```bash
go get github.com/snapsite/snapsite-go
```

**Quick Start:**
```go
import "github.com/snapsite/snapsite-go"

client := snapsite.NewClient("your-api-key")
```

## 📘 JavaScript/TypeScript SDK

### Installation & Setup

```bash
npm install @snapsite/sdk
```

```typescript
import { SnapSite, WebsiteCreateRequest } from '@snapsite/sdk';

const snapsite = new SnapSite({
  apiKey: process.env.SNAPSITE_API_KEY!,
  environment: 'production',
  timeout: 30000, // 30 seconds
  retries: 3
});
```

### Configuration Options

```typescript
interface SnapSiteConfig {
  apiKey: string;
  environment?: 'production' | 'sandbox';
  baseURL?: string;
  timeout?: number;
  retries?: number;
  onRequest?: (request: Request) => void;
  onResponse?: (response: Response) => void;
  onError?: (error: Error) => void;
}
```

### Website Operations

#### Create Website

```typescript
const websiteRequest: WebsiteCreateRequest = {
  prompt: "Create a modern bakery website with online ordering",
  template: "restaurant",
  generation_mode: "premium",
  customization: {
    primaryColor: "#8b4513",
    secondaryColor: "#daa520",
    font: "Playfair",
    style: "classic"
  },
  features: ["responsive", "seo_optimized", "ecommerce", "booking"]
};

try {
  const website = await snapsite.websites.create(websiteRequest);
  console.log(`Website created: ${website.url}`);

  // Wait for generation to complete
  const completed = await snapsite.websites.waitForCompletion(website.website_id);
  console.log(`Generation completed with score: ${completed.quality_metrics.overall_score}`);
} catch (error) {
  console.error('Error creating website:', error);
}
```

#### List Websites

```typescript
const websites = await snapsite.websites.list({
  limit: 20,
  status: 'published',
  template: 'ecommerce'
});

websites.data.websites.forEach(website => {
  console.log(`${website.name}: ${website.url}`);
});
```

#### Get Website Details

```typescript
const website = await snapsite.websites.get('ws_1234567890abcdef');
console.log(website.quality_metrics);
```

#### Update Website

```typescript
await snapsite.websites.update('ws_1234567890abcdef', {
  name: "Updated Website Name",
  settings: {
    seo: {
      title: "New SEO Title",
      description: "Updated description"
    }
  }
});
```

#### Delete Website

```typescript
await snapsite.websites.delete('ws_1234567890abcdef', {
  confirm: true,
  backup: false
});
```

### Domain Management

#### Add Custom Domain

```typescript
const domain = await snapsite.domains.create({
  domain: "www.example.com",
  website_id: "ws_1234567890abcdef",
  redirect_apex: true,
  force_https: true
});

console.log('DNS Records to configure:');
domain.verification.dns_records.forEach(record => {
  console.log(`${record.type} ${record.name} -> ${record.value}`);
});
```

#### Verify Domain

```typescript
const verified = await snapsite.domains.verify('dom_1234567890abcdef');
if (verified.verification_status === 'verified') {
  console.log('Domain verified successfully!');
}
```

### Real-time Updates

#### WebSocket Connections

```typescript
const ws = snapsite.realtime.connect();

// Listen for website generation updates
ws.subscribe('websites', 'ws_1234567890abcdef', (event) => {
  if (event.type === 'generation_progress') {
    console.log(`Progress: ${event.data.progress}%`);
  } else if (event.type === 'generation_completed') {
    console.log('Generation completed!', event.data.quality_metrics);
  }
});
```

#### Webhooks

```typescript
// Configure webhook endpoint
await snapsite.webhooks.create({
  url: 'https://your-app.com/webhooks/snapsite',
  events: ['website.created', 'website.published', 'domain.verified'],
  secret: 'your-webhook-secret'
});
```

### Error Handling

```typescript
import { SnapSiteError, ValidationError, RateLimitError } from '@snapsite/sdk';

try {
  const website = await snapsite.websites.create(request);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded. Retry after:', error.retryAfter);
  } else if (error instanceof SnapSiteError) {
    console.error('API error:', error.message, error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Utilities

#### Polling Helper

```typescript
import { pollUntil } from '@snapsite/sdk/utils';

const website = await pollUntil(
  () => snapsite.websites.get(websiteId),
  (result) => result.status === 'completed',
  {
    interval: 2000, // 2 seconds
    timeout: 300000, // 5 minutes
    maxAttempts: 150
  }
);
```

#### Response Validation

```typescript
import { validateWebsiteResponse } from '@snapsite/sdk/validators';

const website = await snapsite.websites.get(websiteId);
const validation = validateWebsiteResponse(website);

if (!validation.valid) {
  console.error('Invalid response:', validation.errors);
}
```

## 🐍 Python SDK

### Installation & Setup

```bash
pip install snapsite-sdk
```

```python
from snapsite import SnapSite, WebsiteCreateRequest
import os

snapsite = SnapSite(
    api_key=os.getenv('SNAPSITE_API_KEY'),
    environment='production',
    timeout=30,
    retries=3
)
```

### Basic Usage

```python
# Create website
website_request = WebsiteCreateRequest(
    prompt="Create a modern consulting firm website",
    template="business",
    generation_mode="premium",
    customization={
        "primaryColor": "#2563eb",
        "font": "Inter",
        "style": "modern"
    }
)

website = snapsite.websites.create(website_request)
print(f"Website created: {website.url}")

# Wait for completion
completed = snapsite.websites.wait_for_completion(
    website.website_id,
    timeout=300
)
print(f"Quality score: {completed.quality_metrics.overall_score}")
```

### Async Support

```python
import asyncio
from snapsite import AsyncSnapSite

async def create_website():
    async_snapsite = AsyncSnapSite(api_key='your-api-key')

    website = await async_snapsite.websites.create(website_request)
    completed = await async_snapsite.websites.wait_for_completion(
        website.website_id
    )

    return completed

# Run async function
website = asyncio.run(create_website())
```

### Error Handling

```python
from snapsite.exceptions import (
    SnapSiteError,
    ValidationError,
    RateLimitError,
    NotFoundError
)

try:
    website = snapsite.websites.create(request)
except ValidationError as e:
    print(f"Validation error: {e.details}")
except RateLimitError as e:
    print(f"Rate limited. Retry after: {e.retry_after}")
except NotFoundError:
    print("Resource not found")
except SnapSiteError as e:
    print(f"API error: {e.message} (code: {e.code})")
```

## 🐘 PHP SDK

### Installation & Setup

```bash
composer require snapsite/sdk
```

```php
<?php
require_once 'vendor/autoload.php';

use SnapSite\Client;
use SnapSite\Models\WebsiteCreateRequest;

$snapsite = new Client([
    'api_key' => $_ENV['SNAPSITE_API_KEY'],
    'environment' => 'production',
    'timeout' => 30
]);
```

### Basic Usage

```php
$request = new WebsiteCreateRequest([
    'prompt' => 'Create a modern law firm website',
    'template' => 'business',
    'generation_mode' => 'premium',
    'customization' => [
        'primaryColor' => '#1f2937',
        'font' => 'Inter',
        'style' => 'professional'
    ]
]);

try {
    $website = $snapsite->websites()->create($request);
    echo "Website created: " . $website->url . "\n";

    // Wait for completion
    $completed = $snapsite->websites()->waitForCompletion(
        $website->website_id,
        ['timeout' => 300]
    );

    echo "Quality score: " . $completed->quality_metrics->overall_score . "\n";
} catch (SnapSite\Exceptions\SnapSiteException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
```

## 🐹 Go SDK

### Installation & Setup

```bash
go get github.com/snapsite/snapsite-go
```

```go
package main

import (
    "context"
    "log"
    "os"

    "github.com/snapsite/snapsite-go"
)

func main() {
    client := snapsite.NewClient(os.Getenv("SNAPSITE_API_KEY"))

    ctx := context.Background()

    request := &snapsite.WebsiteCreateRequest{
        Prompt:         "Create a modern tech startup website",
        Template:       "saas",
        GenerationMode: "premium",
        Customization: &snapsite.Customization{
            PrimaryColor: "#6366f1",
            Font:         "Inter",
            Style:        "modern",
        },
    }

    website, err := client.Websites.Create(ctx, request)
    if err != nil {
        log.Fatal(err)
    }

    log.Printf("Website created: %s", website.URL)

    // Wait for completion
    completed, err := client.Websites.WaitForCompletion(ctx, website.WebsiteID, &snapsite.WaitOptions{
        Timeout: 300,
    })
    if err != nil {
        log.Fatal(err)
    }

    log.Printf("Quality score: %d", completed.QualityMetrics.OverallScore)
}
```

## 🔧 CLI Tool

### Installation

```bash
npm install -g @snapsite/cli
# or
curl -sSL https://install.snap-site.dev | sh
```

### Authentication

```bash
snapsite auth login
# or
snapsite config set api-key your-api-key
```

### Commands

```bash
# Create website
snapsite create "Modern restaurant website" --template restaurant --premium

# List websites
snapsite list --status published

# Get website details
snapsite get ws_1234567890abcdef

# Add custom domain
snapsite domain add www.example.com ws_1234567890abcdef

# Export website
snapsite export ws_1234567890abcdef --format html --output ./website.zip

# Deploy to custom domain
snapsite deploy ws_1234567890abcdef --domain www.example.com
```

## 📚 Additional Resources

### Code Examples

- **React Integration**: [github.com/snapsite/examples/react](https://github.com/snapsite/examples/react)
- **Next.js App**: [github.com/snapsite/examples/nextjs](https://github.com/snapsite/examples/nextjs)
- **WordPress Plugin**: [github.com/snapsite/wordpress-plugin](https://github.com/snapsite/wordpress-plugin)
- **Zapier Integration**: [github.com/snapsite/zapier-app](https://github.com/snapsite/zapier-app)

### Community SDKs

- **Ruby**: [gem 'snapsite-ruby'](https://rubygems.org/gems/snapsite-ruby)
- **Java**: [maven 'com.snapsite:sdk'](https://mvnrepository.com/artifact/com.snapsite/sdk)
- **C#**: [nuget 'SnapSite.SDK'](https://www.nuget.org/packages/SnapSite.SDK)

---

*Need help with SDK integration? Join our [Discord community](https://discord.gg/snapsite) or contact [sdk-support@snap-site.dev](mailto:sdk-support@snap-site.dev)*