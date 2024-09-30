import React, { useState } from 'react';
import PostInput from './Components/PostInput';
import { Box } from '@mui/material';

const PostFeed: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);

  const handleMediaSelection = (mediaFiles: File[]) => {
    if (mediaFiles.length > 4) {
      alert('You can upload a maximum of 4 images or videos.');
      return;
    }

    const previews = mediaFiles.map(file => URL.createObjectURL(file));
    setSelectedMedia(mediaFiles);
    setMediaPreviews(previews);
  };

  const handlePostSubmit = async (content: string) => {
    if (!content.trim() || selectedMedia.length === 0) {
      alert('Please enter content and upload at least one media file.');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    selectedMedia.forEach((media, index) => formData.append(`media_${index}`, media));

    try {
      // Simulate sending data to a server
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Post uploaded successfully!');
        // Clear state after successful post
        setSelectedMedia([]);
        setMediaPreviews([]);
      } else {
        alert('Failed to upload post.');
      }
    } catch (error) {
      alert('Error uploading post.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <PostInput
        onPostSubmit={handlePostSubmit}
        onMediaSelect={handleMediaSelection}
        mediaPreviews={mediaPreviews}
      />
    </Box>
  );
};

export default PostFeed;
