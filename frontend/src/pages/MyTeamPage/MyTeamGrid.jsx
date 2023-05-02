import * as React from 'react';
import { Box, Paper, Grid, styled, Typography, Divider } from '@mui/material';
import PatientList from './PatientList';
import TeamPerformance from './TeamPerformance';
import Users from './Users';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../utils/AppContextProvider';
import TeamMemgerTable from './TeamMemberTable.jsx';






export default function MyTeamGrid() {

    const { team, tasks } = useContext(AppContext);

    const [completedTasks, setCompletedTasks] = React.useState(null);
    const [clinicianList, setClinicianList] = React.useState(null);
    const [patientList, setPatientList] = React.useState(null);
    


    if (team) {

        console.log("team: ", team);
        useEffect(() => {

            setClinicianList(team.clinicians);

            setPatientList(team.patients);

            console.log("team.patients: ", team.patients);
            console.log("team.clinicians: ", team.clinicians);

        }, [team])

    }




    if (tasks && team) {

        const tempTasks = tasks.filter(task => task.status === 2 && task.clinician.team === team._id);    

        useEffect(() => {
            setCompletedTasks(tempTasks);
    
        },[tasks])

    }


    if (team) {
        return (
            
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={8}>
                    <Grid container item xs={12} md={4} spacing={3} mt={10}>

                        <Grid item xs={12} md={12}>
                            <PatientList patientList={patientList} />
                        </Grid>

                    </Grid>
                    <Grid container item xs={12} md={8} spacing={3} mt={10}   >

                        <Grid item xs={12} md={12}>

                            <Typography gutterBottom variant="h5" component="div">
                                {team.name} Team Details
                            </Typography>
                            <Divider />

                            <TeamMemgerTable clinicianList={clinicianList} />

                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TeamPerformance completedTasks={completedTasks} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Users completedTasks={completedTasks} clinicianList={clinicianList}  />
                        </Grid>



                    </Grid>



                </Grid>
            </Box>
        );
    }
}


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

