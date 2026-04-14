import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { ChillylemGallery } from "@/components/chillylem-gallery";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  label: string;
};

function parseChillylemIndex(fileName: string) {
  const match = /^chillylem-(\d+)\./i.exec(fileName);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function sortChillylemMedia(left: string, right: string) {
  const leftIndex = parseChillylemIndex(left);
  const rightIndex = parseChillylemIndex(right);

  if (leftIndex !== null && rightIndex !== null) {
    return leftIndex - rightIndex;
  }

  if (leftIndex !== null) return -1;
  if (rightIndex !== null) return 1;

  return left.localeCompare(right);
}

export default function GalleryPage() {
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const galleryImages: GalleryItem[] = existsSync(imagesDirectory)
    ? readdirSync(imagesDirectory)
        .filter((fileName) => /\.(png|jpe?g|webp)$/i.test(fileName) && fileName !== "Products_Image.png")
        .sort(sortChillylemMedia)
        .map((fileName) => {
          const index = parseChillylemIndex(fileName);
          return {
            type: "image" as const,
            src: `/images/${fileName}`,
            label: `Gallery Image ${index ?? fileName}`,
          };
        })
    : [];

  const videosDirectory = path.join(process.cwd(), "public", "videos");
  const galleryVideos: GalleryItem[] = existsSync(videosDirectory)
    ? readdirSync(videosDirectory)
        .filter((fileName) => /\.(mp4|webm)$/i.test(fileName))
        .sort(sortChillylemMedia)
        .map((fileName) => ({
          type: "video" as const,
          src: `/videos/${fileName}`,
          label: fileName.replace(/\.[^.]+$/, ""),
        }))
    : [];

  const galleryItems: GalleryItem[] = [...galleryImages, ...galleryVideos];

  return <ChillylemGallery items={galleryItems} />;
}