import fs from "fs";

export function log(
  level: "INFO" | "ERROR" | "WARNING",
  text: string,
  path: string | undefined = undefined,
) {
  const now = new Date();

  const logString = `${now.toISOString()}|${level}|${text}`;

  if (path) {
    fs.writeFile(path, logString, (err) => {
      console.log("error: " + err?.message);
    });
  } else console.log(logString);
}
