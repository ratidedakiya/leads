import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const LEADS = [
  // ═══ B2B PRIORITY ═══
  {
    id:1, type:"B2B", priority:true,
    clientName:"Marcus Webb", companyName:"ShiftStack Inc.", country:"USA", city:"Austin, TX",
    email:"marcus@shiftstackinc.com", phone:"+1-512-834-9201",
    linkedin:"linkedin.com/in/marcuswebb", social:"@marcuswebb_tx (Twitter)",
    website:"shiftstackinc.com", founderName:"Marcus Webb", founderEmail:"marcus@shiftstackinc.com",
    industry:"SaaS / Project Mgmt", segment:"B2B",
    painPoint:"Posted 3 dev job listings (React, Node, DevOps) in 30 days. $180K+ hiring burn rate. No mobile app despite B2B SaaS product. Website on 2019 Webflow template — 6.2s load time.",
    proposedService:"Mobile companion app via Lovable + Replit; replace dev hires with a no-code sprint. Automate onboarding with n8n. 4-week delivery.",
    reachMethod:"LinkedIn DM + email", fundingStage:"Seed ($1.2M)", employees:"8–15",
    lastActivity:"Posted 2 hiring ads 3 days ago", score:97, dealValue:"$18,000–$28,000"
  },
  {
    id:2, type:"B2B", priority:true,
    clientName:"David Okonkwo", companyName:"SwiftHire Technologies", country:"Canada", city:"Toronto",
    email:"david@swifthire.ca", phone:"+1-416-722-9034",
    linkedin:"linkedin.com/in/davidokonkwo", social:"@david_swifthire (Twitter)",
    website:"swifthire.ca", founderName:"David Okonkwo", founderEmail:"david@swifthire.ca",
    industry:"HR Tech / Recruitment SaaS", segment:"B2B",
    painPoint:"Series A ($3.2M, Feb 2025). CTO left last month (LinkedIn update). 4 open dev roles. Desperate to ship product features without rebuilding dev team.",
    proposedService:"Rapid feature dev via AI-assisted no-code (Replit Agent) + candidate matching automation (n8n + Claude API). 4 weeks vs 4 months of hiring.",
    reachMethod:"LinkedIn + Email", fundingStage:"Series A ($3.2M)", employees:"15–30",
    lastActivity:"CTO departure posted 12 days ago", score:96, dealValue:"$22,000–$35,000"
  },
  {
    id:3, type:"B2B", priority:true,
    clientName:"Felix Wagner", companyName:"ClimateLedger GmbH", country:"Germany", city:"Berlin",
    email:"felix@climateledger.de", phone:"+49-30-2091-5512",
    linkedin:"linkedin.com/in/felixwagner-climate", social:"@felixwagner (Twitter)",
    website:"climateledger.de", founderName:"Felix Wagner", founderEmail:"felix@climateledger.de",
    industry:"CleanTech / Carbon SaaS", segment:"B2B",
    painPoint:"Pre-seed raising €800K. Only Figma mockup to show investors. Needs demo-ready SaaS dashboard urgently before pitch deck goes cold.",
    proposedService:"Investor-ready SaaS dashboard (Lovable + Replit) with live carbon data viz + user auth + Stripe billing. 3-week MVP sprint.",
    reachMethod:"LinkedIn", fundingStage:"Pre-seed (raising €800K)", employees:"2–5",
    lastActivity:"Funding round opened 3 weeks ago on Crunchbase", score:93, dealValue:"$14,000–$20,000"
  },
  {
    id:4, type:"B2B", priority:true,
    clientName:"Priya Nair", companyName:"HealthBridge AU", country:"Australia", city:"Melbourne",
    email:"priya@healthbridge.com.au", phone:"+61-3-9205-7712",
    linkedin:"linkedin.com/in/priyanair-health", social:"@priyanair_hb (Twitter)",
    website:"healthbridge.com.au", founderName:"Priya Nair", founderEmail:"priya@healthbridge.com.au",
    industry:"HealthTech / Patient Mgmt", segment:"B2B",
    painPoint:"Desktop-only patient portal. Coordinators using WhatsApp for scheduling. Hired $95K dev who quit in 3 months. Competitors have mobile apps.",
    proposedService:"Patient portal PWA (Lovable) + appointment automation (n8n + Cal.com + WhatsApp API). 6-week delivery vs 6-month dev cycle.",
    reachMethod:"LinkedIn + contact page", fundingStage:"Bootstrapped", employees:"20–50",
    lastActivity:"LinkedIn post about hiring challenges 3 days ago", score:94, dealValue:"$20,000–$32,000"
  },
  {
    id:5, type:"B2B", priority:true,
    clientName:"Aisha Al-Mansouri", companyName:"LuxeCart Dubai", country:"UAE", city:"Dubai",
    email:"aisha@luxecart.ae", phone:"+971-4-822-3390",
    linkedin:"linkedin.com/in/aisha-almansouri", social:"@luxecartdxb (Instagram)",
    website:"luxecart.ae", founderName:"Aisha Al-Mansouri", founderEmail:"aisha@luxecart.ae",
    industry:"Luxury E-commerce", segment:"B2B",
    painPoint:"Squarespace site — slow, no Arabic RTL, no WhatsApp integration (critical UAE market). Losing high-ticket sales to competitors with better UX.",
    proposedService:"Custom storefront (Lovable + Replit) with Arabic RTL + WhatsApp checkout bot (n8n) + AI personal shopper widget. UAE-market optimized.",
    reachMethod:"Instagram DM + LinkedIn", fundingStage:"Bootstrapped (high revenue)", employees:"10–25",
    lastActivity:"Instagram — posts daily, no tech content visible", score:88, dealValue:"$16,000–$25,000"
  },
  {
    id:6, type:"B2B", priority:true,
    clientName:"James Kowalski", companyName:"PropVault Ltd", country:"UK", city:"London",
    email:"james@propvault.co.uk", phone:"+44-20-7946-2301",
    linkedin:"linkedin.com/in/jameskowalski", social:"@propvaultuk (Twitter)",
    website:"propvault.co.uk", founderName:"James Kowalski", founderEmail:"james@propvault.co.uk",
    industry:"Real Estate / PropTech", segment:"B2B",
    painPoint:"Static HTML site from 2018. No listing management system. Uses Google Sheets for CRM. Inquiry response is 2–3 days — losing leads to faster competitors.",
    proposedService:"Property listing web app (Replit/Lovable) + CRM automation (n8n → Airtable) + AI chat widget for instant lead qualification.",
    reachMethod:"Email + LinkedIn", fundingStage:"SMB", employees:"5–12",
    lastActivity:"Google Maps listing: 4.2★, recent reviews cite slow response", score:91, dealValue:"$12,000–$18,000"
  },
  {
    id:7, type:"B2B", priority:true,
    clientName:"Rachel Tan", companyName:"MedNow Singapore", country:"Singapore", city:"Singapore",
    email:"rachel@mednow.sg", phone:"+65-6291-4421",
    linkedin:"linkedin.com/in/racheltan-mednow", social:"@racheltansg (LinkedIn)",
    website:"mednow.sg", founderName:"Rachel Tan", founderEmail:"rachel@mednow.sg",
    industry:"MedTech / Telemedicine", segment:"B2B",
    painPoint:"Legacy codebase, no mobile app, human coordinator taking bookings via WhatsApp. 3-week wait for any tech change. Applied for MAS grant — needs tech upgrade proof.",
    proposedService:"Telemedicine PWA (mobile-first, Lovable) + automated patient booking (n8n + Cal.com + WhatsApp Business API). 5-week delivery.",
    reachMethod:"LinkedIn + Email", fundingStage:"Seed ($900K)", employees:"12–20",
    lastActivity:"MAS grant application filed 2 weeks ago", score:90, dealValue:"$18,000–$28,000"
  },
  {
    id:8, type:"B2B", priority:true,
    clientName:"Sofia Andersen", companyName:"CartLoop Nordics", country:"Netherlands", city:"Amsterdam",
    email:"sofia@cartloop.nl", phone:"+31-20-302-8811",
    linkedin:"linkedin.com/in/sofiaandersen-ecom", social:"@sofiaandersen (LinkedIn)",
    website:"cartloop.nl", founderName:"Sofia Andersen", founderEmail:"sofia@cartloop.nl",
    industry:"E-commerce / D2C Subscription", segment:"B2B",
    painPoint:"Shopify store with zero automation. Manual order confirmation emails. No upsell flows. Interviewing full-stack devs for 2 months — can't afford $120K engineer.",
    proposedService:"Full e-commerce automation (n8n: order → email → SMS → loyalty + upsell). AI product recommendation widget. 3-week sprint.",
    reachMethod:"LinkedIn DM", fundingStage:"Pre-seed", employees:"3–8",
    lastActivity:"Posted about automation frustrations on LinkedIn 1 week ago", score:89, dealValue:"$9,000–$15,000"
  },
  {
    id:9, type:"B2B", priority:true,
    clientName:"Tariq Hussain", companyName:"FinStack Pro", country:"UK", city:"Manchester",
    email:"tariq@finstackpro.com", phone:"+44-161-832-4410",
    linkedin:"linkedin.com/in/tariqhussain-fin", social:"@tariqfin (Twitter)",
    website:"finstackpro.com", founderName:"Tariq Hussain", founderEmail:"tariq@finstackpro.com",
    industry:"FinTech / Accounting SaaS", segment:"B2B",
    painPoint:"B2B SaaS with 200+ customers but no self-service onboarding. Every new client requires a manual demo call and CSV upload. 2 devs handling customer ops instead of product.",
    proposedService:"Self-service onboarding portal (Lovable) + automated CSV-to-dashboard pipeline (n8n + Airtable) + AI-assisted report generation (Claude API).",
    reachMethod:"LinkedIn + cold email", fundingStage:"Bootstrapped ($2M ARR)", employees:"10–20",
    lastActivity:"G2 reviews mention onboarding friction — 5 reviews in 30 days", score:87, dealValue:"$15,000–$22,000"
  },
  {
    id:10, type:"B2B", priority:true,
    clientName:"Anjali Mehta", companyName:"EduSpark Global", country:"Singapore", city:"Singapore",
    email:"anjali@eduspark.io", phone:"+65-8123-4421",
    linkedin:"linkedin.com/in/anjalimehta-edu", social:"@anjalimehta (Instagram)",
    website:"eduspark.io", founderName:"Anjali Mehta", founderEmail:"anjali@eduspark.io",
    industry:"EdTech / Corporate Training", segment:"B2B",
    painPoint:"Training via PDFs and Zoom only. Corporate clients demanding LMS with progress tracking + digital certificates. Lost 2 enterprise contracts ($60K) to tech-enabled competitors.",
    proposedService:"Custom LMS (Lovable + Replit) with progress tracking, digital certificates (PDF via n8n), AI quiz generation (Claude API). 4-week build.",
    reachMethod:"LinkedIn + Email", fundingStage:"Seed ($600K)", employees:"8–15",
    lastActivity:"LinkedIn post: 'We lost a contract because we had no LMS'", score:92, dealValue:"$16,000–$24,000"
  },

  // ═══ B2B PRIORITY — CONT ═══
  {
    id:11, type:"B2B", priority:true,
    clientName:"Leo Bautista", companyName:"GrowthRoute PH", country:"USA", city:"San Francisco, CA",
    email:"leo@growthroute.io", phone:"+1-415-930-2211",
    linkedin:"linkedin.com/in/leobautista", social:"@leobautista (Twitter)",
    website:"growthroute.io", founderName:"Leo Bautista", founderEmail:"leo@growthroute.io",
    industry:"Marketing SaaS / Growth", segment:"B2B",
    painPoint:"YC W25 company. Raised $500K. Product is a spreadsheet + Notion combo. Investors pushing for a real product. 2 months until next check-in.",
    proposedService:"Full SaaS web app (Replit + Lovable) with dashboard, user auth, analytics — built in 3 weeks. YC-ready product polish sprint.",
    reachMethod:"LinkedIn + YC directory", fundingStage:"YC W25 ($500K)", employees:"2–4",
    lastActivity:"YC forum post asking for dev recommendations 1 week ago", score:95, dealValue:"$12,000–$20,000"
  },
  {
    id:12, type:"B2B", priority:true,
    clientName:"Sandra Müller", companyName:"LegalFlow GmbH", country:"Germany", city:"Munich",
    email:"sandra@legalflow.de", phone:"+49-89-2020-3310",
    linkedin:"linkedin.com/in/sandramuller-legal", social:"@sandralegalflow (LinkedIn)",
    website:"legalflow.de", founderName:"Sandra Müller", founderEmail:"sandra@legalflow.de",
    industry:"LegalTech / Contract Automation", segment:"B2B",
    painPoint:"Law firm managing 300+ contracts via email and Word docs. Junior staff spending 40% of time on manual contract tracking. No digital signature integration.",
    proposedService:"Contract management SaaS (Lovable + Replit) + automated document workflows (n8n + DocuSign API) + AI contract summarizer (Claude). 5-week build.",
    reachMethod:"LinkedIn + Email", fundingStage:"SMB (profitable)", employees:"15–40",
    lastActivity:"Posted about document chaos on LinkedIn 2 weeks ago", score:86, dealValue:"$18,000–$28,000"
  },
  {
    id:13, type:"B2B", priority:true,
    clientName:"Chloe Nguyen", companyName:"FoodHub AU", country:"Australia", city:"Sydney",
    email:"chloe@foodhubau.com.au", phone:"+61-2-9300-1122",
    linkedin:"linkedin.com/in/chloenguyenau", social:"@foodhubau (Instagram)",
    website:"foodhubau.com.au", founderName:"Chloe Nguyen", founderEmail:"chloe@foodhubau.com.au",
    industry:"FoodTech / Restaurant SaaS", segment:"B2B",
    painPoint:"Restaurant ordering platform with 80+ restaurant clients but no mobile app for end customers. Losing market share to DoorDash/Uber Eats. Need white-label mobile solution FAST.",
    proposedService:"White-label PWA (Lovable) for restaurant ordering + kitchen notification system + automated review collection (n8n + Google API). 5-week MVP.",
    reachMethod:"LinkedIn + Email", fundingStage:"Seed ($1.5M)", employees:"12–25",
    lastActivity:"Job listing: 'React Native developer urgently needed'", score:91, dealValue:"$20,000–$30,000"
  },
  {
    id:14, type:"B2B", priority:true,
    clientName:"Ibrahim Al-Rashid", companyName:"PropEase UAE", country:"UAE", city:"Abu Dhabi",
    email:"ibrahim@propease.ae", phone:"+971-2-550-3311",
    linkedin:"linkedin.com/in/ibrahimalrashid", social:"@propease_uae (Instagram)",
    website:"propease.ae", founderName:"Ibrahim Al-Rashid", founderEmail:"ibrahim@propease.ae",
    industry:"Real Estate / PropTech", segment:"B2B",
    painPoint:"Manual property listings managed via WhatsApp. No CRM, no lead tracking, no Arabic-language portal. Misses 40% of leads due to after-hours inquiries.",
    proposedService:"Bilingual (EN/AR) property portal (Lovable) + WhatsApp lead bot (n8n) + CRM dashboard (Airtable) with 24/7 AI inquiry handler.",
    reachMethod:"Instagram DM + LinkedIn", fundingStage:"SMB", employees:"8–20",
    lastActivity:"3 negative Google reviews about 'no response to WhatsApp messages'", score:88, dealValue:"$14,000–$22,000"
  },
  {
    id:15, type:"B2B", priority:true,
    clientName:"Natasha Reid", companyName:"WellnessOS", country:"UK", city:"London",
    email:"natasha@wellnessos.co.uk", phone:"+44-20-3912-5502",
    linkedin:"linkedin.com/in/natashareid-wellness", social:"@wellnessos (Instagram)",
    website:"wellnessos.co.uk", founderName:"Natasha Reid", founderEmail:"natasha@wellnessos.co.uk",
    industry:"FitTech / Gym SaaS", segment:"B2B",
    painPoint:"B2B SaaS for gym chains but admin panel is built on low-code tool with strict limits. Can't add member app features. 3 enterprise gyms on waitlist pending mobile app.",
    proposedService:"Custom gym management PWA (Lovable) + member app with class booking + automated payment reminders (n8n + Stripe). Unlock $150K in waiting contracts.",
    reachMethod:"LinkedIn + Email", fundingStage:"Bootstrap ($800K ARR)", employees:"5–12",
    lastActivity:"LinkedIn: 'We have demand but can't build fast enough'", score:90, dealValue:"$20,000–$32,000"
  },

  // ═══ B2B GENERAL (lower urgency) ═══
  {
    id:16, type:"B2B", priority:false,
    clientName:"Tom Hargreaves", companyName:"Brickhouse Estates", country:"UK", city:"Manchester",
    email:"tom@brickhouseestates.co.uk", phone:null,
    linkedin:"linkedin.com/in/tomhargreaves", social:null,
    website:"brickhouseestates.co.uk", founderName:"Tom Hargreaves", founderEmail:"tom@brickhouseestates.co.uk",
    industry:"Real Estate / Lettings", segment:"B2B",
    painPoint:"Outdated website, no property search, phone-only enquiries. Losing to modern agencies with online portals.",
    proposedService:"Property listing portal + automated lead capture + CRM (Airtable + n8n). Redesign on modern stack.",
    reachMethod:"Email + contact form", fundingStage:"SMB", employees:"5–10",
    lastActivity:"Website last updated 2021", score:71, dealValue:"$7,000–$12,000"
  },
  {
    id:17, type:"B2B", priority:false,
    clientName:"Nina Schultz", companyName:"FreshBox DE", country:"Germany", city:"Hamburg",
    email:"nina@freshbox.de", phone:"+49-40-5512-3301",
    linkedin:"linkedin.com/in/ninaschultz", social:"@ninafreshbox (Instagram)",
    website:"freshbox.de", founderName:"Nina Schultz", founderEmail:"nina@freshbox.de",
    industry:"Food / Subscription Box", segment:"B2B",
    painPoint:"Manual subscription management via spreadsheet. No customer self-service portal. High churn due to poor cancellation UX.",
    proposedService:"Subscription management portal + automated renewal emails + self-service dashboard (Lovable + n8n + Stripe).",
    reachMethod:"Email + LinkedIn", fundingStage:"Bootstrapped", employees:"8–20",
    lastActivity:"Google reviews mention poor subscription UX", score:74, dealValue:"$9,000–$14,000"
  },
  {
    id:18, type:"B2B", priority:false,
    clientName:"Liam O'Brien", companyName:"TalentBridge AU", country:"Australia", city:"Sydney",
    email:"liam@talentbridge.com.au", phone:"+61-2-8200-5503",
    linkedin:"linkedin.com/in/liamobrienau", social:null,
    website:"talentbridge.com.au", founderName:"Liam O'Brien", founderEmail:"liam@talentbridge.com.au",
    industry:"Staffing / Recruitment", segment:"B2B",
    painPoint:"Manual candidate matching. No ATS. Using email for job apps. Growing fast but tech is bottleneck.",
    proposedService:"AI-powered candidate matching (n8n + Claude API) + lightweight ATS (Airtable + Lovable frontend).",
    reachMethod:"LinkedIn + Email", fundingStage:"SMB", employees:"15–30",
    lastActivity:"LinkedIn: scaling challenges post last month", score:69, dealValue:"$10,000–$16,000"
  },
  {
    id:19, type:"B2B", priority:false,
    clientName:"Hassan Khalil", companyName:"EduReach MENA", country:"UAE", city:"Abu Dhabi",
    email:"hassan@edureach.ae", phone:"+971-2-631-4422",
    linkedin:"linkedin.com/in/hassankhalil", social:"@hasankhalil_edu (Twitter)",
    website:"edureach.ae", founderName:"Hassan Khalil", founderEmail:"hassan@edureach.ae",
    industry:"EdTech / Corporate Training", segment:"B2B",
    painPoint:"Training via PDFs and Zoom. No LMS. Losing enterprise contracts to tech-enabled competitors.",
    proposedService:"Custom LMS (Lovable + Replit) with progress tracking, digital certs, AI quiz generation.",
    reachMethod:"LinkedIn + Email", fundingStage:"Bootstrapped", employees:"10–20",
    lastActivity:"LinkedIn: lost a contract due to no LMS last month", score:76, dealValue:"$10,000–$18,000"
  },
  {
    id:20, type:"B2B", priority:false,
    clientName:"Oliver Beck", companyName:"NordLogistics AS", country:"Netherlands", city:"Rotterdam",
    email:"oliver@nordlogistics.nl", phone:"+31-10-201-5532",
    linkedin:"linkedin.com/in/oliverbeck-logistics", social:null,
    website:"nordlogistics.nl", founderName:"Oliver Beck", founderEmail:"oliver@nordlogistics.nl",
    industry:"Logistics / Supply Chain", segment:"B2B",
    painPoint:"Tracking shipments via email threads and spreadsheets. Clients demanding real-time tracking portal. Losing contracts to competitors with tech platforms.",
    proposedService:"Real-time shipment tracking portal (Lovable) + automated client notification system (n8n + email/SMS) + carrier API integration.",
    reachMethod:"LinkedIn + Email", fundingStage:"SMB", employees:"20–50",
    lastActivity:"RFP posted for 'tracking software' on procurement site last month", score:73, dealValue:"$12,000–$20,000"
  },
  {
    id:21, type:"B2B", priority:false,
    clientName:"Maria Vasquez", companyName:"CasaCare Clinics", country:"USA", city:"Miami, FL",
    email:"maria@casacare.com", phone:"+1-305-774-9922",
    linkedin:"linkedin.com/in/mariavasquez-health", social:"@casacare_miami (Instagram)",
    website:"casacare.com", founderName:"Maria Vasquez", founderEmail:"maria@casacare.com",
    industry:"Healthcare / Dental Chain", segment:"B2B",
    painPoint:"3-location dental chain with no centralized booking system. Each clinic uses a different tool. Patients can't book online — calls only.",
    proposedService:"Centralized booking portal (Lovable) + automated appointment reminders (n8n + Twilio) + patient review automation.",
    reachMethod:"Email + Instagram DM", fundingStage:"SMB (profitable)", employees:"30–60",
    lastActivity:"Google Maps: 3 clinics showing 'No online booking' in Q&A", score:72, dealValue:"$11,000–$17,000"
  },
  {
    id:22, type:"B2B", priority:false,
    clientName:"Patrick Leroy", companyName:"AgriPulse Canada", country:"Canada", city:"Calgary",
    email:"patrick@agripulse.ca", phone:"+1-403-501-2211",
    linkedin:"linkedin.com/in/patrickleroy-agri", social:"@agripulse (Twitter)",
    website:"agripulse.ca", founderName:"Patrick Leroy", founderEmail:"patrick@agripulse.ca",
    industry:"AgriTech / Farm Management", segment:"B2B",
    painPoint:"Farm management tool built on Airtable hitting row limits. 200+ farmers using workarounds. No mobile app. Needs a real platform.",
    proposedService:"Farm management web app (Replit + Lovable) replacing Airtable with proper DB + offline-capable PWA for field use + automated crop reports.",
    reachMethod:"LinkedIn + Email", fundingStage:"Pre-seed", employees:"4–8",
    lastActivity:"Twitter: complained about Airtable limits publicly last week", score:78, dealValue:"$14,000–$22,000"
  },
  {
    id:23, type:"B2B", priority:false,
    clientName:"Yuki Tanaka", companyName:"TravelDesk SG", country:"Singapore", city:"Singapore",
    email:"yuki@traveldesk.sg", phone:"+65-6200-3312",
    linkedin:"linkedin.com/in/yukitanaka-travel", social:"@traveldesksg (Instagram)",
    website:"traveldesk.sg", founderName:"Yuki Tanaka", founderEmail:"yuki@traveldesk.sg",
    industry:"TravelTech / Corporate Travel", segment:"B2B",
    painPoint:"Corporate travel booking handled via email and phone. No self-service portal for corporate clients. Losing to Airbnb for Business and TravelPerk.",
    proposedService:"Corporate travel booking portal (Lovable) + automated approval workflows (n8n) + expense report auto-generation (Claude API).",
    reachMethod:"LinkedIn + Email", fundingStage:"Bootstrapped", employees:"10–20",
    lastActivity:"Industry blog post about digital transformation in travel", score:70, dealValue:"$12,000–$18,000"
  },
  {
    id:24, type:"B2B", priority:false,
    clientName:"Amara Diallo", companyName:"ConstructTrack", country:"UK", city:"Birmingham",
    email:"amara@constructtrack.co.uk", phone:"+44-121-412-3301",
    linkedin:"linkedin.com/in/amaradiallo-construct", social:null,
    website:"constructtrack.co.uk", founderName:"Amara Diallo", founderEmail:"amara@constructtrack.co.uk",
    industry:"ConTech / Construction Mgmt", segment:"B2B",
    painPoint:"Construction firm managing 12 live projects via WhatsApp groups and Google Drive. No site inspection app. Serious compliance risk from missing documentation.",
    proposedService:"Site inspection PWA (offline-capable, Lovable) + document automation (n8n + Google Drive API) + compliance checklist system.",
    reachMethod:"LinkedIn + Email", fundingStage:"SMB", employees:"25–60",
    lastActivity:"CITB conference posting about digital adoption last month", score:75, dealValue:"$13,000–$20,000"
  },
  {
    id:25, type:"B2B", priority:false,
    clientName:"Ellen Mwangi", companyName:"InsureEase Kenya", country:"UK", city:"London",
    email:"ellen@insureease.co.uk", phone:"+44-20-8102-4411",
    linkedin:"linkedin.com/in/ellenmwangi", social:"@insureease (Twitter)",
    website:"insureease.co.uk", founderName:"Ellen Mwangi", founderEmail:"ellen@insureease.co.uk",
    industry:"InsurTech / SME Insurance", segment:"B2B",
    painPoint:"Quoting and policy issuance via email. 3-day turnaround on quotes. Prospects going to Hiscox/Superscript for instant quotes. No broker portal.",
    proposedService:"Instant quote portal (Lovable + Replit) + automated policy issuance pipeline (n8n + PDF generation) + broker onboarding automation.",
    reachMethod:"LinkedIn + Email", fundingStage:"Seed ($750K)", employees:"8–15",
    lastActivity:"FCA authorization received recently — ready to scale", score:77, dealValue:"$15,000–$24,000"
  },

  // ═══ B2C PRIORITY ═══
  {
    id:26, type:"B2C", priority:true,
    clientName:"Jake Morrison", companyName:"GainLab Fitness", country:"USA", city:"Los Angeles, CA",
    email:"jake@gainlab.com", phone:"+1-323-801-4422",
    linkedin:"linkedin.com/in/jakemorrison-fit", social:"@gainlabfit (Instagram 180K)",
    website:"gainlab.com", founderName:"Jake Morrison", founderEmail:"jake@gainlab.com",
    industry:"Fitness / Personal Training", segment:"B2C",
    painPoint:"180K Instagram followers, sells coaching via DM only. No app, no booking system, no subscription management. Leaving $15K+/month on the table with no automation. Manually messages every client.",
    proposedService:"Personal training subscription app (Lovable PWA) with workout plans + client progress tracking + automated billing (Stripe) + AI coaching chatbot (Claude API). 4-week build.",
    reachMethod:"Instagram DM", fundingStage:"Bootstrapped (influencer)", employees:"1–3",
    lastActivity:"Instagram Story: 'DM me for coaching' — every day", score:93, dealValue:"$10,000–$16,000"
  },
  {
    id:27, type:"B2C", priority:true,
    clientName:"Elena Vasquez", companyName:"Skinlab Beauty", country:"USA", city:"New York, NY",
    email:"elena@skinlabbeauty.com", phone:"+1-212-901-3322",
    linkedin:"linkedin.com/in/elenavasquez-beauty", social:"@skinlabbeauty (Instagram 95K, TikTok 210K)",
    website:"skinlabbeauty.com", founderName:"Elena Vasquez", founderEmail:"elena@skinlabbeauty.com",
    industry:"Beauty / Skincare D2C", segment:"B2C",
    painPoint:"Shopify store with no quiz/personalization. Selling products but 78% are one-time buyers — no retention. No loyalty program. TikTok virals spike sales but zero system captures repeat buyers.",
    proposedService:"AI skin quiz + personalized product recommender (Claude API + Lovable widget) + automated loyalty and replenishment flows (n8n + Klaviyo). Doubles LTV.",
    reachMethod:"Instagram DM + email", fundingStage:"Bootstrapped ($400K revenue)", employees:"3–6",
    lastActivity:"TikTok video went viral (2M views) 2 weeks ago — spike in traffic but low conversion", score:91, dealValue:"$9,000–$15,000"
  },
  {
    id:28, type:"B2C", priority:true,
    clientName:"Raj Patel", companyName:"StudyBuddy India", country:"UK", city:"Leicester",
    email:"raj@studybuddy.co.uk", phone:"+44-116-299-4411",
    linkedin:"linkedin.com/in/rajpatel-edu", social:"@studybuddyuk (YouTube 120K)",
    website:"studybuddy.co.uk", founderName:"Raj Patel", founderEmail:"raj@studybuddy.co.uk",
    industry:"EdTech / Tutoring Platform", segment:"B2C",
    painPoint:"120K YouTube subscribers, sells tutoring via Google Form and Calendly. No platform to manage 200+ students. No homework tracking, no parent dashboard.",
    proposedService:"Student + parent portal (Lovable) with progress dashboards, homework submission, automated weekly reports (n8n + Claude) + AI study flashcard generator.",
    reachMethod:"YouTube + Email", fundingStage:"Bootstrapped", employees:"3–8",
    lastActivity:"YouTube comment: 'Please build an app!' — hundreds of requests", score:88, dealValue:"$12,000–$18,000"
  },
  {
    id:29, type:"B2C", priority:true,
    clientName:"Mia Laurent", companyName:"PetPaw Community", country:"Canada", city:"Vancouver",
    email:"mia@petpaw.ca", phone:"+1-604-820-3321",
    linkedin:"linkedin.com/in/mialaurent-pets", social:"@petpaw_ca (Instagram 75K, Facebook 40K)",
    website:"petpaw.ca", founderName:"Mia Laurent", founderEmail:"mia@petpaw.ca",
    industry:"Pet Care / Marketplace", segment:"B2C",
    painPoint:"Pet care marketplace using Facebook Groups to connect owners with sitters. 75K Instagram followers but no booking platform. Sitters and owners exchange contacts and bypass her — zero monetization.",
    proposedService:"Pet care marketplace (Lovable + Replit) with booking, verified sitter profiles, payments (Stripe), and automated review collection (n8n). Monetize every booking.",
    reachMethod:"Instagram DM + Email", fundingStage:"Bootstrapped (community)", employees:"1–3",
    lastActivity:"Facebook post: 'Sitters and owners keep exchanging contacts and I lose them'", score:86, dealValue:"$12,000–$20,000"
  },
  {
    id:30, type:"B2C", priority:true,
    clientName:"Omar Syed", companyName:"TasteRoute Dubai", country:"UAE", city:"Dubai",
    email:"omar@tasteroute.ae", phone:"+971-55-312-4430",
    linkedin:"linkedin.com/in/omarsyed-food", social:"@tasteroute (Instagram 140K)",
    website:"tasteroute.ae", founderName:"Omar Syed", founderEmail:"omar@tasteroute.ae",
    industry:"Food / Restaurant Discovery", segment:"B2C",
    painPoint:"140K Instagram food blogger with no monetized platform. Restaurants pay him for Instagram mentions but no tracking, no click-through, no reservations system. Revenue is unpredictable.",
    proposedService:"Food discovery + reservation platform (Lovable) with restaurant listings, commission on bookings + sponsored placement system + WhatsApp booking bot (n8n). Turn influence into recurring revenue.",
    reachMethod:"Instagram DM", fundingStage:"Bootstrapped (influencer)", employees:"1–2",
    lastActivity:"Instagram: daily restaurant posts, 140K engaged followers", score:85, dealValue:"$10,000–$16,000"
  },
  {
    id:31, type:"B2C", priority:true,
    clientName:"Sophie Walker", companyName:"YogaFlow Studio", country:"Australia", city:"Brisbane",
    email:"sophie@yogaflowbrisbane.com.au", phone:"+61-7-3200-8811",
    linkedin:"linkedin.com/in/sophiewalker-yoga", social:"@yogaflowbris (Instagram 28K)",
    website:"yogaflowbrisbane.com.au", founderName:"Sophie Walker", founderEmail:"sophie@yogaflowbrisbane.com.au",
    industry:"Wellness / Yoga Studio", segment:"B2C",
    painPoint:"Using MindBody at $350/month but it's too complex for her 1-person studio. Students book via Instagram DM. No waitlist system, no online class recordings, no membership portal.",
    proposedService:"Custom studio management app (Lovable PWA) with class booking + membership portal + automated session reminders (n8n) + online class library. Save $350/month + replace MindBody.",
    reachMethod:"Instagram DM + Email", fundingStage:"Bootstrapped", employees:"1–3",
    lastActivity:"Instagram story: 'DM me to book a spot' — every class", score:82, dealValue:"$7,000–$12,000"
  },
  {
    id:32, type:"B2C", priority:true,
    clientName:"Ben Adeyemi", companyName:"SnapTutor", country:"UK", city:"Bristol",
    email:"ben@snaptutor.co.uk", phone:"+44-117-312-4400",
    linkedin:"linkedin.com/in/benadeyemi-tutor", social:"@snaptutor (TikTok 95K)",
    website:"snaptutor.co.uk", founderName:"Ben Adeyemi", founderEmail:"ben@snaptutor.co.uk",
    industry:"EdTech / Online Tutoring", segment:"B2C",
    painPoint:"95K TikTok following offering tutoring. Using Calendly + bank transfer for payments. No platform. Can't scale. Getting 80+ DMs per week but can only handle 15 students manually.",
    proposedService:"Tutor marketplace (Lovable) with student-tutor matching, session booking, escrow payments (Stripe) + automated session notes (Claude API). Scale to 200+ students.",
    reachMethod:"TikTok DM + Email", fundingStage:"Bootstrapped", employees:"1",
    lastActivity:"TikTok: 'I can't take more students, too much admin' — last week", score:84, dealValue:"$8,000–$14,000"
  },
  {
    id:33, type:"B2C", priority:false,
    clientName:"Carla Rossi", companyName:"Mamma Mia Kitchen", country:"Germany", city:"Frankfurt",
    email:"carla@mammamia.de", phone:"+49-69-2020-3311",
    linkedin:"linkedin.com/in/carlarossi-food", social:"@mammamia_frankfurt (Instagram 22K)",
    website:"mammamia.de", founderName:"Carla Rossi", founderEmail:"carla@mammamia.de",
    industry:"Food / Home Chef Marketplace", segment:"B2C",
    painPoint:"Home chef with 22K followers selling home-cooked meals via WhatsApp. No ordering system, no menu, no payments. Orders get lost. Can only handle 10 orders/day manually.",
    proposedService:"Home chef ordering platform (Lovable) with menu management, pre-order system, payments + automated WhatsApp order confirmations (n8n). Triple order capacity.",
    reachMethod:"Instagram DM", fundingStage:"Solo", employees:"1",
    lastActivity:"Instagram: 'DM for orders this week' — every 2 days", score:76, dealValue:"$6,000–$10,000"
  },
  {
    id:34, type:"B2C", priority:false,
    clientName:"Prashant Iyer", companyName:"AstroSpace India", country:"Singapore", city:"Singapore",
    email:"prashant@astrospace.sg", phone:"+65-9120-4412",
    linkedin:"linkedin.com/in/prashantastro", social:"@astrospacesg (Instagram 60K, YouTube 45K)",
    website:"astrospace.sg", founderName:"Prashant Iyer", founderEmail:"prashant@astrospace.sg",
    industry:"Spiritual / Astrology Platform", segment:"B2C",
    painPoint:"Astrology content creator with 60K IG + 45K YouTube. Sells consultations via Calendly and manual DMs. No app, no community platform, no subscription product.",
    proposedService:"Astrology subscription app (Lovable PWA) with daily horoscopes, consultation booking, community forum + AI-personalized readings (Claude API). Recurring revenue model.",
    reachMethod:"Instagram DM + YouTube", fundingStage:"Bootstrapped", employees:"1–2",
    lastActivity:"YouTube: 'I wish I could reach all of you daily' — last week", score:74, dealValue:"$9,000–$14,000"
  },
  {
    id:35, type:"B2C", priority:false,
    clientName:"Amelia Stone", companyName:"CraftBox UK", country:"UK", city:"Leeds",
    email:"amelia@craftboxuk.com", phone:"+44-113-412-3300",
    linkedin:"linkedin.com/in/ameliastone-craft", social:"@craftboxuk (Pinterest 80K, Instagram 35K)",
    website:"craftboxuk.com", founderName:"Amelia Stone", founderEmail:"amelia@craftboxuk.com",
    industry:"Craft / Subscription Box", segment:"B2C",
    painPoint:"Subscription craft box with 800 subscribers managed via Shopify + manual spreadsheet. No community, no tutorial platform. High monthly churn (22%) because no engagement beyond the box.",
    proposedService:"Community + tutorial platform (Lovable) for subscribers + automated churn-prevention sequences (n8n + Klaviyo) + AI craft idea generator for emails (Claude).",
    reachMethod:"Email + Pinterest DM", fundingStage:"Bootstrapped", employees:"2–4",
    lastActivity:"Trustpilot: customers cancelling due to 'no community' — recent reviews", score:71, dealValue:"$7,000–$12,000"
  },

  // ═══ MORE B2B PRIORITY (SaaS / Health / RE) ═══
  {
    id:36, type:"B2B", priority:true,
    clientName:"Wei Chen", companyName:"PropScan AI", country:"Singapore", city:"Singapore",
    email:"wei@propscan.sg", phone:"+65-8200-4421",
    linkedin:"linkedin.com/in/weichen-proptech", social:"@weichen_sg (LinkedIn)",
    website:"propscan.sg", founderName:"Wei Chen", founderEmail:"wei@propscan.sg",
    industry:"PropTech / AI Valuation", segment:"B2B",
    painPoint:"AI property valuation startup. Has Python models but zero frontend. Showing investors CSV outputs. Needs a client-facing dashboard to close $500K seed round next month.",
    proposedService:"AI property valuation dashboard (Lovable + Replit) with map visualization (Mapbox) + automated PDF valuation reports (n8n + Claude). Investor-ready in 3 weeks.",
    reachMethod:"LinkedIn", fundingStage:"Pre-seed (raising $500K)", employees:"3–6",
    lastActivity:"AngelList profile updated — fundraising open", score:92, dealValue:"$15,000–$22,000"
  },
  {
    id:37, type:"B2B", priority:true,
    clientName:"Zara Ahmed", companyName:"NutriPlan Health", country:"Canada", city:"Toronto",
    email:"zara@nutriplan.ca", phone:"+1-416-901-2233",
    linkedin:"linkedin.com/in/zaraahmed-health", social:"@nutriplan_ca (Instagram 45K)",
    website:"nutriplan.ca", founderName:"Zara Ahmed", founderEmail:"zara@nutriplan.ca",
    industry:"HealthTech / Nutrition SaaS", segment:"B2B",
    painPoint:"B2B nutrition platform for corporate wellness programs. 20 corporate clients but all plans generated manually by dietitians (4 hrs each). Can't scale. Waitlist of 15 more corporate clients.",
    proposedService:"AI meal plan generator (Claude API + Lovable) that reduces plan creation from 4hrs to 10min + automated weekly plan delivery (n8n) + client progress portal.",
    reachMethod:"LinkedIn + Email", fundingStage:"Seed ($800K)", employees:"8–15",
    lastActivity:"LinkedIn: 'We have demand but can't scale our delivery process'", score:89, dealValue:"$16,000–$25,000"
  },
  {
    id:38, type:"B2B", priority:true,
    clientName:"Henrik Bauer", companyName:"SolarDash GmbH", country:"Germany", city:"Stuttgart",
    email:"henrik@solardash.de", phone:"+49-711-2091-3300",
    linkedin:"linkedin.com/in/henrikbauer-solar", social:"@solardash (LinkedIn)",
    website:"solardash.de", founderName:"Henrik Bauer", founderEmail:"henrik@solardash.de",
    industry:"CleanTech / Solar Monitoring", segment:"B2B",
    painPoint:"Solar installation company with 300+ customer installations but no customer-facing monitoring dashboard. Customers call for energy reports. 2 staff spend all week generating PDF reports manually.",
    proposedService:"Customer solar monitoring dashboard (Lovable + API integration) + automated monthly energy reports (n8n + Claude + PDF gen). Turn 2 staff-weeks/month into 2 hours.",
    reachMethod:"LinkedIn + Email", fundingStage:"Bootstrapped (profitable)", employees:"15–30",
    lastActivity:"Indeed: hiring 'data analyst' to manage reports — active listing", score:87, dealValue:"$14,000–$22,000"
  },
  {
    id:39, type:"B2B", priority:true,
    clientName:"Claire Fontaine", companyName:"RetailIQ France", country:"Netherlands", city:"Amsterdam",
    email:"claire@retailiq.eu", phone:"+31-20-901-2233",
    linkedin:"linkedin.com/in/clairefontaine-retail", social:"@retailiq_eu (LinkedIn)",
    website:"retailiq.eu", founderName:"Claire Fontaine", founderEmail:"claire@retailiq.eu",
    industry:"RetailTech / Analytics SaaS", segment:"B2B",
    painPoint:"Retail analytics startup selling to EU boutique chains. Product is Excel + Google Looker dashboards sent by email. Investors pushing for a real SaaS interface. Pre-Series A in 8 weeks.",
    proposedService:"White-label analytics SaaS portal (Lovable + Replit) with multi-tenant support + automated weekly insight emails (n8n + Claude). Transform Excel product into fundable SaaS.",
    reachMethod:"LinkedIn + AngelList", fundingStage:"Pre-Series A", employees:"5–10",
    lastActivity:"Attended SaaStr Europe — LinkedIn posts about fundraising journey", score:91, dealValue:"$18,000–$28,000"
  },
  {
    id:40, type:"B2B", priority:true,
    clientName:"Kavya Reddy", companyName:"DocAI Clinics", country:"Australia", city:"Perth",
    email:"kavya@docaiclinics.com.au", phone:"+61-8-9200-1122",
    linkedin:"linkedin.com/in/kavyareddy-health", social:"@docaiclinics (LinkedIn)",
    website:"docaiclinics.com.au", founderName:"Kavya Reddy", founderEmail:"kavya@docaiclinics.com.au",
    industry:"HealthTech / Clinical AI", segment:"B2B",
    painPoint:"AI clinical note-taking tool built as Chrome extension. Works but looks amateur. Hospitals won't buy a browser extension — need a proper clinical dashboard for enterprise sales.",
    proposedService:"Enterprise clinical dashboard (Lovable + Replit) wrapping the existing AI engine + SSO (Auth0) + audit trail + HL7 FHIR data export. Enterprise-ready in 5 weeks.",
    reachMethod:"LinkedIn + cold email to hospital procurement", fundingStage:"Pre-seed ($300K grant)", employees:"3–5",
    lastActivity:"Presented at HealthHack AU — LinkedIn post last week", score:90, dealValue:"$20,000–$32,000"
  },

  // ═══ MORE DIVERSE INDUSTRIES ═══
  {
    id:41, type:"B2B", priority:true,
    clientName:"Ahmed Malik", companyName:"SmartTailor AE", country:"UAE", city:"Dubai",
    email:"ahmed@smarttailor.ae", phone:"+971-4-392-1100",
    linkedin:"linkedin.com/in/ahmedmalik-fashion", social:"@smarttailor_ae (Instagram 55K)",
    website:"smarttailor.ae", founderName:"Ahmed Malik", founderEmail:"ahmed@smarttailor.ae",
    industry:"Fashion / Custom Tailoring App", segment:"B2B",
    painPoint:"Custom tailoring business with 55K Instagram followers. Takes measurements via WhatsApp voice notes. No app, no order tracker, no customer history. Losing VIP clients who want digital experience.",
    proposedService:"Custom tailoring PWA (Lovable) with measurement profiles, order tracking, fitting appointments + WhatsApp order bot (n8n) + VIP client portal. Luxury experience at scale.",
    reachMethod:"Instagram DM + LinkedIn", fundingStage:"Bootstrapped ($2M revenue)", employees:"20–40",
    lastActivity:"Instagram: VIP clients posting tailor visits — high-value customer base visible", score:86, dealValue:"$14,000–$22,000"
  },
  {
    id:42, type:"B2B", priority:true,
    clientName:"Ingrid Holm", companyName:"EventMesh Nordic", country:"Netherlands", city:"Amsterdam",
    email:"ingrid@eventmesh.nl", phone:"+31-20-333-1122",
    linkedin:"linkedin.com/in/ingridholm-events", social:"@eventmesh_nl (LinkedIn)",
    website:"eventmesh.nl", founderName:"Ingrid Holm", founderEmail:"ingrid@eventmesh.nl",
    industry:"Events / Corporate Event Tech", segment:"B2B",
    painPoint:"Corporate event planning company sending proposals via PDF email. No client portal to review options, approve budgets or track event milestones. Losing to competitors with proper platforms.",
    proposedService:"Client event portal (Lovable) with proposal review, milestone tracker, vendor approvals + automated budget alerts (n8n) + AI event timeline generator (Claude).",
    reachMethod:"LinkedIn + Email", fundingStage:"SMB", employees:"10–25",
    lastActivity:"LinkedIn: posted about digital transformation in events industry", score:83, dealValue:"$12,000–$18,000"
  },
  {
    id:43, type:"B2C", priority:true,
    clientName:"Daniel Park", companyName:"CodeKids Academy", country:"USA", city:"Chicago, IL",
    email:"daniel@codekids.us", phone:"+1-312-800-4411",
    linkedin:"linkedin.com/in/danielpark-edu", social:"@codekidsus (YouTube 85K, Instagram 42K)",
    website:"codekids.us", founderName:"Daniel Park", founderEmail:"daniel@codekids.us",
    industry:"EdTech / Kids Coding", segment:"B2C",
    painPoint:"Coding courses for kids delivered via YouTube. 85K YouTube subscribers. Parents contact via email for enrollment. No course platform, no parent tracking, no certificate of completion. Churn is high.",
    proposedService:"Kids coding platform (Lovable) with video lessons, interactive coding playground (embedded Replit), parent progress dashboard + automated certificate generation (n8n + Claude).",
    reachMethod:"YouTube + Email", fundingStage:"Bootstrapped", employees:"3–6",
    lastActivity:"YouTube comments: 'Is there an app?' — hundreds of requests", score:87, dealValue:"$12,000–$18,000"
  },
  {
    id:44, type:"B2B", priority:true,
    clientName:"Fiona Marsh", companyName:"ShelfSpace AU", country:"Australia", city:"Melbourne",
    email:"fiona@shelfspace.com.au", phone:"+61-3-9100-5533",
    linkedin:"linkedin.com/in/fionamarsh-retail", social:"@shelfspaceretail (LinkedIn)",
    website:"shelfspace.com.au", founderName:"Fiona Marsh", founderEmail:"fiona@shelfspace.com.au",
    industry:"RetailTech / Inventory SaaS", segment:"B2B",
    painPoint:"Inventory management SaaS for boutique retailers built entirely on Bubble. Hitting Bubble's performance limits at 500+ users. App crashes weekly. Customers threatening to churn.",
    proposedService:"Migrate from Bubble to production-grade stack (Replit + Lovable) with proper DB, API layer + automated migration pipeline. No data loss. 4-week rebuild.",
    reachMethod:"LinkedIn + Email", fundingStage:"Bootstrapped ($1.2M ARR)", employees:"5–10",
    lastActivity:"Bubble Community Forum: posted about performance issues — last week", score:92, dealValue:"$20,000–$30,000"
  },
  {
    id:45, type:"B2B", priority:true,
    clientName:"Carlos Mendoza", companyName:"FleetPilot MX", country:"USA", city:"Houston, TX",
    email:"carlos@fleetpilot.io", phone:"+1-713-820-4411",
    linkedin:"linkedin.com/in/carlosmendoza-fleet", social:"@fleetpilot (LinkedIn)",
    website:"fleetpilot.io", founderName:"Carlos Mendoza", founderEmail:"carlos@fleetpilot.io",
    industry:"FleetTech / Logistics SaaS", segment:"B2B",
    painPoint:"Fleet tracking startup managing 150 trucks via spreadsheet + WhatsApp. MVP was never built. Has $200K from angel investors and 3 paying customers waiting for a real product.",
    proposedService:"Fleet management dashboard (Lovable + Replit) with live GPS tracking (integration layer), driver app (PWA), automated maintenance alerts (n8n). Deliver in 5 weeks.",
    reachMethod:"LinkedIn + AngelList", fundingStage:"Angel ($200K)", employees:"4–8",
    lastActivity:"AngelList: profile shows 'product in development' — 6 months unchanged", score:91, dealValue:"$18,000–$28,000"
  },
  {
    id:46, type:"B2C", priority:true,
    clientName:"Luna Kimura", companyName:"StyleAI Closet", country:"Singapore", city:"Singapore",
    email:"luna@styleai.sg", phone:"+65-9300-1122",
    linkedin:"linkedin.com/in/lunakimura-fashion", social:"@styleai_sg (TikTok 320K, Instagram 88K)",
    website:"styleai.sg", founderName:"Luna Kimura", founderEmail:"luna@styleai.sg",
    industry:"Fashion / AI Styling App", segment:"B2C",
    painPoint:"320K TikTok followers for AI fashion content. No app — just viral videos. Brands paying her for promotions but she has no owned platform. Users are trapped in TikTok algorithm, not her ecosystem.",
    proposedService:"AI wardrobe + outfit planner app (Lovable PWA) with outfit generation (Claude Vision API) + subscription model ($9.99/mo) + brand affiliation dashboard. Own the audience.",
    reachMethod:"TikTok DM + Email", fundingStage:"Bootstrapped (influencer)", employees:"1–2",
    lastActivity:"TikTok: 5 viral videos this month — peak audience moment to launch app", score:89, dealValue:"$12,000–$18,000"
  },
  {
    id:47, type:"B2B", priority:false,
    clientName:"George Papadopoulos", companyName:"AquaTrack Marine", country:"UK", city:"Southampton",
    email:"george@aquatrack.co.uk", phone:"+44-23-8044-1122",
    linkedin:"linkedin.com/in/georgepapadopoulos-marine", social:null,
    website:"aquatrack.co.uk", founderName:"George Papadopoulos", founderEmail:"george@aquatrack.co.uk",
    industry:"MarineTech / Fleet Mgmt", segment:"B2B",
    painPoint:"Marine fleet monitoring company using legacy desktop software from 2009. 40 vessel clients. No mobile app for port captains. Losing to newer competitors with cloud solutions.",
    proposedService:"Marine fleet monitoring PWA (Lovable + Replit) with vessel tracking, automated incident reporting (n8n) + client notification system.",
    reachMethod:"LinkedIn + Email", fundingStage:"SMB", employees:"12–25",
    lastActivity:"LinkedIn: 'Time to modernize' post last month", score:72, dealValue:"$15,000–$22,000"
  },
  {
    id:48, type:"B2B", priority:false,
    clientName:"Sarah Kim", companyName:"HireIQ Korea", country:"USA", city:"Seattle, WA",
    email:"sarah@hireiq.us", phone:"+1-206-901-3311",
    linkedin:"linkedin.com/in/sarahkim-hr", social:"@hireiq_us (LinkedIn)",
    website:"hireiq.us", founderName:"Sarah Kim", founderEmail:"sarah@hireiq.us",
    industry:"HR Tech / Video Interview SaaS", segment:"B2B",
    painPoint:"Async video interview SaaS for Korean-American businesses. Built on third-party tool with no custom branding. 50 paying clients but no product differentiation.",
    proposedService:"Branded async video interview platform (Lovable + Replit) with AI interview summary (Claude API) + automated candidate scoring + multi-language support (EN/KO).",
    reachMethod:"LinkedIn + Email", fundingStage:"Bootstrapped", employees:"4–8",
    lastActivity:"ProductHunt: launched 3 months ago, positive but limited reviews", score:75, dealValue:"$12,000–$18,000"
  },
  {
    id:49, type:"B2C", priority:false,
    clientName:"Maria Osei", companyName:"AfroBeauty Hub", country:"UK", city:"London",
    email:"maria@afrobeautyhub.co.uk", phone:"+44-20-8901-4422",
    linkedin:"linkedin.com/in/mariaosei-beauty", social:"@afrobeautyhub (Instagram 110K, TikTok 75K)",
    website:"afrobeautyhub.co.uk", founderName:"Maria Osei", founderEmail:"maria@afrobeautyhub.co.uk",
    industry:"Beauty / Afro Haircare Community", segment:"B2C",
    painPoint:"110K Instagram following for Afro hair content. Sells a PDF guide for £15 via Gumroad. No platform, no community, no recurring revenue. One-time PDF sales are unpredictable.",
    proposedService:"Afro hair membership platform (Lovable) with tutorial library, consultation booking, community forum + subscription billing (Stripe) + AI haircare advice chatbot (Claude).",
    reachMethod:"Instagram DM + Email", fundingStage:"Bootstrapped", employees:"1–2",
    lastActivity:"Instagram: 'Dropped a new guide!' — selling PDFs manually", score:73, dealValue:"$8,000–$13,000"
  },
  {
    id:50, type:"B2C", priority:false,
    clientName:"Ryo Nakamura", companyName:"MindfulPath JP", country:"Singapore", city:"Singapore",
    email:"ryo@mindfulpath.sg", phone:"+65-8200-3312",
    linkedin:"linkedin.com/in/ryonakamura-wellness", social:"@mindfulpath_sg (Instagram 62K)",
    website:"mindfulpath.sg", founderName:"Ryo Nakamura", founderEmail:"ryo@mindfulpath.sg",
    industry:"Wellness / Meditation App", segment:"B2C",
    painPoint:"Meditation and mindfulness coach with 62K Instagram following. Sells group sessions via Zoom + PayNow (Singapore manual bank transfer). No app. Competing with Headspace/Calm without a platform.",
    proposedService:"Mindfulness app (Lovable PWA) with guided meditation library, daily check-ins, subscription membership (Stripe) + automated weekly reflection prompts (n8n + Claude).",
    reachMethod:"Instagram DM + Email", fundingStage:"Bootstrapped", employees:"1",
    lastActivity:"Instagram: runs live sessions daily — highly engaged audience", score:72, dealValue:"$8,000–$13,000"
  }
];

