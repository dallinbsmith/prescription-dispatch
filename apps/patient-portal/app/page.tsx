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
            <Button className="w-full">View Prescriptions</Button>
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
            <Button variant="outline" className="w-full">
              Track Orders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Consultation</CardTitle>
            <CardDescription>
              Connect with a healthcare provider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
