
/* ══════════════════════════════════════════════
   CONFIG
   ══════════════════════════════════════════════ */
const CONFIG = {
  name:     'Vidhi\uD83C\uDF80',
  subtitle: 'the most wonderful person in my universe',
  message:  'Hey you, yes you \u2014 the most adorable, most precious, most absolutely incredible little sister on the planet. Today is YOUR day. The whole world gets to celebrate the fact that you exist, and honestly? What a blessing that is. You make every room brighter just by walking in. I love you endlessly, and I hope this birthday is everything you dreamed of and more. \uD83C\uDF38\uD83D\uDC96',
  age:      18,
  wishes: [
    'endless happiness & laughter',
    'all the love you give, returned tenfold',
    'adventures beyond your wildest dreams',
    'good health & beautiful days ahead',
    'every single one of your dreams coming true',
  ],
  footer: 'made with \uD83D\uDC96 just for you \u00B7 happy birthday',
};

document.getElementById('heroName').textContent     = CONFIG.name;
document.getElementById('heroSubtitle').textContent = CONFIG.subtitle;
document.getElementById('messageText').textContent  = CONFIG.message;
document.getElementById('footerText').textContent   = CONFIG.footer;

const wl = document.getElementById('wishList');
wl.innerHTML = '';
CONFIG.wishes.forEach(w => {
  const li = document.createElement('li');
  li.className = 'wish-item';
  li.textContent = w;
  wl.appendChild(li);
});

/* ══════════════════════════════════════════════
   GALAXY BACKGROUND
   ══════════════════════════════════════════════ */
(function () {
  const gc = document.getElementById('galaxyCanvas');
  const gx = gc.getContext('2d');
  let gW, gH;
  const NEBULAE = [
    { x: 0.12, y: 0.18, rx: 0.22, ry: 0.14, c: 'rgba(70,0,130,0.2)'  },
    { x: 0.88, y: 0.72, rx: 0.24, ry: 0.15, c: 'rgba(130,0,60,0.16)' },
    { x: 0.5,  y: 0.5,  rx: 0.3,  ry: 0.18, c: 'rgba(35,0,90,0.13)'  },
    { x: 0.72, y: 0.12, rx: 0.16, ry: 0.1,  c: 'rgba(0,35,110,0.13)' },
    { x: 0.2,  y: 0.82, rx: 0.18, ry: 0.11, c: 'rgba(90,0,75,0.15)'  },
  ];
  const stars = [];
  for (let i = 0; i < 320; i++) {
    stars.push({ x: Math.random(), y: Math.random(), r: Math.random()*0.9+0.2, a: Math.random()*0.4+0.1, tw: Math.random()>0.55, ph: Math.random()*Math.PI*2, sp: Math.random()*0.015+0.003, c: ['#fff','#ffddee','#ddeeff','#eeddff'][~~(Math.random()*4)] });
  }
  const armStars = [];
  for (let arm = 0; arm < 3; arm++) {
    for (let i = 0; i < 65; i++) {
      const t = i/65, angle = arm*(Math.PI*2/3)+t*Math.PI*4.5, dist = 0.04+t*0.44;
      armStars.push({ x: 0.5+Math.cos(angle)*dist+(Math.random()-0.5)*0.05, y: 0.5+Math.sin(angle)*dist*0.42+(Math.random()-0.5)*0.05, r: Math.random()*1.3+0.3, a: Math.random()*0.55+0.2, tw: Math.random()>0.45, ph: Math.random()*Math.PI*2, sp: Math.random()*0.02+0.005 });
    }
  }
  function gResize() { gW = gc.width = window.innerWidth; gH = gc.height = window.innerHeight; }
  gResize(); window.addEventListener('resize', gResize);
  function drawGalaxy() {
    gx.clearRect(0,0,gW,gH); gx.fillStyle='#060010'; gx.fillRect(0,0,gW,gH);
    NEBULAE.forEach(n => { const g=gx.createRadialGradient(n.x*gW,n.y*gH,0,n.x*gW,n.y*gH,n.rx*gW); g.addColorStop(0,n.c); g.addColorStop(1,'transparent'); gx.fillStyle=g; gx.beginPath(); gx.ellipse(n.x*gW,n.y*gH,n.rx*gW,n.ry*gH,0,0,Math.PI*2); gx.fill(); });
    stars.forEach(s => { s.ph+=s.sp; const a=s.tw?s.a*(0.5+0.5*Math.sin(s.ph)):s.a; gx.save(); gx.globalAlpha=a; gx.fillStyle=s.c; gx.beginPath(); gx.arc(s.x*gW,s.y*gH,s.r,0,Math.PI*2); gx.fill(); gx.restore(); });
    armStars.forEach(s => { s.ph+=s.sp; const a=s.tw?s.a*(0.5+0.5*Math.sin(s.ph)):s.a; gx.save(); gx.globalAlpha=a; gx.fillStyle='#ffccee'; gx.shadowBlur=5; gx.shadowColor='#ff66aa'; gx.beginPath(); gx.arc(s.x*gW,s.y*gH,s.r,0,Math.PI*2); gx.fill(); gx.restore(); });
    requestAnimationFrame(drawGalaxy);
  }
  drawGalaxy();
})();

