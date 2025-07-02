import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import banner from "../../assets/marketbanner.png";

function CourseDetailsPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const navigate = useNavigate();
  const addToCart = async (courseId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/courses/cart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course_id: courseId }),
        }
      );
      console.log(courseId);
      if (res.ok) {
        const data = await res.json();
        console.log("Course added to cart:", data);
        alert("Course added to cart successfully!");
        navigate("/cart");
      } else {
        throw new Error("Failed to add course to cart");
      }
    } catch (error) {
      console.error("Error adding course to cart:", error);
      alert("Failed to add course to cart");
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/courses/${slug}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setCourse(data?.data);
          setRelatedCourses(data.data.relatedCourses || []);
        } else {
          throw new Error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [slug]);

  if (!course) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Loading course details...
      </p>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          src={banner}
          alt="Course banner"
          className="w-full h-auto brightness-75"
        />
        <div className="absolute inset-0 bg-white/50 z-10" />
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     font-semibold text-3xl sm:text-4xl lg:text-[40px] z-20 text-center"
        >
          {course.title}
        </motion.h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col px-4 lg:px-20 py-10 text-gray-700">
        <div className="lg:flex border border-gray-300 rounded">
          {/* Course Image */}
          <div className="w-full lg:w-[60%]">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full max-h-[428px]  object-cover"
            />
          </div>

          {/* Course Info */}
          <div className="w-full lg:w-[40%] p-6 border-t lg:border-t-0 lg:border-l border-gray-300 bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-sm text-gray-500 mb-1">
                {course.instructor_name}
              </p>
              <p className="text-sm mt-4">{course.description}</p>
              <ul className="list-disc pl-5 text-sm mt-4 space-y-1">
                <li>Level: {course.level}</li>
                <li>Language: {course.language}</li>
                <li>Validity: {course.validity_days} days</li>
              </ul>
            </div>
            <div className="mt-6">
              <p className="font-bold text-xl text-orange-600">
                ₹{course.discount_price}
                <span className="text-sm text-red-500 line-through ml-2">
                  ₹{course.price}
                </span>
              </p>
              <button
                className="bg-yellow-400 text-black mt-4 py-2 px-6 rounded font-semibold"
                onClick={() => {
                  const role = localStorage.getItem("role");
                  if (role !== "student") {
                    alert("Only loggedIn students can buy courses.");
                    return;
                  }

                  addToCart(course?._id);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6">More Like This</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded overflow-hidden shadow"
              >
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description.slice(0, 80)}...
                  </p>
                  <p className="text-orange-600 font-semibold">
                    ₹{item.discount_price}
                  </p>
                  <button className="bg-yellow-400 text-black mt-3 py-1 px-4 rounded text-sm">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsPage;
