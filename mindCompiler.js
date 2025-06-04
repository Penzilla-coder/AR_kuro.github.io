

const dropzone = document.getElementById('dropzone');
const preview = document.getElementById('preview');
const btnConvert = document.getElementById('btnConvert');

let imageFiles = [];

dropzone.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png, image/jpeg';
  input.multiple = true;
  input.onchange = (e) => {
    handleFiles(e.target.files);
  };
  input.click();
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('hover');
});

dropzone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropzone.classList.remove('hover');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('hover');
  if (e.dataTransfer.files.length > 0) {
    handleFiles(e.dataTransfer.files);
  }
});

function handleFiles(files) {
  imageFiles = [];
  preview.innerHTML = '';
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;
    imageFiles.push(file);
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  }
  btnConvert.disabled = imageFiles.length === 0;
}

btnConvert.addEventListener('click', () => {
  if (imageFiles.length === 0) return alert('No images to convert!');
  Promise.all(imageFiles.map(fileToBase64))
    .then(imagesBase64 => {
      const mindData = createMindJSON(imagesBase64);
      downloadMindFile(mindData);
    });
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function createMindJSON(imagesBase64) {
  // สร้างโครงสร้าง mind ตามตัวอย่าง MindAR image target (basic)
  const targets = imagesBase64.map((base64, i) => ({
    name: `target${i+1}`,
    src: `data:image/png;base64,${base64}`
  }));

  return {
    version: "1.0.0",
    type: "ImageTargetCollection",
    targets: targets
  };
}

function downloadMindFile(mindData) {
  const blob = new Blob([JSON.stringify(mindData, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'targets.mind';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

