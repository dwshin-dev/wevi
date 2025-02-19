importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "wevi-9131d.firebaseapp.com",
  projectId: "wevi-9131d",
  storageBucket: "wevi-9131d.firebasestorage.app",
  messagingSenderId: "857264428936",
  appId: "1:857264428936:web:caf47a27fc0fe532ca8c3d",
  measurementId: "G-456SWCDR59",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("여기");
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
    data: {
      url: payload.data?.click_action || "http://localhost:5173/notification",
    },
  });
});

self.addEventListener("notificationclick", (event) => {
  console.log("aaa");
  event.notification.close();
  event.waitUntil(clients.openWindow("http://localhost:5173/notification"));
});
