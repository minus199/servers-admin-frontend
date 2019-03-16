import React, { Component } from 'react';
import ServerList from './components/ServerList';
import MainBar from './components/MainBar';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: "none",
      activeSort: "none",
      servers: [],
      lastUpdate: null
    }
  }

  componentDidMount() {
    fetch("/servers")
      .then(response => response.json())
      .then(servers => this.setState({
        servers,
        lastUpdate: Date.now()
      }));
  }

  handleChangeFilter = activeFilter => this.setState({ activeFilter: activeFilter === this.state.activeFilter ? "none" : activeFilter })
  handleChangeSorted = activeSort => this.setState({ activeSort: activeSort === this.state.activeSort ? "none" : activeSort })
  handleToggleServerStatus = server => {
    server.isActive = !server.isActive;
    const reqBody = JSON.stringify({ isActive: server.isActive });
    fetch(`/servers/${server.externalId}`, {
      method: 'PATCH', 
      body: reqBody, 
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json()).then(updateServer => {
      // server is the reference to the server instance that is in the list of servers inside the state
      // we update the reference, and then trigger re-rendering by only changing a small thing in the state(lastUpdated)
      // this is instead of re-creating the entire array of servers
      server.created = updateServer.created;
      server.updated = updateServer.updated;
      this.setState({ lastUpdate: Date.now() });
    })
  }

  render() {
    return (
      <div className="App">
        <MainBar
          lastUpdate={this.state.lastUpdate}
          filterBy={this.state.activeFilter}
          sortBy={this.state.activeSort}
          // this is 2 way binding
          handleChangeFilter={this.handleChangeFilter}
          handleChangeSorted={this.handleChangeSorted}
        />

{/* TODO: paginate list(show only 10 items each time, and add previous page/next page navigation buttons) */}
{/* Bonus: let the server do the pagination for the client */}
        <ServerList
          servers={this.state.servers}
          lastUpdate={this.state.lastUpdate}
          filterBy={this.state.activeFilter}
          sortBy={this.state.activeSort}
          handleToggleServerStatus={this.handleToggleServerStatus}
        />
      </div>
    );
  }
}

export default App;
