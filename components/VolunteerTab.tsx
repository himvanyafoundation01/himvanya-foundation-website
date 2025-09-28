"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Volunteer = {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age?: number;
  occupation?: string;
  address?: string;
  areasOfInterest?: string[];
  availability?: string;
  timeCommitment?: string;
  skills?: string;
  experience?: string;
  motivation?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };
  termsAccepted?: boolean;
  backgroundCheckConsent?: boolean;
  updatesSubscribed?: boolean;
  status: "Pending" | "Active" | "Rejected";
  createdAt: string;
  updatedAt: string;
};

export default function VolunteersDashboard() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // fetch volunteers
  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      const res = await fetch(`/api/volunteer?page=${page}&limit=${limit}`);
      const data = await res.json();
      setVolunteers(data.volunteers);
      setTotalPages(data.pagination.totalPages);
      setLoading(false);
    };
    fetchVolunteers();
  }, [page, limit]);

  // update status
  const handleStatusChange = async (
    id: string,
    status: Volunteer["status"]
  ) => {
    await fetch(`/api/volunteer/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setVolunteers((prev) =>
      prev.map((v) => (v._id === id ? { ...v, status } : v))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Volunteer Applications</h2>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableCaption>Volunteer applications (paginated)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Areas of Interest</TableHead>
              <TableHead>Date Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : volunteers.length > 0 ? (
              volunteers.map((v) => (
                <TableRow key={v._id}>
                  <TableCell className="font-mono text-xs">{v._id}</TableCell>
                  <TableCell>
                    {v.firstName} {v.lastName}
                  </TableCell>
                  <TableCell>{v.email}</TableCell>
                  <TableCell>{v.phone}</TableCell>
                  <TableCell>
                    <Select
                      value={v.status}
                      onValueChange={(status) =>
                        handleStatusChange(v._id, status as Volunteer["status"])
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{v.areasOfInterest?.join(", ") || "-"}</TableCell>
                  <TableCell>
                    {new Date(v.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No volunteers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select
            value={String(limit)}
            onValueChange={(val) => {
              setLimit(Number(val));
              setPage(1); // reset to first page
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
