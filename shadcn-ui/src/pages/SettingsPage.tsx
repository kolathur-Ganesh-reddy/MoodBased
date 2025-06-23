// src/pages/SettingsPage.tsx
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useMoodHistory } from '@/hooks/useMoodHistory';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { clearHistory } = useMoodHistory();
  const [username, setUsername] = useState('User');
  const [theme, setTheme] = useState('system');
  const [useFaceDetection, setUseFaceDetection] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleClearHistory = () => {
    clearHistory();
    toast.success('Mood history cleared successfully');
  };

  const handleSaveProfile = () => {
    toast.success('Profile settings saved');
  };

  const handleSavePreferences = () => {
    toast.success('Preferences saved');
    
    if (useFaceDetection) {
      toast.info('Note: Face detection is a demo feature and not fully implemented');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Customize your VibeScape experience
          </p>
        </div>
        
        <div className="grid gap-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl} alt={username} />
                  <AvatarFallback className="text-2xl">{username.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-4 flex-1">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Display Name</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input
                      id="avatar"
                      placeholder="https://example.com/avatar.jpg"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>Save Profile</Button>
            </CardFooter>
          </Card>
          
          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your app preferences and appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred theme
                    </p>
                  </div>
                  <Select
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <SelectTrigger id="theme" className="w-40">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="face-detection">AI Face Detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Let AI detect your mood from facial expressions
                    </p>
                  </div>
                  <Switch
                    id="face-detection"
                    checked={useFaceDetection}
                    onCheckedChange={setUseFaceDetection}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound-effects">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds when interacting with the app
                    </p>
                  </div>
                  <Switch
                    id="sound-effects"
                    checked={soundEffects}
                    onCheckedChange={setSoundEffects}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences}>Save Preferences</Button>
            </CardFooter>
          </Card>
          
          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your mood data and app information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium">Reset Mood History</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear all your recorded mood entries and journal entries
                  </p>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Clear Mood History</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your mood entries
                        and journal entries from this device.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearHistory}>
                        Yes, clear history
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
          
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About VibeScape</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Version 1.0.0</p>
              <p className="text-sm text-muted-foreground">
                VibeScape is a dynamic, personalized content space that changes based on your mood.
                Select or detect your mood, and the entire website adjusts—showing articles, music, 
                visuals, products, and themes to match or enhance your emotions.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with React, Tailwind CSS, and Shadcn/UI.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;