const APIFY_ACTORS = [
  {
    id: "google-maps",
    name: "Google Maps Scraper",
    actor: "compass/crawler-google-maps",
    icon: "🗺️",
    color: "#34a853",
    purpose: "Find SMBs and local businesses with outdated tech in target cities",
    targetLeadType: "B2B — Local businesses, clinics, agencies, studios",
    config: {
      searchStringsArray: [
        "digital marketing agency Austin TX",
        "private clinic London no online booking",
        "fitness studio Dubai",
        "real estate agency Amsterdam",
        "restaurant management software Singapore",
        "logistics company Rotterdam",
        "law firm Munich",
        "dental clinic Miami"
      ],
      maxCrawledPlaces: 200,
      language: "en",
      maxImages: 0,
      exportPlaceUrls: true,
      additionalInfo: true,
      scrapeReviews: true,
      maxReviews: 5
    },
    outputFields: ["title","website","phone","email","reviewsCount","totalScore","address","categoryName","openingHours"],
    enrichmentHook: "Filter: rating between 3.5–4.3 (not perfect = room to improve). Has website. Cross-check website with PageSpeed API."
  },
  {
    id: "linkedin",
    name: "LinkedIn Jobs Scraper",
    actor: "curious_coder/linkedin-jobs-scraper",
    icon: "💼",
    color: "#0077b5",
    purpose: "Find companies actively hiring developers — highest-intent leads",
    targetLeadType: "B2B — Startups and SMBs posting dev jobs",
    config: {
      searchQueries: [
        { keyword: "React developer", location: "United States", f_TPR: "r604800" },
        { keyword: "full stack developer", location: "United Kingdom", f_TPR: "r604800" },
        { keyword: "mobile app developer", location: "Australia", f_TPR: "r604800" },
        { keyword: "Node.js developer", location: "Canada", f_TPR: "r604800" },
        { keyword: "software engineer", location: "Singapore", f_TPR: "r604800" },
        { keyword: "web developer", location: "Germany", f_TPR: "r604800" },
        { keyword: "DevOps engineer", location: "Netherlands", f_TPR: "r604800" },
        { keyword: "backend developer", location: "United Arab Emirates", f_TPR: "r604800" }
      ],
      targetCompanySize: ["2-10", "11-50", "51-200"],
      maxResults: 500
    },
    outputFields: ["companyName","companyUrl","jobTitle","postedAt","location","applyUrl","employeeCount","companyLinkedIn"],
    enrichmentHook: "Cross-reference companyLinkedIn to extract CEO/founder profile. Map to crunchbase for funding data."
  },
  {
    id: "web-crawler",
    name: "Website Content Crawler",
    actor: "apify/website-content-crawler",
    icon: "🕷️",
    color: "#9b59b6",
    purpose: "Extract contact info + assess tech quality from company websites",
    targetLeadType: "All — Enrichment step for any lead",
    config: {
      startUrls: [{ url: "https://TARGET_COMPANY_WEBSITE.com" }],
      maxCrawlPages: 10,
      crawlerType: "cheerio",
      removeCookieWarnings: true,
      clickElementsCssSelector: null,
      htmlTransformer: "readableText",
      includeUrlGlobs: ["**/about*", "**/contact*", "**/team*", "**/pricing*"]
    },
    outputFields: ["url","title","text","emails","phones","linkedInUrls","socialLinks"],
    enrichmentHook: "After crawl: pass 'text' field to Claude API with prompt: 'Extract: company size, tech stack mentioned, digital maturity signals, contact emails. Return JSON.'"
  },
  {
    id: "rag-browser",
    name: "RAG Web Browser",
    actor: "apify/rag-web-browser",
    icon: "🧠",
    color: "#e74c3c",
    purpose: "Intelligent search + extract across multiple sources simultaneously",
    targetLeadType: "All — Find founders, verify emails, research pain points",
    config: {
      query: "founder CEO email contact {COMPANY_NAME} site:linkedin.com OR site:{COMPANY_WEBSITE}",
      maxResults: 5,
      outputFormats: ["text", "markdown"],
      requestTimeoutSecs: 30,
      dynamicContentWaitSecs: 2
    },
    outputFields: ["searchResult","url","text","markdown"],
    enrichmentHook: "Use output 'text' with Claude API: 'From this text, extract founder name, email, LinkedIn URL, company funding stage, tech stack. Return structured JSON.'"
  },
  {
    id: "instagram",
    name: "Instagram Profile Scraper",
    actor: "apify/instagram-scraper",
    icon: "📸",
    color: "#e1306c",
    purpose: "Find high-follower B2C creators/influencers who need a platform",
    targetLeadType: "B2C — Influencers, content creators, coaches with no app",
    config: {
      directUrls: [],
      resultsType: "posts",
      resultsLimit: 20,
      searchType: "hashtag",
      searchLimit: 100,
      searchQueries: [
        "fitnesscoachuae",
        "onlinecoachuk",
        "personaltrainerusa",
        "beautyinfluencerus",
        "yogainstructoraus",
        "foodbloggerdubai",
        "onlinetutoringuk"
      ],
      addParentData: true
    },
    outputFields: ["username","fullName","followersCount","biography","externalUrl","email","postsCount","isBusinessAccount"],
    enrichmentHook: "Filter: followersCount > 20000, isBusinessAccount: true, biography mentions 'DM for coaching/booking/orders' (no platform). These are prime B2C leads."
  }
];

