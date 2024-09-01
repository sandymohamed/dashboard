// src/useFirebaseMessaging.ts
import { useEffect, useState } from "react";
import { messaging } from "../../firebase-config";
import { getToken } from "firebase/messaging";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import actFCMLogin from "@/store/FCM/act/actFCMLogin";

const useFirebaseMessaging = () => {
  const [fcmToken, setFcmToken] = useState<string>();
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");
          const token = await getToken(messaging, {
            vapidKey:
              "BDhKOCLoFKbYFI1kVcns-ZoHIq-TBw6FQ1CZyaLmOLdWuEg3iqv4L03Tk2Wgyf8ejSZTRocYNiJRvuHVoeV449I",
          });
          if (token) {
            setFcmToken(token);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.log("Unable to get permission to notify.");
        }
      } catch (error) {
        console.error("An error occurred while retrieving token: ", error);
      }
    };

    requestPermission();

    // Handle token refresh
    // onTokenRefresh(messaging, async () => {
    //   try {
    //     const refreshedToken = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
    //     console.log("Token refreshed:", refreshedToken);
    //     // Send the refreshed token to your server to update the stored token
    //   } catch (err) {
    //     console.error("Unable to retrieve refreshed token ", err);
    //   }
    // });

    // Optional: Handle incoming messages while the app is in the foreground
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    //   // Customize how you handle the notification here
    // });
  }, []);

  return {fcmToken};
};

export default useFirebaseMessaging;
