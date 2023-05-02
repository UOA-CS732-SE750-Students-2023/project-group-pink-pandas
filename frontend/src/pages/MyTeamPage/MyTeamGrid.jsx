import * as React from 'react';
import { Box, Paper, Grid, styled, Typography, Divider } from '@mui/material';
import PatientList from './PatientList';
import TeamPerformance from './TeamPerformance';
import Users from './Users';
// import TeamDetails from './TeamDetails';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../utils/AppContextProvider';
import TeamMemgerTable from './TeamMemberTable.jsx';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));





export default function MyTeamGrid() {

    const { team, tasks } = useContext(AppContext);

    const [completedTasks, setCompletedTasks] = React.useState(null);
    const [clinicianList, setClinicianList] = React.useState(null);
    const [patientList, setPatientList] = React.useState(null);
    


    if (team) {

        useEffect(() => {

            setClinicianList(team.clinicians);

            setPatientList(team.patients);

        }, [team])

    }

    // if (tasks) {

    //     const tempTasks = tasks.filter(task => task.status === 2);

    //     useEffect(() => {
    //         setCompletedTasks(tempTasks);
    
    //     },[tasks])

    // }




    if (tasks && team) {

        const tempTasks = tasks.filter(task => task.status === 2 && task.clinician.team === team._id);

        // tasks.map(task => console.log(" task.clinician.team: ", task.clinician.team ));

        
    

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