"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import TicketDetails from "./TicketDetails";

interface Comment {
  id: number;
  text: string;
  timestamp: string;
}

interface Ticket {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  description: string;
  status: string;
  comments: Comment[];
}


const Tickets: React.FC = () => {
  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get<Ticket[]>(
          "https://zealthy-backend-five.vercel.app/api/tickets/"
        );
        setData(response.data);
        setLoading(false);

        // Debugging: Log the fetched data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchTickets();
  }, []);

  const handleTicketClick = (id: number) => {
    setSelectedTicketId(id); // Open the details for the clicked ticket
    fetchComments(id);
  };

  const handleCloseTicketDetails = () => {
    setSelectedTicketId(null); // Close the details
  };

  const handleUpdateStatus = async (ticketId: number, newStatus: string) => {
    try {
      const response = await axios.patch(
        `https://zealthy-backend-five.vercel.app/api/tickets/update/status/${ticketId}/`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the ticket status in the local state
      setData((prevData) =>
        prevData.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  const handleCreateComment = async (ticketId: number, newComment: string) => {
    try {
      await axios.post(
        `https://zealthy-backend-five.vercel.app/api/comment/create/${ticketId}/`,
        { text: newComment },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Fetch comments again to update the ticket's comments
      fetchComments(ticketId);
    } catch (error) {
      console.error("Error creating ticket comment:", error);
    }
  };

  const handleDeleteComment = async (ticketId: number, commentId: number) => {
    try {
      await axios.delete(
        `https://zealthy-backend-five.vercel.app/api/comment/delete/${commentId}/`
      );

      // Fetch comments again to update the ticket's comments
      fetchComments(ticketId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const fetchComments = async (ticketId: number) => {
    try {
      const response = await axios.get<Comment[]>(
        `https://zealthy-backend-five.vercel.app/api/comment/get/${ticketId}/`
      );

      // Update the comments for the specific ticket in the local state
      setData((prevData) =>
        prevData.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, comments: response.data }
            : ticket
        )
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteTicket = async (ticketId: number) => {
    try {
      // Make an Axios DELETE request to delete the ticket with the given id
      await axios.delete(
        `https://zealthy-backend-five.vercel.app/api/tickets/delete/${ticketId}/`
      );
      // Remove the deleted ticket from the data state
      setData((prevData) =>
        prevData.filter((ticket) => ticket.id !== ticketId)
      );
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="flex">
      {/* Left side: Table of Tickets */}
      <div className="w-1/2 p-4 border rounded-md">
        <h1 className="text-2xl font-bold text-center">Tickets</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table-auto text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">Ticket ID</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Timestamp</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="border text-sm">
                    <span
                      onClick={() => handleTicketClick(ticket.id)}
                      className="underline text-blue-500 cursor-pointer"
                    >
                      {ticket.id}
                    </span>
                  </td>
                  <td className="border text-sm">{ticket.status}</td>
                  <td className="border text-sm">{ticket.timestamp}</td>
                  <td className="border text-sm">
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 text-sm"
                      onClick={() => handleDeleteTicket(ticket.id)}
                    >
                      Delete Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Right side: Ticket Details */}
      <div className="w-1/2 p-8 border rounded-md">
        {selectedTicketId !== null ? (
          <TicketDetails
            ticket={data.find((ticket) => ticket.id === selectedTicketId)!}
            comments={
              data.find((ticket) => ticket.id === selectedTicketId)?.comments ||
              []
            }
            onUpdateStatus={(newStatus) =>
              handleUpdateStatus(selectedTicketId, newStatus)
            }
            onCreateComment={(newComment) =>
              handleCreateComment(selectedTicketId, newComment)
            }
            onDeleteComment={(commentId) =>
              handleDeleteComment(selectedTicketId, commentId)
            }
            onClose={handleCloseTicketDetails}
            fetchComments={fetchComments} // Pass the fetchComments function
          />
        ) : (
          <p>No ticket selected.</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;