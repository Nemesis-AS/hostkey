# HostKey

A lightweight browser extension that automatically replaces `git@github.com` with your SSH config Host alias in GitHub clone URLs — making every copy-paste ready to use without manual editing.

## Overview

When working with GitHub repositories, clone URLs typically look like:
```
git@github.com:username/repo.git
```

If you have an SSH alias configured in your `~/.ssh/config` (e.g., `Host github`), you need to manually convert these URLs every time you clone. HostKey automates this process by replacing the domain prefix with your chosen alias on-the-fly.

## Features

- **Automatic URL Replacement**: Instantly converts GitHub SSH URLs to your configured alias format
- **Live Preview**: See your alias in real-time as you type
- **Persistent Configuration**: Save your SSH alias to sync across all your browsers via Chrome Sync
- **Seamless Integration**: Works directly on GitHub.com without interfering with your workflow
- **Lightweight**: Minimal performance impact with zero external dependencies

## How It Works

1. **Configuration**: Set your SSH config Host alias (e.g., `github`, `my-ssh-host`) via the extension popup
2. **URL Detection**: The extension detects SSH URLs on GitHub pages
3. **Automatic Conversion**: Replaces `git@github.com:` with `git@{your-alias}:` automatically
4. **Smart Copy**: When you copy a clone URL, the converted version is copied to your clipboard

### Example

If your SSH config has:
```
Host github
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa
```

Set your alias to `github` in HostKey, and all GitHub clone URLs will automatically convert to:
```
git@github:username/repo.git
```

Ready to use with `git clone`!

## Installation

### Prerequisites

- Google Chrome (or Chromium-based browser)
- SSH key configured in your `~/.ssh/config`

### Step-by-Step Installation

#### 1. **Enable Developer Mode**
   - Open Chrome and go to `chrome://extensions`
   - Enable **Developer Mode** (toggle switch in the top-right corner)

#### 2. **Load the Extension**
   - Click **Load unpacked**
   - Navigate to and select the HostKey extension folder
   - The extension will now appear in your extensions list

#### 3. **Configure Your SSH Alias**
   - Click the HostKey icon in your browser toolbar
   - Enter your SSH Host alias (the one defined in your `~/.ssh/config`)
   - Click **Save**
   - Your setting is now synced to your Google account

#### 4. **Start Using**
   - Navigate to any GitHub repository
   - The clone URL will now show your configured alias
   - Copy and use as normal — no manual editing needed!

## Usage

### Setting Your Alias

1. Click the HostKey extension icon in your toolbar
2. Type your SSH Host alias (from your `~/.ssh/config`)
3. See the preview update in real-time
4. Click **Save** or press **Enter**

### On GitHub

- Visit any GitHub repository page
- The clone URL input will display your configured alias
- Copy the URL as usual — it's already converted

## Configuration

### Default Alias

If no alias is configured, HostKey defaults to `github`. You can change this anytime via the extension popup.

### Sync Across Devices

Your SSH alias setting is synced to your Google account automatically. Sign in on another Chrome instance to access your configuration everywhere.

## Permissions

HostKey requests the following permissions:

- **`storage`**: To save your SSH alias preference
- **`clipboardWrite`** & **`clipboardRead`**: To handle copy-to-clipboard operations
- **`host_permissions: https://github.com/*`**: To access and modify content on GitHub pages

No extended permissions. No tracking. No analytics.

## Troubleshooting

### URLs aren't being replaced

- Verify you've set your SSH alias in the extension popup
- Check that the URL is a valid SSH URL starting with `git@github.com:`
- Refresh the GitHub page after changing your alias

### Can't find the extension icon

- Open `chrome://extensions`
- Look for "HostKey" in your extensions list
- Enable it if it's disabled
- If it's not there, try loading it again via **Load unpacked**

### SSH clone still not working

- Verify your `~/.ssh/config` has the correct Host entry
- Test your SSH connection: `ssh -T git@{your-alias}`
- Ensure your public key is added to your GitHub SSH keys

## Browser Support

- **Chrome**: ✅ Fully supported (MV3)
- **Chromium-based browsers** (Edge, Brave, Vivaldi, etc.): ✅ Should work with same installation steps

## Contributing

Suggestions, issues, and improvements are welcome! Feel free to modify the extension to suit your needs.

## License

MIT License — feel free to use, modify, and distribute.

---

**Made for developers who value their SSH config setup. Happy cloning!** 🔐
