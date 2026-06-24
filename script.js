/* =========================================================
   DATA
   ========================================================= */
const projects = [
  { id:1, title:'PromptBuddy', slug:'promptbuddy', color:'g', status:'live',
    url:'https://chatgpt.com/g/g-68824b9eb7ac8191aa782cf08fbff378-promptbuddy-raj-muni',
    description:'A custom GPT that works as your personal prompt engineer. It asks a few smart questions, then builds a ready-to-run, high-quality prompt tailored to any task — for students, researchers, marketers, entrepreneurs, or anyone GPT-curious. Trained on advanced prompt-engineering strategies and plenty of my own experiments.',
    tags:['Custom GPT','Prompt Engineering','OpenAI'] },
  { id:2, title:'PromptBuddy — Chrome Extension', slug:'promptbuddy-extension', color:'b', status:'building',
    description:'Bringing PromptBuddy into the browser as a Chrome extension, so you can craft optimized prompts anywhere you work — no tab-switching required. Currently in active development.',
    tags:['Chrome Extension','JavaScript','In Progress'] },
  { id:3, title:'Security in Agentic AI Systems', slug:'agentic-security-paper', color:'a', status:'paper',
    url:'CS490DJ- Security In Agentic System.pdf', cta:'→ read paper ↗',
    description:'A research paper (CS 490DJ, University of Regina) on security threats in multi-agent AI systems and the design of ReflexGuard — a lightweight, no-LLM peer-consensus framework where independent evaluators vote on each agent action before it executes. Covers the threat landscape, system architecture, and evaluation on Microsoft\'s LLMail-Inject dataset.',
    tags:['Research','Agentic AI Security','Python'] },
   { id:4, title:'More projects being added', slug:'more', color:'g', status:'building',
    wide:true,
    description:'Work is on the way — check back soon.',
    tags:[] },
];

const education = [
  { degree:'Bachelor of Computer Science', school:'University of Regina', period:'2022 — Present', color:'b',
    details:[
      'Minor in Statistics.',
      'Major coursework: Data Structures & Algorithms, Cybersecurity, Data Science.',
      'Statistics focus: Inferential Statistics and Linear Regression.',
    ] },
];

/* placeholders — swap for your real certifications */
const certifications = [
  { name:'Microsoft Security Essentials: Concepts, Solutions & AI-Powered Protection',
    issuer:'LinkedIn Learning', year:'Sep 2025', color:'b',
    skills:['Microsoft Security','GRC','Cloud Security'] },
];

const achievements = [
  {
    kicker:'Award · Competition', color:'a', title:'ReflexGuard',
    placement:'3rd place', event:'SaskCyberSecurity Innovation Challenge',
    eventUrl:'https://www.linkedin.com/company/saskcybersec/', year:'2025',
    desc:'A team project tackling a real blind spot in multi-agent AI: when one agent is compromised — through poisoned memory, prompt injection, or misused tools — the whole network is at risk. ReflexGuard is an adaptive multi-peer framework where three specialized evaluators vote independently on every action before it runs. Consensus approves it; disagreement blocks or flags it for review. Evaluated on Microsoft\'s LLMail-Inject dataset.',
    stats:[
      { v:'99.8%', l:'detection accuracy' },
      { v:'370K+', l:'attack scenarios' },
      { v:'3', l:'peer evaluators' },
    ],
    evals:[
      { name:'SecurityChecker', d:'flags known attack patterns — prompt injection, SQL injection, privilege escalation' },
      { name:'IntentChecker', d:'checks each action against the agent\'s historical purpose' },
    ],
    team:[
      { name:'Vanshil Soni', url:'https://www.linkedin.com/in/vanshilsoni/' },
      { name:'Kartik Patel', url:'https://www.linkedin.com/in/kpatel0170/' },
      { name:'Raj Vijay Muni', me:true },
      { name:'Rimjhim Bhatnagar', url:'https://www.linkedin.com/in/rimjhim-bhatnagar-3bb028315/' },
    ],
  },
  {
    kicker:'Scholarship', color:'g', title:'International Student Entrance Scholarship',
    event:'University of Regina',
    amount:'$3,000',
    desc:'Awarded an entrance scholarship as an incoming international student.',
  },
];

const colorWord = { g:'green', b:'blue', a:'amber' };

