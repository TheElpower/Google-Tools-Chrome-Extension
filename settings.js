document.addEventListener('DOMContentLoaded', function() {
  const addLinkForm = document.getElementById('add-link-form');
  const linkNameInput = document.getElementById('link-name');
  const linkUrlInput = document.getElementById('link-url');
  const linksList = document.getElementById('links-list');

  // Load links from storage and display them
  function loadLinks() {
    chrome.storage.sync.get({ links: [] }, function(data) {
      linksList.innerHTML = '';
      data.links.forEach((link, index) => {
        const li = document.createElement('li');
        li.textContent = `${link.name} (${link.url})`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-link');
        removeButton.addEventListener('click', () => removeLink(index));
        li.appendChild(removeButton);
        linksList.appendChild(li);
      });
    });
  }

  // Add a new link
  addLinkForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = linkNameInput.value;
    const url = linkUrlInput.value;
    chrome.storage.sync.get({ links: [] }, function(data) {
      const links = data.links;
      links.push({ name, url });
      chrome.storage.sync.set({ links: links }, function() {
        linkNameInput.value = '';
        linkUrlInput.value = '';
        loadLinks();
      });
    });
  });

  // Remove a link
  function removeLink(index) {
    chrome.storage.sync.get({ links: [] }, function(data) {
      const links = data.links;
      links.splice(index, 1);
      chrome.storage.sync.set({ links: links }, function() {
        loadLinks();
      });
    });
  }

  loadLinks();
});
