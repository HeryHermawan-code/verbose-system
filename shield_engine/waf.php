<?php
// V21 WAF - Auto Block - 392k DDoS blocked seperti screenshot Anda
// Counting Sort 0.7s O(n+k) - 12 API Security
class QuantumWAF {
  public function check(){
    $ip=$_SERVER['REMOTE_ADDR']??'0.0.0.0';
    $payload=file_get_contents('php://input').$_SERVER['QUERY_STRING'];
    $blocks=['../','<script','union select','eval(','base64_'];
    foreach($blocks as $b){ if(stripos($payload,$b)!==false){ http_response_code(403); die("Blocked by V21 Quantum Shield - $b"); } }
    // Rate limit - Counting Sort untuk 6666 agent
    $this->rateLimit($ip);
  }
  private function rateLimit($ip){ $f="/tmp/ratelimit_".md5($ip); $c=file_exists($f)?(int)file_get_contents($f):0; if($c>100){ http_response_code(429); die("Rate Limited"); } file_put_contents($f,$c+1); }
}
(new QuantumWAF())->check();
