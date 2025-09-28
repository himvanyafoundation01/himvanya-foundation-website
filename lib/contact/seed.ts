import { ContactPageModel } from "./contact";
import { connectToDatabase } from "../mongodb";




export async function seedContact() {
  await connectToDatabase();

  const exists = await ContactPageModel.findOne();
  if (exists) return;

  const created=await ContactPageModel.create({
    heroSection: {
      heading: "Contact Us",
      description:
        "Get in touch with us to learn more about our work, volunteer opportunities, or to discuss partnerships. We'd love to hear from you.",
    },
    contactInfo: {
      address: [
        "Vanya Foundation",
        "123 Foundation Street",
        "Connaught Place",
        "New Delhi - 110001",
        "India",
      ],
      phones: [
        "Main Office: +91 98765 43210",
        "Helpline: +91 98765 43211",
        "Emergency: +91 98765 43212",
      ],
      emails: [
        "General: info@vanyafoundation.org",
        "Donations: donate@vanyafoundation.org",
        "Volunteer: volunteer@vanyafoundation.org",
        "Media: media@vanyafoundation.org",
      ],
      officeHours: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed",
        "(Emergency support available 24/7)",
      ],
      note: "We typically respond to inquiries within 24-48 hours during business days. For urgent matters, please call our helpline directly.",
    },
  });
  return created
}
