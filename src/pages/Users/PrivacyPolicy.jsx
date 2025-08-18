import React from "react";
import { FaDownload, FaPrint, FaBell } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex justify-center items-start p-4 md:p-10">
      <div className="w-full max-w-3xl bg-white rounded-lg p-6 relative">

        

        {/* Heading */}
        <h2 className="text-center text-lg font-semibold mb-1">Privacy Policy</h2>
        <p className="text-center text-xs text-gray-500 mb-4">Last Updated August 05, 2024</p>

        {/* Alert */}
        <div className="bg-orange-100 text-orange-800 p-3 rounded-md text-sm mb-4 border border-orange-200">
          <strong>This Privacy Policy</strong> will help you better understand how we collect, use and share your personal information.
        </div>

        {/* Paragraphs */}
        <div className="text-sm text-gray-800 space-y-4">
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
            of letter as opposed to using 'Content here, content here', making it look like readable English.
          </p>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. It has survived not only five centuries, but also the leap into electronic
            typesetting.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-2 pl-4 text-sm">
            <li className="flex items-start gap-2">
              <BsCircleFill className="text-orange-500 text-[8px] mt-1" />
              <span>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BsCircleFill className="text-orange-500 text-[8px] mt-1" />
              <span>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <BsCircleFill className="text-orange-500 text-[8px] mt-1" />
              <span>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </span>
            </li>
          </ul>

          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.
          </p>
        </div>

        {/* Summary Section */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-center text-gray-800 mb-2">Summary of Key Points</h3>
          <p className="text-xs text-gray-600 text-center">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,
            by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of
            Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
