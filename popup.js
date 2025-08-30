document.addEventListener('DOMContentLoaded', function() {
  const toolsList = document.getElementById('tools-list');
  const settingsLink = document.getElementById('settings-link');

  const defaultLinks = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'Gmail', url: 'https://gmail.com' },
    { name: 'Gemini', url: 'https://gemini.google.com/app' },
    { name: 'AI Studio', url: 'https://aistudio.google.com/prompts/new_chat?model=gemini-2.5-pro-preview-05-06' },
    { name: 'Flow', url: 'https://labs.google/fx/tools/flow' },
    { name: 'Jules', url: 'https://jules.google/' },
    { name: 'Whisk', url: 'https://labs.google/fx/tools/whisk' },
    { name: 'Labs', url: 'https://labs.google/' },
    { name: 'Youtube', url: 'https://www.youtube.com/' }
  ];

  function loadLinks() {
    chrome.storage.sync.get({ links: [] }, function(data) {
      toolsList.innerHTML = '';
      const allLinks = [...defaultLinks, ...data.links];
      allLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        const favicon = document.createElement('img');
        favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}`;
        favicon.alt = `${link.name} Favicon`;
        a.appendChild(favicon);
        a.appendChild(document.createTextNode(link.name));
        li.appendChild(a);
        toolsList.appendChild(li);
      });
    });
  }

  // Add event listener to open links in a new tab
  toolsList.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' || event.target.parentElement.tagName === 'A') {
      event.preventDefault();
      const url = event.target.closest('a').href;
      chrome.tabs.create({ url });
      window.close();
    }
  });

  // Open settings page
  settingsLink.addEventListener('click', function(event) {
    event.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  loadLinks();
});
