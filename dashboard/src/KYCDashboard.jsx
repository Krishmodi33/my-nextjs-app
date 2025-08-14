import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  CreditCard,
  BookOpen,
  FileCheck,
  AlertTriangle,
  Home,
  BarChart3,
  Moon,
  Sun,
  Calendar,
  Settings,
  User,
  Shield,
  Download,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const KYCDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTimeRange, setActiveTimeRange] = useState("Today");
  const [activeViewType, setActiveViewType] = useState("Individual");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data matching the image
  const mockData = {
    totalKyc: 3456,
    kycStats: {
      newKyc: {
        count: 3000,
        change: 12.5,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      modifiedKyc: {
        count: 456,
        change: -2.5,
        color: "text-red-600",
        bgColor: "bg-red-50",
      },
    },
    chartData: [
      { name: "Individual", Individual: 800, "Non-Individual": 300 },
      { name: "Non Individual", Individual: 650, "Non-Individual": 250 },
    ],
    statusCards: [
      { title: "Today", count: 234, icon: Calendar, color: "bg-blue-500" },
      { title: "Yesterday", count: 45, icon: Calendar, color: "bg-orange-500" },
      { title: "Individual", count: 350, icon: User, color: "bg-green-500" },
      { title: "Registered", count: 654, icon: Shield, color: "bg-green-500" },
      { title: "Hold", count: 269, icon: AlertTriangle, color: "bg-blue-500" },
      {
        title: "Docs Pending",
        count: 100,
        icon: FileText,
        color: "bg-red-500",
      },
    ],
    categories: {
      individual: 85,
      nonIndividual: 60,
    },
    pieChartData: [
      { name: "No of PANs Solicited", value: 3456, color: "#3B82F6" },
      { name: "Received", value: 2800, color: "#10B981" },
      { name: "Consumed", value: 2200, color: "#F59E0B" },
      { name: "Pending", value: 600, color: "#EF4444" },
    ],
    panStats: {
      solicited: { total: 956, withImage: 706, withoutImage: 250 },
      received: { total: 320, withImage: 300, withoutImage: 20 },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setDashboardData(mockData);
      setLoading(false);
    };

    fetchData();
  }, [activeTimeRange, activeViewType]);

  const menuItems = [
    { name: "Dashboard", icon: BarChart3, active: true },
    { name: "Applications", icon: FileText, active: false },
    { name: "Billing", icon: CreditCard, active: false },
    { name: "Rate Card", icon: BookOpen, active: false },
    { name: "Agreement Copy", icon: FileCheck, active: false },
    { name: "Notices", icon: AlertTriangle, active: false },
  ];

  const LoadingSkeleton = ({ className }) => (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    ></div>
  );

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-48 bg-white border-r border-gray-200 transform ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-gray-100">
          <div className="flex flex-col items-center">
            {/* Replace with your logo image if needed */}
            <img src="/1.png" alt="Logo" className="w-20 h-20 " />
            <span className="text-xs text-gray-500 font-medium">Logo</span>
          </div>
        </div>
        {/* Menu Items */}
        <nav className="flex-1 py-6">
          {menuItems.map((item, index) => (
            <button
              key={item.name}
              className={`w-full flex items-center px-6 py-3 space-x-3 rounded-lg mb-1 transition-colors
                ${item.active
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? "text-blue-600" : "text-gray-400"}`} />
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const Navbar = () => (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Moon className="w-5 h-5 text-blue-600" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-sm">
              <div className="font-medium text-gray-900">Madhu Kumar</div>
              <div className="text-gray-500">May 15, 2024</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? "dark bg-gray-900" : ""}`}>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 p-6">
            {/* Header Section */}
            <div className="mb-6">
              {/* Title */}
              <div className="mb-1">
                <span className="text-2xl font-bold text-gray-900">Axis MF</span>
              </div>
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <span>Home</span>
                <ChevronDown className="w-4 h-4 text-gray-400 rotate-90" />
                <span>Dashboard</span>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center justify-end">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {["Today", "This Month", "Custom"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveTimeRange(range)}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTimeRange === range
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-4 ml-6" >
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">13 Feb 2024</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-8 space-y-6">
                {/* Total KYC */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-sm text-gray-600 mb-2">Total KYCs</h3>
                  <div className="text-3xl font-bold text-gray-900">
                    {loading ? (
                      <LoadingSkeleton className="h-8 w-24" />
                    ) : (
                      "3,456"
                    )}
                  </div>
                </div>

                {/* KYC Stats Cards */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6">
                    {loading ? (
                      <div className="space-y-2">
                        <LoadingSkeleton className="h-4 w-16" />
                        <LoadingSkeleton className="h-8 w-20" />
                        <LoadingSkeleton className="h-4 w-12" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-600">New KYC</h4>
                          <div className="text-2xl font-bold text-gray-900">
                            3,000
                          </div>
                          <div className="flex items-center text-sm text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>+2.5%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    {loading ? (
                      <div className="space-y-2">
                        <LoadingSkeleton className="h-4 w-16" />
                        <LoadingSkeleton className="h-8 w-20" />
                        <LoadingSkeleton className="h-4 w-12" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                          <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-sm text-gray-600">
                            Modified KYC
                          </h4>
                          <div className="text-2xl font-bold text-gray-900">
                            456
                          </div>
                          <div className="flex items-center text-sm text-red-600">
                            <TrendingDown className="w-4 h-4 mr-1" />
                            <span>-2.5%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-6">
                      <button className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-blue-700 inline-block"></span>
                        <span className="text-sm font-medium text-blue-700">
                          Today
                        </span>
                      </button>
                      <button className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-blue-100 inline-block"></span>
                        <span className="text-sm text-gray-400">Yesterday</span>
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <LoadingSkeleton className="h-64 w-full" />
                  ) : (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dashboardData?.chartData || []}>
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis axisLine={false} tickLine={false} />
                          <Bar
                            dataKey="Individual"
                            fill="#3B82F6"
                            radius={[4, 4, 0, 0]}
                            barSize={60}
                          />
                          <Bar
                            dataKey="Non-Individual"
                            fill="#93C5FD"
                            radius={[4, 4, 0, 0]}
                            barSize={60}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Status Cards Grid */}
                <div className="grid grid-cols-6 gap-4">
                  {(dashboardData?.statusCards || Array(6).fill({})).map(
                    (card, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 text-center"
                      >
                        {loading ? (
                          <div className="space-y-2">
                            <LoadingSkeleton className="h-8 w-8 rounded-full mx-auto" />
                            <LoadingSkeleton className="h-4 w-16 mx-auto" />
                            <LoadingSkeleton className="h-6 w-12 mx-auto" />
                          </div>
                        ) : (
                          <>
                            <div
                              className={`w-8 h-8 ${
                                card.color || "bg-gray-300"
                              } rounded-full flex items-center justify-center mx-auto mb-2`}
                            >
                              {card.icon && (
                                <card.icon className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="text-xs text-gray-600 mb-1">
                              {card.title}
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {card.count}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-4 space-y-6">
                {/* Categories */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Categories
                    </h3>
                    <div className="flex space-x-4 text-sm">
                      <button className="font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
                        Individual
                      </button>
                      <button className="text-gray-500">Non Individual</button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="space-y-4">
                      <LoadingSkeleton className="h-4 w-full" />
                      <LoadingSkeleton className="h-4 w-4/5" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Individual</span>
                          <span>{dashboardData?.categories.individual}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full"
                            style={{
                              width: `${dashboardData?.categories.individual}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Non Individual</span>
                          <span>
                            {dashboardData?.categories.nonIndividual}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-400 h-3 rounded-full"
                            style={{
                              width: `${dashboardData?.categories.nonIndividual}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Solicited Unsolicited Chart */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-600">
                        Solicited
                      </h3>
                      <h3 className="text-lg font-semibold text-gray-500">
                        Unsolicited
                      </h3>
                    </div>
                    <div className="flex space-x-3 text-sm">
                      <button className="font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
                        Individual
                      </button>
                      <button className="text-gray-500">Non Individual</button>
                    </div>
                  </div>

                  {loading ? (
                    <LoadingSkeleton className="h-48 w-full rounded-full" />
                  ) : (
                    <div className="relative">
                      <div className="w-48 h-48 mx-auto relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            {/* Render grey background rings first */}
                            {[
                              { start: 0, end: 360 }, 
                              { start: 0, end: 360 }, 
                              { start: 0, end: 360 }, 
                              { start: 0, end: 360 }, 
                            ].map((angle, index) => (
                              <Pie
                                key={`bg-pie-${index}`}
                                data={[{ value: 1 }]}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                startAngle={angle.start}
                                endAngle={angle.end}
                                innerRadius={40 + index * 15}
                                outerRadius={50 + index * 15}
                                paddingAngle={0}
                                stroke="none"
                                cornerRadius={10}
                                isAnimationActive={false}
                              >
                                <Cell fill="#F3F4F6" />
                              </Pie>
                            ))}
                            {/* Define custom angles for each arc */}
                            {[
                              { start: 250, end: 320 }, 
                              { start: 250, end: 340 }, 
                              { start: 200, end: 360 }, 
                              { start: 220, end: 320 }, 
                            ].map((angle, index) => (
                              <Pie
                                key={`pie-${index}`}
                                data={[dashboardData?.pieChartData[index]]}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                startAngle={angle.start}
                                endAngle={angle.end}
                                innerRadius={40 + index * 15}
                                outerRadius={50 + index * 15}
                                paddingAngle={0}
                                stroke="none"
                                cornerRadius={10}
                              >
                                <Cell
                                  fill={
                                    dashboardData?.pieChartData[index]?.color
                                  }
                                />
                                {/* Optional: background ring */}
                                <Cell fill="#828b9eff" stroke="none" />
                              </Pie>
                            ))}
                          </PieChart>
                        </ResponsiveContainer>

                        {/* Center Label */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="text-lg font-bold">
                            {dashboardData?.pieChartData?.[0]?.value || 0}
                          </p>
                        </div>
                      </div>
                      {/* Legend */}
                      <div className="mt-4 space-y-2">
                        {(dashboardData?.pieChartData || []).map(
                          (entry, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-gray-600">
                                {entry.name}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* PAN Stats */}
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          No. of PANs Solicited
                        </h4>
                        <span className="text-lg font-bold text-gray-900">
                          956
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>706 With image</span>
                        <span>250 Without image</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          Data Received
                        </h4>
                        <span className="text-lg font-bold text-gray-900">
                          320
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>300 With image</span>
                        <span>20 Without image</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default KYCDashboard;
