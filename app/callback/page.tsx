"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get("code");

  useEffect(() => {
    const fetchToken = async () => {
      if (authCode) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/exchange-auth-code",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ authCode }),
            }
          );
          if (response.ok) {
            router.push("/");
          }
        } catch (error) {
          console.error("Error exchanging token:", error);
        }
      }
    };

    fetchToken();
  }, []);

  return <div>Redirecting...</div>;
}
