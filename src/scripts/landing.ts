// Client behaviour for the landing: demo phones, carousels, the WhatsApp/QR demo and scroll reveal.
// Every section is fully rendered in HTML; this only toggles classes, so the page works without JS.

const SCREEN_SCALE = 0.7256; // 390×844 app inside the 281×608 iPhone screen
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $$ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => [...root.querySelectorAll(sel)] as T[];

/** Restarts a CSS animation that is attached through `cls`. */
function replay(el: Element, cls = 'run') {
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}

/** Positions the simulated tap ring over an app coordinate and replays it. */
function tapAt(el: HTMLElement | null, [x, y]: number[]) {
  if (!el) return;
  el.style.left = `${x * SCREEN_SCALE - 22}px`;
  el.style.top = `${y * SCREEN_SCALE - 22}px`;
  if (!reduce) replay(el);
}

/** Marks each element before/on/after `i`, used for direction-aware transitions. */
function setOrder(els: Element[], i: number) {
  els.forEach((el, k) => {
    el.classList.toggle('is-on', k === i);
    el.classList.toggle('is-before', k < i);
    el.classList.toggle('is-after', k > i);
  });
}

/** setInterval that can be restarted after a manual jump, and never runs with reduced motion. */
function ticker(ms: number, fn: () => void) {
  let id = 0;
  const start = () => { clearInterval(id); if (!reduce) id = window.setInterval(fn, ms); };
  return { start };
}

function heroDemo(root: HTMLElement) {
  const ms = Number(root.dataset.ms);
  const taps: number[][] = JSON.parse(root.dataset.taps!);
  const layers = $$(root, '[data-layer]');
  const dots = $$<HTMLButtonElement>(root, '[data-dot]');
  const label = root.querySelector<HTMLElement>('[data-demo-label]')!;
  const tap = root.querySelector<HTMLElement>('[data-tap]');
  const notif = root.querySelector('[data-notif]')!;
  const saved = root.querySelector('[data-saved]')!;
  const savedText = root.querySelector<HTMLElement>('[data-saved-text]')!;
  let step = 0;

  const show = (i: number) => {
    step = i;
    setOrder(layers, i);
    dots.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.setAttribute('aria-pressed', String(k === i)); });
    label.textContent = dots[i].getAttribute('aria-label');
    notif.classList.toggle('is-on', i === 3);
    saved.classList.toggle('is-on', i === 0 || i === 2);
    if (i === 0 || i === 2) savedText.textContent = i === 2 ? 'Cita guardada · 11:00' : 'Hoy: 8 citas · Bs 420';
    const sheet = layers[i].querySelector('.nm-sheet');
    if (sheet && !reduce) { sheet.getAnimations().forEach((a) => { a.currentTime = 0; a.play(); }); }
    tapAt(tap, taps[i]);
  };
  const t = ticker(ms, () => show((step + 1) % layers.length));
  dots.forEach((d, i) => d.addEventListener('click', () => { show(i); t.start(); }));
  show(0);
  t.start();
}

/** Tabbed carousel with a progress bar in the active tab (Funciones). */
function carousel(root: HTMLElement) {
  const ms = Number(root.dataset.ms);
  const tabs = $$<HTMLButtonElement>(root, '[data-go]');
  const slides = $$(root, '[data-slide]');
  const deck = root.querySelector<HTMLElement>('[data-deck]')!;
  let cur = 0;

  const show = (i: number) => {
    cur = (i + slides.length) % slides.length;
    setOrder(slides, cur);
    deck.style.background = slides[cur].dataset.bg!;
    tabs.forEach((tab, k) => {
      tab.classList.toggle('is-on', k === cur);
      tab.setAttribute('aria-selected', String(k === cur));
      if (k === cur && !reduce) replay(tab.querySelector('.tab-bar')!);
    });
  };
  const t = ticker(ms, () => show(cur + 1));
  const go = (i: number) => { show(i); t.start(); };
  tabs.forEach((tab, i) => tab.addEventListener('click', () => go(i)));
  $$(root, '[data-prev]').forEach((b) => b.addEventListener('click', () => go(cur - 1)));
  $$(root, '[data-next]').forEach((b) => b.addEventListener('click', () => go(cur + 1)));
  show(0);
  t.start();
}

