"use strict";

const domContainer = document.querySelector('#nowShare');
const e = React.createElement;


const reactData = {
  nid: 
  { id: 1,
    reactNID: window.drupalSettings.reactNID,
  },
  url:
  { id: 2,
    reactURL: window.drupalSettings.currentURL,
  },
  title:
  { id: 2,
    reactTitle: window.drupalSettings.reactTitle,
  },
  intro:
  { id: 3,
    reactIntro: window.drupalSettings.reactIntro,
  },
  image:
  { id: 4,
    reactImage: window.drupalSettings.reactImage,
  }
};

class Share extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      counter: props.nid.reactNID,
      url: props.url.reactURL,
      title: props.title.reactTitle,
      intro: props.intro.reactIntro,
      image: props.image.reactImage,
     };
  }

  handleChange(event) {
    this.setState({
      title: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="react-preview-form">
          <label>
            Title:
            <input type="text" name="title" ref="title" defaultValue={this.state.title} onChange={this.handleChange.bind(this)}/>
          </label>
          <label>
            URL:
            <input type="url" name="url" ref="url" defaultValue={this.state.url} onChange={this.handleChange.bind(this)}/>
          </label>
          <label>
            Intro:
            <input type="text" name="intro" ref="intro" defaultValue={!!(this.state.intro)?this.state.intro:"whatever you want"} onChange={this.handleChange.bind(this)}/>
          </label>
          <label>
            Image:
            <input type="url" name="image field" ref="image" defaultValue={!!(this.state.image)?this.state.image:"whatever you want"} onChange={this.handleChange.bind(this)}/>
          </label>
          <input type="submit" value="Share" id="shareButton" />
        </form>

        <div className="preview preview-linkedin">
          <h4>linkedin</h4>
          <div className="preview-content">
            <img className="social-media-img" src={this.state.image} alt={this.state.title}/>
            <p className="preview-title">{this.state.title}</p>
            <p className="preview-link">{`${this.state.url.substring(0, 40)}...`}</p>
          </div>
        </div>
        <div className="preview preview-twitter">
          <h4>twitter</h4>
          <div className="preview-content">
            <img className="social-media-img" src={this.state.image} alt={this.state.title}/>
            <p className="preview-title">{this.state.title}</p>
            <p className="preview-intro">{`${this.state.intro.substring(0, 170)}...`}</p>
            <p className="preview-link">{`${this.state.url.substring(0, 40)}...`}</p>
          </div>
        </div>
        <div className="preview preview-facebook">
          <h4>facebook</h4>
          <div className="preview-content">
            <img className="social-media-img" src={this.state.image} alt={this.state.title}/>
            <p className="preview-link">{`${this.state.url.substring(0, 40)}...`}</p>
            <p className="preview-title">{this.state.title}</p>
            <p className="preview-intro">{`${this.state.intro.substring(0, 170)}...`}</p>
          </div>
        </div>
      </div>
    );
  };
}

// ReactDOM.render(e(Share, reactData, null));
ReactDOM.hydrate(e(Share, reactData, null), domContainer);

