// src/components/PostInput.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, CardMedia } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

interface PostInputProps {
  onPostSubmit: (content: string, media: File | null) => void;
}

const PostInput: React.FC<PostInputProps> = ({ onPostSubmit }) => {
  const [postContent, setPostContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (postContent.trim() || media) {
      onPostSubmit(postContent, media);
      setPostContent('');  // Clear content
      setMedia(null);      // Clear media
      setMediaPreview(null); // Clear preview
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: '0 auto' }}>
      <TextField
        label="What's on your mind?"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      
      {/* File input for images or videos */}
      <Box sx={{ marginTop: 2 }}>
        <input
          accept="image/*,video/*"
          style={{ display: 'none' }}
          id="media-upload"
          type="file"
          onChange={handleMediaChange}
        />
        <label htmlFor="media-upload">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
          <IconButton color="primary" aria-label="upload video" component="span">
            <VideoCameraBackIcon />
          </IconButton>
          <Typography variant="caption" display="block">
            Upload Image/Video
          </Typography>
        </label>
      </Box>

      {/* Media preview */}
      {mediaPreview && (
        <Box sx={{ marginTop: 2 }}>
          {media?.type.startsWith('image') ? (
            <CardMedia component="img" src={mediaPreview} alt="Image Preview" />
          ) : (
            <CardMedia component="video" src={mediaPreview} controls />
          )}
        </Box>
      )}

      {/* Submit button */}
      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={handleSubmit}
        disabled={!postContent.trim() && !media}
      >
        Post
      </Button>
    </Box>
  );
};

export default PostInput;
