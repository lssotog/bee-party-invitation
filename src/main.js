import "./styles/animations.css";
import "./styles/base.css";
import "./style.css";

const actions = {
  notification: {
    root: '[data-scene="notification"]',
    isShowed: true,
    welcome: {
      status: false,
      root: '[data-scene="welcome"]',
      trigger: '[data-welcome="trigger"]',
      bee: '[data-welcome="bee"]',
    },
  },
  background: {
    root: "[data-scene='background']",
    isShowed: false,
  },
  one: {
    root: '[data-scene="one"]',
    almita: {
      root: '[data-one="almita"]',
      isShowed: false,
    },
  },
  two: {
    root: '[data-scene="two"]',
    isShowed: false,
  },
};

const app = document.querySelector("#app");
const audio = new Audio("/assets/abejita-chiquitita-piano.mp3");
const $ = (selector) => document?.querySelector(selector);

function formatNumber(number) {
  return Number(
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number),
  );
}

audio?.addEventListener("timeupdate", () => {
  const current = formatNumber(audio.currentTime / audio.duration);

  console.log({ current });

  if (current >= 0.01 && current <= 0.02 && actions.notification.isShowed) {
    $(actions.notification.root)?.classList.add("!hidden");
    actions.notification.isShowed = false;
  }

  if (current >= 0.021 && current <= 0.5 && !actions.one.almita.isShowed) {
    $(actions.one.root)?.classList.remove("!hidden");
    actions.one.almita.isShowed = true;

    if (!actions.background.isShowed) {
      $(actions.background.root)?.classList.add("start");
      actions.background.isShowed = true;
    }
  }

  if (current > 0.5 && actions.one.almita.isShowed && !actions.two.isShowed) {
    $(actions.one.root)?.classList.add("!hidden");
    $(actions.one.almita.root)?.classList.add("!hidden");
    $(actions.two.root)?.classList.remove("!hidden");
    actions.one.almita.isShowed = false;
    actions.two.isShowed = true;
  }
});

app.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.dataset.scene && target.closest("[data-scene]")) {
    if (target.nodeName === "BUTTON" || target.closest("button")) {
      audio
        ?.play()
        .then(() => console.log("Audio started playing"))
        .catch((error) => console.error("Error playing audio:", error));
    }
  }
});
