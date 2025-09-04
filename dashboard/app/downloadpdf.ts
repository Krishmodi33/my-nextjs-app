import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

export async function downloadPDF(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const base64Data = await blobToBase64(blob);

  const fileName = 'myfile.pdf';

  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Documents,
  });

  // Open/share the PDF
  await Share.share({
    url: Capacitor.convertFileSrc(savedFile.uri),
    title: 'Open PDF',
  });
}

// helper
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(blob);
  });
}
