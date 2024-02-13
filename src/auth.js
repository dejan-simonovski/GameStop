const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function addUser(username, password) {
  const users = getUsers();
  users.push({ username, password });
  saveUsers(users);
}

function login(username, password) {
  const users = getUsers();
  const foundUser = users.find(user => user.username === username && user.password === password);
  if (foundUser) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function isAuthenticated() {
  return localStorage.getItem(CURRENT_USER_KEY) !== null;
}

export { getUsers, saveUsers, addUser, login, logout, getCurrentUser, isAuthenticated };
