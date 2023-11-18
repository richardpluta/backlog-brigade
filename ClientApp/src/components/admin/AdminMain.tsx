import React from "react";
import { Component } from "react";
import AdminUserView from "./AdminUserView";
import AdminListingsView from "./AdminListingsView";
import AdminHelpWantedsView from "./AdminHelpWantedsView";
import AdminReviewsView from "./AdminReviewsView";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";


class AdminMain extends Component {

    render() {
      return (
       <>
        <Row>
          <Col>
            <Card
              outline
            >
                <CardTitle>
                  <h5>
                    Current Users
                  </h5>
                </CardTitle>
                <AdminUserView/>
            </Card>
          </Col>
          <Col>
            <Card
              outline
            >
              <CardTitle>
                  <h5>
                    Current Listings
                  </h5>
                </CardTitle>
              <AdminListingsView/>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card
              outline
            >
              <CardTitle>
                  <h5>
                    Current Help Wanted Ads
                  </h5>
                </CardTitle>
              <AdminHelpWantedsView/>
            </Card>
          </Col>
          <Col>
            <Card
              outline
            >
              <CardTitle>
                  <h5>
                    Current Reviews
                  </h5>
                </CardTitle>
              <AdminReviewsView/>
            </Card>
          </Col>
       </Row>
       </>
      );
    }
  }

  export default AdminMain;