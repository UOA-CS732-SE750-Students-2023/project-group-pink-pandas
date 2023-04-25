import { Patient, Task } from '../patientlist-db/schema';
import mongoose from 'mongoose';

async function retrievePatient(id) {
    return await Patient.findById(id);
}

async function updatePatient(id, data) {
    return await Patient.findByIdAndUpdate(id, data, { new: false });
}

async function deletePatient(id) {
    return await Patient.deleteOne({ _id: mongoose.Types.ObjectId(id) });
}

export { retrievePatient, updatePatient, deletePatient };
