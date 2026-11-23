const profiles = new Map(
  Array.from(document.querySelectorAll("[data-profile]"), (profile) => ["#" + profile.dataset.profile, profile]),
);
const links = document.querySelectorAll(".profiles a");
const exportButton = document.getElementById("export-pdf");
let activeProfile;

function showProfile(moveFocus) {
  const requested = profiles.get(location.hash);
  const profile = requested ?? (location.hash === "#contenido" ? activeProfile : null)
    ?? profiles.get("#completo");

  for (const view of profiles.values()) {
    view.hidden = view !== profile;
  }
  for (const link of links) {
    if (profiles.get(link.hash) === profile) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }

  const title = profile.querySelector("h2");
  document.title = `Federico Daniel Aguirre · ${title.textContent}`;
  activeProfile = profile;
  if (moveFocus && requested) title.focus();
}

showProfile(false);
document.documentElement.setAttribute("data-cv-ready", "");
window.addEventListener("hashchange", () => showProfile(true));
exportButton.addEventListener("click", () => window.print());
document.getElementById("pdf-controls").hidden = false;
