import { Core } from "./core.js";

const core = Core();

core
  .start()
  .then(() => console.log("[index] cold started"))
  .catch((error) => {
    console.log("[index] an error occurred");
    console.log("[index]", error);
  });
