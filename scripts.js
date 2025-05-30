const house = document.querySelector('#houseModel');
  house.addEventListener('animationcomplete', (e) => {
    if (e.detail.name === 'animation') {  // ตรวจว่า animation scale เสร็จ
      house.emit('rotateStart');          // สั่งให้เริ่มหมุน
    }
  });