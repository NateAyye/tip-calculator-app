import Link from "next/link";
import React from "react";

const Dashboard: React.FC = ({}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/calendar">Calendar</Link>
    </div>
  );
};

export default Dashboard;
