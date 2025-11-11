import type { NavigateFunction } from "react-router-dom";
let navigateRef: NavigateFunction | null = null;
export const setNavigateRef = (navigate: NavigateFunction) => {
  navigateRef = navigate;
};
export const navigate = (path: string) => {
  if (navigateRef) {
    navigateRef(path);
  } else {
    console.warn("Функция navigateRef не готова");
  }
};
