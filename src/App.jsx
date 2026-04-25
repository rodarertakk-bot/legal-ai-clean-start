
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
  Sparkles,
  Mail,
  FileText,
  Languages,
  CheckCircle2
} from "lucide-react";
import "./style.css";

const CONFIG = {
  whatsappNumber: "905000000000", // Buraya WhatsApp Business numaranı yaz: 905xxxxxxxxx
  calendlyUrl: "https://calendly.com/your-link/consultation",
  paymentLinks: {
    basic: "https://your-payment-link/basic",
    standard: "https://your-payment-link/standard",
    premium: "https://your-payment-link/premium"
  },
  lawOfficeName: "Your Law Office"
};

const appLanguages = [
  { code: "en", name: "English" },
  { code: "tr", name: "Türkçe" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" },
  { code: "uk", name: "Українська" },
  { code: "ku", name: "Kurdî" },
  { code: "zza", name: "Zazakî" },
  { code: "de", name: "Deutsch" },
  { code: "nl", name: "Nederlands" },
  { code: "ady", name: "Адыгэбзэ" }
];

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

const t = {
  en: {
    title: "Multilingual Turkey Legal AI Assistant",
    subtitle: "Company formation, residence permit and legal intake system for foreign clients in Turkey.",
    disclaimer: "This tool provides preliminary intake support only. It is not final legal advice.",
    positioning: "We help foreigners start a company and legally stay in Turkey — with multilingual support.",
    supported: "Supported Languages",
    supportText: "Our team provides communication support in multiple languages.",
    form: "Client Intake Form",
    name: "Client name",
    nationality: "Nationality",
    preferredLanguage: "Preferred communication language",
    companyType: "Company type",
    businessActivity: "Business activity",
    residenceGoal: "Residence permit goal",
    budget: "Budget level",
    address: "Office address",
    urgency: "Urgency",
    purpose: "Purpose clarity",
    notes: "Additional notes",
    generate: "Generate AI Assessment",
    assessment: "AI Legal Assessment",
    risk: "Risk",
    download: "Download Report",
    whatsapp: "Send via WhatsApp",
    book: "Book Consultation",
    email: "Generate Email Reply",
    packages: "Consultation Packages",
    crm: "Lead CRM",
    setup: "Setup Notes"
  },
  tr: {
    title: "Çok Dilli Türkiye Hukuk AI Asistanı",
    subtitle: "Yabancı müvekkiller için şirket kuruluşu, oturma izni ve ön görüşme sistemi.",
    disclaimer: "Bu araç yalnızca ön değerlendirme desteği sağlar. Nihai hukuki danışmanlık değildir.",
    positioning: "Yabancıların Türkiye’de şirket kurmasına ve yasal olarak kalmasına çok dilli destekle yardımcı oluyoruz.",
    supported: "Desteklenen Diller",
    supportText: "Ekibimiz birden fazla dilde iletişim desteği sağlar.",
    form: "Müvekkil Ön Görüşme Formu",
    name: "Müvekkil adı",
    nationality: "Uyruk",
    preferredLanguage: "Tercih edilen iletişim dili",
    companyType: "Şirket türü",
    businessActivity: "Faaliyet alanı",
    residenceGoal: "Oturma izni hedefi",
    budget: "Bütçe seviyesi",
    address: "Ofis adresi",
    urgency: "Aciliyet",
    purpose: "Amaç netliği",
    notes: "Ek notlar",
    generate: "AI Değerlendirmesi Oluştur",
    assessment: "AI Hukuki Ön Değerlendirme",
    risk: "Risk",
    download: "Raporu İndir",
    whatsapp: "WhatsApp ile Gönder",
    book: "Danışma Randevusu Al",
    email: "E-posta Cevabı Oluştur",
    packages: "Danışmanlık Paketleri",
    crm: "Müşteri Takip Paneli",
    setup: "Kurulum Notları"
  },
  ar: {
    title: "مساعد قانوني ذكي متعدد اللغات في تركيا",
    subtitle: "نظام أولي لتأسيس الشركات والإقامة للعملاء الأجانب في تركيا.",
    disclaimer: "هذه الأداة للتقييم الأولي فقط ولا تعد استشارة قانونية نهائية.",
    positioning: "نساعد الأجانب على تأسيس شركة والإقامة بشكل قانوني في تركيا مع دعم متعدد اللغات.",
    supported: "اللغات المدعومة",
    supportText: "يمكن لفريقنا تقديم دعم تواصلي بعدة لغات.",
    form: "نموذج العميل",
    name: "اسم العميل",
    nationality: "الجنسية",
    preferredLanguage: "لغة التواصل المفضلة",
    companyType: "نوع الشركة",
    businessActivity: "النشاط التجاري",
    residenceGoal: "هدف الإقامة",
    budget: "مستوى الميزانية",
    address: "عنوان المكتب",
    urgency: "الاستعجال",
    purpose: "وضوح الهدف",
    notes: "ملاحظات إضافية",
    generate: "إنشاء التقييم",
    assessment: "تقييم قانوني أولي",
    risk: "المخاطر",
    download: "تحميل التقرير",
    whatsapp: "إرسال عبر واتساب",
    book: "حجز استشارة",
    email: "إنشاء رد بريد إلكتروني",
    packages: "باقات الاستشارة",
    crm: "إدارة العملاء",
    setup: "ملاحظات الإعداد"
  },
  ru: {
    title: "Многоязычный юридический AI Ассистент в Турции",
    subtitle: "Система первичной оценки для регистрации компании и ВНЖ в Турции.",
    disclaimer: "Инструмент предназначен только для предварительной оценки и не является окончательной юридической консультацией.",
    positioning: "Мы помогаем иностранцам открыть компанию и легально находиться в Турции с многоязычной поддержкой.",
    supported: "Поддерживаемые языки",
    supportText: "Наша команда может предоставить коммуникационную поддержку на нескольких языках.",
    form: "Анкета клиента",
    name: "Имя клиента",
    nationality: "Гражданство",
    preferredLanguage: "Предпочитаемый язык общения",
    companyType: "Тип компании",
    businessActivity: "Вид деятельности",
    residenceGoal: "Цель ВНЖ",
    budget: "Уровень бюджета",
    address: "Адрес офиса",
    urgency: "Срочность",
    purpose: "Ясность цели",
    notes: "Дополнительные заметки",
    generate: "Создать AI оценку",
    assessment: "Первичная юридическая оценка",
    risk: "Риск",
    download: "Скачать отчет",
    whatsapp: "Отправить в WhatsApp",
    book: "Записаться на консультацию",
    email: "Создать email ответ",
    packages: "Пакеты консультаций",
    crm: "CRM лидов",
    setup: "Настройки"
  },
  uk: {
    title: "Багатомовний юридичний AI Асистент у Туреччині",
    subtitle: "Система первинної оцінки для реєстрації компанії та посвідки на проживання в Туреччині.",
    disclaimer: "Цей інструмент призначений лише для попередньої оцінки і не є остаточною юридичною консультацією.",
    positioning: "Ми допомагаємо іноземцям відкрити компанію та легально проживати в Туреччині з багатомовною підтримкою.",
    supported: "Підтримувані мови",
    supportText: "Наша команда може надати комунікаційну підтримку кількома мовами.",
    form: "Анкета клієнта",
    name: "Ім’я клієнта",
    nationality: "Громадянство",
    preferredLanguage: "Бажана мова спілкування",
    companyType: "Тип компанії",
    businessActivity: "Вид діяльності",
    residenceGoal: "Мета посвідки",
    budget: "Рівень бюджету",
    address: "Адреса офісу",
    urgency: "Терміновість",
    purpose: "Чіткість мети",
    notes: "Додаткові нотатки",
    generate: "Створити AI оцінку",
    assessment: "Попередня юридична оцінка",
    risk: "Ризик",
    download: "Завантажити звіт",
    whatsapp: "Надіслати через WhatsApp",
    book: "Забронювати консультацію",
    email: "Створити email відповідь",
    packages: "Пакети консультацій",
    crm: "CRM лідів",
    setup: "Налаштування"
  },
  ku: {
    title: "Alîkarê Hiqûqî yê AI ji bo Tirkiyeyê",
    subtitle: "Pergala nirxandina destpêkê ji bo damezrandina şirketê û destûra rûniştinê.",
    disclaimer: "Ev amûr tenê ji bo nirxandina destpêkê ye; şêwirmendiya hiqûqî ya dawî nîne.",
    positioning: "Em alîkariya biyanîyan dikin ku li Tirkiyeyê şirket ava bikin û bi qanûnî bimînin.",
    supported: "Zimanên Piştgirîkirî",
    supportText: "Tîma me dikare bi çend zimanan piştgirî bide.",
    form: "Forma Destpêkê ya Muşterî",
    name: "Navê muşterî",
    nationality: "Neteweyî",
    preferredLanguage: "Zimanê têkiliyê",
    companyType: "Cureyê şirketê",
    businessActivity: "Qada kar",
    residenceGoal: "Armanca rûniştinê",
    budget: "Astê budceyê",
    address: "Navnîşana ofîsê",
    urgency: "Lez",
    purpose: "Zelaliya armancê",
    notes: "Têbînî",
    generate: "Nirxandina AI Çêke",
    assessment: "Nirxandina Hiqûqî ya AI",
    risk: "Rîsk",
    download: "Raporê Daxîne",
    whatsapp: "Bi WhatsApp bişîne",
    book: "Randevû bistîne",
    email: "Bersiva Emailê Çêke",
    packages: "Pakêtên Şêwirmendiyê",
    crm: "CRM",
    setup: "Nîşeyên Sazkirinê"
  },
  zza: {
    title: "Tırkiya ra Zafzıwani Huqûq AI Asistanı",
    subtitle: "Biyaniyan rê şirket ronayışi û roniştiş izni rê verêniye nirxandin sistemi.",
    disclaimer: "Na hacet tena verêniye nirxandin rê yo; pêro huqûqî şêwirmendî nêyo.",
    positioning: "Ma biyanîyan rê Tırkiya de şirket ronayış û qanûnî manayış de zafzıwani piştgirî dana.",
    supported: "Zıwanê Destekkerde",
    supportText: "Ekibê ma zaf zıwanan de piştgiriya têkiliyê bido.",
    form: "Forma Verêniye ya Muşterî",
    name: "Nameyê muşterî",
    nationality: "Uyruk",
    preferredLanguage: "Zıwanê têkili",
    companyType: "Neweyê şirketi",
    businessActivity: "Faaliyet alanı",
    residenceGoal: "Armanca roniştiş izni",
    budget: "Seviyeyê budce",
    address: "Adresê ofîsî",
    urgency: "Acilîyet",
    purpose: "Açıklığıya armancî",
    notes: "Notê zêde",
    generate: "AI Nirxandin Vıraze",
    assessment: "AI Huqûqî Verêniye Nirxandin",
    risk: "Risk",
    download: "Raporî Warêne",
    whatsapp: "WhatsApp ra Bırışe",
    book: "Randevu Bıgire",
    email: "Email Cewab Vıraze",
    packages: "Paketê Şêwirmendî",
    crm: "CRM",
    setup: "Notê Sazkerdişî"
  },
  de: {
    title: "Mehrsprachiger Türkei Legal AI Assistant",
    subtitle: "System für Unternehmensgründung, Aufenthaltserlaubnis und Erstaufnahme ausländischer Mandanten in der Türkei.",
    disclaimer: "Dieses Tool dient nur der vorläufigen Aufnahme und stellt keine endgültige Rechtsberatung dar.",
    positioning: "Wir helfen Ausländern, in der Türkei ein Unternehmen zu gründen und legal zu bleiben — mit mehrsprachiger Unterstützung.",
    supported: "Unterstützte Sprachen",
    supportText: "Unser Team kann Kommunikationsunterstützung in mehreren Sprachen anbieten.",
    form: "Mandantenaufnahmeformular",
    name: "Name des Mandanten",
    nationality: "Staatsangehörigkeit",
    preferredLanguage: "Bevorzugte Sprache",
    companyType: "Gesellschaftsform",
    businessActivity: "Geschäftstätigkeit",
    residenceGoal: "Aufenthaltsziel",
    budget: "Budgetniveau",
    address: "Büroadresse",
    urgency: "Dringlichkeit",
    purpose: "Klarheit des Zwecks",
    notes: "Zusätzliche Notizen",
    generate: "AI Einschätzung erstellen",
    assessment: "AI Rechtliche Ersteinschätzung",
    risk: "Risiko",
    download: "Bericht herunterladen",
    whatsapp: "Per WhatsApp senden",
    book: "Beratung buchen",
    email: "E-Mail-Antwort erstellen",
    packages: "Beratungspakete",
    crm: "Lead CRM",
    setup: "Einrichtungshinweise"
  },
  nl: {
    title: "Meertalige Turkije Legal AI Assistant",
    subtitle: "Systeem voor bedrijfsoprichting, verblijfsvergunning en intake van buitenlandse cliënten in Turkije.",
    disclaimer: "Deze tool biedt alleen voorlopige intake-ondersteuning en is geen definitief juridisch advies.",
    positioning: "Wij helpen buitenlanders een bedrijf op te richten en legaal in Turkije te verblijven — met meertalige ondersteuning.",
    supported: "Ondersteunde talen",
    supportText: "Ons team kan communicatieondersteuning bieden in meerdere talen.",
    form: "Cliënt Intakeformulier",
    name: "Naam cliënt",
    nationality: "Nationaliteit",
    preferredLanguage: "Voorkeurstaal",
    companyType: "Bedrijfstype",
    businessActivity: "Bedrijfsactiviteit",
    residenceGoal: "Verblijfsdoel",
    budget: "Budgetniveau",
    address: "Kantooradres",
    urgency: "Urgentie",
    purpose: "Duidelijkheid doel",
    notes: "Extra opmerkingen",
    generate: "AI Beoordeling Maken",
    assessment: "AI Juridische Voorbeoordeling",
    risk: "Risico",
    download: "Rapport Downloaden",
    whatsapp: "Versturen via WhatsApp",
    book: "Consult Boeken",
    email: "E-mailantwoord Maken",
    packages: "Consultatiepakketten",
    crm: "Lead CRM",
    setup: "Instellingen"
  },
  ady: {
    title: "Тыркуем ис юридическэ AI Асистант",
    subtitle: "Чужыщэ клиентхэм я компания къэухьанрэ зэхуэщIэн системэ.",
    disclaimer: "Мы инструмент предварительнэ оценкэ папщIэу. Финал юридическэ консультациеу нэхъыфIкъым.",
    positioning: "Мы чужыщэхэм Тыркуем компания къэухьанрэ законным къэнахьанрэ зэхуэщIынэу къыдэт.",
    supported: "Бзэхэр",
    supportText: "Тым зэфIэкIым бзэхэмкIэ коммуникацие къыдэт.",
    form: "Клиент формэ",
    name: "Клиент цIэ",
    nationality: "Гражданствэ",
    preferredLanguage: "ЗэхэщIыкIэ бзэ",
    companyType: "Компания тип",
    businessActivity: "Бизнес кIуэцI",
    residenceGoal: "ЖэуапщIэу къэнахьан",
    budget: "Бюджет",
    address: "Офис адрес",
    urgency: "Срочнэ",
    purpose: "Мурад псалъэ",
    notes: "Нэмыс",
    generate: "AI оценкэ къэгъэщIын",
    assessment: "AI юридическэ оценкэ",
    risk: "Риск",
    download: "Отчет къытехын",
    whatsapp: "WhatsApp-ымкIэ къыщIын",
    book: "Консультацие зэхыхьын",
    email: "Email жэуап къэгъэщIын",
    packages: "Консультацие пакетхэр",
    crm: "CRM",
    setup: "Сазлъэпкъ"
  }
};

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
    description: "AI intake report and document checklist.",
    features: ["Preliminary case review", "Document checklist", "Basic risk score"]
  },
  {
    id: "standard",
    name: "Legal Consultation",
    price: "$149",
    description: "Report plus 30-minute consultation.",
    features: ["Everything in Basic", "30-minute call", "Next-step roadmap"]
  },
  {
    id: "premium",
    name: "Full Setup Support",
    price: "$999+",
    description: "End-to-end company formation coordination.",
    features: ["Consultation", "Document preparation", "Accountant coordination", "Residence permit planning"]
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

Additional Notes:
${form.notes || "No additional notes."}

Disclaimer:
This is a preliminary intake report and does not constitute final legal advice.`;
}

function generateEmail(form) {
  return `Subject: Your Turkey Company Formation Request

Dear ${form.name || "Client"},

Thank you for contacting us regarding company formation in Turkey.

Based on the information you provided, we can assist you with the preliminary review, document preparation roadmap, and consultation regarding the suitable company structure and residence permit considerations.

We can also arrange communication support in your preferred language: ${form.preferredLanguage}.

The next step is to book a legal consultation so we can review your situation in detail and provide a clear action plan.

Best regards,
${CONFIG.lawOfficeName}`;
}

function App() {
  const [pageLang, setPageLang] = useState("en");
  const tx = t[pageLang] || t.en;
  const isRtl = pageLang === "ar";

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
  const [emailReply, setEmailReply] = useState("");
  const [leads, setLeads] = useState([]);

  const risk = useMemo(() => calculateRisk(form), [form]);
  const docs = docsByCompanyType[form.companyType] || docsByCompanyType.limited;

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleGenerate = () => {
    const text = generateAssessment(form, risk);
    setAssessment(text);
    setEmailReply(generateEmail(form));
    setLeads((prev) => [
      {
        id: Date.now(),
        name: form.name || "Unnamed lead",
        nationality: form.nationality || "Unknown",
        language: form.preferredLanguage,
        service: form.residenceGoal === "yes" ? "Company + Residence" : "Company Formation",
        risk: risk.label,
        status: "New"
      },
      ...prev
    ].slice(0, 8));
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

  const whatsappText = assessment || `Hello, I want to start a company in Turkey. Preferred language: ${form.preferredLanguage}.`;
  const whatsappLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <main className={`page ${isRtl ? "rtl" : ""}`}>
      <section className="hero">
        <div className="heroIcon">
          <Scale size={34} />
        </div>
        <div className="heroContent">
          <div className="languageSwitcher">
            <label>{tx.preferredLanguage}</label>
            <select value={pageLang} onChange={(e) => setPageLang(e.target.value)}>
              {appLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <h1>{tx.title}</h1>
          <p>{tx.subtitle}</p>
          <div className="warning">{tx.disclaimer}</div>
        </div>
      </section>

      <section className="card positioning">
        <div>
          <h2><Globe2 size={20} /> Positioning</h2>
          <p>{tx.positioning}</p>
        </div>
      </section>

      <section className="card">
        <h2><Languages size={20} /> {tx.supported}</h2>
        <p className="muted">{tx.supportText}</p>
        <div className="badges">
          {supportedLanguages.map((lang) => <span className="badge" key={lang}>{lang}</span>)}
        </div>
      </section>

      <div className="grid">
        <section className="card">
          <h2><FileText size={20} /> {tx.form}</h2>
          <div className="form">
            <input placeholder={tx.name} value={form.name} onChange={(e) => update("name", e.target.value)} />
            <input placeholder={tx.nationality} value={form.nationality} onChange={(e) => update("nationality", e.target.value)} />

            <select value={form.preferredLanguage} onChange={(e) => update("preferredLanguage", e.target.value)}>
              {supportedLanguages.map((lang) => <option key={lang}>{lang}</option>)}
            </select>

            <select value={form.companyType} onChange={(e) => update("companyType", e.target.value)}>
              <option value="limited">Limited Liability Company</option>
              <option value="joint">Joint Stock Company</option>
              <option value="branch">Branch Office</option>
            </select>

            <textarea placeholder={tx.businessActivity} value={form.businessActivity} onChange={(e) => update("businessActivity", e.target.value)} />

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

            <textarea placeholder={tx.notes} value={form.notes} onChange={(e) => update("notes", e.target.value)} />

            <button onClick={handleGenerate}><Sparkles size={17} /> {tx.generate}</button>
          </div>
        </section>

        <section className="card">
          <div className="topline">
            <h2>{tx.assessment}</h2>
            <span className={`risk risk-${risk.label.toLowerCase()}`}>{tx.risk}: {risk.label}</span>
          </div>

          <div className="stats">
            <div><b>{risk.score}/10</b><span>Risk Score</span></div>
            <div><b>{form.preferredLanguage}</b><span>Language</span></div>
            <div><b>{docs.length}</b><span>Documents</span></div>
          </div>

          <textarea className="output" readOnly value={assessment} placeholder="Generate the assessment to see the output here." />

          <div className="actions">
            <button className="secondary" onClick={downloadReport}><Download size={17} /> {tx.download}</button>
            <a href={whatsappLink} target="_blank" rel="noreferrer"><button><MessageCircle size={17} /> {tx.whatsapp}</button></a>
            <a href={CONFIG.calendlyUrl} target="_blank" rel="noreferrer"><button className="secondary"><Calendar size={17} /> {tx.book}</button></a>
            <button className="secondary" onClick={() => setEmailReply(generateEmail(form))}><Mail size={17} /> {tx.email}</button>
          </div>
        </section>
      </div>

      <section className="card">
        <h2><Mail size={20} /> Email Reply</h2>
        <textarea className="emailBox" value={emailReply} readOnly placeholder="Generate an assessment to create an email reply." />
      </section>

      <section className="card">
        <h2><CreditCard size={20} /> {tx.packages}</h2>
        <div className="packages">
          {packages.map((pkg) => (
            <div className="package" key={pkg.id}>
              <h3>{pkg.name}</h3>
              <strong>{pkg.price}</strong>
              <p>{pkg.description}</p>
              <ul>
                {pkg.features.map((feature) => (
                  <li key={feature}><CheckCircle2 size={15} /> {feature}</li>
                ))}
              </ul>
              <a href={CONFIG.paymentLinks[pkg.id]} target="_blank" rel="noreferrer">
                <button>Pay Now</button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2><Users size={20} /> {tx.crm}</h2>
        {leads.length === 0 ? (
          <p className="muted">No leads yet. Generate an assessment to add a lead.</p>
        ) : (
          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Nationality</th>
                  <th>Language</th>
                  <th>Service</th>
                  <th>Risk</th>
                  <th>Status</th>
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
                    <td>{lead.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card setup">
        <h2>{tx.setup}</h2>
        <p>Before publishing seriously, update CONFIG in <b>src/App.jsx</b>:</p>
        <ul>
          <li>WhatsApp Business number</li>
          <li>Calendly consultation link</li>
          <li>Payment links</li>
          <li>Law office name</li>
        </ul>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
