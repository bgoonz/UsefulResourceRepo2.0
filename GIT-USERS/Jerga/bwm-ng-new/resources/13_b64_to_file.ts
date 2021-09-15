function b64ToFile(b64Data: string, type = "image/jpeg", name: string): File {
  let data;
  const aux = b64Data.split(",");
  if (aux.length > 1) {
    data = aux[1];
  } else {
    data = b64Data;
  }

  const byteString = atob(data);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type });
  if (!blob) {
    return null;
  }
  return new File([blob], name, { type });
}
