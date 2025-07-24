"use client";
import DashboardSidebar from "../../components/home/DashboardSidebar";
import UserBoards from "../../components/home/UserBoards";

export default function HomePage() {
  return (
    <div className="flex bg-[#1A1A1A] min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <UserBoards />
      </main>
    </div>
  );
}