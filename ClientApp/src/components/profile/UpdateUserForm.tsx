import React, { Component, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoggedInUser, Skillset, UserType } from "../../models/user/LoggedInUser";
import { GetCurrentUser, UpdateUserAsync } from "../../services/UserService";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import CurrencyInput from 'react-currency-input-field';


const UpdateUserForm = () =>  {
  const  { getAccessTokenSilently, user } = useAuth0();
  const [currentUser, setCurrentUser] = useState<LoggedInUser>();
  const [accessToken, setAccessToken] = useState("");

  const [editableParamProps, setEditableParamProps] = useState<LoggedInUser>({
    id: 0,
    userType: undefined,
    userName: "",
    phoneNumber: undefined,
    email: user?.email == undefined ? "" : user.email,
    skillSet: undefined,
    zip: "",
    userRate: undefined
});

  useEffect(() => {
    (async () => {
      await getAccessTokenSilently().then(async (token) => {
        setAccessToken(token);
        await GetCurrentUser(token, user?.email).then(async (currentUser: LoggedInUser) => {
          console.log(currentUser);
          setCurrentUser(currentUser);
          setEditableParamProps({id:currentUser.id,
            userType: currentUser.userType,
            userName: currentUser.userName,
            phoneNumber: currentUser.phoneNumber,
            email: currentUser.email,
            skillSet: currentUser.skillSet,
            zip: currentUser.zip,
            userRate: currentUser.userRate
        });
        });
      });
    })();
  }, []);

  const SaveUser = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    let updateUserRequest: LoggedInUser  = editableParamProps;
    console.log(updateUserRequest);
    await UpdateUserAsync(accessToken, updateUserRequest).then((response:LoggedInUser) => {
      console.log(response);
    });
  }

  return(
    <>
      <Form onSubmit = {SaveUser}>
        <Row>
          <Col>
            <h5>User Profile</h5>
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
                value={editableParamProps?.phoneNumber}
                onChange={(e) =>
                  setEditableParamProps((editableParamProps) => ({
                    ...editableParamProps,
                    ...{ phoneNumber: e.target.value }
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
          <FormGroup>
            <Col md={4}>
              <Label for="zip">Rate ($USD)</Label>
              <Input
                id="izip"
                name="zip"
                type="number"
                value={editableParamProps?.userRate}
                onChange = {(e) => 
                  setEditableParamProps((editableParamProps) => ({
                  ...editableParamProps,
                  ...{userRate: e.target.valueAsNumber}
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
                key="client"
                checked = {editableParamProps.userType == 1}
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
                key="professional"
                value={editableParamProps?.userType}
                checked = {editableParamProps.userType == 2}
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
            (Object.values(Skillset).filter((v) => isNaN(Number(v)), ) as (keyof typeof Skillset)[]).map((x, i) => {
                return (
                  <FormGroup check>
                    <Input
                      type="radio"
                      key={i}
                      checked = {editableParamProps.skillSet == Skillset[x as keyof typeof Skillset]}
                      name="skillset"
                onClick = {(e) => 
                  setEditableParamProps((editableParamProps) => ({
                  ...editableParamProps,
                  ...{skillSet: Skillset[x as keyof typeof Skillset] }
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

export default UpdateUserForm;