/** Cómo empezar: three onboarding steps on the iPhone. */
function steps(root: HTMLElement) {
  const ms = Number(root.dataset.ms);
  const taps: number[][] = JSON.parse(root.dataset.taps!);
  const buttons = $$<HTMLButtonElement>(root, '[data-go]');
  const layers = $$(root, '[data-layer]');
  const tap = root.querySelector<HTMLElement>('[data-tap]');
  const lift = root.querySelector('[data-lift]')!;
  const chip = root.querySelector('[data-chip]')!;
  let cur = 0;

  const show = (i: number) => {
    cur = i;
    setOrder(layers, i);
    buttons.forEach((b, k) => {
      b.classList.toggle('is-on', k === i);
      b.classList.toggle('is-done', k < i);
      b.setAttribute('aria-pressed', String(k === i));
      const fill = b.querySelector('.fill')!;
      fill.classList.remove('run');
      if (k === i && !reduce) replay(fill);
    });
    lift.classList.toggle('up', i === 1);
    chip.classList.toggle('is-on', i === 2);
    tapAt(tap, taps[i]);
  };
  const t = ticker(ms, () => show((cur + 1) % buttons.length));
  buttons.forEach((b, i) => b.addEventListener('click', () => { show(i); t.start(); }));
  show(0);
  t.start();
}

/** Próximamente: WhatsApp chat and QR payment share one 14-tick loop; the tab flips when it wraps. */
function coming(root: HTMLElement) {
  const tickMs = Number(root.dataset.tick);
  const loop = Number(root.dataset.loop);
  const tabs = $$<HTMLButtonElement>(root, '[data-go]');
  const slides = $$(root, '[data-slide]');
  const deck = root.querySelector<HTMLElement>('[data-deck]')!;
  const msgs = $$(root, '[data-at]');
  const typing = root.querySelector<HTMLElement>('[data-typing]')!;
  const status = root.querySelector<HTMLElement>('[data-wa-status]')!;
  const qr = root.querySelector('[data-qr]')!;
  const TYPING = [1, 4, 7, 10];
  let px = 0;
  let cs = 0;

  const showTab = (i: number) => {
    px = i;
    setOrder(slides, i);
    deck.style.background = slides[i].dataset.bg!;
    tabs.forEach((tab, k) => {
      tab.classList.toggle('is-on', k === i);
      tab.setAttribute('aria-selected', String(k === i));
      if (k === i && !reduce) replay(tab.querySelector('.tab-bar')!);
    });
  };
  const render = () => {
    msgs.forEach((m) => {
      const visible = reduce || cs >= Number(m.dataset.at);
      if (visible && m.hidden) { m.hidden = false; replay(m, 'shown'); }
      if (!visible) { m.hidden = true; m.classList.remove('shown'); }
    });
    const isTyping = !reduce && TYPING.includes(cs);
    typing.hidden = !isTyping;
    status.textContent = isTyping ? 'escribiendo…' : 'en línea';
    qr.classList.toggle('is-paid', !reduce && cs >= 8);
  };
  const t = ticker(tickMs, () => {
    cs = (cs + 1) % loop;
    if (cs === 0) showTab((px + 1) % slides.length);
    render();
  });
  tabs.forEach((tab, i) => tab.addEventListener('click', () => { cs = 0; showTab(i); render(); t.start(); }));
  // Messages are visible in the HTML (no-JS, crawlers); start the animated loop from an empty chat.
  if (!reduce) msgs.forEach((m) => { m.hidden = true; });
  showTab(0);
  render();
  t.start();
}

/** Fade-and-rise as elements enter the viewport, staggered among sibling [data-reveal] elements. */
function reveal() {
  const els = $$(document, '[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) return;
  els.forEach((el) => {
    const sibs = [...el.parentElement!.children].filter((c) => c.hasAttribute('data-reveal'));
    el.style.setProperty('--reveal-delay', `${Math.min(sibs.indexOf(el), 6) * 70}ms`);
  });
  const show = (el: Element) => el.classList.add('is-shown');
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  document.documentElement.classList.add('reveal-on');
  els.forEach((el) => io.observe(el));
  // Safety net: never leave content hidden if the observer misses something.
  setTimeout(() => els.forEach(show), 2500);
}

export function initLanding() {
  reveal();
  $$(document, '[data-demo]').forEach(heroDemo);
  $$(document, '[data-carousel]').forEach(carousel);
  $$(document, '[data-steps]').forEach(steps);
  $$(document, '[data-prox]').forEach(coming);
}
