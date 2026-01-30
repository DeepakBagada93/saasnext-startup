'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
  {
    name: 'Alex Johnson',
    email: 'alex.j@techsavvy.com',
    subscription: 'Growth',
    avatar: `https://i.pravatar.cc/150?u=alex.j@techsavvy.com`,
  },
  {
    name: 'Samantha Lee',
    email: 'sam.lee@innovateco.com',
    subscription: 'Founder',
    avatar: `https://i.pravatar.cc/150?u=sam.lee@innovateco.com`,
  },
    {
    name: 'David Chen',
    email: 'david.c@datadriven.com',
    subscription: 'Growth',
    avatar: `https://i.pravatar.cc/150?u=david.c@datadriven.com`,
  },
  {
    name: 'Maria Garcia',
    email: 'maria.g@marketfit.io',
    subscription: 'Enterprise',
    avatar: `https://i.pravatar.cc/150?u=maria.g@marketfit.io`,
  },
  {
    name: 'John Doe',
    email: 'john.d@example.com',
    subscription: 'Founder',
    avatar: `https://i.pravatar.cc/150?u=john.d@example.com`,
  },
]

export default function UserTable() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell>
                <div className="flex items-center gap-3">
                   <Avatar className='h-9 w-9'>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.subscription === 'Growth' ? 'default' : user.subscription === 'Enterprise' ? 'secondary' : 'outline'}>
                  {user.subscription}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">User Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Upgrade to Growth</DropdownMenuItem>
                    <DropdownMenuItem>Upgrade to Enterprise</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Ban User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
