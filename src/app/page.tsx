"use client"

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const clickHandler = () => {
    console.log("I told you not to click");
  };
  return (
    <main>
      <h1 className="text-emerald-600">Shivam can code!!</h1>
      <Button onClick={clickHandler}>Dont click</Button>
    </main>
  );
}
