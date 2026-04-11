import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { SupplyExperience } from "@/components/supply-experience";

function resolvePublicAsset(relativePath: string) {
  const absolutePath = path.join(process.cwd(), "public", relativePath);
  return existsSync(absolutePath) ? `/${relativePath.replaceAll("\\", "/")}` : null;
}

export default function HomePage() {
  const logoPath = resolvePublicAsset(path.join("logos", "LEM-Supply-Enterprise_Logo.png"));
  const productImagePath = resolvePublicAsset(path.join("images", "Products_Image.png"));
  const investmentDocumentPath = resolvePublicAsset(path.join("documents", "Investment Statement_LEM Chilli.docx"));
  const imagesDirectory = path.join(process.cwd(), "public", "images");
  const galleryImages = existsSync(imagesDirectory)
    ? readdirSync(imagesDirectory)
        .filter((fileName) => /\.(png|jpe?g|webp)$/i.test(fileName) && fileName !== "Products_Image.png")
        .sort((left, right) => left.localeCompare(right))
        .map((fileName) => `/images/${fileName}`)
    : [];
  const galleryHref = galleryImages[0] ?? productImagePath;

  return (
    <SupplyExperience
      logoPath={logoPath}
      productImagePath={productImagePath}
      investmentDocumentPath={investmentDocumentPath}
      galleryImages={galleryImages}
      galleryHref={galleryHref}
    />
  );
}