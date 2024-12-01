function rnd_bound(e) {
  let id = e.getAttribute("name");
  let el = document.getElementById(id);
  let rnd_val = Math.ceil(Math.random() * el.max);
  rnd_val = el.value == rnd_val ? rnd_bound(e) : rnd_val;
  el.value = el.min > rnd_val ? el.min : rnd_val;
  return rnd_val;
}