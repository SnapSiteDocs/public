import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { generateWebsite, type GenerateWebsiteRequest } from '@/lib/api'
import { Loader2, Sparkles, Zap } from 'lucide-react'

const templates = [
  { id: 'business', name: 'Business', description: 'Professional business websites' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Online stores and shops' },
  { id: 'portfolio', name: 'Portfolio', description: 'Creative portfolios and showcases' },
  { id: 'blog', name: 'Blog', description: 'Content-focused websites' },
  { id: 'landing', name: 'Landing Page', description: 'High-converting landing pages' },
  { id: 'restaurant', name: 'Restaurant', description: 'Food and dining websites' },
  { id: 'saas', name: 'SaaS', description: 'Software as a Service websites' },
  { id: 'nonprofit', name: 'Non-profit', description: 'Charity and organization sites' },
]

const generationModes = [
  { id: 'standard', name: 'Standard', description: 'Good quality, fast generation' },
  { id: 'premium', name: 'Premium', description: 'Highest quality, advanced features', badge: 'Pro' },
]

export function WebsiteGenerator() {
  const [prompt, setPrompt] = useState('')
  const [template, setTemplate] = useState('')
  const [generationMode, setGenerationMode] = useState('standard')
  const [progress, setProgress] = useState(0)

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const generateMutation = useMutation({
    mutationFn: (request: GenerateWebsiteRequest) => generateWebsite(request),
    onSuccess: (data) => {
      toast({
        title: 'Website Generated Successfully!',
        description: `Your website "${data.name}" has been created.`,
      })
      queryClient.invalidateQueries({ queryKey: ['websites'] })
      setPrompt('')
      setProgress(0)
    },
    onError: (error) => {
      toast({
        title: 'Generation Failed',
        description: 'There was an error generating your website. Please try again.',
        variant: 'destructive',
      })
      setProgress(0)
    },
  })

  const handleGenerate = async () => {
    if (!prompt.trim() || !template) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a description and select a template.',
        variant: 'destructive',
      })
      return
    }

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 15
      })
    }, 500)

    generateMutation.mutate({
      prompt,
      template,
      generation_mode: generationMode as 'standard' | 'premium',
      customization: {
        primaryColor: '#6366f1',
        font: 'Inter',
        style: 'modern',
      },
    })
  }

  const isGenerating = generateMutation.isPending

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Website Generator
        </CardTitle>
        <CardDescription>
          Describe your website and let our AI create it for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="prompt" className="text-sm font-medium mb-2 block">
            Website Description
          </label>
          <Textarea
            id="prompt"
            placeholder="Describe your website... (e.g., 'A modern bakery website with online ordering and delivery')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
            disabled={isGenerating}
          />
        </div>

        <div>
          <label htmlFor="template" className="text-sm font-medium mb-2 block">
            Template Category
          </label>
          <Select value={template} onValueChange={setTemplate} disabled={isGenerating}>
            <SelectTrigger>
              <SelectValue placeholder="Select a template category" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="mode" className="text-sm font-medium mb-2 block">
            Generation Mode
          </label>
          <Select value={generationMode} onValueChange={setGenerationMode} disabled={isGenerating}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {generationModes.map((mode) => (
                <SelectItem key={mode.id} value={mode.id}>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{mode.name}</span>
                        {mode.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {mode.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{mode.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Generating your website...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim() || !template}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Generate Website
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}