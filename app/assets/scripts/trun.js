import { truncate } from "../helpers/utils.js";

var elms = document.querySelectorAll("[trun]");

elms.forEach((i) => {
  i.innerHTML = truncate(i.innerHTML);
});
