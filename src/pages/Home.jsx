import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  MapPin,
  Heart,
} from "lucide-react";

const Home = () => {
  const testimonials = [
    {
      name: "Priya S.",
      role: "Working Professional",
      content:
        "Mother's Tiffin has been a lifesaver for my busy schedule. Fresh home-cooked meals delivered daily!",
      rating: 5,
    },
    {
      name: "Rohit M.",
      role: "Student",
      content:
        "Missing home food was tough until I found Mother's Tiffin. Now I get authentic meals at affordable prices.",
      rating: 5,
    },
    {
      name: "Anita K.",
      role: "Home Chef",
      content:
        "Being a part of Mother's Tiffin community has allowed me to share my recipes and earn from my cooking skills.",
      rating: 5,
    },
  ];

  const features = [
    {
      title: "Home-cooked Goodness",
      description: "Authentic recipes prepared with love by home chefs",
      icon: <Heart className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Daily Delivery",
      description: "Fresh meals delivered to your doorstep every day",
      icon: <Clock className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Local Network",
      description: "Connect with home chefs in your neighborhood",
      icon: <MapPin className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-50 to-orange-50 py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Homemade Food, <br />
              <span className="text-red-600">Delivered Daily</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connecting food lovers with home chefs for authentic, fresh meals
              that remind you of home.
            </p>

            <SignedOut>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg">
                  <SignUpButton mode="modal" />
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <SignInButton mode="modal" />
                </Button>
              </div>
            </SignedOut>

            <SignedIn>
              <Link to="/profile-setup">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </SignedIn>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/api/placeholder/500/400"
              alt="Delicious home-cooked meals"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Mother's Tiffin Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-red-500">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Chef</h3>
              <p className="text-gray-600">
                Browse profiles of local home chefs and their weekly menus
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-red-500">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Subscribe Monthly</h3>
              <p className="text-gray-600">
                Select your preferred subscription plan and payment method
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-red-500">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Fresh Meals</h3>
              <p className="text-gray-600">
                Receive freshly prepared meals delivered to your door daily
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Mother's Tiffin?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Community Says
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-gray-100 shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Enjoy Homemade Meals?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community today and discover the joy of fresh, homemade
            food delivered daily.
          </p>

          <SignedOut>
            <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium">
              <SignUpButton mode="modal">Get Started Now</SignUpButton>
            </Button>
          </SignedOut>

          <SignedIn>
            <Link to="/profile-setup">
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium">
                Complete Your Profile
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Mother's Tiffin</h3>
              <p className="text-gray-400">
                Connecting home chefs with food lovers since 2023
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">info@motherstiffin.com</p>
              <p className="text-gray-400">+91 98765 43210</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Mother's Tiffin. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
