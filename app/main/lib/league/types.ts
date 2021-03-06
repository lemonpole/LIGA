import Competitor from './competitor';


export interface Result {
  draws: number;
  gpos: number;
  losses: number;
  pos: number;
  pts: number;
  seed: number;
  wins: number;
}


export interface MatchId {
  s: number;
  r: number;
  m: number;
}


export interface Match {
  id: MatchId;
  p: [ number, number ];
  m: [ number, number ];
  data: any;
}


export interface Tournament {
  currentRound: ( section?: number ) => Match[];
  findMatch: ( matchId: object ) => Match;
  findMatches: ( idPartial: Partial<MatchId> ) => Match[];
  isDone: () => boolean;
  matches: Match[];
  matchesFor: ( seed: number ) => Match[];
  metadata: any;
  p?: number;
  results: () => Result[];
  resultsFor: ( seed: number ) => Result;
  rounds: () => Match[][];
  score: ( matchId: object, mapScore: any[] ) => boolean;
  standings?: Result[];
  state: any[];
  unscorable: ( matchId: object, mapScore: any[], allowPast?: boolean ) => string | null;
  upcoming: ( seed: number ) => Match[];
}


export interface Conference {
  id: string;
  competitors: Competitor[];
  groupObj: Tournament;
}


export interface PromotionConference {
  id: string;
  competitors: Competitor[];
  duelObj: Tournament;
}