const experiences = [
  { role:'Programming Analyst I', company:'Federated Co-operatives Limited · Co-op', loc:'Regina, SK', period:'Jan 2026 — Present', color:'g',
    points:[
      'Develop and support internal business applications alongside the IT team.',
      'Work with company data and systems to streamline day-to-day operations.',
    ] },
  { role:'CS Project Assistant', company:'Suncrest College · Co-op', loc:'Yorkton, SK', period:'May 2025 — Aug 2025', color:'b',
    points:[
      'Built and maintained web development projects for the college.',
      'Guided and taught students through hands-on technical work.',
    ] },
  { role:'Loss Prevention Officer', company:'Blackbird Security Inc. · On-Call', loc:'Regina, SK', period:'Sep 2022 — Present', color:'a',
    points:[
      'Monitor retail sites to deter theft and keep people and stock safe.',
      'Respond to incidents calmly and document them clearly.',
    ] },
  { role:'Field Supervisor', company:'Blackbird Security Inc. · Full-time', loc:'Regina, SK', period:'Sep 2023 — Jul 2024', color:'g',
    points:[
      'Supervised security teams across field sites and coordinated coverage.',
      'Owned client relations as the on-site point of contact.',
    ] },
  { role:'Sales Associate', company:'BRANDS Convenience Store · Part-time', loc:'Regina, SK', period:'Apr 2023 — Sep 2023', color:'b',
    points:[
      'Ran retail sales and daily store operations.',
      'Handled transactions and looked after customer service.',
    ] },
];

/* in-memory mode (artifacts can't use localStorage) */
let mode = null;

/* =========================================================
   BOOT
   ========================================================= */
const modal   = document.getElementById('modal');
const regular = document.getElementById('regular');
const terminal= document.getElementById('terminal');

document.getElementById('pickTerm').addEventListener('click', () => startMode('terminal'));
document.getElementById('pickReg').addEventListener('click', () => startMode('regular'));
document.getElementById('toTerminal').addEventListener('click', () => switchTo('terminal'));
document.getElementById('termToRegular').addEventListener('click', () => switchTo('regular'));

function startMode(m){
  mode = m;
  modal.classList.add('hidden');
  if(m === 'regular'){ regular.classList.add('active'); initRegular(); }
  else { terminal.classList.add('active'); initTerminal(); }
}

function switchTo(m){
  if(m === 'terminal'){
    regular.classList.remove('active');
    terminal.classList.add('active');
    mode = 'terminal';
    if(!terminalReady) initTerminal(); else focusInput();
  } else {
    terminal.classList.remove('active');
    regular.classList.add('active');
    mode = 'regular';
    if(!regularReady) initRegular();
    window.scrollTo({top:0});
  }
}

/* =========================================================
   REGULAR MODE
   ========================================================= */
let regularReady = false;
function initRegular(){
  if(regularReady) return;
  regularReady = true;
  typeTitle();
  renderExperience();
  renderEducation();
  renderAchievements();
  renderProjects();
  setupNav();
  setupNavbarScroll();
  revealTimeline();
}

function typeTitle(){
  const el = document.getElementById('typeTitle');
  const text = '$ Welcome to my portfolio';
  let i = 0;
  el.textContent = '';
  (function step(){
    if(i <= text.length){ el.textContent = text.slice(0, i++); setTimeout(step, 55); }
  })();
}

function renderExperience(){
  const wrap = document.getElementById('expList');
  wrap.innerHTML = '';
  experiences.forEach((e, i) => {
    const cw = colorWord[e.color];
    const side = i % 2 === 0 ? 'left' : 'right';
    const item = document.createElement('div');
    item.className = `xp-item ${side} ${e.color}`;
    item.innerHTML = `
      <div class="xp-card ${e.color}">
        <div class="exp-head">
          <div>
            <div class="exp-role ${cw}">${e.role}</div>
            <div class="exp-co">@ ${e.company}</div>
            <div class="exp-loc">${e.loc}</div>
          </div>
          <span class="exp-period">${e.period}</span>
        </div>
        <ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>`;
    wrap.appendChild(item);
  });
}

