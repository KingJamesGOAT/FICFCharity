# FICF Google Sheet & Apps Script Integration Guide

**Google Sheet URL:**  
[FICF Sponsorship Pledges Sheet](https://docs.google.com/spreadsheets/d/1I8iE421ocv38JtTQu84uNzxbHRCQ9f5BugFthEtahHY/edit?gid=0#gid=0)

**Active Web App URL:**  
`https://script.google.com/macros/s/AKfycbzS2wUv55tuOqqWMM30X1h_sl2vUmv-oS3UlkrjlGxEwr65LQ-D9SrI-AT_8-AZREX9/exec`

---

## 1. Sheet Column Headers (Row 1)

Ensure Row 1 of your sheet has the following columns in order:

| Column | Header | Description |
| :--- | :--- | :--- |
| **A** | `Timestamp` | Date & time of the pledge |
| **B** | `Donor Name` | Full name of the donor |
| **C** | `Email` | Donor email address |
| **D** | `Amount` | Pledge amount (CHF) |
| **E** | `Child ID` | ID of the sponsored child (e.g., `shakklin`) |
| **F** | `Type` | `yearly` or `one-time` |
| **G** | `Tax Receipt` | `TRUE` / `FALSE` |
| **H** | `Payment Method` | Chosen method |
| **I** | `RefCode` | Unique Reference Code (e.g. `FICF-482910`) |
| **J** | `Language` | Language used (`en`, `fr`, or `de`) |
| **K** | `Phone` | Mobile / Phone number (for Twint matching) |
| **L** | `Address` | Street address (for Swiss tax letter) |
| **M** | `Postal Code & City` | ZIP and City |
| **N** | `Country` | Country (e.g., Switzerland) |

> [!TIP]
> If columns K, L, M, N are not yet in your Google Sheet, simply type them into cells **K1, L1, M1, N1**.

---

## 2. Google Apps Script Code

In your Google Sheet, click **Extensions** > **Apps Script**, replace the code with the following, and click **Save**:

```javascript
/**
 * FICF Sponsorship Platform - Backend Web App
 * Handles saving pledges, calculating stats, and exporting pledges to Admin Dashboard.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append pledge row matching columns A through N
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.donorName || '',
      data.email || '',
      data.amount || 0,
      data.childId || '',
      data.type || 'yearly',
      data.taxReceipt ? true : false,
      data.paymentMethod || 'any',
      data.refCode || '',
      data.language || 'en',
      data.phone || '',
      data.address || '',
      data.zipCity || '',
      data.country || 'Switzerland'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  
  // Exclude header row
  const dataRows = rows.slice(1);
  
  if (action === 'getStats') {
    let totalRaised = 0;
    let donorCount = 0;
    
    dataRows.forEach(row => {
      const amount = Number(row[3]);
      if (!isNaN(amount) && amount > 0) {
        totalRaised += amount;
        donorCount++;
      }
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ totalRaised, donorCount }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'getPledges') {
    const pledges = dataRows.map(row => ({
      timestamp: row[0],
      donorName: row[1],
      email: row[2],
      amount: Number(row[3]) || 0,
      childId: row[4],
      childName: row[4], // or child lookup
      type: row[5],
      taxReceipt: Boolean(row[6]),
      paymentMethod: row[7],
      refCode: row[8],
      language: row[9],
      phone: row[10] || '',
      address: row[11] || '',
      zipCity: row[12] || '',
      country: row[13] || ''
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify(pledges.reverse())) // Newest first
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'FICF API running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 3. Deploying the Updated Apps Script

1. In the Apps Script editor, click **Deploy** > **Manage deployments**.
2. Click the **Edit (pencil)** icon on the active deployment.
3. Under **Version**, select **New version**.
4. Ensure **Execute as:** is `Me` and **Who has access:** is `Anyone`.
5. Click **Deploy**.
