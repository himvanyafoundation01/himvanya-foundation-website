import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Share2, Heart } from "lucide-react"
import Link from "next/link"

interface DonationSuccessProps {
  donationId: string
  amount: number
  donorName: string
  purpose: string
  date: string
}

export function DonationSuccess({ donationId, amount, donorName, purpose, date }: DonationSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="text-center">
        <CardHeader className="pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Thank You for Your Donation!</CardTitle>
          <p className="text-muted-foreground">
            Your generous contribution will make a real difference in the lives of those we serve.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Donation Details */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Donation ID:</span>
              <span className="font-mono">{donationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold text-primary">₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Donor:</span>
              <span>{donorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Purpose:</span>
              <span>{purpose}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{date}</span>
            </div>
          </div>

          {/* Impact Message */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-primary mr-2" />
              <span className="font-semibold text-primary">Your Impact</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your donation of ₹{amount.toLocaleString()} will help us continue our mission of empowering communities
              and creating lasting positive change. We'll keep you updated on how your contribution is making a
              difference.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Support
            </Button>
          </div>

          {/* Next Steps */}
          <div className="text-left space-y-3">
            <h4 className="font-semibold">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• You'll receive a tax-deductible receipt via email within 24 hours</li>
              <li>• We'll send you updates on how your donation is being used</li>
              <li>• You can track our progress through our monthly newsletters</li>
            </ul>
          </div>

          {/* Return to Site */}
          <div className="pt-4 border-t">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
