import React, { useState, useEffect } from "react";
import axios from "axios";

interface TicketDetailsProps {
  ticket: Ticket;
  comments: Comment[];
  onUpdateStatus: (newStatus: string) => void;
  onCreateComment: (newComment: string) => void;
  onDeleteComment: (commentId: number) => void;
  onClose: () => void;
  fetchComments: (ticketId: number) => void; // Define the fetchComments prop
}

interface Ticket {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  description: string;
  status: string;
}

interface Comment {
  id: number;
  text: string;
  timestamp: string;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticket,
  comments,
  onUpdateStatus,
  onCreateComment,
  onDeleteComment,
  onClose,
}) => {
  const [newComment, setNewComment] = useState<string>("");
  return (
    <div>
      {ticket ? (
        <div>
          <strong>Ticket ID:</strong> {ticket.id}
          <br />
          <strong>Name:</strong> {ticket.name}
          <br />
          <strong>Email:</strong> {ticket.email}
          <br />
          <strong>Description:</strong> {ticket.description}
          <br />
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => onUpdateStatus("resolved")}
            >
              Resolve
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              onClick={() => onUpdateStatus("in progress")}
            >
              In Progress
            </button>
          </div>
          <br />
          <strong>Comments:</strong>
          <ul>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <li key={comment.id}>
                  <div>
                    {comment.text}
                    <span
                      className="cursor-pointer text-red-500 float-right ml-2"
                      onClick={() => onDeleteComment(comment.id)}
                    >
                      X
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {comment.timestamp}
                  </div>
                </li>
              ))
            ) : (
              <li>No comments yet.</li>
            )}
          </ul>
          {/* Text box to create a new comment */}
          <div>
            <textarea
              rows={4}
              cols={50}
              placeholder="Enter your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <br />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => {
                onCreateComment(newComment);
                setNewComment(""); // Clear the newComment state variable
              }}
            >
              Add Comment
            </button>
          </div>
          {/* Button to close the details */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      ) : (
        <p>Loading ticket details...</p>
      )}
    </div>
  );
};

export default TicketDetails;