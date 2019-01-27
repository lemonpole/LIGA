import type { Competitor } from 'main-process/lib/league'

declare type Conference = {
  id: string,
  competitors: Array<Competitor>,
  groupObj: Object
}

declare type PromotionConference = {
  id: string,
  competitors: Array<Competitor>,
  duelObj: Object
}