function renderEducation(){
  const eduList = document.getElementById('eduList');
  eduList.innerHTML = '';
  education.forEach(e => {
    const cw = colorWord[e.color];
    const el = document.createElement('div');
    el.className = `exp ${e.color}`;
    el.innerHTML = `
      <div class="exp-head">
        <div>
          <div class="exp-role ${cw}">${e.degree}</div>
          <div class="exp-co">@ ${e.school}</div>
        </div>
        <span class="exp-period">${e.period}</span>
      </div>
      <ul>${e.details.map(d => `<li>${d}</li>`).join('')}</ul>`;
    eduList.appendChild(el);
  });

  const certGrid = document.getElementById('certGrid');
  certGrid.innerHTML = '';
  certifications.forEach(c => {
    const el = document.createElement('div');
    el.className = `cert ${c.color}`;
    const skills = c.skills ? `<div class="cert-skills">${c.skills.join(' · ')}</div>` : '';
    el.innerHTML = `
      <div class="cert-name"><span class="mark">✦</span>${c.name}</div>
      <div class="cert-meta">${c.issuer} · ${c.year}</div>
      ${skills}`;
    certGrid.appendChild(el);
  });
}

function renderAchievements(){
  const wrap = document.getElementById('achList');
  if(!wrap) return;
  wrap.innerHTML = '';
  achievements.forEach(a => {
    const cw = colorWord[a.color];
    const ev = a.eventUrl
      ? `<a href="${a.eventUrl}" target="_blank" rel="noopener">${a.event}</a>`
      : a.event;
    const eventLine = [a.placement, ev, a.year].filter(Boolean).join(' · ');
    let html = `
      <div class="ach-head">
        <div class="ach-kicker ${cw}">${a.kicker}</div>
        <div class="ach-titlerow">
          <div class="ach-title ${cw}">${a.title}</div>
          ${a.amount ? `<div class="ach-amount">${a.amount}</div>` : ''}
        </div>
        ${eventLine ? `<div class="ach-event">${eventLine}</div>` : ''}
      </div>`;
    html += `<p class="ach-desc">${a.desc}</p>`;
    if(a.stats){
      html += `<div class="ach-stats">` + a.stats.map(s =>
        `<div class="stat-chip"><span class="stat-v ${cw}">${s.v}</span><span class="stat-l">${s.l}</span></div>`
      ).join('') + `</div>`;
    }
    if(a.evals){
      html += `<ul class="ach-eval">` + a.evals.map(e =>
        `<li><b>${e.name}</b> — ${e.d}</li>`
      ).join('') + `</ul>`;
    }
    if(a.team){
      const names = a.team.map(t => t.me
        ? `<b class="${cw}">${t.name} (me)</b>`
        : `<a href="${t.url}" target="_blank" rel="noopener">${t.name}</a>`
      ).join(', ');
      html += `<div class="ach-team">Team: ${names}</div>`;
    }
    const el = document.createElement('div');
    el.className = `ach ${a.color}`;
    el.innerHTML = html;
    wrap.appendChild(el);
  });
}

function renderProjects(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  projects.forEach((p, idx) => {
    const cw = colorWord[p.color];
    const clickable = !!p.url;
    const el = document.createElement('div');
    el.className = `proj ${p.color}${clickable ? '' : ' building'}${p.wide ? ' full' : ''}`;;
    el.style.animation = `rise .6s ease ${0.08*idx}s forwards`;
    el.style.opacity = '0';
    let badgeText = '● live', badgeCls = 'live';
    if(p.status === 'building'){ badgeText = '● in progress'; badgeCls = 'soon'; }
    else if(p.status === 'paper'){ badgeText = '● published'; badgeCls = 'live'; }
    const badge = `<span class="status ${badgeCls}">${badgeText}</span>`;
    const ctaText = clickable ? (p.cta || '→ open ↗') : 'coming soon';
    const cta = `<div class="pcta ${clickable ? cw : 'dim'}">${ctaText}</div>`;
    el.innerHTML = `
      <div class="phead"><h3 class="${cw}">${p.title}</h3>${badge}</div>
      <p class="pd">${p.description}</p>
      <div class="ptags">${p.tags.map(t=>`<span class="ptag ${cw}">${t}</span>`).join('')}</div>
      ${cta}`;
    if(clickable) el.addEventListener('click', () => window.open(p.url, '_blank', 'noopener'));
    grid.appendChild(el);
  });
}

