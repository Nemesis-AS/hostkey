// GitHub SSH Alias - Content Script
// Replaces git@github.com with user-configured SSH alias

const STORAGE_KEY = "sshAlias";
const DEFAULT_ALIAS = "github"; // e.g. Host github in ~/.ssh/config
const ORIGINAL_PREFIX = "git@github.com:";

let currentAlias = DEFAULT_ALIAS;

// Load alias from storage
chrome.storage.sync.get([STORAGE_KEY], (result) => {
  currentAlias = result[STORAGE_KEY] || DEFAULT_ALIAS;
  replaceSSHUrls();
  interceptCopyButtons();
});

// Listen for alias changes from popup
chrome.storage.onChanged.addListener((changes) => {
  if (changes[STORAGE_KEY]) {
    currentAlias = changes[STORAGE_KEY].newValue || DEFAULT_ALIAS;
    replaceSSHUrls();
  }
});

function getAliasPrefix() {
  return `git@${currentAlias}:`;
}

function convertUrl(url) {
  if (!url) return url;
  if (url.startsWith(ORIGINAL_PREFIX)) {
    return url.replace(ORIGINAL_PREFIX, getAliasPrefix());
  }
  return url;
}

function isSSHUrl(text) {
  return text && text.trim().startsWith(ORIGINAL_PREFIX);
}

// Replace visible SSH URLs in the clone/code input fields
function replaceSSHUrls() {
  // Target the clone URL input fields GitHub uses
  const selectors = ["#clone-with-ssh"];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((input) => {
      if (isSSHUrl(input.value)) {
        input.value = convertUrl(input.value);
        input.setAttribute("data-ssh-alias-replaced", "true");
      }

      const sibling = input.nextSibling;

      if (sibling && sibling.getAttribute("data-component") === "IconButton") {
        if (sibling.getAttribute("data-copy-intercepted") == "true") return;

        sibling.addEventListener("click", async (e) => {
          e.stopImmediatePropagation();
          e.preventDefault();

          const converted = convertUrl(input.value);
          await copyToClipboard(converted);
        });

        sibling.setAttribute("data-copy-intercepted", "true");
      }
    });
  });

  // Also update any visible text spans/code elements showing SSH URLs
  document.querySelectorAll("span, code, p").forEach((el) => {
    if (
      el.children.length === 0 &&
      el.textContent.trim().startsWith(ORIGINAL_PREFIX)
    ) {
      el.textContent = convertUrl(el.textContent.trim());
      el.setAttribute("data-ssh-alias-replaced", "true");
    }
  });
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

// Watch for DOM changes (GitHub is a SPA, panels open dynamically)
const observer = new MutationObserver((mutations) => {
  let shouldReplace = false;
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      shouldReplace = true;
      break;
    }
  }
  if (shouldReplace) {
    replaceSSHUrls();
    // interceptCopyButtons();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
