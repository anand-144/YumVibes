// utils/getFoodImage.js
export async function getFoodImage(foodName) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(foodName)}&per_page=1`,
      {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) throw new Error("Pexels fetch failed");

    const data = await response.json();
    const imageUrl = data.photos?.[0]?.src?.medium || null;

    // fallback if no image found
    return imageUrl || "https://via.placeholder.com/600x400?text=Food+Image";
  } catch (err) {
    console.error("Pexels image fetch failed:", err);
    return "https://via.placeholder.com/600x400?text=Food+Image";
  }
}
