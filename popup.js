const STORAGE_KEY = 'sshAlias';

const input = document.getElementById('aliasInput');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');
const previewAlias = document.getElementById('previewAlias');

// Load saved alias
chrome.storage.sync.get([STORAGE_KEY], (result) => {
  const saved = result[STORAGE_KEY] || 'github';
  input.value = saved;
  previewAlias.textContent = saved;
});

// Live preview update
input.addEventListener('input', () => {
  const val = input.value.trim() || 'github';
  previewAlias.textContent = val;
});

// Save
saveBtn.addEventListener('click', () => {
  const alias = input.value.trim();
  if (!alias) {
    input.focus();
    return;
  }

  chrome.storage.sync.set({ [STORAGE_KEY]: alias }, () => {
    status.classList.add('visible');
    setTimeout(() => status.classList.remove('visible'), 3000);
  });
});

// Allow Enter key to save
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveBtn.click();
});
