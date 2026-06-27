/* =============================================
   DetalHub — Cabinet Shared JS
   ============================================= */

// ---- LANG ----
const LANG = {
  ru: {
    nav_dashboard: 'Панель управления',
    nav_projects:  'Мои проекты',
    nav_orders:    'Мои заказы',
    nav_profile:   'Профиль',
    nav_support:   'Поддержка',
    nav_logout:    'Выйти',
    role_client:   'Клиент',
    new_order:     'Новый заказ',
  },
  en: {
    nav_dashboard: 'Dashboard',
    nav_projects:  'My Projects',
    nav_orders:    'My Orders',
    nav_profile:   'Profile',
    nav_support:   'Support',
    nav_logout:    'Log out',
    role_client:   'Client',
    new_order:     'New Order',
  }
};

function getLang() { return localStorage.getItem('dh_lang') || 'ru'; }

function setLang(l) {
  localStorage.setItem('dh_lang', l);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === l);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (LANG[l][key]) el.textContent = LANG[l][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (LANG[l][key]) el.placeholder = LANG[l][key];
  });
}

// ---- AVATAR INITIALS ----
function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

// ---- USER INFO ----
function loadUserInfo() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const initials = getInitials(profile.name || profile.email || '');
  document.querySelectorAll('.js-avatar').forEach(el => el.textContent = initials);
  document.querySelectorAll('.js-user-name').forEach(el => el.textContent = profile.name || profile.email || '—');
}

// ---- LOGOUT ----
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userId');
  window.location.href = 'auth.html';
}

// ---- AUTH GUARD ----
function requireAuth() {
  if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'auth.html';
    return false;
  }
  return true;
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  loadUserInfo();
  const lang = getLang();
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });
  setLang(lang);
});
