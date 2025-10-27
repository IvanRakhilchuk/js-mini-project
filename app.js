function genPassword() {
  const upper = document.getElementById('upper').checked;
  const lower = document.getElementById('lower').checked;
  const digits = document.getElementById('digits').checked;
  const symbols = document.getElementById('symbols').checked;
  const length = parseInt(document.getElementById('length').value, 10);

  let pool = '';
  if (upper) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) pool += 'abcdefghijklmnopqrstuvwxyz';
  if (digits) pool += '0123456789';
  if (symbols) pool += '!@#$%^&*()-_=+[]{};:,.<>/?';

  if (!pool) { alert('Choose at least one character set'); return ''; }

  let out = '';
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out += pool[idx];
  }
  return out;
}

document.getElementById('gen').addEventListener('click', () => {
  document.getElementById('out').value = genPassword();
});

document.getElementById('copy').addEventListener('click', async () => {
  const val = document.getElementById('out').value;
  if (!val) return;
  await navigator.clipboard.writeText(val);
  alert('Copied!');
});
