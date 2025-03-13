import { app } from "electron";
import fs from "fs";
import path from "path";

export const clearLocalStorage = () => {
  try {
    const storagePath = path.join(app.getPath("userData"), "Local Storage");
    fs.rmSync(storagePath, { recursive: true, force: true });
    console.log("Local Storage cleared.");
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
};