/* ══════════════════════════════════════════════
   SPARKS
   ══════════════════════════════════════════════ */
const sc = document.getElementById('sparkCanvas');
const sx = sc.getContext('2d');
let sparks = [], W, H;
function resize() { W = sc.width = window.innerWidth; H = sc.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
const SC = ['#ff66aa','#cc44ff','#ff80c0','#ffaaee','#eeaaff','#fff','#ffddcc','#ffcc66'];
function randSpark(x, y) {
  return { x: x??Math.random()*W, y: y??Math.random()*H, vx:(Math.random()-0.5)*2.5, vy:(Math.random()-0.5)*2.5-1, r:Math.random()*2.2+0.4, alpha:Math.random()*0.6+0.4, decay:Math.random()*0.012+0.004, color:SC[~~(Math.random()*SC.length)], tw:Math.random()>0.5, ts:Math.random()*0.08+0.02, tp:Math.random()*Math.PI*2 };
}
for (let i = 0; i < 180; i++) sparks.push(randSpark());
function animSparks() {
  sx.clearRect(0,0,W,H);
  while (sparks.length < 180) sparks.push(randSpark());
  sparks.forEach((s,i) => {
    s.x+=s.vx; s.y+=s.vy; s.alpha-=s.decay; s.tp+=s.ts;
    const a = s.tw?s.alpha*(0.5+0.5*Math.sin(s.tp)):s.alpha;
    if (a<=0||s.y<-20) { sparks[i]=randSpark(); return; }
    sx.save(); sx.globalAlpha=a; sx.fillStyle=s.color; sx.shadowBlur=8; sx.shadowColor=s.color;
    sx.beginPath(); const r=s.r,sp=4;
    for (let k=0;k<sp*2;k++) { const ang=(k/(sp*2))*Math.PI*2-Math.PI/2, rad=k%2===0?r*2.2:r*0.7; k===0?sx.moveTo(s.x+rad*Math.cos(ang),s.y+rad*Math.sin(ang)):sx.lineTo(s.x+rad*Math.cos(ang),s.y+rad*Math.sin(ang)); }
    sx.closePath(); sx.fill(); sx.restore();
  });
  requestAnimationFrame(animSparks);
}
requestAnimationFrame(animSparks);
document.addEventListener('click', e => {
  for (let i=0;i<22;i++) { const sp=randSpark(e.clientX,e.clientY); sp.vx=(Math.random()-0.5)*9; sp.vy=(Math.random()-0.5)*9; sp.alpha=1; sp.decay=0.025; sp.r=Math.random()*3+1; sparks.push(sp); }
});

/* ══════════════════════════════════════════════
   CONFETTI
   ══════════════════════════════════════════════ */
function launchConfetti() {
  const base = { spread:90, scalar:1.2, colors:['#ff66aa','#cc44ff','#ffcc00','#44ccff','#fff','#ffaaee'] };
  confetti({...base, particleCount:160, origin:{y:0.6}});
  setTimeout(()=>confetti({...base,particleCount:80,angle:60,spread:55,origin:{x:0,y:0.7}}),250);
  setTimeout(()=>confetti({...base,particleCount:80,angle:120,spread:55,origin:{x:1,y:0.7}}),500);
  setTimeout(()=>confetti({...base,particleCount:100,origin:{y:0.5}}),800);
}

/* ══════════════════════════════════════════════
   CANDLES
   ══════════════════════════════════════════════ */
const CANDLE_COLORS = ['#ff6699','#cc44ff','#ff9933','#44ccff','#aaff44','#ffcc00','#ff44aa','#6644ff','#ff6600','#44ffcc'];
function buildCandles(n) {
  const row = document.getElementById('candlesRow');
  row.innerHTML = '';
  const count = Math.min(Math.max(parseInt(n)||18,1),50);
  for (let i=0;i<count;i++) {
    const col = CANDLE_COLORS[i%CANDLE_COLORS.length];
    const c = document.createElement('div');
    c.className = 'candle'; c.title = 'Click to blow out!';
    c.innerHTML = `<div class="flame" id="fl-${i}"></div><div class="candle-body" style="background:linear-gradient(to bottom,${col},${col}88)"></div>`;
    c.addEventListener('click', ev => { ev.stopPropagation(); document.getElementById(`fl-${i}`).classList.toggle('out'); });
    row.appendChild(c);
  }
}
buildCandles(CONFIG.age);

/* ══════════════════════════════════════════════
   MUSIC
   ══════════════════════════════════════════════ */
let audioCtx = null, musicPlaying = false, musicNodes = [];
const HBD = [[0,.75],[0,.25],[2,1],[0,1],[5,1],[4,2],[0,.75],[0,.25],[2,1],[0,1],[7,1],[5,2],[0,.75],[0,.25],[12,1],[9,1],[5,1],[4,1],[2,1],[10,.75],[10,.25],[9,1],[5,1],[7,1],[5,2]];
const freq = n => 261.63 * Math.pow(2, n/12);
function playMelody() {
  if (audioCtx) audioCtx.close();
  audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  musicNodes = [];
  const BPM = 94, beat = 60/BPM;
  let t = audioCtx.currentTime + 0.08;
  HBD.forEach(([s,d]) => {
    const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
    osc.type='triangle'; osc.frequency.value=freq(s);
    gain.gain.setValueAtTime(0,t); gain.gain.linearRampToValueAtTime(0.2,t+0.03); gain.gain.exponentialRampToValueAtTime(0.001,t+d*beat*0.88);
    osc.connect(gain); gain.connect(audioCtx.destination); osc.start(t); osc.stop(t+d*beat); musicNodes.push(osc); t+=d*beat;
  });
  const total = HBD.reduce((a,[,d])=>a+d,0)*beat*1000+300;
  const lt = setTimeout(()=>{ if(musicPlaying) playMelody(); }, total);
  musicNodes.push({ stop: ()=>clearTimeout(lt) });
}
function stopMusic() { musicNodes.forEach(n=>{try{n.stop();}catch(e){}}); musicNodes=[]; if(audioCtx){audioCtx.close();audioCtx=null;} }
function toggleMusic() {
  const lbl=document.getElementById('musicLabel'), ico=document.getElementById('musicIcon');
  if (musicPlaying) { stopMusic(); musicPlaying=false; ico.textContent='\uD83C\uDFB5'; lbl.textContent='Play Birthday Song'; }
  else { playMelody(); musicPlaying=true; ico.textContent='\u23F8'; lbl.textContent='Pause Song'; }
}

/* ══════════════════════════════════════════════
   IMAGE SLIDER
   ══════════════════════════════════════════════ */
let curSlide = 0;
const allSlides = document.querySelectorAll('#sliderTrack .slide');
const SLIDE_COUNT = allSlides.length;
function buildDots() {
  const dots = document.getElementById('sliderDots'); dots.innerHTML='';
  for (let i=0;i<SLIDE_COUNT;i++) { const d=document.createElement('div'); d.className='dot'+(i===curSlide?' active':''); d.addEventListener('click',()=>goSlide(i)); dots.appendChild(d); }
}
function goSlide(idx) { curSlide=Math.max(0,Math.min(SLIDE_COUNT-1,idx)); updateSlider(); }
function slideMove(dir) { curSlide=(curSlide+dir+SLIDE_COUNT)%SLIDE_COUNT; updateSlider(); }
function updateSlider() {
  document.getElementById('sliderTrack').style.transform=`translateX(-${curSlide*100}%)`;
  document.getElementById('slideCounter').textContent=`${curSlide+1} / ${SLIDE_COUNT}`;
  document.querySelectorAll('#sliderDots .dot').forEach((d,i)=>d.classList.toggle('active',i===curSlide));
}
buildDots(); updateSlider();
document.addEventListener('keydown', e => { if(e.key==='ArrowLeft') slideMove(-1); if(e.key==='ArrowRight') slideMove(1); });
let tX = null;
const sw = document.getElementById('sliderWrap');
sw.addEventListener('touchstart', e=>{tX=e.touches[0].clientX;},{passive:true});
sw.addEventListener('touchend', e=>{ if(tX===null) return; const dx=e.changedTouches[0].clientX-tX; if(Math.abs(dx)>40) slideMove(dx<0?1:-1); tX=null; });
setInterval(()=>{ if(document.visibilityState==='visible') slideMove(1); },5000);

/* ══════════════════════════════════════════════
   VIDEO
   ══════════════════════════════════════════════ */
(function(){
  const player=document.getElementById('videoPlayer'), placeholder=document.getElementById('videoPlaceholder'), source=player.querySelector('source');
  if (source&&source.getAttribute('src')&&source.getAttribute('src').trim()!=='') { player.classList.add('visible'); placeholder.style.display='none'; }
})();

/* ══════════════════════════════════════════════
   TIC TAC TOE
   ══════════════════════════════════════════════ */
const TTT_WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let tttBoard = Array(9).fill(null);
let tttGameOver = false;
let tttScores = { X: 0, O: 0, D: 0 };

function tttCheckWinner(b) {
  for (const [a,c,d] of TTT_WINS) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { winner: b[a], line: [a,c,d] };
  }
  if (b.every(c => c)) return { winner: 'D', line: [] };
  return null;
}

