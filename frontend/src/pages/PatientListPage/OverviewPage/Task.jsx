import { useState, useRef } from 'react';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Modal,
    TextField,
    Button,
    Box
} from '@mui/material'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import axios from 'axios';
import ImageAvatars from '../../../utils/Avatar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function Task(props) {
    const [checked, setChecked] = useState(() => {
        if (props.task.status === 2) {
            return true
        } else return false
    }
    );
    const [indeterminate, setIndeterminate] = useState(() => {
        if (props.task.status === 1) {
            return true
        } else return false
    });

    const [result, setResult] = useState(props.task.result);
    const [showModal, setShowModal] = useState(false);

    const handleCheckboxClick = async () => {

        if (!checked && !indeterminate) {
            setIndeterminate(true);
            await axios.put(`${API_BASE_URL}/api/task/updatetask/${props.task._id}`, { status: 1, finished_at: null, clinician: '6450de1bd5da784ad07a77c3' });

        } else if (!checked && indeterminate) {
            setChecked(true);
            setIndeterminate(false);
            setShowModal(true);
            await axios.put(`${API_BASE_URL}/api/task/updatetask/${props.task._id}`, { status: 2, finished_at: Date.now() });
        } else {
            setChecked(false);
            setIndeterminate(false);
            await axios.put(`${API_BASE_URL}/api/task/updatetask/${props.task._id}`, { status: 0, finished_at: null });
        }
    };

    const handleModalClose = async () => {
        await axios.put(`${API_BASE_URL}/api/task/updatetask/${props.task._id}`, { status: 2, result: result });
        setShowModal(false)
    };

    const handleResultChange = (event) => {
        setResult(event.target.value);
    };

    return (
        <Grid item xs={6}>
            <FormGroup>
                <FormControlLabel control={<Checkbox
                    onClick={handleCheckboxClick}
                    indeterminate={indeterminate}
                    checked={checked}
                    icon={<CircleOutlinedIcon />}
                    indeterminateIcon={<ChangeCircleOutlinedIcon />}
                    checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                />}
                    label={props.task.name} />
                {(indeterminate && props.task.clinician) && (<ImageAvatars id={props.task.clinician.avatar} />)}
                {checked && props.task.result !== "" && (
                    <TextField
                        label="Result"
                        variant="outlined"
                        value={result}
                        onChange={handleResultChange}
                        disabled={props.task.status >= 2}
                    />
                )}
                <Modal open={showModal} onClose={handleModalClose}>
                    <Box sx={{ ...style, width: 200 }}>
                        <TextField label="Enter result" variant="outlined" value={result} onChange={handleResultChange} />
                        <Button variant="contained" color="primary" onClick={handleModalClose}>
                            Save
                        </Button>
                    </Box>
                </Modal>
            </FormGroup>
        </Grid>
    )
}
