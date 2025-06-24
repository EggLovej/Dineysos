export async function loadFooter() {
  try {
    const res = await fetch("/components/footer.html");
    const html = await res.text();
    document.getElementById("footer-placeholder").innerHTML = html;
  } catch (err) {
    console.error("Failed to load footer:", err);
  }
}
export async function loadNavbar() {
  const target = document.getElementById("navbar-placeholder");
  if (!target) return;

  const res = await fetch("/components/navbar.html");
  const html = await res.text();
  target.innerHTML = html;
}