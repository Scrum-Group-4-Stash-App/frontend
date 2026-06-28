import "./BrandLogo.css";

import logo from "../../assets/images/stash-logo.png";

interface BrandLogoProps {
  showSubtitle?: boolean;
}

export default function BrandLogo({
  showSubtitle = true,
}: BrandLogoProps) {
  return (
    <div className="brand-logo">
      <img
        src={logo}
        alt="STASH Logo"
        className="brand-logo-image"
      />

      {showSubtitle && (
        <p className="brand-subtitle">
          Your resource Library
        </p>
      )}
    </div>
  );
}