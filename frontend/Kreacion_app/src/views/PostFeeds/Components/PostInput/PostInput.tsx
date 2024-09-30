import React, { useState } from 'react';
import { Box, TextField, IconButton, Grid, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface PostInputProps {
  onPostSubmit: (content: string) => void;
  onMediaSelect: (mediaFiles: File[]) => void;
  mediaPreviews: string[];
}

const PostInput: React.FC<PostInputProps> = ({
  onPostSubmit,
  onMediaSelect,
  mediaPreviews,
}) => {
  const [content, setContent] = useState<string>('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (mediaFiles.length == 3) {
        console.log('hello');
      }
      const selectedFiles = Array.from(e.target.files);
      setMediaFiles(selectedFiles);
      onMediaSelect(selectedFiles);
    }
  };

  const handlePost = () => {
    onPostSubmit(content);
    setContent('');
    setMediaFiles([]);
  };

  const renderGrid = () => {
    const mediaCount = mediaPreviews.length;

    if (mediaCount === 1) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              component="img"
              src={mediaPreviews[0]}
              alt="Selected media 1"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      );
    } else if (mediaCount === 2) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[0]}
              alt="Selected media 1"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[1]}
              alt="Selected media 2"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      );
    } else if (mediaCount === 3) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[0]}
              alt="Selected media 1"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[1]}
              alt="Selected media 2"
              sx={{
                width: '100%',
                height: '50%',
                objectFit: 'cover',
                borderRadius: 2,
                marginBottom: '8px',
              }}
            />
            <Box
              component="img"
              src={mediaPreviews[2]}
              alt="Selected media 3"
              sx={{
                width: '100%',
                height: '50%',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      );
    } else if (mediaCount === 4) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[0]}
              alt="Selected media 1"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[1]}
              alt="Selected media 2"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[2]}
              alt="Selected media 3"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              component="img"
              src={mediaPreviews[3]}
              alt="Selected media 4"
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      );
    }

    return null;
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="What's happening?"
        multiline
        rows={3}
        variant="outlined"
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Camera and Image Upload Buttons */}
        <Box>
          <input
            accept="image/*,video/*"
            id="file-upload"
            multiple
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e)}
          />
          <label htmlFor="file-upload">
            <IconButton component="span" color="primary">
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>
          <IconButton color="primary">
            <CameraAltIcon />
          </IconButton>
        </Box>
        <Button variant="contained" color="primary" onClick={handlePost}>
          Post
        </Button>
      </Box>

      {/* Media Grid Preview */}
      {mediaPreviews.length > 0 && (
        <Box sx={{ marginTop: 2 }}>{renderGrid()}</Box>
      )}
    </Box>
  );
};

export default PostInput;
