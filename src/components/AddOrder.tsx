import React, { useState } from 'react';
type AddOrderProps = {
  closeModal: () => void;
};

const AddOrder = ({ closeModal }: AddOrderProps) => {
  const [orderData, setOrderData] = useState<any[]>([]);
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
    const randomId = Math.floor(Math.random() * 1000) + 1;
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
      setOrderData([...orderData, order]);
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
      localStorage.setItem("orderData", JSON.stringify(orderData));
      closeModal();
    }
  };

  return (
    <div className='bg-white p-4 rounded-md shadow-md w-96 mx-auto '>
      <form onSubmit={handleSubmit}>
      <div className="w-full md:w-1/3">
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
      ></input>
    </div>
      </form>

    </div>
  )
}

export default AddOrder