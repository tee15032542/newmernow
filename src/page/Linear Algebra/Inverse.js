import React, { Component } from 'react'
import {Card, Input, Button} from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
import math from 'mathjs';
const InputStyle = {
    background: "#1890ff",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};

var A = [], B = [], matrixA = [], matrixB = [], output = [], answer

class Inverse extends Component {
    
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm : true,
            showDimentionButton: true,
            showMatrixForm: false,
            showMatrixButton: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.inverse = this.inverse.bind(this);
    
    }

    inverse(n) {
        this.initMatrix();
        try {
            A = math.inv(A);
            answer = math.multiply(A, B)
            for (var i=0 ; i<n ; i++) {
                for (var j=0 ; j<n ; j++) {
                    if (!Number.isInteger(A[i][j])) {
                        A[i][j] = this.printFraction(math.fraction(A[i][j]));
                    }
                    
                }
            }
            for (i=0 ; i<n ; i++) {
                for(j=0 ; j<n ; j++) {
                    output.push(A[i][j]);
                    output.push("  ");
                }
                output.push(<br/>)
            }
    
        } catch (error) {
            output.push("Matrix doesn't exist, Determinant is zero")
        }
        this.setState({
            showOutputCard: true
        });          
    }
    
    printFraction (value) {
        return math.format(value, { fraction: 'ratio' })
    }

    createMatrix(row, column) {
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%", 
                    backgroundColor:"#06d9a0", 
                    marginInlineEnd: "5%", 
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
                
            
        }

        this.setState({
            showDimentionForm: false,
            showDimentionButton: false,
            showMatrixForm: true,
            showMatrixButton: true
        })
        

    }
    initMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
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
                <h2 style={{color: "black", fontWeight: "bold"}}>Matrix Inversion</h2>
                    {/*-------------Input Card-------------------*/}
                    <Card
                      bordered={true}
                      style={{ width: 400, background: "#f44336", color: "#FFFFFFFF"}}
                      onChange={this.handleChange}
                    >
                        {this.state.showMatrixForm && <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}</div>}
                        
                        {this.state.showDimentionForm && 
                            <div>
                                <h2>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                <h2>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                            </div> 
                        }
                        <br></br>
                        {this.state.showDimentionButton && 
                            <Button id="dimention_button" onClick= {
                                ()=>this.createMatrix(this.state.row, this.state.column)
                                }  
                                style={{background: "#4caf50", color: "white", fontSize: "20px"}}>
                                Submit<br></br>
                                </Button>
                        }
                        {this.state.showMatrixButton && 
                            <Button 
                                id="matrix_button"  
                                style={{background: "blue", color: "white", fontSize: "20px"}}
                                onClick={()=>this.inverse(this.state.row)}>
                                Submit
                            </Button>
                        }
                        
                    </Card>
                    {/*----------------Output Card-----------------*/}
                    {this.state.showOutputCard &&
                        <Card
                        title={"Output"}
                        bordered={true}
                        style={{ width: 400, background: "#3d683d", color: "#FFFFFFFF", float:"left"}}
                        onChange={this.handleChange}  id="answerCard">
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>{output}</p>
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>X = {JSON.stringify(answer)}</p>
                        </Card>
                    }
            </div>
        );
    }
}
export default Inverse;



