# ZalliShop — Local Dev Setup

This workspace contains a simple static frontend and a minimal Node.js server to persist orders locally.

Run the backend (orders persistence):

```bash
cd c:/Users/Administrator/Desktop/dyqani-online
npm install
npm start
```

This starts a small server on `http://localhost:3000` exposing:
- `POST /orders` — accepts JSON order objects and appends them to `orders.json`
- `GET /orders` — returns all saved orders

Run the frontend for local testing (static files):

```bash
# from the same folder
python -m http.server 8000
# then open http://localhost:8000 in browser
```

Notes:
- The server is intended for development/testing only; do not expose it to public production without proper authentication and sanitization.
- If you deploy, switch PayPal client ID to your production credentials and secure server endpoints.

Email notifications
-------------------
This server can send a notification email for every new order. Configure the following environment variables before starting the server:

- `SMTP_HOST` (e.g., `smtp.gmail.com`)
- `SMTP_PORT` (e.g., `465` for SSL, or `587` for TLS)
- `SMTP_USER` (SMTP username / email)
- `SMTP_PASS` (SMTP password or app-specific password)
- `NOTIFY_EMAIL` (email that receives order notifications — default: `eglimurati110@gmail.com`)
- `EMAIL_FROM` (optional `From:` header; defaults to `SMTP_USER`)

Example (Windows PowerShell):

```powershell
$env:SMTP_HOST = 'smtp.gmail.com'
$env:SMTP_PORT = '465'
$env:SMTP_USER = 'your-email@gmail.com'
$env:SMTP_PASS = 'your-app-password'
$env:NOTIFY_EMAIL = 'eglimurati110@gmail.com'
npm start
```

Notes on Gmail: use an App Password if you have 2FA enabled. Do not commit credentials to source control.

Using a `.env` file (recommended)
---------------------------------
You can create a `.env` file at the project root instead of setting environment variables manually. Copy the example file:

```powershell
cp .env.example .env
# edit .env with your values
npm install
npm start
```

The server will automatically load `.env` via `dotenv` if present.

Test sending an email
---------------------
You can test sending an email without configuring SMTP by using the test endpoint which will use a temporary Ethereal mailbox (preview-only). If you have SMTP configured it will send a real email.

Example using `curl` to request a test send to `kkeli8228@gmail.com`:

```bash
curl -X POST http://localhost:3000/send-test-email -H "Content-Type: application/json" -d '{"to":"kkeli8228@gmail.com"}'
```

Response examples:
- If SMTP not configured you'll get a `preview` URL in the JSON where you can view the test message.
- If SMTP configured the endpoint returns `ok: true` and `messageId`.

Note: Ethereal messages do NOT deliver to real inboxes; they are only for preview when testing locally.

Customer confirmations
----------------------
If the customer provides an email (for COD) or PayPal supplies the payer email, the server will also send a confirmation email to the customer thanking them and explaining that you'll contact them for any issues.

Make sure `SMTP_USER`/`SMTP_PASS` allow sending emails to customers (some providers restrict the `From` address). If using Gmail, prefer an App Password.
