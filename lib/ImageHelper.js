export default class ImageHelper {
  //Obtem um Blob a partir de string Base64.
  static dataURItoBlob(dataUri) {
    const dados = dataUri.split(';base64,');
    const mime = dados[0].replace('data:', ''); // image/jpeg
    const byteString = atob(decodeURI(dados[1])); // dados binarios

    let intArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([intArray], {type: mime});
  }
  static dataURItoImage_async(dataUri) {
    const image = new Image();
    return new Promise((resolve, reject) => {
      image.onload = ()=>{
        resolve(image);
      };
      image.onerror = ()=>{
        reject("O carregamento da imagem falhou");
      };
      image.src = dataUri;
    });
  }

  //Converte Blob ou File para string Base64. Return Promise.
  static blobToDataURI_async(file_or_blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onerror = ()=>{
        fileReader.abort();
        reject(new Error('Falha na leitura do Blob ou File'));
      };
      fileReader.onload = ()=>{
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(file_or_blob);
    });
  }

  //Converte Image em Canvas.
  static imageToCanvas(image_element) {
    const canvas = document.createElement("canvas");
    canvas.width = image_element.width;
    canvas.height = image_element.height;
    canvas.getContext("2d").drawImage(image_element,0,0);
    return canvas;
  }

  //Remove resoluções desnecessárias em uma imagem com fundo transparente
  static trimTransparentBackground(canvas) {
    let ctx = canvas.getContext('2d'),
      copy = document.createElement('canvas').getContext('2d'),
      pixels = ctx.getImageData(0, 0, canvas.width, canvas.height),
      l = pixels.data.length,
      i,
      bound = {
        top: null,
        left: null,
        right: null,
        bottom: null
      },
      x, y;

    for (i = 0; i < l; i += 4) {
      if (pixels.data[i+3] !== 0) {
        x = (i / 4) % canvas.width;
        y = ~~((i / 4) / canvas.width);

        if (bound.top === null) {
          bound.top = y;
        }

        if (bound.left === null) {
          bound.left = x;
        } else if (x < bound.left) {
          bound.left = x;
        }

        if (bound.right === null) {
          bound.right = x;
        } else if (bound.right < x) {
          bound.right = x;
        }

        if (bound.bottom === null) {
          bound.bottom = y;
        } else if (bound.bottom < y) {
          bound.bottom = y;
        }
      }
    }

    let trimHeight = bound.bottom - bound.top,
      trimWidth = bound.right - bound.left,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    return copy.canvas;
  }

  //Remove a cor de fundo de um Canvas, pode ser ajustado. Return Canvas.
  static removeBackgroundColor(canvas, rgb_maxAccept = [250, 250, 250], rgba_newCollor = [0, 0, 0, 0]) {
    const ctx = canvas.getContext('2d'),
      imgd = ctx.getImageData(0,0, canvas.width, canvas.height),
      pix = imgd.data;

    for (let i = 0, n = pix.length; i < n; i += 4) {
      const r = pix[i], g = pix[i+1], b = pix[i+2];

      if(r >= rgb_maxAccept[0] && g >= rgb_maxAccept[1] && b >= rgb_maxAccept[2]){
        // Muda para a nova cor.
        pix[i] = rgba_newCollor[0];
        pix[i+1] = rgba_newCollor[1];
        pix[i+2] = rgba_newCollor[2];
        pix[i+3] = rgba_newCollor[3];
      }
    }
    ctx.putImageData(imgd, 0, 0);
    return canvas;
  }
}