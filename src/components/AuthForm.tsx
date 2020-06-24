import React from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link,
  } from "react-router-dom";
import '../styles/authForm.css'

interface IsLoginScreen{
    isLogin: boolean,
    authFunc: any
    error: string
    loading: boolean
}


const AuthForm=({isLogin, authFunc, error, loading}: IsLoginScreen)=>{
  
    const onFinish = (values:any) => {
        // passed from app.tsx to either signin or signup user
        authFunc(values.email, values.password)
    }

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 },
    }

    
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    }

    const formTitle = (
        <div className='form-header'>
            <i className="fas fa-user form-icon"></i>
            {isLogin ? 'Login' : 'Signup'}
        </div>
    )

    return (
        <div className='auth-form'>
            {error && <div className='auth-form-error'>{error}</div>}
            <Card title={formTitle} className='auth-card'>
                <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }, {
                        type: "email",
                        message: "invalid e-mail!"
                      }]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                    </Button>
                    </Form.Item>
                </Form>
                {isLogin && <div className='sign-up'>If you don't have an account, <Link to='/signup'>here</Link></div>}
                
        </Card>
        
    </div>
    )
}

export default AuthForm