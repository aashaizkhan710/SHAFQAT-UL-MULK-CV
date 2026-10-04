/**
 * Complete and verified CV data for Shafqat Ul Mulk
 * Senior Academic Leader, Project Manager, Principal, Avionics & Embedded Systems Educator
 */

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department?: string;
  location: string;
  period: string;
  current?: boolean;
  type: 'Executive / Government' | 'Military Higher Education' | 'Higher Education' | 'Industrial Engineering';
  highlights: string[];
  leadershipRoles?: string[];
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  metric?: string;
  description: string;
  category: 'Leadership' | 'Aviation & Defense' | 'Reform' | 'Quality & Accreditation';
}

export interface ProjectContribution {
  id: string;
  title: string;
  organization: string;
  timeframe: string;
  problem: string;
  action: string;
  result: string;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  honors?: string;
  keyDetails: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
  credentialBadge: string;
}

export interface HonorAwardItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  badge: string;
}

export const HONORS_AWARDS: HonorAwardItem[] = [
  {
    id: 'award-paf',
    title: 'Appreciation Certificate from Base Commander',
    issuer: 'PAF Academy Asghar Khan, Risalpur',
    category: 'Military & Defense Commendation',
    description: 'Awarded by the Base Commander of the premier Pakistan Air Force Academy Risalpur in recognition of exemplary academic and technical instruction, leadership, and distinguished service to military tri-services cadets.',
    badge: 'Base Commander Commendation'
  },
  {
    id: 'award-msc',
    title: '2nd Position in MSc Electronics',
    issuer: 'University of Peshawar',
    category: 'University Academic Distinction',
    description: 'Awarded 2nd Position in the entire university graduating cohort across Khyber Pakhtunkhwa for academic distinction in semiconductor physics, communication systems, and electronic circuit analysis.',
    badge: '2nd Position in University'
  },
  {
    id: 'award-ptc',
    title: 'Certificate of Honour',
    issuer: 'Pakistan Tobacco Company (PTC), Nowshera',
    category: 'Industrial Engineering Excellence',
    description: 'Conferred Certificate of Honour by Pakistan Tobacco Company (British American Tobacco subsidiary) at the Nowshera/Akora Khattak manufacturing facility for exceptional technical problem-solving and automated line optimization.',
    badge: 'Certificate of Honour'
  },
  {
    id: 'award-ncc',
    title: 'Company Commander in National Cadet Corps (NCC)',
    issuer: 'National Cadet Corps (NCC) – College',
    category: 'Cadet Military Leadership',
    description: 'Appointed and served with distinction as Company Commander in the National Cadet Corps (NCC) during collegiate studies, demonstrating disciplined company drill command, physical rigor, and youth leadership.',
    badge: 'Company Commander'
  }
];

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Project Manager',
    organization: 'Project Implementation Unit (PIU)',
    department: 'Outsourcing of Low Performing Government Schools',
    location: 'Khyber Pakhtunkhwa, Pakistan',
    period: '20 April 2026 – Present',
    current: true,
    type: 'Executive / Government',
    highlights: [
      'Directly managing the landmark outsourcing intervention covering 2,000 low-performing government schools across the province.',
      'Spearheading structured frameworks to aggressively improve student enrollment rates and eliminate dropouts.',
      'Establishing transparent key performance indicators (KPIs) for private and non-profit operating partners.',
      'Coordinating implementation, continuous monitoring, and systemic reform activities with the Elementary & Secondary Education Department.',
      'Transforming classroom learning outcomes through standardized diagnostic assessments and rapid remedial protocols.'
    ],
    skills: ['Public Sector Reform', 'Project Governance', 'SLA Enforcement', 'Enrollment Expansion', 'Educational Analytics']
  },
  {
    id: 'exp-2',
    role: 'Principal (BPS-20)',
    organization: 'Swabi Model School & College',
    department: 'Elementary & Secondary Education Department',
    location: 'Swabi, Khyber Pakhtunkhwa, Pakistan',
    period: 'September 2022 – Present',
    current: true,
    type: 'Executive / Government',
    highlights: [
      'Led comprehensive institutional turnaround strategy, dramatically improving academic discipline, board exam results, and community confidence.',
      'Conceived and established a dedicated Robotics & Artificial Intelligence Lab seamlessly integrated into the STEM curriculum.',
      'Implemented a structured faculty evaluation system using KPI-based monitoring and objective classroom peer reviews.',
      'Strengthened administrative governance, fiscal compliance, transparent procurement, and multi-stakeholder engagement.',
      'Fostered an innovation-focused, student-centered learning environment with active science exhibitions and co-curricular societies.'
    ],
    skills: ['Institutional Turnaround', 'BPS-20 Governance', 'Robotics & AI Labs', 'Faculty Evaluation', 'Board Exam Excellence']
  },
  {
    id: 'exp-3',
    role: 'Assistant Professor – Avionics & Embedded Systems',
    organization: 'National University of Sciences and Technology (NUST)',
    department: 'College of Aeronautical Engineering (CAE), PAF Academy Asghar Khan',
    location: 'Risalpur, Pakistan',
    period: 'February 2004 – November 2021 (17.75 Years)',
    current: false,
    type: 'Military Higher Education',
    highlights: [
      'Delivered rigorous undergraduate and postgraduate engineering courses in Avionics Embedded Systems, FPGA & Verilog HDL, MIL-STD-1553 Avionics Data Bus, Digital Signal Processing for Radar Applications, and Microelectronics.',
      'Conducted elite technical flight and ground systems avionics instruction for Pakistan tri-services (PAF, Army Aviation, Naval Air Arm) officers.',
      'Instructed elite allied international cadets, including officer trainees from the Royal Saudi Air Force and Royal Jordanian Air Force.',
      'Designed and delivered specialized professional development and technical conversion courses for active-duty commissioned officers.',
      'Supervised numerous defense-oriented Final Year Projects including FPGA-based avionics mission computers, pulse-Doppler radar processors, and avionics bus analyzers.'
    ],
    leadershipRoles: [
      'ISO 9001 Certification Coordinator: Orchestrated audit readiness and led CAE through multiple successful ISO 9001 certification cycles.',
      'Outcome-Based Education (OBE) Implementation Leader: Formulated CLO-PLO mapping matrices, continuous quality improvement (CQI) workflows, and assessment analytics aligned with the Washington Accord.',
      'Member, Curriculum Review & Academic Planning Committee: Modernized avionics degree syllabi in alignment with contemporary aerospace defense trends.',
      'Contributed heavily to PEC accreditation documentation, laboratory modernization audits, and junior faculty mentorship.'
    ],
    skills: ['FPGA / Verilog HDL', 'MIL-STD-1553 Bus', 'Radar DSP', 'ISO 9001 Lead Coordination', 'OBE Washington Accord', 'Defense Training']
  },
  {
    id: 'exp-4',
    role: 'Lecturer – Electrical & Computer Engineering',
    organization: 'COMSATS University Islamabad',
    department: 'Department of Electrical & Computer Engineering',
    location: 'Islamabad / Abbottabad, Pakistan',
    period: 'January 2001 – February 2004',
    current: false,
    type: 'Higher Education',
    highlights: [
      'Taught undergraduate courses in Digital Logic Design, Electronic Circuit Analysis, and Computer Architecture.',
      'Pioneered the establishment of the university’s advanced VLSI & Microelectronics Laboratory, procuring EDA software and hardware testbenches.',
      'Supervised undergraduate engineering projects focusing on microcontrollers and embedded logic circuits.'
    ],
    skills: ['VLSI Lab Design', 'Digital Systems', 'EDA Tools', 'Undergraduate Mentorship']
  },
  {
    id: 'exp-5',
    role: 'Electronics Service Engineer',
    organization: 'Pakistan Tobacco Company (PTC - British American Tobacco Subsidiary)',
    department: 'Engineering & Automation Maintenance',
    location: 'Akora Khattak, Pakistan',
    period: 'June 1999 – January 2001',
    current: false,
    type: 'Industrial Engineering',
    highlights: [
      'Managed industrial electronics diagnostics, high-speed automated packaging machinery, and Siemens/Allen-Bradley PLC programming.',
      'Maintained mission-critical production systems under rigorous British American Tobacco multinational operational standards.',
      'Implemented preventive and emergency corrective maintenance routines, achieving 99%+ production line availability.'
    ],
    skills: ['PLC Programming', 'Industrial Automation', 'Root Cause Diagnostics', 'Preventive Maintenance']
  }
];

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: '25+ Years of Dedicated Leadership',
    subtitle: 'Higher Education & Institutional Management',
    metric: '25+ Years',
    description: 'A quarter-century legacy shaping aerospace engineers, military officers, school systems, and policy reforms across Pakistan.',
    category: 'Leadership'
  },
  {
    id: 'ach-2',
    title: '2,000 Government Schools Outsourcing Intervention',
    subtitle: 'Project Manager – Project Implementation Unit',
    metric: '2,000 Schools',
    description: 'Heading the operational rollout to revitalize 2,000 low-performing schools, targeted at elevating student literacy and teacher performance.',
    category: 'Reform'
  },
  {
    id: 'ach-3',
    title: 'Institutional Turnaround of Swabi Model College',
    subtitle: 'Principal (BPS-20)',
    metric: 'BPS-20',
    description: 'Transformed administrative governance, enhanced board examination pass percentages, and elevated institutional standing.',
    category: 'Leadership'
  },
  {
    id: 'ach-4',
    title: 'First-in-Class Robotics & AI Lab Establishment',
    subtitle: 'Swabi Model School & College',
    metric: 'Modern STEM',
    description: 'Conceptualized, procured, and integrated an advanced Robotics and Artificial Intelligence facility into mainstream schooling.',
    category: 'Reform'
  },
  {
    id: 'ach-5',
    title: '17.75 Years at CAE NUST, PAF Academy Asghar Khan',
    subtitle: 'Assistant Professor – Avionics & Embedded Systems',
    metric: '17.75 Yrs',
    description: 'Long-standing faculty member at Pakistan’s premier aeronautical engineering institute within the Pakistan Air Force Academy.',
    category: 'Aviation & Defense'
  },
  {
    id: 'ach-6',
    title: 'Tri-Services & International Air Force Cadet Training',
    subtitle: 'PAF, Army, Navy, Saudi & Jordanian Air Forces',
    metric: 'International',
    description: 'Trained generations of military aviators and avionics engineers from Pakistan and allied nations including Saudi Arabia and Jordan.',
    category: 'Aviation & Defense'
  },
  {
    id: 'ach-7',
    title: 'ISO 9001 Certification Coordinator',
    subtitle: 'Multiple Successful Quality Audits',
    metric: 'ISO 9001',
    description: 'Steered the College of Aeronautical Engineering through rigorous ISO 9001 quality audits with zero major non-conformities.',
    category: 'Quality & Accreditation'
  },
  {
    id: 'ach-8',
    title: 'Outcome-Based Education (OBE) Implementation',
    subtitle: 'Aligned with Washington Accord Standards',
    metric: 'PEC Certified',
    description: 'Led comprehensive CLO-PLO mapping, rubrics construction, and assessment automation for full Pakistan Engineering Council compliance.',
    category: 'Quality & Accreditation'
  },
  {
    id: 'ach-9',
    title: 'Advanced VLSI & Microelectronics Lab Founding',
    subtitle: 'COMSATS University Islamabad',
    metric: 'VLSI Pioneer',
    description: 'Architected and equipped the first microelectronics design laboratory for undergraduate and graduate research at COMSATS.',
    category: 'Aviation & Defense'
  },
  {
    id: 'ach-10',
    title: 'Supervision of Classified & Defense Engineering FYPs',
    subtitle: 'Radar Signal Processing & MIL-STD-1553 Buses',
    metric: '50+ FYPs',
    description: 'Mentored over fifty defense-critical capstone engineering projects spanning real-time embedded radar tracking and flight computers.',
    category: 'Aviation & Defense'
  },
  {
    id: 'ach-11',
    title: 'Appreciation Certificate from Base Commander',
    subtitle: 'PAF Academy Asghar Khan Risalpur',
    metric: 'Base Commendation',
    description: 'Awarded by the Base Commander PAF Academy Risalpur in recognition of dedicated service, rigorous military avionics instruction, and training tri-services officer cadets.',
    category: 'Aviation & Defense'
  },
  {
    id: 'ach-12',
    title: '2nd Position in MSc Electronics',
    subtitle: 'University of Peshawar',
    metric: '2nd in University',
    description: 'Secured 2nd Position in the university graduating cohort across the province for academic excellence in physics and electronics.',
    category: 'Leadership'
  },
  {
    id: 'ach-13',
    title: 'Certificate of Honour',
    subtitle: 'Pakistan Tobacco Company (PTC) Nowshera',
    metric: 'Corporate Honour',
    description: 'Honored for exceptional technical engineering diagnostics, automated system stability, and multinational manufacturing operational excellence.',
    category: 'Leadership'
  },
  {
    id: 'ach-14',
    title: 'Company Commander – National Cadet Corps (NCC)',
    subtitle: 'Collegiate Military & Youth Leadership',
    metric: 'Company Commander',
    description: 'Appointed Company Commander in the National Cadet Corps (NCC) during college, directing troop discipline, drill parades, and military leadership ceremonies.',
    category: 'Leadership'
  }
];

