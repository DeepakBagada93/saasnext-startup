import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UserTable from "./UserTable"
import AnalyticsDashboard from "./AnalyticsDashboard"
import Settings from "./Settings"
import { Shield } from "lucide-react"

export default function AdminPage() {
  // Mock role check
  const isAdmin = true; 

  if (!isAdmin) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in-50 duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            Admin Panel
        </h1>
        <p className="text-muted-foreground">Manage users, view analytics, and configure app settings.</p>
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all registered users.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
             <CardHeader>
              <CardTitle>App Analytics</CardTitle>
              <CardDescription>Usage statistics and revenue metrics.</CardDescription>
            </CardHeader>
            <CardContent>
                <AnalyticsDashboard />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
             <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Configure application-wide settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Settings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
