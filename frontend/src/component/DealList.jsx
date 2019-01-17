import React from 'react';
import axios from 'axios';

export default class DealList extends React.Component {
  state = {
    deals: []
  }

  componentDidMount() {
    axios.get("http://localhost:8080/backend/rest/deal")
      .then(res => {
        const deals = res.data.deal;
        this.setState({ deals });
      })
  }

  render() {
    return (
      <div>
        Deal List
        <ul>
          { this.state.deals.map(deal => <li key={deal.id}>{deal.title}</li>)}
        </ul>
      </div>
    )
  }
}