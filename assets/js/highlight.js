const dim_el = document.querySelectorAll(".highlight_map");
dim_el.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    dim_el.forEach((item) => item.classList.add("bordered"));
  });
  el.addEventListener("mouseout", () => {
    dim_el.forEach((item) => item.classList.remove("bordered"));
  });
});
const dens_el = document.querySelectorAll(".highlight_wall");
dens_el.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    dens_el.forEach((item) => item.classList.add("bordered"));
  });
  el.addEventListener("mouseout", () => {
    dens_el.forEach((item) => item.classList.remove("bordered"));
  });
});
