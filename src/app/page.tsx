"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-emerald-600">Shivam can code!!</h1>
      <Button asChild>
        <Link href={"/login"}>Dont click me</Link>
      </Button>
    </main>
  );
}
