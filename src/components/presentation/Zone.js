import React,{Component} from 'react';
import styles from './styles';

class Zone extends Component {
    render() {
        const style=styles.zone;
        return (
            <div style={style.container}>
              <a style={style.title} href='#'>{this.props.currentZone.name}</a>
                <span className="detail">{this.props.currentZone.zipCodes}</span><br/>
                <span className="detail">{this.props.currentZone.numComments} comments</span>
            </div>
        )
    }
}

export default Zone
