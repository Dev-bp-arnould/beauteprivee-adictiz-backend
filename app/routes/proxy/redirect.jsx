import { redirect } from "@remix-run/node";

export async function loader({ request }) {
  const url = new URL(request.url);
  const campaign = url.searchParams.get("campaign");
  const jwt = url.searchParams.get("jwt");

  if (!campaign || !jwt) {
    return new Response("Missing campaign or jwt", { status: 400 });
  }

  // On redirige vers le vrai jeu Adictiz
  return redirect(`https://play.adictiz.com/embed?campaign=${campaign}&jwt=${jwt}`);
}
