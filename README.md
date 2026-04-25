# Multilingual Turkey Legal AI Assistant

## Kurulum

```bash
npm install
npm run dev
```

## Vercel ayarları

Framework: Vite  
Build Command: npm run build  
Output Directory: dist  
Install Command: npm install

## Yayına almadan önce değiştir

`src/App.jsx` içinde CONFIG bölümünü güncelle:

```js
whatsappNumber: "905XXXXXXXXX"
calendlyUrl: "https://calendly.com/..."
paymentLinks: {
  basic: "...",
  standard: "...",
  premium: "..."
}
```
