// AFRAME.registerComponent("world-map-controller", {
//   init: function () {
//     const marker = document.querySelector("#target");
//     const worldMap = document.querySelector("#world-map");

//     marker.addEventListener("targetFound", () => {
//       worldMap.setAttribute("visible", true);
//       // คุณสามารถเริ่ม animation-mixer หรือ trigger อะไรก็ได้ที่นี่
//     });

//     marker.addEventListener("targetLost", () => {
//       // อาจจะไม่ทำอะไร เพื่อให้ world map ยังอยู่
//       // หรือจะใส่ logic ว่าจะซ่อนเมื่อไม่ detect แล้วก็ได้
//     });
//   }
// });

AFRAME.registerComponent('sync-start', {
  init() {
    const red  = this.el.querySelector('#red');
    const blue = this.el.querySelector('#blue');
    let ready = 0;

    const waitLoaded = el => new Promise(r => el.addEventListener('model-loaded', r, {once:true}));
    Promise.all([waitLoaded(red), waitLoaded(blue)]).then(() => { ready = 2; });

    // เริ่มเมื่อเจอ target และทั้งสองโหลดแล้ว
    this.el.addEventListener('targetFound', () => {
      if (ready < 2) return;
      // รีเซ็ตเวลาให้จุดเริ่มเท่ากัน (ทางเลือก ใช้ได้กับส่วนใหญ่)
      red.components['animation-mixer']?.mixer?.setTime(0);
      blue.components['animation-mixer']?.mixer?.setTime(0);
      // ปล่อยพร้อมกันในเฟรมเดียว
      requestAnimationFrame(() => {
        red.setAttribute('animation-mixer',  'timeScale: 1; crossFadeDuration: 0');
        blue.setAttribute('animation-mixer', 'timeScale: 1; crossFadeDuration: 0');
      });
    });

    // หยุดเมื่อหลุดเป้า (ถ้าต้องการ)
    this.el.addEventListener('targetLost', () => {
      red.setAttribute('animation-mixer',  'timeScale: 0');
      blue.setAttribute('animation-mixer', 'timeScale: 0');
    });
  }
});