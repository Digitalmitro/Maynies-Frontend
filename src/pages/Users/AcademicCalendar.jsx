import React, { useState } from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
const AcademicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const events = [
    { icon: '🟠', label: 'New Year’s Day' },
    { icon: '🔵', label: 'Martin Luther King Day' },
    { icon: '🟡', label: 'Term Spring Break' },
  ];

  const academicEvents = [
    { date: '2024-04-01', event: 'Start of Term 1' },
    { date: '2024-06-10', event: 'Midterm Break' },
    { date: '2024-08-15', event: 'Start of Term 2' },
    { date: '2024-10-01', event: 'Spring Break' },
    { date: '2024-12-10', event: 'Final Exams' },
  ];

  const examSchedule = [
    { subject: 'Mathematics', date: '2025-01-10' },
    { subject: 'Science', date: '2025-01-15' },
    { subject: 'History', date: '2025-01-20' },
  ];
  const allEvents = [
    ...academicEvents.map(e => ({ ...e, type: 'academic' })),
    ...examSchedule.map(e => ({
      date: e.date,
      event: `Exam: ${e.subject}`,
      type: 'exam'
    }))
  ];

  const getTileContent = ({ date }) => {
    const formatted = date.toISOString().split('T')[0];
    const found = allEvents.find(e => e.date === formatted);
    if (found) {
      return (
        <div className={`text-[10px] text-center mt-1 ${found.type === 'exam' ? 'text-red-500' : 'text-green-600'}`}>
          ●
        </div>
      );
    }
    return null;
  };

  const handleDateClick = (value) => {
    const clickedDate = value.toISOString().split('T')[0];
    setSelectedDate(clickedDate);
  };
  const eventsForSelectedDate = allEvents.filter(e => e.date === selectedDate);
  return (
    <div className=" mx-auto bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-center font-semibold text-lg mb-4">Academic Calendar Year</h2>

      {/* Calendar Box */}
      <div className="w-fit mx-auto bg-gray-100 shadow-md rounded p-4 mb-4">
      <Calendar
        onChange={handleDateClick}
        tileContent={getTileContent}
        className="w-full border-none"
      />
       {selectedDate && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-medium text-lg">Events on {selectedDate}</h3>
          {eventsForSelectedDate.length > 0 ? (
            <ul className="list-disc ml-4 mt-2 text-sm text-gray-700">
              {eventsForSelectedDate.map((event, i) => (
                <li key={i}>{event.event}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No events for this date.</p>
          )}
        </div>
      )}
      </div>

      {/* Event Tags */}
      <div className="flex flex-col space-y-2 mb-6">
        {events.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-sm">
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

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
          <div>{item.date}</div>
          <div>{item.event}</div>
        </div>
      ))}

      {/* Download Button */}
      <button className="w-full mt-4 mb-6 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium">
        Download Full Calendar
      </button>

      {/* Exam Schedule */}
      <h3 className="font-medium mb-2">Academic Year: 2025–2026</h3>
      <div className="grid grid-cols-2 bg-orange-500 text-white font-semibold py-2 px-2 rounded-t">
        <div>Subject</div>
        <div>Exam Date</div>
      </div>
      {examSchedule.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-2 text-sm border-t border-gray-200 px-2 py-2"
        >
          <div>{item.subject}</div>
          <div>{item.date}</div>
        </div>
      ))}
    </div>
  );
};

export default AcademicCalendar;
