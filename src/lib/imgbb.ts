export type ImgbbResponse = {
  data: {
    url: string;
    display_url: string;
    delete_url: string;
  };
  success: boolean;
  status: number;
};

export async function uploadToImgbb(file: File) {
  if (!process.env.IMGBB_API_KEY) {
    throw new Error("IMGBB_API_KEY mangler i environment variables.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Kunne ikke uploade billedet til imgbb.");
  }

  return (await response.json()) as ImgbbResponse;
}
