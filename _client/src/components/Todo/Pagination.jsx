import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../app.css"; // Assuming your global styles are here

function CustomPagination({
  tasksPerPage,
  totalTasks,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalTasks / tasksPerPage); // Calculate the total number of pages

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setCurrentPage(value); // Update the current page when a user clicks on a page number
  };

  return (
    <div className="page">
      <Stack spacing={2}> {/* Stack provides some spacing between elements */}
        <Pagination
          count={totalPages} // Total number of pages
          color="primary" // Pagination button color
          page={currentPage} // Current page number
          onChange={handlePageChange} // Function to handle page changes
        />
      </Stack>
    </div>
  );
}

export default CustomPagination;
