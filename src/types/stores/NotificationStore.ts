export type NotificationType = {
  type: "success" | "error";
  message: string;
};

export type StoreProperties = {
  notification: NotificationType | undefined;
};

export type StorePublicInterface = {
  setNotification: (notification: NotificationType) => void;
  setSuccessNotification: (message: string) => void;
  setErrorNotification: (message: string) => void;
  clearNotifications: () => void;
};

export type NotificationStoreType = StoreProperties & StorePublicInterface;
