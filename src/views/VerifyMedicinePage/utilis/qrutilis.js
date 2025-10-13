import { useRef } from "react";

export const startQrCamera = async (
  setCameraId,
  scannerRef,
  setIsLoading,
  onVerified,
  onFake
) => {
  if (!window.Html5Qrcode) return;

  const devices = await window.Html5Qrcode.getCameras();
  if (devices.length) setCameraId(devices[0].id);

  const html5QrCode = new window.Html5Qrcode("qr-reader");
  scannerRef.current = html5QrCode;

  html5QrCode.start(
    devices[0].id,
    { fps: 10, qrbox: 250 },
    () => {
      setIsLoading(true);
      html5QrCode.stop().then(() => {
        setTimeout(() => {
          setIsLoading(false);
          onVerified();
        }, 800);
      });
    },
    () => {}
  );
};

export const handleFileUpload = (e, setIsLoading, onFake, onVerified) => {
  if (e.target.files && e.target.files[0] && window.Html5Qrcode) {
    setIsLoading(true);
    const html5QrCode = new window.Html5Qrcode("qr-reader-file");
    html5QrCode
      .scanFile(e.target.files[0], true)
      .then((decodedText) => {
        onVerified();
        setIsLoading(false);
      })
      .catch(() => {
        onFake();
        setIsLoading(false);
      });
  }
};

export const triggerFileInput = (fileInputRef) => {
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  }
};
