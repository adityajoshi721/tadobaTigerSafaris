const menuButton = document.getElementById('menuBtn');
const navigation = document.getElementById('siteNav');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('travelDate').min = new Date().toLocaleDateString('en-CA');

document.querySelectorAll('.ask-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('tripPackage').value = link.dataset.plan;
  });
});

document.getElementById('tripForm').addEventListener('submit', function (event) {
  event.preventDefault();
  if (!this.reportValidity()) return;

  const form = new FormData(this);
  const message = [
    'Hello, I want to plan a Tadoba safari trip.',
    '',
    'Name: ' + form.get('name'),
    'Phone: ' + form.get('phone'),
    'Travel date: ' + (form.get('date') || 'Flexible'),
    'Travellers: ' + form.get('travelers'),
    'Trip plan: ' + form.get('package'),
    'Notes: ' + (form.get('note') || 'None')
  ].join('\n');
  const url = 'https://wa.me/918668200472?text=' + encodeURIComponent(message);
  const feedback = document.getElementById('formFeedback');
  const fallback = document.createElement('a');
  fallback.href = url;
  fallback.target = '_blank';
  fallback.rel = 'noopener noreferrer';
  fallback.textContent = 'If WhatsApp did not open, tap here.';
  feedback.replaceChildren('WhatsApp is ready with your enquiry. Press Send there to complete it. ', fallback);
  window.open(url, '_blank', 'noopener,noreferrer');
});
