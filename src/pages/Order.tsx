/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import AddOrder from "../components/AddOrder";

interface OrderData {
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
  const itemsPerPage = 3;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const storedData = localStorage.getItem('orderData');
  const parsedData: OrderData[] = storedData ? JSON.parse(storedData) : [];
  const [products, setProducts] = useState<OrderData[]>(parsedData);
  const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCheckboxChange = (productId: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };

  const handleReset = () => {
    setSelectedItems([]);
    setSearch("");
    setFilterStatus("All");
  };

  const searchFilter = (data: OrderData) => {
    return (
      data.customer.toLowerCase().includes(search.toLowerCase()) ||
      data.status.toLowerCase().includes(search.toLowerCase()) ||
      data.email.toLowerCase().includes(search.toLowerCase()) ||
      data.country.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filterData = () => {
    if (filterStatus === "All") {
      return parsedData;
    } else {
      return parsedData.filter((data) => data.status.toLowerCase() === filterStatus.toLowerCase());
    }
  };

  useEffect(() => {
    setProducts(filterData().filter(searchFilter));
  }, [search, filterStatus]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  function handleOrderAdded() {
    const storedData = localStorage.getItem('orderData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProducts(parsedData);
    }
  }

  useEffect(() => {
    handleOrderAdded();
  }, []);

  return (
    <>
      <div className="p-4 sm:p-14">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Order</h1>
          <button
            onClick={onOpen}
            className="bg-blue-800 uppercase px-3 text-white rounded-md py-1 mt-4 sm:mt-0"
          >
            create new
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 px-2 sm:px-8 py-4 w-full rounded-md mt-4 sm:mt-7 bg-white shadow-lg">
        <div className="flex flex-col w-full">
          <p className="font-bold">what are you looking for?</p>
          <div className=" flex w-full sm:w-[400px] items-center p-2 border-2 border-gray-300 bg-white rounded-md">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              className="border-none focus:outline-none w-full px-2"
              placeholder="Search for category,name, customer, etc."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="font-bold">Caregories</p>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="pending">not define</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <p className="font-bold">Status</p>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option selected>All</option>
            <option value="pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="progressing">progressing</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <button onClick={handleReset} className="bg-blue-800 mt-6 text-white uppercase px-3 rounded-md py-1">
            Reset all
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="flex justify-between items-center px-5 bg-white">
          <h2 className="font-bold text-xl">Product Summary</h2>
          <Pagination currentPage={currentPage} totalItems={products.length} itemsPerPage={itemsPerPage} paginate={paginate} />
        </div>
        <Table 
        products={currentItems} 
        selectedItems={selectedItems}
         handleCheckboxChange={handleCheckboxChange}
         close={onOpenChange}
          onOrderAdded={handleOrderAdded} />
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
                <AddOrder close={onClose} onOrderAdded={handleOrderAdded}/>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Order;
