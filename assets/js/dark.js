function dark() {
  let elmt = document.documentElement;
  if (elmt.classList.contains("dark")) {
    elmt.classList.remove("dark");
    let btn = document.getElementById("dark_btn");
    btn.classList.remove("hide");
    btn = document.getElementById("light_btn");
    btn.classList.add("hide");
  } else {
    elmt.classList.add("dark");
    let btn = document.getElementById("light_btn");
    btn.classList.remove("hide");
    btn = document.getElementById("dark_btn");
    btn.classList.add("hide");
  }
}
