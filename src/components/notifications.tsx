// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Bell, Trash2 } from "lucide-react";

// interface Notification {
//   id: string;
//   user_id: string;
//   title: string;
//   body: string;
//   is_read: boolean;
//   created_at: string;
// }

// interface NotificationsProps {
//   userId: string;
// }

// export default function Notifications({ userId }: NotificationsProps) {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [open, setOpen] = useState(false);
//   const wsRef = useRef<WebSocket | null>(null);

//   const formatNotification = (notif: Notification) => ({
//     ...notif,
//     created_at: new Date(notif.created_at).toLocaleString(),
//   });

//   // Fetch initial notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await fetch(`http://127.0.0.1:8000/api/v1/${userId}`);
//         if (!res.ok) throw new Error("Failed to fetch notifications");
//         const data: Notification[] = await res.json();
//         const formatted = data.map(formatNotification);
//         setNotifications(formatted);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };
//     fetchNotifications();
//   }, [userId]);

//   // Mark notifications as read when panel opens
//   useEffect(() => {
//     if (!open) return;

//     const markAsRead = async () => {
//       try {
//         await fetch(`http://127.0.0.1:8000/api/v1/read/${userId}`, {
//           method: "PUT",
//         });
//         setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
//       } catch (err) {
//         console.error("Failed to mark notifications as read", err);
//       }
//     };

//     markAsRead();
//   }, [open, userId]);

//   // WebSocket
//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     const connect = () => {
//       const ws = new WebSocket(`ws://127.0.0.1:8000/api/v1/ws/notifications/${userId}`);
//       wsRef.current = ws;

//       ws.onopen = () => console.log("✅ WebSocket connected");

//       ws.onmessage = (event) => {
//         const message = JSON.parse(event.data);
//         const newNotification = formatNotification(message.notification || message);

//         setNotifications((prev) => {
//           if (prev.some((n) => n.id === newNotification.id)) return prev;
//           return [newNotification, ...prev];
//         });
//       };

//       ws.onclose = () => {
//         console.log("🔄 WebSocket disconnected, retrying in 3s...");
//         timeout = setTimeout(connect, 3000);
//       };

//       ws.onerror = (err) => {
//         console.error("WebSocket error:", err);
//         ws.close();
//       };
//     };
//     connect();
//     return () => {
//       if (wsRef.current) wsRef.current.close();
//       clearTimeout(timeout);
//     };
//   }, [userId]);

//   const unreadNotifications = notifications.filter((n) => !n.is_read);
//   const readNotifications = notifications.filter((n) => n.is_read);

//   const clearReadNotifications = async () => {
//     try {
//       await fetch(`http://127.0.0.1:8000/api/v1/clear/read/${userId}`, { method: "PUT" });
//       setNotifications(unreadNotifications);
//     } catch (err) {
//       console.error("Failed to clear read notifications", err);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setOpen(!open)}
//         className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
//       >
//         <Bell className="h-5 w-5 text-gray-600" />
//         {unreadNotifications.length > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//             {unreadNotifications.length}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-4 border border-gray-100 z-50">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
//             {readNotifications.length > 0 && (
//               <button
//                 onClick={clearReadNotifications}
//                 className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
//               >
//                 <Trash2 className="h-4 w-4" />
//                 Clear Read
//               </button>
//             )}
//           </div>

//           {notifications.length === 0 ? (
//             <p className="text-sm text-gray-500 text-center py-4">No notifications yet</p>
//           ) : (
//             <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
//               {unreadNotifications.map((n) => (
//                 <li key={n.id} className="py-2 px-2 rounded-md bg-blue-50 font-semibold hover:bg-blue-100">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-gray-800">{n.title}</p>
//                     <span className="text-xs text-gray-400">{n.created_at}</span>
//                   </div>
//                   <p className="text-sm text-gray-600">{n.body}</p>
//                 </li>
//               ))}
//               {readNotifications.length > 0 && (
//                 <>
//                   <li className="py-1 px-2 text-xs text-gray-400 font-medium uppercase">
//                     Read Notifications
//                   </li>
//                   {readNotifications.map((n) => (
//                     <li key={n.id} className="py-2 px-2 rounded-md hover:bg-gray-50">
//                       <div className="flex justify-between items-center">
//                         <p className="text-sm text-gray-800">{n.title}</p>
//                         <span className="text-xs text-gray-400">{n.created_at}</span>
//                       </div>
//                       <p className="text-sm text-gray-600">{n.body}</p>
//                     </li>
//                   ))}
//                 </>
//               )}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationsProps {
  userId?: string | null;
}


export default function Notifications({ userId }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const formatNotification = (notif: Notification) => ({
    ...notif,
    created_at: new Date(notif.created_at).toLocaleString(),
  });

  // Fetch unread notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/${userId}`);
        const data: Notification[] = await res.json();
        setNotifications(data.map(formatNotification));
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotifications();
  }, [userId]);

  // Mark notifications as read when panel opens
  useEffect(() => {
    if (!open) return;
    const markAsRead = async () => {
      try {
        await fetch(`http://127.0.0.1:8000/api/v1/read/${userId}`, { method: "PUT" });
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      } catch (err) {
        console.error(err);
      }
    };
    markAsRead();
  }, [open, userId]);

  // WebSocket connection
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const connect = () => {
      const ws = new WebSocket(`ws://127.0.0.1:8000/api/v1/ws/notifications/${userId}`);
      wsRef.current = ws;

      ws.onopen = () => console.log("✅ WebSocket connected");

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const newNotification = formatNotification(message.notification || message);

        setNotifications((prev) => {
          if (prev.some((n) => n.id === newNotification.id)) return prev;
          return [newNotification, ...prev];
        });
      };

      ws.onclose = () => {
        timeout = setTimeout(connect, 3000);
      };

      ws.onerror = () => ws.close();
    };

    connect();
    return () => {
      wsRef.current?.close();
      clearTimeout(timeout);
    };
  }, [userId]);

  const unread = notifications.filter((n) => !n.is_read);
  const read = notifications.filter((n) => n.is_read);

  const clearRead = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/v1/clear/read/${userId}`, { method: "PUT" });
      setNotifications(unread); // Remove read notifications
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-full hover:bg-gray-200">
        <Bell className="h-5 w-5 text-gray-600 cursor-pointer" />
        {unread.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-4 border border-gray-100 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            {read.length > 0 && (
              <button onClick={clearRead} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                <Trash2 className="h-4 w-4" />
                Clear Read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No notifications yet</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
              {unread.map((n) => (
                <li key={n.id} className="py-2 px-2 rounded-md bg-blue-50 font-semibold hover:bg-blue-100">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-800">{n.title}</p>
                    <span className="text-xs text-gray-400">{n.created_at}</span>
                  </div>
                  <p className="text-sm text-gray-600">{n.body}</p>
                </li>
              ))}
              {read.length > 0 && (
                <>
                  <li className="py-1 px-2 text-xs text-gray-400 font-medium uppercase">Read Notifications</li>
                  {read.map((n) => (
                    <li key={n.id} className="py-2 px-2 rounded-md hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-800">{n.title}</p>
                        <span className="text-xs text-gray-400">{n.created_at}</span>
                      </div>
                      <p className="text-sm text-gray-600">{n.body}</p>
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

