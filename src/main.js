import './style.css'

const app = document.querySelector("#app");
const audio = new Audio("/assets/abejita-chiquitita-piano.mp3");

app.addEventListener("click", (event) => {
  const { target } = event;
  const rootScene = document.querySelector("[data-scene='notification']");
  const sceneOne = document.querySelector("[data-scene='one']");

  if (!target.dataset.scene && target.closest("[data-scene]")) {
    if (target.nodeName === "BUTTON" || target.closest("button")) {
      rootScene.classList.add("hidden");
      sceneOne.classList.remove("!hidden");
      audio.loop = true;
      audio
        ?.play()
        .then(() => console.log("Audio started playing"))
        .catch((error) => console.error("Error playing audio:", error));
    }
  }
});
