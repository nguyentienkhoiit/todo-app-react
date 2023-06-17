import React, { useState } from 'react'
import './App.css'

function Input({ setElement, element }) {
  const handleKeyDown = (e) => {
    if (e.target.value.trim() == '') return
    if (e.key === 'Enter') {
      let newElement = [...element, { content: e.target.value, checked: false, isEditing: false }]
      setElement(newElement)
      e.target.value = ''
    }
  }

  return (
    <>
      <input onKeyDown={handleKeyDown} />
    </>
  )
}

function List({ list, setElement }) {
  let newList = [...list]

  const handleDelete = (index) => {
    newList.splice(index, 1)
    setElement(newList)
  }

  const handleCheckbox = (e, index) => {
    newList[index].checked = e.target.checked
    setElement(newList)

  }

  const handleUpdate = (e, index) => {
    newList[index].isEditing = true
    setElement(newList)
  }

  const handleSubmitUpdate = (e, index) => {
    if (e.target.value.trim() == '') {
      return
    }
    if (e.key == 'Enter') {
      newList[index].content = e.target.value
      newList[index].isEditing = false
      setElement(newList)
    }
  }

  const handleExit = (e, index) => {
    newList[index].isEditing = false
    setElement(newList)
  }

  return (
    <>
      <ul>
        {list.map((element, index) => {
          return (
            element.isEditing ? (
              <React.Fragment key={index}>
                <input
                  onKeyDown={e => handleSubmitUpdate(e, index)}
                  defaultValue={element.content}
                  title='Enter to submit'
                // style={{ display: 'block' }}
                />
                <span
                  style={{ fontSize: 26, marginLeft: 5, cursor: 'pointer' }}
                  onClick={e => handleExit(e, index)}
                  title={'Click here to exit'}
                >
                  x
                </span>
                <hr />
              </React.Fragment>
            ) : (
              <li key={index}>
                <input
                  type='checkbox'
                  checked={element.checked}
                  onChange={(e) => handleCheckbox(e, index)}
                />
                <span
                  style={{ textDecoration: element.checked ? 'line-through' : 'none' }}
                  onDoubleClick={(e) => handleUpdate(e, index)}
                >
                  {element.content}
                </span>
                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDelete(index)}
                >
                  delete
                </button>
                <hr />
              </li>
            )
          )
        })}
      </ul>
    </>
  )
}

function App() {
  const [element, setElement] = useState([{ content: 'Go to school', checked: false, isEditing: false }])
  return (
    <>
      <Input setElement={setElement} element={element} />
      <List setElement={setElement} list={element} />
    </>
  )
}

export default App
