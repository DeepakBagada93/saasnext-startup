'use client'

import { TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, LineChart, Bar, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const monthlySignups = [
    { month: 'Jan', signups: 186 },
    { month: 'Feb', signups: 305 },
    { month: 'Mar', signups: 237 },
    { month: 'Apr', signups: 273 },
    { month: 'May', signups: 209 },
    { month: 'Jun', signups: 214 },
]

const monthlyRevenue = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 3500 },
    { month: 'Mar', revenue: 4200 },
    { month: 'Apr', revenue: 5800 },
    { month: 'May', revenue: 6500 },
    { month: 'Jun', revenue: 7200 },
]

const chartConfig = {
    signups: {
        label: 'Signups',
        color: 'hsl(var(--accent))',
    },
    revenue: {
        label: 'Revenue',
        color: 'hsl(var(--primary))',
    }
}

export default function AnalyticsDashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                    <Users className="h-5 w-5"/>
                    Monthly Signups
                </CardTitle>
                <CardDescription>Total new users per month.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlySignups} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                            />
                             <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                            <Bar dataKey="signups" fill="var(--color-signups)" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                    <TrendingUp className="h-5 w-5"/>
                    Monthly Recurring Revenue (MRR)
                </CardTitle>
                <CardDescription>Estimated MRR growth over time.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyRevenue} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                            />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                             <Line dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  )
}
