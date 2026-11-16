/**
 * Client-side image compression utility.
 * Resizes large photos to a max dimension of 800px and compresses to JPEG (quality 0.75).
 * Converts a 3-8 MB raw camera upload into an ~40-70 KB data URL, preventing localStorage QuotaExceededError.
 */
export async function compressImageFile(file: File, maxDimension = 800, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    // Basic file type check
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Yalnızca görsel dosyaları yüklenebilir.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Dosya okunamadı.'));
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return reject(new Error('Görsel verisi boş.'));

      const img = new Image();
      const timeout = setTimeout(() => reject(new Error('Görsel yükleme zaman aşımı.')), 8000);

      img.onload = () => {
        clearTimeout(timeout);
        try {
          let { width, height } = img;

          // Scale down if dimensions exceed maxDimension
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve(dataUrl); // Fallback to raw if canvas context is unavailable
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Export compressed JPEG
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          // If canvas export fails, fall back to original data URL
          resolve(dataUrl);
        }
      };

      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Görsel decode edilemedi.'));
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
}
