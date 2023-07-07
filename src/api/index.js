import axios from "axios";

export const loginUser = async (name, email, navigate) => {
  try {
    let accessTokenResponse = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      {
        name: name,
        email: email,
      },
      { withCredentials: true }
    );
    if (accessTokenResponse.data) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", name);
      navigate("/home");
    }
  } catch (err) {}

  // return accessTokenResponse;
};

export const getAllDogs = async (next, breed) => {
  try {
    let dogsId;
    let dogsIdsApiPath = `/dogs/search`;

    if (next) {
      dogsIdsApiPath = next;
      if (breed.length) {
        dogsIdsApiPath = dogsIdsApiPath + `&breeds=${breed}`;
      }
    } else {
      if (breed.length) {
        dogsIdsApiPath = dogsIdsApiPath + `?breeds=${breed}`;
      }
    }
    dogsId = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}${dogsIdsApiPath}`,

      { withCredentials: true, crossDomain: true }
    );

    let dogsData = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/dogs`,
      dogsId.data.resultIds,

      { withCredentials: true, crossDomain: true }
    );
    return { dogsData: dogsData.data, next: dogsId.data?.next, message: "OK" };
  } catch (err) {
    return { dogsData: [], next: "", message: err.response.data };
  }
};

export const getFilteredDogs = async (breed, age, city, toast) => {
  debugger;
  try {
    if (!breed && !age && !city) {
      return;
    }

    let convertedBreed = breed ? breed.join(",") : "";
    let dogsId;
    let dogsIdsApiPath;

    if (city) {
      let dogsByCity = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/locations/search`,
        { city: city },

        { withCredentials: true, crossDomain: true }
      );

      let zipCodes = dogsByCity.data.results.map((data) => {
        return data.zip_code;
      });
      try {
        if (zipCodes.length > 0) {
          let dogsResultIds = [];
          for (var i = 0; i < zipCodes.length; i++) {
            dogsIdsApiPath = "";

            if (dogsIdsApiPath && dogsIdsApiPath.includes("?")) {
              dogsIdsApiPath = dogsIdsApiPath + `&zipCodes=${zipCodes[i]}`;
            } else {
              dogsIdsApiPath = `/dogs/search?zipCodes=${zipCodes[i]}`;
            }
            let locationWiseDogs = await axios.get(
              `${process.env.REACT_APP_SERVER_URL}${dogsIdsApiPath}`,

              { withCredentials: true, crossDomain: true }
            );

           
            dogsResultIds = [
              ...dogsResultIds,
              ...locationWiseDogs.data.resultIds,
            ];

            
          }

          let dogsData = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/dogs`,
            dogsResultIds,

            { withCredentials: true, crossDomain: true }
          );
          if (dogsData.data.length === 0) {
            toast.error("No Dogs Found Within this City");
          }
          return {
            dogsData: dogsData?.data,
            next: dogsId?.data?.next,
            message: "OK",
          };

          // zipCodes=zipCodes.join(",")
        } else {
          return { dogsData: [], next: "", message: "OK" };
        }
      } catch (err) {
        return { dogsData: [], next: "", message: "OK" };
      }

      // return dogsByCity;
    }

    if (breed.length > 0) {
      dogsIdsApiPath = `/dogs/search?breeds=${convertedBreed}`;
    }

    if (age) {
      if (dogsIdsApiPath && dogsIdsApiPath.includes("?")) {
        dogsIdsApiPath = dogsIdsApiPath + `&ageMax=${age}`;
      } else {
        dogsIdsApiPath = `/dogs/search?ageMax=${age}`;
      }
    }

    dogsId = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}${dogsIdsApiPath}`,

      { withCredentials: true, crossDomain: true }
    );

    let dogsData = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/dogs`,
      dogsId?.data.resultIds,

      { withCredentials: true, crossDomain: true }
    );
    return {
      dogsData: dogsData?.data,
      next: dogsId?.data?.next,
      message: "OK",
    };
  } catch (err) {
    console.log("The error here is", err);
    return {
      dogsData: [],
      next: "",
      message: err.response ? err?.response?.data : "Error",
    };
  }
};

export const getAllBreeds = async () => {
  try {
    let dogsBreeds = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/dogs/breeds`,

      { withCredentials: true, crossDomain: true }
    );
    return { breeds: dogsBreeds.data, message: "OK" };
  } catch (err) {
    return { breeds: [], message: err.response.data };
  }
};

export const logoutUser = async (navigate) => {
  await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
    {},
    { withCredentials: true, crossDomain: true }
  );
  navigate("/");
};