function tttBestMove(b) {
  // try to win
  for (let i=0;i<9;i++) {
    if (!b[i]) { b[i]='O'; if(tttCheckWinner(b)?.winner==='O'){b[i]=null;return i;} b[i]=null; }
  }
  // block X
  for (let i=0;i<9;i++) {
    if (!b[i]) { b[i]='X'; if(tttCheckWinner(b)?.winner==='X'){b[i]=null;return i;} b[i]=null; }
  }
  // take centre
  if (!b[4]) return 4;
  // take corner
  const corners=[0,2,6,8].filter(i=>!b[i]);
  if (corners.length) return corners[~~(Math.random()*corners.length)];
  // take any
  const free=b.reduce((a,v,i)=>v?a:[...a,i],[]);
  return free[~~(Math.random()*free.length)];
}

function tttRender() {
  tttBoard.forEach((val, i) => {
    const cell = document.querySelector(`.ttt-cell[data-i="${i}"]`);
    cell.textContent = val === 'X' ? '\u2715' : val === 'O' ? '\u25CB' : '';
    cell.className = 'ttt-cell' + (val ? ` ${val.toLowerCase()} taken` : '');
  });
}

function tttShowResult(res) {
  const banner = document.getElementById('tttBanner');
  const label  = document.getElementById('tttTurnLabel');
  if (res.winner === 'X') {
    tttScores.X++;
    res.line.forEach(i => document.querySelector(`.ttt-cell[data-i="${i}"]`).classList.add('win'));
    banner.textContent = '\uD83C\uDF89 you win! amazing!!';
    banner.className = 'ttt-result-banner win-x show';
    label.textContent = 'you crushed it \uD83C\uDF38';
    launchConfetti();
  } else if (res.winner === 'O') {
    tttScores.O++;
    res.line.forEach(i => document.querySelector(`.ttt-cell[data-i="${i}"]`).classList.add('win'));
    banner.textContent = '\uD83E\uDD16 pc wins this round!';
    banner.className = 'ttt-result-banner win-o show';
    label.textContent = 'try again \uD83D\uDC96';
  } else {
    tttScores.D++;
    banner.textContent = "\uD83E\uDD1D it's a draw!";
    banner.className = 'ttt-result-banner draw show';
    label.textContent = 'so close \u2728';
  }
  document.getElementById('tttScoreX').textContent = tttScores.X;
  document.getElementById('tttScoreO').textContent = tttScores.O;
  document.getElementById('tttScoreD').textContent = tttScores.D;
  tttGameOver = true;
}

