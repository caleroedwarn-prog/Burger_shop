import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

type SocialLink = {
  name: string;
  href: string;
  icon: IconType;
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Offers", to: "/#offers" },
  { label: "Contact", to: "/#contact" },
  { label: "Cart", to: "/cart" },
] as const;

export const socials: SocialLink[] = [
  { name: "WhatsApp", href: "https://wa.me/237688029813", icon: FaWhatsapp },
  {
    name: "Facebook",
    href: "https://www.facebook.com/nick.postarel",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/caleroedwarn",
    icon: FaInstagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@caleroCode",
    icon: FaTiktok,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/buameemmanuel",
    icon: FaLinkedinIn,
  },
  { name: "X", href: "https://x.com/Calero", icon: FaXTwitter },
];

export const platforms = [
  { name: "KFC", href: "https://www.kfc.com", logo: "/logos/kfc.svg" },
  { name: "Amazon", href: "https://www.amazon.com", logo: "/logos/amazon.svg" },
  {
    name: "Alibaba",
    href: "https://www.alibaba.com",
    logo: "/logos/alibaba.svg",
  },
  { name: "eBay", href: "https://www.ebay.com", logo: "/logos/ebay.svg" },
  {
    name: "Uber Eats",
    href: "https://www.ubereats.com",
    logo: "/logos/uber-eats.svg",
  },
  { name: "Glovo", href: "https://glovoapp.com", logo: "/logos/glovo.svg" },
] as const;

export const contactDetails = {
  openingHours: "[TO FILL]",
  address: "[TO FILL]",
  email: "[TO FILL]",
  phone: "[TO FILL]",
} as const;
