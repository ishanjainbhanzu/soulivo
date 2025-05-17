import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center mb-6">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">404 Page Not Found</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button className="gradient-bg" asChild>
              <Link href="/">Go Back Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
