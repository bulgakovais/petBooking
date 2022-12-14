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
        <h3>??????, ??????-???? ?????????? ???? ??????...</h3>
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
              {account.img ? "???????????????? ????????????????????" : "?????????????????? ????????????????????"}
            </label>
          </div>
          {file && (
            <div className="review-block">
              <input
                className="btn btn-add"
                type="button"
                value="???????????????? ???????????????? ????????????????????"
                onClick={handlerRevokePhoto}
              />
            </div>
          )}
          {account.img && !file && (
            <div className="review-block">
              <input
                className="btn btn-add"
                type="button"
                value="?????????????? ????????????????????"
                onClick={handlerDeletePhoto}
              />
            </div>
          )}
        </div>

        <div className="profile-content">
          <h1 className="text-lev2">???????????????????????????? ??????????????</h1>
          <div className="form">
            <div className="text-field">
              <label className="text-lev3" htmlFor="name">
                ??????
              </label>
              <input
                className="text-field__input"
                id="name"
                type="text"
                placeholder="?????????????? ???????? ??????"
                defaultValue={account.name}
                name="name"
                onChange={handlerChangeName}
                required
              />
            </div>
            <div className="text-field">
              <label className="text-lev3" htmlFor="description">
                ?????? ??????
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={account.description}
                onChange={handlerChangeDescription}
                rows="10"
                placeholder="?????????????? ???????????????????? ?? ????????"
                maxLength="1000"
              ></textarea>
            </div>
            <div className="text-field">
              <label className="text-lev3" htmlFor="sitter">
                ?????????? ???????????? ?? ??????????????
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
                <label htmlFor="sitter-yes">????</label>
                <input
                  className="custom-radio"
                  type="radio"
                  id="sitter-no"
                  name="sitter"
                  value="0"
                  onChange={handlerChangeRole}
                  defaultChecked={account.role.toString() === "0"}
                />
                <label htmlFor="sitter-no">??????</label>
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
              <div className="text-lev3">???????????????????????? ????????????</div>
              <div className="form-hor">
                <div className="form">
                  <label
                    className="text-field__label"
                    htmlFor="petSize"
                    style={errorPetSize}
                  >
                    ???????????? ?????????????????????? ????????????:
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
                    Mini (???? 3 ????)
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
                    Small (3-5 ????)
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
                    Medium (5-10 ????)
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
                    Big (?????????? 10 ????)
                  </label>
                </div>
                <div className="form">
                  <label className="text-field__label" htmlFor="anypet">
                    ???????? ???????????? ????????????????:
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
                  <label htmlFor="anypet-yes">????</label>
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
                  <label htmlFor="anypet-no">??????</label>
                </div>
              </div>
            </div>
            <div className="text-field">
              <label className="text-lev3" htmlFor="city">
                ????????????????
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
                        placeholder="?????????????? ??????????"
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
                  placeholder="?????????????? ???????? ??????????"
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
                <input className="btn" type="submit" value="??????????????????" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
