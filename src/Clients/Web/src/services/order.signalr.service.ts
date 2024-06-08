import * as signalR from "@microsoft/signalr";

const signalrPath = "http://localhost:5002/"

// export default class SignalRService {

//   start(hubUrl: string) {
//     const hubPath = signalrPath + hubUrl;
//     console.log(hubPath)
//     const builder: signalR.HubConnectionBuilder = new signalR.HubConnectionBuilder();

//     const hubConnection: signalR.HubConnection = builder.
//       withUrl(hubPath,{
//         skipNegotiation: false,
//         transport: signalR.HttpTransportType.WebSockets| 
//                    signalR.HttpTransportType.LongPolling |
//                    signalR.HttpTransportType.ServerSentEvents
//       }).
//       withAutomaticReconnect().
//       build();

//     hubConnection.start().then()
//       .catch((error) => setTimeout(() => this.start(signalrPath + hubUrl), 5000));

//     hubConnection.onreconnected((connectionId) => console.log('Reconnected'));
//     hubConnection.onreconnecting((error) => console.log('Reconnecting'));
//     hubConnection.onclose((error) => console.log('Close reconnection'));
//     return hubConnection;
//   }

//   invoke(
//     hubUrl: string,
//     procedureName: string,
//     message: any,
//     successCallBack?: (value: any) => void,
//     errorCallBack?: (error: any) => void
//   ) {
//     this.start(hubUrl)
//       .invoke(procedureName, message)
//       .then(successCallBack)
//       .catch(errorCallBack);
//   }

//   on(
//     hubUrl: string,
//     procedureName: string,
//     callBack: (...message: any) => void
//   ) {
//     this.start(hubUrl).on(procedureName, callBack);
//   }

//   stop = (hubConnection: signalR.HubConnection) => {
//     hubConnection.stop();
//   };
// }

export const HubUrls = {
  OrderHub: "orders-hub",
};

export const ReceiveFunctions = {
  OrderPaymentFailedMessage: "receiveOrderPaymentFailedMessage",
  OrderPaymentSuccededMessage: "receiveOrderPaymentSuccededMessage",
};


import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import StorageService from "./storage.service";

export default class OrderSignalRService {
  public connection: HubConnection;
  public handleOrderPaymentFailed: any;
  public handleOrderPaymentSucceeded: any;
  constructor(handleOrderPaymentFailed:any, handleOrderPaymentSucceeded:any) {
    this.handleOrderPaymentFailed = handleOrderPaymentFailed;
    this.handleOrderPaymentSucceeded = handleOrderPaymentSucceeded;


    this.connection = new HubConnectionBuilder()
      .withUrl(signalrPath + HubUrls.OrderHub, {
        skipNegotiation: false,
        headers: {
          Authorization: `Bearer ${StorageService.getAccessToken()}`,
        },
        accessTokenFactory() {
          return StorageService.getAccessToken() || "";
        },

        transport: signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.LongPolling |
          signalR.HttpTransportType.ServerSentEvents
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.startConnection();
  }

  private async startConnection() {
    try {
      await this.connection.start();
      console.log('SignalR Connected.');
      console.log(this.connection.connectionId)
      this.setupListeners();
    } catch (err) {
      console.log(this.connection.state)
      console.log('Error while establishing connection: ', err);
      setTimeout(() => this.startConnection(), 5000); // Retry connection after 5 seconds
    }
  }

  private setupListeners() {
    console.log(this.connection.connectionId)

    this.connection.on(ReceiveFunctions.OrderPaymentFailedMessage, () => {
      this.handleOrderPaymentFailed();
    });

    this.connection.on(ReceiveFunctions.OrderPaymentSuccededMessage, () => {
      this.handleOrderPaymentSucceeded();
    });
  }
}


