import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { ChillylemGallery } from "@/components/chillylem-gallery";

export default function GalleryPage() {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const galleryImages = existsSync(imagesDirectory)
    ? readdirSync(imagesDirectory)
        .filter((fileName) => /\.(png|jpe?g|webp)$/i.test(fileName) && fileName !== "Products_Image.png")
        .sort((left, right) => left.localeCompare(right))
        .map((fileName) => `/images/${fileName}`)
    : [];

  return <ChillylemGallery images={galleryImages} />;
}