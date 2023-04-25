import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    Typography,
} from '@mui/material';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import HourglassFullIcon from '@mui/icons-material/HourglassFull';

import HourglassTopIcon from '@mui/icons-material/HourglassTop';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useGet from '../../hooks/useGet';

const TASK_ICONS = {
    0: <HourglassEmptyIcon />,
    1: <HourglassFullIcon />,
};

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    position: 'relative',
    left: '300px',
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
export default function PateintDetailsTasks() {
    const { patientId } = useParams();
    const tasksArray = useGet(
        `${API_BASE_URL}/api/task/patient/${patientId}`,
        []
    );

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    Tasks
                </Typography>

                <List component='nav' aria-label='mailbox folders'>
                    {tasksArray.data.map((task, index) => (
                        <React.Fragment key={index}>
                            <ListItem button>
                                <ListItemText primary={task.name} />
                                {TASK_ICONS[task.status]}
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
