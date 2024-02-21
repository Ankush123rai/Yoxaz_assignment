import React, { useState, useEffect } from "react";

type AddOrderProps = {
  close: () => void;
  onOrderAdded: () => void;
};

const AddOrder = ({ close, onOrderAdded }: AddOrderProps) => {
  const data = localStorage.getItem("orderData");
  const [orderData, setOrderData] = useState(data ? JSON.parse(data) : []);
  const [order, setOrder] = useState({
    id: 0,
    shiipy: 0,
    date: "",
    status: "",
    customer: "",
    email: "",
    country: "",
    shipping: "",
    source: "",
    orderType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const randomId = Math.floor(Math.random() * 10000) + 1;
    setOrder({
      ...order,
      id: randomId,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      order.customer === "" ||
      order.email === "" ||
      order.country === "" ||
      order.shipping === "" ||
      order.source === "" ||
      order.orderType === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    const updatedOrderData = [...orderData, order];
    setOrderData(updatedOrderData);
    localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
    onOrderAdded();
    setOrder({
      id: 0,
      shiipy: 0,
      date: "",
      status: "",
      customer: "",
      email: "",
      country: "",
      shipping: "",
      source: "",
      orderType: "",
    });

    close();
  };

  useEffect(() => {
    console.log("orderData", orderData);
  }, [orderData]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full mx-auto ">
      <form onSubmit={handleSubmit}>
        <div className="w-full ">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            shiippy
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="name"
            name="shiipy"
            value={order.shiipy}
            onChange={handleChange}
          />

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Date
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="date"
            placeholder="Enter your name"
            id="name"
            name="date"
            value={order.date}
            onChange={handleChange}
          />
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            id="status"
            name="status"
            value={order.status}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}

          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="progressing">progressing</option>
          </select>

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Customer
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="name"
            name="customer"
            value={order.customer}
            onChange={handleChange}
          />

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Email
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="email"
            placeholder="Enter your name"
            id="name"
            name="email"
            value={order.email}
            onChange={handleChange}
          />

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Country
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="name"
            name="country"
            value={order.country}
            onChange={handleChange}
          />

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Shipping
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="name"
            name="shipping"
            value={order.shipping}
            onChange={handleChange}
          />

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Source
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="name"
            name="source"
            value={order.source}
            onChange={handleChange}
          />

          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="name"
          >
            Order Type
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Enter your name"
            id="name"
            name="orderType"
            value={order.orderType}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-black text-white rounded-md"
          >
            Add Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
