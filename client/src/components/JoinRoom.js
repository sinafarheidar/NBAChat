import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function JoinRoom() {
    const [room, setRoom] = useState('bostonceltics');
    const [teamName, setTeamName] = useState('Atlanta Hawks'); 
    const [teamAbv, setTeamAbv] = useState('ATL')

    function getIndexOfK(arr, k) {
        for (var i = 0; i < arr.length; i++) {
          var index = arr[i].indexOf(k);
          if (index > -1) {
            return [i, index];
          }
        }
      }

    const nbaTeams = [['Boston Celtics', 'BOS'], ["Phildelphia 76'ers", 'PHI'], ["Milwaukee Bucks", 'MIL'], ["Chicago Bulls", 'CHI'], ["Los Angeles Clippers", 'LAC'], ["Los Angeles Lakers", 'LAL'], ["Toronto Raptors", 'TOR'], ["Orlando Magic", 'ORL'], ["Oklahoma City Thunder", 'OKC'], ["Utah Jazz", 'UTA'], ["Indiana Pacers", 'IND'], ["Detroit Pistons", 'DET'], ["Pheonix Suns", 'PHO'], ["Dallas Mavericks", 'DAL'], ["Portland Trailblazers", 'POR'], ["New Orleans Pelicans", 'NO'], ["Washington Wizards", 'WAS'], ["Cleveland Cavaliers", 'CLE'], ["Miami Heat", 'MIA'], ["Charlotte Hornets", "CHA"], ["Brooklyn Nets", 'BKN'], ["New York Knicks", 'NYK'], ["Denver Nuggets", 'DEN'], ["Sacramento Kings", 'SAC'], ["San Antonio Spurs", 'SA'], ["Memphis Grizzlies", 'MEM'], ["Houston Rockets", 'HOU'], ["Golden State Warriors", 'GS'], ['Atlanta Hawks', 'ATL']]
    nbaTeams.sort()

    const handleRoomChange = e => {
        setRoom(e.target.value.toLowerCase().replace(/\s+/g, ''))
        setTeamName(e.target.value)
        const abv = getIndexOfK(nbaTeams, e.target.value)
        setTeamAbv(nbaTeams[abv[0]][1])
        console.log(teamAbv)
    }

    return (
        <div>
            <div className="alert alert-dark" role="alert">
                <div className='row'>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <h4 className="alert-heading">Choose a Chat Room!</h4>
                </div>
                </div>

                <div className='row'>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <p>Here you can choose a chat room to enter, and talk about everything NBA</p>
                </div>
                </div>

                <hr />
                <div className="row" style={{ width: '75%' }}>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="input-group" style={{ display: 'flex', justifyContent: 'center' }}>
                        <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" onChange={handleRoomChange} >
                            {nbaTeams.map(team => {
                                return (
                                <option key={team[0]} value={team[0]}>{team[0]}</option>
                                )
                            })}
                        </select>
                        <Link to={{pathname: `/room/${room}`, state: {teamName: teamName, teamAbv: teamAbv}}}>
                        <button className="btn" type="button" style={{backgroundColor: '#016ab5', color: 'white'}}>Join Room</button>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinRoom
