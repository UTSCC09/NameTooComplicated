import React, { Component } from 'react';
import Axios from 'axios';
import SimpleObject from './components/SimpleObject';
import SceneGlobalControl from './components/SceneGlobalControl';
import { observer } from 'mobx-react';
import * as THREE from 'three';
// import ControlPanelStore from './stores/ControlPanelStore';
// import SceneStore from './stores/SceneStore';

// import Scene2 from './components/Scene2';

import './styles/Landing.css';

@observer
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
  }
  componentWillMount() {
    var geometry = {
      radius: 3,
      widthSegments: 32,
      heightSegments: 32,
      phiStart: 0,
      phiLength: 6.3,
      thetaStart: 6,
      thetaLength: 6.3,
      width: 6,
      depth: 6,
      height: 6
    };

    // mesh
    var texture = new THREE.TextureLoader().load(
      '../textures/brickwall_normal.jpg'
    );
    texture.wrapS = THREE.RepeatWrapping;
    var mesh = new THREE.MeshNormalMaterial({ normalMap: texture });

    // create the Sphere2 component with two states { geometry, mesh }

    var children = this.state.children;
    // children.push(<Sphere radius={3} />);
    children.push(
      <SimpleObject
        cube
        key={this.state.children.length}
        SceneStore={this.props.SceneStore}
        geometry={geometry}
        mesh={mesh}
      />
    );

    this.setState({ children: children });
  }

  componentDidMount() {
    this.props.SceneStore.renderCanvas();
  }

  saveScene = () => {
    console.log('saving scene');
    var scene = this.props.SceneStore.getScene;
    var camera = this.props.SceneStore.getCamera;
    var sceneid = scene.uuid;
    var cameraid = camera.uuid;
    var uuid = sceneid + '-' + cameraid;
    var params = new URLSearchParams();
    params.append('id', uuid);
    params.append('camera', JSON.stringify(camera));
    params.append('scene', JSON.stringify(scene));
    params.append('owner', 'gordon');
    Axios.post(`/scenes/`, params)
      .then(function(response) {
        console.log('added scenes');
        console.log(response);
      })
      .catch(function(err) {
        console.log('caught an error for saving canvas');
        console.log(err);
      });
  };

  getAllScenes = () => {
    var ownername = 'gordon';
    console.log('this is the owner on front end');
    Axios.get(`/scenes/${ownername}`).then(
      function(response) {
        console.log('successful get of scenes');
        response.data.forEach(function(canvas) {
          canvas.scene = JSON.parse(canvas.scene);
          canvas.camera = JSON.parse(canvas.camera);
          console.log(canvas);
        });
      },
      function(err) {
        console.log('failed to get scenes');
        console.log(err);
      }
    );
  };

  renderChildren() {
    this.getAllScenes();
    console.log(this.state.children);
    return this.state.children;
  }

  render() {
    return (
      <div className="landing-container">
        {this.renderChildren()}
        <SceneGlobalControl
          SceneStore={this.props.SceneStore}
          ControlPanelStore={this.props.ControlPanelStore}
        />
      </div>
    );
  }
}

export default Landing;
