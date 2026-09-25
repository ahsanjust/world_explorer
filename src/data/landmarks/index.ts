/* =============================================================================
   GENERATED FILE — DO NOT EDIT BY HAND.
   =============================================================================
   Aggregate index over the per-country landmark modules.

   Source:  Wikidata Query Service (https://query.wikidata.org)
   Licence: CC0 1.0 Universal — public domain dedication. Redistribution is
            permitted and no attribution is required (recorded anyway, for
            provenance).
   Retrieved: 2026-09-25
   Regenerate: node scripts/build-me-facilities.mjs
   Includes the per-country lookup: landmark records carry no country key of
   their own, so `MIDDLE_EAST_LANDMARKS` alone cannot be filtered.
   ============================================================================= */
import { ARE_LANDMARKS } from './are';
import { BHR_LANDMARKS } from './bhr';
import { KWT_LANDMARKS } from './kwt';
import { OMN_LANDMARKS } from './omn';
import { QAT_LANDMARKS } from './qat';
import { SAU_LANDMARKS } from './sau';
import { YEM_LANDMARKS } from './yem';
import { CYP_LANDMARKS } from './cyp';
import { ISR_LANDMARKS } from './isr';
import { JOR_LANDMARKS } from './jor';
import { LBN_LANDMARKS } from './lbn';
import { PSE_LANDMARKS } from './pse';
import { SYR_LANDMARKS } from './syr';
import { IRN_LANDMARKS } from './irn';
import { IRQ_LANDMARKS } from './irq';
import { TUR_LANDMARKS } from './tur';
import { DZA_LANDMARKS } from './dza';
import { EGY_LANDMARKS } from './egy';
import { LBY_LANDMARKS } from './lby';
import { MAR_LANDMARKS } from './mar';
import { SDN_LANDMARKS } from './sdn';
import { TUN_LANDMARKS } from './tun';
import { AFG_LANDMARKS } from './afg';
import { ARM_LANDMARKS } from './arm';
import { AZE_LANDMARKS } from './aze';
import { GEO_LANDMARKS } from './geo';
import type { Landmark } from '../../types/country';

export const MIDDLE_EAST_LANDMARKS: Landmark[] = [
  ...ARE_LANDMARKS,
  ...BHR_LANDMARKS,
  ...KWT_LANDMARKS,
  ...OMN_LANDMARKS,
  ...QAT_LANDMARKS,
  ...SAU_LANDMARKS,
  ...YEM_LANDMARKS,
  ...CYP_LANDMARKS,
  ...ISR_LANDMARKS,
  ...JOR_LANDMARKS,
  ...LBN_LANDMARKS,
  ...PSE_LANDMARKS,
  ...SYR_LANDMARKS,
  ...IRN_LANDMARKS,
  ...IRQ_LANDMARKS,
  ...TUR_LANDMARKS,
  ...DZA_LANDMARKS,
  ...EGY_LANDMARKS,
  ...LBY_LANDMARKS,
  ...MAR_LANDMARKS,
  ...SDN_LANDMARKS,
  ...TUN_LANDMARKS,
  ...AFG_LANDMARKS,
  ...ARM_LANDMARKS,
  ...AZE_LANDMARKS,
  ...GEO_LANDMARKS,
];

/** Every in-scope country in the generated dataset, keyed by ISO3. */
export const LANDMARKS_BY_ISO3: Record<string, Landmark[]> = {
  ARE: ARE_LANDMARKS,
  BHR: BHR_LANDMARKS,
  KWT: KWT_LANDMARKS,
  OMN: OMN_LANDMARKS,
  QAT: QAT_LANDMARKS,
  SAU: SAU_LANDMARKS,
  YEM: YEM_LANDMARKS,
  CYP: CYP_LANDMARKS,
  ISR: ISR_LANDMARKS,
  JOR: JOR_LANDMARKS,
  LBN: LBN_LANDMARKS,
  PSE: PSE_LANDMARKS,
  SYR: SYR_LANDMARKS,
  IRN: IRN_LANDMARKS,
  IRQ: IRQ_LANDMARKS,
  TUR: TUR_LANDMARKS,
  DZA: DZA_LANDMARKS,
  EGY: EGY_LANDMARKS,
  LBY: LBY_LANDMARKS,
  MAR: MAR_LANDMARKS,
  SDN: SDN_LANDMARKS,
  TUN: TUN_LANDMARKS,
  AFG: AFG_LANDMARKS,
  ARM: ARM_LANDMARKS,
  AZE: AZE_LANDMARKS,
  GEO: GEO_LANDMARKS,
};

/** Places worth visiting in one country; `[]` when the dataset has none. */
export function getLandmarksByCountryIso3(iso3: string): Landmark[] {
  return LANDMARKS_BY_ISO3[iso3.toUpperCase()] ?? [];
}
