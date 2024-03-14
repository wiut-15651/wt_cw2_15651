function toggleVisibility(listId, btnId) {
  var list = document.getElementById(listId);
  var btn = document.getElementById(btnId);
  if (list.style.display === "none") {
    list.style.display = "block";
    btn.innerHTML = "Hide";
  } else {
    list.style.display = "none";
    btn.innerHTML = "Show";
  }
}
