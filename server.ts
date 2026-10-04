import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Ensure data and public directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(express.static(PUBLIC_DIR));

// Direct CV access route (serves the official executive resume document)
app.get(['/Shafqat_Ul_Mulk_Executive_CV.pdf', '/Shafqat_Ul_Mulk_Executive_CV.html', '/api/download-cv'], (_req, res) => {
  const filePath = path.join(PUBLIC_DIR, 'Shafqat_Ul_Mulk_Executive_CV.html');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.sendFile(filePath);
  }
  return res.redirect('/#download-cv');
});

const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

// Initialize store files
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([
    {
      id: 'inq-initial-01',
      name: 'Dr. Tariq Mahmood',
      email: 'tariq.mahmood@edu-foundation.org',
      phone: '+92 300 5544332',
      organization: 'Education Sector Reform Council',
      roleInterest: 'Institutional Reform & Academic Governance',
      subject: 'Consultation on 100-School Turnaround Roadmap',
      message: 'Dear Engr. Shafqat Ul Mulk, we reviewed your work with the Project Implementation Unit and Swabi Model College turnaround. We would like to schedule an advisory discussion regarding secondary school governance.',
      date: '2026-09-20T10:30:00Z',
      status: 'reviewed',
      notes: 'Initial contact via web portal. Follow up scheduled.'
    },
    {
      id: 'inq-initial-02',
      name: 'Engr. Sarah Al-Otaibi',
      email: 's.otaibi@defense-systems.aero',
      phone: '+966 50 123 4567',
      organization: 'AeroTech Systems Gulf',
      roleInterest: 'Defense & Aviation Technical Training',
      subject: 'Avionics Embedded Systems & MIL-STD-1553 Training Workshop',
      message: 'Greetings Professor Shafqat. Following your extensive tenure training Royal Saudi Air Force officers at CAE NUST, we are organizing an advanced embedded radar processing symposium.',
      date: '2026-09-24T14:15:00Z',
      status: 'new',
      notes: 'Interested in bespoke 3-day executive technical workshop.'
    }
  ], null, 2));
}

if (!fs.existsSync(SUBSCRIBERS_FILE)) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([
    { email: 'ssumulk@gmail.com', subscribedAt: '2026-09-01T00:00:00Z' }
  ], null, 2));
}

app.use(express.json());

// Helper functions for data access
function readInquiries() {
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeInquiries(data: unknown) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(data, null, 2));
}

function readSubscribers() {
  try {
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeSubscribers(data: unknown) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Submit Contact Form
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, organization, roleInterest, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const inquiries = readInquiries();
    const newInquiry = {
      id: 'inq-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      organization: organization ? String(organization).trim() : 'Independent / Direct',
      roleInterest: roleInterest ? String(roleInterest).trim() : 'General Inquiry',
      subject: subject ? String(subject).trim() : 'Consultation Request for Shafqat Ul Mulk',
      message: String(message).trim(),
      date: new Date().toISOString(),
      status: 'new',
      notes: ''
    };

    inquiries.unshift(newInquiry);
    writeInquiries(inquiries);

    // Simulated immediate email dispatch to notification inbox & sender confirmation
    console.log(`[EMAIL NOTIFICATION DISPATCHED] To: ssumulk@gmail.com, aashaizshafqat@gmail.com | Subject: New Leadership Inquiry from ${newInquiry.name} (${newInquiry.organization})`);
    console.log(`[CONFIRMATION RECEIPT DISPATCHED] To: ${newInquiry.email} | Subject: Confirmation: Your Inquiry for Shafqat Ul Mulk Received`);

    return res.status(201).json({
      success: true,
      message: 'Inquiry successfully transmitted. Shafqat Ul Mulk will review your details promptly.',
      inquiry: newInquiry
    });
  } catch (err: any) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: 'Failed to process inquiry.' });
  }
});

// 2. Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const subscribers = readSubscribers();
    const normalized = String(email).trim().toLowerCase();
    const existing = subscribers.find((s: any) => s.email === normalized);

    if (existing) {
      return res.json({ success: true, message: 'You are already subscribed to executive updates!' });
    }

    subscribers.unshift({
      email: normalized,
      subscribedAt: new Date().toISOString()
    });
    writeSubscribers(subscribers);

    return res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to Shafqat Ul Mulk’s education & leadership publications.'
    });
  } catch (err: any) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Failed to record subscription.' });
  }
});

