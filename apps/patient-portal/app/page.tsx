import Link from "next/link";

import { Button } from "@rx/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rx/ui/card";

const HomePage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          Welcome to RxDispatch
        </h1>
        <p className="mt-2 text-neutral-600">
          Your personalized prescription management portal
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Prescriptions</CardTitle>
            <CardDescription>
              View and manage your active prescriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/prescriptions">
              <Button className="w-full">View Prescriptions</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>
              Track your medication orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/orders">
              <Button variant="outline" className="w-full">
                Track Orders
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>
              View and update your information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile">
              <Button variant="secondary" className="w-full">
                View Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
