import { Autocomplete, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addPhoto,
  editAccount,
  getAccountFromDB,
  getAllCities,
} from "../../store/account/actions";
import {
  selectAccount,
  selectAccountError,
  selectAccountLoading,
  selectAllCities,
  selectAllCitiesLoading,
  selectEditLoading,
  selectEditSuccess,
} from "../../store/account/selector";
import { getToken } from "../../store/userAuth/selectors";
import avatar from "../../assets/images/avatar.jpg";
import { API_URL } from "../../store/storeConstants";

export const AccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(getToken);
  const loading = useSelector(selectAccountLoading);

  const editSuccess = useSelector(selectEditSuccess);
  const editLoading = useSelector(selectEditLoading);

  const baseURL = API_URL.slice(0, -6);

  const accountFromDB = useSelector(selectAccount);
  const errorDB = useSelector(selectAccountError);
  const citiesFromDB = useSelector(selectAllCities);
  const citiesLoading = useSelector(selectAllCitiesLoading);
  const cities = {
    options: citiesFromDB,
    getOptionLabel: (option) => option.city,
  };
  const [account, setAccount] = useState(accountFromDB);
  const [petSize, setPetSize] = useState({
    mini: account.petSize ? account.petSize.includes("mini") : true,
    small: account.petSize ? account.petSize.includes("small") : false,
    medium: account.petSize ? account.petSize.includes("medium") : false,
    big: account.petSize ? account.petSize.includes("big") : false,
  });
  const [cityInput, setCityInput] = useState(account.locations);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const [errorPetSize, setErrorPetSize] = useState({ color: "none" });

  useEffect(() => {
    if (!accountFromDB) {
      dispatch(getAccountFromDB(token));
    }
    dispatch(getAllCities());
  }, [accountFromDB, token]);

  useEffect(() => {
    if (editSuccess) {
      navigate(`/account`);
    }
  }, [editSuccess]);

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (loading || citiesLoading || editLoading) {
    return (
      <div
        className="page-wrapper container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CircularProgress size={60} />
      </div>
    );
  }

  if (!account || errorDB) {
    return (
      <div
        className="page-wrapper container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h3>Упс, что-то пошло не так...</h3>
      </div>
    );
  }

  const handlerChangeName = (event) => {
    setAccount({
      ...account,
      name: event.target.value,
    });
  };

  const handlerChangeDescription = (event) => {
    setAccount({
      ...account,
      description: event.target.value,
    });
  };

  const handlerChangePetSize = (event) => {
    setErrorPetSize({ border: "none" });
    setPetSize({
      ...petSize,
      // [event.target.name]: event.target.checked,
      [event.target.value]: event.target.checked,
    });
  };

  const handlerChangeOtherAnimals = (event) => {
    setAccount({
      ...account,
      otherAnimals: Number(event.target.value),
    });
  };

  const handlerChangeCity = (event, newValue) => {
    setAccount({
      ...account,
      locations: newValue ? newValue.id : "",
    });
  };
  const handlerOnInputChangeCity = (event, newInputValue) => {
    setCityInput(newInputValue);
  };

  const handlerChangeAddress = (event) => {
    setAccount({
      ...account,
      address: event.target.value,
    });
  };

  const handlerChangePhone = (event) => {
    setAccount({
      ...account,
      phone: event.target.value,
    });
  };

  const handlerChangeRole = (event) => {
    setAccount({
      ...account,
      role: Number(event.target.value),
    });
  };

  const handlerChangePhoto = (event) => {
    // console.log(event.target.files[0]);
    if (!event.target.files || event.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(event.target.files[0]);
  };

  const handlerDeletePhoto = (event) => {
    setFile(undefined);
    setAccount({
      ...account,
      img: "",
    });
  };

  const handlerRevokePhoto = (event) => {
    setFile(undefined);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    const petSizeNew = Object.keys(petSize)
      .filter((key) => petSize[key] === true)
      .map((el) => {
        if (el === "mini") {
          return 1;
        } else if (el === "small") {
          return 2;
        } else if (el === "medium") {
          return 3;
        } else if (el === "big") {
          return 4;
        }
        return 0;
      });

    if (account.role.toString() === "2" && petSizeNew.length === 0) {
      setErrorPetSize({
        color: "red",
      });
      return;
    }

    account.petSize = petSizeNew;

    if (isNaN(account.locations)) {
      account.locations = citiesFromDB.find(
        (el) => el.city === account.locations
      ).id;
    }

    // console.log(account);
    const photoFlag = file ? true : false;

    dispatch(editAccount(token, account, photoFlag));
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      dispatch(addPhoto(token, formData));
    }
  };

  return (
    <section className="page-wrapper">
      <form
        className="flex-card-profile"
        method="POST"
        encType="multipart/form-data"
        onSubmit={handlerSubmit}
      >
        <div className="profile-aside">
          {file ? (
            <img src={preview} alt={file.name} />
          ) : account.img ? (
            <img
              src={
                account.img.includes("storage/")
                  ? baseURL + account.img
                  : account.img
              }
              alt={account.name}
            />
          ) : (
            <img src={avatar} alt={account.name} />
          )}

          <div className="review-block">
            <input
              type="file"
              name="img"
              id="img"
              accept="image/*"
              onChange={handlerChangePhoto}
              hidden
            />
            <label
              htmlFor="img"
              className="btn btn-add"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {account.img ? "Изменить фотографию" : "Загрузить фотографию"}
            </label>
          </div>
          {file && (
            <div className="review-block">
              <input
                className="btn btn-add"
                type="button"
                value="Отменить загрузку фотографии"
                onClick={handlerRevokePhoto}
              />
            </div>
          )}
          {account.img && !file && (
            <div className="review-block">
              <input
                className="btn btn-add"
                type="button"
                value="Удалить фотографию"
                onClick={handlerDeletePhoto}
              />
            </div>
          )}
        </div>

        <div className="profile-content">
          <h1 className="text-lev2">Редактирование профиля</h1>
          <div className="form">
            <div className="text-field">
              <label className="text-lev3" htmlFor="name">
                Имя
              </label>
              <input
                className="text-field__input"
                id="name"
                type="text"
                placeholder="Введите свое имя"
                defaultValue={account.name}
                name="name"
                onChange={handlerChangeName}
                required
              />
            </div>
            <div className="text-field">
              <label className="text-lev3" htmlFor="description">
                Обо мне
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={account.description}
                onChange={handlerChangeDescription}
                rows="10"
                placeholder="Введите информацию о себе"
                maxLength="1000"
              ></textarea>
            </div>
            <div className="text-field">
              <label className="text-lev3" htmlFor="sitter">
                Готов сидеть с собакой
              </label>
              <div className="form">
                <input
                  className="custom-radio"
                  type="radio"
                  id="sitter-yes"
                  name="sitter"
                  value="2"
                  onChange={handlerChangeRole}
                  defaultChecked={account.role.toString() === "2"}
                />
                <label htmlFor="sitter-yes">Да</label>
                <input
                  className="custom-radio"
                  type="radio"
                  id="sitter-no"
                  name="sitter"
                  value="0"
                  onChange={handlerChangeRole}
                  defaultChecked={account.role.toString() === "0"}
                />
                <label htmlFor="sitter-no">Нет</label>
              </div>
            </div>
            <div
              className="text-field"
              style={
                account.role.toString() === "2"
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <div className="text-lev3">Спецификация услуги</div>
              <div className="form-hor">
                <div className="form">
                  <label
                    className="text-field__label"
                    htmlFor="petSize"
                    style={errorPetSize}
                  >
                    Размер принимаемой собаки:
                  </label>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="mini"
                    name="petSize"
                    value="mini"
                    checked={petSize.mini}
                    onChange={handlerChangePetSize}
                  />
                  <label htmlFor="mini" style={errorPetSize}>
                    Mini (до 3 кг)
                  </label>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="small"
                    name="petSize"
                    value="small"
                    checked={petSize.small}
                    onChange={handlerChangePetSize}
                  />
                  <label htmlFor="small" style={errorPetSize}>
                    Small (3-5 кг)
                  </label>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="medium"
                    name="petSize"
                    value="medium"
                    checked={petSize.medium}
                    onChange={handlerChangePetSize}
                  />
                  <label htmlFor="medium" style={errorPetSize}>
                    Medium (5-10 кг)
                  </label>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id="big"
                    name="petSize"
                    value="big"
                    checked={petSize.big}
                    onChange={handlerChangePetSize}
                  />
                  <label htmlFor="big" style={errorPetSize}>
                    Big (более 10 кг)
                  </label>
                </div>
                <div className="form">
                  <label className="text-field__label" htmlFor="anypet">
                    Есть другие животные:
                  </label>
                  <input
                    className="custom-radio"
                    type="radio"
                    id="anypet-yes"
                    name="anypet"
                    value="1"
                    onChange={handlerChangeOtherAnimals}
                    defaultChecked={account.otherAnimals.toString() === "1"}
                  />
                  <label htmlFor="anypet-yes">Да</label>
                  <input
                    className="custom-radio"
                    type="radio"
                    id="anypet-no"
                    name="anypet"
                    value="0"
                    onChange={handlerChangeOtherAnimals}
                    defaultChecked={
                      account.otherAnimals.toString() === "0" ||
                      !account.otherAnimals
                    }
                  />
                  <label htmlFor="anypet-no">Нет</label>
                </div>
              </div>
            </div>
            <div className="text-field">
              <label className="text-lev3" htmlFor="city">
                Контакты
              </label>
              <div className="form-hor datalist">
                <Autocomplete
                  {...cities}
                  defaultValue={
                    cities.options &&
                    cities.options.find((el) => el.city === account.locations)
                  }
                  onChange={handlerChangeCity}
                  inputValue={cityInput}
                  onInputChange={handlerOnInputChangeCity}
                  id="city"
                  loading={citiesLoading}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        {...params.inputProps}
                        required
                        placeholder="Введите город"
                        className="text-field__input"
                      />
                    </div>
                  )}
                />
                <input
                  className="text-field__input"
                  id="address"
                  type="text"
                  defaultValue={account.address}
                  name="address"
                  onChange={handlerChangeAddress}
                  placeholder="Введите свой адрес"
                />
              </div>
              <div className="form-hor">
                <input
                  type="text"
                  className="text-field__input mask-phone"
                  placeholder="+79999999999"
                  required={account.role.toString() === "2"}
                  defaultValue={account.phone}
                  name="phone"
                  onChange={handlerChangePhone}
                  pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
                />
                <input className="btn" type="submit" value="Сохранить" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
