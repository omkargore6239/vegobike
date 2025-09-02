import React from "react";
import Card from "../components/Card.jsx";

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Welcome to Auto Services Hub</h1>
        <p className="mt-1 text-sm text-gray-600">Manage rentals, parts, servicing, and trade from one place.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card
          to="/rental"
          title="Vehicle Rental Service"
          desc="Book vehicles and manage rental details."
          icon="🛞"
        />
        <Card
          to="/spare-parts"
          title="Spare Part Service"
          desc="Browse inventory and place parts orders."
          icon="🔧"
        />
        <Card
          to="/servicing"
          title="Vehicle Servicing"
          desc="Schedule maintenance and repair jobs."
          icon="🧰"
        />
        <Card
          to="/purchase-sale"
          title="Purchase & Sale"
          desc="Create and manage listings for trade."
          icon="💱"
        />
      </div>
    </section>
  );
}
