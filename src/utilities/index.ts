
export const NAVIGATION_HEIGHT = 50;
export const FOOTER_HEIGHT = NAVIGATION_HEIGHT;
export const HEADER_HEIGHT = NAVIGATION_HEIGHT;

// Constant for Axios in ms
export const REFRESH_INTERVAL = 5000;

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function humanFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return "0KB";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    ((bytes / 1024 ** i) * 1).toFixed(2) +
    " " +
    ["B", "KB", "MB", "GB", "TB"][i]
  );
}

export function sumAmountSafe(a: number, b: number): number {
  return (a * 1000 + b * 1000) / 1000;
}

export function isFalsyValue(val: unknown): boolean {
  return val === undefined || val === null || val === "";
}
