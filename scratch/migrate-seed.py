import re

with open('js/seed-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace STAGES
old_stages = '''  STAGES: [
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
  ],'''

new_stages = '''  STAGES: [
    'Cold Calling',
    'Not Connected',
    'New Lead',
    'Contacted',
    'Interested',
    'Prospect',
    'Follow-up',
    'Negotiation',
    'Pending Closure',
    'Enrolled',
    'Not Interested',
    'Lost'
  ],'''

assert old_stages in text, 'old_stages not found'
text = text.replace(old_stages, new_stages)

# 2. Replace settings leadStages
old_settings_stages = '''      leadStages: [
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
      ],'''

new_settings_stages = '''      leadStages: [
        'Cold Calling',
        'Not Connected',
        'New Lead',
        'Contacted',
        'Interested',
        'Prospect',
        'Follow-up',
        'Negotiation',
        'Pending Closure',
        'Enrolled',
        'Not Interested',
        'Lost'
      ],'''

assert old_settings_stages in text, 'old_settings_stages not found'
text = text.replace(old_settings_stages, new_settings_stages)

# 3. Replace CRM-STU-0000XX with SM-LD-00XX
def replace_id(match):
    num = int(match.group(1))
    return f'SM-LD-{num:04d}'

text = re.sub(r'CRM-STU-0*([0-9]+)', replace_id, text)

# 4. Replace stage: 'Converted' with stage: 'Enrolled' in candidate definitions and stage transitions
text = text.replace("stage: 'Converted'", "stage: 'Enrolled'")
text = text.replace("status: 'Converted'", "status: 'Enrolled'")
text = text.replace("toStage: 'Converted'", "toStage: 'Enrolled'")
text = text.replace("fromStage: 'Converted'", "fromStage: 'Enrolled'")

# 5. In enrichLeadWithFee
text = text.replace("if (stage === 'converted'", "if (stage === 'enrolled' || stage === 'converted'")
text = text.replace("lead.id.replace('CRM-STU-', '')", "lead.id.replace('SM-LD-', '').replace('CRM-STU-', '')")

# 6. Brand name in settings & log
text = text.replace("crmName: 'Apex Lead Management CRM'", "crmName: 'Skill Move CRM'")
text = text.replace("description: 'Apex Lead CRM initialized with 32 candidate leads.'", "description: 'Skill Move CRM initialized with 32 candidate leads.'")
text = text.replace("console.log('Lead Management CRM demo data initialized successfully.');", "console.log('Skill Move CRM demo data initialized successfully.');")

# 7. Counters
text = text.replace("'CRM-LEAD': 32,", "'SM-LD': 36,\n      'CRM-LEAD': 32,")

# 8. Set lead 7 & 12 to Pending Closure, lead 3 & 21 to Not Connected
# SM-LD-0007
ananya_old = """      {
        id: 'SM-LD-0007',
        name: 'Ananya Sharma',
        mobile: '9821100013',
        altMobile: '9821100014',
        email: 'ananya.sharma@gmail.com',
        qualification: 'B.E. Computer Engineering',
        college: 'Thadomal Shahani Engineering College',
        passingYear: '2024',
        experienceLevel: '1 Year Exp',
        cgpaOrPercentage: '8.7 CGPA',
        skills: 'Python, Django, FastAPI, AWS, PostgreSQL',
        targetRole: 'Backend Developer',
        expectedCtc: '8 - 10 LPA',
        preferredLocation: 'Pune / Mumbai',
        resumeLink: 'https://drive.google.com/sample-resume-7',
        certifications: 'AWS Certified Developer Associate',
        address: 'B-402, Sea Green Apts, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Negotiation',
        status: 'Active'"""

ananya_new = """      {
        id: 'SM-LD-0007',
        name: 'Ananya Sharma',
        mobile: '9821100013',
        altMobile: '9821100014',
        email: 'ananya.sharma@gmail.com',
        qualification: 'B.E. Computer Engineering',
        college: 'Thadomal Shahani Engineering College',
        passingYear: '2024',
        experienceLevel: '1 Year Exp',
        cgpaOrPercentage: '8.7 CGPA',
        skills: 'Python, Django, FastAPI, AWS, PostgreSQL',
        targetRole: 'Backend Developer',
        expectedCtc: '8 - 10 LPA',
        preferredLocation: 'Pune / Mumbai',
        resumeLink: 'https://drive.google.com/sample-resume-7',
        certifications: 'AWS Certified Developer Associate',
        address: 'B-402, Sea Green Apts, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'LinkedIn',
        stage: 'Pending Closure',
        status: 'Pending Closure',
        estimatedRevenue: 55000"""

if ananya_old in text:
    text = text.replace(ananya_old, ananya_new, 1)

# SM-LD-0003
rohan_old = """      {
        id: 'SM-LD-0003',
        name: 'Rohan Verma',
        mobile: '9821100005',
        altMobile: '9821100006',
        email: 'rohan.verma@outlook.com',
        qualification: 'B.Sc Computer Science',
        college: 'Bhavans College, Andheri',
        passingYear: '2025',
        experienceLevel: 'Fresher',
        cgpaOrPercentage: '7.8 CGPA',
        skills: 'HTML, CSS, JavaScript, React Basics, Git',
        targetRole: 'Junior Frontend Developer',
        expectedCtc: '4.5 - 6 LPA',
        preferredLocation: 'Mumbai / Pune',
        resumeLink: 'https://drive.google.com/sample-resume-3',
        certifications: 'Responsive Web Design (freeCodeCamp)',
        address: 'Flat 12, Sunrise CHS, Goregaon West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'College Placement Cell',
        stage: 'Contacted',
        status: 'Active'"""

rohan_new = """      {
        id: 'SM-LD-0003',
        name: 'Rohan Verma',
        mobile: '9821100005',
        altMobile: '9821100006',
        email: 'rohan.verma@outlook.com',
        qualification: 'B.Sc Computer Science',
        college: 'Bhavans College, Andheri',
        passingYear: '2025',
        experienceLevel: 'Fresher',
        cgpaOrPercentage: '7.8 CGPA',
        skills: 'HTML, CSS, JavaScript, React Basics, Git',
        targetRole: 'Junior Frontend Developer',
        expectedCtc: '4.5 - 6 LPA',
        preferredLocation: 'Mumbai / Pune',
        resumeLink: 'https://drive.google.com/sample-resume-3',
        certifications: 'Responsive Web Design (freeCodeCamp)',
        address: 'Flat 12, Sunrise CHS, Goregaon West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        source: 'College Placement Cell',
        stage: 'Not Connected',
        status: 'Not Connected'"""

if rohan_old in text:
    text = text.replace(rohan_old, rohan_new, 1)

# 9. Update initIfEmpty to refresh when old ID format or old Converted present
old_init = '''    const hasOldCompanyData = customers.some(c => c.id && c.id.startsWith('CRM-CUST'));
    const missingColdCalling = customers.length > 0 && !customers.some(c => c.stage === 'Cold Calling');
    const missingFeeData = customers.length > 0 && !customers.some(c => (Number(c.totalFee) || 0) > 0);

    if (!users.length || !customers.length || hasOldCompanyData || missingColdCalling || missingFeeData) {
      this.resetDemoData();
    }'''

new_init = '''    const hasOldIdFormat = customers.some(c => c.id && (c.id.startsWith('CRM-CUST') || c.id.startsWith('CRM-STU')));
    const hasOldConverted = customers.some(c => c.stage === 'Converted');
    const missingColdCalling = customers.length > 0 && !customers.some(c => c.stage === 'Cold Calling');
    const missingFeeData = customers.length > 0 && !customers.some(c => (Number(c.totalFee) || 0) > 0);

    if (!users.length || !customers.length || hasOldIdFormat || hasOldConverted || missingColdCalling || missingFeeData) {
      this.resetDemoData();
    }'''

assert old_init in text, 'old_init not found'
text = text.replace(old_init, new_init)

with open('js/seed-data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('js/seed-data.js updated successfully!')
