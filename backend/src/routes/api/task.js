import {
    retrieveTask,
    retrieveTasks,
    updateTask,
    deleteTask,
    retrieveTasksByPatientId,
} from '../../dao/task-dao';
import express from 'express';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await retrieveTasks());
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const task = await retrieveTask(id);

    if (task) {
        res.json(task);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

router.get('/patient/:id', async (req, res) => {
    const { id } = req.params;
    const tasks = await retrieveTasksByPatientId(id);
    if (tasks) {
        res.json(tasks);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

router.put('/assignclinician/:id', async (req, res) => {
    const { id } = req.params;
    const task = req.body;
    task._id = id;
    const success = await updateTask(task);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteTask(id);
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;
