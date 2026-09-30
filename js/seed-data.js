/**
 * SALES CRM - SEED DATA MODULE (STUDENT JOB SEEKER EDITION)
 * Real-world student candidate database for education, placement, and job training CRM
 */

const SeedData = {
  // Stage Definitions
  STAGES: [
    'Cold Calling',
    'New Lead',
    'Contacted',
    'Interested',
    'Prospect',
    'Follow-up',
    'Negotiation',
    'Converted',
    'Not Interested',
    'Lost'
  ],

  // Lead Sources for Students
  SOURCES: [
    'Cold Calling / Raw Database',
    'Excel / CSV Upload',
    'Job Portal / Naukri',
    'College Placement Cell',
    'LinkedIn',
    'Walk-in / Campus Drive',
    'Website Inquiry',
    'Referral',
    'Social Media / Instagram'
  ],

  // Initial Users (Counselors, Managers, Placement Reps)
  getUsers() {
    return [
      {
        id: 'USR-001',
        name: 'Alexander Wright',
        email: 'admin@crm.local',
        password: 'admin123',
        mobile: '9820011223',
        role: 'admin',
        managerId: null,
        managerName: null,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-01T09:00:00.000Z'
      },
      {
        id: 'USR-002',
        name: 'Sarah Jenkins',
        email: 'admin2@crm.local',
        password: 'admin123',
        mobile: '9820022334',
        role: 'admin',
        managerId: null,
        managerName: null,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-01T09:00:00.000Z'
      },
      // 3 Counseling Managers
      {
        id: 'USR-M01',
        name: 'Rajesh Sharma',
        email: 'manager@crm.local',
        password: 'manager123',
        mobile: '9820033445',
        role: 'manager',
        managerId: null,
        managerName: null,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-05T10:00:00.000Z'
      },
      {
        id: 'USR-M02',
        name: 'Priya Patel',
        email: 'priya.manager@crm.local',
        password: 'manager123',
        mobile: '9820044556',
        role: 'manager',
        managerId: null,
        managerName: null,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-06T10:00:00.000Z'
      },
      {
        id: 'USR-M03',
        name: 'Amit Verma',
        email: 'amit.manager@crm.local',
        password: 'manager123',
        mobile: '9820055667',
        role: 'manager',
        managerId: null,
        managerName: null,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-07T10:00:00.000Z'
      },
      // 6 Placement Counselors / Sales Reps
      {
        id: 'USR-S01',
        name: 'Arun Kumar',
        email: 'sales@crm.local',
        password: 'sales123',
        mobile: '9820066778',
        role: 'sales',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-10T11:00:00.000Z'
      },
      {
        id: 'USR-S02',
        name: 'Sneha Rao',
        email: 'sneha@crm.local',
        password: 'sales123',
        mobile: '9820077889',
        role: 'sales',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-10T11:00:00.000Z'
      },
      {
        id: 'USR-S03',
        name: 'Vikram Singh',
        email: 'vikram@crm.local',
        password: 'sales123',
        mobile: '9820088990',
        role: 'sales',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-11T11:00:00.000Z'
      },
      {
        id: 'USR-S04',
        name: 'Neha Gupta',
        email: 'neha@crm.local',
        password: 'sales123',
        mobile: '9820099001',
        role: 'sales',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-11T11:00:00.000Z'
      },
      {
        id: 'USR-S05',
        name: 'Rahul Mehta',
        email: 'rahul@crm.local',
        password: 'sales123',
        mobile: '9820012345',
        role: 'sales',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-12T11:00:00.000Z'
      },
      {
        id: 'USR-S06',
        name: 'Pooja Joshi',
        email: 'pooja@crm.local',
        password: 'sales123',
        mobile: '9820023456',
        role: 'sales',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        createdAt: '2026-08-12T11:00:00.000Z'
      }
    ];
  },

  // Real Student Job Seekers
  getCustomers() {
    const rawStudents = [
      {
        id: 'CRM-STU-000001',
        name: 'Aditya Deshmukh',
        mobile: '9821100001',
        altMobile: '9821100002',
        email: 'aditya.deshmukh@gmail.com',
        qualification: 'B.Tech (Computer Science)',
        college: 'VJTI Mumbai',
        passingYear: '2025',
        skills: 'Java, Spring Boot, MySQL, REST APIs',
        targetRole: 'Software Engineer (Backend)',
        experienceLevel: 'Fresher',
        address: 'Dadar West, Shivaji Park',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'Job Portal / Naukri',
        stage: 'Interested',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-09-10T10:15:00.000Z',
        updatedAt: '2026-09-28T14:30:00.000Z',
        lastContacted: '2026-09-28T14:30:00.000Z',
        nextFollowUp: '2026-09-30T16:00:00.000Z',
        notes: 'Actively searching for backend developer roles in Pune/Mumbai. Looking for placement guaranteed program.'
      },
      {
        id: 'CRM-STU-000002',
        name: 'Nandita Iyer',
        mobile: '9821100003',
        altMobile: '',
        email: 'nandita.iyer@outlook.com',
        qualification: 'BCA (Computer Applications)',
        college: 'Christ University, Bengaluru',
        passingYear: '2024',
        skills: 'React.js, JavaScript, HTML5/CSS3, Tailwind',
        targetRole: 'Frontend Developer',
        experienceLevel: '0-1 Year',
        address: 'BTM Layout, 2nd Stage',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Negotiation',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-09-05T09:00:00.000Z',
        updatedAt: '2026-09-29T11:20:00.000Z',
        lastContacted: '2026-09-29T11:20:00.000Z',
        nextFollowUp: '2026-09-30T17:30:00.000Z',
        notes: 'Reviewing job assistance enrollment fee and interview guarantee terms.'
      },
      {
        id: 'CRM-STU-000003',
        name: 'Harish Nambiar',
        mobile: '9821100004',
        altMobile: '9821100005',
        email: 'harish.nambiar@gmail.com',
        qualification: 'B.Tech (Information Technology)',
        college: 'College of Engineering, Guindy',
        passingYear: '2024',
        skills: 'Python, Django, AWS, Docker',
        targetRole: 'Full Stack Python Developer',
        experienceLevel: 'Fresher',
        address: 'Adyar, Gandhi Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        source: 'Referral',
        stage: 'Converted',
        status: 'Converted',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-08-20T11:00:00.000Z',
        updatedAt: '2026-09-25T16:00:00.000Z',
        lastContacted: '2026-09-25T16:00:00.000Z',
        nextFollowUp: null,
        notes: 'Enrolled in Premium Career Placement Track. Cleared first client round.'
      },
      {
        id: 'CRM-STU-000004',
        name: 'Kunal Aggarwal',
        mobile: '9821100006',
        altMobile: '',
        email: 'kunal.aggarwal@yahoo.com',
        qualification: 'B.Com (Honours)',
        college: 'Delhi University (SRCC)',
        passingYear: '2025',
        skills: 'Lead Generation, B2B Sales, CRM, Cold Calling',
        targetRole: 'Business Development Trainee',
        experienceLevel: 'Fresher',
        address: 'Sector 15',
        city: 'Gurugram',
        state: 'Haryana',
        country: 'India',
        source: 'College Placement Cell',
        stage: 'Contacted',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        createdAt: '2026-09-22T14:00:00.000Z',
        updatedAt: '2026-09-24T10:00:00.000Z',
        lastContacted: '2026-09-24T10:00:00.000Z',
        nextFollowUp: '2026-09-30T15:00:00.000Z',
        notes: 'Interested in fintech corporate sales roles. Needs mock interview coaching.'
      },
      {
        id: 'CRM-STU-000005',
        name: 'Deepak Chawla',
        mobile: '9821100007',
        altMobile: '9821100008',
        email: 'deepak.chawla@gmail.com',
        qualification: 'MCA (Computer Applications)',
        college: 'NIT Trichy',
        passingYear: '2024',
        skills: 'SQL, Python, Power BI, Tableau, Excel',
        targetRole: 'Data Analyst',
        experienceLevel: '0-1 Year',
        address: 'Koramangala, 4th Block',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        source: 'Website Inquiry',
        stage: 'Prospect',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        createdAt: '2026-09-15T09:30:00.000Z',
        updatedAt: '2026-09-26T17:00:00.000Z',
        lastContacted: '2026-09-26T17:00:00.000Z',
        nextFollowUp: '2026-10-02T11:00:00.000Z',
        notes: 'Submitted resume and portfolio dashboard. Scheduled interview screening call.'
      },
      {
        id: 'CRM-STU-000006',
        name: 'Anand Bajpayee',
        mobile: '9821100009',
        altMobile: '',
        email: 'anand.bajpayee@gmail.com',
        qualification: 'B.Sc (Data Science)',
        college: 'Loyola College, Chennai',
        passingYear: '2025',
        skills: 'Machine Learning, Pandas, NumPy, Python',
        targetRole: 'Junior AI/ML Engineer',
        experienceLevel: 'Fresher',
        address: 'Indirapuram',
        city: 'Ghaziabad',
        state: 'Uttar Pradesh',
        country: 'India',
        source: 'Job Portal / Naukri',
        stage: 'New Lead',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-09-29T16:00:00.000Z',
        updatedAt: '2026-09-29T16:00:00.000Z',
        lastContacted: null,
        nextFollowUp: '2026-09-30T14:00:00.000Z',
        notes: 'Registered online via job alert page. Verification call pending.'
      },
      {
        id: 'CRM-STU-000007',
        name: 'Meera Kapoor',
        mobile: '9821100010',
        altMobile: '',
        email: 'meera.kapoor@gmail.com',
        qualification: 'B.Tech (Electronics & Comm)',
        college: 'Thapar Institute, Patiala',
        passingYear: '2024',
        skills: 'Manual Testing, Selenium, Java, JIRA, Postman',
        targetRole: 'QA Test Engineer',
        experienceLevel: 'Fresher',
        address: 'Hauz Khas',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        source: 'Walk-in / Campus Drive',
        stage: 'Follow-up',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        createdAt: '2026-09-12T12:00:00.000Z',
        updatedAt: '2026-09-27T10:00:00.000Z',
        lastContacted: '2026-09-27T10:00:00.000Z',
        nextFollowUp: '2026-09-28T10:00:00.000Z',
        notes: 'Follow-up on automation testing certification requirement before sending to client.'
      },
      {
        id: 'CRM-STU-000008',
        name: 'Ramanathan G.',
        mobile: '9821100011',
        altMobile: '',
        email: 'ramanathan.g@gmail.com',
        qualification: 'B.Tech (Mechanical)',
        college: 'PSG College of Technology, Coimbatore',
        passingYear: '2023',
        skills: 'AutoCAD, SolidWorks, Catia',
        targetRole: 'CAD Design Engineer',
        experienceLevel: '1-2 Years',
        address: 'Peelamedu',
        city: 'Coimbatore',
        state: 'Tamil Nadu',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Not Interested',
        status: 'Not Interested',
        priority: 'Low',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-09-01T10:00:00.000Z',
        updatedAt: '2026-09-18T15:00:00.000Z',
        lastContacted: '2026-09-18T15:00:00.000Z',
        nextFollowUp: null,
        notes: 'Decided to pursue Master of Science in Germany.'
      },
      {
        id: 'CRM-STU-000009',
        name: 'Saurabh Sinha',
        mobile: '9821100012',
        altMobile: '9821100013',
        email: 'saurabh.sinha@hotmail.com',
        qualification: 'MBA (Marketing)',
        college: 'Symbiosis Pune',
        passingYear: '2024',
        skills: 'Digital Marketing, SEO, Google Ads, Content Strategy',
        targetRole: 'Growth Marketing Associate',
        experienceLevel: 'Fresher',
        address: 'Viman Nagar',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        source: 'Referral',
        stage: 'Lost',
        status: 'Lost',
        priority: 'Medium',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        createdAt: '2026-08-15T11:00:00.000Z',
        updatedAt: '2026-09-10T16:00:00.000Z',
        lastContacted: '2026-09-10T16:00:00.000Z',
        nextFollowUp: null,
        notes: 'Got placed through off-campus family contact.'
      },
      // Team 2 (Priya Patel with Vikram Singh & Neha Gupta)
      {
        id: 'CRM-STU-000010',
        name: 'Kavita Menon',
        mobile: '9821100014',
        altMobile: '',
        email: 'kavita.menon@gmail.com',
        qualification: 'B.Tech (Computer Science)',
        college: 'CUSAT Kochi',
        passingYear: '2025',
        skills: 'Node.js, Express, MongoDB, TypeScript',
        targetRole: 'Backend Node.js Developer',
        experienceLevel: 'Fresher',
        address: 'Kaloor',
        city: 'Kochi',
        state: 'Kerala',
        country: 'India',
        source: 'Website Inquiry',
        stage: 'Interested',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S03',
        salespersonName: 'Vikram Singh',
        createdAt: '2026-09-14T09:00:00.000Z',
        updatedAt: '2026-09-28T12:00:00.000Z',
        lastContacted: '2026-09-28T12:00:00.000Z',
        nextFollowUp: '2026-10-01T14:30:00.000Z',
        notes: 'High coding aptitude score (94/100). Looking for fast-track product startup opportunities.'
      },
      {
        id: 'CRM-STU-000011',
        name: 'Varun Grover',
        mobile: '9821100015',
        altMobile: '',
        email: 'varun.grover@gmail.com',
        qualification: 'BCA (Honours)',
        college: 'Panjab University, Chandigarh',
        passingYear: '2024',
        skills: 'Flutter, Dart, Firebase, Android Studio',
        targetRole: 'Mobile App Developer (Flutter)',
        experienceLevel: '0-1 Year',
        address: 'Sector 35',
        city: 'Chandigarh',
        state: 'Punjab',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Prospect',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S03',
        salespersonName: 'Vikram Singh',
        createdAt: '2026-09-08T10:00:00.000Z',
        updatedAt: '2026-09-27T16:00:00.000Z',
        lastContacted: '2026-09-27T16:00:00.000Z',
        nextFollowUp: '2026-10-03T11:00:00.000Z',
        notes: 'Built 2 live apps on Play Store. Ready for direct technical round.'
      },
      {
        id: 'CRM-STU-000012',
        name: 'Rakesh Khurana',
        mobile: '9821100016',
        altMobile: '9821100017',
        email: 'rakesh.khurana@gmail.com',
        qualification: 'B.Tech (Civil Engineering)',
        college: 'MNIT Jaipur',
        passingYear: '2024',
        skills: 'AutoCAD Civil, Revit, Estimation, Site Supervision',
        targetRole: 'Junior Site Engineer',
        experienceLevel: 'Fresher',
        address: 'Malviya Nagar',
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'India',
        source: 'Referral',
        stage: 'Contacted',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S04',
        salespersonName: 'Neha Gupta',
        createdAt: '2026-09-20T11:30:00.000Z',
        updatedAt: '2026-09-25T14:00:00.000Z',
        lastContacted: '2026-09-25T14:00:00.000Z',
        nextFollowUp: '2026-09-30T11:30:00.000Z',
        notes: 'Prefers infrastructure construction firms in NCR or Mumbai.'
      },
      {
        id: 'CRM-STU-000013',
        name: 'Sunil Mathur',
        mobile: '9821100018',
        altMobile: '',
        email: 'sunil.mathur@gmail.com',
        qualification: 'B.Sc (Computer Science)',
        college: 'St. Xaviers College, Mumbai',
        passingYear: '2024',
        skills: 'HTML, CSS, JavaScript, WordPress, PHP',
        targetRole: 'Web Developer',
        experienceLevel: 'Fresher',
        address: 'Borivali West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'Social Media / Instagram',
        stage: 'Converted',
        status: 'Converted',
        priority: 'High',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S04',
        salespersonName: 'Neha Gupta',
        createdAt: '2026-08-28T14:00:00.000Z',
        updatedAt: '2026-09-22T17:00:00.000Z',
        lastContacted: '2026-09-22T17:00:00.000Z',
        nextFollowUp: null,
        notes: 'Placed at Digital Media Agency as Junior Web Developer (₹4.2 LPA).'
      },
      {
        id: 'CRM-STU-000014',
        name: 'Vipin Saxena',
        mobile: '9821100019',
        altMobile: '',
        email: 'vipin.saxena@gmail.com',
        qualification: 'B.Tech (Electrical)',
        college: 'AKTU Lucknow',
        passingYear: '2025',
        skills: 'PLC/SCADA, Circuit Design, MATLAB',
        targetRole: 'Electrical Trainee Engineer',
        experienceLevel: 'Fresher',
        address: 'Gomti Nagar',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        country: 'India',
        source: 'Job Portal / Naukri',
        stage: 'New Lead',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S03',
        salespersonName: 'Vikram Singh',
        createdAt: '2026-09-29T10:00:00.000Z',
        updatedAt: '2026-09-29T10:00:00.000Z',
        lastContacted: null,
        nextFollowUp: '2026-10-01T10:00:00.000Z',
        notes: 'New graduate registered for automotive sector openings.'
      },
      {
        id: 'CRM-STU-000015',
        name: 'Sujata Bose',
        mobile: '9821100020',
        altMobile: '9821100021',
        email: 'sujata.bose@gmail.com',
        qualification: 'B.Pharmacy',
        college: 'Jadavpur University, Kolkata',
        passingYear: '2024',
        skills: 'Pharmacology, Clinical Trials, Regulatory Documentation',
        targetRole: 'Clinical Research Associate',
        experienceLevel: 'Fresher',
        address: 'Salt Lake City, Sector 2',
        city: 'Kolkata',
        state: 'West Bengal',
        country: 'India',
        source: 'Website Inquiry',
        stage: 'Follow-up',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S04',
        salespersonName: 'Neha Gupta',
        createdAt: '2026-09-18T15:00:00.000Z',
        updatedAt: '2026-09-28T16:00:00.000Z',
        lastContacted: '2026-09-28T16:00:00.000Z',
        nextFollowUp: '2026-09-29T14:00:00.000Z',
        notes: 'Scheduled for counseling regarding pharma MNC placement batch.'
      },
      // Team 3 (Amit Verma with Rahul Mehta & Pooja Joshi)
      {
        id: 'CRM-STU-000016',
        name: 'Tariq Siddiqui',
        mobile: '9821100022',
        altMobile: '',
        email: 'tariq.siddiqui@gmail.com',
        qualification: 'B.Tech (Cyber Security)',
        college: 'Amity University, Noida',
        passingYear: '2024',
        skills: 'Network Security, Ethical Hacking, CEH, Wireshark, Linux',
        targetRole: 'Junior Security Analyst / SOC',
        experienceLevel: '0-1 Year',
        address: 'Sector 62',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Negotiation',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S05',
        salespersonName: 'Rahul Mehta',
        createdAt: '2026-09-02T10:00:00.000Z',
        updatedAt: '2026-09-29T15:30:00.000Z',
        lastContacted: '2026-09-29T15:30:00.000Z',
        nextFollowUp: '2026-09-30T18:00:00.000Z',
        notes: 'Shortlisted by 2 cyber security audit consultancies. Final salary negotiation.'
      },
      {
        id: 'CRM-STU-000017',
        name: 'Devendra Pandey',
        mobile: '9821100023',
        altMobile: '',
        email: 'devendra.p@gmail.com',
        qualification: 'BBA (Operations)',
        college: 'Symbiosis Centre for Management Studies',
        passingYear: '2025',
        skills: 'Supply Chain, Vendor Management, ERP Logistics',
        targetRole: 'Logistics Operations Trainee',
        experienceLevel: 'Fresher',
        address: 'Kothrud',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        source: 'Website Inquiry',
        stage: 'Interested',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S05',
        salespersonName: 'Rahul Mehta',
        createdAt: '2026-09-17T11:00:00.000Z',
        updatedAt: '2026-09-26T14:00:00.000Z',
        lastContacted: '2026-09-26T14:00:00.000Z',
        nextFollowUp: '2026-10-04T12:00:00.000Z',
        notes: 'Wants to join e-commerce fulfillment operations in Pune or Mumbai.'
      },
      {
        id: 'CRM-STU-000018',
        name: 'Alok Srivastava',
        mobile: '9821100024',
        altMobile: '9821100025',
        email: 'alok.sri@gmail.com',
        qualification: 'B.Tech (CS)',
        college: 'BMS College of Engineering, Bengaluru',
        passingYear: '2024',
        skills: 'React Native, Redux, iOS/Android, REST APIs',
        targetRole: 'React Native Mobile Developer',
        experienceLevel: 'Fresher',
        address: 'Basavanagudi',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        source: 'College Placement Cell',
        stage: 'Contacted',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S06',
        salespersonName: 'Pooja Joshi',
        createdAt: '2026-09-21T14:30:00.000Z',
        updatedAt: '2026-09-24T16:00:00.000Z',
        lastContacted: '2026-09-24T16:00:00.000Z',
        nextFollowUp: '2026-09-30T12:00:00.000Z',
        notes: 'Shared GitHub repository with 4 mobile projects. Impressive code quality.'
      },
      {
        id: 'CRM-STU-000019',
        name: 'Shalini Nair',
        mobile: '9821100026',
        altMobile: '',
        email: 'shalini.nair@gmail.com',
        qualification: 'B.Com (Finance)',
        college: 'Narsee Monjee College, Mumbai',
        passingYear: '2024',
        skills: 'Financial Modeling, Excel Macros, Tally Prime, GST',
        targetRole: 'Junior Financial Analyst',
        experienceLevel: 'Fresher',
        address: 'Vile Parle West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'Walk-in / Campus Drive',
        stage: 'Converted',
        status: 'Converted',
        priority: 'High',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S06',
        salespersonName: 'Pooja Joshi',
        createdAt: '2026-08-10T10:00:00.000Z',
        updatedAt: '2026-09-15T12:00:00.000Z',
        lastContacted: '2026-09-15T12:00:00.000Z',
        nextFollowUp: null,
        notes: 'Successfully placed at Investment Advisory firm (₹4.8 LPA).'
      },
      {
        id: 'CRM-STU-000020',
        name: 'Prateek Jain',
        mobile: '9821100027',
        altMobile: '',
        email: 'prateek.jain@gmail.com',
        qualification: 'B.Tech (Chemical Engineering)',
        college: 'ICT Mumbai',
        passingYear: '2025',
        skills: 'Process Engineering, Aspen Plus, Safety Audits',
        targetRole: 'Graduate Trainee Engineer',
        experienceLevel: 'Fresher',
        address: 'Matunga',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'Job Portal / Naukri',
        stage: 'New Lead',
        status: 'Active',
        priority: 'Low',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S05',
        salespersonName: 'Rahul Mehta',
        createdAt: '2026-09-29T11:00:00.000Z',
        updatedAt: '2026-09-29T11:00:00.000Z',
        lastContacted: null,
        nextFollowUp: '2026-10-02T15:00:00.000Z',
        notes: 'Inquiry received regarding campus placement drives in Gujarat industrial zone.'
      },
      // Additional Diverse Student Job Seekers (21 - 32)
      {
        id: 'CRM-STU-000021',
        name: 'Gautam Singhania',
        mobile: '9821100028',
        altMobile: '9821100029',
        email: 'gautam.singh@gmail.com',
        qualification: 'B.Tech (Computer Science)',
        college: 'IIT Roorkee',
        passingYear: '2024',
        skills: 'C++, DSA, System Design, Golang',
        targetRole: 'Systems Software Engineer',
        experienceLevel: '0-1 Year',
        address: 'Civil Lines',
        city: 'Roorkee',
        state: 'Uttarakhand',
        country: 'India',
        source: 'Referral',
        stage: 'Prospect',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-09-11T14:00:00.000Z',
        updatedAt: '2026-09-28T17:00:00.000Z',
        lastContacted: '2026-09-28T17:00:00.000Z',
        nextFollowUp: '2026-10-01T11:00:00.000Z',
        notes: 'Top tier competitive programmer (Codeforces Candidate Master). Looking for high packages.'
      },
      {
        id: 'CRM-STU-000022',
        name: 'Chandrika Sen',
        mobile: '9821100030',
        altMobile: '',
        email: 'chandrika.sen@gmail.com',
        qualification: 'B.Des (UI/UX Design)',
        college: 'NID Ahmedabad',
        passingYear: '2024',
        skills: 'Figma, Wireframing, User Research, Prototyping',
        targetRole: 'Product Designer / UI-UX',
        experienceLevel: 'Fresher',
        address: 'Paldi',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Interested',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        createdAt: '2026-09-19T10:00:00.000Z',
        updatedAt: '2026-09-26T15:00:00.000Z',
        lastContacted: '2026-09-26T15:00:00.000Z',
        nextFollowUp: '2026-09-30T16:30:00.000Z',
        notes: 'Outstanding Behance portfolio. Wants edtech or SaaS consumer apps.'
      },
      {
        id: 'CRM-STU-000023',
        name: 'Bhaskar Rao',
        mobile: '9821100031',
        altMobile: '',
        email: 'bhaskar.rao@gmail.com',
        qualification: 'B.Sc (Statistics)',
        college: 'St. Josephs University, Bengaluru',
        passingYear: '2025',
        skills: 'R, Python, Statistical Modeling, Excel',
        targetRole: 'Junior Business Analyst',
        experienceLevel: 'Fresher',
        address: 'Jayanagar, 4th Block',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        source: 'Job Portal / Naukri',
        stage: 'Follow-up',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S03',
        salespersonName: 'Vikram Singh',
        createdAt: '2026-09-04T12:00:00.000Z',
        updatedAt: '2026-09-27T11:00:00.000Z',
        lastContacted: '2026-09-27T11:00:00.000Z',
        nextFollowUp: '2026-09-30T10:30:00.000Z',
        notes: 'Counseling call to prepare for upcoming campus interview round.'
      },
      {
        id: 'CRM-STU-000024',
        name: 'Manoj Tiwari',
        mobile: '9821100032',
        altMobile: '',
        email: 'manoj.tiwari@gmail.com',
        qualification: 'Diploma (Automobile Engineering)',
        college: 'Government Polytechnic Pune',
        passingYear: '2023',
        skills: 'Vehicle Maintenance, Diagnostics, Testing',
        targetRole: 'Automotive Service Advisor',
        experienceLevel: '1-2 Years',
        address: 'Shivajinagar',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        source: 'Walk-in / Campus Drive',
        stage: 'Not Interested',
        status: 'Not Interested',
        priority: 'Low',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S04',
        salespersonName: 'Neha Gupta',
        createdAt: '2026-09-12T10:00:00.000Z',
        updatedAt: '2026-09-20T12:00:00.000Z',
        lastContacted: '2026-09-20T12:00:00.000Z',
        nextFollowUp: null,
        notes: 'Joined family dealership business.'
      },
      {
        id: 'CRM-STU-000025',
        name: 'Ankita Roy',
        mobile: '9821100033',
        altMobile: '9821100034',
        email: 'ankita.roy@gmail.com',
        qualification: 'B.Tech (IT)',
        college: 'Heritage Institute of Technology, Kolkata',
        passingYear: '2024',
        skills: 'Angular, Node.js, Express, MongoDB, Git',
        targetRole: 'Full Stack MEAN Developer',
        experienceLevel: 'Fresher',
        address: 'Anandapur',
        city: 'Kolkata',
        state: 'West Bengal',
        country: 'India',
        source: 'Website Inquiry',
        stage: 'Interested',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S05',
        salespersonName: 'Rahul Mehta',
        createdAt: '2026-09-16T15:00:00.000Z',
        updatedAt: '2026-09-28T16:30:00.000Z',
        lastContacted: '2026-09-28T16:30:00.000Z',
        nextFollowUp: '2026-10-01T15:00:00.000Z',
        notes: 'Interested in placement drives for IT consulting firms.'
      },
      {
        id: 'CRM-STU-000026',
        name: 'Suresh Raina',
        mobile: '9821100035',
        altMobile: '',
        email: 'suresh.raina@gmail.com',
        qualification: 'BBA (Human Resources)',
        college: 'IMS Ghaziabad',
        passingYear: '2025',
        skills: 'Talent Acquisition, Resume Screening, HR Operations',
        targetRole: 'HR Trainee / Recruiter',
        experienceLevel: 'Fresher',
        address: 'Raj Nagar',
        city: 'Ghaziabad',
        state: 'Uttar Pradesh',
        country: 'India',
        source: 'Social Media / Instagram',
        stage: 'Contacted',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S06',
        salespersonName: 'Pooja Joshi',
        createdAt: '2026-09-25T11:00:00.000Z',
        updatedAt: '2026-09-27T14:00:00.000Z',
        lastContacted: '2026-09-27T14:00:00.000Z',
        nextFollowUp: '2026-09-30T14:30:00.000Z',
        notes: 'Exploratory call completed. Shared upcoming drive details.'
      },
      {
        id: 'CRM-STU-000027',
        name: 'Farhan Akhtar',
        mobile: '9821100036',
        altMobile: '',
        email: 'farhan.akhtar@gmail.com',
        qualification: 'B.Tech (CS)',
        college: 'Jamia Millia Islamia, New Delhi',
        passingYear: '2024',
        skills: 'Cloud Computing, Azure, Kubernetes, Terraform',
        targetRole: 'Cloud / DevOps Associate',
        experienceLevel: 'Fresher',
        address: 'Okhla',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        source: 'Referral',
        stage: 'Converted',
        status: 'Converted',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-08-25T14:00:00.000Z',
        updatedAt: '2026-09-26T16:00:00.000Z',
        lastContacted: '2026-09-26T16:00:00.000Z',
        nextFollowUp: null,
        notes: 'Offer letter received from Cloud Tech Partner (₹6.5 LPA).'
      },
      {
        id: 'CRM-STU-000028',
        name: 'Tanvi Shah',
        mobile: '9821100037',
        altMobile: '9821100038',
        email: 'tanvi.shah@gmail.com',
        qualification: 'B.Sc (Animation & Multimedia)',
        college: 'Whistling Woods International, Mumbai',
        passingYear: '2024',
        skills: 'Blender, Maya, Video Editing, Premiere Pro, After Effects',
        targetRole: '3D Animator / Video Editor',
        experienceLevel: 'Fresher',
        address: 'Goregaon West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Prospect',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        createdAt: '2026-09-14T11:00:00.000Z',
        updatedAt: '2026-09-28T12:30:00.000Z',
        lastContacted: '2026-09-28T12:30:00.000Z',
        nextFollowUp: '2026-10-02T16:00:00.000Z',
        notes: 'Submitted showreel link. Client review in progress.'
      },
      {
        id: 'CRM-STU-000029',
        name: 'Nikhil Agarwal',
        mobile: '9821100039',
        altMobile: '',
        email: 'nikhil.agarwal@gmail.com',
        qualification: 'B.Tech (Mechatronics)',
        college: 'Manipal Institute of Technology',
        passingYear: '2025',
        skills: 'Robotics, ROS, C++, Embedded Systems',
        targetRole: 'Robotics Software Trainee',
        experienceLevel: 'Fresher',
        address: 'Tiger Circle',
        city: 'Manipal',
        state: 'Karnataka',
        country: 'India',
        source: 'Walk-in / Campus Drive',
        stage: 'New Lead',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S03',
        salespersonName: 'Vikram Singh',
        createdAt: '2026-09-30T09:30:00.000Z',
        updatedAt: '2026-09-30T09:30:00.000Z',
        lastContacted: null,
        nextFollowUp: '2026-10-01T16:00:00.000Z',
        notes: 'Campus drive candidate seeking robotics startup roles in Bengaluru.'
      },
      {
        id: 'CRM-STU-000030',
        name: 'Bhavna Kulkarni',
        mobile: '9821100040',
        altMobile: '',
        email: 'bhavna.kulkarni@gmail.com',
        qualification: 'MBA (Business Analytics)',
        college: 'Welingkar Institute, Mumbai',
        passingYear: '2024',
        skills: 'Business Intelligence, Power BI, SQL, Python',
        targetRole: 'Associate Business Consultant',
        experienceLevel: 'Fresher',
        address: 'Matunga East',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'College Placement Cell',
        stage: 'Interested',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S04',
        salespersonName: 'Neha Gupta',
        createdAt: '2026-09-17T14:00:00.000Z',
        updatedAt: '2026-09-29T10:00:00.000Z',
        lastContacted: '2026-09-29T10:00:00.000Z',
        nextFollowUp: '2026-10-03T14:00:00.000Z',
        notes: 'Wants guidance on consulting case interviews.'
      },
      {
        id: 'CRM-STU-000031',
        name: 'Karthik Raja',
        mobile: '9821100041',
        altMobile: '',
        email: 'karthik.raja@gmail.com',
        qualification: 'B.Tech (Civil)',
        college: 'SRM Institute, Chennai',
        passingYear: '2023',
        skills: 'Surveying, GIS, AutoCAD',
        targetRole: 'Survey Engineer',
        experienceLevel: '1-2 Years',
        address: 'Kattankulathur',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        source: 'Job Portal / Naukri',
        stage: 'Lost',
        status: 'Lost',
        priority: 'Low',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S05',
        salespersonName: 'Rahul Mehta',
        createdAt: '2026-08-30T10:00:00.000Z',
        updatedAt: '2026-09-14T11:00:00.000Z',
        lastContacted: '2026-09-14T11:00:00.000Z',
        nextFollowUp: null,
        notes: 'Opted for government exam preparation.'
      },
      {
        id: 'CRM-STU-000032',
        name: 'Preeti Deshmukh',
        mobile: '9821100042',
        altMobile: '9821100043',
        email: 'preeti.deshmukh@gmail.com',
        qualification: 'MCA (Computer Applications)',
        college: 'COEP Technological University, Pune',
        passingYear: '2024',
        skills: 'Java, Spring Boot, Microservices, Angular',
        targetRole: 'Full Stack Java Developer',
        experienceLevel: 'Fresher',
        address: 'Aundh',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        source: 'Job Portal / Naukri',
        stage: 'Follow-up',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M03',
        managerName: 'Amit Verma',
        salespersonId: 'USR-S06',
        salespersonName: 'Pooja Joshi',
        createdAt: '2026-09-19T13:00:00.000Z',
        updatedAt: '2026-09-28T15:00:00.000Z',
        lastContacted: '2026-09-28T15:00:00.000Z',
        nextFollowUp: '2026-09-30T15:30:00.000Z',
        notes: 'Scheduled for technical assessment test with hiring partner.'
      },
      {
        id: 'CRM-STU-000033',
        name: 'Kunal Joshi',
        mobile: '9821100051',
        altMobile: '',
        email: 'kunal.joshi@gmail.com',
        qualification: 'B.Tech (CSE)',
        college: 'VJTI Mumbai',
        passingYear: '2025',
        skills: 'Java, Spring Boot, MySQL, REST APIs',
        targetRole: 'Software Engineer',
        experienceLevel: 'Fresher',
        address: 'Matunga',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'Cold Calling / Raw Database',
        stage: 'Cold Calling',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        createdAt: '2026-09-30T08:00:00.000Z',
        updatedAt: '2026-09-30T08:00:00.000Z',
        lastContacted: null,
        nextFollowUp: null,
        notes: 'Raw uncalled student from campus placement database list. Ready for first outreach.'
      },
      {
        id: 'CRM-STU-000034',
        name: 'Aishwarya Patil',
        mobile: '9821100052',
        altMobile: '',
        email: 'aishwarya.p@gmail.com',
        qualification: 'BCA',
        college: 'Christ University, Bengaluru',
        passingYear: '2025',
        skills: 'Python, Django, PostgreSQL, HTML/CSS',
        targetRole: 'Full Stack Developer',
        experienceLevel: 'Fresher',
        address: 'Koramangala',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        source: 'Cold Calling / Raw Database',
        stage: 'Cold Calling',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M01',
        managerName: 'Rajesh Sharma',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        createdAt: '2026-09-30T08:30:00.000Z',
        updatedAt: '2026-09-30T08:30:00.000Z',
        lastContacted: null,
        nextFollowUp: null,
        notes: 'Needs initial counseling call on Python Full Stack placement track.'
      },
      {
        id: 'CRM-STU-000035',
        name: 'Rohit Kulkarni',
        mobile: '9821100053',
        altMobile: '',
        email: 'rohit.kulkarni@gmail.com',
        qualification: 'MCA',
        college: 'Pune University',
        passingYear: '2024',
        skills: 'Data Analysis, SQL, Tableau, Python',
        targetRole: 'Data Analyst',
        experienceLevel: '0-1 Year',
        address: 'Shivaji Nagar',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        source: 'Cold Calling / Raw Database',
        stage: 'Cold Calling',
        status: 'Active',
        priority: 'High',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S03',
        salespersonName: 'Vikram Singh',
        createdAt: '2026-09-30T09:00:00.000Z',
        updatedAt: '2026-09-30T09:00:00.000Z',
        lastContacted: null,
        nextFollowUp: null,
        notes: 'Raw candidate list from job portal export. Not dialed yet.'
      },
      {
        id: 'CRM-STU-000036',
        name: 'Sneha Nair',
        mobile: '9821100054',
        altMobile: '',
        email: 'sneha.nair@outlook.com',
        qualification: 'B.E (Information Tech)',
        college: 'Anna University, Chennai',
        passingYear: '2025',
        skills: 'React, JavaScript, CSS3, Redux, Node.js',
        targetRole: 'Frontend Engineer',
        experienceLevel: 'Fresher',
        address: 'Adyar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        source: 'Cold Calling / Raw Database',
        stage: 'Cold Calling',
        status: 'Active',
        priority: 'Medium',
        managerId: 'USR-M02',
        managerName: 'Priya Patel',
        salespersonId: 'USR-S04',
        salespersonName: 'Neha Gupta',
        createdAt: '2026-09-30T09:15:00.000Z',
        updatedAt: '2026-09-30T09:15:00.000Z',
        lastContacted: null,
        nextFollowUp: null,
        notes: 'Uncontacted raw candidate from Anna University campus drive database.'
      }
    ];
    return rawStudents.map((s, idx) => this.enrichStudentWithFee(s, idx));
  },

  /**
   * Assign customized placement fee structures, installment milestones, and payment plans
   */
  enrichStudentWithFee(student, index) {
    const stage = (student.stage || '').toLowerCase();
    
    // Fee differs per student based on specialization track:
    let fee = 45000;
    const role = (student.targetRole || '').toLowerCase();
    if (role.includes('senior') || role.includes('full stack') || role.includes('devops') || role.includes('cloud')) {
      fee = 60000;
    } else if (role.includes('data') || role.includes('ai') || role.includes('ml') || role.includes('embedded')) {
      fee = 55000;
    } else if (role.includes('frontend') || role.includes('ui')) {
      fee = 40000;
    } else if (role.includes('qa') || role.includes('test')) {
      fee = 35000;
    } else if (role.includes('cyber') || role.includes('security')) {
      fee = 65000;
    }

    let plan = '2 Installments';
    let paid = 0;
    let status = 'Pending';
    let installments = [];

    const today = new Date();
    const fmt = d => d.toISOString().split('T')[0];
    const addDays = (d, n) => {
      const copy = new Date(d);
      copy.setDate(copy.getDate() + n);
      return fmt(copy);
    };

    if (stage === 'converted' || stage.includes('placed')) {
      // 100% Collected (Placement Complete)
      plan = (index % 2 === 0) ? 'Full Upfront' : '2 Installments';
      paid = fee;
      status = 'Fully Paid';
      if (plan === 'Full Upfront') {
        installments = [
          {
            id: 'INST-1',
            title: 'Full Placement Fee (Upfront)',
            amount: fee,
            dueDate: addDays(today, -25),
            paidAmount: fee,
            paidDate: addDays(today, -25),
            status: 'Paid',
            paymentMode: 'UPI / Online',
            transactionRef: `TXN-UPF-${student.id.replace('CRM-STU-', '')}`
          }
        ];
      } else {
        const p1 = Math.round(fee * 0.5);
        const p2 = fee - p1;
        installments = [
          {
            id: 'INST-1',
            title: 'Installment 1: Enrollment & Training Access',
            amount: p1,
            dueDate: addDays(today, -30),
            paidAmount: p1,
            paidDate: addDays(today, -30),
            status: 'Paid',
            paymentMode: 'UPI / Online',
            transactionRef: `TXN-P1-${student.id.replace('CRM-STU-', '')}`
          },
          {
            id: 'INST-2',
            title: 'Installment 2: Offer Letter & Joining Release',
            amount: p2,
            dueDate: addDays(today, -5),
            paidAmount: p2,
            paidDate: addDays(today, -5),
            status: 'Paid',
            paymentMode: 'Net Banking',
            transactionRef: `TXN-P2-${student.id.replace('CRM-STU-', '')}`
          }
        ];
      }
    } else if (['interested', 'prospect', 'follow-up', 'negotiation'].includes(stage)) {
      // Partially Paid: candidate is enrolled/in counseling, paid initial registration/installment 1
      plan = (index % 3 === 0) ? '3 Installments' : '2 Installments';
      if (plan === '3 Installments') {
        const p1 = Math.round(fee * 0.4);
        const p2 = Math.round(fee * 0.3);
        const p3 = fee - p1 - p2;
        const secondPaid = (index % 2 === 0);
        paid = secondPaid ? (p1 + p2) : p1;
        status = 'Partially Paid';
        const isInst2Overdue = !secondPaid && (index % 3 === 1);
        installments = [
          {
            id: 'INST-1',
            title: 'Installment 1: Registration & Onboarding',
            amount: p1,
            dueDate: addDays(today, -20),
            paidAmount: p1,
            paidDate: addDays(today, -20),
            status: 'Paid',
            paymentMode: 'UPI / Online',
            transactionRef: `TXN-P1-${student.id.replace('CRM-STU-', '')}`
          },
          {
            id: 'INST-2',
            title: 'Installment 2: Mid-Course Interview Prep',
            amount: p2,
            dueDate: isInst2Overdue ? addDays(today, -4) : addDays(today, 12),
            paidAmount: secondPaid ? p2 : 0,
            paidDate: secondPaid ? addDays(today, -3) : null,
            status: secondPaid ? 'Paid' : (isInst2Overdue ? 'Overdue' : 'Pending'),
            paymentMode: secondPaid ? 'Net Banking' : null,
            transactionRef: secondPaid ? `TXN-P2-${student.id.replace('CRM-STU-', '')}` : null
          },
          {
            id: 'INST-3',
            title: 'Installment 3: Offer Letter Release',
            amount: p3,
            dueDate: addDays(today, 60),
            paidAmount: 0,
            paidDate: null,
            status: 'Pending',
            paymentMode: null,
            transactionRef: null
          }
        ];
      } else {
        const p1 = Math.round(fee * 0.5);
        const p2 = fee - p1;
        paid = p1;
        status = 'Partially Paid';
        const isInst2Overdue = (index % 4 === 0);
        installments = [
          {
            id: 'INST-1',
            title: 'Installment 1: Enrollment & Training Access',
            amount: p1,
            dueDate: addDays(today, -15),
            paidAmount: p1,
            paidDate: addDays(today, -15),
            status: 'Paid',
            paymentMode: (index % 2 === 0) ? 'UPI / Online' : 'Credit / Debit Card',
            transactionRef: `TXN-P1-${student.id.replace('CRM-STU-', '')}`
          },
          {
            id: 'INST-2',
            title: 'Installment 2: Offer Letter Release',
            amount: p2,
            dueDate: isInst2Overdue ? addDays(today, -2) : addDays(today, 25),
            paidAmount: 0,
            paidDate: null,
            status: isInst2Overdue ? 'Overdue' : 'Pending',
            paymentMode: null,
            transactionRef: null
          }
        ];
      }
    } else if (stage === 'lost' || stage === 'not interested') {
      fee = 0;
      paid = 0;
      status = 'Pending';
      installments = [];
    } else {
      // Cold Calling / New Lead / Contacted: Raw/Initial stage, unpaid
      paid = 0;
      status = 'Pending';
      const p1 = Math.round(fee * 0.5);
      const p2 = fee - p1;
      installments = [
        {
          id: 'INST-1',
          title: 'Installment 1: Enrollment & Training Access',
          amount: p1,
          dueDate: addDays(today, 7),
          paidAmount: 0,
          paidDate: null,
          status: 'Pending',
          paymentMode: null,
          transactionRef: null
        },
        {
          id: 'INST-2',
          title: 'Installment 2: Offer Letter Release',
          amount: p2,
          dueDate: addDays(today, 45),
          paidAmount: 0,
          paidDate: null,
          status: 'Pending',
          paymentMode: null,
          transactionRef: null
        }
      ];
    }

    student.totalFee = fee;
    student.paidAmount = paid;
    student.pendingAmount = Math.max(0, fee - paid);
    student.paymentPlan = plan;
    student.paymentStatus = status;
    student.installments = installments;
    return student;
  },

  /**
   * Generate initial payment transactions from paid installments
   */
  getPayments() {
    const payments = [];
    const customers = this.getCustomers();
    let payCounter = 1;

    customers.forEach(c => {
      if (!Array.isArray(c.installments)) return;
      c.installments.forEach(inst => {
        if ((Number(inst.paidAmount) || 0) > 0) {
          const pad = String(payCounter++).padStart(6, '0');
          payments.push({
            id: `CRM-PAY-${pad}`,
            customerId: c.id,
            customerName: c.name,
            studentDegree: c.qualification,
            college: c.college,
            amount: Number(inst.paidAmount),
            paymentDate: inst.paidDate || '2026-09-20',
            paymentMode: inst.paymentMode || 'UPI / Online',
            transactionRef: inst.transactionRef || `TXN-UPI-${pad}`,
            installmentTitle: inst.title || 'Placement Fee Installment',
            installmentId: inst.id,
            notes: 'Official student fee installment payment recorded.',
            receivedBy: c.salespersonName || 'Alexander Wright',
            salespersonId: c.salespersonId,
            salespersonName: c.salespersonName,
            managerId: c.managerId,
            managerName: c.managerName,
            createdAt: `${inst.paidDate || '2026-09-20'}T10:00:00.000Z`
          });
        }
      });
    });

    return payments;
  },

  getFollowUps() {
    return [
      {
        id: 'CRM-FLW-000001',
        customerId: 'CRM-STU-000001',
        customerName: 'Aditya Deshmukh',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        date: '2026-09-30',
        time: '16:00',
        purpose: 'Discuss backend placement track and client interview process.',
        status: 'Pending',
        priority: 'High',
        completedAt: null,
        completedBy: null,
        notes: ''
      },
      {
        id: 'CRM-FLW-000002',
        customerId: 'CRM-STU-000002',
        customerName: 'Nandita Iyer',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        date: '2026-09-30',
        time: '17:30',
        purpose: 'Review job assistance program terms and technical screening date.',
        status: 'Pending',
        priority: 'High',
        completedAt: null,
        completedBy: null,
        notes: ''
      },
      {
        id: 'CRM-FLW-000003',
        customerId: 'CRM-STU-000004',
        customerName: 'Kunal Aggarwal',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        date: '2026-09-30',
        time: '15:00',
        purpose: 'Corporate sales mock interview counseling call.',
        status: 'Pending',
        priority: 'Medium',
        completedAt: null,
        completedBy: null,
        notes: ''
      },
      {
        id: 'CRM-FLW-000004',
        customerId: 'CRM-STU-000007',
        customerName: 'Meera Kapoor',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        date: '2026-09-28',
        time: '10:00',
        purpose: 'QA Automation test evaluation follow-up.',
        status: 'Pending',
        priority: 'High',
        completedAt: null,
        completedBy: null,
        notes: ''
      },
      {
        id: 'CRM-FLW-000005',
        customerId: 'CRM-STU-000015',
        customerName: 'Sujata Bose',
        salespersonId: 'USR-S04',
        salespersonName: 'Neha Gupta',
        date: '2026-09-29',
        time: '14:00',
        purpose: 'Pharma campus hiring requirements update.',
        status: 'Pending',
        priority: 'High',
        completedAt: null,
        completedBy: null,
        notes: ''
      },
      {
        id: 'CRM-FLW-000006',
        customerId: 'CRM-STU-000010',
        customerName: 'Kavita Menon',
        salespersonId: 'USR-S03',
        salespersonName: 'Vikram Singh',
        date: '2026-10-01',
        time: '14:30',
        purpose: 'Startup hiring partner interview preparation.',
        status: 'Pending',
        priority: 'High',
        completedAt: null,
        completedBy: null,
        notes: ''
      },
      {
        id: 'CRM-FLW-000007',
        customerId: 'CRM-STU-000016',
        customerName: 'Tariq Siddiqui',
        salespersonId: 'USR-S05',
        salespersonName: 'Rahul Mehta',
        date: '2026-09-30',
        time: '18:00',
        purpose: 'Final placement offer review with security consultancy.',
        status: 'Pending',
        priority: 'High',
        completedAt: null,
        completedBy: null,
        notes: ''
      },
      {
        id: 'CRM-FLW-000008',
        customerId: 'CRM-STU-000003',
        customerName: 'Harish Nambiar',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        date: '2026-09-25',
        time: '11:00',
        purpose: 'Collect joining documentation and offer acceptance form.',
        status: 'Completed',
        priority: 'High',
        completedAt: '2026-09-25T15:30:00.000Z',
        completedBy: 'Arun Kumar',
        notes: 'Placed successfully as Python Full Stack Developer.'
      }
    ];
  },

  getCalls() {
    return [
      {
        id: 'CRM-CALL-000001',
        customerId: 'CRM-STU-000001',
        customerName: 'Aditya Deshmukh',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        outcome: 'Interested',
        notes: 'Aditya confirmed readiness for immediate technical assessment. Target salary: ₹5.5 LPA.',
        nextAction: 'Schedule Follow-up',
        nextFollowUpDate: '2026-09-30T16:00',
        timestamp: '2026-09-28T14:30:00.000Z'
      },
      {
        id: 'CRM-CALL-000002',
        customerId: 'CRM-STU-000002',
        customerName: 'Nandita Iyer',
        salespersonId: 'USR-S01',
        salespersonName: 'Arun Kumar',
        outcome: 'Connected',
        notes: 'Reviewed frontend React portfolio. She has 3 production sample projects.',
        nextAction: 'Send Email Quote',
        nextFollowUpDate: '2026-09-30T17:30',
        timestamp: '2026-09-29T11:20:00.000Z'
      },
      {
        id: 'CRM-CALL-000003',
        customerId: 'CRM-STU-000004',
        customerName: 'Kunal Aggarwal',
        salespersonId: 'USR-S02',
        salespersonName: 'Sneha Rao',
        outcome: 'Connected',
        notes: 'Kunal requested guidance for corporate sales aptitude rounds.',
        nextAction: 'Schedule Demo',
        nextFollowUpDate: '2026-09-30T15:00',
        timestamp: '2026-09-24T10:00:00.000Z'
      }
    ];
  },

  getStageHistory() {
    return [
      {
        id: 'CRM-STAGE-000001',
        customerId: 'CRM-STU-000001',
        customerName: 'Aditya Deshmukh',
        fromStage: 'New Lead',
        toStage: 'Contacted',
        changedBy: 'Arun Kumar',
        changedAt: '2026-09-12T11:00:00.000Z',
        reason: 'Initial career counseling call completed'
      },
      {
        id: 'CRM-STAGE-000002',
        customerId: 'CRM-STU-000001',
        customerName: 'Aditya Deshmukh',
        fromStage: 'Contacted',
        toStage: 'Interested',
        changedBy: 'Arun Kumar',
        changedAt: '2026-09-28T14:30:00.000Z',
        reason: 'Student confirmed readiness for placement track'
      },
      {
        id: 'CRM-STAGE-000003',
        customerId: 'CRM-STU-000002',
        customerName: 'Nandita Iyer',
        fromStage: 'Interested',
        toStage: 'Prospect',
        changedBy: 'Arun Kumar',
        changedAt: '2026-09-18T10:00:00.000Z',
        reason: 'React coding assessment cleared with 88% score'
      },
      {
        id: 'CRM-STAGE-000004',
        customerId: 'CRM-STU-000002',
        customerName: 'Nandita Iyer',
        fromStage: 'Prospect',
        toStage: 'Negotiation',
        changedBy: 'Arun Kumar',
        changedAt: '2026-09-29T11:20:00.000Z',
        reason: 'Reviewing job assistance package fee'
      },
      {
        id: 'CRM-STAGE-000005',
        customerId: 'CRM-STU-000003',
        customerName: 'Harish Nambiar',
        fromStage: 'Negotiation',
        toStage: 'Converted',
        changedBy: 'Arun Kumar',
        changedAt: '2026-09-25T16:00:00.000Z',
        reason: 'Successfully placed as Full Stack Python Developer'
      }
    ];
  },

  getNotes() {
    return [
      {
        id: 'CRM-NOTE-000001',
        customerId: 'CRM-STU-000001',
        text: 'Strong DSA problem solving foundation. Preferred location: Pune / Mumbai hybrid.',
        createdBy: 'Arun Kumar',
        createdAt: '2026-09-28T14:35:00.000Z'
      },
      {
        id: 'CRM-NOTE-000002',
        customerId: 'CRM-STU-000002',
        text: 'Wants frontend roles at venture-funded startups in Bengaluru.',
        createdBy: 'Arun Kumar',
        createdAt: '2026-09-29T11:25:00.000Z'
      }
    ];
  },

  getActivities() {
    return [
      {
        id: 'CRM-ACT-000001',
        user: 'Alexander Wright',
        role: 'admin',
        action: 'System Initialized',
        customerId: null,
        description: 'Apex Student Placement CRM initialized with 32 candidate job seekers.',
        timestamp: '2026-09-25T09:00:00.000Z'
      },
      {
        id: 'CRM-ACT-000002',
        user: 'Arun Kumar',
        role: 'sales',
        action: 'Customer Created',
        customerId: 'CRM-STU-000001',
        description: 'Enrolled student job seeker: Aditya Deshmukh (B.Tech CS, VJTI Mumbai)',
        timestamp: '2026-09-25T10:15:00.000Z'
      },
      {
        id: 'CRM-ACT-000003',
        user: 'Arun Kumar',
        role: 'sales',
        action: 'Stage Changed',
        customerId: 'CRM-STU-000003',
        description: 'Changed stage for Harish Nambiar to Converted (Placed)',
        timestamp: '2026-09-25T16:00:00.000Z'
      },
      {
        id: 'CRM-ACT-000004',
        user: 'Arun Kumar',
        role: 'sales',
        action: 'Follow-up Completed',
        customerId: 'CRM-STU-000003',
        description: 'Completed placement follow-up for Harish Nambiar',
        timestamp: '2026-09-25T16:05:00.000Z'
      },
      {
        id: 'CRM-ACT-000005',
        user: 'Rajesh Sharma',
        role: 'manager',
        action: 'Lead Assigned',
        customerId: 'CRM-STU-000006',
        description: 'Student Anand Bajpayee assigned to Arun Kumar by Rajesh Sharma',
        timestamp: '2026-09-29T16:05:00.000Z'
      }
    ];
  },

  getCounters() {
    return {
      'CRM-STU': 32,
      'CRM-CUST': 32,
      'CRM-FLW': 8,
      'CRM-CALL': 3,
      'CRM-STAGE': 5,
      'CRM-NOTE': 2,
      'CRM-ACT': 5,
      'CRM-PAY': 25,
      'USR': 11
    };
  },

  getSettings() {
    return {
      crmName: 'Apex Student Career CRM',
      currency: '₹ (INR)',
      timezone: 'Asia/Kolkata (IST)',
      leadStages: [
        'Cold Calling',
        'New Lead',
        'Contacted',
        'Interested',
        'Prospect',
        'Follow-up',
        'Negotiation',
        'Converted',
        'Not Interested',
        'Lost'
      ],
      leadSources: [
        'Cold Calling / Raw Database',
        'Excel / CSV Upload',
        'Job Portal / Naukri',
        'College Placement Cell',
        'LinkedIn',
        'Walk-in / Campus Drive',
        'Website Inquiry',
        'Referral',
        'Social Media / Instagram'
      ]
    };
  },

  resetDemoData() {
    const currentUser = StorageService.getData(CRM_STORAGE_KEYS.CURRENT_USER, null);

    StorageService.saveData(CRM_STORAGE_KEYS.USERS, this.getUsers());
    StorageService.saveData(CRM_STORAGE_KEYS.CUSTOMERS, this.getCustomers());
    StorageService.saveData(CRM_STORAGE_KEYS.FOLLOWUPS, this.getFollowUps());
    StorageService.saveData(CRM_STORAGE_KEYS.CALLS, this.getCalls());
    StorageService.saveData(CRM_STORAGE_KEYS.STAGE_HISTORY, this.getStageHistory());
    StorageService.saveData(CRM_STORAGE_KEYS.NOTES, this.getNotes());
    StorageService.saveData(CRM_STORAGE_KEYS.ACTIVITIES, this.getActivities());
    StorageService.saveData(CRM_STORAGE_KEYS.PAYMENTS, this.getPayments());
    StorageService.saveData(CRM_STORAGE_KEYS.COUNTERS, this.getCounters());
    StorageService.saveData(CRM_STORAGE_KEYS.SETTINGS, this.getSettings());

    if (currentUser) {
      StorageService.saveData(CRM_STORAGE_KEYS.CURRENT_USER, currentUser);
    } else {
      StorageService.saveData(CRM_STORAGE_KEYS.CURRENT_USER, this.getUsers()[0]);
    }

    console.log('Student Career CRM demo data initialized successfully.');
  },

  initIfEmpty() {
    const users = StorageService.getData(CRM_STORAGE_KEYS.USERS, []);
    const customers = StorageService.getData(CRM_STORAGE_KEYS.CUSTOMERS, []);

    // Also re-seed if existing data had company instead of student qualification, missing Cold Calling, or missing payments
    const hasOldCompanyData = customers.some(c => c.id && c.id.startsWith('CRM-CUST'));
    const missingColdCalling = customers.length > 0 && !customers.some(c => c.stage === 'Cold Calling');
    const missingFeeData = customers.length > 0 && !customers.some(c => (Number(c.totalFee) || 0) > 0);

    if (!users.length || !customers.length || hasOldCompanyData || missingColdCalling || missingFeeData) {
      this.resetDemoData();
    }
  }
};

window.SeedData = SeedData;
SeedData.initIfEmpty();
