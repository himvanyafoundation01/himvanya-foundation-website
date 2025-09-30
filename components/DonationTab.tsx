"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
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

import { Download, Eye, Mail, MoreHorizontal } from "lucide-react";

type Donation = {
  id: string;
  donor: string;
  email: string;
  amount: number;
  type: "one-time" | "monthly";
  purpose: string;
  status: "pending" | "success" | "failed";
  date: string;
};

export default function DonationsTab({
  Badge,
  Button,
}: {
  Badge: any;
  Button: any;
}) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      const res = await fetch(`/api/donations?page=${page}&limit=${limit}`);
      const data = await res.json();
      setDonations(data.donations || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setLoading(false);
    };
    fetchDonations();
  }, [page, limit]);

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-0">
          Recent Donations
        </h3>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[700px] sm:min-w-full text-sm sm:text-base">
          <TableHeader>
            <TableRow>
              {["ID", "Donor", "Email", "Amount", "Purpose", "Date", "Status", "Actions"].map(
                (h) => (
                  <TableHead key={h} className="whitespace-nowrap">
                    {h}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-sm">
                  Loading...
                </TableCell>
              </TableRow>
            ) : donations.length > 0 ? (
              donations.map((d,idx) => (
                <TableRow key={idx} className="hover:bg-slate-50">
                  <TableCell className="font-mono text-xs sm:text-sm truncate max-w-[120px]">
                    {d.id}
                  </TableCell>
                  <TableCell className="truncate max-w-[100px]">{d.donor}</TableCell>
                  <TableCell className="truncate max-w-[150px]">{d.email}</TableCell>
                  <TableCell>₹{d.amount.toLocaleString()}</TableCell>
                  <TableCell className="truncate max-w-[120px]">{d.purpose}</TableCell>
                  <TableCell>{new Date(d.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                   {d.status}
                  </TableCell>
                  <TableCell className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-sm">
                  No donations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-slate-600">Rows per page:</span>
          <Select
            value={String(limit)}
            onValueChange={(val) => {
              setLimit(Number(val));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px] text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-xs sm:text-sm">
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
