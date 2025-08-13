declare namespace Express {
  interface Request {
    user: { userId: string; role: string; testUser: boolean };
  }
}

type JobModel = {
  company: string;
  position: string;
  jobStatus: JOB_STATUS;
  jobType: JOB_TYPE;
  jobLocation: string;
  createdBy: object;
};

type DefaultStats = {
  pending: number;
  interview: number;
  declined: number;
};