function setupNav(){
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(link.getAttribute('href'));
      if(t) t.scrollIntoView({behavior:'smooth'});
    });
  });
}

function setupNavbarScroll(){
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  let last = 0;
  window.addEventListener('scroll', () => {
    if(mode !== 'regular') return;
    const y = window.pageYOffset;
    nav.classList.toggle('hide', y > last && y > 120);
    last = y <= 0 ? 0 : y;
    let cur = '';
    sections.forEach(s => { if(y >= s.offsetTop - 220) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href').slice(1) === cur));
  });
}

function revealTimeline(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('show'); });
  }, { threshold:0.25 });
  document.querySelectorAll('.t-item, .xp-item, .exp, .cert, .ach').forEach(it => obs.observe(it));
}


/* =========================================================
   TERMINAL MODE  — the real command console
   ========================================================= */
let terminalReady = false;
const body  = document.getElementById('termBody');
const input = document.getElementById('hidden-input');
const locEl = document.getElementById('loc');

let buffer = '';
let history = [];
let histIdx = -1;
let inputRow = null;       // live input row element
let cwd = '~';             // current "location"

const PS1 = () =>
  `<span class="ps1">visitor@<span class="host">raj-portfolio</span>:<span class="path">${cwd}</span>$ </span>`;

function initTerminal(){
  if(terminalReady){ focusInput(); return; }
  terminalReady = true;

  // capture keystrokes
  input.addEventListener('input', e => { buffer = e.target.value; renderInput(); });
  input.addEventListener('keydown', onKey);
  document.getElementById('terminal').addEventListener('mousedown', e => {
    // let real controls (links, buttons) work; otherwise keep focus on the input
    if(e.target.closest('a') || e.target.closest('button')) return;
    e.preventDefault(); focusInput();
  });
  document.addEventListener('selectionchange', () => {}); // no-op, keeps caret sane

  bootSequence();
}

function focusInput(){ input.focus(); if(inputRow) inputRow.classList.remove('blurred'); }

input.addEventListener('blur', () => { if(inputRow) inputRow.classList.add('blurred'); });
input.addEventListener('focus', () => { if(inputRow) inputRow.classList.remove('blurred'); });

/* ---- printing helpers ---- */
function print(html, cls='out'){
  const div = document.createElement('div');
  div.className = `line ${cls}`;
  div.innerHTML = html;
  body.insertBefore(div, inputRow);
  scrollBottom();
  return div;
}
function printRaw(node){ body.insertBefore(node, inputRow); scrollBottom(); }
function scrollBottom(){ body.scrollTop = body.scrollHeight; }

/* the persistent live input line */
function buildInputRow(){
  inputRow = document.createElement('div');
  inputRow.className = 'line prompt-line input-row';
  inputRow.innerHTML = `${PS1()}<span class="typed"></span><span class="blk"></span>`;
  body.appendChild(inputRow);
  renderInput();
}
function renderInput(){
  if(!inputRow) return;
  inputRow.querySelector('.ps1').outerHTML = PS1();
  inputRow.querySelector('.typed').textContent = buffer;
  scrollBottom();
}

/* echo a submitted command as a static line above the new prompt */
function echoCommand(cmd){
  const div = document.createElement('div');
  div.className = 'line prompt-line';
  div.innerHTML = `${PS1()}<span class="cmd-echo">${escapeHtml(cmd)}</span>`;
  body.insertBefore(div, inputRow);
}