// 3. Admin: Get all inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiries = readInquiries();
    return res.json({ inquiries });
  } catch {
    return res.status(500).json({ error: 'Failed to read inquiries.' });
  }
});

// 4. Admin: Update inquiry status or notes
app.patch('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const inquiries = readInquiries();
    const item = inquiries.find((inq: any) => inq.id === id);

    if (!item) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    if (status !== undefined) item.status = status;
    if (notes !== undefined) item.notes = notes;

    writeInquiries(inquiries);
    return res.json({ success: true, inquiry: item });
  } catch {
    return res.status(500).json({ error: 'Failed to update inquiry.' });
  }
});

// 5. Admin: Delete inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    let inquiries = readInquiries();
    const initialLen = inquiries.length;
    inquiries = inquiries.filter((inq: any) => inq.id !== id);

    if (inquiries.length === initialLen) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    writeInquiries(inquiries);
    return res.json({ success: true, message: 'Inquiry removed.' });
  } catch {
    return res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

// 6. Admin: Get newsletter subscribers
app.get('/api/subscribers', (_req, res) => {
  try {
    const subscribers = readSubscribers();
    return res.json({ subscribers });
  } catch {
    return res.status(500).json({ error: 'Failed to read subscribers.' });
  }
});

// 7. AI Executive Assistant Natural Language Context & Semantic Engine
interface ChatTurn {
  role: string;
  text: string;
}

function processNaturalLanguageQuery(query: string, history?: ChatTurn[]): string {
  const q = query.trim().toLowerCase();
  const cleanQ = q.replace(/[^a-z0-9\s]/g, ' ');
  const words = cleanQ.split(/\s+/).filter(Boolean);

  // 1. Determine conversational context from recent history
  let lastTopic = '';
  if (Array.isArray(history) && history.length > 0) {
    for (let i = history.length - 1; i >= 0; i--) {
      const prevText = (history[i].text || '').toLowerCase();
      if (prevText.includes('project manager') || prevText.includes('2,000') || prevText.includes('outsourc') || prevText.includes('piu')) {
        lastTopic = 'current_role';
        break;
      } else if (prevText.includes('southampton') || prevText.includes('peshawar') || prevText.includes('degree') || prevText.includes('msc') || prevText.includes('master')) {
        lastTopic = 'education';
        break;
      } else if (prevText.includes('cae') || prevText.includes('nust') || prevText.includes('air force') || prevText.includes('paf') || prevText.includes('cadet')) {
        lastTopic = 'cae_nust';
        break;
      } else if (prevText.includes('swabi') || prevText.includes('bps-20') || prevText.includes('principal') || prevText.includes('robotics lab')) {
        lastTopic = 'swabi';
        break;
      } else if (prevText.includes('certif') || prevText.includes('covey') || prevText.includes('iso 9001')) {
        lastTopic = 'certifications';
        break;
      } else if (prevText.includes('fpga') || prevText.includes('verilog') || prevText.includes('1553') || prevText.includes('radar')) {
        lastTopic = 'technical_skills';
        break;
      }
    }
  }

  // 2. Conversational Follow-up Resolution
  const isFollowUpStart = q.includes('when did he start') || q.includes('when was he appointed') || q.includes('when did that start') || q.includes('what year did he start') || q.includes('when did it start') || q.includes('start date');
  if (isFollowUpStart) {
    if (lastTopic === 'current_role') {
      return 'He was appointed to his current position as Project Manager on 20 April 2026.';
    } else if (lastTopic === 'swabi') {
      return 'He was appointed as Principal (BPS-20) at Swabi Model School & College in September 2022.';
    } else if (lastTopic === 'cae_nust') {
      return 'He served at CAE NUST from February 2004 to November 2021, completing 17.75 years of dedicated academic and defense instruction.';
    } else if (lastTopic === 'education') {
      return 'He earned his MS in Microelectronics from the University of Southampton in 2008 and his MSc in Electronics from the University of Peshawar in 1999.';
    }
    return 'He was appointed to his present role as Project Manager on 20 April 2026, building upon over 25 years of prior academic and leadership appointments.';
  }

  const isFollowUpWhere = (q.startsWith('where') || q.includes('which city') || q.includes('which country') || q.includes('location')) && (q.includes('is that') || q.includes('was that') || q.includes('is it') || words.length <= 5);
  if (isFollowUpWhere && lastTopic) {
    if (lastTopic === 'current_role') {
      return 'The Project Implementation Unit operates under the Elementary & Secondary Education Department in Khyber Pakhtunkhwa, Pakistan, covering 2,000 schools province-wide.';
    } else if (lastTopic === 'swabi') {
      return 'Swabi Model School & College is located in Swabi, Khyber Pakhtunkhwa, Pakistan.';
    } else if (lastTopic === 'cae_nust') {
      return 'The College of Aeronautical Engineering (CAE), NUST is situated inside Pakistan Air Force Academy Asghar Khan in Risalpur, Pakistan.';
    } else if (lastTopic === 'education') {
      return 'The University of Southampton is located in the United Kingdom, and the University of Peshawar is in Khyber Pakhtunkhwa, Pakistan.';
    }
  }

  // 3. Question: Degree Video / Video Presentation
  const videoTerms = ['video', 'watch', 'clip', 'presentation', 'movie', 'showcase'];
  const asksVideo = videoTerms.some(term => q.includes(term));
  if (asksVideo) {
    return 'The website features a 58-second cinematic video showcase located prominently near the top of the page. It traces his academic journey: his MS in Microelectronics from the University of Southampton (UK), his 2nd Position merit honors in MSc Electronics from the University of Peshawar, and his readiness for new high-impact leadership opportunities.';
  }

  // 4. Question: Opportunities / Seeking Roles / Looking for Work / Readiness to Prove
  const oppTerms = ['opportunit', 'looking for', 'seeking', 'new role', 'new job', 'available for', 'ready to prove', 'hire him', 'open for', 'career goal', 'future', 'next step'];
  const asksOpportunities = oppTerms.some(term => q.includes(term));
  if (asksOpportunities) {
    return 'Engr. Shafqat Ul Mulk is actively seeking new high-impact leadership, institutional turnaround, academic management, and strategic advisory opportunities. He is eager to bring his 25+ years of proven defense engineering rigor and government reform leadership to forward-looking organizations, where he is fully committed to proving his capabilities and delivering transformational results.';
  }

  // 5. Question: Education / Degrees / Universities / Studies
  const educationTerms = ['degree', 'degrees', 'education', 'study', 'studied', 'university', 'universities', 'college', 'master', 'masters', 'bachelor', 'bachelors', 'southampton', 'peshawar', 'msc', 'bsc', 'phd', 'doctorate', 'academic qualification', 'academic qualifications', 'graduated', 'graduation', 'schooling', 'alumni', 'alma mater'];
  const asksEducation = educationTerms.some(term => q.includes(term)) || (q.includes('where') && (q.includes('study') || q.includes('learn') || q.includes('graduate')));
  if (asksEducation) {
    if (q.includes('phd') || q.includes('doctorate')) {
      return 'Shafqat Ul Mulk holds two Master’s degrees: an MS in Microelectronics & Systems Design from the University of Southampton (UK) and an MSc in Electronics from the University of Peshawar. He does not hold a PhD.';
    }
    if (q.includes('southampton')) {
      return 'He earned a Master of Science (MS) in Microelectronics & System Design from the University of Southampton, United Kingdom, graduating in 2008 with a specialization in advanced microelectronics architectures and embedded systems.';
    }
    if (q.includes('peshawar')) {
      return 'He earned his MSc in Electronics from the University of Peshawar in 1999, securing 2nd Position in the entire University for academic excellence. He also completed his BSc in Computer Science, Physics & Mathematics there in 1996.';
    }
    return 'Engr. Shafqat Ul Mulk holds an MS in Microelectronics & System Design (2008) from the University of Southampton, United Kingdom. He previously completed an MSc in Electronics (1999) from the University of Peshawar, securing 2nd Position in the entire University, preceded by a BSc in Computer Science, Physics & Mathematics (1996).';
  }

  // 4. Question: Current Role / Present Position / Job Now / 2,000 Schools
  const currentRoleTerms = ['current job', 'current role', 'current position', 'present role', 'present job', 'present position', 'now working', 'work now', 'what does he do now', 'what is he doing now', 'currently do', 'current appointment', 'project manager', '2000', '2,000', 'outsourcing', 'piu', 'school reform', 'elementary', 'schools'];
  const asksCurrentRole = currentRoleTerms.some(term => q.includes(term)) || (q.includes('current') && (q.includes('work') || q.includes('job') || q.includes('role') || q.includes('title')));
  if (asksCurrentRole) {
    return 'Shafqat Ul Mulk is currently serving as Project Manager at the Project Implementation Unit (PIU) for the Outsourcing of Low Performing Government Schools, under the Elementary & Secondary Education Department, Government of Khyber Pakhtunkhwa (appointed 20 April 2026). In this role, he leads the province-wide transformation of 2,000 government schools, establishing rigorous KPIs with partner organizations to accelerate student enrollment and raise classroom learning outcomes.';
  }

  // 5. Question: College of Aeronautical Engineering (CAE), NUST / PAF Academy
  const nustTerms = ['nust', 'cae', 'aeronautical', 'air force', 'paf', 'cadet', 'cadets', 'saudi', 'jordan', 'jordanian', 'tri services', 'tri-services', 'risalpur', 'asghar khan', 'military'];
  const asksNust = nustTerms.some(term => q.includes(term));
  if (asksNust) {
    return 'He served for 17.75 years (February 2004 – November 2021) as Assistant Professor of Avionics & Embedded Systems at the College of Aeronautical Engineering (CAE), NUST, located inside Pakistan Air Force Academy Asghar Khan in Risalpur. He delivered specialized instruction to Pakistan tri-services officers (PAF, Army, Navy) and international flight cadets from the Royal Saudi Air Force and Royal Jordanian Air Force in subjects including MIL-STD-1553, FPGA, Verilog, and radar signal processing, while also serving as ISO 9001 Coordinator.';
  }

  // 6. Question: Swabi Model School & College / Principal / Turnaround
  const swabiTerms = ['swabi', 'principal', 'bps 20', 'bps-20', 'model school', 'model college', 'turnaround', 'robotics lab', 'robotics laboratory'];
  const asksSwabi = swabiTerms.some(term => q.includes(term));
  if (asksSwabi) {
    return 'From September 2022, he served as Principal (BPS-20) at Swabi Model School & College under the Elementary & Secondary Education Department. He spearheaded an institutional turnaround, established the institution’s first dedicated Robotics & Artificial Intelligence Lab for STEM integration, and instituted KPI-based faculty evaluation systems.';
  }

  // 7. Question: Major Achievements / Accomplishments / Impact
  const achievementTerms = ['achievement', 'achievements', 'accomplishment', 'accomplishments', 'milestone', 'milestones', 'impact', 'proudest', 'key success'];
  const asksAchievements = achievementTerms.some(term => q.includes(term));
  if (asksAchievements) {
    return 'His key professional achievements include leading the province-wide reform of 2,000 government schools as Project Manager, serving 17.75 years at CAE NUST training Pakistan and allied international air force cadets, orchestrating the turnaround of Swabi Model College as BPS-20 Principal with a modern Robotics & AI Lab, and graduating 2nd across the entire University of Peshawar for his MSc in Electronics.';
  }

  // 8. Question: Certifications & Diplomas
  const certTerms = ['certification', 'certifications', 'certificate', 'certificates', 'diploma', 'diplomas', 'accreditation', 'covey', 'franklin', 'iso', 'obe', 'pec'];
  const asksCertifications = certTerms.some(term => q.includes(term));
  if (asksCertifications) {
    return 'He holds an International Diploma in Educational Leadership from FranklinCovey (2023), ISO 9001:2015 Internal Auditor certification from iPS (United Kingdom), Outcome-Based Education (OBE) Certification from the Pakistan Engineering Council (PEC), and Military Teaching Methodology certifications from the PAF College of Education.';
  }

  // 9. Question: Technical Skills / Technologies / Tools
  const skillTerms = ['skill', 'skills', 'technical', 'technology', 'technologies', 'fpga', 'verilog', '1553', 'mil-std', 'radar', 'dsp', 'hardware', 'embedded', 'plc', 'programming', 'tools'];
  const asksSkills = skillTerms.some(term => q.includes(term));
  if (asksSkills) {
    return 'His technical expertise centers on aerospace and embedded electronics: FPGA design (Xilinx, Altera), Verilog HDL, MIL-STD-1553 Avionics Data Bus architecture, Digital Signal Processing (DSP) for radar applications, ModelSim, System-C, microcontrollers, high-reliability PCB design, and industrial PLC automation.';
  }

  // 10. Question: Languages Spoken
  const langTerms = ['language', 'languages', 'speak', 'spoken', 'fluent', 'english', 'urdu', 'pashto', 'arabic'];
  const asksLanguages = langTerms.some(term => q.includes(term));
  if (asksLanguages) {
    return 'Shafqat Ul Mulk is fluent in English (used for technical and military higher education instruction), native in Pashto and Urdu, and has basic to improving proficiency in Arabic.';
  }

  // 11. Question: Contact Information / Hiring / Reach Out
  const contactTerms = ['contact', 'hire', 'phone', 'whatsapp', 'email', 'number', 'reach', 'talk to him', 'call', 'message', 'address', 'living', 'reside', 'located', 'location'];
  const asksContact = contactTerms.some(term => q.includes(term));
  if (asksContact) {
    return 'You can contact Engr. Shafqat Ul Mulk directly on WhatsApp or mobile at +92 323 9215615, or via email at ssumulk@gmail.com. He is located in Nowshera, Khyber Pakhtunkhwa, Pakistan, and is open for academic leadership, institutional turnaround, and consulting engagements.';
  }

  // 12. Question: Experience Years / Professional Overview
  const overviewTerms = ['who is', 'overview', 'bio', 'biography', 'about him', 'introduce', 'summary', 'background', 'experience', 'career', 'years'];
  const asksOverview = overviewTerms.some(term => q.includes(term));
  if (asksOverview) {
    return 'Engr. Shafqat Ul Mulk is an accomplished academic leader, project manager, and avionics educator with over 25 years of experience across higher education, military academies, and public sector governance. He currently serves as Project Manager for the outsourcing and reform of 2,000 government schools in Khyber Pakhtunkhwa.';
  }

  // 13. Fallback for unverified or ungrounded questions
  return 'I don\'t have verified information about that in Shafqat Ul Mulk\'s professional profile. You can ask about his degrees, his 17.75 years at CAE NUST, his current role with 2,000 government schools, his certifications, or his technical skills.';
}

const SHAFQAT_BIO_PROMPT = `
You are the dedicated Executive AI Career & Advisory Assistant for Engr. Shafqat Ul Mulk.
Your mission is to provide authoritative, articulate, and highly comprehensive answers to any questions about his 25+ years of distinguished experience, qualifications, achievements, and leadership roles.

CRITICAL INSTRUCTION - ANSWER EVERY QUESTION THOROUGHLY:
- Always answer the user's specific question directly, thoroughly, and factually using his verified CV data below.
- NEVER deflect the conversation or simply say "contact on WhatsApp" instead of answering. 
- If the user asks about his education, explain his MS from University of Southampton (UK) and MSc Electronics from University of Peshawar (2nd Position in University).
- If the user asks about his current role, detail his position as Project Manager for the Outsourcing of 2,000 Government Schools under the Elementary & Secondary Education Department.
- If the user asks about avionics, radar, or defense teaching, explain his 17.75 years at College of Aeronautical Engineering (CAE) NUST at PAF Academy Asghar Khan training tri-services (PAF, Army, Navy) and Royal Saudi & Jordanian Air Force cadets in MIL-STD-1553, FPGA, and radar DSP.
- If the user asks about Swabi Model School, explain his BPS-20 Principal turnaround, Robotics & AI Lab setup, and KPI evaluation.
- If the user asks about certifications, detail FranklinCovey, ISO 9001:2015, and PEC OBE.
- If the user asks about technical skills, list FPGA, Verilog, MIL-STD-1553, Radar DSP, etc.
- If the user asks about languages, detail English, Pashto, Urdu, Arabic.
- Only at the very end of your detailed answer, if appropriate, mention that he is available for executive consulting via ssumulk@gmail.com or WhatsApp +92 323 9215615.

CORE VERIFIED PROFILE FACTS:
- Full Name: Engr. Shafqat Ul Mulk
- Title: Academic Leader | Project Manager | Principal | Avionics & Embedded Systems Educator
- Total Experience: Over 25 years across higher engineering education, military academies, public school administration, and government reform.
- Current Role (Appointed 20 April 2026 – Present):
  Project Manager, Project Implementation Unit (PIU), Outsourcing of Low Performing Government Schools, Elementary & Secondary Education Department, Khyber Pakhtunkhwa. Overseeing 2,000 schools outsourced to private/NGO partners with rigorous KPIs and enrollment goals.
- Previous Major Appointments:
  * Principal (BPS-20), Swabi Model School & College (Sept 2022 – 2026): Led comprehensive institutional turnaround, built modern Robotics & AI Lab, instituted KPI-based faculty evaluation.
  * Assistant Professor – Avionics & Embedded Systems, College of Aeronautical Engineering (CAE), National University of Sciences and Technology (NUST), PAF Academy Asghar Khan (Feb 2004 – Nov 2021, 17.75 years): Trained Pakistan tri-services and international Royal Saudi & Jordanian Air Force cadets in MIL-STD-1553, FPGA, Verilog, Radar DSP, Microelectronics. Served as ISO 9001 Coordinator and Outcome-Based Education (OBE) leader.
  * Lecturer, COMSATS University Islamabad (Jan 2001 – Feb 2004): Established VLSI & Microelectronics Lab.
  * Electronics Service Engineer, Pakistan Tobacco Company (June 1999 – Jan 2001): High-speed automation and PLCs.
- Education:
  * MS in Microelectronics & System Design – University of Southampton, UK (2008)
  * MSc in Electronics – University of Peshawar (1999) [2nd Position in University]
  * BSc in Computer Science, Physics & Mathematics (1996)
- Certifications:
  * International Diploma in Educational Leadership – FranklinCovey (2023)
  * ISO 9001:2015 Internal Auditor – iPS, UK
  * Outcome-Based Education (OBE) Certification – Pakistan Engineering Council (PEC)
  * Military Teaching Methodology – PAF College of Education
- Technical Skills: FPGA (Xilinx, Altera), Verilog HDL, MIL-STD-1553 Avionics Data Bus, Radar Digital Signal Processing, Embedded Systems, Microelectronics, System-on-Chip, PLCs.
- Languages: English (Fluent), Pashto (Native), Urdu (Native), Arabic (Basic/Improving).
- Location: Nowshera, Khyber Pakhtunkhwa, Pakistan. Contact: ssumulk@gmail.com, +92 323 9215615.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackReply = processNaturalLanguageQuery(message, history);
      return res.json({ reply: fallbackReply });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Format conversation history for Gemini
      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const turn of history.slice(-6)) {
          if (turn.role && turn.text) {
            contents.push({
              role: turn.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: turn.text }]
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SHAFQAT_BIO_PROMPT,
          temperature: 0.25,
          maxOutputTokens: 800,
        }
      });

      const reply = response.text?.trim() || processNaturalLanguageQuery(message, history);
      return res.json({ reply });
    } catch {
      // If Gemini API throws (e.g. 403 or network issue), seamlessly ground response in verified profile data
      const fallbackReply = processNaturalLanguageQuery(message, history);
      return res.json({ reply: fallbackReply });
    }
  } catch (err: any) {
    console.error('Chatbot route error:', err?.message || err);
    const fallbackReply = processNaturalLanguageQuery(req.body?.message || '', req.body?.history);
    return res.json({ reply: fallbackReply });
  }
});

// ----------------------------------------------------
// PHOTO UPLOAD ROUTE (Direct user photo upload, zero alterations)
// ----------------------------------------------------
app.post('/api/upload-photo', (req, res) => {
  try {
    const { image } = req.body;
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const publicImagesDir = path.join(PUBLIC_DIR, 'images');
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }
    const publicImagePath = path.join(publicImagesDir, 'shafqat_portrait.jpg');
    fs.writeFileSync(publicImagePath, buffer);

    const srcImagesDir = path.join(__dirname, 'src', 'assets', 'images');
    if (fs.existsSync(srcImagesDir)) {
      const srcImagePath = path.join(srcImagesDir, 'shafqat_ul_mulk_portrait_1791086611736.jpg');
      fs.writeFileSync(srcImagePath, buffer);
      fs.writeFileSync(path.join(srcImagesDir, 'shafqat_portrait.jpg'), buffer);
    }

    const distImagesDir = path.join(__dirname, 'dist', 'images');
    if (fs.existsSync(distImagesDir)) {
      fs.writeFileSync(path.join(distImagesDir, 'shafqat_portrait.jpg'), buffer);
    }

    return res.json({
      success: true,
      message: 'Original photo saved successfully with zero modifications',
      url: '/images/shafqat_portrait.jpg'
    });
  } catch (error: any) {
    console.error('Error saving uploaded photo:', error);
    return res.status(500).json({ error: 'Failed to save photo' });
  }
});

// ----------------------------------------------------
// VITE INTEGRATION / STATIC SERVING
// ----------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shafqat Ul Mulk Executive Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
