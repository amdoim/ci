import createServer from "./server.js";
const server = createServer();
export function Core() {
  async function start() {
    console.log("[core]started");
    await server.start();
    return true;
  }

  function stop() {
    console.log("[core]done");
    //bd.stop()
  }

  return {
    start,
    stop,
  };
}

//export default createCore
