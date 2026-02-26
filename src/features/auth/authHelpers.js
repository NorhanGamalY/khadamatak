export function saveToken(token, rememberMe) {
  if (rememberMe) {
    localStorage.setItem("token", token);
    sessionStorage.removeItem("token");
  } else {
    sessionStorage.setItem("token", token);
    localStorage.removeItem("token");
  }
}


export function clearToken() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}


export function isAuthenticated() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return false;
  try {
    const payload = JSON.parse(window.atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      clearToken();
      return false;
    }
    return true;
  } catch {
    clearToken();
    return false;
  }
}