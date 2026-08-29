# Google Sheets & Brevo Email Setup Guide

This guide walks you through setting up **Google Sheets logging** and **Brevo Email notifications** for your Dream Spa contact form.

---

## Environment Variables (`.env`)

Add the following environment variables to your `.env` (or `.env.local` / Vercel):

```env
# Brevo (Sendinblue) Transactional Email API Key
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Verified Brevo Sender Email
SENDER_EMAIL=no-reply@dreamspa.in

# Spa Admin Recipient Email
RECIPIENT_EMAIL=info@dreamspa.in

# Google Sheets Webhook URL (Google Apps Script Web App URL)
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

---

## 1. Google Sheets Setup (Web App Webhook)

Using Google Apps Script allows form responses to automatically append as new rows to a Google Sheet with zero complexity and no GCP service accounts required.

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a blank spreadsheet named **Dream Spa Inquiries**.
2. On **Sheet1**, set the header row (Row 1) as follows:
   - **Column A**: `Timestamp`
   - **Column B**: `Name`
   - **Column C**: `Phone`
   - **Column D**: `Email`
   - **Column E**: `Service`
   - **Column F**: `Date`
   - **Column G**: `Notes`

### Step 2: Add Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**.
2. Erase any code in the editor and paste the following snippet:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.service || "",
      data.date || "",
      data.notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment** (top right).
2. Select type: ⚙️ **Web app**.
3. Set fields:
   - **Description**: `Spa Contact Form Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial for accepting form posts)*
4. Click **Deploy** and authorize access when prompted.
5. Copy the generated **Web App URL** and set it as `GOOGLE_SHEETS_WEBHOOK_URL` in your `.env`.

---

## 2. Brevo Email Setup

### Step 1: Get Brevo API Key
1. Log in to your [Brevo Dashboard](https://app.brevo.com/).
2. Go to **SMTP & API** → **API Keys**.
3. Click **Generate a new API key**, name it `Dream Spa Web App`, and copy the key (`xkeysib-...`).
4. Paste it as `BREVO_API_KEY` in `.env`.
