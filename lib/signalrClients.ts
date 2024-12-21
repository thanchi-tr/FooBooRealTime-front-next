import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

const CreateSignalRConnection: (hubUrl: string) => HubConnection = (hubUrl) => {
  const connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      transport: HttpTransportType.WebSockets,
      withCredentials: true, // Required for cross-origin cookies/auth
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .configureLogging(LogLevel.Information)
    .build();

  return connection;
};

export default CreateSignalRConnection;
