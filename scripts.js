document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const house = document.querySelector("#houseModel");
  

  scene.addEventListener("mindar-image-targetFound", (e) => {
    if (e.detail.index === 0) {
      house.setAttribute("visible", "true");
      house.setAttribute("scale", "0 0 0");
      alert('เข้าอีเว้นมัั้ย');

      house.setAttribute(
        "animation__scaleup",
        "property: scale; to: 0.5 0.5 0.5; dur: 1000; easing: easeOutElastic"
      );
    }
  });

  scene.addEventListener("mindar-image-targetLost", (e) => {
    if (e.detail.index === 0) {
      house.setAttribute("visible", "false");
      house.removeAttribute("animation__scaleup");
      house.setAttribute("scale", "0 0 0");
      house.removeAttribute("animation__rotate");
    }
  });

  house.addEventListener("animationcomplete", (e) => {
    if (e.detail.name === "animation__scaleup") {
      house.setAttribute(
        "animation__rotate",
        "property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear"
      );
    }
  });
});
