export function getLocalStorage(name: string) {
  return localStorage.getItem(name);
}
export function setLocalStorage(name: string, data: string) {
  return localStorage.setItem(name, data);
}
export function clearLocalStorage(name: string) {
    return localStorage.removeItem(name);
}