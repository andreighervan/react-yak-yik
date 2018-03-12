import React,{Component} from 'react';
import Zone from './../presentation/Zone';
import {APIManager} from '../../../utils';
import styles from './styles';

class Zones extends Component {
    constructor(){
        super();
        this.state={
            zone:{
                name:'',
                zipCodes:''
            },
            list:[]
        }
    }
    componentDidMount(){
        console.log('componentDidMount');
        APIManager.get('/api/zone',null,(err,response)=>{
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
    updateZone(event){
        console.log('update zone'+event.target.id+'=='+event.target.value)
        let updatedZone=Object.assign({},this.state.zone);
        updatedZone[event.target.id]=event.target.value;
        this.setState({
            zone:updatedZone
        })
    }
    addZone() {
        console.log('ADD ZONE ' + JSON.stringify(this.state.zone));
        let updatedZone = Object.assign({}, this.state.zone);
        updatedZone['zipCodes']=updatedZone.zipCode.split(',');
        APIManager.post('/api/zone', updatedZone, (err, response)=> {
            if (err) {
                alert('ERROR: ' + err.message)
                return;
            }
            console.log('ZONE CREATED ' + JSON.stringify(response));
            let updatedList=Object.assign([], this.state.list);
            updatedList.push(response.result);
            this.setState({
                list:updatedList
            })
        });
    }
    render() {
       const listItems=this.state.list.map((zone,i)=>{
            return(
                <li key={i}><Zone currentZone={zone}/></li>
            )
        });
        return (
            <div>
                <ol>
                    {listItems}
                </ol>
                <input id="name" type="text" className="form-control" onChange={this.updateZone.bind(this)}
                       placeholder="Zone"/><br/>
                <input id="zipCode" type="text" className="form-control" onChange={this.updateZone.bind(this)}
                       placeholder="Zip Code"/><br/>
                <button className="btn btn-info" onClick={this.addZone.bind(this)}>Add Zone</button>
            </div>
        )
    }
}

export default Zones
