const STORAGE = {
  journals: "calmera-journals-v2",
  moods: "calmera-moods-v2"
};

const affirmations = [
  "You don’t have to solve everything tonight.",
  "A small pause still counts as taking care of yourself.",
  "Your feelings can be real without being permanent.",
  "Rest is not something you have to earn.",
  "You can start again from exactly where you are.",
  "Being gentle with yourself is a real form of strength.",
  "You are allowed to ask for company in a hard moment.",
  "Today only needs one honest next step."
];

const moodResponses = {
  great: ["Let the good moment be real.", "Notice what helped without turning it into pressure to feel this way tomorrow."],
  okay: ["Steady is worth noticing.", "You could keep this moment simple: water, a stretch, or one thing you enjoy."],
  mixed: ["More than one feeling can be true.", "Try writing one sentence for each feeling, without deciding which one is ‘right.’"],
  low: ["You deserve softness in a low moment.", "Lower the bar for the next hour. A drink, a shower, or texting someone safe is enough."],
  overwhelmed: ["You only need to meet this minute.", "Put both feet on the floor and follow one breathing cycle. If you feel unsafe, open Support now."]
};

const moodColors = { great: "#d7ff5f", okay: "#63d9c6", mixed: "#7c6cff", low: "#8ea2c8", overwhelmed: "#ff6b78" };

const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function readStore(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toast(message) {
  const el = qs("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2500);
}

function route(name, updateHash = true) {
  const valid = ["home", "mood", "breathe", "journal", "support"];
  const next = valid.includes(name) ? name : "home";
  qsa(".view").forEach(view => {
    const active = view.dataset.view === next;
    view.hidden = !active;
    view.classList.toggle("active", active);
  });
  qsa(".station-link").forEach(link => link.classList.toggle("active", link.dataset.route === next));
  qs(".station-rail").classList.remove("open");
  qs(".mobile-menu").setAttribute("aria-expanded", "false");
  if (updateHash) history.replaceState(null, "", `#${next}`);
  qs("#workspace").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

qsa("[data-route]").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  route(link.dataset.route);
}));
qsa("[data-jump]").forEach(button => button.addEventListener("click", () => route(button.dataset.jump)));
window.addEventListener("hashchange", () => route(location.hash.slice(1), false));

qs(".mobile-menu").addEventListener("click", event => {
  const button = event.currentTarget;
  const open = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!open));
  qs(".station-rail").classList.toggle("open", !open);
});

function updateClock() {
  qs("#current-time").textContent = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit" }).format(new Date());
}
updateClock();
setInterval(updateClock, 30000);

qs("#new-affirmation").addEventListener("click", () => {
  const current = qs("#affirmation").textContent;
  const choices = affirmations.filter(item => item !== current);
  qs("#affirmation").textContent = choices[Math.floor(Math.random() * choices.length)];
});

function renderMoodHistory() {
  const history = readStore(STORAGE.moods).slice(0, 14);
  const container = qs("#history-dots");
  if (!history.length) {
    container.innerHTML = '<li class="empty-history">No check-ins yet</li>';
    return;
  }
  container.innerHTML = history.map(item => {
    const date = new Date(item.date);
    const readable = date.toLocaleDateString([], { month: "short", day: "numeric" });
    return `<li><i style="--mood-color:${moodColors[item.mood]}" aria-hidden="true"></i><span>${item.mood}</span><time datetime="${item.date}">${readable}</time></li>`;
  }).join("");
}

qsa("[data-mood]").forEach(button => button.addEventListener("click", () => {
  qsa("[data-mood]").forEach(item => item.classList.remove("selected"));
  button.classList.add("selected");
  const mood = button.dataset.mood;
  const [heading, suggestion] = moodResponses[mood];
  qs(".response-label").textContent = "Signal received";
  qs("#mood-response").textContent = heading;
  qs("#mood-suggestion").textContent = suggestion;
  qs("#mood-next").disabled = false;
  const history = readStore(STORAGE.moods);
  history.unshift({ mood, date: new Date().toISOString() });
  writeStore(STORAGE.moods, history.slice(0, 30));
  renderMoodHistory();
  toast("Check-in saved on this device");
}));

let breathTimer = null;
let breathCancelled = false;
const wait = ms => new Promise(resolve => { breathTimer = setTimeout(resolve, ms); });

