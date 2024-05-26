import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import ContactOwner from "../components/ContactOwner";

SwiperCore.use([Navigation]);
function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);
  const [contactOwner, setContactOwner] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getListing = async () => {
      const listId = params.listingId;

      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listId}`);
        const data = await res.json();
        setLoading(false);
        setListing(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <h1 className="text-center my-8 text-2xl ">Loading...</h1>}
      {error && (
        <h1 className="text-center my-8 text-2xl ">Something went wrong</h1>
      )}

      {listing && !error && !loading && (
        <>
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => {
                const cssEscapedUrl = url.replace(/(["\\])/g, "\\$1");
                return (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[550px]"
                      style={{
                        backgroundImage: `url('${cssEscapedUrl}')`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="max-w-4xl mx-auto p-5 gap-4 flex-col flex ">
            <div className="">
              <h1 className=" text-3xl font-bold my-4">
                {listing.name} - $ {listing.regularPrice.toLocaleString()}{" "}
                {listing.type === "rent" && <span>/month</span>}
              </h1>

              <div className=" flex gap-2 items-center">
                <FaLocationDot className=" text-green-700"></FaLocationDot>
                <span className=" text-gray-600 ">{listing.address}</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              <button className="capitalize p-2 bg-red-600  rounded-lg text-white w-44  ">
                for {listing.type}
              </button>
              {listing.offer && (
                <button className=" capitalize p-2  bg-green-600  rounded-lg text-white  w-44 ">
                  ${listing.discountPrice} discounted
                </button>
              )}
            </div>

            <div className=" ">
              <span className=" font-bold text-xl">Description- </span>
              <span className=" text-gray-600 text-lg">
                {listing.description}
              </span>
            </div>

            <div className=" flex gap-5 flex-wrap">
              <div className=" flex gap-3 items-center">
                <FaBed className="text-2xl"></FaBed>
                <span className=" font-semibold ">Beds {listing.bedrooms}</span>
              </div>
              <div className=" flex gap-3 items-center">
                <FaBath className="text-2xl"></FaBath>
                <span className=" font-semibold ">
                  Baths {listing.bathrooms}
                </span>
              </div>
              <div className=" flex gap-3 items-center">
                <FaParking className="text-2xl"></FaParking>
                <span className=" font-semibold ">
                  {listing.parking ? "Parking •Yes" : "Parking •No"}
                </span>
              </div>
              <div className=" flex gap-3 items-center">
                <FaChair className="text-2xl"></FaChair>
                <span className=" font-semibold ">
                  {listing.furnished ? "Furnished •Yes" : "Furnished •No"}
                </span>
              </div>
            </div>
            {!contactOwner &&
              currentUser &&
              currentUser._id !== listing.userRef && (
                <button
                  onClick={() => setContactOwner(true)}
                  className=" bg-blue-950 p-3 rounded-lg text-white mt-5 uppercase hover:opacity-85 text-[16px]"
                >
                  {" "}
                  Contact Owner
                </button>
              )}
            {contactOwner && <ContactOwner listing={listing}></ContactOwner>}
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
