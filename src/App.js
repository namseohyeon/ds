import React, {Component} from "react";
import "./App.css"
export default class App extends Component {
  btnStyle = {
    color:"white",
    border:"none",
    padding: "5px 7px",
    borderRadius:"50%",
    cursor:"pointer",
    float:"right"
  }

  getStyle = (completed) =>{
    return{
      padding: "5px",
      borderBottom:"1px black dotted",
      // TextDecoration: "none"
      textDecoration: completed ? "line-through":"none",

    };
  }

  state={
    todoData: [],
    value:"",
  };

  handleClick=(id)=>{
    let newTodoData = this.state.todoData.filter((data) => data.id !== id);
    this.setState({todoData: newTodoData});
  }

  handleChange = (e) =>{
    this.setState({value: e.target.value});
  }

  handleSubmit = (e) =>{
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed:false,
    };

    this.setState({todoData: [...this.state.todoData,newTodo],value:""}); // value="" 추가했을 때 인풋 텍스트에 안뜨게 하기 근데 안됨....ㅎ
  };
  
  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if(data.id===id){
        data.completed = !data.completed;
      }
      return data;
    });
    this.setState({todoData: newTodoData});
  };
  render(){
    return(
    <div className='container'>
      <div className='todoBlock'>
        <div className='title'>
          <h1>할 일 목록</h1> 
        </div>

        {this.state.todoData.map((data) =>
          <div style={this.getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={false} onChange={() => this.handleCompleteChange(data.id)}/> 
            {data.title}
            <button style={this.btnStyle} onClick={()=>this.handleClick(data.id)}>x</button>
        </div>
        )}
        <form style={{display:"flex"}} onSubmit={this.handleSubmit}>
          <input type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="일 입력"
            Value={this.state.value}
            onChange={this.handleChange}
            />
          <input type="submit"
            value="입력"
            className='btn'
            style={{flex:'1'}}
            />        
        </form>    
      </div>
    </div>
    );
  }
}