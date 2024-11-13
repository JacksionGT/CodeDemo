import React ,{ Component } from 'react';
class InputNumber extends Component{
    constructor(props){
        super(props)
        this.state = {
            value : this.props.defaultValue || this.props.value
        }
    }
    handler(val){
        this.setState({
            value:value
        })
        if(this.props.onChange){
            this.props.onChange(val);
        }
    }
    render(){
        return (
            <input type="number" value={this.state.value} onChange={e=>this.handler(e.target.value)} />
        )
    }
}