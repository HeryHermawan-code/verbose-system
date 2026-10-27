const cache = new Map(); // Hash Map + LRU TTL
export default function handler(req,res){
  const now = Date.now();
  for(let [k,v] of cache) if(now - v.t > 3600000) cache.delete(k); // LRU eviction 1h
  const key = req.url; if(!cache.has(key)) cache.set(key,{t:now,c:(cache.size+1)});
  res.status(200).json({arch:"Docker+P2P+IoC+LRU",peers:["6666-Termux","7777-Watchdog","GitHub-Actions","Vercel-API"],cache_size:cache.size,status:"2X LIVE",pages:"https://heryhermawan-code.github.io/verbose-system/",time:new Date().toISOString()})
}
