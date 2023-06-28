import React, {useRef} from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FullButton from '../button/FullButton';
import {baseURL} from '../../environment';

    function RoomCreate(props) {

        const formRef = useRef();
        const nameRef = useRef();
        const descriptionRef = useRef();
        const addedusersRef = useRef();
        let names = [null, 'Room-1', 'Room-2', 'Room-3', 'Room-4', 'Room-5', 'Room-6']
        let users = [null, 'Haseeb', 'Marcel', 'John', 'Tom','Bob', 'Eric']
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            // console.log(nameRef.current.value);

            const URL = `${baseURL}/room`
            // console.log(url);

            const bodyObj = JSON.stringify({
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                addedusers: addedusersRef.current.value
            });
            // console.log(bodyObj);

            let myHeader = new Headers();
            myHeader.append("Content-Type", "application/json");
            myHeader.append('Authorization', props.token);

            const requestOptions = {
                headers: myHeader,
                body: bodyObj,
                method: 'POST'
            }
            try {
                const res = await fetch(URL, requestOptions)
                const data = await res.json();

                // console.log(data);

                formRef.current.reset();
                props.fetchRoom()
                
            } catch (err) {
                console.error(err);
            }
    }
    return (
         <>
         <h2>Add Room</h2>
         <Form 
         innerRef={formRef}
         onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Name</Label>
                <Input
                innerRef={nameRef}
                    type='select'
                    autoComplete='off'>
                    {
                        names.map((r, i) => (
                            <option key={i} value={r}>{r}
                            </option>
                        ))
                    }
                 </Input>
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <Input 
                    innerRef={descriptionRef}
                    type='select'
                    autoComplete='off' >
                    <option value={""}></option>
                    <option value={"Continental"}>Continental</option>
                    <option value={"Business"}>Business</option>
                    <option value={"Food & Drink"}>Food & Drink</option>
                    <option value={"Family"}>Family</option>
                    <option value={"VIPs"}>VIPs</option>
                    <option value={"Boardroom"}>Boardroom</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Added Users</Label>
                <Input
                innerRef={addedusersRef}
                type='select' 
                autoComplete='off'>
                    {
                        users.map((r, i) => (
                            <option key={i} value={r}>{r}
                            </option>
                        ))
                    }
                </Input>
            </FormGroup>
            <FullButton>
                <Button color="success" >Add Room</Button>
            </FullButton>
         </Form>
         </>
        )
    }

    export default RoomCreate


    /**
     * name
     * description
     * addedUsers
     */