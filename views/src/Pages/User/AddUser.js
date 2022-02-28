import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
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
import { checkIfValidEmail } from "../../Helpers/utils";
import { addUser } from "../../Store/user/actions";

const AddUser = () => {
  const Users = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [interest, setInterest] = useState("Sports");
  const [disableSubmit, setDisableSubmit] = useState("Sports");
  const handleAddClick = () => {
    navigate({ pathname: "/user-list" });
  };

  useEffect(() => {
    if (
      // image == "" ||
      name == "" ||
      password == "" ||
      gender == "" 
      // description == ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [image, name, password, gender, description]);

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
      addUser({
        formData: formData,
        callback: () => navigate("/user-list"),
      })
    );
  };

  console.log(emailError);

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

  const interests = ["Sports", "Technology", "News", "Music", "Movies"];

  return (
    <div className="container my-5">
      <button className="btn  mb-5" onClick={handleAddClick}>
        {`<< Go Back`}{" "}
      </button>
      <h3>Add User</h3>

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
            {
              password.length > 0 && confirmPassword.length > 0 && passwordError &&
            <p className="text-danger">{passwordError}</p>
            }

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
            {
              email.length > 0 &&  emailError &&
            <p className="text-danger">{emailError}</p>
            }

            {/* <FormGroup className="col-lg-4">
              <Label>Profile Image </Label>
              <Input
                type="file"
                name="image"
                fileName="profileImage"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormGroup> */}

            <label className="seller-form-control-label">Profile Image</label>
            <div class="input-group input-group-icon mb-4">
              <div className="seller-form-group focused ">
                <input
                  type="file"
                  fileName="profileImage"
                  accept=".jpg, .jpeg, .png"
                  className="pl-0 pt-2  "
                  style={{
                    userSelect: "none",
                  }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
         
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
              Submit
            </button>
          </Form>
        </Col>
      </Row>
      {Users?.loading && <Loader darkBg={true} />}

    </div>
  );
};

export default AddUser;
