import moment from "moment";

export const capitalize = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  // San Francisco
  return value
    .split(" ") // ['san', 'francisco']
    .map((word) => word[0].toUpperCase() + word.slice(1)) // ['San', 'Francisco']
    .join(" "); // San Francisco
};

export const formatDate = (date, dateFormat = "YYYY/MM/DD") => {
  if (!date || typeof date !== "string") {
    return "";
  }

  return moment(date).format(dateFormat);
};

export const blobToFile = (blob) => {
  return new File([blob], blob.name, { type: blob.type });
};

export const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');
  // return base64Image;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          reject("Canvas is empty");
          return;
        }
        blob.name = fileName;
        const fileUrl = window.URL.createObjectURL(blob);
        blob.url = fileUrl;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
};
