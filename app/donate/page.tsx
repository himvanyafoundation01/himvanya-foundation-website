"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Users, GraduationCap, Stethoscope, Shield } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function DonatePage() {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [donationPurpose, setDonationPurpose] = useState<string>("general");
  const [donationAmount, setDonationAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");

  // EmailJS config
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  // Load Razorpay SDK
  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const amount = customAmount ? parseInt(customAmount) : donationAmount;
    if (!amount || amount <= 0) return alert("Enter a valid donation amount");

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) return alert("Razorpay SDK failed to load");

    // Collect donor info
    const donor = {
      firstName: (document.getElementById("firstName") as HTMLInputElement)?.value || "",
      lastName: (document.getElementById("lastName") as HTMLInputElement)?.value || "",
      email: (document.getElementById("email") as HTMLInputElement)?.value || "",
      phone: (document.getElementById("phone") as HTMLInputElement)?.value || "",
      address: (document.getElementById("address") as HTMLTextAreaElement)?.value || "",
    };

    // Create order via API
    const order = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        name: donor.firstName + " " + donor.lastName,
        email: donor.email,
        phone: donor.phone,
        address: donor.address,
        type: donationType,
        purpose: donationPurpose,
      }),
    }).then((res) => res.json());

    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: donationType === "one-time" ? order.amount : undefined,
      currency: "INR",
      name: "Vanya Foundation",
      description: donationType === "one-time" ? "One-time Donation" : "Monthly Donation",
      order_id: donationType === "one-time" ? order.id : undefined,
      subscription_id: donationType === "monthly" ? order.id : undefined,
      handler: async function (response: any) {
        const verify = await fetch("/api/razorpay", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        }).then((res) => res.json());

        if (verify.success) {
          alert("Donation successful! Thank you ❤️");

          // Send EmailJS email
          // try {
          // const emailSend=  await emailjs.send(
          //     EMAILJS_SERVICE_ID,
          //     EMAILJS_TEMPLATE_ID,
          //     {
          //       first_name: donor.firstName,
          //       last_name: donor.lastName,
          //       email: donor.email,
          //       phone: donor.phone,
          //       address: donor.address,
          //       amount: amount,
          //       purpose: donationPurpose,
          //       payment_id: response.razorpay_payment_id,
          //     },
          //     EMAILJS_PUBLIC_KEY
          //   );
          //   console.log(emailSend)
          // } catch (err) {
          //   console.error("EmailJS error:", err);
          // }
        } else {
          alert("Payment verification failed");
        }
      },
  modal: {
    escape: true,
    backdropclose: false, // prevents auto-close redirect
  },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Make a Donation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your contribution empowers communities and transforms lives across India.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Choose Your Donation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Donation Type */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Donation Type</Label>
                    <RadioGroup
                      value={donationType}
                      onValueChange={(val) => setDonationType(val as any)}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer">
                        <RadioGroupItem value="one-time" id="one-time" />
                        <Label htmlFor="one-time">One-time Donation</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly Donation</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Donation Amount */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Amount (₹)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {[500, 1000, 2500, 5000].map((amt) => (
                        <Button
                          key={amt}
                          variant={donationAmount === amt && !customAmount ? "default" : "outline"}
                          className="h-12"
                          onClick={() => {
                            setDonationAmount(amt);
                            setCustomAmount("");
                          }}
                        >
                          ₹{amt}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">₹</span>
                      <Input
                        placeholder="Custom amount"
                        className="text-lg"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setDonationAmount(Number(e.target.value) || 0);
                        }}
                      />
                    </div>
                  </div>


                  {/* Donation Purpose */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Purpose</Label>
                    <RadioGroup
                      value={donationPurpose}
                      onValueChange={setDonationPurpose}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                        <RadioGroupItem value="general" id="general" />
                        <Heart className="w-5 h-5 text-primary" />
                        <Label htmlFor="general">General Fund</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                        <RadioGroupItem value="education" id="education" />
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <Label htmlFor="education">Education Programs</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                        <RadioGroupItem value="healthcare" id="healthcare" />
                        <Stethoscope className="w-5 h-5 text-primary" />
                        <Label htmlFor="healthcare">Healthcare Initiatives</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                        <RadioGroupItem value="community" id="community" />
                        <Users className="w-5 h-5 text-primary" />
                        <Label htmlFor="community">Community Development</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Donor Info */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Donor Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="First Name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Last Name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="Email" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="Phone" />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="Address for receipt" rows={3} />
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="border-t pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to{" "}
                        <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2 mt-3">
                      <Checkbox id="receipt" defaultChecked />
                      <Label htmlFor="receipt" className="text-sm leading-relaxed">
                        Receive tax-deductible receipt
                      </Label>
                    </div>
                  </div>

                  <Button
                    className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                    onClick={handlePayment}
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Secure Donation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Processed via secure channels. Privacy ensured.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
