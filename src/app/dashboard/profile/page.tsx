'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import * as auth from '@/lib/auth';

type User = {
  name: string;
  email: string;
  avatar: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(auth.getUser());
  }, []);

  const handleLogout = () => {
    auth.logout();
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    router.push('/login');
  };

  return (
    <div className="animate-in fade-in-50 duration-500 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Profile</CardTitle>
          <CardDescription>Manage your account settings and personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" className="ml-auto">Change Picture</Button>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} readOnly />
            </div>
          </div>
          <Button>Save Changes</Button>

          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
            <div className="mt-2 p-4 border border-destructive/50 rounded-lg flex items-center justify-between">
                <div>
                    <p className='font-medium'>Log Out</p>
                    <p className='text-sm text-muted-foreground'>End your current session.</p>
                </div>
                 <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
