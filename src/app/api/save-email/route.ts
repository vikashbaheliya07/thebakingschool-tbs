import { google } from "googleapis";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { email, mobile } = await req.json(); // Accept both email and mobile

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Read your JSON key securely from file
    const keyFilePath = path.join(process.cwd(), "google-key.json");
    const keyFile = JSON.parse(fs.readFileSync(keyFilePath, "utf8"));

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: keyFile.client_email,
        private_key: keyFile.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    // Append both email and mobile as two columns in the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:B", // Column A = email, Column B = mobile
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, mobile || ""]], // empty string if mobile not provided
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving email and mobile:", error);
    return NextResponse.json({ error: "Failed to save email and mobile" }, { status: 500 });
  }
}
