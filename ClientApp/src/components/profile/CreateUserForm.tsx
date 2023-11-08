import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useEffect, useState } from "react";
import { Col, Input, Label, Row, Form, FormGroup, Button } from "reactstrap";
import { LoggedInUser, Skillset, UserType } from "../../models/user/LoggedInUser";
import { CreateUserAsync } from "../../services/UserService";

const CreateUserForm:React.FC = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");

    const [editableParamProps, setEditableParamProps] = useState<LoggedInUser>({
        userId: "",
        userType: undefined,
        userName: "",
        phone: undefined,
        email: user?.email == undefined ? "" : user.email,
        skillset: undefined,
        zip: "",
        userRate: undefined
    });

    useEffect(() => {
        (async () => {
          await getAccessTokenSilently().then(async (token) => {
            setAccessToken(token);
          });
        })();
      }, []);
    
    const CreateUser = async (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      let createUserRequest: LoggedInUser  = editableParamProps;
      console.log(createUserRequest);
      await CreateUserAsync(accessToken, createUserRequest).then((response:LoggedInUser) => {
        console.log(response);
      });
    }
      return(
        <>
          <Form onSubmit = {CreateUser}>
            <Row>
              <Col>
                <h5>Create User Profile</h5>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="email">Email</Label>
                  <Input
                    id="iemail"
                    name="email"
                    type="text"
                    value={editableParamProps?.email}
                    onChange = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{email: editableParamProps?.email }
                    })) 
                  }
                  >
                  </Input>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="username">Username</Label>
                  <Input
                    id="iusername"
                    name="username"
                    type="text"
                    value={editableParamProps?.userName}
                    onChange = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{userName: e.target.value }
                    })) 
                  }
                  >
                  </Input>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="phone">Phone</Label>
                  <Input
                    id="iphone"
                    name="phone"
                    type="number"
                    value={editableParamProps?.phone}
                    onChange={(e) =>
                      setEditableParamProps((editableParamProps) => ({
                        ...editableParamProps,
                        ...{ phone: e.target.valueAsNumber }
                  }))
                  }
                  >
                  </Input>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Col md={4}>
                  <Label for="zip">Zip Code</Label>
                  <Input
                    id="izip"
                    name="zip"
                    type="number"
                    value={editableParamProps?.zip}
                    onChange = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{zip: e.target.value }
                    })) 
                  }
                  >
                  </Input>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              <Label for="usertype">Are You A...</Label>
              <Col md={4}>
              <FormGroup
                check
               
              >
                  <Input
                    type="radio"
                    name="usertype"
                    value={editableParamProps?.userType}
                    onClick = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{userType: UserType.Client }
                    })) 
                  }
                  />
                  <Label check>
                    Client
                  </Label>
             </FormGroup>
             <FormGroup
                check
             
              >
                  <Input
                    type="radio"
                    name="usertype"
                    value={editableParamProps?.userType}
                    onClick = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{userType: UserType.Professional }
                    })) 
                  }
                  />
                  <Label check>
                    Professional
                  </Label>
              </FormGroup>
              </Col>
              </Row>
              {editableParamProps.userType == UserType.Professional && 
                <>
                <Row>
                    <Label for="skillset">What is your Skillset?</Label>
                </Row>
              <Row>
                <Col>
              {
                Object.values(Skillset).map((x,i) => {
                    return (
                      <FormGroup check>
                        <Input
                          type="radio"
                          key={i}
                          name="skillset"
                    onClick = {(e) => 
                      setEditableParamProps((editableParamProps) => ({
                      ...editableParamProps,
                      ...{skillset: i }
                    })) 
                  }
                  />
                  <Label check>
                    {x}
                  </Label>
              </FormGroup>
                    )
                  })
                }
                </Col>
              </Row>
              </>
              }
              <Row>
                <Col md={2}>
                <Button color="primary" type="submit">Submit</Button>
                </Col>
              </Row>
          </Form>
        </>
      );
};

 export default CreateUserForm;