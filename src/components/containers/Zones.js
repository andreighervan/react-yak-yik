import React,{Component} from 'react';
import Zone from './../presentation/Zone';
import superagent from 'superagent'

class Zones extends Component {
    constructor(){
        super();
        this.state={
            zone:{
                name:'',
                zipCode:''
            },
            list:[]
        }
    }
    componentDidMount(){
        console.log('componentDidMount');
        superagent
        .get('/api/zone')
        .query(null)
        .set('Accept','application/json')
        .end((err,response)=>{
                if(err){
                    alert('Error '+err)
                return
                }
                console.log(JSON.stringify(response.body));
                let results=response.body.results;
                this.setState({
                    list:results
                })
            })
    }
    updateZone(event){
        console.log('update zone'+event.target.id+'=='+event.target.value)
        let updatedZone=Object.assign({},this.state.zone);
        updatedZone[event.target.id]=event.target.value;
        this.setState({
            zone:updatedZone
        })
    }
    addZone(){
        console.log('ADD ZONE '+JSON.stringify(this.state.zone));
        let updatedList=Object.assign([],this.state.list);
        updatedList.push(this.state.zone);
        this.setState({
            list:updatedList
        })
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
