import React,{Component} from 'react';

class Comment extends Component {
    render() {
        return (
            <div>
                <p>{this.props.currentComment.username}</p>
               <span style={{marginLeft:12}}> {this.props.currentComment.body}</span>
                   <span>|</span>
                   <span>{this.props.currentComment.timestamp}</span>
                <hr/>
            </div>
        )
    }
}

export default Comment
