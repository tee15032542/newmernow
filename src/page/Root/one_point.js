import React, { Component } from 'react'
import {Card, Input, Button, Table} from 'antd';

import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
const InputStyle = {
    background: "#1890ff",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};
var dataInTable = []
const columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
      title: "Error",
      key: "error",
      dataIndex: "error"
    }
  ];
  const xValues = range(-10, 10, 0.5).toArray();
  var fx = " ";
class Onepoint extends Component {
    
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onepoint = this.onepoint.bind(this);
    }
    apiData = async() => {
        var response = await axios.get('http://localhost:3001/api/users/showone_point').then(res => { return res.data })
        this.setState({
            fx: response['data'][0]['fx'],
            x: response['data'][0]['x'],
            
            showapi: true
        }); console.log(response['data'])
        this.onepoint(this.state.x)
    }

    onepoint(xold) {
        fx = this.state.fx;
        var xnew = 0;
        var epsilon= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['x'] = []
        data['error'] = []

        do{ 
            xnew = this.func(xold);
            epsilon = this.error(xnew, xold)
            data['x'][n] =  xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;  
            xold = xnew;

        }while(Math.abs(epsilon)>0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })

        
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    error(xnew, xold) {
        return Math.abs((xnew-xold) / xnew);
    }
    createTable(x, error) {
        dataInTable = []
        for (var i=0 ; i<x.length ; i++) {
            dataInTable.push({
                iteration: i+1,
                x: x[i],
                error: error[i]
            });
        }
    
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>One Point Iteration</h2>
                <div>
                    <Card
                    bordered={true}
                    style={{ width: 300, background: "#FFD700", color: "#FFFFFFFF"}}
                    onChange={this.handleChange}
                    >
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                        <Button id="submit_button" onClick= {
                                ()=>this.onepoint(parseFloat(this.state.x0))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit</Button>
                        <Button id="AutoAPI_button" onClick= {
                                ()=>this.apiData()
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>APIauto</Button>
                        
                    </Card>
                    
                    {this.state.showGraph &&

                        <Card
                            style={{ borderRadius: "20px" , color: "black" }}
                        >
                            <LineChart width={700} height={200} data={dataInTable}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="error" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Line name="error" type="monotone" dataKey="error" stroke="#8884d8" />
                            </LineChart>
                        </Card>
                    }    

                    {this.state.showOutputCard && 
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{width: "100%", background: "#2196f3", color: "#FFFFFFFF", float:"inline-start", marginBlockStart:"2%"}}
                        id="outputCard"
                        >
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black"}}
                            ></Table>
                        </Card>
                    }                    
                </div>

                
            </div>
        );
    }
}
export default Onepoint;