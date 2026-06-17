const fs = require("fs");
let d = fs.readFileSync(
  "C:/Users/X1 Carbon/AppData/Local/Temp/dom.html",
  "utf8",
);
// remove all <script>...</script> (the flight payload) then strip tags
d = d.replace(/<script[\s\S]*?<\/script>/g, " ");
d = d.replace(/<[^>]+>/g, " ");
d = d
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#x27;/g, "'");
d = d.replace(/[ \t]+/g, " ").replace(/\n{2,}/g, "\n");
