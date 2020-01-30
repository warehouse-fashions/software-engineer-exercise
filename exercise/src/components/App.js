import React from "react";
import Recommendation from "./Recommendation";
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
                  <div key={keyVal} className="col-4 col-md-3 col-lg-3 m-3">
                      <Recommendation data={recommendation} />
                  </div>
                );
            }
          return <div key={keyVal}></div>
        })
        return recommendations;
      }
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-4 text-center">WE RECOMMEND</h1>
        <div className="row">
            {this.renderRecommendations()}
        </div>
      </div>
    );
  }
}

export default App;