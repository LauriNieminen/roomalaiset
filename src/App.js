import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import roomalaiset from './roomalaiset'

const App = () => {
  const [input, setInput] = useState('')

  return (
    <div className="container" style={{ maxWidth: "600px", textAlign:"center",marginTop: "5rem"}} >
      <h3>Syötä roomalainen numero</h3>
      <Form style={{ marginTop: "2.5rem"}}>
        <Form.Control 
          value={input}
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="MMXIV" 
          isInvalid={input.length !== 0 && roomalaiset.transform(input) === -1} />
        <Form.Control.Feedback type="invalid">Syötä validi roomalainen numero</Form.Control.Feedback>
      </Form>
      <h4 style={{ marginTop: "2.5rem"}}>Numero kymmenlukuna: {roomalaiset.transform(input) !== -1 ? roomalaiset.transform(input) : ''}</h4>
    </div>
    )
}

export default App;
