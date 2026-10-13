"use client";

export function OpenSettings({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  function handleClick() {
    const os = getUserOS();

    if (os === "Windows") {
      window.location.href = "ms-settings:";
    } else if (os === "macOS") {
      window.location.href = "x-apple.systempreferences:";
    } else if (os === "Linux") {
      alert("Please open your system settings manually.");
    } else {
      alert("Unable to determine your operating system.");
    }
  }

  return (
    <button
      className={
        "flex items-center justify-center p-2 rounded-md hover:bg-white/20"
      }
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

function getUserOS(): string {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("windows")) return "Windows";
  if (userAgent.includes("mac os") || userAgent.includes("macintosh")) {
    return "macOS";
  }
  if (userAgent.includes("linux") && !userAgent.includes("android")) {
    return "Linux";
  }

  return "Unknown";
}
