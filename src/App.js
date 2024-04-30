import './App.css'

import {Component} from 'react'

import {v4} from 'uuid'

class App extends Component {
  state = {
    isTrue: false,
    passwordsList: [],
    websiteName: '',
    userName: '',
    password: '',
    isShow: false,
  }

  onChangeWebsiteName = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  addNewPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    const firstLetter = websiteName.slice(0, 1).toUpperCase()

    const addUserCredentials = {
      id: v4(),
      newWebsite: websiteName,
      newUserName: userName,
      newPassword: password,
      initialLetter: firstLetter,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, addUserCredentials],
      websiteName: '',
      userName: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onDeleteUserCredentials = id => {
    const {passwordsList} = this.state
    const updatedList = passwordsList.filter(eachList => eachList.id !== id)
    const isDelete = updatedList.length !== 0
    this.setState({passwordsList: updatedList, isTrue: isDelete})
  }

  render() {
    const {
      passwordsList,
      websiteName,
      userName,
      password,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const updatedList = passwordsList.filter(eachList =>
      eachList.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (updatedList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app-logo"
          className="app-logo"
        />
        <div className="top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="display-image"
          />

          <div className="add-password-container">
            <form className="password-form" onSubmit={this.addNewPassword}>
              <h1 className="add-new-password-heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logos"
                />
                <input
                  type="text"
                  className="input-tag"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteName}
                  value={websiteName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logos"
                />
                <input
                  type="text"
                  className="input-tag"
                  placeholder="Enter Username"
                  onChange={this.onChangeUserName}
                  value={userName}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logos"
                />
                <input
                  type="password"
                  className="input-tag"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password-manager"
            className="top-container-image"
          />
        </div>
        <div className="bottom-container">
          <div className="password-menu-container">
            <div className="password-and-count">
              <h1 className="your-password">Your Passwords</h1>
              <p className="password-count">{updatedList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="input-tag"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              onChange={this.showPassword}
            />
            <label htmlFor="showPassword" className="show-password-heading">
              Show Passwords
            </label>
          </div>
          {isTrue ? (
            <ul>
              {updatedList.map(eachList => (
                <li className="saved-password-container">
                  <p className="website-first-letter">
                    {eachList.initialLetter}
                  </p>
                  <div className="user-name-password">
                    <p>{eachList.websiteName}</p>
                    <p>{eachList.userName}</p>
                    {isShow ? (
                      <p>{eachList.password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => this.onDeleteUserCredentials(eachList.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-icon"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bottom-container-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="bottom-image"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
