import * as React from "react";
import { useEffect, useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import toast, { Toaster } from "react-hot-toast";

import Toolbar from "@mui/material/Toolbar";

import SearchFilter from "../GlobalComponents/SearchBtn";
import { useNavigate } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import DogsCard from "../GlobalComponents/Card";
import {
  getAllDogs,
  getAllBreeds,
  getFilteredDogs,
  logoutUser,
} from "../../api";
import Dropdown from "../GlobalComponents/Dropdown";
import { Typography } from "@mui/material";

function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [listOfDogs, setListOfDogs] = useState([]);
  const [allBreeds, setAllBreeds] = useState([]);
  const [breedName, setBreedName] = React.useState([]);
  const [cityName, setCityName] = React.useState("");
  const [dogAge, setDogAge] = React.useState(null);
  const [sort, setSort] = React.useState("Ascending");

  const [next, setNext] = useState("");
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDogs();
    loadBreeds();
  }, []);

  const loadDogs = async () => {
    try {
      setCityName('')
      const dogs = await getAllDogs(next, breedName);

      if (dogs.message === "Unauthorized") {
        navigate("/");
      }
      debugger
      let allDogsData = [...listOfDogs, ...dogs?.dogsData];

      let sortedAllDogsData = allDogsData.sort((a, b) =>
        a.breed.localeCompare(b.breed)
      );

      if (sort === "Descending") {
        sortedAllDogsData = sortedAllDogsData.reverse();
      }
      setListOfDogs([...sortedAllDogsData]);

      setNext(dogs.next);
    } catch (err) {
      console.error(err);
    }
  };

  const loadBreeds = async () => {
    const dogs = await getAllBreeds();
    setAllBreeds(dogs.breeds);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setCityName("");

    setBreedName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    let filteredDogsData = await getFilteredDogs(
      typeof value === "string" ? value.split(",") : value,
      dogAge
    );

    let sortedDogsData = filteredDogsData.dogsData.sort((a, b) =>
      a.breed.localeCompare(b.breed)
    );

    if (sort === "Descending") {
      sortedDogsData = sortedDogsData.reverse();
    }

    setListOfDogs(sortedDogsData);

  };

  const handleSortChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value === "Descending" && sort === "Ascending") {
      setListOfDogs(listOfDogs.reverse());
    } else if (value === "Ascending" && sort === "Descending") {
      setListOfDogs(listOfDogs.reverse());
    }
    setSort(
      // On autofill we get a stringified value.
      value
    );
  };

  const handleAgeChange = async (e) => {
    setDogAge(e.target.value);
    setCityName("");

    let filteredDogsData = await getFilteredDogs(breedName, e.target.value);
    let sortedDogsData = filteredDogsData.dogsData.sort((a, b) =>
      a.breed.localeCompare(b.breed)
    );
    if (sort === "Descending") {
      sortedDogsData = sortedDogsData.reverse();
    }
    setListOfDogs(sortedDogsData);
  };

  const handleCityChange = async (e) => {
    setCityName(e.target.value);

    if (e.target.value === "") {
      return;
    }
    let filteredDogsData = await getFilteredDogs("", "", e.target.value, toast);
    let sortedDogsData = filteredDogsData.dogsData.sort((a, b) =>
      a.breed.localeCompare(b.breed)
    );
    if (sort === "Descending") {
      sortedDogsData = sortedDogsData.reverse();
    }

    setListOfDogs(sortedDogsData);
  };

  return (
    <Box>
      <Toaster position="top-center" reverseOrder={false} />
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            menu here
          </IconButton>
          <SearchFilter
            title={"Search By Max Age"}
            handleChange={handleAgeChange}
            type={"number"}
          />
          <SearchFilter
            title={"Search By City"}
            handleChange={handleCityChange}
          />
          <Button variant="contained" onClick={() => logoutUser(navigate)}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main">
        <Toolbar />

        <Container maxWidth="xl">
          <Box sx={{ width: "100%", textAlign: "right", mt: "40px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ textAlign: "left" }}>
                <Dropdown
                  dropdownTitle={"Sort"}
                  data={["Ascending", "Descending"]}
                  handleChange={handleSortChange}
                  value={[sort]}
                />
                <Typography variant="p">For Sorting By Breed</Typography>
              </Box>

              <Dropdown
                dropdownTitle={"Breeds"}
                data={allBreeds}
                handleChange={handleChange}
                value={breedName}
              />
            </Box>
          </Box>
          <InfiniteScroll
            dataLength={listOfDogs.length}
            next={loadDogs}
            hasMore={true}
            loader={
              cityName ? (
                <Button
                  variant="contained"
                  onClick={() => loadDogs()}
                  sx={{ mt: "30px" }}
                >
                  Load Dogs
                </Button>
              ) : (
                <h3>Loading More Dogs...</h3>
              )
            }
          >
            <Box
              ref={containerRef}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                justifyContent: "space-between",
                rowGap: "40px",
                mt: "50px",
              }}
            >
              {listOfDogs.map((dogData, index) => (
                <DogsCard key={index} dogData={dogData} />
              ))}
            </Box>
          </InfiniteScroll>
        </Container>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
