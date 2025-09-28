import { NextResponse } from "next/server";
import { Volunteer } from "@/lib/volunteers";
import { connectToDatabase } from "@/lib/mongodb";


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    connectToDatabase()
    const { id } = params;
    try {
        const data = await req.json();
        console.log(data)
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, data, { new: true });
console.log(updatedVolunteer)
        if (!updatedVolunteer) {
            return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
        }

        return NextResponse.json(updatedVolunteer, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
