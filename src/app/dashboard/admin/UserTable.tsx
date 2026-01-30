'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlaceHolderImages } from '@/lib/placeholder-images'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast'

const users = [
  {
    avatarId: 'user-avatar-1',
    name: 'Alex Johnson',
    email: 'alex.j@techsavvy.com',
    subscription: 'Growth',
  },
  {
    avatarId: 'user-avatar-2',
    name: 'Samantha Lee',
    email: 'sam.lee@innovateco.com',
    subscription: 'Founder',
  },
    {
    avatarId: 'user-avatar-3',
    name: 'David Chen',
    email: 'david.c@datadriven.com',
    subscription: 'Growth',
  },
  {
    avatarId: 'user-avatar-4',
    name: 'Maria Garcia',
    email: 'maria.g@marketfit.io',
    subscription: 'Enterprise',
  },
  {
    avatarId: 'user-avatar-5',
    name: 'John Doe',
    email: 'john.d@example.com',
    subscription: 'Founder',
  },
]

type User = typeof users[0];

export default function UserTable() {
  const { toast } = useToast()
  const [showBanAlert, setShowBanAlert] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleBanClick = (user: User) => {
    setSelectedUser(user)
    setShowBanAlert(true)
  }

  const handleBanConfirm = () => {
    if (selectedUser) {
      toast({
        title: "User Banned",
        description: `${selectedUser.name} has been banned from the platform.`,
      })
    }
    setShowBanAlert(false)
    setSelectedUser(null)
  }


  return (
    <>
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
            {users.map((user) => {
              const avatar = PlaceHolderImages.find(img => img.id === user.avatarId);
              return (
              <TableRow key={user.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className='h-9 w-9'>
                          {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint || ''} />}
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
                      <DropdownMenuItem className="text-destructive" onClick={() => handleBanClick(user)}>
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showBanAlert} onOpenChange={setShowBanAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently ban
              <span className="font-semibold"> {selectedUser?.name} </span> 
              and block them from accessing the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUser(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBanConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirm Ban
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
