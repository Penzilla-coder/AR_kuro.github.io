AFRAME.registerComponent('freeze-once-detected', {
  init: function () {
    const scene = this.el; // <a-scene>
    const marker = document.querySelector("#targetEntity");
    const modelOnTarget = document.querySelector("#modelOnTarget");

    // clone entity หนึ่งตัวไว้แสดงหลัง target หาย
    const cloneEntity = document.createElement("a-entity");
    cloneEntity.setAttribute("gltf-model", "#penzilla");
    cloneEntity.setAttribute("animation-mixer", "clip: Action");
    cloneEntity.setAttribute("visible", "false");
    scene.appendChild(cloneEntity);

    marker.addEventListener("targetFound", () => {
      const worldPos = new THREE.Vector3();
      const worldRot = new THREE.Euler();

      modelOnTarget.object3D.getWorldPosition(worldPos);
      modelOnTarget.object3D.getWorldRotation(worldRot);

      cloneEntity.setAttribute("position", worldPos);
      cloneEntity.setAttribute("rotation", {
        x: THREE.Math.radToDeg(worldRot.x),
        y: THREE.Math.radToDeg(worldRot.y),
        z: THREE.Math.radToDeg(worldRot.z)
      });
      cloneEntity.setAttribute("visible", "true");

      modelOnTarget.setAttribute("visible", "false");
    });

    marker.addEventListener("targetLost", () => {
      // หากต้องการซ่อนเมื่อหายไป ก็ใส่
      // cloneEntity.setAttribute("visible", "false");
    });
  }
});
