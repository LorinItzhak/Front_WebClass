import { FC, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import avatarImg from "../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPen } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import AuthClient, { RegisterData } from "../services/auth-service";
import { uploadImg } from "../services/upload-service";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const authGoogleLogin = () => {
  window.location.href = "http://localhost:3003/users/google"; // הפניה ישירה לאימות
};

const googleResponseMessage = async (
  credentialResponse: CredentialResponse,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (credentialResponse.credential) {
    try {
      console.log("Received Google Credential:", credentialResponse);
      authGoogleLogin(); // הפניה להתחברות ישירה דרך Google
      navigate("/");
    } catch (error) {
      console.error("Google Authentication Failed:", error);
    }
  }
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

  const handleClick = () => hiddenFileInput.current?.click();

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
    <div className="register-container">
      <div className="register-card">
        <div style={{ marginBottom: "30px" }}>
          <Logo />
        </div>

        <div className="d-flex justify-content-center position-relative">
          <div className="profile-image-container">
            <img className="profile-image" src={imageSrc} alt="profile" />
          </div>
          <Dropdown className="position-absolute dropdown-edit">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdown-toggle-btn">
              <FontAwesomeIcon icon={faPen} />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={handleClick}>
                <FontAwesomeIcon icon={faImage} className="me-2" />
                Upload New Photo
              </Dropdown.Item>
              {file && (
                <Dropdown.Item onClick={handleRemoveImage} className="text-danger">
                  Remove Photo
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <input type="file" {...register("picture")} onChange={handleChange} ref={hiddenFileInput} style={{ display: "none" }} />

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <input type="email" {...register("email")} placeholder="Enter your email" className="input-field" />
          {formState.errors.email && <span className="error-text">{formState.errors.email.message}</span>}

          <input type="text" {...register("Username")} placeholder="Choose a username" className="input-field" />
          {formState.errors.Username && <span className="error-text">{formState.errors.Username.message}</span>}

          <input type="password" {...register("Password")} placeholder="Enter a password" className="input-field" />
          {formState.errors.Password && <span className="error-text">{formState.errors.Password.message}</span>}

          <button type="submit" className="submit-btn">Sign Up</button>

          <GoogleLogin onSuccess={(credentialResponse) => googleResponseMessage(credentialResponse, navigate)} onError={() => console.log("Google Authentication Error")} />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
