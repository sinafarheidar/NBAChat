import React from 'react'

const InChat = ({ users }) => (
    <div>
    {
        users
          ? (
            <div>
              <h1>People currently chatting:</h1>
              <div className="activeContainer">
                <h2>
                  {users.map(({name}) => (
                    <div key={name} className="activeItem">
                      Person: {name}
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : null
      }
      </div>
)

export default InChat
