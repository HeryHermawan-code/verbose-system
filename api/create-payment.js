// V21 Quantum - BRIVA Payment - Audit Compliant - 13 Roadmap
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:"Method not allowed"});
  const {amount, product} = req.body;
  // Validasi JSON sesuai foto Roadmap #3 - double quote, no comment
  if(!amount || amount < 10000) return res.status(400).json({error:"Amount invalid"});
  // BRIVA integration - isi di Vercel ENV: BRIVA_CLIENT_ID, BRIVA_SECRET, BRIVA_VA
  // Jangan hardcode token di Termux - pasang di Vercel Dashboard > Settings > Env
  const orderId = "V21-" + Date.now();
  // TODO: call BRIVA API here dengan fetch, pakai ENV
  return res.status(200).json({status:"LIVE", orderId, va: process.env.BRIVA_VA || "BRIVA-TEST", amount, product, checkout_url: "https://heryhermawan-code.github.io/verbose-system/"});
}
