/* =============================================================================
   GENERATED FILE — DO NOT EDIT BY HAND.
   =============================================================================
   Aggregate index over the per-country university modules.

   Source:  Wikidata Query Service (https://query.wikidata.org)
   Licence: CC0 1.0 Universal — public domain dedication. Redistribution is
            permitted and no attribution is required (recorded anyway, for
            provenance).
   Retrieved: 2026-09-25
   Regenerate: node scripts/build-me-facilities.mjs
   Hand-written aggregation adds the filter/query helpers on top of generated data.
   ============================================================================= */
import { ARE_UNIVERSITIES } from './are';
import { BHR_UNIVERSITIES } from './bhr';
import { KWT_UNIVERSITIES } from './kwt';
import { OMN_UNIVERSITIES } from './omn';
import { QAT_UNIVERSITIES } from './qat';
import { SAU_UNIVERSITIES } from './sau';
import { YEM_UNIVERSITIES } from './yem';
import { CYP_UNIVERSITIES } from './cyp';
import { ISR_UNIVERSITIES } from './isr';
import { JOR_UNIVERSITIES } from './jor';
import { LBN_UNIVERSITIES } from './lbn';
import { PSE_UNIVERSITIES } from './pse';
import { SYR_UNIVERSITIES } from './syr';
import { IRN_UNIVERSITIES } from './irn';
import { IRQ_UNIVERSITIES } from './irq';
import { TUR_UNIVERSITIES } from './tur';
import { DZA_UNIVERSITIES } from './dza';
import { EGY_UNIVERSITIES } from './egy';
import { LBY_UNIVERSITIES } from './lby';
import { MAR_UNIVERSITIES } from './mar';
import { SDN_UNIVERSITIES } from './sdn';
import { TUN_UNIVERSITIES } from './tun';
import { AFG_UNIVERSITIES } from './afg';
import { ARM_UNIVERSITIES } from './arm';
import { AZE_UNIVERSITIES } from './aze';
import { GEO_UNIVERSITIES } from './geo';
import type { GlobalUniversity } from '../../types/university';

export type { GlobalUniversity, UniversityFilter, UniversitySortKey } from '../../types/university';

/** Every in-scope institution, all 26 countries concatenated. */
export const MIDDLE_EAST_UNIVERSITIES: GlobalUniversity[] = [
  ...ARE_UNIVERSITIES,
  ...BHR_UNIVERSITIES,
  ...KWT_UNIVERSITIES,
  ...OMN_UNIVERSITIES,
  ...QAT_UNIVERSITIES,
  ...SAU_UNIVERSITIES,
  ...YEM_UNIVERSITIES,
  ...CYP_UNIVERSITIES,
  ...ISR_UNIVERSITIES,
  ...JOR_UNIVERSITIES,
  ...LBN_UNIVERSITIES,
  ...PSE_UNIVERSITIES,
  ...SYR_UNIVERSITIES,
  ...IRN_UNIVERSITIES,
  ...IRQ_UNIVERSITIES,
  ...TUR_UNIVERSITIES,
  ...DZA_UNIVERSITIES,
  ...EGY_UNIVERSITIES,
  ...LBY_UNIVERSITIES,
  ...MAR_UNIVERSITIES,
  ...SDN_UNIVERSITIES,
  ...TUN_UNIVERSITIES,
  ...AFG_UNIVERSITIES,
  ...ARM_UNIVERSITIES,
  ...AZE_UNIVERSITIES,
  ...GEO_UNIVERSITIES,
];

export {
  ARE_UNIVERSITIES,
  BHR_UNIVERSITIES,
  KWT_UNIVERSITIES,
  OMN_UNIVERSITIES,
  QAT_UNIVERSITIES,
  SAU_UNIVERSITIES,
  YEM_UNIVERSITIES,
  CYP_UNIVERSITIES,
  ISR_UNIVERSITIES,
  JOR_UNIVERSITIES,
  LBN_UNIVERSITIES,
  PSE_UNIVERSITIES,
  SYR_UNIVERSITIES,
  IRN_UNIVERSITIES,
  IRQ_UNIVERSITIES,
  TUR_UNIVERSITIES,
  DZA_UNIVERSITIES,
  EGY_UNIVERSITIES,
  LBY_UNIVERSITIES,
  MAR_UNIVERSITIES,
  SDN_UNIVERSITIES,
  TUN_UNIVERSITIES,
  AFG_UNIVERSITIES,
  ARM_UNIVERSITIES,
  AZE_UNIVERSITIES,
  GEO_UNIVERSITIES,
};

/** Query verified universities for a specific country by ISO3. */
export function getUniversitiesByCountryIso3(iso3: string): GlobalUniversity[] {
  const code = iso3.toUpperCase();
  return MIDDLE_EAST_UNIVERSITIES.filter((u) => u.countryIso3 === code);
}

/**
 * @deprecated Renamed to `MIDDLE_EAST_UNIVERSITIES`. This alias exists only so
 * existing imports keep compiling; "global" was never accurate for a
 * Middle-East-scoped build. Migrate call sites, then delete this.
 */
export const TOP_GLOBAL_UNIVERSITIES = MIDDLE_EAST_UNIVERSITIES;

