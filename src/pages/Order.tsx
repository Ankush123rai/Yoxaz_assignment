import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import AddOrder from "../components/AddOrder";

interface Product {
  id: number;
  shiipy: number;
  date: string;
  status: string;
  customer: string;
  email: string;
  country: string;
  shipping: string;
  source: string;
  orderType: string;
}

const Order: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedModal, setSelectedModal] = useState<string>("add");

  const products: Product[] = [
    {
      id: 14048,
      shiipy: 1303,
      date: "2021-09-01",
      status: "Pending",
      customer: "John Doe",
      email: "joho@gmail.com",
      country: "India",
      shipping: "DHL",
      source: "Shopify",
      orderType: "Express",
    },
    {
      id: 140348,
      shiipy: 13403,
      date: "2021-09-01",
      status: "Pending",
      customer: "John Doe",
      email: "joho@gmail.com",
      country: "India",
      shipping: "DHL",
      source: "Shopify",
      orderType: "Express",
    },
    {
      id: 1234048,
      shiipy: 143203,
      date: "2021-09-01",
      status: "Pending",
      customer: "John Doe",
      email: "joho@gmail.com",
      country: "India",
      shipping: "DHL",
      source: "Shopify",
      orderType: "Express",
    },
  ];

  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleCheckboxChange = (productId: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <div className="p-14">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order</h1>
        <button
          onClick={onOpen}
         className="bg-blue-800 uppercase px-3 text-white rounded-md py-1">
          create new
        </button>
      </div>

      <div className="flex items-center gap-5 px-8 py-4 w-full rounded-md mt-7 bg-white shadow-lg">
        <div className="flex flex-col w-full">
          <p className="font-bold">what are you looking for?</p>
          <div className=" flex w-full sm:w-[400px] items-center p-2 border-2 border-gray-300 bg-white rounded-md">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              className="border-none focus:outline-none w-full px-2"
              placeholder="Search for category,name, customer, etc."
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="font-bold">Caregories</p>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>All</option>
            <option value="US">india</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <p className="font-bold">Status</p>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="progressing">progressing</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <button className="bg-blue-800 mt-6 text-white uppercase px-3 rounded-md py-1">
            Reset all
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="flex justify-between items-center px-5 bg-white">
          <h2 className="font-bold text-xl">Product Summary</h2>
          <Pagination currentPage={currentPage} totalItems={products.length} itemsPerPage={itemsPerPage} paginate={paginate} />
        </div>
        <Table products={currentItems} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} />
      </div>
    </div>

    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        radius="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add order</ModalHeader>
                <AddOrder close={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Order;
