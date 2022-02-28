import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIfValidEmail } from "../../Helpers/utils";
import {  useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";
import Loader from "../../Components/Loader";
import { editUserByID, getUserByID } from "../../Store/user/actions";

const EditUser = () => {
  const dispatch = useDispatch();
  const match = useParams();
  const Users = useSelector((state) => state.Users);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [interest, setInterest] = useState("");
  const [disableSubmit, setDisableSubmit] = useState("Sports");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleAddClick = () => {
    navigate({ pathname: "/user-list" });
  };

  useEffect(() => {
    dispatch(getUserByID({ id: match?.id }));
  }, [match?.id]);

  useEffect(() => {
    Users?.userDetails?.name && setName(Users?.userDetails?.name);
    Users?.userDetails?.email && setEmail(Users?.userDetails?.email);
    Users?.userDetails?.description &&
      setDescription(Users?.userDetails?.description);
    Users?.userDetails?.gender && setGender(Users?.userDetails?.gender);
    Users?.userDetails?.interest && setInterest(Users?.userDetails?.interest);
    Users?.userDetails?.image && setImage(Users?.userDetails?.image);
    Users?.userDetails?.password && setPassword(Users?.userDetails?.password);
    Users?.userDetails?.password && setConfirmPassword(Users?.userDetails?.password);
  }, [Users?.userDetails]);

  const fileName =
    image && typeof image === "string"
      ? image
      : typeof image == "object"
      ? image?.name
      : "No file chosen";

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImage", image);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("interest", interest);
    formData.append("description", description);

    dispatch(
      editUserByID({
        id: match?.id,
        formData: formData,
        callback: () => navigate("/user-list"),
      })
    );
  };

  useEffect(() => {
    if (email.length != 0 && checkIfValidEmail(email)) {
      setDisableSubmit(false);
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address");
      setDisableSubmit(true);
    }
  }, [email]);  

  useEffect(() => {
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password == confirmPassword
    ) {
      setPasswordError("");
      setDisableSubmit(false);
    } else {
      setPasswordError("Password should match");
      setDisableSubmit(true);
    }
  }, [password,confirmPassword]);

  useEffect(() => {
    if ( name == "" || gender == "" ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [image, name, gender, description]);

  const interests = ["Sports", "Technology", "News", "Music", "Movies"];

  return (
    <div className="container my-5">
      <button className="btn  mb-5" onClick={handleAddClick}>
        {`<< Go Back`}{" "}
      </button>
      <h3>Edit User</h3>

      <Row>
        <Col className="col-lg-8">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <FormGroup>
              <Label>User Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Password </Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            {
              password.length > 0 && confirmPassword.length > 0 && passwordError &&
            <p className="text-danger">{passwordError}</p>
            }

            <FormGroup>
              <Label>Confirm Password </Label>
              <Input
                type="password"
                name="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Email </Label>
              <Input
                type="text"
                name="email "
                placeholder="Enter email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
 
            <label className="seller-form-control-label">Profile Image</label>
            <div class="input-group input-group-icon mb-4">
              <div className="seller-form-group focused edit-file">
                <input
                  type="file"
                  fileName="profileImage"
                  accept=".jpg, .jpeg, .png"
                  className="pl-0 pt-2 pe-auto noselect "
                  style={{
                    userSelect: "none",
                  }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "110px",
                    transition: "right 0.2s",
                    zIndex: "100",
                  }}
                  className="col-lg-6"
                >
                  {fileName}
                </span>
              </div>
            </div>
            <Label>General Description </Label>
            <FormGroup>
              <textarea
                cols={96}
                rows={8}
                name="email "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup tag="fieldset">
              <Label>Gender </Label>

              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender == "male"}
                  />{" "}
                  Male
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender == "female"}
                  />{" "}
                  Female
                </Label>
              </FormGroup>
            </FormGroup>
            <FormGroup className="col-lg-4">
              <Label for="interest">Interest</Label>
              <Input
                type="select"
                name="select"
                id="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                {interests.map((interest) => (
                  <option>{interest}</option>
                ))}
              </Input>
            </FormGroup>
            <button className="btn btn-primary" disabled={disableSubmit}>
              Update
            </button>{" "}
          </Form>
        </Col>
      </Row>
      {Users?.loading && <Loader darkBg={true} />}

    </div>
  );
};

export default EditUser;
