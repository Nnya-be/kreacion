// src/components/PostFeed.tsx
import React, { useState } from 'react';
import PostInput from './Components/PostInput';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';

interface Post {
  content: string;
  mediaUrl: string | null;
  mediaType: string | null;
}

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostSubmit = (content: string, media: File | null) => {
    let mediaUrl = null;
    let mediaType = null;

    if (media) {
      mediaUrl = URL.createObjectURL(media); // URL to show media preview
      mediaType = media.type;
    }

    setPosts([{ content, mediaUrl, mediaType }, ...posts]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <PostInput onPostSubmit={handlePostSubmit} />
      {posts.map((post, index) => (
        <Card key={index} sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
          {post.mediaUrl && (
            <CardMedia
              component={post.mediaType?.startsWith('image') ? 'img' : 'video'}
              src={post.mediaUrl}
              controls={post.mediaType?.startsWith('video')}
              alt="Uploaded Media"
              sx={{ maxHeight: 500 }}
            />
          )}
        </Card>
      ))}
    </Box>
  );
};

export default PostFeed;
