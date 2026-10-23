// WEBHOOK - BRI panggil ini kalau pembeli sudah bayar - AUTO DELIVERY
export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end();
  const {trxId, productId, status} = req.body;
  // Validasi signature dari BRI - pakai BRI_SECRET
  // Jika status=PAID, tandai trxId sebagai LUNAS
  console.log(`PAID: ${trxId} product ${productId}`);
  // Di sini Anda bisa simpan ke database Vercel KV: trxId = PAID
  return res.json({received:true, trxId, autoDeliver:true});
}
