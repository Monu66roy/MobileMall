import {
  BadgeCheck, BatteryCharging, Headphones, PlugZap, RefreshCw, ShieldCheck, Smartphone, Truck, Watch, Wrench,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  smartphone: Smartphone, watch: Watch, headphones: Headphones, plug: PlugZap, battery: BatteryCharging,
  shield: ShieldCheck, refresh: RefreshCw, badge: BadgeCheck, wrench: Wrench, truck: Truck,
};

export function Icon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const Cmp = MAP[name] ?? Smartphone;
  return <Cmp size={size} className={className} aria-hidden />;
}