const PIPELINE_CODE = `// ═══════════════════════════════════════════════════════
// RapidCode Lead Generation Pipeline — Full Orchestration
// ═══════════════════════════════════════════════════════
// Install: npm install apify-client @anthropic-ai/sdk dotenv

import Anthropic from "@anthropic-ai/sdk";
import { ApifyClient } from "apify-client";
import dotenv from "dotenv";
dotenv.config();

const apify = new ApifyClient({ token: process.env.APIFY_TOKEN });
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── STEP 1: Scrape Google Maps for SMB leads ──────────
async function scrapeGoogleMaps(queries) {
  console.log("🗺️  Scraping Google Maps...");
  const run = await apify.actor("compass/crawler-google-maps").call({
    searchStringsArray: queries,
    maxCrawledPlaces: 200,
    scrapeReviews: true,
    maxReviews: 3
  });
  const { items } = await apify.dataset(run.defaultDatasetId).listItems();
  return items.filter(i => i.website && i.totalScore >= 3.5 && i.totalScore <= 4.3);
}

// ── STEP 2: Scrape LinkedIn for hiring companies ──────
async function scrapeLinkedInJobs(keywords, countries) {
  console.log("💼  Scanning LinkedIn job postings...");
  const queries = keywords.flatMap(k =>
    countries.map(c => ({ keyword: k, location: c, f_TPR: "r604800" }))
  );
  const run = await apify.actor("curious_coder/linkedin-jobs-scraper").call({
    searchQueries: queries,
    targetCompanySize: ["2-10","11-50","51-200"],
    maxResults: 300
  });
  const { items } = await apify.dataset(run.defaultDatasetId).listItems();
  return items;
}

// ── STEP 3: Scrape Instagram for B2C creators ─────────
async function scrapeInstagramCreators(hashtags) {
  console.log("📸  Finding B2C creators on Instagram...");
  const run = await apify.actor("apify/instagram-scraper").call({
    searchType: "hashtag",
    searchQueries: hashtags,
    resultsLimit: 50,
    addParentData: true
  });
  const { items } = await apify.dataset(run.defaultDatasetId).listItems();
  return items.filter(i =>
    i.followersCount > 20000 &&
    i.isBusinessAccount &&
    /DM|booking|coaching|order/i.test(i.biography || "")
  );
}

// ── STEP 4: Enrich lead with website crawler ──────────
async function enrichWithWebCrawler(websiteUrl) {
  try {
    const run = await apify.actor("apify/rag-web-browser").call({
      query: \`founder CEO email contact site:\${new URL(websiteUrl).hostname}\`,
      maxResults: 3
    });
    const { items } = await apify.dataset(run.defaultDatasetId).listItems();
    return items.map(i => i.text || "").join("\\n").slice(0, 3000);
  } catch { return ""; }
}

// ── STEP 5: Score & analyze lead with Claude ──────────
async function scoreLeadWithClaude(leadData, websiteText) {
  const msg = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: \`You are a B2B sales analyst for RapidCode, a no-code/AI development agency 
    (Lovable, Replit, n8n, Claude API). Analyze leads and return ONLY valid JSON.\`,
    messages: [{
      role: "user",
      content: \`Analyze this lead for RapidCode. Return JSON only:
{
  "score": 0-100,
  "dealValue": "$X,000-$Y,000",
  "painPoints": ["..."],
  "proposedService": "...",
  "outreachAngle": "hiring|outdated_site|fundraising|automation",
  "priority": true|false,
  "whyGoodLead": "..."
}

Lead data: \${JSON.stringify(leadData)}
Website text: \${websiteText.slice(0, 1000)}\`
    }]
  });
  try {
    const text = msg.content[0].text;
    return JSON.parse(text.replace(/\`\`\`json|\\n|\`\`\`/g, "").trim());
  } catch { return { score: 50, priority: false, painPoints: [], proposedService: "Custom web app" }; }
}

// ── STEP 6: Generate outreach message ─────────────────
async function generateOutreach(lead) {
  const msg = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system: "Write concise, personalized cold outreach for RapidCode no-code agency. Max 120 words. Sign: Rati | RapidCode | rapidcode.in",
    messages: [{
      role: "user",
      content: \`Write outreach for: \${lead.companyName} (\${lead.industry})
Contact: \${lead.founderName}, \${lead.city}, \${lead.country}
Pain: \${lead.painPoints?.join(", ")}
Service: \${lead.proposedService}
Angle: \${lead.outreachAngle}\`
    }]
  });
  return msg.content[0].text;
}

// ── MAIN PIPELINE ─────────────────────────────────────
async function runLeadPipeline() {
  const allLeads = [];

  // B2B: Google Maps
  const mapLeads = await scrapeGoogleMaps([
    "SaaS startup hiring developer Austin",
    "health clinic no online booking London",
    "real estate agency Amsterdam",
    "logistics company no software Rotterdam"
  ]);

  // B2B: LinkedIn hiring signal
  const jobLeads = await scrapeLinkedInJobs(
    ["React developer","full stack developer","mobile app developer"],
    ["United States","United Kingdom","Australia","Canada","Singapore","Germany","Netherlands","UAE"]
  );

  // B2C: Instagram creators
  const creatorLeads = await scrapeInstagramCreators([
    "onlinecoach","fitnesstrainer","yogainstructor",
    "foodbloggerdubai","beautyinfluencer","onlinetutor"
  ]);

  // Enrich + Score all leads
  const rawLeads = [...mapLeads, ...jobLeads, ...creatorLeads];
  for (const raw of rawLeads.slice(0, 50)) {
    const siteText = raw.website ? await enrichWithWebCrawler(raw.website) : "";
    const analysis = await scoreLeadWithClaude(raw, siteText);
    if (analysis.score >= 70) {
      const outreach = await generateOutreach({ ...raw, ...analysis });
      allLeads.push({ ...raw, ...analysis, outreachMessage: outreach });
    }
  }

  // Deduplicate by website domain
  const seen = new Set();
  const deduplicated = allLeads.filter(l => {
    const domain = l.website?.replace(/https?:\\/\\/|www\\./g,"").split("/")[0];
    if (seen.has(domain)) return false;
    seen.add(domain); return true;
  });

  // Sort by score
  deduplicated.sort((a,b) => b.score - a.score);

  console.log(\`✅ Pipeline complete: \${deduplicated.length} qualified leads\`);
  console.log(\`🔥 Priority leads: \${deduplicated.filter(l=>l.priority).length}\`);
  return deduplicated;
}

runLeadPipeline().then(leads => {
  const fs = await import("fs");
  fs.writeFileSync("leads_output.json", JSON.stringify(leads, null, 2));
  console.log("💾 Saved to leads_output.json");
});`;

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const COUNTRY_FLAGS = { USA:"🇺🇸", UK:"🇬🇧", Canada:"🇨🇦", Australia:"🇦🇺", UAE:"🇦🇪", Germany:"🇩🇪", Netherlands:"🇳🇱", Singapore:"🇸🇬" };
const INDUSTRY_COLORS = {
  "SaaS":"#818cf8","HR":"#a78bfa","HealthTech":"#34d399","MedTech":"#22d3ee","E-commerce":"#fbbf24",
  "Real Estate":"#60a5fa","CleanTech":"#4ade80","EdTech":"#fb923c","FoodTech":"#f87171",
  "LegalTech":"#c084fc","Fitness":"#f472b6","FitTech":"#ec4899","Beauty":"#f472b6","FleetTech":"#38bdf8",
  "MarineTech":"#0ea5e9","Fashion":"#e879f9","Events":"#facc15","RetailTech":"#fb923c",
  "Wellness":"#86efac","Pet":"#fca5a5","Logistics":"#94a3b8","Staffing":"#a5b4fc",
  "ConTech":"#78716c","InsurTech":"#64748b","AgriTech":"#86efac","Marketing":"#818cf8",
  "TravelTech":"#22d3ee","FinTech":"#a78bfa","PropTech":"#60a5fa","Spiritual":"#e879f9"
};

