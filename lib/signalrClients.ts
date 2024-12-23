import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
// import axios from "axios";

// const getAccessToken_ = async () => {
//   try {
//     const response = await axios.get("/api/get-access-token", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.status == 200) {
//       const result = response.data.accessToken; // Assuming `accessToken` is returned in response
//       console.log("Access Token:", result);
//       return result;
//     }
//   } catch (error) {
//     console.error("Error retrieve access token", error);
//     return null;
//   }
// };

const CreateSignalRConnection: (hubUrl: string) => HubConnection = (hubUrl) => {
  const connection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      transport: HttpTransportType.WebSockets,
      withCredentials: true, // Required for cross-origin cookies/auth
      // accessTokenFactory: async () => {
      //   const token = await getAccessToken_();
      //   if (!token) {
      //     console.error("Failed to retrieve access token");
      //   }
      //   return token || ""; // Return empty string if no token is available
      // },
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .configureLogging(LogLevel.Information)
    .build();

  return connection;
};

export default CreateSignalRConnection;