export const CV_DATA = {
  personal: {
    name: 'Professor Shafqat-ul-Mulk',
    title: 'Academic Leader | Project Manager | Principal | Avionics & Embedded Systems Educator',
    shortIntro: 'Accomplished academic leader and project manager with over 25 years of experience across higher education, military academies, institutional management, STEM innovation, quality assurance, and government education reform.',
    extendedBio: 'Professor Shafqat-ul-Mulk is an accomplished academic leader and Principal with over 25 years of experience across higher education, military academies, and institutional management. He served 17.75 years as Assistant Professor at the College of Aeronautical Engineering, National University of Sciences and Technology (NUST), located within Pakistan Air Force Academy Asghar Khan, delivering advanced avionics and embedded systems training to Pakistan tri-services and international cadets including Royal Saudi and Royal Jordanian Air Force trainees. He has also served as Principal (BPS-20) at Swabi Model School & College, leading institutional turnaround, academic reform, STEM innovation, and governance strengthening.',
    location: 'Nowshera, Khyber Pakhtunkhwa, Pakistan',
    phone: '+92 323 9215615',
    email: 'ssumulk@gmail.com',
    nationality: 'Pakistani',
    linkedinUrl: 'https://www.linkedin.com/in/shafqat-ul-mulk-16a42522b/',
    whatsappUrl: 'https://wa.me/923239215615?text=Hello%20Professor%20Shafqat-ul-Mulk%2C%20I%20would%20like%20to%20connect%20with%20you%20regarding%20academic%20collaboration%20or%20professional%20enquiries.',
    experienceYears: '25+',
    schoolsReformed: '2,000',
    yearsAtNust: '17.75',
    bilingualCadetsTrained: 'Tri-Services & Royal Air Forces'
  },

  presentRole: {
    title: 'Project Manager',
    unit: 'Project Implementation Unit (PIU)',
    project: 'Outsourcing of Low Performing Government Schools',
    appointedDate: '20 April 2026 – Present',
    scale: '2,000 Government Schools',
    objective: 'Improving student enrollment, retention, and measurable learning outcomes across Khyber Pakhtunkhwa.',
    description: 'Presently working as Project Manager in the Project Implementation Unit for outsourcing of low-performing government schools. In this intervention, 2000 government schools are outsourced for improving enrollment and learning outcomes of students through rigorous governance, quality monitoring, and private-sector operational excellence.',
    pillars: [
      {
        title: 'Enrollment & Retention Expansion',
        detail: 'Implementing data-driven community mobilization and enrollment campaigns to re-integrate out-of-school children.'
      },
      {
        title: 'Learning Outcomes Transformation',
        detail: 'Deploying structured curriculum pacing, baseline diagnostic testing, and teacher performance tracking across 2,000 schools.'
      },
      {
        title: 'Public-Private Partnership Governance',
        detail: 'Overseeing contractual service level agreements (SLAs), compliance milestones, and transparent verification mechanisms.'
      },
      {
        title: 'Institutional Capacity Building',
        detail: 'Bridging high-level policy directives from the Elementary & Secondary Education Department into actionable grassroots operations.'
      }
    ]
  },

  hireMeAreas: [
    {
      title: 'Academic Leadership',
      description: 'Strategic direction, institutional vision, board advisory, and overall executive management for colleges and university faculties.'
    },
    {
      title: 'Project Management',
      description: 'Large-scale education interventions, multilateral reform execution, donor-funded education projects, and milestone tracking.'
    },
    {
      title: 'Institutional Reform',
      description: 'Diagnostic audits, turnaround restructuring of underperforming institutions, and governance optimization.'
    },
    {
      title: 'STEM & Robotics Integration',
      description: 'Establishment of state-of-the-art Robotics and AI laboratories, modern maker spaces, and hands-on STEM curricula.'
    },
    {
      title: 'Quality Assurance & Accreditation',
      description: 'Implementation of ISO 9001:2015 frameworks, Pakistan Engineering Council (PEC) accreditation, and NACTE/HEC compliance.'
    },
    {
      title: 'Faculty Development',
      description: 'Pedagogy workshops, military-standard teaching methodologies, KPI-based appraisals, and continuous professional development.'
    },
    {
      title: 'Curriculum Development',
      description: 'Outcome-Based Education (OBE) design, CLO-PLO taxonomy alignment, and industry-standard syllabus modernization.'
    },
    {
      title: 'Education Policy Implementation',
      description: 'Translating government reform frameworks into accountable field interventions across public and private school networks.'
    }
  ],

  competencies: [
    { title: 'Academic Leadership & School Governance', icon: 'Landmark', desc: 'Comprehensive oversight of institutional administration, faculty leadership, and policy governance.' },
    { title: 'Higher Education Teaching & Curriculum Development', icon: 'GraduationCap', desc: '17.75+ years designing engineering curricula and lecturing advanced avionics systems.' },
    { title: 'Quality Assurance & Accreditation', icon: 'ShieldCheck', desc: 'Pioneered PEC accreditation and academic audit frameworks meeting global standards.' },
    { title: 'ISO 9001 / OBE Implementation', icon: 'Award', desc: 'ISO 9001 Certification Coordinator; orchestrated Outcome-Based Education assessment rubrics.' },
    { title: 'STEM & Robotics Lab Establishment', icon: 'Cpu', desc: 'Founded first-in-class Robotics and AI laboratories integrating practical hardware design.' },
    { title: 'Faculty Development & Performance Management', icon: 'Users', desc: 'Mentored dozens of senior educators with KPI-based merit appraisals and pedagogical training.' },
    { title: 'Strategic Planning & Institutional Reform', icon: 'Compass', desc: 'Engineered comprehensive turnaround plans for colleges restoring academic reputation and financial stability.' },
    { title: 'Defense & Aviation Technical Training', icon: 'Plane', desc: 'Trained Pakistan Army, Navy, Air Force officers and international cadets (Saudi & Jordanian).' },
    { title: 'Project Management', icon: 'Kanban', desc: 'Rigorous project lifecycle governance, stakeholder alignments, and multi-tier monitoring systems.' },
    { title: 'Government School Reform', icon: 'Building2', desc: 'Direct oversight of the provincial 2,000 low-performing government schools outsourcing intervention.' },
    { title: 'Student Enrollment Improvement', icon: 'TrendingUp', desc: 'Proven campaigns driving student re-enrollment, retention, and community trust restoration.' },
    { title: 'Learning Outcomes Improvement', icon: 'Target', desc: 'Standardized assessment analytics, formative feedback loops, and remedial learning frameworks.' }
  ],

  experiences: EXPERIENCES,
  achievements: ACHIEVEMENTS,

  projectsContributions: [
    {
      id: 'proj-1',
      title: 'Government School Outsourcing Reform Project',
      organization: 'Project Implementation Unit (PIU)',
      timeframe: 'April 2026 – Present',
      problem: 'Over 2,000 public primary and middle schools suffered from chronic absenteeism, deficient infrastructure, low enrollment density, and declining basic literacy rates.',
      action: 'Structured a public-private partnership operational model, establishing verifiable KPIs, digital reporting protocols, community enrollment drives, and strict vendor contract management.',
      result: 'Accelerating enrollment restoration, instituting continuous classroom quality monitoring, and establishing an accountable governance blueprint for public school transformation.',
      tags: ['School Governance', 'Public-Private Partnership', 'Enrollment Expansion', 'Data Monitoring']
    },
    {
      id: 'proj-2',
      title: 'Robotics & Artificial Intelligence Lab Establishment',
      organization: 'Swabi Model School & College',
      timeframe: '2023 – 2024',
      problem: 'Rural and suburban secondary students lacked exposure to 21st-century applied technologies, algorithmic thinking, and modern hands-on computing.',
      action: 'Spearheaded project proposals, secured infrastructure funding, designed hardware workbenches, and procured microcontroller kits, 3D printers, and robotic platforms. Co-designed practical curricula with engineering educators.',
      result: 'Established an active, high-impact robotics facility where secondary students regularly develop automated projects, participate in regional science competitions, and gain early AI literacy.',
      tags: ['Robotics', 'Artificial Intelligence', 'STEM Pedagogy', 'Maker Education']
    },
    {
      id: 'proj-3',
      title: 'Outcome-Based Education (OBE) System Institutionalization',
      organization: 'College of Aeronautical Engineering (CAE), NUST',
      timeframe: '2016 – 2021',
      problem: 'Higher education engineering programs needed to transition from traditional input-based syllabi to measurable student-learning outcome models compliant with the Washington Accord.',
      action: 'Formulated institutional assessment rubrics, trained 40+ engineering faculty members on Bloom’s taxonomy, and created digital tracking software for Course Learning Outcome (CLO) to Program Learning Outcome (PLO) achievement.',
      result: 'CAE achieved continuous, unconditional Pakistan Engineering Council accreditation under Level-II Washington Accord status, bolstering international degree mobility for graduates.',
      tags: ['OBE Framework', 'PEC Accreditation', 'Washington Accord', 'Continuous Improvement']
    },
    {
      id: 'proj-4',
      title: 'ISO 9001 Quality Management System Certification',
      organization: 'College of Aeronautical Engineering (CAE), NUST',
      timeframe: '2008 – 2021 (Multiple Cycles)',
      problem: 'Military aerospace training demands total operational traceability, structured maintenance logs, standardized examinations, and continuous quality audits.',
      action: 'Served as ISO Coordinator; drafted quality manuals, coordinated internal audits across departments, trained lead auditors, and managed external certifying body reviews.',
      result: 'Achieved consecutive flawless ISO 9001 recertifications across more than a decade of institutional operational audits.',
      tags: ['ISO 9001:2015', 'Quality Assurance', 'Internal Audits', 'Standard Operating Procedures']
    },
    {
      id: 'proj-5',
      title: 'Advanced VLSI & Microelectronics Laboratory Establishment',
      organization: 'COMSATS University Islamabad',
      timeframe: '2001 – 2003',
      problem: 'Newly created electrical engineering department lacked custom hardware fabrication simulators and FPGA prototyping environments.',
      action: 'Drafted laboratory technical specifications, installed industry-standard EDA software packages, configured high-end workstations, and authored laboratory exercise manuals.',
      result: 'Enabled the university to offer specialized microelectronics and IC design electives, graduating its first cohorts of ASIC/FPGA specialized engineers.',
      tags: ['VLSI Lab', 'EDA Tools', 'FPGA Prototyping', 'Electronics Design']
    },
    {
      id: 'proj-6',
      title: 'Defense-Oriented Avionics Final Year Projects Supervision',
      organization: 'CAE NUST / PAF Academy Asghar Khan',
      timeframe: '2004 – 2021',
      problem: 'Tri-services military cadets required practical capstone projects resolving real-world avionics hardware integration and data communication bottlenecks.',
      action: 'Conceived and supervised experimental capstones in MIL-STD-1553 bus decoders, FPGA flight-data telemetry loggers, and digital signal processors for Doppler radar clutter rejection.',
      result: 'Produced defense-grade prototypes, several of which were adopted into experimental flight test rigs and military training simulators.',
      tags: ['Avionics Hardware', 'MIL-STD-1553', 'Radar Signal Processing', 'Defense FYPs']
    }
  ],

  education: [
    {
      degree: 'Master of Science (MS)',
      field: 'Microelectronics & Systems Design',
      institution: 'University of Southampton',
      location: 'Southampton, United Kingdom',
      year: '2008',
      keyDetails: [
        'World-renowned UK center for electronics and computer science research.',
        'Specialized in System-on-Chip (SoC) architectures, high-speed digital systems, and embedded hardware validation.',
        'Rigorous research on high-reliability microelectronic design paradigms.'
      ]
    },
    {
      degree: 'Master of Science (MSc)',
      field: 'Electronics',
      institution: 'University of Peshawar',
      location: 'Peshawar, Pakistan',
      year: '1999',
      honors: '2nd Position in University',
      keyDetails: [
        'Awarded 2nd Position across the entire university graduating cohort for academic distinction.',
        'Deep study of semiconductor physics, solid-state electronics, communication systems, and analog/digital signal synthesis.'
      ]
    },
    {
      degree: 'Bachelor of Science (BSc)',
      field: 'Computer Science, Physics & Mathematics',
      institution: 'University of Peshawar',
      location: 'Pakistan',
      year: '1996',
      keyDetails: [
        'Rigorous foundational tri-discipline program encompassing classical mechanics, mathematical analysis, and structured programming.'
      ]
    }
  ],

  certifications: [
    {
      title: 'International Diploma in Educational Leadership',
      issuer: 'FranklinCovey',
      year: '2023',
      description: 'Executive leadership curriculum covering the 7 Habits of Highly Effective Leaders, high-trust organizational culture, and execution frameworks.',
      credentialBadge: 'Executive Leadership'
    },
    {
      title: 'ISO 9001:2015 Internal Auditor',
      issuer: 'iPS, United Kingdom',
      year: 'Certified Lead / Internal Auditor',
      description: 'Comprehensive certification in quality management systems auditing, non-conformance root-cause analysis, and process risk assessment.',
      credentialBadge: 'Quality Assurance'
    },
    {
      title: 'Outcome-Based Education (OBE) Certified Practitioner',
      issuer: 'Pakistan Engineering Council (PEC)',
      year: 'PEC Accreditation Framework',
      description: 'Accreditation assessment, CLO-PLO taxonomy alignment, and continuous quality improvement (CQI) monitoring under the Washington Accord.',
      credentialBadge: 'Accreditation'
    },
    {
      title: 'Military Teaching Methodology Certifications',
      issuer: 'Pakistan Air Force (PAF) College of Education',
      year: 'Defense Pedagogy',
      description: 'Specialized pedagogical certification in military technical instruction, instructional systems design (ISD), and high-discipline classroom engagement.',
      credentialBadge: 'Defense Pedagogy'
    }
  ],

  honorsAndAwards: HONORS_AWARDS,

  technicalExpertise: [
    { name: 'FPGA, Xilinx & Altera', level: 'Expert', category: 'Hardware' },
    { name: 'Verilog HDL', level: 'Expert', category: 'Hardware' },
    { name: 'Embedded Systems', level: 'Expert', category: 'Embedded' },
    { name: 'MIL-STD-1553 Data Bus', level: 'Expert', category: 'Avionics' },
    { name: 'Digital Signal Processing (DSP)', level: 'Advanced', category: 'Signal Processing' },
    { name: 'Radar Signal Processing', level: 'Advanced', category: 'Avionics' },
    { name: 'Microelectronics & Systems Design', level: 'Expert', category: 'Hardware' },
    { name: 'VLSI Circuit Architecture', level: 'Advanced', category: 'Hardware' },
    { name: 'LabVIEW & Virtual Instrumentation', level: 'Proficient', category: 'Instrumentation' },
    { name: 'ModelSim Simulation', level: 'Expert', category: 'EDA Tools' },
    { name: 'System-C Modeling', level: 'Proficient', category: 'EDA Tools' },
    { name: 'High-Reliability PCB Design', level: 'Advanced', category: 'Hardware' },
    { name: 'PLC Programming & Industrial Control', level: 'Proficient', category: 'Industrial' },
    { name: 'Avionics Mission Systems', level: 'Expert', category: 'Avionics' }
  ],

  languages: [
    { language: 'English', proficiency: 'Fluent, Professional' },
    { language: 'Pashto', proficiency: 'Native' },
    { language: 'Urdu', proficiency: 'Native' },
    { language: 'Arabic', proficiency: 'Basic, Improving' }
  ]
};