async function runPhase(name, seconds, copy) {
  const visual = qs("#breath-visual");
  visual.className = `breath-visual ${name.toLowerCase()}`;
  qs("#breath-phase").textContent = name;
  qs("#breath-copy").textContent = copy;
  qsa(".breath-sequence span").forEach((item, index) => item.classList.toggle("active", index === ["Inhale", "Hold", "Exhale"].indexOf(name)));
  for (let number = seconds; number > 0; number--) {
    if (breathCancelled) return false;
    qs("#breath-count").textContent = number;
    await wait(1000);
  }
  return !breathCancelled;
}

qs("#start-breathing").addEventListener("click", async () => {
  breathCancelled = false;
  qs("#start-breathing").hidden = true;
  qs("#stop-breathing").hidden = false;
  const phases = [
    ["Inhale", 4, "Breathe in gently through your nose."],
    ["Hold", 7, "Stay soft. If holding feels uncomfortable, exhale early."],
    ["Exhale", 8, "Let the breath leave slowly through your mouth."]
  ];
  for (const phase of phases) if (!(await runPhase(...phase))) return resetBreathing();
  qs("#breath-count").textContent = "Done";
  qs("#breath-phase").textContent = "Nice work";
  qs("#breath-copy").textContent = "Notice whether anything shifted, even a little. That is enough.";
  toast("One cycle complete");
  resetBreathing(false);
});

function resetBreathing(resetText = true) {
  clearTimeout(breathTimer);
  breathCancelled = true;
  qs("#breath-visual").className = "breath-visual";
  qs("#start-breathing").hidden = false;
  qs("#start-breathing").textContent = "Start another cycle →";
  qs("#stop-breathing").hidden = true;
  if (resetText) {
    qs("#breath-count").textContent = "Ready";
    qs("#breath-phase").textContent = "One quiet minute";
    qs("#breath-copy").textContent = "Sit comfortably. Let your shoulders drop. This doesn’t need to be perfect.";
  }
}
qs("#stop-breathing").addEventListener("click", () => { resetBreathing(); toast("Breathing cycle stopped"); });

const entryInput = qs("#journal-entry");
entryInput.addEventListener("input", () => { qs("#char-count").textContent = `${entryInput.value.length.toLocaleString()} / 5,000`; });

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function renderJournals(filter = "") {
  const entries = readStore(STORAGE.journals);
  const query = filter.trim().toLowerCase();
  const visible = entries.filter(entry => `${entry.title} ${entry.text}`.toLowerCase().includes(query));
  const container = qs("#journal-list");
  if (!visible.length) {
    container.innerHTML = `<div class="empty-state">${query ? "No entries match that search." : "Your saved thoughts will appear here.<br>Nothing is uploaded."}</div>`;
    return;
  }
  container.innerHTML = visible.map(entry => `<article class="journal-entry"><header><h3>${escapeHTML(entry.title)}</h3><time>${new Date(entry.date).toLocaleDateString([], { month: "short", day: "numeric" })}</time></header><p>${escapeHTML(entry.text)}</p><button type="button" data-delete="${entry.id}">Delete entry</button></article>`).join("");
  qsa("[data-delete]", container).forEach(button => button.addEventListener("click", () => {
    if (!confirm("Delete this journal entry? This cannot be undone.")) return;
    writeStore(STORAGE.journals, readStore(STORAGE.journals).filter(entry => String(entry.id) !== button.dataset.delete));
    renderJournals(qs("#journal-search").value);
    toast("Entry deleted");
  }));
}

qs("#journal-form").addEventListener("submit", event => {
  event.preventDefault();
  const title = qs("#journal-title-input").value.trim();
  const text = entryInput.value.trim();
  if (!title || !text) return;
  const entries = readStore(STORAGE.journals);
  entries.unshift({ id: Date.now(), title, text, date: new Date().toISOString() });
  writeStore(STORAGE.journals, entries);
  event.currentTarget.reset();
  qs("#char-count").textContent = "0 / 5,000";
  renderJournals();
  toast("Journal entry saved privately");
});

qs("#journal-search").addEventListener("input", event => renderJournals(event.target.value));
qs("#export-txt").addEventListener("click", () => {
  const entries = readStore(STORAGE.journals);
  if (!entries.length) return toast("There are no entries to export yet");
  const content = entries.map(entry => `${entry.title}\n${new Date(entry.date).toLocaleString()}\n\n${entry.text}\n\n---\n`).join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `calmera-journal-${new Date().toISOString().slice(0,10)}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
});

renderMoodHistory();
renderJournals();
route(location.hash.slice(1) || "home", false);
