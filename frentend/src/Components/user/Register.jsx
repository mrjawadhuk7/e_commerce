import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../Layouts/loading/Loading";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/images/kakhasiHatake.jpg"); // ✅ default avatar

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  // ✅ handle avatar change
  const onChange = (event) => {
    if (event.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result); // preview update
          setAvatar(event.target.files[0]); // file set
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // ✅ handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    dispatch(register(formData));
  };

  // ✅ useEffect for navigation and error handling
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
      return;
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        autoClose: 3000,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError());
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="shadow-lg"
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview} // ✅ default or uploaded preview
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange} // ✅ only onChange
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? <Loading /> : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
