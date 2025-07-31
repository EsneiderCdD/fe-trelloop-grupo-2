export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.error("❌ Cloudinary: falta configuración del nombre de cloud");
    return null;
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset");
  formData.append("folder", "tableros");

  try {
    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url || null;
  } catch (err) {
    console.error("Error subiendo imagen a Cloudinary:", err);
    return null;
  }
};
