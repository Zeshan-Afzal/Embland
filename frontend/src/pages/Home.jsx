import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListCard from "../components/ListCard";
import Footer from "../components/Footer";

function Home() {
  const [listingsWithOffer, setListingsWithOffer] = useState([]);
  const [listingsOnRent, setListingsOnRent] = useState([]);
  const [listingsForSale, setListingsForSale] = useState([]);
  useEffect(() => {
    const getOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();

        setListingsWithOffer(data);
        getRentListings();
      } catch (error) {
        console.log(error.message);
      }
    };
    getOfferListings();
    const getRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();

        setListingsOnRent(data);
        getListingsForSale();
      } catch (error) {
        console.log(error.message);
      }
    };
    const getListingsForSale = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();

        setListingsForSale(data);
      } catch (error) {
        console.log(error.message);
      }
    };
  }, []);

  return (
    <div>
      <div
        className=" h-[400px] sm:h-[550px]   bg-cover bg-center"
        style={{
          backgroundImage: `url(./img6.jpg)`,
        }}
      >
        <div className=" p-10 md:p-24 flex flex-col gap-9 ">
          <h1 className=" font-bold text-white text-xl md:text-5xl flex flex-col ml-8 self-center">
            <div className="">
              Welcome to <span className=" text-red-500">Emb</span>
              <span className=" text-blue-500">Land</span>
            </div>
            Where Every Door Opens to Opportunity
            <p className="text-white font-semibold md:text-2xl mt-3 md:ml-8">
              Find the Perfect Neighborhood for Your Lifestyle
            </p>
          </h1>
          <div className=" self-center">
            <Link to={"/search"}>
              <button className=" p-1 ml-8 md:ml-12 md:p-3 bg-red-500 text-white font-semibold rounded-lg w-52 hover:opacity-85 transition-opacity duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" max-w-6xl mx-auto p-8">
        <div className=" flex flex-col gap-4 ">
          <h1 className=" font-semibold text-xl md:text-3xl ">Recent offers</h1>
          <Link
            className="ml-3 font-semibold text-blue-600 hover:underline"
            to={"/search?offer=true"}
          >
            Show more Offers
          </Link>
        </div>
        <div className=" flex flex-wrap gap-3 mt-4  ">
          {listingsWithOffer &&
            listingsWithOffer.length > 0 &&
            listingsWithOffer.map((list) => (
              <ListCard key={list._id} list={list}></ListCard>
            ))}
        </div>
      </div>
      <div className=" max-w-6xl mx-auto p-8">
        <div className=" flex flex-col gap-3 ">
          <h1 className=" font-semibold text-xl md:text-3xl ">
            Recent Places on Rent
          </h1>
          <Link
            className="ml-3 font-semibold text-blue-600 hover:underline"
            to={"/search?type=rent"}
          >
            Show more Places on Rent
          </Link>
        </div>
        <div className=" flex flex-wrap gap-3 mt-4  ">
          {listingsOnRent &&
            listingsOnRent.length > 0 &&
            listingsOnRent.map((list) => (
              <ListCard key={list._id} list={list}></ListCard>
            ))}
        </div>
      </div>
      <div className=" max-w-6xl mx-auto p-8">
        <div className=" flex flex-col gap-3 ">
          <h1 className=" font-semibold text-xl md:text-3xl ">
            Recent Places for Sale
          </h1>
          <Link
            className="ml-3 font-semibold text-blue-600 hover:underline"
            to={"/search?type=sale"}
          >
            Show more Places for Sale
          </Link>
        </div>
        <div className=" flex flex-wrap gap-3 mt-4  ">
          {listingsForSale &&
            listingsForSale.length > 0 &&
            listingsForSale.map((list) => (
              <ListCard key={list._id} list={list}></ListCard>
            ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
