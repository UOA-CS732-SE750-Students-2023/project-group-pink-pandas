import express from 'express';
import {
    retrieveNotificationList,
    retrieveUserOfNotification,
    deleteNotification,
    retrieveUnreadNotification,
    updateNotificationSatus
} from '../../dao/notification-dao';
import { authenticate } from '../../middleware/authMiddleware';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();


router.get('/:clinicianId',authenticate, async(req,res)=>{

    const { clinicianId } = req.params;

    // console.log(`Notification ln21: ${clinicianId}`)
    const notifications = await retrieveUserOfNotification(clinicianId);

    if (notifications){
        return res.json(notifications)
    } else{
        return sendStatus(HTTP_NOT_FOUND)
    }
    // res.json(await retrieveUserOfNotification('Jant'));
});

router.get('/unread/:clinicianId',authenticate,async(req,res)=>{

    const { clinicianId } = req.params;
    console.log(`Notification ln36: ${clinicianId}`)
    
    const unReadNotifications = await retrieveUnreadNotification(clinicianId);

    if (unReadNotifications){
        return res.json(unReadNotifications)
    } else{
        return sendStatus(HTTP_NOT_FOUND)
    }


    // res.json(await retrieveUnreadNotification('Jant'));

});


router.delete('/:id',authenticate, async(req, res) => {

    const { id } = req.params;
    deleteNotification(id);
    res.status(HTTP_NO_CONTENT).end();
    
});

router.put('/unread/:id', async (req, res) => {

    const { id } = req.params;
    const success = await updateNotificationSatus(id);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND )    
    
});


export default router;