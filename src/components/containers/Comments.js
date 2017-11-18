import React,{Component} from 'react';
import Comment from './../presentation/Comment';
import styles from './styles';
import {APIManager} from '../../../utils';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comment: {
                username: '',
                body: '',
                timestamp:''
            },
            list: []
        }
    }
    componentDidMount(){
        console.log('componentDidMount');
        APIManager.get('/api/comment',null,(err,response)=>{
            if(err){
                alert('ERROR: '+err.message);
                return
            }
            console.log('RESULTS: '+JSON.stringify(response.results));
            this.setState({
                list:response.results
            })
        });
    }
    render() {
        const commentList = this.state.list.map((comment, i)=> {
            return (
                <li key={i}><Comment currentComment={comment}/></li>
            )
        });
        return (
            <div style={styles.comment.commentsBox}>
                <h2>Comments: Zone 1</h2>
                <ul style={styles.comment.commentsList}>
                    {commentList}
                </ul>
                <input type="text" className="form-control" onChange={this.updateUsername.bind(this)}
                       placeholder="Username"/><br/>
                <input type="text" className="form-control" onChange={this.updateBody.bind(this)}
                       placeholder="Comment"/><br/>
                <input type="text" className="form-control" onChange={this.updateTimestamp.bind(this)}
                       placeholder="Timestamp"/><br/>
                <button className="btn btn-info" onClick={this.submitComment.bind(this)}>Submit Comment</button>
            </div>
        )
    }

    submitComment() {
        console.log('submit '+JSON.stringify(this.state.comment));
        let updatedList=Object.assign([],this.state.list);
        updatedList.push(this.state.comment);
        this.setState({
            list:updatedList
        })
    }

    updateUsername(event) {
        console.log('update username' + event.target.value);
        let updatedComment=Object.assign({},this.state.comment);
        updatedComment['username']=event.target.value;
        this.setState({
            comment:updatedComment
        })
    }

    updateTimestamp(event) {
        console.log('update timestamp' + event.target.value);
        let updatedComment=Object.assign({},this.state.comment);
        updatedComment['timestamp']=event.target.value;
        this.setState({
            comment:updatedComment
        })
    }

    updateBody(event) {
        console.log('update comment' + event.target.value);
        let updatedComment=Object.assign({},this.state.comment);
        updatedComment['body']=event.target.value;
        this.setState({
            comment:updatedComment
        })
    }
}

export default Comments
