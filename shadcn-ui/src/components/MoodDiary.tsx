// src/components/MoodDiary.tsx
import React, { useState } from 'react';
import { useMoodContext } from '@/contexts/MoodContext';
import { MoodChart } from '@/components/MoodChart';
import { Mood } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';

export const MoodDiary = () => {
  const { addMoodEntry, moodHistory } = useMoodContext();
  const [selectedMood, setSelectedMood] = useState<Mood>('happy');
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast.error('Please select a mood');
      return;
    }

    addMoodEntry(selectedMood, noteText);
    toast.success('Mood entry added to your diary');
    setNoteText('');
  };

  const moodOptions = [
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'energetic', label: 'Energetic', emoji: '⚡' },
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'angry', label: 'Angry', emoji: '😠' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Entry</CardTitle>
            <CardDescription>
              Record how you're feeling today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-3">How are you feeling?</div>
                <RadioGroup
                  value={selectedMood}
                  onValueChange={(value) => setSelectedMood(value as Mood)}
                  className="grid grid-cols-2 md:grid-cols-5 gap-2"
                >
                  {moodOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        id={option.value} 
                        value={option.value}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={option.value}
                        className={`flex flex-col items-center justify-center gap-1 rounded-md border-2 p-3 hover:bg-accent cursor-pointer ${
                          selectedMood === option.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-transparent'
                        }`}
                      >
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="text-sm">{option.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="note">Write a note (optional)</Label>
                <Textarea
                  id="note"
                  placeholder="What made you feel this way?"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Save Entry
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mood Chart</CardTitle>
            <CardDescription>
              View your mood patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <MoodChart entries={moodHistory} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>
            Your recent mood journal entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {moodHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No entries yet. Start recording your moods above!
            </div>
          ) : (
            <div className="space-y-4">
              {[...moodHistory]
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 5)
                .map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {moodOptions.find((option) => option.value === entry.mood)?.emoji}
                        </span>
                        <span className="font-medium capitalize">{entry.mood}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(entry.timestamp), 'MMM d, yyyy • h:mm a')}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground">{entry.note}</p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};