function tttClick(i) {
  if (tttGameOver || tttBoard[i]) return;
  // Player move
  tttBoard[i] = 'X';
  const cell = document.querySelector(`.ttt-cell[data-i="${i}"]`);
  cell.textContent = '\u2715';
  cell.className = 'ttt-cell x taken pop';
  setTimeout(() => cell.classList.remove('pop'), 300);

  let res = tttCheckWinner(tttBoard);
  if (res) { tttRender(); tttShowResult(res); return; }

  // PC move after short delay
  document.getElementById('tttTurnLabel').textContent = 'pc is thinking...';
  document.querySelectorAll('.ttt-cell:not(.taken)').forEach(c => c.style.pointerEvents='none');

  setTimeout(() => {
    const m = tttBestMove(tttBoard);
    if (m === undefined) return;
    tttBoard[m] = 'O';
    const pcCell = document.querySelector(`.ttt-cell[data-i="${m}"]`);
    pcCell.textContent = '\u25CB';
    pcCell.className = 'ttt-cell o taken pop';
    setTimeout(() => pcCell.classList.remove('pop'), 300);

    res = tttCheckWinner(tttBoard);
    if (res) { tttShowResult(res); return; }

    document.getElementById('tttTurnLabel').textContent = 'your turn \u2014 tap a cell';
    document.querySelectorAll('.ttt-cell:not(.taken)').forEach(c => c.style.pointerEvents='');
  }, 500);
}

