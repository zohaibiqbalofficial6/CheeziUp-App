/** Open a wa.me ticket. Same-tab on phones (most reliable); new tab on desktop. */
export function openWhatsApp(url: string) {
  if (typeof window === "undefined") return;
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (mobile) {
    window.location.assign(url);
    return;
  }
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
