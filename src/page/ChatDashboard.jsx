import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, IconButton, InputBase, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Typography } from '@mui/material';
import { AttachFile, Search, Send } from '@mui/icons-material';

const ChatDashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <Box display="flex" height="100vh">
            {/* Left Sidebar */}
            <Box width="25%" bgcolor="#f5f5f5" p={2} boxShadow={2} display="flex" flexDirection="column">
                {/* User Profile */}
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar alt="User Name" src="/static/images/avatar/1.jpg" sx={{ mr: 2 }} />
                    <Typography variant="h6" noWrap>User Name</Typography>
                </Box>

                {/* Search Bar */}
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton sx={{ p: '10px' }} aria-label="search">
                        <Search />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search friends/groups"
                        inputProps={{ 'aria-label': 'search friends or groups' }}
                    />
                </Paper>

                {/* Friends List */}
                <Typography variant="h6" mb={2}>Friends</Typography>
                <List>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt="Friend 1" src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="Friend 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt="Friend 2" src="/static/images/avatar/3.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="Friend 2" />
                    </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Groups List */}
                <Typography variant="h6" mb={2}>Groups</Typography>
                <List>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt="Group 1" src="/static/images/avatar/4.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="Group 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt="Group 2" src="/static/images/avatar/5.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary="Group 2" />
                    </ListItem>
                </List>
            </Box>

            {/* Right Chat Area */}
            <Box width="75%" p={3} display="flex" flexDirection="column">
                <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5">Chat with User</Typography>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                </Box>

                <Paper elevation={3} sx={{ flex: 1, mb: 2, p: 2, overflowY: 'auto' }}>
                    <Typography variant="body1" mb={2}>User: Hello!</Typography>
                    <Typography variant="body1" align="right" mb={2}>You: Hi, how are you?</Typography>
                </Paper>

                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter message"
                        inputProps={{ 'aria-label': 'enter message' }}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="send">
                        <Send />
                    </IconButton>
                </Paper>
            </Box>

            {/* Attach Files Modal */}
            <Modal open={modalOpen} onClose={handleClose}>
                <Box sx={{ ...modalStyle, width: 400 }}>
                    <Typography variant="h6" mb={2}>Attach Files</Typography>
                    <Button variant="contained" fullWidth sx={{ mb: 1 }}>Upload Image</Button>
                    <Button variant="contained" fullWidth sx={{ mb: 1 }}>Upload Video</Button>
                    <Button variant="contained" fullWidth sx={{ mb: 1 }}>Upload Audio</Button>
                    <Button variant="contained" fullWidth>Upload Document</Button>
                </Box>
            </Modal>
        </Box>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default ChatDashboard;
