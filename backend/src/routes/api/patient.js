import {
    retrievePatient,
    updatePatient,
    deletePatient,
} from '../../dao/patient-dao';
import express from 'express';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await retrievePatient(id);

    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Not found');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updatePatient(id, data);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Not found');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await deletePatient(id);
    res.json(result);
});

export default router;
