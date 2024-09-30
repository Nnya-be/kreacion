import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Save icon
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

interface Feed {
  caption: string;
  images: {
    url: string;
    altText: string;
  }[];
  tags: string[];
  author: {
    name: string;
    profilePicture: string;
  };
  createdAt: string;
  likes: string[];
  reviews: string[];
  // saves: number;
}

interface ContentProps {
  feeds: Feed[];
}

const Content: React.FC<ContentProps> = ({ feeds }) => {
  return (
    <Box>
      {feeds.length > 0 ? (
        feeds.map((feed, index) => (
          <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent sx={{ display: 'flex' }}>
              {/* User Avatar and Info */}
              <Avatar
                src={feed.author.profilePicture}
                alt={feed.author.name}
                sx={{ marginRight: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {feed.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(feed.createdAt).toLocaleDateString()}{' '}
                  {new Date(feed.createdAt).toLocaleTimeString()}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  {feed.caption}
                </Typography>
                {/* Render images in a 2-column grid */}
                <Grid container spacing={1} sx={{ marginTop: 2 }}>
                  {feed.images.length === 1 && (
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image={feed.images[0].url}
                        alt={feed.images[0].altText}
                        sx={{
                          borderRadius: 2,
                          objectFit: 'cover',
                          maxHeight: 400,
                        }}
                      />
                    </Grid>
                  )}
                  {feed.images.length === 2 && (
                    <>
                      {feed.images.map((image, imgIndex) => (
                        <Grid item xs={6} key={imgIndex}>
                          <CardMedia
                            component="img"
                            image={image.url}
                            alt={image.altText}
                            sx={{
                              borderRadius: 2,
                              objectFit: 'cover',
                              maxHeight: 400,
                            }}
                          />
                        </Grid>
                      ))}
                    </>
                  )}
                  {feed.images.length === 3 && (
                    <>
                      <Grid item xs={6} sx={{ height: '100%' }}>
                        <CardMedia
                          component="img"
                          image={feed.images[0].url}
                          alt={feed.images[0].altText}
                          sx={{
                            borderRadius: 2,
                            objectFit: 'cover',
                            height: '100%',
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} container spacing={1}>
                        {feed.images.slice(1).map((image, imgIndex) => (
                          <Grid item xs={12} key={imgIndex}>
                            <CardMedia
                              component="img"
                              image={image.url}
                              alt={image.altText}
                              sx={{
                                borderRadius: 2,
                                objectFit: 'cover',
                                maxHeight: 200,
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                  {feed.images.length === 4 && (
                    <>
                      {feed.images.map((image, imgIndex) => (
                        <Grid item xs={6} key={imgIndex}>
                          <CardMedia
                            component="img"
                            image={image.url}
                            alt={image.altText}
                            sx={{
                              borderRadius: 2,
                              objectFit: 'cover',
                              maxHeight: 200,
                            }}
                          />
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
                {/* Render tags */}
                <Box marginTop={1}>
                  {feed.tags.map((tag, tagIndex) => (
                    <Typography
                      key={tagIndex}
                      variant="caption"
                      color="primary"
                      sx={{ marginRight: 1 }}
                    >
                      #{tag}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </CardContent>
            {/* Actions (like, retweet, reply, save) */}
            <Grid container spacing={2} sx={{ padding: 1 }}>
              <Grid item>
                <IconButton size="small">
                  <ChatBubbleOutlineIcon fontSize="small" />
                  <Typography variant="caption" sx={{ marginLeft: 1 }}>
                    {feed.reviews.length}
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small">
                  <RepeatIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small">
                  <FavoriteIcon fontSize="small" />
                  <Typography variant="caption" sx={{ marginLeft: 1 }}>
                    {feed.likes.length}
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small">
                  <BookmarkIcon fontSize="small" />
                  <Typography variant="caption" sx={{ marginLeft: 1 }}>
                    {feed.reviews.length}
                  </Typography>
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No feeds available</Typography>
      )}
    </Box>
  );
};

export default Content;
