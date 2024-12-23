export interface SessionT {
  sessionId: string;
  gameName: string;
}

export interface scoreT {
  playerConnectionId: string;
  correctCount: number;
  isReady: boolean;
  isDisconnect: boolean;
}

export const SignalRServer = {
  JoinSession: "JoinSession",
  SendAnswer: "SendAnswer",
  TogglePlayerReady: "TogglePlayerReady",
  GetAvailableSessions: "GetAvailableSessions",
  RequestScoreBoard: "RequestScoreBoard",
  RequestNewSession: "RequestNewSession",
  SupplyGameTime: "SupplyGameTime",
};
