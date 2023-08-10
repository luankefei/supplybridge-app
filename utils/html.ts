/**
 * Decode HTML entities - things like `&#817;s` or `&#039s;` or `&#8217;t`;
 * ONLY works in browser
 *
 * @param text - text to decode
 * @returns - decoded text
 */
export function decodeHTMLEntities(text:string) {
  const parser = new DOMParser();
  const decoded = parser.parseFromString(
    `<!doctype html><body>${text}`,
    "text/html"
  ).body.textContent;
  return decoded;
}
