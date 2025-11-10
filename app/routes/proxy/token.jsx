// app/routes/proxy.token.jsx
import { json } from "@remix-run/node";
import { generateJWT } from "../../utils/generate-jwt.js";

export async function loader({ request }) {
  console.log("✅ Route /proxy/token hit");

  const url = new URL(request.url);
  const partnerUserID = url.searchParams.get("partnerUserID") || "";
  const firstname = url.searchParams.get("firstname") || "";
  const lastname = url.searchParams.get("lastname") || "";
  const email = url.searchParams.get("email") || "";
  const campaign = url.searchParams.get("campaign") || "";

  try {
    const secret = process.env.ADDICTIZ_SECRET_KEY;
    if (!secret) throw new Error("Clé secrète manquante (ADDICTIZ_SECRET_KEY)");

    const tokenUrl = await generateJWT({
      partnerUserID,
      firstname,
      lastname,
      email,
      urlCampaign: campaign,
      secret,
    });

    console.log("🎯 JWT generated successfully:", tokenUrl);
    return json({ tokenUrl });
  } catch (error) {
    console.error("❌ Erreur dans /proxy/token:", error);
    return json({ error: error.message }, { status: 500 });
  }
}
