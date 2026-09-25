import {
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Sun,
  GraduationCap,
  Landmark,
  FileText,
  Layers,
} from 'lucide-react';

/**
 * Section registry for the country dossier.
 *
 * Lives in its own module (not inside `StickyNavRail.tsx`) so component files
 * only export components — keeps Vite fast-refresh working (the
 * `react/only-export-components` rule) while letting both the rail and the
 * scroll-spy in `CountryProfileView` share one source of truth. `id` must match
 * the `id` of the corresponding `<section>` in the DOM.
 */
export const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'economy', label: 'Economy & Wealth', icon: TrendingUp },
  { id: 'currency', label: 'Live Currency', icon: DollarSign },
  { id: 'demographics', label: 'Demographics', icon: Users },
  { id: 'cost-of-living', label: 'Cost of Living', icon: Layers },
  { id: 'safety', label: 'Safety & Peace', icon: Shield },
  { id: 'climate', label: 'Climate & Biome', icon: Sun },
  { id: 'education', label: 'Universities', icon: GraduationCap },
  { id: 'culture', label: 'Culture & Luxury', icon: Landmark },
] as const;
