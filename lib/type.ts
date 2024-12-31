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

export const ServerMethods = {
  RequestNewSession: "RequestNewSession",
  RequestAvailableGameContexts: "RequestAvailableGameContexts",
  LeftSession: "LeftSession",
  RequestAvailableSessions: "GetAvailableSessions",
  RequestScoreBoard: "RequestScoreBoard",
  JoinSession: "JoinSession",
  SupplyGameTime: "SupplyGameTime",
  TogglePlayerReady: "TogglePlayerReady",
};

export const ClientMethods = {
  SupplyQuestion: "SupplyQuestion",
  SupplyScoreBoard: "SupplyScoreBoard",
  NotifyEvent: "NotifyEvent",
  SupplyGameRule: "SupplyGameRule",
  SupplyInitQuestion: "SupplyInitQuestion", // initial question
  SupplyAvailableSessions: "SupplyAvailableSessions",
  SupplySession: "SupplySession",
  NotifyError: "NotifyError",
  SupplySessionInfo: "SupplySessionInfo",
  NotifyGameEnd: "NotifyGameEnd",
  SupplyGameContexts: "SupplyGameContexts",
  NotifyReadyStatesChange: "NotifyReadyStatesChange",
  SupplyGameTime: "SupplyGameTime",
  SupplyConnectionId: "SupplyConnectionId",
  NotifyRejection: "NotifyRejection",
  SetNewHost: "SetNewHost",
};
