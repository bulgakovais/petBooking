import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCities } from "../../store/search/actions";
import {
  selectCities,
  selectCitiesError,
  selectCitiesLoading,
} from "../../store/search/selector";
import dog4 from "../../assets/images/dog4.png";
import { Autocomplete, Select, MenuItem } from "@mui/material";

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { cityId } = useParams();
  const params = useParams();
  // console.log(params);
  const cityId = params.cityId;
  // console.log(cityId);

  const citiesFromDB = useSelector(selectCities);
  const loading = useSelector(selectCitiesLoading);
  const error = useSelector(selectCitiesError);

  const cities = {
    options: citiesFromDB,
    getOptionLabel: (option) => option.city,
  };
  const [city, setCity] = useState(cityId ? cityId : 0);

  const [cityInput, setCityInput] = useState(
    cityId ? citiesFromDB.find((el) => el.id === Number(cityId).city) : ""
  );

  const handlerChangeCity = (event, newValue) => {
    setCity(newValue ? newValue.id : "");
  };
  const handlerOnInputChangeCity = (event, newInputValue) => {
    setCityInput(newInputValue);
  };

  // ____Pet size____

  const pet_size = params.pet_size;
  // console.log(pet_size);
  const [size, setSize] = useState(pet_size ? pet_size : "");
  // console.log(size);
  const handlerChangeSize = (event, newSize) => {
    // console.log(newSize.props.value);
    setSize(newSize.props.value ? newSize.props.value : "");
  };

  // console.log(size);
  const handlerSubmit = (event) => {
    event.preventDefault();
    size !== "" && size
      ? navigate(`/search/${city}/${size}`)
      : navigate(`/search/${city}`);
  };

  useEffect(() => {
    dispatch(getCities());
  }, [cityId]);

  if (!citiesFromDB || error) {
    return (
      <div
        className="page-wrapper container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h3>Упс, что-то пошло не так...</h3>
      </div>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="home-content">
          <div className="home-page">
            <div className="home-title">
              <h1 className="home-title__brand">Pet Booking</h1>
              <h2>Позаботимся о вашем питомце в ваше отсутствие! ❤️</h2>
            </div>
            <div className="home-img">
              <img src={dog4} alt="dog" />
            </div>
          </div>
          <form className="index-form" onSubmit={handlerSubmit}>
            <div className="index-form__flexWrapper">
              <div className="text-field datalist">
                <label
                  className="text-field__label text-caps text-center"
                  htmlFor="city"
                >
                  Город
                </label>

                <Autocomplete
                  {...cities}
                  value={cities.options.find((el) => el.id === Number(cityId))}
                  onChange={handlerChangeCity}
                  inputValue={cityInput}
                  onInputChange={handlerOnInputChangeCity}
                  id="city"
                  loading={loading}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        required
                        placeholder="Выберите город"
                        className="text-field__input datalist"
                      />
                    </div>
                  )}
                />
              </div>

              <div className="text-field text-field__margin">
                <label
                  className="text-field__label text-caps text-center"
                  htmlFor="size"
                >
                  Размер
                </label>

                <Select
                  className="text-field__select"
                  id="size"
                  displayEmpty
                  defaultValue={pet_size ? pet_size : ""}
                  onChange={handlerChangeSize}
                  MenuProps={{
                    sx: {
                      "&& .MuiPaper-root": {
                        boxShadow:
                          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                      },
                      // "&& .Mui-selected": {
                      //   backgroundColor: "rgba(255, 166, 0, 0.276)",
                      // },
                      // "&& li:hover": {
                      //   backgroundColor: "rgba(255, 166, 0, 0.116)",
                      // },
                    },
                  }}
                  sx={{
                    padding: "0px",
                  }}
                >
                  <MenuItem value="">
                    <em>Выберите размер</em>
                  </MenuItem>
                  <MenuItem value="1">Mini (до 3 кг)</MenuItem>
                  <MenuItem value="2">Small (3-5 кг)</MenuItem>
                  <MenuItem value="3">Medium (5-10 кг)</MenuItem>
                  <MenuItem value="4">Big (более 10 кг)</MenuItem>
                </Select>
              </div>
            </div>
            <button type="submit" className="btn btn-search" value="НАЙТИ">
              НАЙТИ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