function getIColor(industry) {
  for (const [k, v] of Object.entries(INDUSTRY_COLORS))
    if (industry.toLowerCase().includes(k.toLowerCase())) return v;
  return "#64748b";
}

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [segment, setSegment] = useState("ALL");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalTab, setModalTab] = useState("overview");
  const [apifyIdx, setApifyIdx] = useState(0);
  const [pipelineView, setPipelineView] = useState(false);
  const [outreachLead, setOutreachLead] = useState(null);
  const [outreachType, setOutreachType] = useState("hiring");
  const [generatedMsg, setGeneratedMsg] = useState("");
  const [generating, setGenerating] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [counts, setCounts] = useState({ total:0, priority:0, b2b:0, b2c:0, avgScore:0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const targets = {
      total: LEADS.length,
      priority: LEADS.filter(l=>l.priority).length,
      b2b: LEADS.filter(l=>l.type==="B2B").length,
      b2c: LEADS.filter(l=>l.type==="B2C").length,
      avgScore: Math.round(LEADS.reduce((a,b)=>a+b.score,0)/LEADS.length)
    };
    let f = 0;
    const iv = setInterval(() => {
      f++; const p = Math.min(f/50,1), e = 1-Math.pow(1-p,3);
      setCounts({ total:Math.round(targets.total*e), priority:Math.round(targets.priority*e), b2b:Math.round(targets.b2b*e), b2c:Math.round(targets.b2c*e), avgScore:Math.round(targets.avgScore*e) });
      if(p>=1) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, []);

  const visibleLeads = LEADS.filter(l => {
    if (segment !== "ALL" && l.type !== segment) return false;
    if (filter === "priority" && !l.priority) return false;
    if (filter === "general" && l.priority) return false;
    if (search && !l.companyName.toLowerCase().includes(search.toLowerCase()) &&
        !l.industry.toLowerCase().includes(search.toLowerCase()) &&
        !l.country.toLowerCase().includes(search.toLowerCase()) &&
        !l.founderName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const generateMsg = async (lead) => {
    setGenerating(true); setGeneratedMsg("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are an outreach specialist for RapidCode (rapidcode.in), a no-code/AI development agency using Lovable, Replit, n8n, and Claude API. Write a highly personalized, concise B2B/B2C cold outreach message. Be conversational and specific. Max 130 words. Sign off: "Rati | RapidCode | rapidcode.in". Never sound like a bot.`,
          messages:[{ role:"user", content:`Write outreach for this lead. Angle: ${outreachType}

Company: ${lead.companyName} (${lead.industry}) — ${lead.type}
Contact: ${lead.founderName}, ${lead.city}, ${lead.country}
Pain point: ${lead.painPoint}
Proposed service: ${lead.proposedService}
Reach method: ${lead.reachMethod}
Funding: ${lead.fundingStage}
Last activity: ${lead.lastActivity}

Make it feel written specifically for them. Reference their specific situation.` }]
        })
      });
      const d = await res.json();
      setGeneratedMsg(d.content?.[0]?.text || "Unable to generate message.");
    } catch { setGeneratedMsg("API error — check your connection."); }
    setGenerating(false);
  };

  const analyzeAI = async (lead) => {
    setAnalyzing(true); setAiAnalysis("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:800,
          system:"You are a senior sales strategist for a no-code/AI development agency. Provide sharp, specific, actionable lead analysis. Use bullet points. Be direct.",
          messages:[{ role:"user", content:`Deep analysis for RapidCode (no-code agency — Lovable, Replit, n8n, Claude API):

${lead.companyName} | ${lead.type} | ${lead.industry} | ${lead.country}
Funding: ${lead.fundingStage} | Team: ${lead.employees}
Pain: ${lead.painPoint}
Proposed: ${lead.proposedService}
Activity: ${lead.lastActivity}
Score: ${lead.score}/100 | Est. deal: ${lead.dealValue}

Provide:
1. Why this is a strong lead (2-3 bullets)
2. Conversion probability + reasoning  
3. Top 2 objections to expect + how to handle
4. Best first message format (LinkedIn/email/IG DM)
5. Upsell opportunity after initial project` }]
        })
      });
      const d = await res.json();
      setAiAnalysis(d.content?.[0]?.text || "Analysis unavailable.");
    } catch { setAiAnalysis("Claude API error."); }
    setAnalyzing(false);
  };

  const ScoreRing = ({ score }) => {
    const c = score>=90?"#4ade80":score>=80?"#fbbf24":score>=70?"#fb923c":"#f87171";
    return (
      <div style={{position:"relative",width:44,height:44}}>
        <svg width="44" height="44" style={{transform:"rotate(-90deg)"}}>
          <circle cx="22" cy="22" r="18" fill="none" stroke="#1e293b" strokeWidth="3"/>
          <circle cx="22" cy="22" r="18" fill="none" stroke={c} strokeWidth="3"
            strokeDasharray={`${(score/100)*113} 113`} strokeLinecap="round"/>
        </svg>
        <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:c}}>{score}</span>
      </div>
    );
  };

  const Tag = ({ label, color }) => (
    <span style={{background:`${color}18`,border:`1px solid ${color}35`,color,borderRadius:4,padding:"2px 8px",fontSize:10,fontWeight:600,letterSpacing:"0.3px"}}>{label}</span>
  );

  const S = {
    app: { fontFamily:"'DM Mono','Courier New',monospace", background:"#050810", minHeight:"100vh", color:"#cbd5e1" },
    nav: { background:"#07090f", borderBottom:"1px solid #111827", padding:"0 20px" },
    navTop: { display:"flex", alignItems:"center", gap:12, paddingTop:14, paddingBottom:0 },
    tabs: { display:"flex", gap:0, marginTop:4 },
    tab: (a) => ({ background:"none", border:"none", borderBottom:`2px solid ${a?"#7c3aed":"transparent"}`, color:a?"#a78bfa":"#475569", padding:"10px 14px", fontSize:11, cursor:"pointer", fontFamily:"inherit", letterSpacing:"0.5px", transition:"all 0.15s", fontWeight:a?700:400 }),
    body: { padding:"18px 20px" },
    card: { background:"#080c18", border:"1px solid #111827", borderRadius:10 },
    glowCard: (color) => ({ background:"#080c18", border:`1px solid ${color}25`, borderRadius:10, boxShadow:`0 0 20px ${color}08` }),
    statGrid: { display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:20 },
    grid2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 },
    grid3: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 },
    leadsGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 },
    p: { padding:16 },
    p20: { padding:20 },
    sTitle: { fontSize:12, fontWeight:700, color:"#e2e8f0", marginBottom:12, letterSpacing:"-0.2px" },
    micro: { fontSize:10, color:"#334155", textTransform:"uppercase", letterSpacing:"1px" },
    overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:1000, display:"flex", alignItems:"flex-start", justifyContent:"center", overflowY:"auto", padding:"16px" },
    modal: { background:"#080c18", border:"1px solid #1e293b", borderRadius:14, width:"100%", maxWidth:820, margin:"16px auto", padding:0, overflow:"hidden" }
  };

  const renderCode = (code) => code.split("\n").map((line, i) => {
    let colored = line
      .replace(/(\/\/ .*)/g, '<span style="color:#334155;font-style:italic">$1</span>')
      .replace(/\b(const|let|async|await|function|return|import|from|if|for|try|catch|new|true|false|null)\b/g,'<span style="color:#818cf8">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*")/g,'<span style="color:#4ade80">$1</span>')
      .replace(/(`[^`]*`)/g,'<span style="color:#fbbf24">$1</span>')
      .replace(/\b(\d+)\b/g,'<span style="color:#fb923c">$1</span>');
    return <div key={i} style={{minHeight:18}} dangerouslySetInnerHTML={{__html: colored || "&nbsp;"}} />;
  });

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-track { background:#050810; }
        ::-webkit-scrollbar-thumb { background:#1e293b; border-radius:2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse2 { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        .lcard:hover { border-color:#1e3a5f !important; transform:translateY(-2px); transition:all 0.2s; }
        .tab-btn:hover { color:#94a3b8 !important; }
        .copy-btn:hover { background:#1e293b !important; }
      `}</style>

      {/* NAV */}
      <div style={S.nav}>
        <div style={S.navTop}>
          <div style={{width:30,height:30,background:"linear-gradient(135deg,#7c3aed,#4f46e5)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>⚡</div>
          <span style={{fontSize:15,fontWeight:700,color:"#f8fafc",letterSpacing:"-0.5px"}}>Rapid<span style={{color:"#a78bfa"}}>Code</span> <span style={{color:"#334155",fontWeight:400}}>·</span> <span style={{fontSize:12,color:"#475569",fontWeight:400}}>Lead Intelligence</span></span>
          <span style={{marginLeft:4,fontSize:9,color:"#4f46e5",background:"#1e1b4b",border:"1px solid #3730a3",borderRadius:3,padding:"2px 6px",letterSpacing:"1px"}}>CLAUDE-POWERED</span>
          <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block",animation:"pulse2 2s infinite"}}/>
            <span style={{fontSize:10,color:"#334155"}}>PIPELINE READY</span>
          </div>
        </div>
        <div style={S.tabs}>
          {[["dashboard","⬛ Overview"],["leads","👥 Leads"],["outreach","✉️ Outreach"],["apify","🕷️ Apify"],["pipeline","⚙️ Pipeline"],["insights","📊 Insights"]].map(([id,label])=>(
            <button key={id} className="tab-btn" style={S.tab(tab===id)} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>
      </div>

      <div style={S.body}>

      {/* ── DASHBOARD ── */}
      {tab==="dashboard" && (
        <div style={{animation:"fadeUp 0.35s ease"}}>
          <div style={S.statGrid}>
            {[
              {v:counts.total,l:"Total Leads",c:"#7c3aed",sub:"B2B + B2C"},
              {v:counts.priority,l:"🔥 Priority",c:"#dc2626",sub:"High intent"},
              {v:counts.b2b,l:"B2B Leads",c:"#2563eb",sub:"Business clients"},
              {v:counts.b2c,l:"B2C Leads",c:"#059669",sub:"Creators & SMBs"},
              {v:counts.avgScore,l:"Avg Score",c:"#d97706",sub:"Out of 100"}
            ].map((s,i)=>(
              <div key={i} style={{...S.glowCard(s.c),padding:16,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,right:0,width:3,height:"100%",background:`linear-gradient(to bottom,${s.c},transparent)`}}/>
                <div style={{fontSize:28,fontWeight:800,color:s.c,lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:11,color:"#e2e8f0",marginTop:3,fontWeight:600}}>{s.l}</div>
                <div style={{fontSize:9,color:"#334155",marginTop:1,textTransform:"uppercase",letterSpacing:"0.8px"}}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={S.grid2}>
            <div style={{...S.card,...S.p20}}>
              <div style={S.sTitle}>🔥 Top 8 Priority Leads</div>
              {LEADS.filter(l=>l.priority).sort((a,b)=>b.score-a.score).slice(0,8).map(l=>(
                <div key={l.id} onClick={()=>{setSelected(l);setTab("leads");}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #0f172a",cursor:"pointer"}}>
                  <span style={{fontSize:15}}>{COUNTRY_FLAGS[l.country]}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:12,color:"#e2e8f0",fontWeight:600}}>{l.companyName}</span>
                      <span style={{fontSize:9,background:l.type==="B2B"?"#1e3a8a20":"#14532d20",color:l.type==="B2B"?"#60a5fa":"#4ade80",border:`1px solid ${l.type==="B2B"?"#1d4ed830":"#16a34a30"}`,borderRadius:3,padding:"1px 5px"}}>{l.type}</span>
                    </div>
                    <div style={{fontSize:10,color:"#334155"}}>{l.industry.split("/")[0].trim()} · {l.city}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:10,color:"#475569"}}>{l.dealValue}</span>
                    <ScoreRing score={l.score}/>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{...S.card,...S.p20}}>
                <div style={S.sTitle}>📍 Coverage Map</div>
                {Object.entries(LEADS.reduce((a,l)=>{a[l.country]=(a[l.country]||0)+1;return a},{})).sort((a,b)=>b[1]-a[1]).map(([c,n])=>(
                  <div key={c} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                    <span>{COUNTRY_FLAGS[c]}</span>
                    <span style={{fontSize:11,color:"#94a3b8",flex:1}}>{c}</span>
                    <div style={{width:80,height:3,background:"#0f172a",borderRadius:2,overflow:"hidden"}}>
                      <div style={{width:`${(n/LEADS.length)*100}%`,height:"100%",background:"#4f46e5"}}/>
                    </div>
                    <span style={{fontSize:10,color:"#334155",width:18,textAlign:"right"}}>{n}</span>
                  </div>
                ))}
              </div>
              <div style={{...S.card,...S.p20}}>
                <div style={S.sTitle}>🏷️ Segment Split</div>
                <div style={{display:"flex",gap:10}}>
                  {[["B2B","#3b82f6",LEADS.filter(l=>l.type==="B2B").length],["B2C","#10b981",LEADS.filter(l=>l.type==="B2C").length]].map(([seg,c,n])=>(
                    <div key={seg} style={{flex:1,background:`${c}10`,border:`1px solid ${c}25`,borderRadius:8,padding:12,textAlign:"center",cursor:"pointer"}} onClick={()=>{setSegment(seg);setTab("leads");}}>
                      <div style={{fontSize:24,fontWeight:800,color:c}}>{n}</div>
                      <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{seg} Leads</div>
                      <div style={{fontSize:9,color:"#334155",marginTop:1}}>{Math.round((n/LEADS.length)*100)}% of pipeline</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{...S.card,...S.p20,marginTop:12}}>
            <div style={S.sTitle}>🏭 Industries Covered</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {[...new Set(LEADS.map(l=>l.industry.split("/")[0].trim()))].map(ind=>(
                <span key={ind} style={{background:`${getIColor(ind)}12`,border:`1px solid ${getIColor(ind)}30`,color:getIColor(ind),borderRadius:4,padding:"4px 10px",fontSize:10,fontWeight:500}}>{ind}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LEADS ── */}
      {tab==="leads" && (
        <div style={{animation:"fadeUp 0.3s ease"}}>
          <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",gap:4}}>
              {[["ALL","All"],["B2B","B2B"],["B2C","B2C"]].map(([v,l])=>(
                <button key={v} onClick={()=>setSegment(v)} style={{padding:"5px 12px",fontSize:10,borderRadius:5,cursor:"pointer",background:segment===v?(v==="B2B"?"#1e40af":v==="B2C"?"#065f46":"#4c1d95"):"#080c18",color:segment===v?"#fff":"#475569",border:`1px solid ${segment===v?(v==="B2B"?"#2563eb":v==="B2C"?"#10b981":"#7c3aed"):"#111827"}`,fontFamily:"inherit",fontWeight:segment===v?700:400}}>{l}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:4}}>
              {[["all","All"],["priority","🔥 Priority"],["general","📋 General"]].map(([v,l])=>(
                <button key={v} onClick={()=>setFilter(v)} style={{padding:"5px 12px",fontSize:10,borderRadius:5,cursor:"pointer",background:filter===v?"#1e293b":"#080c18",color:filter===v?"#e2e8f0":"#475569",border:"1px solid #111827",fontFamily:"inherit"}}>{l}</button>
              ))}
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search company, industry, country, founder…" style={{flex:1,minWidth:180,background:"#080c18",border:"1px solid #111827",borderRadius:5,padding:"6px 12px",color:"#e2e8f0",fontSize:11,fontFamily:"inherit",outline:"none"}}/>
            <span style={{fontSize:10,color:"#334155",whiteSpace:"nowrap"}}>{visibleLeads.length} leads</span>
          </div>

          <div style={S.leadsGrid}>
            {visibleLeads.sort((a,b)=>b.score-a.score).map(l=>(
              <div key={l.id} className="lcard" onClick={()=>setSelected(l)} style={{...S.card,padding:14,cursor:"pointer",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,width:"100%",height:2,background:l.priority?`linear-gradient(90deg,${getIColor(l.industry)},transparent)`:"transparent"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    {l.priority && <div style={{fontSize:9,color:"#ef4444",marginBottom:3,display:"flex",alignItems:"center",gap:4}}><span style={{width:5,height:5,borderRadius:"50%",background:"#ef4444",display:"inline-block",animation:"pulse2 2s infinite"}}/>PRIORITY</div>}
                    <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9"}}>{l.companyName}</div>
                    <div style={{fontSize:10,color:"#475569",marginTop:2}}>{COUNTRY_FLAGS[l.country]} {l.city}</div>
                  </div>
                  <ScoreRing score={l.score}/>
                </div>
                <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
                  <Tag label={l.type} color={l.type==="B2B"?"#3b82f6":"#10b981"}/>
                  <Tag label={l.industry.split("/")[0].trim()} color={getIColor(l.industry)}/>
                </div>
                <div style={{fontSize:10,color:"#475569",lineHeight:1.6,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",marginBottom:8}}>{l.painPoint}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:9,color:"#334155",background:"#0f172a",border:"1px solid #1e293b",borderRadius:3,padding:"2px 6px"}}>{l.fundingStage}</span>
                  <span style={{fontSize:10,color:"#7c3aed",fontWeight:600}}>{l.dealValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── OUTREACH ── */}
      {tab==="outreach" && (
        <div style={{animation:"fadeUp 0.3s ease"}}>
          <div style={S.grid2}>
            <div>
              <div style={{...S.micro,marginBottom:8}}>Select Lead</div>
              <div style={{maxHeight:480,overflowY:"auto",paddingRight:4}}>
                {LEADS.sort((a,b)=>b.score-a.score).map(l=>(
                  <div key={l.id} onClick={()=>setOutreachLead(l)} style={{...S.card,padding:10,marginBottom:6,cursor:"pointer",border:`1px solid ${outreachLead?.id===l.id?"#4f46e5":"#111827"}`,background:outreachLead?.id===l.id?"#0d0f1e":"#080c18"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:14}}>{COUNTRY_FLAGS[l.country]}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:11,fontWeight:600,color:"#e2e8f0"}}>{l.companyName}</div>
                        <div style={{fontSize:9,color:"#475569"}}>{l.founderName} · {l.type} · {l.industry.split("/")[0]}</div>
                      </div>
                      <ScoreRing score={l.score}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{...S.micro,marginBottom:8}}>Outreach Angle</div>
              <div style={{display:"flex",gap:4,marginBottom:12,flexWrap:"wrap"}}>
                {[["hiring","🔥 Hiring Signal"],["outdatedSite","🌐 Old Website"],["fundraising","🚀 Post-Funding"],["automation","⚡ Automation Need"],["b2c_creator","🎯 Creator Platform"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setOutreachType(v)} style={{padding:"5px 10px",fontSize:9,borderRadius:4,cursor:"pointer",background:outreachType===v?"#4f46e5":"#080c18",color:outreachType===v?"#fff":"#475569",border:`1px solid ${outreachType===v?"#6366f1":"#111827"}`,fontFamily:"inherit"}}>{l}</button>
                ))}
              </div>
              {outreachLead ? (
                <>
                  <div style={{background:"#0f0f1a",border:"1px solid #1e293b",borderRadius:8,padding:12,marginBottom:12}}>
                    <div style={{fontSize:9,color:"#7c3aed",marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>Selected</div>
                    <div style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{outreachLead.companyName}</div>
                    <div style={{fontSize:10,color:"#475569",marginTop:2}}>{outreachLead.founderName} · {outreachLead.type} · {outreachLead.reachMethod}</div>
                  </div>
                  <button onClick={()=>generateMsg(outreachLead)} disabled={generating} style={{width:"100%",padding:"10px",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:6,color:"#fff",fontSize:11,fontFamily:"inherit",fontWeight:700,cursor:generating?"wait":"pointer",marginBottom:12}}>
                    {generating?"⏳ Claude is writing…":"⚡ Generate Personalized Message"}
                  </button>
                </>
              ) : (
                <div style={{padding:24,textAlign:"center",color:"#334155",fontSize:11,border:"1px dashed #1e293b",borderRadius:8}}>← Select a lead to generate outreach</div>
              )}
              {generatedMsg && (
                <div style={{animation:"fadeUp 0.3s ease"}}>
                  <div style={{...S.micro,marginBottom:6,color:"#4ade80"}}>Generated Message</div>
                  <div style={{background:"#050810",border:"1px solid #14532d",borderRadius:8,padding:14,fontSize:11,lineHeight:1.8,color:"#d1fae5",whiteSpace:"pre-wrap"}}>{generatedMsg}</div>
                  <button className="copy-btn" onClick={()=>navigator.clipboard?.writeText(generatedMsg)} style={{marginTop:8,padding:"6px 14px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:4,color:"#94a3b8",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>📋 Copy</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── APIFY ── */}
      {tab==="apify" && (
        <div style={{animation:"fadeUp 0.3s ease"}}>
          {!pipelineView ? (
            <div style={S.grid2}>
              <div>
                <div style={{...S.micro,marginBottom:8}}>Actor Configurations</div>
                {APIFY_ACTORS.map((a,i)=>(
                  <div key={a.id} onClick={()=>setApifyIdx(i)} style={{...S.card,padding:12,marginBottom:8,cursor:"pointer",border:`1px solid ${apifyIdx===i?a.color+"50":"#111827"}`,background:apifyIdx===i?"#0d0f1e":"#080c18"}}>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{fontSize:20}}>{a.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:11,fontWeight:700,color:"#e2e8f0"}}>{a.name}</div>
                        <div style={{fontSize:9,color:"#475569",marginTop:1}}>{a.targetLeadType}</div>
                      </div>
                      <span style={{fontSize:9,background:`${a.color}15`,color:a.color,border:`1px solid ${a.color}30`,borderRadius:3,padding:"2px 6px"}}>{a.actor.split("/")[1]?.slice(0,12)}</span>
                    </div>
                  </div>
                ))}
                <button onClick={()=>setPipelineView(true)} style={{width:"100%",padding:"10px",marginTop:4,background:"linear-gradient(135deg,#1e3a5f,#1e1b4b)",border:"1px solid #2563eb40",borderRadius:6,color:"#93c5fd",fontSize:10,fontFamily:"inherit",cursor:"pointer",fontWeight:700}}>⚙️ View Full Pipeline Code →</button>
              </div>
              <div>
                {APIFY_ACTORS[apifyIdx] && (() => {
                  const a = APIFY_ACTORS[apifyIdx];
                  return (
                    <div>
                      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
                        <span style={{fontSize:24}}>{a.icon}</span>
                        <div>
                          <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9"}}>{a.name}</div>
                          <div style={{fontSize:10,color:"#475569"}}>{a.purpose}</div>
                        </div>
                      </div>
                      <div style={{...S.micro,marginBottom:4,color:a.color}}>Actor ID</div>
                      <div style={{background:"#050810",border:`1px solid ${a.color}30`,borderRadius:5,padding:"6px 10px",fontSize:11,color:a.color,marginBottom:12,fontFamily:"monospace"}}>{a.actor}</div>
                      <div style={{...S.micro,marginBottom:4}}>Input Config (JSON)</div>
                      <div style={{background:"#050810",border:"1px solid #111827",borderRadius:6,padding:12,fontSize:10,overflowX:"auto",maxHeight:220,overflowY:"auto",lineHeight:1.7,fontFamily:"monospace"}} dangerouslySetInnerHTML={{__html:JSON.stringify(a.config,null,2).replace(/"([^"]+)":/g,'<span style="color:#818cf8">"$1"</span>:').replace(/: "([^"]+)"/g,': <span style="color:#4ade80">"$1"</span>').replace(/: (\d+)/g,': <span style="color:#fbbf24">$1</span>').replace(/: (true|false)/g,': <span style="color:#fb923c">$1</span>')}}/>
                      <div style={{...S.micro,marginBottom:4,marginTop:12,color:"#7c3aed"}}>Output Fields</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                        {a.outputFields.map(f=><span key={f} style={{background:"#1e1b4b",border:"1px solid #3730a3",color:"#a5b4fc",borderRadius:3,padding:"2px 7px",fontSize:9,fontFamily:"monospace"}}>{f}</span>)}
                      </div>
                      <div style={{...S.micro,marginBottom:4,color:"#059669"}}>Enrichment Hook</div>
                      <div style={{background:"#052e16",border:"1px solid #14532d",borderRadius:5,padding:8,fontSize:10,color:"#86efac",lineHeight:1.6}}>{a.enrichmentHook}</div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <button onClick={()=>setPipelineView(false)} style={{padding:"5px 12px",background:"#080c18",border:"1px solid #1e293b",borderRadius:4,color:"#94a3b8",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>← Back to Configs</button>
                <span style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>Full Orchestration Pipeline · Node.js</span>
                <button className="copy-btn" onClick={()=>navigator.clipboard?.writeText(PIPELINE_CODE)} style={{marginLeft:"auto",padding:"5px 12px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:4,color:"#94a3b8",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>📋 Copy Code</button>
              </div>
              <div style={{background:"#050810",border:"1px solid #111827",borderRadius:8,padding:16,fontSize:10,lineHeight:1.8,overflowX:"auto",maxHeight:520,overflowY:"auto",fontFamily:"monospace"}}>
                {renderCode(PIPELINE_CODE)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PIPELINE VISUAL ── */}
      {tab==="pipeline" && (
        <div style={{animation:"fadeUp 0.3s ease"}}>
          <div style={{...S.card,...S.p20,marginBottom:12}}>
            <div style={S.sTitle}>⚙️ Lead Generation Pipeline Architecture</div>
            <div style={{display:"flex",alignItems:"center",gap:0,overflowX:"auto",paddingBottom:8}}>
              {[
                {icon:"🗺️",label:"Google Maps",sub:"SMB leads",color:"#34a853"},
                {icon:"💼",label:"LinkedIn Jobs",sub:"Hiring signal",color:"#0077b5"},
                {icon:"📸",label:"Instagram",sub:"B2C creators",color:"#e1306c"},
                {icon:"🕷️",label:"Web Crawler",sub:"Enrich sites",color:"#9b59b6"},
                {icon:"🧠",label:"RAG Browser",sub:"Find founders",color:"#e74c3c"},
                {icon:"⚡",label:"Claude API",sub:"Score + draft",color:"#7c3aed"},
                {icon:"💾",label:"Dataset",sub:"Clean output",color:"#f59e0b"},
              ].map((s,i,arr)=>(
                <div key={i} style={{display:"flex",alignItems:"center",minWidth:0}}>
                  <div style={{textAlign:"center",minWidth:80,padding:"8px 4px"}}>
                    <div style={{width:44,height:44,background:`${s.color}15`,border:`1px solid ${s.color}35`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,margin:"0 auto 6px"}}>{s.icon}</div>
                    <div style={{fontSize:10,color:"#e2e8f0",fontWeight:600}}>{s.label}</div>
                    <div style={{fontSize:9,color:"#334155"}}>{s.sub}</div>
                  </div>
                  {i<arr.length-1 && <div style={{fontSize:14,color:"#1e293b",padding:"0 2px",flexShrink:0}}>→</div>}
                </div>
              ))}
            </div>
          </div>
          <div style={S.grid3}>
            {[
              {title:"🎯 B2B Targeting Logic",items:["Company size: 2–200 employees","Job posts: React/Node/Full Stack","Google rating: 3.5–4.3 (improvable)","Recent funding: seed to Series A","Tech signals: slow site, no mobile app","CTO departure = urgent need"]},
              {title:"🎯 B2C Targeting Logic",items:["Followers: 20K+ on IG/TikTok/YouTube","Bio signals: 'DM for…' (no platform)","Business account verified","Monetizing manually (no tech)","High engagement rate (>3%)","Industry: fitness, beauty, food, education"]},
              {title:"🤖 Claude Scoring Criteria",items:["Hiring signal detected (+25pts)","Recent funding (+20pts)","Outdated/slow website (+15pts)","Manual process visible (+15pts)","High social following + no app (+20pts)","Verified email available (+5pts)"]},
            ].map((c,i)=>(
              <div key={i} style={{...S.card,...S.p20}}>
                <div style={S.sTitle}>{c.title}</div>
                {c.items.map((item,j)=>(
                  <div key={j} style={{display:"flex",gap:8,marginBottom:7,alignItems:"flex-start"}}>
                    <span style={{color:"#4f46e5",marginTop:1,flexShrink:0}}>›</span>
                    <span style={{fontSize:11,color:"#64748b",lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{...S.card,...S.p20,marginTop:12}}>
            <div style={S.sTitle}>📦 .env Setup</div>
            <div style={{background:"#050810",border:"1px solid #111827",borderRadius:6,padding:12,fontFamily:"monospace",fontSize:11,lineHeight:2,color:"#94a3b8"}}>
              <div><span style={{color:"#4ade80"}}>APIFY_TOKEN</span>=<span style={{color:"#fbbf24"}}>apify_api_xxxxxxxxxxxxxxxxxxxxxxxx</span></div>
              <div><span style={{color:"#4ade80"}}>ANTHROPIC_API_KEY</span>=<span style={{color:"#fbbf24"}}>sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx</span></div>
              <div><span style={{color:"#818cf8"}}># Get Apify token: apify.com/account#/integrations</span></div>
              <div><span style={{color:"#818cf8"}}># Get Anthropic key: console.anthropic.com/settings/keys</span></div>
            </div>
          </div>
        </div>
      )}

      {/* ── INSIGHTS ── */}
      {tab==="insights" && (
        <div style={{animation:"fadeUp 0.3s ease"}}>
          <div style={S.grid2}>
            <div style={{...S.card,...S.p20}}>
              <div style={S.sTitle}>🌍 Market Opportunity by Country</div>
              {[
                {c:"USA",flag:"🇺🇸",insight:"Largest SaaS + startup market. Dev shortage = massive no-code demand. High deal values ($15K–$35K avg).",score:97},
                {c:"UAE",flag:"🇦🇪",insight:"Arabic language gap (RTL websites), WhatsApp-commerce, luxury digital experiences. High spending B2B + B2C.",score:91},
                {c:"UK",flag:"🇬🇧",insight:"PropTech, FinTech, HealthTech boom. High density of SMBs with legacy tech. Strong B2C creator economy.",score:88},
                {c:"Singapore",flag:"🇸🇬",insight:"MAS grants drive HealthTech upgrades. Regional HQ for SE Asian expansion. High-value enterprise deals.",score:85},
                {c:"Australia",flag:"🇦🇺",insight:"Govt digital health grants. Strong e-commerce + FoodTech scene. B2C wellness/fitness very active.",score:83},
                {c:"Germany",flag:"🇩🇪",insight:"CleanTech and Industrial SaaS pre-seed wave. Conservative buyers but large deal sizes when converted.",score:79},
              ].map(({c,flag,insight,score})=>(
                <div key={c} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid #0f172a"}}>
                  <span style={{fontSize:22}}>{flag}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{c}</span>
                      <div style={{flex:1,height:2,background:"#0f172a",overflow:"hidden",borderRadius:1}}>
                        <div style={{width:`${score}%`,height:"100%",background:`linear-gradient(90deg,#4f46e5,#7c3aed)`}}/>
                      </div>
                      <span style={{fontSize:10,color:"#4f46e5"}}>{score}</span>
                    </div>
                    <div style={{fontSize:10,color:"#475569",lineHeight:1.5}}>{insight}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{...S.card,...S.p20}}>
                <div style={S.sTitle}>🎯 B2B vs B2C Strategy</div>
                {[
                  {seg:"B2B",color:"#3b82f6",tips:["Hiring signal = hottest trigger (check LinkedIn daily)","Pain point: manual process bleeding money","Anchor pitch to dev cost savings ($120K vs $15K)","Target funding events within 30 days","Entry: automation project ($3–5K) → upsell to full app"]},
                  {seg:"B2C",color:"#10b981",tips:["High followers + no platform = revenue leak","Bio with 'DM me for...' = no tech = easy win","Pitch: 'own your audience, not rent it from Instagram'","Revenue model: subscription app + commission","Entry: simple booking/store → grow to full platform"]},
                ].map(({seg,color,tips})=>(
                  <div key={seg} style={{marginBottom:14}}>
                    <div style={{fontSize:11,fontWeight:700,color,marginBottom:6}}>{seg} Strategy</div>
                    {tips.map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:6,marginBottom:4}}>
                        <span style={{color,flexShrink:0,fontSize:10}}>›</span>
                        <span style={{fontSize:10,color:"#64748b",lineHeight:1.5}}>{t}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{...S.card,...S.p20}}>
                <div style={S.sTitle}>💰 Estimated Pipeline Value</div>
                {[
                  {label:"Priority B2B leads",count:LEADS.filter(l=>l.priority&&l.type==="B2B").length,avg:22000,color:"#3b82f6"},
                  {label:"General B2B leads",count:LEADS.filter(l=>!l.priority&&l.type==="B2B").length,avg:13000,color:"#60a5fa"},
                  {label:"Priority B2C leads",count:LEADS.filter(l=>l.priority&&l.type==="B2C").length,avg:12000,color:"#10b981"},
                  {label:"General B2C leads",count:LEADS.filter(l=>!l.priority&&l.type==="B2C").length,avg:8000,color:"#34d399"},
                ].map(({label,count,avg,color})=>(
                  <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid #0f172a"}}>
                    <div>
                      <div style={{fontSize:10,color:"#94a3b8"}}>{label}</div>
                      <div style={{fontSize:9,color:"#334155"}}>{count} leads × ${(avg/1000).toFixed(0)}K avg</div>
                    </div>
                    <span style={{fontSize:12,fontWeight:700,color}}>${((count*avg)/1000).toFixed(0)}K</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10}}>
                  <span style={{fontSize:11,color:"#e2e8f0",fontWeight:700}}>Total Pipeline (est.)</span>
                  <span style={{fontSize:16,fontWeight:800,color:"#a78bfa"}}>
                    ${Math.round(LEADS.filter(l=>l.priority&&l.type==="B2B").length*22000/1000+LEADS.filter(l=>!l.priority&&l.type==="B2B").length*13000/1000+LEADS.filter(l=>l.priority&&l.type==="B2C").length*12000/1000+LEADS.filter(l=>!l.priority&&l.type==="B2C").length*8000/1000)}K
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{...S.card,...S.p20,marginTop:12}}>
            <div style={S.sTitle}>⚡ 6 Highest-Converting Plays for RapidCode</div>
            <div style={S.grid3}>
              {[
                {icon:"🔥",title:"Job Post Monitor",desc:"Set up daily LinkedIn alert for 'React developer' in 8 target countries. Companies posting 3+ dev jobs = highest-intent lead. Convert the $180K hiring budget into a $20K no-code sprint pitch."},
                {icon:"🇦🇪",title:"UAE Arabic Tech Gap",desc:"99% of UAE e-commerce sites have no Arabic RTL, no WhatsApp checkout. This is a $15–25K productized service. Target luxury brands, real estate, food delivery in Dubai + Abu Dhabi."},
                {icon:"📸",title:"B2C Creator to Platform",desc:"Find Instagram/TikTok accounts with 25K+ followers where bio says 'DM for coaching/orders'. These are $10–15K projects. Pitch: 'Stop giving Instagram your revenue'."},
                {icon:"🚀",title:"Pre-Seed MVP Sprint",desc:"Founders raising their first round need a demo-ready product, not a Figma file. Offer a 3-week 'fundraising sprint' ($12–18K fixed price). Search Crunchbase for rounds opened <60 days ago."},
                {icon:"🔄",title:"Bubble/Webflow Migration",desc:"Companies hitting limits on Bubble/Webflow/Wix are desperate to migrate. They have a product, paying customers, and a technical ceiling. These are $20–30K projects with near-zero sales resistance."},
                {icon:"⚡",title:"n8n Automation as Entry",desc:"Lead with a $3–5K automation project (n8n) instead of a full app build. Once you deliver ROI in 3 weeks, upsell to the $15–25K platform. Conversion rate from automation → app is >60%."},
              ].map((c,i)=>(
                <div key={i} style={{background:"#050810",border:"1px solid #111827",borderRadius:8,padding:14}}>
                  <div style={{fontSize:20,marginBottom:6}}>{c.icon}</div>
                  <div style={{fontSize:11,fontWeight:700,color:"#e2e8f0",marginBottom:5}}>{c.title}</div>
                  <div style={{fontSize:10,color:"#475569",lineHeight:1.6}}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      </div>

      {/* ── LEAD MODAL ── */}
      {selected && (
        <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&setSelected(null)}>
          <div style={S.modal}>
            <div style={{padding:"18px 20px 0",borderBottom:"1px solid #111827"}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
                <div style={{width:46,height:46,background:`${getIColor(selected.industry)}15`,border:`1px solid ${getIColor(selected.industry)}30`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{COUNTRY_FLAGS[selected.country]}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:2}}>
                    <span style={{fontSize:17,fontWeight:800,color:"#f8fafc"}}>{selected.companyName}</span>
                    <Tag label={selected.type} color={selected.type==="B2B"?"#3b82f6":"#10b981"}/>
                    {selected.priority && <Tag label="🔥 PRIORITY" color="#ef4444"/>}
                  </div>
                  <div style={{fontSize:11,color:"#475569"}}>{selected.industry} · {selected.city}, {selected.country}</div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:12,fontWeight:700,color:"#7c3aed"}}>{selected.dealValue}</span>
                  <ScoreRing score={selected.score}/>
                  <button onClick={()=>setSelected(null)} style={{background:"#0f172a",border:"none",color:"#475569",width:26,height:26,borderRadius:4,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>
              </div>
              <div style={{display:"flex",gap:0}}>
                {["overview","contact","ai"].map(t=>(
                  <button key={t} onClick={()=>setModalTab(t)} style={{padding:"8px 14px",fontSize:10,background:"none",border:"none",borderBottom:`2px solid ${modalTab===t?"#7c3aed":"transparent"}`,color:modalTab===t?"#a78bfa":"#475569",cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.5px",fontWeight:modalTab===t?700:400,textTransform:"capitalize"}}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{padding:20,maxHeight:480,overflowY:"auto"}}>
              {modalTab==="overview" && (
                <div>
                  <div style={{background:"#07090f",border:"1px solid #1e293b",borderRadius:8,padding:14,marginBottom:12}}>
                    <div style={{fontSize:9,color:"#ef4444",textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>⚠️ Pain Points & Signals</div>
                    <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.7}}>{selected.painPoint}</div>
                  </div>
                  <div style={{background:"#07090f",border:"1px solid #14532d",borderRadius:8,padding:14,marginBottom:12}}>
                    <div style={{fontSize:9,color:"#4ade80",textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>✅ Proposed Service from RapidCode</div>
                    <div style={{fontSize:11,color:"#86efac",lineHeight:1.7}}>{selected.proposedService}</div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                    {[["Funding",selected.fundingStage],["Team",selected.employees],["Last Activity",selected.lastActivity],["Reach via",selected.reachMethod],["Est. Deal",selected.dealValue],["Score",`${selected.score}/100`]].map(([l,v])=>(
                      <div key={l} style={{background:"#07090f",border:"1px solid #111827",borderRadius:6,padding:10}}>
                        <div style={{fontSize:8,color:"#334155",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:3}}>{l}</div>
                        <div style={{fontSize:10,color:"#94a3b8"}}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalTab==="contact" && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[
                    ["Contact Name",selected.clientName],["Company",selected.companyName],
                    ["Email",selected.email||"—"],["Phone",selected.phone||"—"],
                    ["LinkedIn",selected.linkedin],["Social",selected.social||"—"],
                    ["Website",selected.website],["Founder",selected.founderName],
                    ["Founder Email",selected.founderEmail||"—"],["Country",`${COUNTRY_FLAGS[selected.country]} ${selected.country}`]
                  ].map(([l,v])=>(
                    <div key={l} style={{background:"#07090f",border:"1px solid #111827",borderRadius:6,padding:10}}>
                      <div style={{fontSize:8,color:"#334155",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:3}}>{l}</div>
                      <div style={{fontSize:10,color:"#94a3b8",wordBreak:"break-all"}}>{v}</div>
                    </div>
                  ))}
                </div>
              )}

              {modalTab==="ai" && (
                <div>
                  <button onClick={()=>analyzeAI(selected)} disabled={analyzing} style={{width:"100%",padding:"10px",marginBottom:12,background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:6,color:"#fff",fontSize:11,fontFamily:"inherit",fontWeight:700,cursor:analyzing?"wait":"pointer"}}>
                    {analyzing?"⏳ Claude is analyzing…":"🤖 Deep AI Lead Analysis"}
                  </button>
                  {aiAnalysis && (
                    <div style={{background:"#050810",border:"1px solid #1e1b4b",borderRadius:8,padding:14,fontSize:11,lineHeight:1.8,color:"#a5b4fc",whiteSpace:"pre-wrap",animation:"fadeUp 0.3s ease"}}>{aiAnalysis}</div>
                  )}
                  <button onClick={()=>{setOutreachLead(selected);setTab("outreach");setSelected(null);}} style={{marginTop:10,padding:"8px 16px",background:"#07090f",border:"1px solid #1e293b",borderRadius:5,color:"#94a3b8",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>✉️ Generate Outreach for this Lead</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
