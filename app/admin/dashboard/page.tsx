"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Heart,
  DollarSign,
  UserCheck,
  Settings,
  LogOut,
  Edit,
} from "lucide-react";
import { useSession } from "@/components/context/SessionContext";
import { useRouter } from "next/navigation";
import VolunteersTab from "@/components/VolunteerTab";
import DonationsTab from "@/components/DonationTab";
import Image from "next/image";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, logout, loading } = useSession();
  const router = useRouter();

  const [donations, setDonations] = useState<any[]>([]);
  const [donationPagination, setDonationPagination] = useState<any>({});
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [volunteerPagination, setVolunteerPagination] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [messagePagination, setMessagePagination] = useState<any>({});
  const [activeTab, setActiveTab] = useState("donations");
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [donationPage, setDonationPage] = useState(1);
  const [volunteerPage, setVolunteerPage] = useState(1);
  const [messagePage, setMessagePage] = useState(1);

  const [donationSearch, setDonationSearch] = useState("");
  const [volunteerSearch, setVolunteerSearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");

  const limit = 5;

  useEffect(() => {
    if (!loading) {
      if (user?.id) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        router.push("/admin");
      }
    }
  }, [user, loading]);

  const fetchData = async () => {
    fetchDonations(donationPage, donationSearch);
    fetchVolunteers(volunteerPage, volunteerSearch);
    fetchMessages(messagePage, messageSearch);
  };

  const fetchDonations = async (page: number, search: string = "") => {
    setLoadingDonations(true);
    try {
      const res = await fetch(
        `/api/donations?page=${page}&limit=${limit}&search=${search}`
      );
      const data = await res.json();
      setDonations(data.donations || []);
      setDonationPagination(data.pagination || {});
    } catch (err) {
      console.error(err);
    }
    setLoadingDonations(false);
  };

  const fetchVolunteers = async (page: number, search: string = "") => {
    setLoadingVolunteers(true);
    try {
      const res = await fetch(
        `/api/volunteer?page=${page}&limit=${limit}&search=${search}`
      );
      const data = await res.json();
      setVolunteers(data.volunteers || []);
      setVolunteerPagination(data.pagination || {});
    } catch (err) {
      console.error(err);
    }
    setLoadingVolunteers(false);
  };

  const fetchMessages = async (page: number, search: string = "") => {
    setLoadingMessages(true);
    try {
      const res = await fetch(
        `/api/contact/submission?page=${page}&limit=${limit}&search=${search}`
      );
      const data = await res.json();
      setMessages(data.submissions || []);
      setMessagePagination(data.pagination || {});
    } catch (err) {
      console.error(err);
    }
    setLoadingMessages(false);
  };

  const handleLogout = () => logout();

  const updateVolunteerStatus = async (id: string, status: string) => {
    setLoadingVolunteers(true);
    try {
      const res = await fetch(`/api/volunteer/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setVolunteers((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status } : v))
        );
      } else {
        console.error("Failed to update volunteer status");
      }
    } catch (err) {
      console.error(err);
    }
    setLoadingVolunteers(false);
  };

  const totalDonations = donations?.reduce((sum, d) => sum + d.amount, 0);
  const completedDonations = donations.filter(
    (d) => d.status === "Completed"
  ).length;
  const activeVolunteers = volunteers.filter(
    (v) => v.status === "Active"
  ).length;
  const pendingVolunteers = volunteers.filter(
    (v) => v.status === "Pending"
  ).length;

  const Badge = ({ children, variant = "default" }: any) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        variant === "default"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {children}
    </span>
  );

  const Button = ({
    children,
    onClick,
    variant = "default",
    size = "default",
    className = "",
    disabled = false,
  }: any) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants: any = {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      outline:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    };
    const sizes: any = { sm: "h-8 px-3 text-sm", default: "h-10 px-4" };
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
      </button>
    );
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header handleLogout={handleLogout} Button={Button} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Donations"
            value={`₹${totalDonations?.toLocaleString() || 0}`}
            icon={<DollarSign />}
          />
          <StatCard
            title="Completed Donations"
            value={completedDonations}
            icon={<Heart />}
          />
          <StatCard
            title="Active Volunteers"
            value={activeVolunteers}
            icon={<UserCheck />}
          />
          <StatCard
            title="Pending Applications"
            value={pendingVolunteers}
            icon={<Users />}
          />
        </div>

        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "donations" && (
          <div>
            <SearchInput
              value={donationSearch}
              onChange={(val) => {
                setDonationSearch(val);
                setDonationPage(1);
                fetchDonations(1, val);
              }}
              placeholder="Search donations..."
            />
            <DonationsTab donations={donations} Badge={Badge} Button={Button} />
            <Pagination
              page={donationPage}
              setPage={(p) => {
                setDonationPage(p);
                fetchDonations(p, donationSearch);
              }}
              totalPages={donationPagination.totalPages || 1}
            />
          </div>
        )}

        {activeTab === "volunteers" && (
          <div>
            <SearchInput
              value={volunteerSearch}
              onChange={(val) => {
                setVolunteerSearch(val);
                setVolunteerPage(1);
                fetchVolunteers(1, val);
              }}
              placeholder="Search volunteers..."
            />
            <VolunteersTab
              volunteers={volunteers}
              updateVolunteerStatus={updateVolunteerStatus}
              loading={loadingVolunteers}
            />
            <Pagination
              page={volunteerPage}
              setPage={(p) => {
                setVolunteerPage(p);
                fetchVolunteers(p, volunteerSearch);
              }}
              totalPages={volunteerPagination.totalPages || 1}
            />
          </div>
        )}

        {activeTab === "messages" && (
          <div>
            <SearchInput
              value={messageSearch}
              onChange={(val) => {
                setMessageSearch(val);
                setMessagePage(1);
                fetchMessages(1, val);
              }}
              placeholder="Search messages..."
            />
            <MessagesTab messages={messages} />
            <Pagination
              page={messagePage}
              setPage={(p) => {
                setMessagePage(p);
                fetchMessages(p, messageSearch);
              }}
              totalPages={messagePagination.totalPages || 1}
            />
          </div>
        )}

        {activeTab === "content" && <ContentTab Button={Button} />}
      </div>
    </div>
  );
}

/* ===== Subcomponents ===== */
const Header = ({ handleLogout, Button }: any) => (
  <header className="bg-white  py-2 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <Image
            src={
              "https://lh3.googleusercontent.com/a/ACg8ocKbTHXFQEmPOK9xLQbiqA94EGUz9YgS79Svrl9OLhct6cIlIug=s96-c"
            }
            width={56}
            height={56}
            alt="Logo"
          />
          <h1 className="text-xl font-semibold text-slate-900">
            Vanya Foundation
          </h1>
          <p className="text-sm text-slate-500">Admin Dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  </header>
);

const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-white border border-slate-200 shadow-inner rounded-lg p-6 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
    </div>
    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
      {React.cloneElement(icon, { className: "w-6 h-6 text-slate-600" })}
    </div>
  </div>
);

const TabMenu = ({ activeTab, setActiveTab }: any) => (
  <div className="bg-white border border-slate-200 shadow-inner rounded-lg p-1 flex space-x-1 mb-6">
    {["donations", "volunteers", "messages", "content"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === tab
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);

const SearchInput = ({ value, onChange, placeholder }: any) => (
  <div className="mb-4">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-slate-200"
    />
  </div>
);

const Pagination = ({ page, setPage, totalPages }: any) => (
  <div className="flex justify-center items-center space-x-2 mt-4">
    <button
      onClick={() => setPage(Math.max(page - 1, 1))}
      className="px-3 py-1 bg-slate-200 rounded-md hover:bg-slate-300"
      disabled={page === 1}
    >
      Prev
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`px-3 py-1 rounded-md ${
          page === i + 1
            ? "bg-slate-900 text-white"
            : "bg-slate-200 hover:bg-slate-300"
        }`}
      >
        {i + 1}
      </button>
    ))}
    <button
      onClick={() => setPage(Math.min(page + 1, totalPages))}
      className="px-3 py-1 bg-slate-200 rounded-md hover:bg-slate-300"
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
);

const MessagesTab = ({ messages }: any) => (
  <div className="bg-white border border-slate-200 shadow-inner rounded-lg mb-6 overflow-x-auto">
    <table className="w-full text-sm divide-y divide-slate-100">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          {["Name", "Email", "Message", "Date"].map((h) => (
            <th
              key={h}
              className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {messages.length > 0 ? (
          messages.map((m: any) => (
            <tr key={m.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-800">{m.name}</td>
              <td className="px-4 py-3 text-slate-600">{m.email}</td>
              <td className="px-4 py-3 text-slate-600">{m.message}</td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(m.createdAt).toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-4 text-slate-500">
              No messages found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const ContentTab = ({ Button }: any) => {
  const pages = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Our Work", url: "/our-work" },
    { name: "Gallery", url: "/gallery" },
    { name: "Blogs", url: "/blogs" },
    { name: "Contact", url: "/contact" },
  ];

  const handleEdit = (url: string) => window.open(url, "_blank");

  return (
    <div className="bg-white border border-slate-200 shadow-inner rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Website Content
      </h3>
      <p className="text-sm text-slate-600 mb-4">
        Manage website content here.
      </p>
      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <Button
            key={page.name}
            variant="default"
            size="sm"
            onClick={() => handleEdit(page.url)}
          >
            {page.name}
            <Edit className="w-4 h-4 ml-2" />
          </Button>
        ))}
      </div>
    </div>
  );
};
