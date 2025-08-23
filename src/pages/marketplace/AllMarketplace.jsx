import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/about/about-banner.png";

function AllMarketplace() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/courses`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }

        console.log("Fetched courses:", data?.data?.courses);
        setCourses(data?.data?.courses);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      {/* Hero Banner Section */}
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          src={banner}
          alt="Marketplace banner"
          className="w-full h-auto md:h-[400px] object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-white/50 z-10" />
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                font-semibold text-3xl sm:text-4xl lg:text-[40px] z-20 text-center px-4"
        >
          Marketplace
        </motion.h2>
      </div>

      {/* Marketplace Listings */}
      <div className="py-10 md:py-20 px-4 sm:px-8 lg:px-20 xl:px-40">
        {courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses available</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="border border-gray-300 flex flex-col md:flex-row w-full mb-8 md:mb-10 rounded-lg overflow-hidden shadow-md"
            >
              {/* Image */}
              <div className="w-full md:w-[25%] h-48">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="py-4 px-4 md:px-8 border-t md:border-t-0 md:border-l border-gray-300 w-full md:w-[50%] text-gray-700">
                <h3 className="font-bold text-lg sm:text-xl lg:text-[20px] text-gray-800">
                  {course.title}
                </h3>
                <p className="text-sm sm:text-[15px] pt-2 text-gray-600">
                  {course.description}...
                </p>
                <p className="pt-4 sm:pt-6 text-sm text-gray-500">
                  Instructor: {course.instructor_name} ({course.language})
                </p>
              </div>

              {/* Price and CTA */}
              <div className="py-4 px-4 w-full md:w-[25%] flex flex-col border-t md:border-t-0 md:border-l border-gray-300 justify-between text-gray-700">
                <div className="space-y-2 w-full mb-4 md:mb-0">
                  <p className="text-sm sm:text-[15px]">
                    From{" "}
                    <span className="text-orange-600">
                      ₹{course.discount_price}
                    </span>
                    <span className="line-through text-red-400 text-xs ml-2">
                      ₹{course.price}
                    </span>
                  </p>
                </div>
                <div className="flex justify-center pb-4 md:pb-0">
                  <button
                    className="bg-amber-300 py-2 px-4 text-sm sm:text-base hover:bg-amber-400 transition"
                    onClick={() => navigate(`/course/${course.slug}`)}
                  >
                    Find out more
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllMarketplace;
