(function () {
  "use strict";
  var CFG = window.DCASSAN_CONFIG || {};
  var D = window.DCASSAN_DATOS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var fmt = function (n) { return "$" + Math.round(n).toLocaleString("es-CL"); };
  var pct = function (p, n) { return n ? Math.round((1 - p / n) * 100) : 0; };
  var byId = {};
  D.servicios.forEach(function (s) { s.tipo = "servicio"; byId[s.id] = s; });
  D.cursos.forEach(function (c) { c.tipo = "curso"; byId[c.id] = c; });

  /* ---------- UTM / origen ---------- */
  var origen = {};
  try {
    var q = new URLSearchParams(location.search);
    ["utm_source", "utm_campaign", "utm_content", "fbclid"].forEach(function (k) { if (q.get(k)) origen[k] = q.get(k); });
    if (Object.keys(origen).length) sessionStorage.setItem("dc_origen", JSON.stringify(origen));
    else origen = JSON.parse(sessionStorage.getItem("dc_origen") || "{}");
  } catch (e) {}

  /* ---------- Píxel de Meta ---------- */
  if (CFG.PIXEL_ID) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    String(CFG.PIXEL_ID).split(",").forEach(function (id) { fbq("init", id.trim()); });
    fbq("track", "PageView");
  }
  function px(ev, data) { try { if (window.fbq) fbq("track", ev, data || {}); } catch (e) {} }

  function enviar(datos) {
    if (!CFG.ENDPOINT) return;
    var body = JSON.stringify(Object.assign({ fecha: new Date().toISOString(), pagina: location.href }, origen, datos));
    try {
      if (navigator.sendBeacon) navigator.sendBeacon(CFG.ENDPOINT, new Blob([body], { type: "text/plain" }));
      else fetch(CFG.ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: body });
    } catch (e) {}
  }

  function waLink(texto) {
    var num = String(CFG.WHATSAPP || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(texto);
  }

  /* ---------- Contacto general ---------- */
  document.querySelectorAll(".js-wa-libre").forEach(function (a) {
    a.href = waLink("Hola D'Cassan Studio 👋 Quiero más información.");
    a.target = "_blank"; a.rel = "noopener";
    a.addEventListener("click", function () { if (!a.dataset.item) { px("Contact"); enviar({ evento: "whatsapp" }); } });
  });
  $(".js-dir").textContent = CFG.DIRECCION || "";
  $(".js-ref").textContent = CFG.REFERENCIA || "";
  $(".js-mapa").href = CFG.MAPA || "#";
  $(".js-ig").href = CFG.INSTAGRAM || "#";

  /* ---------- Bloques de precio ---------- */
  function precioHTML(it) {
    var h = '<div class="price">';
    if (it.etiqueta) h += '<span class="price__lbl">' + esc(it.etiqueta) + "</span>";
    if (it.desde) h += '<span class="price__lbl">Desde</span>';
    h += '<span class="price__now">' + fmt(it.precio) + "</span>";
    if (it.normal) h += '<span class="price__old">' + fmt(it.normal) + '</span><span class="price__off">-' + pct(it.precio, it.normal) + "%</span>";
    return h + "</div>";
  }

  /* ---------- Test de piel ---------- */
  var elegidos = [];
  $("#test").innerHTML = D.test.map(function (t) { return '<button class="chip" aria-pressed="false" data-t="' + t.id + '">' + esc(t.txt) + "</button>"; }).join("");
  $("#test").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    var on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", on);
    elegidos = on ? elegidos.concat(b.dataset.t) : elegidos.filter(function (x) { return x !== b.dataset.t; });
    pintarTest();
  });
  function pintarTest() {
    var box = $("#testRes");
    if (!elegidos.length) { box.hidden = true; return; }
    var pts = {};
    D.test.forEach(function (t) {
      if (elegidos.indexOf(t.id) < 0) return;
      t.rec.forEach(function (id, i) { pts[id] = (pts[id] || 0) + (3 - i); });
    });
    var ids = Object.keys(pts).sort(function (a, b) { return pts[b] - pts[a] || byId[b].precio - byId[a].precio; }).slice(0, 3);
    box.hidden = false;
    box.innerHTML = "<h4>Te recomendamos</h4>" + ids.map(function (id, i) {
      var s = byId[id];
      return '<div class="rec' + (i === 0 ? " rec--top" : "") + '" data-open="' + id + '"><img src="' + s.foto + '" alt=""><div><div class="rec__n">' + esc(s.nombre) + '</div><div class="rec__p">' + (s.desde ? "desde " : "") + fmt(s.precio) + (s.duracion ? " · " + esc(s.duracion) : "") + '</div></div><span class="rec__go">Ver →</span></div>';
    }).join("") + '<p class="fine" style="text-align:left">Es una guía: en tu cita te evaluamos y confirmamos el servicio ideal.</p>';
  }

  /* ---------- Comparativas (limpiezas y extensiones) ---------- */
  var extras = { coreana: ["Peeling enzimático o químico", "Masaje con gua sha y rodillo de cuarzo", "Mascarilla descongestiva", "Hydralips de regalo"], hydrafacial: ["Hidrodermoabrasión H2O2", "Radiofrecuencia y biomicrocorrientes", "Máscara LED y spray de oxígeno", "Diagnóstico facial personalizado"] };
  function tiers(grupo, sel) {
  var limp = D.servicios.filter(function (s) { return s.grupo === grupo && !s.variantes; });
  $(sel).innerHTML = limp.map(function (s, i) {
    var base = grupo === "pestanas" ? s.beneficios : i === 0 ? s.incluye.slice(0, 6) : ["Todo lo de la " + limp[i - 1].corto];
    var plus = grupo === "pestanas" ? [] : (extras[s.id] || []);
    return '<article class="tier' + (s.destacado ? " tier--top" : "") + '">' +
      (s.destacado ? '<span class="badge">' + esc(s.destacado) + "</span>" : "") +
      (s.regalo ? '<span class="badge badge--gift">🎁 ' + esc(s.regalo) + "</span>" : "") +
      '<div class="tier__img"><img loading="lazy" src="' + s.foto + '" alt="' + esc(s.nombre) + '"></div>' +
      '<div class="tier__b"><div class="tier__name">' + esc(grupo === "pestanas" ? s.corto : s.nombre) + '</div><div class="tier__dur">' + esc([s.efecto, s.duracion].filter(Boolean).join(" · ")) + "</div>" + precioHTML(s) +
      "<ul>" + base.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + plus.map(function (x) { return '<li class="plus">' + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<button class="btn ' + (s.destacado ? "btn--gold" : "btn--ghost") + ' btn--full" data-open="' + s.id + '">Ver detalle y reservar</button></div></article>';
  }).join("");
  }
  tiers("limpiezas", "#limpiezas");
  tiers("pestanas", "#pestanas");

  /* ---------- Tarjetas ---------- */
  function cardHTML(it) {
    var chips = it.tipo === "curso" ? [it.formato].concat(it.chips || []) : [it.duracion].filter(Boolean);
    return '<article class="card" data-open="' + it.id + '">' +
      (it.destacado ? '<span class="badge' + (it.tipo === "curso" ? " badge--dark" : "") + '">' + esc(it.destacado) + "</span>" : "") +
      '<div class="card__img"><img loading="lazy" src="' + it.foto + '" alt="' + esc(it.nombre) + '"></div>' +
      '<div class="card__b">' + (it.area ? '<span class="card__k">' + esc(it.area) + "</span>" : "") +
      '<div class="card__n">' + esc(it.nombre) + '</div><div class="card__chips">' + chips.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>" +
      '<p class="card__g">' + esc(it.gancho) + "</p>" +
      '<div class="card__foot">' + precioHTML(it) + (it.reserva ? '<div class="card__res">Reserva con<br><b>' + fmt(it.reserva) + "</b></div>" : '<span class="card__more">Ver más →</span>') + "</div></div></article>";
  }
  $("#liftingBox").innerHTML = D.servicios.filter(function (s) { return s.variantes && s.grupo === "pestanas"; }).map(cardHTML).join("");
  $("#tratamientos").innerHTML = D.servicios.filter(function (s) { return s.grupo === "tratamientos"; }).map(cardHTML).join("");
  $("#cursosPestanas").innerHTML = D.cursos.filter(function (c) { return c.area === "Pestañas"; }).map(cardHTML).join("");
  $("#cursosFacial").innerHTML = D.cursos.filter(function (c) { return c.area === "Facial"; }).map(cardHTML).join("");

  /* ---------- Taller vs Formación ---------- */
  var ti = byId["c-intensivo"], fo = byId["c-formacion"];
  $("#vsPestanas").innerHTML = "<h4>¿Taller de 1 día o Formación completa?</h4><p class='muted'>El taller es ideal para partir rápido; la formación, si quieres salir lista para trabajar con más práctica y acompañamiento.</p>" +
    "<table><thead><tr><th></th><th>Taller Intensivo</th><th>Formación Profesional</th></tr></thead><tbody>" +
    [["Duración", "1 día", "3 encuentros"], ["Técnicas", "Clásica y volumen tecnológico", "Clásica, efecto rímel y volumen tecnológico"], ["Práctica real", "1 modelo", "2 modelos"], ["Evaluación final", "—", "Sí, con retroalimentación"], ["Asesoría WhatsApp", "3 meses", "Ilimitada"], ["Precio", fmt(ti.precio), fmt(fo.precio)]]
      .map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td><td>" + r[2] + "</td></tr>"; }).join("") +
    "</tbody><tfoot><tr><td></td><td><button class='link' data-open='c-intensivo'>Ver taller</button></td><td><button class='link' data-open='c-formacion'>Ver formación</button></td></tr></tfoot></table>";

  /* ---------- Galería ---------- */
  var fotos = [1, 2, 3, 4, 5, 6].map(function (n) { return "img/alumnas-" + n + ".webp"; });
  $("#gallery").innerHTML = fotos.map(function (f) { return '<img loading="lazy" src="' + f + '" alt="Alumna de D\'Cassan Studio con su certificado" data-zoom="' + f + '">'; }).join("");

  /* ---------- Modal ---------- */
  var modal = $("#modal"), body = $("#mBody"), actual = null;
  function abrir(html) { body.innerHTML = html; modal.hidden = false; document.body.style.overflow = "hidden"; $(".modal__box").scrollTop = 0; }
  function cerrar() { modal.hidden = true; document.body.style.overflow = ""; }
  modal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) cerrar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { cerrar(); $("#lightbox").hidden = true; } });

  function lista(arr) { return '<ul class="m__list">' + arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

  function detalle(id) {
    var it = byId[id]; if (!it) return;
    actual = it;
    setBar(it);
    px("ViewContent", { content_name: it.nombre, value: it.precio, currency: "CLP" });
    var meta = it.tipo === "curso" ? [it.formato, it.horario, "Presencial", CFG.REFERENCIA] : [it.duracion, it.efecto, CFG.REFERENCIA];
    var h = '<div class="m__img"><img src="' + it.foto + '" alt=""></div><div class="m__b">' +
      '<p class="eyebrow">' + (it.tipo === "curso" ? "Curso · " + esc(it.area) : it.grupo === "pestanas" ? "Servicio de pestañas" : "Servicio facial") + "</p>" +
      '<h2 id="mTitulo">' + esc(it.nombre) + '</h2><p class="m__g">' + esc(it.gancho) + "</p>" + precioHTML(it) +
      (it.reserva ? '<p style="margin-top:8px;color:var(--gold-hi);font-size:14px">Reserva tu cupo con <b>' + fmt(it.reserva) + "</b> y paga el saldo el día del curso.</p>" : "") +
      '<div class="m__meta">' + meta.filter(Boolean).map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("") + "</div>";
    if (it.variantes) h += '<div class="m__sec"><h3>' + esc(it.tituloVariantes || "Elige tu opción") + '</h3><div class="vars">' + it.variantes.map(function (v) { return "<div><b>" + esc(v.nombre) + "</b><span class='price__now'>" + fmt(v.precio) + "</span>" + (v.normal ? " <span class='price__old'>" + fmt(v.normal) + "</span>" : "") + "<p>" + esc(v.txt) + "</p></div>"; }).join("") + "</div></div>";
    h += '<div class="m__sec"><h3>' + (it.tituloIncluye || (it.tipo === "curso" ? "Qué incluye tu formación" : "Qué incluye")) + "</h3>" + lista(it.incluye) + "</div>";
    if (it.programa) h += '<div class="m__sec"><h3>Programa</h3><div class="prog">' + it.programa.map(function (p) { return "<div><b>" + esc(p[0]) + "</b><span>" + esc(p[1]) + "</span></div>"; }).join("") + "</div></div>";
    if (it.temario) h += '<div class="m__sec"><h3>Qué aprenderás</h3>' + lista(it.temario) + "</div>";
    if (it.beneficios) h += '<div class="m__sec"><h3>Beneficios</h3>' + lista(it.beneficios) + "</div>";
    if (it.ideal) h += '<div class="m__sec"><h3>Ideal para</h3>' + lista(it.ideal) + "</div>";
    if (it.nota) h += '<p class="note">' + esc(it.nota) + "</p>";
    if (it.faq) h += '<div class="m__sec"><h3>Preguntas frecuentes</h3>' + it.faq.map(function (f) { return "<details><summary>" + esc(f[0]) + "</summary><p>" + esc(f[1]) + "</p></details>"; }).join("") + "</div>";
    if (it.tipo === "curso") h += '<div class="m__sec"><h3>Condiciones</h3>' + lista(["Cupo confirmado con reserva de " + fmt(it.reserva) + " (se descuenta del total).", "El saldo se paga el día del curso, antes de comenzar.", it.reagenda, "Inasistencia sin aviso: se pierde lo abonado.", "Puedes traer a tu modelo o pedirnos ayuda para coordinarla."]) + "</div>";
    h += '<p style="margin-top:18px"><button class="link" data-zoom="' + it.afiche + '">Ver afiche completo</button></p>';
    h += '<div class="m__cta"><div>' + (it.desde ? '<span class="price__lbl" style="display:block">Desde</span>' : "") + '<span class="price__now">' + fmt(it.precio) + "</span></div>" +
      '<button class="btn ' + (it.tipo === "curso" ? "btn--dark" : "btn--gold") + '" data-reservar="' + it.id + '">' + (it.tipo === "curso" ? "Reservar mi cupo" : "Reservar mi hora") + "</button></div></div>";
    abrir(h);
  }

  /* ---------- Formulario de reserva ---------- */
  function formulario(id) {
    var it = byId[id]; actual = it;
    px("InitiateCheckout", { content_name: it.nombre, value: it.precio, currency: "CLP" });
    var curso = it.tipo === "curso";
    var h = '<div class="m__b" style="padding-top:28px"><p class="eyebrow">' + (curso ? "Reserva tu cupo" : "Reserva tu hora") + '</p><h2 id="mTitulo">' + esc(it.nombre) + "</h2>" +
      '<form class="form" id="fReserva" novalidate>';
    if (curso) {
      h += '<fieldset class="fs"><legend>¿Cómo quieres pagar?</legend>' +
        '<label class="opt"><input type="radio" name="pago" value="reserva" checked><span><b>Reservar con ' + fmt(it.reserva) + "</b><small>Pagas el saldo de " + fmt(it.precio - it.reserva) + " el día del curso</small></span></label>" +
        '<label class="opt"><input type="radio" name="pago" value="total"><span><b>Pagar el total: ' + fmt(it.precio) + "</b><small>Quedas con todo listo</small></span></label></fieldset>" +
        '<fieldset class="fs"><legend>Modelo para la práctica</legend>' +
        '<label class="opt"><input type="radio" name="modelo" value="Llevo mi propia modelo" checked><span><b>Llevo mi propia modelo</b></span></label>' +
        '<label class="opt"><input type="radio" name="modelo" value="Necesito que me ayuden a coordinar una modelo"><span><b>Necesito ayuda para coordinar una</b><small>Avísanos con anticipación</small></span></label></fieldset>' +
        '<label>¿Qué fechas te acomodan?<input type="text" name="fecha" placeholder="Ej: sábados de noviembre, o desde el 10/11" maxlength="120"></label>';
    } else {
      if (it.variantes) h += '<fieldset class="fs"><legend>' + esc(it.tituloVariantes || "¿Cuál prefieres?") + '</legend>' + it.variantes.map(function (v, i) { return '<label class="opt"><input type="radio" name="variante" value="' + i + '"' + (i === 0 ? " checked" : "") + '><span><b>' + esc(v.nombre) + " · " + fmt(v.precio) + "</b><small>" + esc(v.txt) + "</small></span></label>"; }).join("") + "</fieldset>";
      h += '<label>Día que prefieres<select name="dia"><option>Lo antes posible</option><option>Lunes a viernes</option><option>Sábado</option><option>Me da lo mismo</option></select></label>' +
        '<fieldset class="fs"><legend>Horario</legend>' +
        '<label class="opt"><input type="radio" name="franja" value="Mañana" checked><span><b>Mañana</b></span></label>' +
        '<label class="opt"><input type="radio" name="franja" value="Tarde"><span><b>Tarde</b></span></label></fieldset>';
    }
    h += '<label>Tu nombre *<input type="text" name="nombre" autocomplete="name" required maxlength="60"></label>' +
      '<label>Tu WhatsApp *<input type="tel" name="telefono" autocomplete="tel" inputmode="tel" placeholder="9 1234 5678" required></label>' +
      '<label>Correo (opcional)<input type="email" name="correo" autocomplete="email"></label>' +
      '<label class="chk"><input type="checkbox" name="ofertas" checked> Quiero recibir promociones de D\'Cassan Studio</label>' +
      '<input class="trap" type="text" name="web" tabindex="-1" autocomplete="off">' +
      (curso ? '<details><summary>Ver políticas de reserva</summary>' + lista(["La reserva de " + fmt(it.reserva) + " se descuenta del total; el saldo se paga el día del curso, antes de comenzar.", it.reagenda, "Si no asistes sin avisar (no show), la jornada se considera utilizada y lo pagado no se reembolsa, en la medida que permita la ley.", "Si no tienes modelo, avísanos con anticipación para ayudarte a coordinarla.", "El kit para trabajar por tu cuenta no está incluido; te orientamos para comprarlo."]) + "</details>" +
        '<label class="chk"><input type="checkbox" name="politicas" required> <span>Leí y acepto las políticas de reserva, cambios de fecha e inasistencia.</span></label>' : "") +
      '<div class="sum" id="sum"></div><p class="err" id="err" hidden></p>' +
      '<button class="btn btn--wa btn--full" type="submit">Confirmar por WhatsApp</button>' +
      '<p class="fine">Te responderemos por WhatsApp para confirmar ' + (curso ? "las fechas y enviarte los datos de pago." : "tu hora.") + "</p>" +
      '<button type="button" class="link" data-open="' + it.id + '">← Volver al detalle</button></form></div>';
    abrir(h);
    var f = $("#fReserva");
    function resumen() {
      var v = it.variantes ? it.variantes[+f.variante.value] : null;
      var s = '<div><span>' + esc(v ? v.nombre : (it.corto || it.nombre)) + "</span><span>" + fmt(v ? v.precio : it.precio) + "</span></div>";
      if (curso) {
        var r = f.pago.value === "reserva";
        s += r ? "<div><span>Pagas hoy (reserva)</span><span>" + fmt(it.reserva) + "</span></div><div><span>Saldo el día del curso</span><span>" + fmt(it.precio - it.reserva) + '</span></div><div class="tot"><span>Total del curso</span><span>' + fmt(it.precio) + "</span></div>"
          : '<div class="tot"><span>Pagas hoy</span><span>' + fmt(it.precio) + "</span></div>";
      } else if (v && v.normal) s += '<div class="tot"><span>Ahorras</span><span>' + fmt(v.normal - v.precio) + "</span></div>";
      else if (!v && it.normal) s += '<div class="tot"><span>Ahorras</span><span>' + fmt(it.normal - it.precio) + "</span></div>";
      $("#sum").innerHTML = s;
    }
    f.addEventListener("change", resumen); resumen();
    f.addEventListener("submit", function (e) { e.preventDefault(); confirmar(f, it); });
  }

  function telefono(v) {
    var d = String(v).replace(/\D/g, "");
    if (d.length === 8) d = "569" + d;
    else if (d.length === 9 && d[0] === "9") d = "56" + d;
    return /^569\d{8}$/.test(d) ? "+" + d : null;
  }

  function confirmar(f, it) {
    var err = $("#err");
    if (f.web.value) return;
    var nombre = f.nombre.value.trim(), tel = telefono(f.telefono.value);
    var msg = !nombre ? "Escribe tu nombre." : !tel ? "Revisa tu WhatsApp (ej: 9 1234 5678)." : (f.politicas && !f.politicas.checked) ? "Debes aceptar las políticas de reserva." : "";
    if (msg) { err.textContent = msg; err.hidden = false; return; }
    err.hidden = true;
    var curso = it.tipo === "curso";
    var vr = it.variantes ? it.variantes[+f.variante.value] : null;
    var nomItem = vr ? vr.nombre : it.nombre, precioItem = vr ? vr.precio : it.precio;
    var lineas = ["Hola D'Cassan Studio 👋 Quiero reservar:", "", "*" + nomItem + "* — " + fmt(precioItem)];
    var datos = { evento: "reserva", tipo: it.tipo, id: it.id, item: nomItem, total: precioItem, nombre: nombre, telefono: tel, correo: f.correo.value.trim(), ofertas: f.ofertas.checked ? "Sí" : "No" };
    if (curso) {
      var res = f.pago.value === "reserva";
      lineas.push(res ? "Pago: reserva de " + fmt(it.reserva) + " (saldo " + fmt(it.precio - it.reserva) + " el día del curso)" : "Pago: total " + fmt(it.precio));
      lineas.push("Modelo: " + f.modelo.value);
      if (f.fecha.value.trim()) lineas.push("Fechas que me acomodan: " + f.fecha.value.trim());
      Object.assign(datos, { pago: res ? "Reserva " + it.reserva : "Total", modelo: f.modelo.value, fechas: f.fecha.value.trim() });
    } else {
      lineas.push("Día: " + f.dia.value + " · " + f.franja.value);
      Object.assign(datos, { dia: f.dia.value, franja: f.franja.value });
    }
    lineas.push("", "Nombre: " + nombre, "WhatsApp: " + tel);
    if (curso) lineas.push("Leí y acepto las políticas de reserva ✅");
    enviar(datos);
    px("Lead", { content_name: nomItem, value: curso ? it.reserva : precioItem, currency: "CLP" });
    var url = waLink(lineas.join("\n"));
    try { window.open(url, "_blank"); } catch (e) {}
    abrir('<div class="m__b" style="padding-top:34px;text-align:center"><p class="script">¡Gracias, ' + esc(nombre.split(" ")[0]) + "!</p><h2>Tu solicitud está lista</h2><p class='m__g'>Se abrió WhatsApp con tu mensaje. Solo tienes que tocar <b>enviar</b> y te responderemos para confirmar.</p><a class='btn btn--wa' href='" + url + "' target='_blank' rel='noopener'>Abrir WhatsApp de nuevo</a></div>");
  }

  /* ---------- Barra fija ---------- */
  function setBar(it) {
    $("#barNombre").textContent = it.corto || it.nombre;
    $("#barPrecio").textContent = (it.desde ? "desde " : "") + fmt(it.precio);
    var b = $("#barBtn");
    b.textContent = it.tipo === "curso" ? "Reservar cupo" : "Reservar hora";
    b.className = "btn " + (it.tipo === "curso" ? "btn--dark" : "btn--gold");
    b.dataset.item = it.id; b.href = "#"; b.removeAttribute("target");
  }

  /* ---------- Delegación de clics ---------- */
  document.addEventListener("click", function (e) {
    var z = e.target.closest("[data-zoom]");
    if (z) { e.preventDefault(); var lb = $("#lightbox"); lb.querySelector("img").src = z.dataset.zoom; lb.hidden = false; return; }
    var r = e.target.closest("[data-reservar]");
    if (r) { e.preventDefault(); formulario(r.dataset.reservar); return; }
    var bb = e.target.closest("#barBtn");
    if (bb && bb.dataset.item) { e.preventDefault(); formulario(bb.dataset.item); return; }
    var o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); detalle(o.dataset.open); }
  });
  $("#lightbox").addEventListener("click", function () { this.hidden = true; });

  // Abrir directo desde un anuncio: ?ver=hydrafacial
  try { var ver = new URLSearchParams(location.search).get("ver"); if (ver && byId[ver]) detalle(ver); } catch (e) {}
})();
