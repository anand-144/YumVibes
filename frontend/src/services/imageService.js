// utils/getFoodImage.js
export async function getFoodImage(foodName) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        foodName
      )}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) throw new Error("Unsplash fetch failed");

    const data = await response.json();
    return data.urls?.regular || null; // always fresh image
  } catch (err) {
    console.error("Unsplash image fetch failed:", err);
    // fallback placeholder
    return "https://via.placeholder.com/600x400?text=Food+Image";
  }
}
