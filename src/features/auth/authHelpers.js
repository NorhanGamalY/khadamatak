export function saveToken(token, rememberMe) {
  const storage = rememberMe ? localStorage : sessionStorage;
  const other = rememberMe ? sessionStorage : localStorage;

  storage.setItem("token", token);
  other.removeItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
}
export function saveRole(role, rememberMe) {
  const storage = rememberMe ? localStorage : sessionStorage;
  const other = rememberMe ? sessionStorage : localStorage;

  storage.setItem("role", role);
  other.removeItem("role");
}

export function saveId(id, rememberMe) {
  const storage = rememberMe ? localStorage : sessionStorage;
  const other = rememberMe ? sessionStorage : localStorage;

  storage.setItem("id", String(id));
  other.removeItem("id");
}


export function getToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

export function getRole() {
  return localStorage.getItem("role") || sessionStorage.getItem("role") || null;
}


export function getId() {
  const id = localStorage.getItem("id") || sessionStorage.getItem("id");
  return id ? Number(id) : null; 
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("id");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("id");
}

function decodeToken(token) {
  try {
    return JSON.parse(

      window.atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload) {

    clearAuth();
    return false;
  }

  if (payload.exp && Date.now() / 1000 > payload.exp) {

    clearAuth();
    return false;
  }

  return true;
}

export function getHomeByRole() {
  const role = getRole();
  if (role === "Admin") return "/admin";
  if (role === "Craftsman") return "/craftsman";

  return "/home";
}