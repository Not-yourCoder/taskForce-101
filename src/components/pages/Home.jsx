import React, { useEffect, useState } from "react";
import HeaderElement from "../HeaderElement";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack, Pagination, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    
      <Box
        fontFamily={"rubik"}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          // bgcolor:"#ffd740"
          bgcolor:"#b2ebf2"
        }}
      >
        <HeaderElement />
        {data.length > 0 && (
          <div>
            {data.slice(page * 1 - 1, page * 1).map((item) => (
              <Card sx={{ maxWidth: 300, m: "10rem auto" }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 18 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.name}
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {!item.about ? (
                      <Typography>There is no about us move on!</Typography>
                    ) : (
                      item.about
                    )}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: 15 }}>
                    {!item.description ? (
                      <Typography>
                        We are currently writing description!
                      </Typography>
                    ) : (
                      item.description
                    )}
                    <br />
                    {item.email}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <Stack spacing={4} sx={{ m: "9rem auto" }}>
          <Pagination
            count={data.length}
            onChange={handlePageChange}
            variant="rounded"
          />
        </Stack>
      </Box>
   
  );
};

export default Home;
