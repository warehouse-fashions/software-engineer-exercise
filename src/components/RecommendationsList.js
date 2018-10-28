import React from 'react';

import jsonData from '../../data/recommendations.json';

class RecommendationsList extends React.Component {
  constructor() {
    super();
    this.state = {
      postData: [],
      image: []
    };
  }

  componentDidMount() {
    Object.values(jsonData).forEach((postData) => {
      this.setState({ postData });
    });
  }

  render() {
    console.log(this.state);
    console.log(this.state.postData.image);
    return (


      <main>
        <section>
          {this.state.postData.image && this.state.postData.image.map(dataImage =>
            <div key={dataImage.i}>
              <div className="card-image">
                <figure className="image">
                  <img src={dataImage.link} />
                </figure>
              </div>
            </div>
          )}
          {this.state.postData.map(data =>
            <div key={data.id} className="column is-one-quarter-desktop is-half-tablet is-mobile">
              <div className="content-info">
                <h2 className="title is-6 data-title">{data.product_name}</h2>
                <h2 className="title is-6 data-title">{data.price}</h2>
              </div>
            </div>
          )}
        </section>
      </main>

    );
  }
}
export default RecommendationsList;
