
import React, { useEffect, useState } from "react";

const RedirectPage = () => {
  const [inApp, setInApp] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isInApp = /LinkedIn|FBAN|FBAV|Instagram|Twitter|TikTok|Snapchat/i.test(userAgent);
    setInApp(isInApp);

    if (!isInApp) {
      window.location.href = "https://money-mate-ss62.vercel.app/"; // ✅ Replace with your actual app URL
    }
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#fffbe6" }}>
      {inApp && (
        <div style={{ background: "#fff3cd", padding: "1.5rem", borderRadius: "5px", border: "1px solid #ffeeba", color: "#856404" }}>
          ⚠️ You're using an in-app browser (like LinkedIn or Facebook).<br /><br />
          Please tap the menu (⋮ or …) and choose <strong>"Open in Chrome" or "Open in Safari"</strong> to continue securely.
        </div>
      )}
    </div>
  );
};

export default RedirectPage;
