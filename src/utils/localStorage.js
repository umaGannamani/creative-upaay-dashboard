export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("appState");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

export const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("appState", JSON.stringify(state));
  } catch {}
};
