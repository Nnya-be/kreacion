import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

const mock = [
  {
    image: 'https://assets.vogue.com/photos/66f2e9ef6d0aeaf2ce8155cc/1:1/w_640,c_limit/Credit_%20Conor%20Cunningham,%20KHY%20x%20ATLEIN%20for%20Vogue%206%20(1).jpg',
    description:
      'Kylie Jenner unveils her new collaboration with Atlein',
    title: 'Fashion',
    tags: ['Culture', 'Design', 'Clothing', 'Photography'],
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
    },
    date: '10 Sep',
  },
  {
    image: 'https://assets.vogue.com/photos/66df531e47082bb70b75d469/4:3/w_960,c_limit/GettyImages-2159049500.jpg',
    description: 'Shop Chioma Nnamdis edit',
    title: 'Clothing',
    tags: ['UX', 'Design', 'Themes', 'Photography'],
    author: {
      name: 'Jhon Anderson',
      avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
    },
    date: '02 Aug',
  },
  {
    image: 'https://assets.vogue.com/photos/67014d44f74955847bda4b75/4:3/w_1920,c_limit/BLU_A99052540.jpg',
    description:
      'Kim Kardashian kindly reminds us of her name',
    title: 'Fashion',
    tags: ['Fashion', 'Design', 'Themes', 'Photography'],
    author: {
      name: 'Chary Smith',
      avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
    },
    date: '05 Mar',
  },
  {
    image: 'https://assets.maccarianagency.com/backgrounds/img3.jpg',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
    title: 'Eiusmod tempor incididunt',
    tags: ['UX', 'Design', 'Themes', 'Photography'],
    author: {
      name: 'Clara Bertoletti',
      avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
    },
    date: '10 Sep',
  },
];

const LatestStories = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        marginBottom={4}
      >
        <Box>
          <Typography fontWeight={700} variant={'h6'} gutterBottom>
            Latest stories
          </Typography>
          <Typography color={'text.secondary'}>
            Here’s what we’ve been up to recently.
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          <Box
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            marginLeft={2}
          >
            View all
          </Box>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {mock.map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Box
              component={'a'}
              href={''}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box component={Card} width={1} height={1}>
                <CardMedia
                  image={item.image}
                  title={item.title}
                  sx={{
                    height: { xs: 300, md: 360 },
                    position: 'relative',
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
                  }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    display={'flex'}
                    justifyContent={'center'}
                    flexWrap={'wrap'}
                  >
                    {item.tags.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size={'small'}
                        sx={{ marginBottom: 1, marginRight: 1 }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant={'h6'}
                    fontWeight={700}
                    align={'center'}
                    sx={{ textTransform: 'uppercase' }}
                  >
                    {item.title}
                  </Typography>
                  <Box marginY={1}>
                    <Typography
                      variant={'caption'}
                      align={'center'}
                      color={'text.secondary'}
                      component={'i'}
                    >
                      {item.author.name} - {item.date}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" align={'center'}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestStories;
