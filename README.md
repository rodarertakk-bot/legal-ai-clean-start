# Multilingual Turkey Legal AI Assistant - Full Version

## İçerik

- Sayfa dili seçimi
- İngilizce, Türkçe, Arapça, Rusça, Ukraynaca, Kürtçe, Zazaca, Almanca, Flemenkçe, Çerkezce destek görünümü
- Müvekkil ön görüşme formu
- AI tarzı ön değerlendirme
- Risk skoru
- Rapor indirme
- WhatsApp gönderme
- Calendly randevu butonu
- Ödeme paketleri
- Lead CRM
- Otomatik e-posta cevabı

## Vercel ayarları

Framework: Vite  
Build Command: npm run build  
Output Directory: dist  
Install Command: npm install

## Yayına almadan önce güncelle

`src/App.jsx` içinde CONFIG bölümünü değiştir:

```js
const CONFIG = {
  whatsappNumber: "905000000000",
  calendlyUrl: "https://calendly.com/your-link/consultation",
  paymentLinks: {
    basic: "https://your-payment-link/basic",
    standard: "https://your-payment-link/standard",
    premium: "https://your-payment-link/premium"
  },
  lawOfficeName: "Your Law Office"
};
```

## Önemli

Bu uygulama hukuki ön değerlendirme ve müşteri toplama aracıdır. Nihai hukuki tavsiye verdiğini iddia etmemelidir.
