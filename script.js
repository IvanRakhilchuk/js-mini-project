const el = id => document.getElementById(id);

const sets = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};

function generate() {
  const length = Math.min(64, Math.max(8, parseInt(el("length").value || 16)));
  const useLower = el("lower").checked;
  const useUpper = el("upper").checked;
  const useDigits = el("digits").checked;
  const useSymbols = el("symbols").checked;

  let pool = "";
  if (useLower) pool += sets.lower;
  if (useUpper) pool += sets.upper;
  if (useDigits) pool += sets.digits;
  if (useSymbols) pool += sets.symbols;

  if (!pool) {
    el("result").value = "Select at least one set (a–z, A–Z, 0–9, symbols)";
    return;
  }

  // guarantee at least one char from each selected set
  const picks = [];
  if (useLower) picks.push(randChar(sets.lower));
  if (useUpper) picks.push(randChar(sets.upper));
  if (useDigits) picks.push(randChar(sets.digits));
  if (useSymbols) picks.push(randChar(sets.symbols));

  while (picks.length < length) picks.push(randChar(pool));

  // shuffle (Fisher–Yates)
  for (let i = picks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [picks[i], picks[j]] = [picks[j], picks[i]];
  }

  el("result").value = picks.slice(0, length).join("");
}

function randChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

el("generate").addEventListener("click", generate);
el("copy").addEventListener("click", () => {
  const r = el("result");
  r.select(); r.setSelectionRange(0, 9999);
 el("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(el("result").value);
    el("copy").textContent = "Copied!";
  } catch {
    el("copy").textContent = "Failed";
  }
  setTimeout(() => (el("copy").textContent = "Copy"), 900);
});

});
