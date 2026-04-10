import { existsSync } from "node:fs";
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
  const productSpecificationPath = resolvePublicAsset(path.join("documents", "Product Specification.docx"));

  return (
    <SupplyExperience
      logoPath={logoPath}
      productImagePath={productImagePath}
      investmentDocumentPath={investmentDocumentPath}
      productSpecificationPath={productSpecificationPath}
    />
  );
}