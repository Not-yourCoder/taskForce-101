import React, { useEffect, useState } from "react";
import HeaderElement from "../HeaderElement";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

const Home = () => {
  const url = "https://dev-api.mrcorporate.in/v1/company?%24limit=10&%24skip=0";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const accessToken = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.data);
      console.log(page);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Root sx={{ maxWidth: "100%", width: 500 }}>
      <Box
        fontFamily={"rubik"}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          bgcolor: "#b2ebf2",
        }}
      >
        <HeaderElement />
        <div style={{ maxWidth: "100%", width: 500 }}>
          <table aria-label="custom pagination table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td style={{ width: 160 }} align="right">
                        {item.email}
                      </td>
                      <td style={{ width: 160 }} align="right">
                        {item.phone}
                      </td>
                    </tr>
                  ))}
              {emptyRows > 0 && (
                <tr style={{ height: 41 * emptyRows }}>
                  <td colSpan={3} aria-hidden />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tfoot>
          </table>
        </div>
      </Box>
    </Root>
  );
};

export default Home;

/* STYLED */
const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);
const grey = {
  200: '#d0d7de',
  800: '#32383f',
  900: '#24292f',
};

