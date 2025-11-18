export type MatchPayload = {
  partnerId: string;
  partnerHash: string;
  initiator: boolean;
};

export type SignalPayload = {
  from: string;
  description?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
};

export type TextMessage = {
  id: string;
  author: "you" | "stranger";
  body: string;
  timestamp: number;
};
