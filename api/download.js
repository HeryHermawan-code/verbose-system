// AUTO DELIVERY - Cek pembayaran, langsung kirim file
import fs from 'fs'; import path from 'path';
export default async function handler(req,res){
  const {trxId, productId} = req.query;
  if(!trxId || !productId) return res.status(400).json({error:"trxId & productId required"});
  
  // CEK STATUS BAYAR - di production cek ke DB/KV yang diisi webhook-briva
  // Untuk demo, kita anggap kalau trxId ada = sudah bayar (nanti ganti dengan cek real BRI)
  const paid = true; // TODO: cek DB: await kv.get(trxId) === 'PAID'
  
  if(!paid) return res.status(402).json({error:"Belum bayar, transfer ke VA BRIVA dulu", needPayment:true});
  
  // AMBIL FILE DARI 2987 PRODUK ANDA
  const filePath = path.join(process.cwd(), 'produk', productId);
  if(!fs.existsSync(filePath)){
    // fallback: ambil file pertama dari 2987 produk
    const files = fs.readdirSync(path.join(process.cwd(), 'produk'));
    if(files.length===0) return res.status(404).json({error:"Produk belum ada"});
    const firstFile = files[0];
    const content = fs.readFileSync(path.join(process.cwd(), 'produk', firstFile));
    res.setHeader('Content-Disposition', `attachment; filename="${firstFile}"`);
    res.setHeader('Content-Type', 'text/plain');
    return res.send(content);
  }
  const content = fs.readFileSync(filePath);
  res.setHeader('Content-Disposition', `attachment; filename="${productId}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  return res.send(content);
}
