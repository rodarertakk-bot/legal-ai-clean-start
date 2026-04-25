
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Scale,
  Globe2,
  MessageCircle,
  Calendar,
  CreditCard,
  Download,
  Users,
  Sparkles
} from "lucide-react";
import "./style.css";

const CONFIG = {
  whatsappNumber: "905000000000",
  calendlyUrl: "https://calendly.com/your-link/consultation",
  paymentLinks: {
    basic: "https://your-payment-link/basic",
    standard: "https://your-payment-link/standard",
    premium: "https://your-payment-link/premium"
  }
};

const supportedLanguages = [
  "English",
  "Turkish",
  "Arabic",
  "Russian",
  "Ukrainian",
  "Kurdish",
  "Zazaki",
  "German",
  "Dutch",
  "Circassian"
];

const docsByCompanyType = {
  limited: [
    "Passport copy",
    "Potential tax number",
    "Company title",
    "Business activity",
    "Registered office address",
    "Articles of association",
    "Signature declaration",
    "Accountant engagement"
  ],
  joint: [
    "Passport copy",
    "Potential tax number",
    "Capital structure",
    "Board details",
    "Articles of association",
    "Registered office address",
    "Accountant engagement"
  ],
  branch: [
    "Parent company documents",
    "Board resolution",
    "Apostilled documents",
    "Turkish translations",
    "Local representative details",
    "Registered office address"
  ]
};

const packages = [
  {
    id: "basic",
    name: "Basic Report",
    price: "$49",
    description: "AI intake report and document checklist."
  },
  {
    id: "standard",
    name: "Legal Consultation",
    price: "$149",
    description: "Report plus 30-minute consultation."
  },
  {
    id: "premium",
    name: "Full Setup Support",
    price: "$999+",
    description: "End-to-end company formation coordination."
  }
];

function calculateRisk(form) {
  let score = 0;
  if (!form.name || !form.nationality) score += 1;
  if (!form.businessActivity) score += 2;
  if (form.residenceGoal === "yes") score += 1;
  if (form.hasAddress === "no") score += 2;
  if (form.budget === "low") score += 2;
  if (form.urgency === "urgent") score += 1;
  if (form.purpose === "unclear") score += 2;

  if (score >= 7) return { label: "High", score };
  if (score >= 4) return { label: "Medium", score };
  return { label: "Low", score };
}

function generateAssessment(form, risk) {
  const docs = docsByCompanyType[form.companyType] || docsByCompanyType.limited;
  const company =
    form.companyType === "limited"
      ? "Limited Liability Company"
      : form.companyType === "joint"
      ? "Joint Stock Company"
      : "Branch Office";

  return `MULTILINGUAL LEGAL INTAKE ASSESSMENT

Client: ${form.name || "Not provided"}
Nationality: ${form.nationality || "Not provided"}
Preferred Language: ${form.preferredLanguage}
Company Type: ${company}
Business Activity: ${form.businessActivity || "Not provided"}
Residence Permit Goal: ${form.residenceGoal}
Budget Level: ${form.budget}
Office Address: ${form.hasAddress}
Urgency: ${form.urgency}
Purpose Clarity: ${form.purpose}

Risk Level: ${risk.label}
Risk Score: ${risk.score}/10

Preliminary View:
The client may be suitable for an initial legal consultation regarding company formation in Turkey. Key points to clarify include company purpose, registered address, accounting obligations, immigration goals, expected timeline and preferred communication language.

Multilingual Support:
Our team can provide communication support in English, Turkish, Arabic, Russian, Ukrainian, Kurdish, Zazaki, German, Dutch and Circassian.

Recommended Legal Path:
1. Confirm identity, nationality and preferred language.
2. Review suitable company type.
3. Coordinate tax/accounting obligations with a certified accountant.
4. Prepare required documents.
5. If residence permit is requested, review immigration route and timing.
6. Send fee quote and engagement letter.

Required Documents:
${docs.map((d, i) => `${i + 1}. ${d}`).join("\n")}

Disclaimer:
This is a preliminary intake report and does not constitute final legal advice.`;
}

