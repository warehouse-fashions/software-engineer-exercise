import React from "react";
import Recommendation from "./Recommendation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/main.scss";

class App extends React.Component {
  state = {
    recommendationsData: []
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    fetch("data/recommendations.json")
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({
        recommendationsData: data.hits
      });
    })
    .catch(err => console.log(err));
  }

  renderRecommendations = () => {
      const data = this.state.recommendationsData;

      if(data.length > 0){
        const recommendations = data.map((recommendation, keyVal) => {
            if(recommendation.image){
                return (
                  <Col key={keyVal} xs={12} sm={6} md={4} lg={3} m={3}>
                      <Recommendation data={recommendation} />
                  </Col>
                );
            }
          return <div key={keyVal}></div>
        })
        return recommendations;
      }
  }

  render() {
    return (
      <Container>
        <h1 className="custom_main_title">WE RECOMMEND</h1>
        <Row className="show-grid">
          {this.renderRecommendations()}
        </Row>
      </Container>
    );
  }
}

export default App;