function escapeHtml(s){ return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---- boot animation ---- */
function bootSequence(){
  const lines = [
    ['booting raj-os v2.6 …', 'boot'],
    ['loading kernel modules … <span class="ok">ok</span>', 'boot'],
    ['mounting /projects … <span class="ok">ok</span>', 'boot'],
    ['starting shell … <span class="ok">ok</span>', 'boot'],
  ];
  let i = 0;
  (function step(){
    if(i < lines.length){
      print(lines[i][0], lines[i][1]); i++;
      setTimeout(step, 230);
    } else {
      print('', 'out');
      print(BANNER, 'ascii');
      print('', 'out');
      print(`Welcome. This is an interactive shell — <span class="ok">no mouse needed</span>.`, 'out');
      print(`Type <span class="ok">help</span> to see commands, or <span class="warn">ls</span> to look around.`, 'muted');
      print('', 'out');
      buildInputRow();
      focusInput();
    }
  })();
}

const BANNER =
` ___       _  __   ___  _             __  __           _
| _ \\__ _ (_) \\ \\ / (_)(_)__ _ _  _  |  \\/  |_  _ _ _ (_)
|   / _\` || |  \\ V /| || / _\` | || | | |\\/| | || | ' \\| |
|_|_\\__,_|/ |   \\_/ |_|/ \\__,_|\\_, | |_|  |_|\\_,_|_||_|_|
        |__/         |__/      |__/        portfolio`;

/* ---- key handling ---- */
function onKey(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    const cmd = buffer;
    echoCommand(cmd);
    buffer = ''; input.value = ''; renderInput();
    if(cmd.trim()){ history.push(cmd); histIdx = history.length; }
    runCommand(cmd.trim());
  }
  else if(e.key === 'ArrowUp'){
    e.preventDefault();
    if(history.length && histIdx > 0){ histIdx--; buffer = history[histIdx]; input.value = buffer; renderInput(); }
  }
  else if(e.key === 'ArrowDown'){
    e.preventDefault();
    if(histIdx < history.length - 1){ histIdx++; buffer = history[histIdx]; }
    else { histIdx = history.length; buffer = ''; }
    input.value = buffer; renderInput();
  }
  else if(e.key === 'Tab'){
    e.preventDefault();
    autocomplete();
  }
  else if(e.key === 'l' && e.ctrlKey){
    e.preventDefault();
    clearScreen();
  }
}

const COMMANDS = ['help','ls','cd','open','cat','about','experience','work','education','certs','achievements','awards','projects','skills','contact','whoami','clear','home','exit','gui'];

function autocomplete(){
  const parts = buffer.trim().split(/\s+/);
  if(parts.length <= 1){
    const m = COMMANDS.filter(c => c.startsWith(parts[0]||''));
    if(m.length === 1){ buffer = m[0] + ' '; input.value = buffer; renderInput(); }
    else if(m.length > 1){ print(m.join('   '), 'muted'); }
  } else {
    const last = parts[parts.length-1];
    const slugs = projects.map(p => p.slug).concat(['home','about','experience','education','achievements','projects','contact']);
    const m = slugs.filter(s => s.startsWith(last));
    if(m.length === 1){ parts[parts.length-1] = m[0]; buffer = parts.join(' '); input.value = buffer; renderInput(); }
    else if(m.length > 1){ print(m.join('   '), 'muted'); }
  }
}

function clearScreen(){
  [...body.querySelectorAll('.line')].forEach(l => { if(l !== inputRow) l.remove(); });
}

/* ---- command router ---- */
function runCommand(raw){
  if(!raw){ return; }
  const [cmd, ...args] = raw.split(/\s+/);
  const arg = args.join(' ');

  switch(cmd){
    case 'help':     cmdHelp(); break;
    case 'ls':       cmdLs(arg); break;
    case 'cd':       cmdCd(arg); break;
    case 'goto':     cmdCd(arg); break;
    case 'open':
    case 'cat':      cmdOpen(arg); break;
    case 'about':    cwd='about'; updateLoc(); printAbout(); break;
    case 'experience':
    case 'work':     cwd='experience'; updateLoc(); printExperience(); break;
    case 'education':
    case 'certs':
    case 'certifications': cwd='education'; updateLoc(); printEducation(); break;
    case 'achievements':
    case 'awards':   cwd='achievements'; updateLoc(); printAchievements(); break;
    case 'projects': cwd='projects'; updateLoc(); listProjects(); break;
    case 'skills':   printSkills(); break;
    case 'contact':  cwd='contact'; updateLoc(); printContact(); break;
    case 'whoami':   print('visitor — and a person with great taste in interfaces.', 'cy'); break;
    case 'pwd':      print('/home/visitor/'+(cwd==='~'?'':cwd), 'out'); break;
    case 'clear':    clearScreen(); break;
    case 'home':     cwd='~'; updateLoc(); print('back at <span class="ok">~</span> (home)', 'muted'); break;
    case 'gui':
    case 'exit':     print('switching to graphical mode …', 'warn'); setTimeout(()=>switchTo('regular'), 450); break;
    case 'sudo':     print("nice try. you already have root here :)", 'warn'); break;
    default:
      print(`command not found: <span class="err">${escapeHtml(cmd)}</span>. type <span class="ok">help</span>.`, 'err');
  }
}

