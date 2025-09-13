interface BrevoContactData {
  email: string;
  name: string;
  company: string;
  listIds?: number[];
}

const DEFAULT_BREVO_API = process.env.BREVO_API_KEY!;
const DEFAULT_BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID!);


export async function addToBrevoList({
  email,
  name,
  company,
  listIds = [DEFAULT_BREVO_LIST_ID]
}: BrevoContactData) {
  const payload = {
    email,
    attributes: {
      USERNAME: name,
      COMPANY: company,
    },
    listIds,
    updateEnabled: true,
  };

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": DEFAULT_BREVO_API,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}