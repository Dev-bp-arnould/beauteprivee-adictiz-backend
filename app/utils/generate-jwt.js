// app/utils/generate-jwt.js
import { SignJWT } from "jose";

export async function generateJWT({
  partnerUserID,
  firstname,
  lastname,
  email,
  urlCampaign,
  secret,
}) {
  if (!secret) {
    throw new Error("Clé secrète manquante (ADDICTIZ_SECRET_KEY)");
  }

  const payload = {
    partnerUserID,
    firstname,
    lastname,
    email,
  };

  const encoder = new TextEncoder();
  const key = encoder.encode(secret);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(key);

  if (urlCampaign) {
    const separator = urlCampaign.includes("?") ? "&" : "?";
    return `${urlCampaign}${separator}jwt=${jwt}`;
  }

  return jwt;
}
