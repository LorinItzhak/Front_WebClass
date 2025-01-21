import avatarImg from "../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthClient, { RegisterData } from "../services/auth-service";
import { uploadImg } from "../services/upload-service";

interface FormData {
  photo: FileList;
  username: string;
  email: string;
  password: string;
}

function Registration() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (file) {
      try {
        const imgUrl = await uploadImg(file);
        setImageSrc(imgUrl);
        const regData: RegisterData = {
          email: data.email,
          password: data.password,
          photo: imgUrl
        };
        const { request } = AuthClient.authRegister(regData);
        request.then(res => {
          console.log(res);
        }).catch(e => {
          console.log(e);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="vstack gap-2 col-md-6 mx-auto">
      <h1 className="d-flex justify-content-center">Register</h1>
      <div className="d-flex justify-content-center position-relative">
        <div
          style={{
            height: "200px",
            width: "200px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {file ? (
            <img
              style={{ height: "200px", width: "200px" }}
              src={URL.createObjectURL(file)}
              alt="profile"
            />
          ) : (
            <img src={avatarImg} alt="profile" className="img-fluid" />
          )}
          <div className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1">
            <button type="button" className="btn" onClick={handleClick}>
              <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </button>
          </div>
        </div>
      </div>
      <input
        type="file"
        {...register("photo")}
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2">
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
          className="form-control"
          placeholder="Username"
        />
        {errors.username && <span className="text-danger">{errors.username.message}</span>}

        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="form-control"
          placeholder="Email"
        />
        {errors.email && <span className="text-danger">{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="form-control"
          placeholder="Password"
        />
        {errors.password && <span className="text-danger">{errors.password.message}</span>}

        <button type="submit" className="btn btn-outline-secondary">SignUp</button>
      </form>
    </div>
  );
}

export default Registration;
