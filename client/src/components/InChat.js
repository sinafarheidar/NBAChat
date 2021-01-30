import React from 'react'

const InChat = ({ users }) => (
    <div>
    {
        users
          ? (
            
            <div>
              <br />
              <h3 style={{color: 'white'}}>Users In The Chat:</h3>
              <div className="activeContainer">
                
                <ul class="list-group">
                  {users.map(({name}) => (   
                    <li class="list-group-item" aria-current="true">{name}</li>
                  ))}
                  </ul>
                
              </div>
            </div>
          )
          : null
      }
      </div>
)

export default InChat
