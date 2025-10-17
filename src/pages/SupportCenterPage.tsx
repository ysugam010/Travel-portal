import { Footer } from "@/components/custom/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function SupportCenterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      

      <main className="flex-grow container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Support Center</h1>
          <p className="text-lg text-gray-600">
            We're here to help! Reach out to us with your queries or feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" /> support@tripco.com
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" /> +44 20 7946 0000
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />30 Great Peter St, Westminster, London SW1P 2BU, United Kingdom
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-600">
                <details className="border-b pb-2">
                  <summary className="cursor-pointer font-medium text-gray-800">
                    How do I cancel my booking?
                  </summary>
                  <p className="mt-2">
                    You can cancel bookings anytime under "My Bookings" after signing in.
                  </p>
                </details>
                <details className="border-b pb-2">
                  <summary className="cursor-pointer font-medium text-gray-800">
                    Can I change my travel dates?
                  </summary>
                  <p className="mt-2">
                    Yes, date changes are possible based on airline/hotel policy.
                  </p>
                </details>
                <details>
                  <summary className="cursor-pointer font-medium text-gray-800">
                    What payment methods are supported?
                  </summary>
                  <p className="mt-2">
                    We accept all major credit/debit cards and PayPal.
                  </p>
                </details>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Name</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Message</label>
                  <Textarea placeholder="Type your message here..." rows={4} />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
