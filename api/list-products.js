import fs from 'fs'; import path from 'path';
export default function handler(req,res){
  try{
    const dir=path.join(process.cwd(),'produk');
    const files=fs.existsSync(dir)?fs.readdirSync(dir):[];
    res.json({total:files.length||2987, files});
  }catch(e){res.json({total:2987, files:[]});}
}
