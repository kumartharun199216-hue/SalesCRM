/**
 * SALES CRM - AUTHENTICATION MODULE
 * Prototype session management, role enforcement, and login/logout logic
 */

const Auth = {
  /**
   * Get the current logged-in user object from localStorage
   * If null in prototype mode, auto-defaults to active Admin/Manager so direct file:/// navigation works instantly
   */
  getCurrentUser() {
    let user = StorageService.getData(CRM_STORAGE_KEYS.CURRENT_USER, null);
    if (!user || !user.id) {
      if (window.SeedData && typeof SeedData.initIfEmpty === 'function') {
        SeedData.initIfEmpty();
      }
      const users = StorageService.getData(CRM_STORAGE_KEYS.USERS, []);
      user = users.find(u => u.role === 'admin' && u.status === 'Active') ||
             users.find(u => u.role === 'manager' && u.status === 'Active') ||
             users[0] || null;
      if (user) {
        StorageService.saveData(CRM_STORAGE_KEYS.CURRENT_USER, user);
      }
    }
    return user;
  },

  /**
   * Check if any user is currently authenticated
   */
  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!(user && user.id && user.status === 'Active');
  },

  /**
   * Authenticate user credentials against registered users
   * @param {string} email 
   * @param {string} password 
   * @returns {{ success: boolean, message?: string, user?: object }}
   */
  login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const users = StorageService.getData(CRM_STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, message: 'Invalid email or password.' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Invalid email or password.' };
    }

    if (user.status !== 'Active') {
      return { success: false, message: 'Your account is currently inactive. Contact your administrator.' };
    }

    // Save session
    StorageService.saveData(CRM_STORAGE_KEYS.CURRENT_USER, user);

    // Record activity
    if (window.Activities) {
      Activities.log({
        user: user.name,
        role: user.role,
        action: 'Login',
        description: `${user.name} logged into the system (${user.role.toUpperCase()})`
      });
    }

    return { success: true, user };
  },

  /**
   * Terminate user session and redirect to login
   */
  logout() {
    const user = this.getCurrentUser();
    if (user && window.Activities) {
      Activities.log({
        user: user.name,
        role: user.role,
        action: 'Logout',
        description: `${user.name} logged out`
      });
    }

    StorageService.deleteData(CRM_STORAGE_KEYS.CURRENT_USER);

    // Determine path to login.html depending on whether we are in root or pages/
    const isPagesDir = window.location.pathname.includes('/pages/');
    const loginPath = isPagesDir ? 'login.html' : 'pages/login.html';
    window.location.href = loginPath;
  },

  /**
   * Get role-specific dashboard relative URL
   */
  getDashboardUrl(role) {
    const r = (role || '').toLowerCase();
    const isPagesDir = window.location.pathname.includes('/pages/');
    const prefix = isPagesDir ? '' : 'pages/';

    if (r === 'admin') return `${prefix}admin-dashboard.html`;
    if (r === 'manager') return `${prefix}manager-dashboard.html`;
    return `${prefix}salesperson-dashboard.html`;
  },

  /**
   * Check if current user has any of the specified roles
   */
  hasRole(...allowedRoles) {
    const user = this.getCurrentUser();
    if (!user) return false;
    return allowedRoles.includes(user.role);
  },

  /**
   * Require authentication on protected pages
   * @param {string[]} allowedRoles Array of allowed roles, e.g. ['admin', 'manager']
   * @returns {object|null} Authenticated user object (truthy) on success, or null
   */
  requireAuth(allowedRoles = []) {
    let user = this.getCurrentUser();

    if (!user || !user.id) {
      if (window.SeedData && typeof SeedData.initIfEmpty === 'function') {
        SeedData.initIfEmpty();
        user = this.getCurrentUser();
      }
    }

    if (!user) {
      const isPagesDir = window.location.pathname.includes('/pages/');
      const loginPath = isPagesDir ? 'login.html' : 'pages/login.html';
      window.location.href = loginPath;
      return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // In prototype mode: auto-switch to an active user with required privileges
      const users = StorageService.getData(CRM_STORAGE_KEYS.USERS, []);
      const eligibleUser = users.find(u => allowedRoles.includes(u.role) && u.status === 'Active');
      if (eligibleUser) {
        user = eligibleUser;
        StorageService.saveData(CRM_STORAGE_KEYS.CURRENT_USER, user);
      } else {
        alert(`Access Restricted: This page requires ${allowedRoles.join(' or ')} privileges.`);
        window.location.href = this.getDashboardUrl(user.role);
        return null;
      }
    }

    return user;
  }
};

window.Auth = Auth;
