import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import axios from "axios";

const getAccessToken_ = async () => {
  try {
    const response = await axios.get("/api/get-access-token", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      const result = response.data; // Assuming `accessToken` is returned in response
      return result;
    }
  } catch (error) {
    console.error("Error retrieve access token", error);
    return null;
  }
};

const CreateSignalRConnection: (hubUrl: string) => HubConnection = (hubUrl) => {
  const connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      withCredentials: true, // Required for cross-origin cookies/auth
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: async () => {
        const token = await getAccessToken_();
        if (!token) {
          console.error("Failed to retrieve access token");
        }
        return token ?? "";
      },
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .configureLogging(LogLevel.Warning)
    .build();

  return connection;
};

export default CreateSignalRConnection;