function App() {
  const [form, setForm] = useState({
    name: "",
    nationality: "",
    preferredLanguage: "English",
    companyType: "limited",
    businessActivity: "",
    residenceGoal: "yes",
    budget: "medium",
    hasAddress: "no",
    urgency: "normal",
    purpose: "clear",
    notes: ""
  });

  const [assessment, setAssessment] = useState("");
  const [leads, setLeads] = useState([]);

  const risk = useMemo(() => calculateRisk(form), [form]);
  const docs = docsByCompanyType[form.companyType] || docsByCompanyType.limited;

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleGenerate = () => {
    const text = generateAssessment(form, risk);
    setAssessment(text);
    setLeads((prev) => [
      {
        id: Date.now(),
        name: form.name || "Unnamed lead",
        nationality: form.nationality || "Unknown",
        language: form.preferredLanguage,
        service: form.residenceGoal === "yes" ? "Company + Residence" : "Company",
        risk: risk.label
      },
      ...prev
    ].slice(0, 6));
  };

  const downloadReport = () => {
    const text = assessment || generateAssessment(form, risk);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `legal-report-${form.name || "client"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const whatsappText = assessment || "Hello, I want to start a company in Turkey.";
  const whatsappLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <main className="page">
      <section className="hero">
        <div className="heroIcon">
          <Scale size={34} />
        </div>
        <div>
          <h1>Multilingual Turkey Legal AI Assistant</h1>
          <p>
            Company formation, residence permit and legal intake system for foreign clients in Turkey.
          </p>
          <div className="warning">
            This tool provides preliminary intake support only. It is not final legal advice.
          </div>
        </div>
      </section>

      <section className="card">
        <h2><Globe2 size={20} /> Supported Languages</h2>
        <p className="muted">
          Our team provides communication support in multiple languages.
        </p>
        <div className="badges">
          {supportedLanguages.map((lang) => <span className="badge" key={lang}>{lang}</span>)}
        </div>
      </section>

      <div className="grid">
        <section className="card">
          <h2>Client Intake Form</h2>
          <div className="form">
            <input placeholder="Client name" value={form.name} onChange={(e) => update("name", e.target.value)} />
            <input placeholder="Nationality" value={form.nationality} onChange={(e) => update("nationality", e.target.value)} />
            <select value={form.preferredLanguage} onChange={(e) => update("preferredLanguage", e.target.value)}>
              {supportedLanguages.map((lang) => <option key={lang}>{lang}</option>)}
            </select>
            <select value={form.companyType} onChange={(e) => update("companyType", e.target.value)}>
              <option value="limited">Limited Liability Company</option>
              <option value="joint">Joint Stock Company</option>
              <option value="branch">Branch Office</option>
            </select>
            <textarea placeholder="Business activity" value={form.businessActivity} onChange={(e) => update("businessActivity", e.target.value)} />
            <select value={form.residenceGoal} onChange={(e) => update("residenceGoal", e.target.value)}>
              <option value="yes">Residence permit requested</option>
              <option value="no">No residence permit</option>
              <option value="unsure">Not sure</option>
            </select>
            <select value={form.budget} onChange={(e) => update("budget", e.target.value)}>
              <option value="low">Low budget</option>
              <option value="medium">Medium budget</option>
              <option value="high">High budget</option>
            </select>
            <select value={form.hasAddress} onChange={(e) => update("hasAddress", e.target.value)}>
              <option value="yes">Has office address</option>
              <option value="no">No office address</option>
            </select>
            <select value={form.urgency} onChange={(e) => update("urgency", e.target.value)}>
              <option value="normal">Normal timing</option>
              <option value="urgent">Urgent</option>
            </select>
            <select value={form.purpose} onChange={(e) => update("purpose", e.target.value)}>
              <option value="clear">Purpose clear</option>
              <option value="unclear">Purpose unclear</option>
            </select>
            <textarea placeholder="Additional notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
            <button onClick={handleGenerate}><Sparkles size={17} /> Generate AI Assessment</button>
          </div>
        </section>

        <section className="card">
          <div className="topline">
            <h2>AI Legal Assessment</h2>
            <span className={`risk risk-${risk.label.toLowerCase()}`}>Risk: {risk.label}</span>
          </div>

          <div className="stats">
            <div><b>{risk.score}/10</b><span>Risk Score</span></div>
            <div><b>{form.preferredLanguage}</b><span>Language</span></div>
            <div><b>{docs.length}</b><span>Documents</span></div>
          </div>

          <textarea className="output" readOnly value={assessment} placeholder="Generate the assessment to see the output here." />

          <div className="actions">
            <button className="secondary" onClick={downloadReport}><Download size={17} /> Download Report</button>
            <a href={whatsappLink} target="_blank" rel="noreferrer"><button><MessageCircle size={17} /> WhatsApp</button></a>
            <a href={CONFIG.calendlyUrl} target="_blank" rel="noreferrer"><button className="secondary"><Calendar size={17} /> Book Consultation</button></a>
          </div>
        </section>
      </div>

      <section className="card">
        <h2><CreditCard size={20} /> Consultation Packages</h2>
        <div className="packages">
          {packages.map((pkg) => (
            <div className="package" key={pkg.id}>
              <h3>{pkg.name}</h3>
              <strong>{pkg.price}</strong>
              <p>{pkg.description}</p>
              <a href={CONFIG.paymentLinks[pkg.id]} target="_blank" rel="noreferrer">
                <button>Pay Now</button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2><Users size={20} /> Lead CRM</h2>
        {leads.length === 0 ? (
          <p className="muted">No leads yet. Generate an assessment to add a lead.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Nationality</th>
                <th>Language</th>
                <th>Service</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.nationality}</td>
                  <td>{lead.language}</td>
                  <td>{lead.service}</td>
                  <td>{lead.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
