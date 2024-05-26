import React from "react";
import { FaBath, FaBed, FaParking } from "react-icons/fa";
import { FaChair, FaLocationDot } from "react-icons/fa6";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

function ListCard({ list, handleDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className=" flex bg-white rounded-lg w-[350px] overflow-hidden  flex-col ">
      <Link className=" relative" to={`/listing/${String(list._id)}`}>
        <img
          src={list.imageUrls[0]}
          alt=""
          className=" object-cover  h-[250px] w-[350px] rounded-t-lg rounded-tr-lg hover:scale-105 transition-scale duration-300 "
        />

        <p className=" font-semibold text-[22px] ml-3 mt-2 line-clamp-1">
          {list.name}
        </p>
        <div className=" flex items-center gap-2 my-4 ml-3">
          <FaLocationDot className=" text-green-700"></FaLocationDot>
          <p className=" text-gray-600 ">{list.address}</p>
        </div>
        <p className=" line-clamp-2 ml-3">{list.description}</p>

        <p className=" text-[20px] ml-3 text-gray-600 my-2">
          ${list.regularPrice.toLocaleString()}
          {list.type === "rent" && "/month"}
        </p>

        <div className=" flex gap-3 flex-wrap ml-3 mb-4">
          <div className=" flex gap-2 items-center">
            <FaBed className="text-lg"></FaBed>
            <span className=" font-semibold ">Beds {list.bedrooms}</span>
          </div>
          <div className=" flex gap-2 items-center">
            <FaBath className="text-lg"></FaBath>
            <span className=" font-semibold ">Baths {list.bathrooms}</span>
          </div>
          <div className=" flex gap-2 items-center">
            <FaParking className="text-lg"></FaParking>
            <span className=" font-semibold ">
              {list.parking ? "Parking •Yes" : "Parking •No"}
            </span>
          </div>
          <div className=" flex gap-2 items-center">
            <FaChair className="text-lg"></FaChair>
            <span className=" font-semibold ">
              {list.furnished ? "Furnished •Yes" : "Furnished •No"}
            </span>
          </div>
        </div>
      </Link>
      {handleDelete && currentUser && currentUser._id === list.userRef && (
        <div className=" flex gap-2 ml-3 mb-3 ">
          {" "}
          <Link
            to={`/update-listing/${list._id}`}
            className=" flex items-center p-1 w-24 gap-2 bg-green-200 border border-blue-green rounded-lg"
          >
            <IoMdCreate>Edit</IoMdCreate>
            <span> Edit</span>
          </Link>
          <div
            onClick={() => handleDelete(list._id)}
            className=" cursor-pointer flex items-center p-1 w-24 gap-2 bg-red-200 border border-red-600 rounded-lg"
          >
            <MdDelete />
            <span> Delete</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListCard;
