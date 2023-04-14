import express from "express";
import { Patient } from "../db/patient-schema";

const router = express.Router();

router.post('/addPatient', async (req,res) => {
    try {
        const { name, description, location, responsibleClinicians, quickAdd, notification } = req.body;
        const newPatient = new Patient({
          name,
          description,
          location,
          responsibleClinicians,
          quickAdd,
          notification
        });
        await newPatient.save();
        res.status(201).json(newPatient);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
})

module.exports = router;