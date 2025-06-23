// src/components/ContentFeed.tsx
import React from 'react';
import { useMoodContext } from '@/contexts/MoodContext';
import { moodContent } from '@/lib/mood-data';
import { Article, Playlist, Video } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Music, BookOpen, Video as VideoIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ArticleCard = ({ article }: { article: Article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden bg-muted">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{article.title}</CardTitle>
        <CardDescription className="text-xs">Source: {article.source}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1 text-primary hover:underline"
        >
          Read more <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  </motion.div>
);

const PlaylistCard = ({ playlist }: { playlist: Playlist }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
  >
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={playlist.coverUrl} 
          alt={playlist.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{playlist.name}</CardTitle>
        <CardDescription className="text-xs">Source: {playlist.source}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{playlist.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a 
          href={playlist.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1 text-primary hover:underline"
        >
          Listen <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  </motion.div>
);

const VideoCard = ({ video }: { video: Video }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden bg-muted relative">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 bg-black/75 text-white px-1 py-0.5 text-xs rounded">
          {video.duration}
        </span>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{video.title}</CardTitle>
        <CardDescription className="text-xs">Source: {video.source}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <a 
          href={video.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1 text-primary hover:underline"
        >
          Watch <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  </motion.div>
);

export const ContentFeed = () => {
  const { currentMood } = useMoodContext();
  
  if (!currentMood) return null;
  
  const content = moodContent[currentMood];
  const randomQuote = content.quotes[Math.floor(Math.random() * content.quotes.length)];

  return (
    <div className="space-y-8">
      <div className="p-4 md:p-6 rounded-lg bg-primary/5 border backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{content.emoji}</span>
          <div>
            <h3 className="text-xl font-semibold">{content.title}</h3>
            <p className="text-sm text-muted-foreground">Curated content for your current mood</p>
          </div>
        </div>
        <div className="italic text-md text-muted-foreground">"{randomQuote}"</div>
      </div>
      
      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Articles</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span className="hidden sm:inline">Music</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <VideoIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="music" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {content.playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};