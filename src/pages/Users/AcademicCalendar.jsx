import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const AcademicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [academicEvents, setAcademicEvents] = useState([]);
  // const events = [
  //   { icon: "🟠", label: "New Year’s Day" },
  //   { icon: "🔵", label: "Martin Luther King Day" },
  //   { icon: "🟡", label: "Term Spring Break" },
  // ];

  useEffect(() => {
    const fetchAcademicEvents = async () => {
      try {
        const year = new Date().getFullYear();
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_API
          }/api/student/acedemic/${year}/events`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch academic events");

        const data = await res.json();
        console.log(data?.data);
        setAcademicEvents(data?.data || []);
      } catch (error) {
        console.error("Error fetching academic events:", error);
      }
    };

    fetchAcademicEvents();
  }, []);

  const examSchedule = [
    { subject: "Mathematics", date: "2025-01-10" },
    { subject: "Science", date: "2025-01-15" },
    { subject: "History", date: "2025-01-20" },
  ];
  const allEvents = [
    ...academicEvents.map((e) => ({ ...e, type: "academic" })),
    ...examSchedule.map((e) => ({
      date: e.date,
      event: `Exam: ${e.subject}`,
      type: "exam",
    })),
  ];

  const getTileContent = ({ date }) => {
    const formatted = date.toLocaleDateString("en-CA");

    const hasEvent = academicEvents.some(
      (event) => event.startDate.split("T")[0] === formatted
    );

    return hasEvent ? (
      <div className="text-center mt-1">
        <span className="text-green-700 text-[10px]">⦿</span>
      </div>
    ) : null;
  };

  const handleDateClick = (value) => {
    const clickedDate = value.toLocaleDateString("en-CA");
    setSelectedDate(clickedDate);
  };

  const eventsForSelectedDate = academicEvents.filter(
    (event) => event.startDate.split("T")[0] === selectedDate
  );

  return (
    <div className=" mx-auto  bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-center font-semibold text-lg mb-4">
        Academic Calendar Year
      </h2>

      {/* Calendar Box */}
      <div className="w-full flex justify-center flex-col max-w-md mx-auto bg-white  overflow-hidden mb-6">
        <Calendar
          onChange={handleDateClick}
          tileContent={getTileContent}
          className="border-none w-full p-2"
        />

        {selectedDate && (
          <div className=" p-4 ">
            <h3 className="font-medium text-lg text-gray-800 mb-3">
              Events on <span className="text-blue-600">{selectedDate}</span>
            </h3>

            {eventsForSelectedDate.length > 0 ? (
              <ul className="space-y-2">
                {eventsForSelectedDate.map((event, i) => (
                  <li
                    key={i}
                    className="bg-white p-3 rounded-md shadow-sm border border-gray-100 hover:shadow transition-shadow"
                  >
                    <div className="flex items-start">
                      <span className="inline-block w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {event.title}
                        </p>
                        {event.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 italic">
                  No events scheduled for this date
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Tags */}
      {/* <div className="flex flex-col space-y-2 mb-6">
        {events.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-sm">
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div> */}

      {/* Academic Year Event Table */}
      <h3 className="font-medium mb-2">Academic Year: 2024–2025</h3>
      <div className="grid grid-cols-2 bg-orange-500 text-white font-semibold py-2 px-2 rounded-t">
        <div>Date</div>
        <div>Event</div>
      </div>

      {academicEvents.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 text-sm border-t border-gray-200 px-2 py-2"
        >
          <div>{new Date(item.startDate).toLocaleDateString()}</div>
          <div>{item.title}</div>
        </div>
      ))}

      {/* Download Button */}
      <button className="w-full mt-4 mb-6 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium">
        Download Full Calendar
      </button>

      {/* Exam Schedule */}
      <h3 className="font-medium mb-2">Academic Year: 2025–2026</h3>
      <div className="grid grid-cols-2 bg-orange-500 text-white font-semibold py-2 px-2 rounded-t">
        <div>Title</div>
        <div>Exam Date</div>
      </div>

      {academicEvents
        .filter((item) => item.category === "Exam")
        .map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-2 text-sm border-t border-gray-200 px-2 py-2"
          >
            <div>{item.title}</div>
            <div>{new Date(item.startDate).toLocaleDateString()}</div>
          </div>
        ))}
    </div>
  );
};

export default AcademicCalendar;