function tttRestart() {
  tttBoard = Array(9).fill(null);
  tttGameOver = false;
  document.getElementById('tttBanner').className = 'ttt-result-banner';
  document.getElementById('tttTurnLabel').textContent = 'your turn \u2014 tap a cell';
  document.querySelectorAll('.ttt-cell').forEach(c => {
    c.textContent = '';
    c.className = 'ttt-cell';
    c.style.pointerEvents = '';
  });
}

/* ══════════════════════════════════════════════
   BALLOONS
   ══════════════════════════════════════════════ */
const BALLOON_EMOJIS = ['\uD83C\uDF88','\uD83C\uDF88','\uD83C\uDF80','\uD83C\uDF89','\uD83D\uDC9C','\uD83D\uDC96','\u2B50','\u2728'];
function launchBalloon() {
  const b = document.createElement('div');
  b.className = 'balloon';
  b.textContent = BALLOON_EMOJIS[~~(Math.random()*BALLOON_EMOJIS.length)];
  b.style.left = Math.random()*94+'%';
  const dur = Math.random()*6+7;
  b.style.animationDuration = dur+'s';
  document.body.appendChild(b);
  setTimeout(()=>b.remove(), dur*1000+200);
}
setInterval(launchBalloon, 1400);
for (let i=0;i<5;i++) setTimeout(launchBalloon, i*400);

/* ══════════════════════════════════════════════
   REACTIONS
   ══════════════════════════════════════════════ */
/* ══════════════════════════════════════════════
   GLOBAL MESSAGE SYSTEM
   ══════════════════════════════════════════════ */

const AV = ['🎀','💜','💖','🌸','✨','🦋','🌟','🎉'];

function renderReaction({name,text,avatar}) {

  const feed = document.getElementById('reactionFeed');

  const msg = document.createElement('div');

  msg.className = 'rxn-msg';

  msg.innerHTML = `
    <div class="rxn-avatar">${avatar}</div>

    <div class="rxn-bubble">
      <div class="rxn-name">${name}</div>
      ${text}
    </div>
  `;

  feed.appendChild(msg);

  feed.scrollTop = feed.scrollHeight;
}

async function loadMessages() {

  const {
    collection,
    getDocs,
    query,
    orderBy
  } = window.firebaseFunctions;

  const q = query(
    collection(window.db, "birthdayMessages"),
    orderBy("time", "asc")
  );

  const snapshot = await getDocs(q);

  document.getElementById('reactionFeed').innerHTML = '';

  snapshot.forEach((doc) => {
    renderReaction(doc.data());
  });
}

async function sendReaction() {

  const nEl = document.getElementById('rxnName');
  const tEl = document.getElementById('rxnText');

  const name = nEl.value.trim() || 'Anonymous';
  const text = tEl.value.trim();

  if (!text) return;

  const avatar = AV[Math.floor(Math.random() * AV.length)];

  const {
    collection,
    addDoc
  } = window.firebaseFunctions;

  await addDoc(
    collection(window.db, "birthdayMessages"),
    {
      name,
      text,
      avatar,
      time: Date.now()
    }
  );

  renderReaction({ name, text, avatar });

  tEl.value = '';

  confetti({
    particleCount: 55,
    spread: 55,
    origin: { y: 0.9 },
    scalar: 0.85,
    colors: ['#ff66aa','#cc44ff','#ffcc00']
  });
}

document
  .getElementById('rxnText')
  .addEventListener('keydown', e => {
    if (e.key === 'Enter') sendReaction();
  });

function scrollToReaction() {
  document
    .getElementById('reactionSection')
    .scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

  setTimeout(() => {
    document.getElementById('rxnText').focus();
  }, 600);
}

loadMessages();

/* ══════════════════════════════════════════════
   ON LOAD
   ══════════════════════════════════════════════ */
window.addEventListener('load', ()=>{
  setTimeout(launchConfetti,800);
  setTimeout(launchConfetti,2200);
  setTimeout(()=>{
    for (let i=0;i<80;i++) {
      setTimeout(()=>{ const sp=randSpark(Math.random()*W,H*0.3); sp.vx=(Math.random()-0.5)*18; sp.vy=(Math.random()-0.5)*18; sp.alpha=1; sp.decay=0.01; sp.r=Math.random()*5+2; sparks.push(sp); },i*18);
    }
  },500);
});