function updateLoc(){ locEl.textContent = cwd; }

/* ---- command implementations ---- */
function cmdHelp(){
  const rows = [
    ['help',            'show this list'],
    ['ls',              'list sections and projects'],
    ['cd &lt;section&gt;',    'go to home · about · projects · contact'],
    ['open &lt;project&gt;',  'open a project (alias: cat)'],
    ['about',           'who I am'],
    ['experience',      'my work history'],
    ['education',       'degree &amp; certifications'],
    ['achievements',    'awards &amp; wins'],
    ['projects',        'list all projects'],
    ['skills',          'skills &amp; technologies'],
    ['contact',         'how to reach me'],
    ['whoami',          'about you'],
    ['clear',           'clear the screen (Ctrl+L)'],
    ['gui / exit',      'switch to the regular website'],
  ];
  print('available commands:', 'ok');
  rows.forEach(([c,d]) => print(`  <span class="ok">${c.padEnd ? '' : ''}</span><span class="warn">${c}</span>${' '.repeat(Math.max(1, 18 - c.replace(/&[a-z]+;/g,'x').length))}<span class="muted">${d}</span>`, 'out'));
  print('tip: press <span class="cy">Tab</span> to autocomplete commands and project names.', 'muted');
}

function cmdLs(arg){
  if(arg === 'projects' || cwd === 'projects'){ listProjects(); return; }
  print('sections/', 'ok');
  print('  <span class="cy">home</span>   <span class="cy">about</span>   <span class="cy">experience</span>   <span class="cy">education</span>   <span class="cy">achievements</span>   <span class="cy">projects</span>   <span class="cy">contact</span>', 'out');
  print('projects/', 'ok');
  print('  ' + projects.map(p => `<span class="warn">${p.slug}</span>`).join('   '), 'out');
  print('use <span class="ok">cd &lt;section&gt;</span> or <span class="ok">open &lt;project&gt;</span>.', 'muted');
}

function cmdCd(target){
  target = (target||'').replace(/^\.?\/?/, '').replace(/\/$/, '');
  if(!target || target === '~' || target === 'home'){ cwd='~'; updateLoc(); print('at <span class="ok">~</span> (home)', 'muted'); return; }
  if(['about','experience','education','achievements','projects','contact'].includes(target)){
    cwd = target; updateLoc();
    if(target === 'about') printAbout();
    else if(target === 'experience') printExperience();
    else if(target === 'education') printEducation();
    else if(target === 'achievements') printAchievements();
    else if(target === 'projects') listProjects();
    else printContact();
    return;
  }
  // maybe they meant a project
  if(projects.some(p => p.slug === target)){ cmdOpen(target); return; }
  print(`no such section: <span class="err">${escapeHtml(target)}</span>. try <span class="ok">ls</span>.`, 'err');
}

function cmdOpen(slug){
  slug = (slug||'').trim();
  if(!slug){ print('usage: <span class="ok">open &lt;project&gt;</span>  (see <span class="ok">projects</span>)', 'warn'); return; }
  const p = projects.find(x => x.slug === slug || x.title.toLowerCase() === slug.toLowerCase());
  if(!p){ print(`project not found: <span class="err">${escapeHtml(slug)}</span>. run <span class="ok">projects</span>.`, 'err'); return; }

  const cw = colorWord[p.color];
  const statusTxt = p.status === 'building'
    ? '<span class="warn">● in progress</span>'
    : (p.status === 'paper' ? '<span class="ok">● published</span>' : '<span class="ok">● live</span>');
  const linkRow = p.url
    ? `<div class="row"><span class="lbl">link:</span> <a href="${p.url}" target="_blank" rel="noopener">${p.url}</a></div>`
    : `<div class="row muted">no public link yet — coming soon.</div>`;
  const node = document.createElement('div');
  node.className = 'line detail';
  node.innerHTML = `
    <div class="ttl ${cw}">▸ ${p.title}  <span class="muted">(~/${p.slug})</span>  ${statusTxt}</div>
    <div class="row">${p.description}</div>
    <div class="row"><span class="lbl">stack:</span> ${p.tags.join(', ')}</div>
    ${linkRow}`;
  printRaw(node);
  print('run <span class="ok">projects</span> to see the rest.', 'muted');
}

