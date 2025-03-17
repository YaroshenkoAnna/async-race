export function loadFile<T>(callback: (data: T) => void): void {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file = target.files[0];
    file
      .text()
      .then((text) => {
        try {
          const json = JSON.parse(text) as T;
          callback(json);
        } catch (error) {
          console.error("Error loading JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error reading file:", error);
      });
  });

  input.click();
}
