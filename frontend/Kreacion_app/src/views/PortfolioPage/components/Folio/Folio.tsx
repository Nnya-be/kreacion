import { useState } from 'react';
import { Bell, Eye, Lock, User } from 'lucide-react';
import { Button,TextField, FormControlLabel, Switch, Radio, RadioGroup, Checkbox } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography, Box, Paper, Grid } from '@mui/material';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User /> },
    { id: 'account', label: 'Account', icon: <Lock /> },
    { id: 'privacy', label: 'Privacy', icon: <Eye /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Paper sx={{ width: { xs: '100%', md: '250px' }, p: 2, mr: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={4}>
          Settings
        </Typography>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            fullWidth
            startIcon={tab.icon}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? 'contained' : 'outlined'}
            sx={{ mb: 1 }}
          >
            {tab.label}
          </Button>
        ))}
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {activeTab === 'profile' && (
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Profile Information
            </Typography>
            <Box mt={3}>
              <TextField fullWidth label='Name' variant='outlined' sx={{ mb: 3 }} />
              <TextField fullWidth multiline rows={4} label='Bio' variant='outlined' sx={{ mb: 3 }} />
              <TextField fullWidth label='Website' variant='outlined' sx={{ mb: 3 }} />
              <Typography>Profile picture</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.500' }}>
                  <User />
                </Avatar>
                <Button variant="contained" sx={{ ml: 2 }}>
                  Change photo
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 'account' && (
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Account Settings
            </Typography>
            <Box mt={3}>
              <TextField fullWidth label="Email" type="email" variant="outlined" sx={{ mb: 3 }} />
              <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mb: 3 }} />
              <Typography>Account type</Typography>
              <RadioGroup defaultValue="personal" sx={{ mt: 2 }}>
                <FormControlLabel value="personal" control={<Radio />} label="Personal" />
                <FormControlLabel value="business" control={<Radio />} label="Business" />
              </RadioGroup>
            </Box>
          </Box>
        )}

        {activeTab === 'privacy' && (
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Privacy Settings
            </Typography>
            <Box mt={3}>
              <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Typography>Private profile</Typography>
                <FormControlLabel control={<Switch />} label="" />
              </Grid>
              <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Typography>Show activity status</Typography>
                <FormControlLabel control={<Switch />} label="" />
              </Grid>
              <Typography>Who can message you</Typography>
              <RadioGroup defaultValue="followers" sx={{ mt: 2 }}>
                <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
                <FormControlLabel value="followers" control={<Radio />} label="Followers only" />
              </RadioGroup>
            </Box>
          </Box>
        )}

        {activeTab === 'notifications' && (
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Notification Preferences
            </Typography>
            <Box mt={3}>
              <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Typography>Push notifications</Typography>
                <FormControlLabel control={<Switch />} label="" />
              </Grid>
              <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Typography>Email notifications</Typography>
                <FormControlLabel control={<Switch />} label="" />
              </Grid>
              <Typography>Notification types</Typography>
              <Box mt={2}>
                <FormControlLabel control={<Checkbox />} label="Likes" />
                <FormControlLabel control={<Checkbox />} label="Comments" />
                <FormControlLabel control={<Checkbox />} label="Mentions" />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
