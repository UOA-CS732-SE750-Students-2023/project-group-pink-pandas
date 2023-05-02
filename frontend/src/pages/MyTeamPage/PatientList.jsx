
import Typography from '@mui/material/Typography';
import { Box, Divider, ListItemText, ListItem, List } from '@mui/material';


const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};


export default function PatientList({patientList}) {

    if (patientList){
        return (
            <div >
                <Box sx={{ mx: 'auto', px: 5 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Patients
                    </Typography>
                    <Divider />
    
                    <List sx={style} component="nav" aria-label="mailbox folders">
    
                        {patientList.map((patient, index) => (
                            <ListItem button
                                key={index}
                            >
                                <ListItemText
                                    primary={patient.fname + " " + patient.lname}
    
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </div>
        );
    }

}

