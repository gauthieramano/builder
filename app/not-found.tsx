import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-200">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl lg:text-7xl">404</CardTitle>
          <CardDescription>
            The page you’re looking for doesn’t exist.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
