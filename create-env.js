const fs = require("fs");
fs.writeFileSync("./.env", `ZOMATO_API_KEY=${process.env.ZOMATO_API_KEY}\n`);
