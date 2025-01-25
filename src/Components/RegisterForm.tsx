import { FC, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import avatarImg from "../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import AuthClient, { RegisterData } from "../services/auth-service";
import { uploadImg } from "../services/upload-service";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const googleResponseMessage = (credentialResponse: CredentialResponse) => {
  console.log("Google Response Error");
  console.log(credentialResponse);
};

const googleErrorMessage = () => {
  console.log("Google Error");
};

const schema = z.object({
  Username: z.string().min(3, "Username must be at least 3 characters"),
  Password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  picture: z.string().url("Invalid URL").optional(),
});

type FormData = z.infer<typeof schema>;

const RegisterForm: FC = () => {
  const { register, handleSubmit, formState, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(avatarImg);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (formState.errors.picture) {
      setValue("picture", avatarImg);
    }
  }, [formState.errors.picture, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageSrc(URL.createObjectURL(selectedFile));
    }
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImageSrc(avatarImg);
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const imgUrl = file ? await uploadImg(file) : avatarImg;
      setImageSrc(imgUrl);
      const regData: RegisterData = {
        email: data.email,
        password: data.Password,
        username: data.Username,
        photo: imgUrl,
      };
      const { request } = AuthClient.authRegister(regData);
      request
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #d0eaff, #f7d6f9, #fff4c2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "50%",
          maxWidth: "700px",
          background: "#ffffff",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
        <Logo />
        </div>

        <div className="d-flex justify-content-center position-relative">
          <div
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              border: "2px solid #ccc",
              marginBottom: "60px",
            }}
          >
            <img
              style={{ height: "100%", width: "100%" }}
              src={imageSrc}
              alt="profile"
            />
          </div>
          <Dropdown
            className="position-absolute"
            style={{
              bottom: "5px",
              left: "59%",
              zIndex: 10,
              marginBottom: "60px",
            }}
          >
            <Dropdown.Toggle
              bsPrefix="custom-dropdown-toggle"
              variant="light"
              id="dropdown-basic"
              className="btn border border-dark shadow-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "gray",
                borderRadius: "50%",
                fontSize: "1.1rem",
                width: "45px",
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={handleClick}>
                <FontAwesomeIcon icon={faImage} className="me-2" />
                Upload New Photo
              </Dropdown.Item>
              {file && (
                <Dropdown.Item
                  onClick={handleRemoveImage}
                  className="text-danger"
                >
                  Remove Photo
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <input
          type="file"
          {...register("picture")}
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-2  justify-content-center"
          style={{ width: "70%", margin: "auto" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              id="email"
              placeholder="Enter your email"
              style={{
                width: "95%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            {formState.errors.email && (
              <span className="text-danger">
                {formState.errors.email.message}
              </span>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              {...register("Username", { required: "Username is required" })}
              id="username"
              placeholder="Choose a username"
              style={{
                width: "95%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            {formState.errors.Username && (
              <span className="text-danger">
                {formState.errors.Username.message}
              </span>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              {...register("Password", { required: "Password is required" })}
              id="password"
              placeholder="Enter a password"
              style={{
                width: "95%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            {formState.errors.Password && (
              <span className="text-danger">
                {formState.errors.Password.message}
              </span>
            )}
          </div>
          
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
             
            }}
          >
          Sign Up
          </button>
          <GoogleLogin
            onSuccess={googleResponseMessage}
            onError={googleErrorMessage}
           
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;