AFRAME.registerComponent("world-map-controller", {
  init: function () {
    const marker = document.querySelector("#target");
    const worldMap = document.querySelector("#world-map");

    marker.addEventListener("targetFound", () => {
      worldMap.setAttribute("visible", true);
      // คุณสามารถเริ่ม animation-mixer หรือ trigger อะไรก็ได้ที่นี่
    });

    marker.addEventListener("targetLost", () => {
      // อาจจะไม่ทำอะไร เพื่อให้ world map ยังอยู่
      // หรือจะใส่ logic ว่าจะซ่อนเมื่อไม่ detect แล้วก็ได้
    });
  }
});
