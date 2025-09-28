"use client";

import { Award, ChefHat, Eye, LucideProps, Target } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Users,
  GraduationCap,
  Heart,
  Stethoscope,
  ArrowRight,
  CheckCircle,
  Save,
  X,
} from "lucide-react";

type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

const icons: Record<string, IconType> = {
  chef: ChefHat,
  users: Users,
  graduationcap: GraduationCap,
  heart: Heart,
  stethoscope: Stethoscope,
  arrowright: ArrowRight,
  checkcircle: CheckCircle,
  save: Save,
  x: X,
  target: Target,
  eye: Eye,
  award: Award,
};

export default function IconsMap({
  icon,
  ...props
}: { icon: string } & LucideProps) {
  const normalized = icon.replace(/([A-Z])/g, (m) => m.toLowerCase());

  const IconComponent = icons[normalized];

  if (!IconComponent) {
    console.warn(
      `⚠️ No icon found for key: "${icon}" (normalized: "${normalized}")`
    );
    return null;
  }

  return <IconComponent {...props} />;
}

// List of available icons
export const availableIcons = Object.keys(icons);
