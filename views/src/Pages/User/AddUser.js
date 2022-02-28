import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { addUser } from '../../Store/user/actions';


const AddUser = () => {
    const dispatch =  useDispatch()
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [interest, setInterest] = useState("");
    const handleAddClick=()=>{
        navigate({pathname:"/user-list"})
    }

    const handleSubmit = (e) =>{
      e.preventDefault()


        const data={
          name,
          password,
          email,
          "image":"dfasdfdasdf",
          description,
          gender,
          interest
      }
       
        dispatch(addUser({data:data, callback:()=>navigate("/user-list")}))
      }
    

    const interests = [
        "Sports", "Technology", "News", "Music", "Movies"
    ]
    
    return <div className='container my-5'>
        <button className="btn  mb-5" onClick={handleAddClick}>{`<< Go Back`} </button>
      <h3>Add User</h3>

    <Row>
        <Col className='col-lg-8'>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label >User Name</Label>
          <Input type="text" name="name" placeholder="Enter user name" value={name} onChange={e=>setName(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label >Password </Label>
          <Input type="password" name="password" placeholder="Enter password " value={password} onChange={e=>setPassword(e.target.value)} />
        </FormGroup>


        <FormGroup>
          <Label >Confirm Password </Label>
          <Input type="password" name="password" placeholder="Confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
        </FormGroup>

        <FormGroup>
          <Label >Email </Label>
          <Input type="text" name="email " placeholder="Enter email " value={email} onChange={e=>setEmail(e.target.value)}/>
        </FormGroup>
        
        <FormGroup className='col-lg-4'>
          <Label >Profile Image </Label>
          <Input type="file" name="image"  accept=".jpg, .jpeg, .png"  onChange={e=>setImage(e.target.value)}/>
        </FormGroup>

          <Label >General Description  </Label>
        <FormGroup >
          <textarea cols={96}  rows={8} name="email " value={description} onChange={e=>setDescription(e.target.value)}/>
        </FormGroup>


        <FormGroup tag="fieldset">
        <Label >Gender </Label>

          <FormGroup check>
            <Label check>
              <Input type="radio" name="gender" value="male" onChange={e=>setGender(e.target.value)} />{' '}
              Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="gender" value="female" onChange={e=>setGender(e.target.value)} />{' '}
              Female
            </Label>
          </FormGroup>
        </FormGroup>


        <FormGroup className='col-lg-4'>
          <Label for="interest">Interest</Label>
          <Input type="select" name="select" id="interest" value={interest} onChange={e=>setInterest(e.target.value)}>
          {
              interests.map(interest =>(

            <option>{interest}</option>
              ))
          }</Input>
        </FormGroup>

        <Button>Submit</Button>
      </Form>
        </Col>
    </Row>

  </div>;
};

export default AddUser;
