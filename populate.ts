import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';

try {
  await mongoose.connect(process.env.MONGO_URL as string);
  const user = (await User.findOne({ email: 'test1@test.com' })) as UserModel;
  const stuff = await readFile(new URL('./utils/mockDataTest.json', import.meta.url));
  const jsonJobs = JSON.parse(stuff.toString());
  const jobs = jsonJobs.map((job: JobModel) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
