import adobeLogo from "@/assets/adobe-logo.png";
import gitbookLogo from "@/assets/gitbook-logo.png";
import githubLogo from "@/assets/github-logo.png";
import googleLogo from "@/assets/google-logo.png";
import instagramLogo from "@/assets/instagram-logo.png";
import landingHero from "@/assets/landing-hero.png";
import linkedinLogo from "@/assets/linkedin-logo.png";
import microsoftLogo from "@/assets/microsoft-logo.png";
import notionLogo from "@/assets/notion-logo.png";
import stashLogo from "@/assets/stash-logo.png";
import trustBadge from "@/assets/trust-badge.png";
import xLogo from "@/assets/x-logo.png";
import youtubeLogo from "@/assets/youtube-logo.png";
import { AppRoutes } from "@/constants/routes";
import {
  Archive,
  Folder,
  Menu,
  PenLine,
  Play,
  Search,
  Share2,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import "./LandingPage.css";

const partners = [
  { name: "Adobe", logo: adobeLogo },
  { name: "Notion", logo: notionLogo },
  { name: "Google", logo: googleLogo },
  { name: "Microsoft", logo: microsoftLogo },
  { name: "GitBook", logo: gitbookLogo },
  { name: "GitHub", logo: githubLogo },
];

const socialLinks = [
  { name: "X", logo: xLogo },
  { name: "Instagram", logo: instagramLogo },
  { name: "YouTube", logo: youtubeLogo },
  { name: "LinkedIn", logo: linkedinLogo },
];

const features = [
  {
    icon: Archive,
    title: "Save Anything From anywhere",
    text: "Articles, videos, PDFs, tools, threads - one place for everything you want to keep.",
    tone: "mint",
  },
  {
    icon: Search,
    title: "Find It Instantly",
    text: "Full-text search across everything you've saved. The way it should be.",
    tone: "purple",
  },
  {
    icon: Folder,
    title: "Collections",
    text: "Group resources into collections that match how you actually think about topics.",
    tone: "blue",
  },
  {
    icon: PenLine,
    title: "Annotate and Note",
    text: "Attach notes and reminders to any resource so future-you has the context.",
    tone: "rose",
  },
  {
    icon: Share2,
    title: "Share Instantly",
    text: "Share a collection with teammates, friends, or the world with one link.",
    tone: "gray",
  },
  {
    icon: Zap,
    title: "Instant Capture",
    text: "Browser extension plus mobile share sheet. Saving takes two seconds, not two minutes.",
    tone: "gold",
  },
];

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <Link to="/" className="landing-logo" aria-label="Stash home">
          <img src={stashLogo} alt="STASH" />
        </Link>

        <button
          type="button"
          className="landing-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className={`landing-nav__links ${menuOpen ? "is-open" : ""}`}>
          <a href="#product">Product</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About us</a>
        </div>

        <div className="landing-nav__actions">
          <Link
            to={AppRoutes.login}
            className="landing-button landing-button--ghost"
          >
            Login
          </Link>
          <Link
            to={AppRoutes.signup}
            className="landing-button landing-button--solid"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="landing-hero" id="product">
        <div className="landing-hero__copy">
          <h1 className="text-4xl md:text-6xl!">
            Your Ideas Deserve a Better Home
          </h1>
          <p>
            Save articles, videos, tools, and links from anywhere. Organise,
            annotate, and actually find them again. Stop losing the things you
            care about to browser tab chaos.
          </p>

          <div className="landing-hero__actions">
            <Link
              to={AppRoutes.signup}
              className="landing-button landing-button--solid"
            >
              <Archive size={14} />
              Start Stashing
            </Link>
            <a
              href="#how-it-works"
              className="landing-button landing-button--ghost"
            >
              <Play size={14} />
              See how it works
            </a>
          </div>

          <div className="landing-trust">
            <img
              src={trustBadge}
              alt="Trusted by 2,000+ students and professionals"
            />
          </div>
        </div>

        <div
          className="landing-hero__visual"
          aria-label="Digital resource library preview"
        >
          <img src={landingHero} alt="Digital resource library workspace" />
        </div>
      </section>

      <section className="landing-partners" id="about">
        <p>The institution we partner with for decades</p>
        <div>
          {partners.map((partner) => (
            <span className="landing-partner-logo" key={partner.name}>
              <img src={partner.logo} alt={partner.name} />
            </span>
          ))}
        </div>
      </section>

      <section className="landing-features" id="features">
        <header>
          <h2>Everything your scattered bookmarks aren't</h2>
          <p>
            Built around the real workflow of saving, finding, and acting on
            information.
          </p>
        </header>

        <div className="landing-feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="landing-feature-card" key={feature.title}>
                <span
                  className={`landing-feature-card__icon tone-${feature.tone}`}
                >
                  <Icon size={18} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="landing-cta" id="how-it-works">
        <h2>Save Now and Find Forever</h2>
        <p>
          Join 150,000 people who actually rediscover their saved resources.
        </p>
        <Link
          to={AppRoutes.signup}
          className="landing-button landing-button--solid"
        >
          <Archive size={14} />
          Create Your Library now
        </Link>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer__brand">
          <Link to="/" className="landing-logo" aria-label="Stash home">
            <img src={stashLogo} alt="STASH" />
          </Link>
          <p>
            A go to platform that keeps all your important resources safe and
            easy to access.
          </p>
          <div className="landing-footer__socials">
            {socialLinks.map((social) => (
              <a href="#about" aria-label={social.name} key={social.name}>
                <img src={social.logo} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="landing-footer__links">
          <div>
            <h3>Product</h3>
            <a href="#features">Features</a>
            <a href="#product">Pricing</a>
            <a href="#product">Tag</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#about">About Us</a>
            <a href="#about">Blog</a>
            <a href="#about">Career</a>
          </div>
          <div>
            <h3>Support</h3>
            <a href="#about">Support Center</a>
            <a href="#about">Chat AI</a>
            <a href="#about">Terms of Service</a>
          </div>
        </div>

        <p className="landing-footer__copyright">
          © 2026 Stash. All rights reserved
        </p>
      </footer>
    </main>
  );
}

export default LandingPage;
