import { useSyncExternalStore } from "react";

export const useLocalStorage = (key: string) => {
  const item = useSyncExternalStore(subscribe, getSnapshot, () => undefined);

  const value = typeof item === "string" ? JSON.parse(item) : null;

  const setValue = (newValue: string) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new StorageEvent("storage"));
  };

  return [value, setValue] as const;
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
}

//Return the current value from the browser API
function getSnapshot() {
  //alert("localStorage changed")
  return localStorage.getItem("item");
}