function listProjects(){
  print('projects/', 'ok');
  projects.forEach(p => {
    const dot = (p.status === 'building') ? '<span class="warn">●</span>' : '<span class="ok">●</span>';
    print(`  ${dot} <span class="warn">${p.slug.padEnd(24)}</span><span class="muted">${p.title}</span>`, 'out');
  });
  print('open one with <span class="ok">open &lt;project&gt;</span>.', 'muted');
}

function printExperience(){
  print('experience/', 'ok');
  experiences.forEach(e => {
    const cw = colorWord[e.color];
    print(`  <span class="${cw}">${e.role}</span> <span class="muted">@ ${e.company} · ${e.loc}</span>  <span class="warn">[${e.period}]</span>`, 'out');
    e.points.forEach(pt => print(`     <span class="muted">▸ ${pt}</span>`, 'out'));
  });
  print('see the projects I built with <span class="ok">projects</span>.', 'muted');
}

function printEducation(){
  print('education/', 'ok');
  education.forEach(e => {
    const cw = colorWord[e.color];
    print(`  <span class="${cw}">${e.degree}</span> <span class="muted">@ ${e.school}</span>  <span class="warn">[${e.period}]</span>`, 'out');
    e.details.forEach(d => print(`     <span class="muted">▸ ${d}</span>`, 'out'));
  });
  print('certifications/', 'ok');
  certifications.forEach(c => {
    print(`  <span class="cy">✦ ${c.name}</span> <span class="muted">— ${c.issuer}, ${c.year}</span>`, 'out');
    if(c.skills) print(`     <span class="muted">skills: ${c.skills.join(' · ')}</span>`, 'out');
  });
  print('run <span class="ok">achievements</span> to see awards and wins.', 'muted');
}

function printAchievements(){
  print('achievements/', 'ok');
  achievements.forEach(a => {
    const cw = colorWord[a.color];
    const head = [a.placement, a.event, a.year].filter(Boolean).join(' · ');
    print(`  <span class="${cw}">${a.title}</span> <span class="muted">— ${head}</span>`, 'out');
    if(a.amount) print(`     <span class="warn">${a.amount}</span>`, 'out');
    if(a.stats) print(`     <span class="muted">${a.stats.map(s => s.v + ' ' + s.l).join('  ·  ')}</span>`, 'out');
    if(a.evals) a.evals.forEach(e => print(`     <span class="muted">▸ <b>${e.name}</b> — ${e.d}</span>`, 'out'));
    if(a.team) print(`     <span class="muted">team: ${a.team.map(t => t.me ? t.name + ' (me)' : t.name).join(', ')}</span>`, 'out');
  });
}

function printAbout(){
  print('about/', 'ok');
  print('Who I am      — CS student @ University of Regina, minor in statistics.', 'out');
  print('What I do     — Programming Analyst @ Federated Co-operatives.', 'out');
  print('What drives me — Programming, AI, Statistics and Analytics.', 'out');
  print('run <span class="ok">experience</span> for my work history, or <span class="ok">skills</span> for the stack.', 'muted');
}

function printSkills(){
  print('skills/', 'ok');
  print('  Power BI · MySQL · Data Analysis · JavaScript · HTML/CSS · AI &amp; Automation · UI/UX · Responsive', 'cy');
}

function printContact(){
  print('contact/', 'ok');
  print('  <span class="lbl">email   </span> <a href="mailto:raj10muni@gmail.com">raj10muni@gmail.com</a>', 'out');
  print('  <span class="lbl">github  </span> <a href="https://github.com/rvmuni10" target="_blank" rel="noopener">github.com/rvmuni10</a>', 'out');
  print('  <span class="lbl">linkedin</span> <a href="https://www.linkedin.com/in/rvmuni10/" target="_blank" rel="noopener">linkedin.com/in/rvmuni10</a>', 'out');
}

/* small style helper for label alignment in printContact */
const styleFix = document.createElement('style');
styleFix.textContent = '.detail .lbl, .out .lbl{display:inline-block;min-width:9ch}';
document.head.appendChild(styleFix);
