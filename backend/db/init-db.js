// TODO Read in .env file
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import patients from '../patients.json' assert {type: "json"};

// This is a standalone program which will populate the database with initial data.
async function run() {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING); // Connect using the connection string obtained from the environment

    console.log('Clearing db...');
    // Clear the database by deleting all Pokedex entries
    await clearDatabase();


    console.log('Adding data...');
    // Add patients
    addPatient();

    await mongoose.disconnect();
    console.log('Done!');
}

run();

async function clearDatabase() {
    
}

async function addPatient() {
    for(let data of patients) {
        const dbMon = new Patient(data);

        await dbMon.save();
    }
}