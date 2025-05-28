
import React from 'react'
import Input from './Input'
import { useState } from 'react'

function IncomeForm() {
    const [title,settitle]=useState("")
    const [amount,setamount]=useState("")
    const [tag,settag]=useState("")
    const [date,setdate]=useState("")
  return (
    <div>
        <form>
        <Input placeholder='Title' state={title}  setState={settitle}></Input>
        <Input placeholder='Amount' state={amount}  setState={setamount}></Input>
        <Input placeholder='Tag' state={tag}  setState={settag}></Input>
        <Input placeholder='Date'type='Date' state={date}  setState={setdate}></Input>
        </form>
        
       
    </div>
  )
}

export default IncomeForm