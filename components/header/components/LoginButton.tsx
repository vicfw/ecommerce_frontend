import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LoginButton = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Link href="/register" className="block md:hidden">
      <Button className="h-9 reg12">ورود</Button>
    </Link>
  );
};

export default LoginButton;
