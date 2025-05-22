import {
  Facebook,
  Instagram,
  Twitter,
  Chrome,
  Zap,
  Layers,
  ShoppingCart,
  Cloud,
  CreditCard,
  Github,
  Slack,
  Figma,
  Dribbble,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const icons = [
  Twitter,
  Facebook,
  Instagram,
  Chrome,
  Zap,
  Layers,
  ShoppingCart,
  CreditCard,
  Cloud,
  Github,
  Slack,
  Figma,
  Dribbble,
];

const IconCard = ({ Icon }: { Icon: React.ElementType }) => {
  return (
    <div
      className={cn(
        "h-14 w-14 shrink-0 flex items-center justify-center",
        "  text-white"
      )}
    >
      <Icon className="w-5 h-5" />
    </div>
  );
};

export default function SingleLineMarquee() {
  return (
    <div className="w-full bg-[#0B0D11] py-8 overflow-hidden relative">
      <Marquee pauseOnHover className="[--duration:30s]">
        {[...icons, ...icons].map((Icon, i) => (
          <IconCard key={`single-${i}`} Icon={Icon} />
        ))}
      </Marquee>

      {/* Optional fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-[#0B0D11]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-[#0B0D11]" />
    </div>
  );
}
