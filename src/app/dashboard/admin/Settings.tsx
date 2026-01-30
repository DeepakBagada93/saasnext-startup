'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function Settings() {
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast({
            title: "Settings Saved",
            description: "Your application settings have been updated.",
        })
    }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-accent">API Keys</h3>
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input id="openai-key" type="password" defaultValue="••••••••••••••••••••••••" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe API Key</Label>
                <Input id="stripe-key" type="password" defaultValue="••••••••••••••••••••••••" />
            </div>
        </div>
      </div>
      <Separator />
       <div className="space-y-4">
        <h3 className="text-lg font-medium text-accent">Feature Flags</h3>
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="feature-new-editor">New Editor Experience</Label>
                <Input id="feature-new-editor" defaultValue="false" />
                <p className="text-sm text-muted-foreground">Enable the new editor UI for all users.</p>
            </div>
             <div className="space-y-2">
                <Label htmlFor="feature-beta-access">Beta Access Group</Label>
                <Input id="feature-beta-access" defaultValue="internal-team" />
                 <p className="text-sm text-muted-foreground">User group with access to beta features.</p>
            </div>
        </div>
      </div>
      <Button type="submit">Save Settings</Button>
    </form>
  )
}
