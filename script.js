// Two S Cars — JavaScript natif, sans framework ni backend.
const AGENCY = { phone: "212762398737" }; // +212 762 39 87 37
const CARS = [
  {id:"kia-picanto-bva", name:"Kia Picanto BVA", type:"city", label:"Citadine automatique", gear:"Automatique", fuel:"À confirmer", seats:5, dailyPrice:null, img:"https://static-eu.cargurus.com/images/forsale/2026/01/27/15/43/2022_kia_picanto-pic-7422529604632036003-1024x768.jpeg"},
  {id:"opel-corsa", name:"Opel Corsa", type:"city", label:"Citadine", gear:"À confirmer", fuel:"À confirmer", seats:5, dailyPrice:null, img:"https://carnovo.com/wp-content/uploads/2020/12/opel-corsa-ultimate.jpg"},
  {id:"clio-5", name:"Renault Clio 5", type:"city", label:"Citadine polyvalente", gear:"À confirmer", fuel:"À confirmer", seats:5, dailyPrice:null, img:"https://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/99-renault-clio-2019-autocar-studio-hero-front.jpg?itok=9EEY9fRq"},
  {id:"peugeot-208", name:"Peugeot 208", type:"city", label:"Citadine polyvalente", gear:"À confirmer", fuel:"À confirmer", seats:5, dailyPrice:null, img:"https://images.autokopen.nl/v/vaartland-nl-zwolle-zwolle/acdae247-6c0c-4921-9b08-bf9ed73d1202/0-935325c8-m.webp"},
  {id:"dacia-lodgy", name:"Dacia Lodgy", type:"family", label:"Familiale · 7 places", gear:"À confirmer", fuel:"À confirmer", seats:7, dailyPrice:300, img:"https://ireland.apollo.olxcdn.com/v1/files/b83x0qwfp9om-AUTOVITRO/image%3Bs%3D644x461"},
  {id:"skoda-kodiaq", name:"Škoda Kodiaq", type:"family", label:"SUV familial · 7 places", gear:"À confirmer", fuel:"À confirmer", seats:7, dailyPrice:400, img:"https://parkers-images.bauersecure.com/gallery-image/wp-images/639/static-exterior/1752x1168/kodiaq-15-sel-front.jpg"},
  {id:"hyundai-tucson", name:"Hyundai Tucson", type:"suv", label:"SUV", gear:"À confirmer", fuel:"À confirmer", seats:5, dailyPrice:null, img:"https://images.turo.com/media/vehicle/images/nzwIeLz2SWO2t_hNPR43FA.jpg"}
];
const $ = s => document.querySelector(s);
let filter = "all", query = "", selected = null, cardRevealObserver = null;
const wa = msg => `https://wa.me/${AGENCY.phone}?text=${encodeURIComponent(msg)}`;
const money = n => `${n.toLocaleString("fr-FR")} DH`;
function render() {
  const list = CARS.filter(c => (filter === "all" || c.type === filter) && `${c.name} ${c.label}`.toLowerCase().includes(query.toLowerCase()));
  $("#cars").innerHTML = list.length ? list.map((c, index) => `
    <article class="car reveal-card" style="--reveal-delay:${Math.min(index,5)*75}ms">
      <div class="car-photo"><img loading="lazy" src="${c.img}" alt="${c.name} — photo du modèle" onerror="this.onerror=null;this.src='assets/car-placeholder.svg'"><span class="tag">${c.label}</span></div>
      <div class="car-info"><div class="car-row"><div><h3>${c.name}</h3><p class="car-sub">${c.type === "family" ? "7 places" : c.type === "suv" ? "SUV" : "Citadine"}</p></div>
      <div class="price">${c.dailyPrice ? money(c.dailyPrice) : "Tarif à confirmer"}<small>${c.dailyPrice ? "/ JOUR" : "AVEC L'AGENCE"}</small></div></div>
      <div class="specs"><span>♙ ${c.seats} places</span><span>⚙ ${c.gear}</span><span>◉ ${c.fuel}</span></div>
      <button class="car-book" data-book="${c.id}">DEMANDER UNE RÉSERVATION ↗</button></div>
    </article>`).join("") : '<p>Aucun véhicule trouvé.</p>';
  if ("IntersectionObserver" in window) {
    if (!cardRevealObserver) cardRevealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); cardRevealObserver.unobserve(entry.target); }
    }), {threshold:0.12, rootMargin:"0px 0px -35px 0px"});
    document.querySelectorAll("#cars .reveal-card:not(.visible)").forEach(card => cardRevealObserver.observe(card));
  } else {
    document.querySelectorAll("#cars .reveal-card").forEach(card => card.classList.add("visible"));
  }
}
function dateString(v) { return v.split("-").reverse().join("/"); }
function duration() {
  if (!$("#start").value || !$("#end").value) {
    $("#duration").textContent = "Choisissez vos dates";
    $("#total").textContent = selected?.dailyPrice ? `${money(selected.dailyPrice)} / jour` : "À confirmer avec l'agence";
    return;
  }
  const days = Math.ceil((new Date($("#end").value+"T12:00:00") - new Date($("#start").value+"T12:00:00")) / 86400000);
  $("#duration").textContent = days > 0 ? `${days} jour${days > 1 ? "s" : ""}` : "Dates à corriger";
  $("#total").textContent = days > 0 && selected?.dailyPrice ? `${money(days * selected.dailyPrice)} estimés` : "À confirmer avec l'agence";
}
function openBooking(id) {
  selected = CARS.find(c => c.id === id); if (!selected) return;
  $("#carId").value = id; $("#modalCar").textContent = selected.name;
  $("#modalImage").style.backgroundImage = `url("${selected.img}")`;
  $("#error").textContent = ""; duration(); $("#booking").showModal();
}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const light = theme === "light";
  $("#themeToggle").setAttribute("aria-label", light ? "Passer au mode sombre" : "Passer au mode clair");
  $("#themeToggle").title = light ? "Activer le mode sombre" : "Activer le mode clair";
  $(".theme-icon").textContent = light ? "☾" : "☼";
  $(".theme-label").textContent = light ? "Mode sombre" : "Mode clair";
  document.querySelector('meta[name="theme-color"]').content = light ? "#F5F0E6" : "#101010";
}
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  applyTheme("dark"); // Dark mode is the default; choice persists for the current browser session.
  $("#themeToggle").addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  $("#floatWA").href = wa("Bonjour Two S Cars, je souhaite des informations sur vos véhicules, tarifs et disponibilités.");
  $("#contactWA").href = wa("Bonjour Two S Cars, je souhaite connaître vos véhicules, tarifs et disponibilités.");
  render();
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,10);
  $("#start").min = today; $("#end").min = today;
  document.querySelectorAll(".filter").forEach(b => b.onclick = () => {
    document.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x === b)); filter = b.dataset.filter; render();
  });
  $("#search").oninput = e => { query = e.target.value; render(); };
  $("#cars").onclick = e => { const b = e.target.closest("[data-book]"); if (b) openBooking(b.dataset.book); };
  $("#close").onclick = () => $("#booking").close();
  $("#booking").addEventListener("click", e => { if (e.target === $("#booking")) $("#booking").close(); });
  $("#start").onchange = () => { if ($("#end").value && $("#end").value <= $("#start").value) $("#end").value = ""; $("#end").min = $("#start").value; duration(); };
  $("#end").onchange = duration;
  $("#bookingForm").onsubmit = e => {
    e.preventDefault();
    const name = $("#name").value.trim(), phone = $("#phone").value.trim(), start = $("#start").value, end = $("#end").value, time = $("#time").value;
    if (!name || !phone || !start || !end || !time) { $("#error").textContent = "Complétez les champs obligatoires."; return; }
    const days = Math.ceil((new Date(end+"T12:00:00") - new Date(start+"T12:00:00")) / 86400000);
    if (days <= 0) { $("#error").textContent = "La date de retour doit être postérieure à la date de départ."; return; }
    const total = selected.dailyPrice ? `${money(days * selected.dailyPrice)} estimés` : "À confirmer avec l'agence";
    let msg = `Bonjour Two S Cars, je m'appelle ${name} (Tél: ${phone}). Je souhaite réserver la ${selected.name} du ${dateString(start)} au ${dateString(end)} (${days} jour${days > 1 ? "s" : ""}) à ${time}. Lieu: ${$("#location").value}. Prix total: ${total}.`;
    if ($("#extra").value.trim()) msg += ` Informations complémentaires: ${$("#extra").value.trim()}.`;
    msg += " Merci de confirmer la disponibilité et le tarif.";
    window.open(wa(msg), "_blank", "noopener,noreferrer");
  };
  $("#hamb").onclick = () => { const open = $("#nav").classList.toggle("open"); $("#hamb").setAttribute("aria-expanded", String(open)); };
  document.querySelectorAll("#nav a").forEach(a => a.onclick = () => $("#nav").classList.remove("open"));
  const update = () => { $("#header").classList.toggle("scrolled", scrollY > 20); const max = document.documentElement.scrollHeight - innerHeight; $("#progress").style.width = (max ? scrollY / max * 100 : 0) + "%"; };
  addEventListener("scroll", update, {passive:true}); update();
  if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); reveal.unobserve(e.target); } }), {threshold:.12});
    document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));
    const navObs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) document.querySelectorAll("#nav a[href^='#']").forEach(a => a.classList.toggle("active", a.hash === "#" + e.target.id)); }), {rootMargin:"-35% 0px -55% 0px"});
    document.querySelectorAll("main section[id]").forEach(s => navObs.observe(s));
  }
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.addEventListener("error", () => {
      heroVideo.style.display = "none";
      $(".hero").style.background = 'center / cover no-repeat url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85")';
    });
    const playVideo = heroVideo.play();
    if (playVideo && typeof playVideo.catch === "function") playVideo.catch(() => { /* poster remains visible if autoplay is blocked */ });
  }
});