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

    return (

      <main>
        <section>
          <div className="columns is-multiline">
            {this.state.postData.map(data =>
              <div key={data.id} className="column is-one-quarter-desktop is-half-tablet is-mobile">
                <div className="card-image">
                  <figure className="image">
                    <img src={data.image} />
                  </figure>
                </div>
                <div className="content-info">
                  <h2 className="title is-6 data-title">{data.product_name}</h2>
                  <h2 className="title is-6 data-title">{data.price}</h2>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

    );
  }
}
export default RecommendationsList;
