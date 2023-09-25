import React, { useEffect, useState } from "react";
import FooterElement from "../FooterElement";
import HeaderElement from "../HeaderElement";
import Box from "@mui/material/Box";
import { Stack, Pagination, CssBaseline } from "@mui/material";

const Home = () => {
  const url = "https://dev-api.mrcorporate.in/v1/company?%24limit=10&%24skip=0";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
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
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box fontFamily={"rubik"} minHeight={"100vh"}>
      <HeaderElement />
      {data.length > 0 && (
        <div>
          {data.slice(page * 1 - 1, page * 1).map((item) => (
            <Box
              key={data.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                m: "0 auto",
                maxWidth: "30rem",
              }}
            >
              <CssBaseline/>
              <h1>{item.name}</h1>
              <h4>{!item.about ? "no about" : item.about}</h4>
              <p>{!item.description ? "no description" : item.description}</p>
              <Stack spacing={4} sx={{ m: "0 auto" }}>
                <Pagination
                  count={data.length}
                  onChange={handlePageChange}
                  variant="rounded"
                />
              </Stack>
            </Box>
          ))}
        </div>
      )}
    </Box>
  );
};

export default Home;
