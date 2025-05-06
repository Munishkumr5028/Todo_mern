import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../app.css"; 

function CustomPagination({
  tasksPerPage,
  totalTasks,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setCurrentPage(value);
  };

  return (
    <div className="page">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
}

export default CustomPagination;
