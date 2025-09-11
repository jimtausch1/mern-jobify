export const mockUser = {
  user: {
    _id: '689b56e9ef5ee87ce80f2905',
    name: 'John',
    email: 'test1@test.com',
    lastName: 'Smith',
    location: 'alabama',
    role: 'user',
    __v: 0,
    avatar: '',
    avatarPublicId: '',
  },
};

export const mockRegisterUser = {
  name: 'John',
  email: 'test1@test.com',
  lastName: 'Smith',
  location: 'alabama',
  password: '',
};

export const mockSearchParams: { searchParams: { [k: string]: string } } = {
  searchParams: {
    ['search']: '',
    ['jobStatus']: 'all',
    ['jobType']: 'all',
    ['sort']: 'newest',
  },
};

export const mockSearchParamsTest: { searchParams: { [k: string]: string } } = {
  searchParams: {
    ['search']: 'vp',
    ['jobStatus']: 'declined',
    ['jobType']: 'part-time',
    ['sort']: 'newest',
  },
};

export const mockJobsResponse = {
  totalJobs: 15,
  numOfPages: 2,
  currentPage: 1,
  jobs: [
    {
      _id: '68a0a8d08b1e93e7ab070004',
      company: 'Voonder',
      position: 'VP Marketing',
      jobStatus: 'declined',
      jobType: 'part-time',
      jobLocation: 'Ołpiny',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-07-31T18:53:06.000Z',
      updatedAt: '2025-07-31T18:53:06.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab070001',
      company: 'Thoughtmix',
      position: 'Database Administrator IV',
      jobStatus: 'pending',
      jobType: 'part-time',
      jobLocation: 'Hodošan',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-06-23T00:50:26.000Z',
      updatedAt: '2025-06-23T00:50:26.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab07000b',
      company: 'Oyonder',
      position: 'Systems Administrator IV',
      jobStatus: 'pending',
      jobType: 'part-time',
      jobLocation: 'Mvomero',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-06-22T05:20:15.000Z',
      updatedAt: '2025-06-22T05:20:15.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab070002',
      company: 'Zoonoodle',
      position: 'Administrative Assistant I',
      jobStatus: 'declined',
      jobType: 'part-time',
      jobLocation: 'Chełm',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-05-16T03:44:24.000Z',
      updatedAt: '2025-05-16T03:44:24.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab07000e',
      company: 'Ainyx',
      position: 'Director of Sales',
      jobStatus: 'pending',
      jobType: 'internship',
      jobLocation: 'Karangpao',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-03-26T20:26:23.000Z',
      updatedAt: '2025-03-26T20:26:23.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab070003',
      company: 'Wikizz',
      position: 'Administrative Officer',
      jobStatus: 'pending',
      jobType: 'part-time',
      jobLocation: 'Volodymyr-Volyns’kyy',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-03-15T17:09:26.000Z',
      updatedAt: '2025-03-15T17:09:26.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab07000d',
      company: 'Ooba',
      position: 'Assistant Professor',
      jobStatus: 'pending',
      jobType: 'part-time',
      jobLocation: 'Pau',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-03-04T21:10:49.000Z',
      updatedAt: '2025-03-04T21:10:49.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab070006',
      company: 'Skinte',
      position: 'Programmer Analyst II',
      jobStatus: 'pending',
      jobType: 'internship',
      jobLocation: 'Kindu',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2025-02-13T10:29:56.000Z',
      updatedAt: '2025-02-13T10:29:56.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab070007',
      company: 'Digitube',
      position: 'Food Chemist',
      jobStatus: 'declined',
      jobType: 'part-time',
      jobLocation: 'Gonzalo',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2024-10-22T21:04:49.000Z',
      updatedAt: '2024-10-22T21:04:49.000Z',
      __v: 0,
    },
    {
      _id: '68a0a8d08b1e93e7ab070005',
      company: 'Fliptune',
      position: 'Software Test Engineer IV',
      jobStatus: 'declined',
      jobType: 'part-time',
      jobLocation: 'Mangochi',
      createdBy: '689b56e9ef5ee87ce80f2905',
      createdAt: '2024-10-18T18:56:06.000Z',
      updatedAt: '2024-10-18T18:56:06.000Z',
      __v: 0,
    },
  ],
};

export const mockEditJobResponse = {
  job: {
    _id: '68a0a8d08b1e93e7ab070004',
    company: 'Voonder',
    position: 'VP Marketing',
    jobStatus: 'declined',
    jobType: 'part-time',
    jobLocation: 'Ołpiny',
    createdBy: '689b56e9ef5ee87ce80f2905',
    createdAt: '2025-07-31T18:53:06.000Z',
    updatedAt: '2025-07-31T18:53:06.000Z',
    __v: 0,
  },
};

export const mockAdminResponse = { users: 2, jobs: 124 };

export const mockStatsResponse = {
  defaultStats: {
    pending: 27,
    interview: 42,
    declined: 41,
  },
  monthlyApplications: [
    {
      date: 'Mar 23',
      count: 6,
    },
    {
      date: 'Apr 23',
      count: 11,
    },
    {
      date: 'May 23',
      count: 9,
    },
    {
      date: 'Jun 23',
      count: 8,
    },
    {
      date: 'Jul 23',
      count: 2,
    },
    {
      date: 'Sep 25',
      count: 11,
    },
  ],
};

export const mockEditJobParams = { id: '68a0a8d08b1e93e7ab070004' };
export const mockIdParams = { id: '' };
